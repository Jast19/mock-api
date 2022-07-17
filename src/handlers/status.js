"use strict";
const AWS = require('aws-sdk');

module.exports.handler = async (event, context) => {

  const body = JSON.parse(event.body)
  console.log("body ==> ", body)
  const table = process.env.STATUS_TABLE
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  let result = {};
  const putParams = {
    TableName: table,
    Item: {
      ...body
    }
  }

  try {
    await dynamoDb.put(putParams).promise();
    console.log('after put *+*')
    result = {
      statusCode: 200,
      data: {
        Errors: null,
        Response: {
          PCOrderNo: body.PCOrderNo,
          SCOrderNo: body.PCOrderNo,
          PCNotificationID: "0",
          ProcessDate: "20200105",
          ProcessTime: "231303",
          NotificationCode: "1000",
          NotificationDesc: "Success"
        }
      }
    }
  } catch (error) {
    console.log(error)

    result = {
      statusCode: 200,
      data: {
        Errors: null,
        Response: {
          PCOrderNo: body.PCOrderNo,
          SCOrderNo: body.PCOrderNo,
          PCNotificationID: "0",
          ProcessDate: "20200105",
          ProcessTime: "231303",
          NotificationCode: "6000",
          NotificationDesc: error
        }
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}