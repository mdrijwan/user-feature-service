const AWS = require('aws-sdk')
const TABLE = process.env.DYNAMODB_TABLE

AWS.config.update({
  region: process.env.REGION,
  endpoint: 'http://localhost:8000'
})

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)
  console.log('DATA', data)
  if (typeof data.email !== 'string' || typeof data.featureName !== 'string' || typeof data.enable !== 'boolean') {
    console.error('Validation Failed')
    callback(null, failureResponseBuilder(
      304,
      JSON.stringify({
        message: 'data not modified'
      })
    ))
    return
  }

  const params = {
    TableName: TABLE,
    Item: {
      email: data.email,
      featureName: data.featureName,
      enable: data.enable,
      createdAt: timestamp
    }
  }

  // insert user data into the database
  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error)
      callback(new Error('Couldn\'t create user.'))
      return
    }
    callback(null, successResponseBuilder)
  })
}

module.exports.get = (event, context, callback) => {
  const data = event.queryStringParameters
  console.log('DATA', data)
  if (data == null || typeof data === undefined) {
    console.error('Validation Failed')
    callback(null, failureResponseBuilder(
      400,
      JSON.stringify({
        message: 'Request Parameters Required'
      })
    ))
    return
  }
  if (data.email == null || typeof data.email === undefined) {
    console.error('Validation Failed')
    callback(null, failureResponseBuilder(
      400,
      JSON.stringify({
        message: 'Alert! email is required'
      })
    ))
    return
  }
  if (data.featureName == null || typeof data.featureName === undefined) {
    console.error('Validation Failed')
    callback(null, failureResponseBuilder(
      400,
      JSON.stringify({
        message: 'Alert! featureName is required'
      })
    ))
    return
  }
  const params = {
    TableName: TABLE,
    Key: {
      email: data.email,
      featureName: data.featureName
    }
  }

  // fetch user data from the database
  dynamoDb.get(params, (error, result) => {
    console.log('RESULT', result)
    // handle potential errors
    if (error) {
      console.error(error)
      callback(null, failureResponseBuilder(
        404,
        JSON.stringify({
          message: 'Couldn\'t get user data'
        })
      ))
      return
    }
    if (result.Item) {
      callback(null, successResponseBuilder(JSON.stringify({ canAccess: result.Item.enable })))
    } else {
      console.error(error)
      callback(null, failureResponseBuilder(
        404,
        JSON.stringify({
          message: 'User data doesn\'t exist'
        })
      ))
    }
  })
}
// create success response
const successResponseBuilder = (body) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: body
  }
}
// create failure response
const failureResponseBuilder = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: body
  }
}
