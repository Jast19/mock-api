module.exports.handler = async (event, context) => {
  const response = {
    statusCode: 504,
    body: JSON.stringify(
      {
        "response": "Mock getBalance"
      }
    ),
  };
  return response;
};