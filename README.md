# DynamoDB Database

Here i am using dynamodb as a database to add,get,delete,update the database
First we will create the Stack and initialized the DynamoDB table there , then we will give its access to the lambda function,
After That in the lambda function we will call the DynamoDB and initialized it with there , then according to our requirement we will use the dynamoDb in the lambda functions to add , delete , update , get the data required in the function.

## Schema for Todo

implemented the Schema of the Todo App
along side with the Queries and mutation
basically we are defining the types there in the schema

## Lambda Function for Todo

initialized the structure for the lambda in the stack file in the lib folder
then created the folder lambda and initialized the index.ts file over there
implemented the lambda function in the index.ts file.

### Resolvers

created the Resolvers for the Query - getTodos
created the Resolvers for Mutation - addTodo - deleteTodo - UpdateTodo

# DynamoDB table in stack

initialized the dynamoDB in the Stack file
Giving access of the table to the lambda function so to use dynamoDb over there

### ENVIRONMENT VARIABLES IN THE STACK FILE

Created the environment variables for the lambda function and for the dynamodb table to access from the index.ts lambda file

#### import aws-sdk for docClient

we will import aws-sdk in the getTodo and all the other lamdas where ever we wanted to access the DynamoDb table
we will create the docClient from the aws-sdk

##### DynamoDB logics

initialized logic for differnt DynamoDb techniques ,
scan - get has differnt parameters in params
put has different parameters in the params so as delete and update
depending on the logic to be implemented
