"use strict"

module.exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log("Body ==> ", body);

  const  result = {
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
    }
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}
