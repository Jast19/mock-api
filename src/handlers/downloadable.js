"use strict";

const AWS = require('aws-sdk');
//const { dataTest } = require('../data/dataTest');
//const { dataStatic } = require('../data/dataStatic');

module.exports.handler = async (event, context) => {
  //return fromJson();
 return fromDb();
}



const fromJson = async () => {
  let result = {};
    const orders = transform()
    let Response;
    if (orders.length === 0) {
      Response = null;
    } else if (orders.length === 1) {
      Response = {
        Order: orders[0],
      };
    } else {
      Response = {
        Order: orders
      }
    }
    result = {
      Errors: null,
      Response
    }

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}

const fromDb = async () => {
  
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  let result = {};
  try {
    const params = {
      TableName: process.env.ORDER_TABLE
    };

    const response = await dynamoDb.scan(params).promise();
    const orders = response.Items;

    let Response;
    if (orders.length === 0) {
      Response = null;
    } else if (orders.length === 1) {
      Response = {
        Order: orders[0],
      };
    } else {
      Response = {
        Order: orders
      }
    }
    result = {
      Errors: null,
      Response
    }

    const deletePa = await deleteParams(orders);
    await dynamoDb.batchWrite(deletePa).promise()

  } catch (error) {
    console.log(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}

const deleteParams = async (order) => {
  let deleteRequests = []
  order.forEach(or => {
    deleteRequests.push({
      DeleteRequest: {
        Key: { id: or.id }
      }
    })
  });

  return {
    RequestItems: {
      [process.env.ORDER_TABLE]: deleteRequests
    }
  }
}


const transform =()=>{
  return dataTest.map((item, key) => {
    return objectMapper(item, key);
  })
}

const objectMapper = (entryobject, key) => {
  let outputData = {
    ...dataStatic,
    Transaction: {
      ...dataStatic.Transaction,
      OrderNo: 'US'+ (Math.floor(new Date().getTime() / 10) + key),
      PIN: Math.floor(new Date().getTime() / 10) + key
    },
    Quotation: {
      ...dataStatic.Quotation,
      PaymentAmount: entryobject.PaymentAmount,
      BeneAmount: entryobject.BeneAmount
    },
    Customer: {
      ...dataStatic.Customer,
      PersonalInformation:{
        ...dataStatic.Customer.PersonalInformation,
        CustFirstName: entryobject.CustFirstName,
        CustMiddleName: entryobject.CustMiddleName,
        CustLastName: entryobject.CustLastName,
        CustLastName2: entryobject.CustLastName2
      }
    },
    Beneficiary: {
      ...dataStatic.Beneficiary,
      PersonalInformation:{
        ...dataStatic.Customer.PersonalInformation,
        BeneFirstName: entryobject.BeneFirstName,
        BeneMiddleName: entryobject.BeneMiddleName,
        BeneLastName: entryobject.BeneLastName,
        BeneLastName2: entryobject.BeneLastName2
      },
      IdentityDocument: {
        ...dataStatic.Beneficiary.IdentityDocument,
        BeneIDNo: entryobject.BeneIDNo
      },
      MobileWallet: {
        ...dataStatic.Beneficiary.MobileWallet,
        MobileWalletAccountNo: entryobject.MobileWalletAccountNo
      }
    }
  }
  return outputData
}
