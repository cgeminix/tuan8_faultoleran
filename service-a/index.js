// service-a/app.js
const express = require('express');
const bodyParser = require('body-parser');

const circuit = require('./circuitBreaker');
const retry = require('./retry');
const rateLimiter = require('./rateLimiter');
// const timeLimiter = require('./timeLimiter');

const app = express();
app.use(bodyParser.json());

app.use('/circuit', circuit);
app.use('/retry', retry);
app.use('/rate', rateLimiter);
// app.use('/time', timeLimiter);

app.listen(3000, () => {
  console.log('🔵 Service A đang chạy tại http://localhost:3000');
});
