module.exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        "data": {
          "fullRate" : 2990.00
        }
      }
      ),
  };
  return response;
};