const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');


const app = express();

//logging middleware
app.use(morgan('dev'));

//body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error, something went wrong in your file');
});

const PORT = 1337;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Your app.listen is working, connection established on ${PORT}`);
});
