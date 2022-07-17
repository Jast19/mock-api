"use strict";

const AWS = require('aws-sdk');

module.exports.handler = async (event, context) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  let result = {};
  try {
    const params = {
      TableName: process.env.ORDER_TABLE
    };

    const response = await dynamoDb.scan(params).promise()
    const orders = response.Items;

    result = {
      statusCode: 200,
      data: {
        Errors: null,
        Response: {
          Order: orders
        }
      }
    }

    const deletePa = await deleteParams(orders);
    await dynamoDb.batchWrite(deletePa).promise()

  } catch (error) {
    console.log(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}

const deleteParams = async (order) => {

  let deleteRequests = []

  order.forEach(or => {

    deleteRequests.push({
      DeleteRequest: {
        Key: { id: or.id }
      }
    })
  });

  return {
    RequestItems: {
      [process.env.ORDER_TABLE]: deleteRequests
    }
  }
}
