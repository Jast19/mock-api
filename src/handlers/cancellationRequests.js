"use strict";

const AWS = require('aws-sdk');

module.exports.handler = async (event) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  let result = {};
  try {
    const params = {
      TableName: process.env.CANCELLATION_REQUESTS_TABLE
    };

    const response = await dynamoDb.scan(params).promise()
    const cancels = response.Items;

    result = {
      statusCode: 200,
      data: {
        Errors: null,
        Response: [
          ...cancels
        ]
      }
    }

    const deleteCa = await deleteParams(cancels);
    await dynamoDb.batchWrite(deleteCa).promise()

  } catch (error) {
    console.log(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}

const deleteParams = async (cancels) => {
  console.log(JSON.stringify(cancels))
  let deleteRequests = []

  cancels.forEach(or => {

    deleteRequests.push({
      DeleteRequest: {
        Key: { id: or.id }
      }
    })
  });

  return {
    RequestItems: {
      [process.env.CANCELLATION_REQUESTS_TABLE]: deleteRequests
    }
  }
}
