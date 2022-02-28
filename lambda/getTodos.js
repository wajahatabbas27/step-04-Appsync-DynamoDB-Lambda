"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//aws-sdk for the dynamoDB and to create the DocClient
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const getTodos = async () => {
    const params = {
        TableName: process.env.TODOS_TABLE
    };
    try {
        const data = await docClient.scan(params).promise();
        return data.Items;
    }
    catch (error) {
        console.log("DynamoDB Error :  ", error);
        return null;
    }
};
exports.default = getTodos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VG9kb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRUb2Rvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNEQUFzRDtBQUN0RCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRXBELE1BQU0sUUFBUSxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3hCLE1BQU0sTUFBTSxHQUFHO1FBQ1gsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztLQUNyQyxDQUFBO0lBQ0QsSUFBSTtRQUNBLE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNuRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7S0FFcEI7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUE7S0FDZDtBQUNMLENBQUMsQ0FBQTtBQUVELGtCQUFlLFFBQVEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vYXdzLXNkayBmb3IgdGhlIGR5bmFtb0RCIGFuZCB0byBjcmVhdGUgdGhlIERvY0NsaWVudFxuY29uc3QgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xuY29uc3QgZG9jQ2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xuXG5jb25zdCBnZXRUb2RvcyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuVE9ET1NfVEFCTEVcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRvY0NsaWVudC5zY2FuKHBhcmFtcykucHJvbWlzZSgpXG4gICAgICAgIHJldHVybiBkYXRhLkl0ZW1zXG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkR5bmFtb0RCIEVycm9yIDogIFwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRUb2RvcyJdfQ==