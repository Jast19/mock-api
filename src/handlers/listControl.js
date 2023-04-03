"use strict";

module.exports.handler  = async (event, context) => {
  
  const req = JSON.parse(event.body);
  const { requestMessage } = req;

  let responseCode = '0';

  const inControlList = ['Juan', 'Pedro']
  
  try{
    console.log(requestMessage.body.validateCustomerListRQ);
    if(requestMessage.body.validateCustomerListRQ.name1){
      const isInList = inControlList.includes(requestMessage.body.validateCustomerListRQ.name1);
      responseCode = isInList ? '3' : '0';
    }
  }catch(err){
    console.log('Ocurrio un error:',err);
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "responseMessage": {
          "header": {
            "messageID": "29751518464541046",
            "responseDate": "2022-09-03T15:35:40.540Z",
            "status": {
              "code": responseCode,
              "description": "SUCCES",
              "system": "security-customer-validations"
            },
            "container": {
              "id": "MF-001",
              "name": "MOBILE_FIRST"
            },
            "channel": "MOBILE_FIRST",
            "destination": {
              "serviceName": "SecurityServices",
              "serviceOperation": "validateCustomerList",
              "serviceRegion": "C001",
              "serviceVersion": "1.0.0"
            },
            "provider": {
              "id": "CONTAINER",
              "name": "security-customer-validations"
            },
            "consumer": {
              "address": {
                "deviceAddress": "172.31.17.207",
                "networkAddress": "10.5.1.153"
              },
              "geoPosition": {
                "coords": {},
                "timestamp": ""
              },
              "id": "3999999999",
              "name": "phoneNumber"
            }
          },
          "body": {
            "validateCustomerListRS": {}
          }
        }
      }),
  };
}
