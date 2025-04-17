const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Thiết lập giới hạn rate
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 giây
  max: 5,              // 5 requests mỗi 10 giây
  message: { status: '🚫 Exceed request, wait before retrying' },
});

router.post('/', limiter, (req, res) => {
  res.json({ from: 'Service A', status: '✅ Within rate limit' });
});

module.exports = router;
