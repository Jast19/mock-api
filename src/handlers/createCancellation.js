"use strict";
const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

module.exports.handler  = async (event, context) => {

  const body = JSON.parse(event.body)
  const table = process.env.CANCELLATION_REQUESTS_TABLE
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  const putParams = {
    TableName: table,
    Item: {
      id: uuid(),
      ...body
    }
  }

  try {
    await dynamoDb.put(putParams).promise();
  } catch (error) {
    console.log(error)
  }
  
  return {
    statusCode: 201
  }
}