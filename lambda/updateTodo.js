"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const updateTodo = async (todo) => {
    let params = {
        TableName: process.env.TODOS_TABLE,
        Key: {
            id: todo.id
        },
        ExpressionAttributeValues: {},
        ExpressionAttributeNames: {},
        UpdateExpression: "",
        ReturnValues: "UPDATED_NEW"
    };
    let prefix = "set ";
    let attributes = Object.keys(todo);
    for (let i = 0; i < attributes.length; i++) {
        let attribute = attributes[i];
        if (attribute !== "id") {
            params["UpdateExpression"] += prefix + "#" + attribute + " = :" + attribute;
            params["ExpressionAttributeValues"][":" + attribute] = todo[attribute];
            params["ExpressionAttributeNames"]["#" + attribute] = attribute;
            prefix = ", ";
        }
    }
    try {
        await docClient.update(params).promise();
        return todo;
    }
    catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
};
exports.default = updateTodo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlVG9kby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVwZGF0ZVRvZG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBV3BELE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxJQUFTLEVBQUUsRUFBRTtJQUNuQyxJQUFJLE1BQU0sR0FBVztRQUNqQixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXO1FBQ2xDLEdBQUcsRUFBRTtZQUNELEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNkO1FBQ0QseUJBQXlCLEVBQUUsRUFBRTtRQUM3Qix3QkFBd0IsRUFBRSxFQUFFO1FBQzVCLGdCQUFnQixFQUFFLEVBQUU7UUFDcEIsWUFBWSxFQUFFLGFBQWE7S0FDOUIsQ0FBQztJQUNGLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNwQixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hDLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDcEIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUM1RSxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7WUFDaEUsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNqQjtLQUNKO0lBRUQsSUFBSTtRQUNBLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN4QyxPQUFPLElBQUksQ0FBQTtLQUNkO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3BDLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7QUFDTCxDQUFDLENBQUE7QUFFRCxrQkFBZSxVQUFVLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBV1MgPSByZXF1aXJlKCdhd3Mtc2RrJyk7XG5jb25zdCBkb2NDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XG5cbnR5cGUgUGFyYW1zID0ge1xuICAgIFRhYmxlTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIEtleTogc3RyaW5nIHwge30sXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczogYW55LFxuICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczogYW55LFxuICAgIFVwZGF0ZUV4cHJlc3Npb246IHN0cmluZyxcbiAgICBSZXR1cm5WYWx1ZXM6IHN0cmluZ1xufVxuXG5jb25zdCB1cGRhdGVUb2RvID0gYXN5bmMgKHRvZG86IGFueSkgPT4ge1xuICAgIGxldCBwYXJhbXM6IFBhcmFtcyA9IHtcbiAgICAgICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi5UT0RPU19UQUJMRSxcbiAgICAgICAgS2V5OiB7XG4gICAgICAgICAgICBpZDogdG9kby5pZFxuICAgICAgICB9LFxuICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7fSxcbiAgICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzOiB7fSxcbiAgICAgICAgVXBkYXRlRXhwcmVzc2lvbjogXCJcIixcbiAgICAgICAgUmV0dXJuVmFsdWVzOiBcIlVQREFURURfTkVXXCJcbiAgICB9O1xuICAgIGxldCBwcmVmaXggPSBcInNldCBcIjtcbiAgICBsZXQgYXR0cmlidXRlcyA9IE9iamVjdC5rZXlzKHRvZG8pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZSAhPT0gXCJpZFwiKSB7XG4gICAgICAgICAgICBwYXJhbXNbXCJVcGRhdGVFeHByZXNzaW9uXCJdICs9IHByZWZpeCArIFwiI1wiICsgYXR0cmlidXRlICsgXCIgPSA6XCIgKyBhdHRyaWJ1dGU7XG4gICAgICAgICAgICBwYXJhbXNbXCJFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzXCJdW1wiOlwiICsgYXR0cmlidXRlXSA9IHRvZG9bYXR0cmlidXRlXTtcbiAgICAgICAgICAgIHBhcmFtc1tcIkV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lc1wiXVtcIiNcIiArIGF0dHJpYnV0ZV0gPSBhdHRyaWJ1dGU7XG4gICAgICAgICAgICBwcmVmaXggPSBcIiwgXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBkb2NDbGllbnQudXBkYXRlKHBhcmFtcykucHJvbWlzZSgpXG4gICAgICAgIHJldHVybiB0b2RvXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEeW5hbW9EQiBlcnJvcjogJywgZXJyKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlVG9kbzsiXX0=