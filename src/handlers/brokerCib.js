"use strict";

module.exports.handler = async (event, context) => {
  //await delayedGreeting();

  const body = JSON.parse(event.body)
  let response = {}
  const operation = body.requestHeaderOut.Header.destination.operation
  console.log(operation)
  console.log(body)
  switch (operation) {
    case 'getCustomer':
      response = getCustomer()
      break;
    case 'verifyAvailability':
      response = verifyAvailability()
      break;
    case 'executePaymentV2':
      response = executePaymentV2()
      break;
    case 'sellForeignExchange':
      response = sellForeignExchange()
      break;
    case 'getTransactionStatus':
      response = getTransactionStatus()
      break;
    case 'getTransInfoInvoice':
      response = getTransInfoInvoice()
      break;
    case 'reverseSellForeignExchange':
      response = reverseSellForeignExchange()
      break;
    default:
      response = sellForeignExchange()
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedGreeting() {
  console.log("Init");
  await sleep(30000);
  console.log("Finish!");
}

const verifyAvailability = () => {
  return {
    "responseHeaderOut": {
      "Header": {
        "systemId": "MF-001",
        "messageId": "98301650664755373",
        "invokerDateTime": "2022-04-22 16:59:16",
        "destination": {
          "name": "ForeignExchange",
          "namespace": "http://co.bancaDigital/nequi/services/FinancialServices/ForeignExchange/v1.0",
          "operation": "verifyAvailability"
        },
        "responseStatus": {
          "statusCode": "0",
          "statusDesc": "SUCCESS",
          "errorMessage": "",
          "system": "BANCOLOMBIA"
        }
      },
      "Body": {
        "any": {
          "verifyAvailabilityRS": {
            "availability": "AVAILABLE"
          }
        }
      }
    }
  }
}

const executePaymentV2 = () => {

  return {
    "responseHeaderOut": {
      "Header": {
        "systemId": "MF-001",
        "messageId": "1652799458",
        "invokerDateTime": "2022-05-17 09:57:40",
        "destination": {
          "name": "Transfers",
          "namespace": "http://co.bancaDigital/nequi/services/FinancialServices/Transfers/v1.0",
          "operation": "executePaymentV2"
        },
        "responseStatus": {
          "statusCode": "0",
          "statusDesc": "SUCCESS",
          "errorMessage": "",
          "system": "FINACLE"
        }
      },
      "Body": {
        "any": {
          "executePaymentV2RS": {
            "trnId": "      M92",
            "trnDate": "2022-05-17T00:00:00.000"
          }
        }
      }
    }
  }
}

const sellForeignExchange = () => {
  return {
    "responseHeaderOut": {
      "Header": {
        "systemId": "MF-001",
        "messageId": "92931649172776226",
        "invokerDateTime": "2022-04-05 10:33:00",
        "destination": {
          "name": "ForeignExchange",
          "namespace": "http://co.bancaDigital/nequi/services/FinancialServices/ForeignExchange/v1.0",
          "operation": "sellForeignExchange"
        },
        "responseStatus": {
          "statusCode": "0",
          "statusDesc": "SUCCESS",
          "errorMessage": "",
          "system": "BANCOLOMBIA"
        }
      },
      "Body": {
        "any": {
          "sellForeignExchangeRS": {
            "voucherExchange": "27020"
          }
        }
      }
    }
  }
}

const getTransactionStatus = () => {
  return {
    "responseHeaderOut": {
      "Header": {
        "systemId": "MF-001",
        "messageId": "1652799201",
        "invokerDateTime": "2022-05-17 09:53:21",
        "destination": {
          "name": "Transaction",
          "namespace": "http://co.bancaDigital/nequi/services/FinancialServices/Transaction/v1.0",
          "operation": "getTransactionStatus"
        },
        "responseStatus": {
          "statusCode": "0",
          "statusDesc": "SUCCESS",
          "errorMessage": "Response data not found",
          "system": "FINACLE"
        }
      },
      "Body": {
        "any": {
          "getTransactionStatusRS": {}
        }
      }
    }
  }
}

const getTransInfoInvoice = () => {
  return {
    "responseHeaderOut": {
      "Header": {
        "systemId": "MF-001",
        "messageId": "123123",
        "invokerDateTime": "2022-06-09 08:35:46",
        "destination": {
          "name": "InvoicePayment",
          "namespace": "http://co.bancaDigital/nequi/services/ACHServices/InvoicePayment/v1.0",
          "operation": "getTransInfoInvoice"
        },
        "responseStatus": {
          "statusCode": "0",
          "statusDesc": "SUCCESS",
          "errorMessage": "Response data not found",
          "system": "FINACLE"
        }
      },
      "Body": {
        "any": {
          "getTransInfoInvoiceRS": {}
        }
      }
    }
  }
}

const reverseSellForeignExchange = () => {
  return {
    "responseHeaderOut": {
      "Header": {
        "systemId": "MBS_FinancialServices_623",
        "messageId": "69451652903181417",
        "invokerDateTime": "2022-05-18 14:46:36",
        "destination": {
          "name": "ForeignExchange",
          "namespace": "http://co.bancaDigital/nequi/services/FinancialServices/ForeignExchange/v1.0",
          "operation": "reverseSellForeignExchange"
        },
        "responseStatus": {
          "statusCode": "0",
          "statusDesc": "SUCCESS",
          "errorMessage": "",
          "system": ""
        }
      },
      "Body": {
        "any": {
          "reverseSellForeignExchangeRS": ""
        }
      }
    }
  }
}

const getCustomer = () => {
  return {
    "responseHeaderOut": {
      "Header": {
        "systemId": "MF-001",
        "messageId": "693045554157",
        "invokerDateTime": "2023-02-28 17:05:46",
        "destination": {
          "name": "CustManagForeignExchange",
          "namespace": "http://co.bancaDigital/nequi/services/UserServices/CustManagForeignExchange/v1.0",
          "operation": "getCustomer"
        },
        "responseStatus": {
          "statusCode": "0",
          "statusDesc": "SUCCESS",
          "errorMessage": "",
          "system": ""
        }
      },
      "Body": {
        "any": {
          "getCustomerRS": {}
        }
      }
    }
  }
}
