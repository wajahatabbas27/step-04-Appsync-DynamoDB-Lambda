//aws-sdk for the dynamoDB and to create the DocClient
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const getTodos = async () => {
    const params = {
        TableName: process.env.TODOS_TABLE
    }
    try {
        const data = await docClient.scan(params).promise()
        return data.Items

    } catch (error) {
        console.log("DynamoDB Error :  ", error);
        return null
    }
}

export default getTodos