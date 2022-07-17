"use strict";

module.exports.handler  = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "this lambda is deleteOrder",
        input: event,
      },
      null,
      2
    ),
  };
}
