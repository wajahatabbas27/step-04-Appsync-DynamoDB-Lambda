//aws-sdk for the dynamoDB and to create the DocClient
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const deleteTodo = async (todoId: String) => {
    const params = {
        TableName: process.env.TODOS_TABLE,
        Key: {
            id: todoId
        }
    }
    try {
        const data = await docClient.delete(params).promise()
        return todoId

    } catch (error) {
        console.log("DynamoDB Error :  ", error);
        return null
    }
}

export default deleteTodo