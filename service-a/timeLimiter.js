// service-a/timeLimiter.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
  const source = axios.CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel('Timeout: Request took too long');
  }, 2000);

  try {
    const result = await axios.post('http://localhost:4000/process-payment', {}, { cancelToken: source.token });
    clearTimeout(timeout);
    res.json({ from: 'Service A', result: result.data });
  } catch (err) {
    res.status(504).json({ from: 'Service A', status: '⏱ Timeout', reason: err.message });
  }
});

module.exports = router;
