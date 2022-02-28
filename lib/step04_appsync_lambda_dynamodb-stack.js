"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step04AppsyncLambdaDynamodbStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
const appsync = require("@aws-cdk/aws-appsync-alpha");
const dynamo = require("aws-cdk-lib/aws-dynamodb");
const lambda = require("aws-cdk-lib/aws-lambda");
class Step04AppsyncLambdaDynamodbStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // appsync todo API
        const todo_api = new appsync.GraphqlApi(this, 'GRAPHQL_API', {
            name: 'todo-app-api',
            schema: appsync.Schema.fromAsset('graphql/Schema.gql'),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.API_KEY,
                    apiKeyConfig: {
                        expires: aws_cdk_lib_1.Expiration.after(aws_cdk_lib_1.Duration.days(365)) //set expiration for API Key
                    }
                },
            },
            xrayEnabled: true,
        });
        //lambda function
        const lambda_function_for_todoApp = new lambda.Function(this, "LambdaFunctionforTodos", {
            functionName: "todo_App_lambda_function",
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('lambda'),
            timeout: aws_cdk_lib_1.Duration.seconds(10)
        });
        //lambda Data Source
        const lambda_data_source = todo_api.addLambdaDataSource("lambda_function", lambda_function_for_todoApp);
        //Resolvers for the Query and Mutations
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "getTodos"
        });
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "addTodo"
        });
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "deleteTodo"
        });
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "updateTodo"
        });
        //DynamoDb table for Todo
        const todos_dynamodb_table = new dynamo.Table(this, "cdkTodosTable", {
            // tableName: "TodoApp_Table",
            partitionKey: {
                name: 'id',
                type: dynamo.AttributeType.STRING
            }
        });
        //giving access of the table to the lambda function
        todos_dynamodb_table.grantFullAccess(lambda_function_for_todoApp);
        //creating environment variables to call in the lambda function in the params folder 
        lambda_function_for_todoApp.addEnvironment('TODOS_TABLE', todos_dynamodb_table.tableName);
    }
}
exports.Step04AppsyncLambdaDynamodbStack = Step04AppsyncLambdaDynamodbStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDA0X2FwcHN5bmNfbGFtYmRhX2R5bmFtb2RiLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RlcDA0X2FwcHN5bmNfbGFtYmRhX2R5bmFtb2RiLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFzRTtBQUV0RSw4Q0FBOEM7QUFDOUMsc0RBQXNEO0FBQ3RELG1EQUFtRDtBQUNuRCxpREFBaUQ7QUFFakQsTUFBYSxnQ0FBaUMsU0FBUSxtQkFBSztJQUN6RCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLG1CQUFtQjtRQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUMzRCxJQUFJLEVBQUUsY0FBYztZQUNwQixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7WUFDdEQsbUJBQW1CLEVBQUU7Z0JBQ25CLG9CQUFvQixFQUFFO29CQUNwQixpQkFBaUIsRUFBRSxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTztvQkFDcEQsWUFBWSxFQUFFO3dCQUNaLE9BQU8sRUFBRSx3QkFBVSxDQUFDLEtBQUssQ0FBQyxzQkFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUF5Qiw0QkFBNEI7cUJBQ25HO2lCQUNGO2FBQ0Y7WUFDRCxXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7UUFFRixpQkFBaUI7UUFDakIsTUFBTSwyQkFBMkIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQ3RGLFlBQVksRUFBRSwwQkFBMEI7WUFDeEMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsZUFBZTtZQUN4QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxzQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsb0JBQW9CO1FBQ3BCLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixFQUFFLDJCQUEyQixDQUFDLENBQUE7UUFFdkcsdUNBQXVDO1FBQ3ZDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUE7UUFFRixrQkFBa0IsQ0FBQyxjQUFjLENBQUM7WUFDaEMsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFNBQVM7U0FDckIsQ0FBQyxDQUFBO1FBRUYsa0JBQWtCLENBQUMsY0FBYyxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQTtRQUVGLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsWUFBWTtTQUN4QixDQUFDLENBQUE7UUFHRix5QkFBeUI7UUFDekIsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUNuRSw4QkFBOEI7WUFDOUIsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDbEM7U0FDRixDQUFDLENBQUE7UUFFRixtREFBbUQ7UUFDbkQsb0JBQW9CLENBQUMsZUFBZSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFbEUscUZBQXFGO1FBQ3JGLDJCQUEyQixDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDM0YsQ0FBQztDQUNGO0FBcEVELDRFQW9FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBFeHBpcmF0aW9uLCBEdXJhdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xuaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYy1hbHBoYSc7XG5pbXBvcnQgKiBhcyBkeW5hbW8gZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcblxuZXhwb3J0IGNsYXNzIFN0ZXAwNEFwcHN5bmNMYW1iZGFEeW5hbW9kYlN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIGFwcHN5bmMgdG9kbyBBUElcbiAgICBjb25zdCB0b2RvX2FwaSA9IG5ldyBhcHBzeW5jLkdyYXBocWxBcGkodGhpcywgJ0dSQVBIUUxfQVBJJywge1xuICAgICAgbmFtZTogJ3RvZG8tYXBwLWFwaScsXG4gICAgICBzY2hlbWE6IGFwcHN5bmMuU2NoZW1hLmZyb21Bc3NldCgnZ3JhcGhxbC9TY2hlbWEuZ3FsJyksXG4gICAgICBhdXRob3JpemF0aW9uQ29uZmlnOiB7XG4gICAgICAgIGRlZmF1bHRBdXRob3JpemF0aW9uOiB7XG4gICAgICAgICAgYXV0aG9yaXphdGlvblR5cGU6IGFwcHN5bmMuQXV0aG9yaXphdGlvblR5cGUuQVBJX0tFWSwgICAgICAgICAgICAgICAgICAgLy9kZWZpbmluZyBhdXRob3JpemF0aW9uIHR5cGVcbiAgICAgICAgICBhcGlLZXlDb25maWc6IHtcbiAgICAgICAgICAgIGV4cGlyZXM6IEV4cGlyYXRpb24uYWZ0ZXIoRHVyYXRpb24uZGF5cygzNjUpKSAgICAgICAgICAgICAgICAgICAgICAgICAvL3NldCBleHBpcmF0aW9uIGZvciBBUEkgS2V5XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHhyYXlFbmFibGVkOiB0cnVlLFxuICAgIH0pXG5cbiAgICAvL2xhbWJkYSBmdW5jdGlvblxuICAgIGNvbnN0IGxhbWJkYV9mdW5jdGlvbl9mb3JfdG9kb0FwcCA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJMYW1iZGFGdW5jdGlvbmZvclRvZG9zXCIsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogXCJ0b2RvX0FwcF9sYW1iZGFfZnVuY3Rpb25cIixcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgIHRpbWVvdXQ6IER1cmF0aW9uLnNlY29uZHMoMTApXG4gICAgfSk7XG5cbiAgICAvL2xhbWJkYSBEYXRhIFNvdXJjZVxuICAgIGNvbnN0IGxhbWJkYV9kYXRhX3NvdXJjZSA9IHRvZG9fYXBpLmFkZExhbWJkYURhdGFTb3VyY2UoXCJsYW1iZGFfZnVuY3Rpb25cIiwgbGFtYmRhX2Z1bmN0aW9uX2Zvcl90b2RvQXBwKVxuXG4gICAgLy9SZXNvbHZlcnMgZm9yIHRoZSBRdWVyeSBhbmQgTXV0YXRpb25zXG4gICAgbGFtYmRhX2RhdGFfc291cmNlLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiBcIlF1ZXJ5XCIsXG4gICAgICBmaWVsZE5hbWU6IFwiZ2V0VG9kb3NcIlxuICAgIH0pXG5cbiAgICBsYW1iZGFfZGF0YV9zb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJhZGRUb2RvXCJcbiAgICB9KVxuXG4gICAgbGFtYmRhX2RhdGFfc291cmNlLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXG4gICAgICBmaWVsZE5hbWU6IFwiZGVsZXRlVG9kb1wiXG4gICAgfSlcblxuICAgIGxhbWJkYV9kYXRhX3NvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogXCJNdXRhdGlvblwiLFxuICAgICAgZmllbGROYW1lOiBcInVwZGF0ZVRvZG9cIlxuICAgIH0pXG5cblxuICAgIC8vRHluYW1vRGIgdGFibGUgZm9yIFRvZG9cbiAgICBjb25zdCB0b2Rvc19keW5hbW9kYl90YWJsZSA9IG5ldyBkeW5hbW8uVGFibGUodGhpcywgXCJjZGtUb2Rvc1RhYmxlXCIsIHtcbiAgICAgIC8vIHRhYmxlTmFtZTogXCJUb2RvQXBwX1RhYmxlXCIsXG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgdHlwZTogZHluYW1vLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vZ2l2aW5nIGFjY2VzcyBvZiB0aGUgdGFibGUgdG8gdGhlIGxhbWJkYSBmdW5jdGlvblxuICAgIHRvZG9zX2R5bmFtb2RiX3RhYmxlLmdyYW50RnVsbEFjY2VzcyhsYW1iZGFfZnVuY3Rpb25fZm9yX3RvZG9BcHApO1xuXG4gICAgLy9jcmVhdGluZyBlbnZpcm9ubWVudCB2YXJpYWJsZXMgdG8gY2FsbCBpbiB0aGUgbGFtYmRhIGZ1bmN0aW9uIGluIHRoZSBwYXJhbXMgZm9sZGVyIFxuICAgIGxhbWJkYV9mdW5jdGlvbl9mb3JfdG9kb0FwcC5hZGRFbnZpcm9ubWVudCgnVE9ET1NfVEFCTEUnLCB0b2Rvc19keW5hbW9kYl90YWJsZS50YWJsZU5hbWUpXG4gIH1cbn1cbiJdfQ==