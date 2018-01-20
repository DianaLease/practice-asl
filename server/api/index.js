const router = require('express').Router();
const clarifaiApp = require('../clarifaiApp')
module.exports = router;

//api routes

// helper function - predicts the ASL sign of an image by passing in a url and the clarifai model
function predict(model, imgUrl) {
  return clarifaiApp.models.predict(model, imgUrl)
    .then(res => {
      const bestMatch = res.rawData.outputs[0].data.concepts[0].name;
      console.log('Best Match:', bestMatch);
      return bestMatch
    })
}

router.post('/practice', (req, res, next) => {
  predict('aslalphabet', req.body.imgUrl)
    .then(letter => res.send(letter))
    .catch(err => console.error(err));
})

//TEST
let letterCImg = 'http://www.childstoryhour.com/images/coloring/c.jpg'
predict('aslalphabet', letterCImg);


//if not one of the routes above, send 404
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
