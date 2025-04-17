const express = require('express');
const axios = require('axios');
const CircuitBreaker = require('opossum');
const router = express.Router();

const callServiceB = async () => {
  const res = await axios.post('http://localhost:4000/process');
  return res.data;
};

const breaker = new CircuitBreaker(callServiceB, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  volumeThreshold: 5,
  resetTimeout: 10000,
});

breaker.on('open', () => console.log('🚨 Circuit Breaker OPENED'));
breaker.on('halfOpen', () => console.log('🤔 Circuit Breaker HALF-OPEN'));
breaker.on('close', () => console.log('✅ Circuit Breaker CLOSED'));

router.post('/', async (req, res) => {
  try {
    const result = await breaker.fire();
    res.json({ from: 'Service A', result });
  } catch (err) {
    if (breaker.opened) {
      res.status(503).json({ from: 'Service A', status: '🚫 CB OPEN', reason: err.message });
    } else {
      res.status(500).json({ from: 'Service A', status: '❌ Failed', reason: err.message });
    }
  }
});

module.exports = router;
