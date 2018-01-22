const Clarifai = require('clarifai');

const myApiKey = require('../secrets')

// instantiates a new Clarifai app using API key
const clarifaiApp = new Clarifai.App({
  apiKey: myApiKey
});

module.exports = clarifaiApp;
