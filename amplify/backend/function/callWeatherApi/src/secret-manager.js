// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK
var AWS = require('aws-sdk')

module.exports = async() => {
    // Create a Secrets Manager client
    const secretsManager = new AWS.SecretsManager()
    // Obtain our 'openweathermap' secret
    const secret = await secretsManager.getSecretValue({
        SecretId: 'openweathermap'
    }).promise()
    // If our secret was not successfully retrieved, return an error
    if (!secret) {
        throw new Error('Secret not found.')
    }
    // Return the parsed JSON object with our secret string in it
    return JSON.parse(secret.SecretString)
}

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.