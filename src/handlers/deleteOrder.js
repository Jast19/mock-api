"use strict";

module.exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log("Body ==> ", body);
  const table = process.env.DELETE_TABLE;
  const dynamoDB = AWS.DynamoDB.DocumentClient();
  let result = {};
  const putParams = {
    TableName: table,
    Item: {
      ...body,
    },
  };

  try {
    await dynamoDB.put(putParams).promise();
    console.log("After put *+*");
    result = {
      statusCode: 200,
      data: {
        Errors: null,
        Response: {
          PCOrderNo: body.PCOrderNo,
          SCOrderNo: body.PCOrderNo,
          PCNotificationID: "0",
          ProcessDate: "20200105",
          ProcessTime: "230428",
          NotificationCode: "1000",
          NotificationDesc: "Success",
        },
      },
    };
  } catch (err) {
    console.log(err);
    result = {
      statusCode: 200,
      data: {
        Errors: null,
        Response: {
          PCOrderNo: body.PCOrderNo,
          SCOrderNo: body.PCOrderNo,
          PCNotificationID: "0",
          ProcessDate: "20200105",
          ProcessTime: "230428",
          NotificationCode: "6000",
          NotificationDesc: err,
        },
      },
    };
  }

  return {
    statusCode: 201,
  };
};
