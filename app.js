const Clarifai = require('clarifai');
const myApiKey = require('./secrets');


// instantiates a new Clarifai app using API key
const app = new Clarifai.App({
  apiKey: myApiKey
});

// predicts the ASL sign of an image by passing in a url and the clarifai model
function predict(model, imgUrl) {
  app.models.predict(model, imgUrl)
    .then(res => {
      const bestMatch = res.rawData.outputs[0].data.concepts[0].name
      console.log('Best Match:', bestMatch);
    })
    .catch(err => console.error(err));
}

let letterCImg = 'https://previews.123rf.com/images/thisboy/thisboy1004/thisboy100400029/28583497-finger-spelling-the-alphabet-letter-c-in-american-sign-language-asl-Stock-Photo.jpg'
predict('aslalphabet', letterCImg);
