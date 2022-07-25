"use strict";

module.exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log("Body ==> ", body);
  const table = process.env.DELETE_TABLE;
  const dynamoDB = AWS.DynamoDB.DocumentClient();

  const putParams = {
    TableName: table,
    Key: {
      id: body.id,
    },
  };

  try {
    await dynamoDB.put(putParams).promise();
  } catch (err) {
    console.log(err);
  }

  return {
    statusCode: 201,
  };
};
