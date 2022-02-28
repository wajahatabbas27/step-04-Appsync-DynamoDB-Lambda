//aws-sdk for the dynamoDB and to create the DocClient
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
import Todo from './Todo'

const addTodo = async (todo: Todo) => {
    const params = {
        TableName: process.env.TODOS_TABLE,
        Item: todo
    }
    try {
        const data = await docClient.put(params).promise()
        return todo

    } catch (error) {
        console.log("DynamoDB Error :  ", error);
        return null
    }
}

export default addTodo