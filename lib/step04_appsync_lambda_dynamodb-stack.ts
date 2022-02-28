import { Stack, StackProps, Expiration, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as dynamo from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class Step04AppsyncLambdaDynamodbStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // appsync todo API
    const todo_api = new appsync.GraphqlApi(this, 'GRAPHQL_API', {
      name: 'todo-app-api',
      schema: appsync.Schema.fromAsset('graphql/Schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,                   //defining authorization type
          apiKeyConfig: {
            expires: Expiration.after(Duration.days(365))                         //set expiration for API Key
          }
        },
      },
      xrayEnabled: true,
    })

    //lambda function
    const lambda_function_for_todoApp = new lambda.Function(this, "LambdaFunctionforTodos", {
      functionName: "todo_App_lambda_function",
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
      timeout: Duration.seconds(10)
    });

    //lambda Data Source
    const lambda_data_source = todo_api.addLambdaDataSource("lambda_function", lambda_function_for_todoApp)

    //Resolvers for the Query and Mutations
    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "getTodos"
    })

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo"
    })

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo"
    })

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo"
    })


    //DynamoDb table for Todo
    const todos_dynamodb_table = new dynamo.Table(this, "cdkTodosTable", {
      // tableName: "TodoApp_Table",
      partitionKey: {
        name: 'id',
        type: dynamo.AttributeType.STRING
      }
    })

    //giving access of the table to the lambda function
    todos_dynamodb_table.grantFullAccess(lambda_function_for_todoApp);

    //creating environment variables to call in the lambda function in the params folder 
    lambda_function_for_todoApp.addEnvironment('TODOS_TABLE', todos_dynamodb_table.tableName)
  }
}
