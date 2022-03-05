/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios')

// Import get secrets function
const secret = require('./secret-manager')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

// app.get('/weather', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// app.get('/weather/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

/****************************
* OpenWeatherMap API GET request backend *
* When a user searches a location, the location is POSTed to the backend route '/weather'
* and the GET reqeust to OpenWeatherMap is created, fired, and the data is returned back to the page
****************************/

app.post('/weather', function(req, res) {
  // Obtain the given location from the request.body
  const { location } = req.body

  // Encode the location so we can use it in a URL
  const encodedLocation = encodeURIComponent(location)

  try {
    // Call AWS Secrets to get the OpenWeatherMap API key
    const secretObj = await secret()

    // Call OpenWeatherMap API
    const { data } = await axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}&units=imperial&appid=${secretObj}`
    })
    
    // Return weather data 
    return res.send(data.data)
  } catch (e) {
    console.log(e)
    return res.status(500).send('Error.')
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app