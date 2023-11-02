module.exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
		"data": {
			"code": 0,
			"description": "SUCCESS",
			"otp": "otp"
		}
	  }
      ),
  };
  return response;
};