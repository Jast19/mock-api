"use strict";
const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

module.exports.handler  = async (event, context) => {

  const body = JSON.parse(event.body)
  console.log("body ==> ",body)
  const table = process.env.ORDER_TABLE
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  console.log('uuid ==> ', uuid())
  const putParams = {
    TableName: table,
    Item: {
      id: uuid(),
      ...body
    }
  }

  try {
    const response = await dynamoDb.put(putParams).promise();
  } catch (error) {
    console.log(error)
  }
  
  return {
    statusCode: 201
  }
}