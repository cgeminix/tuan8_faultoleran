const express = require('express');
const axios = require('axios');
const router = express.Router();

const callWithRetry = async (retries = 5, delay = 3000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await axios.post('http://localhost:4000/process');
        return res.data;
      } catch (err) {
        if (i === retries - 1) throw err;
        console.log(`Retrying... (${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };
  

router.post('/', async (req, res) => {
  try {
    const result = await callWithRetry();
    
    // Trả về kết quả hoặc thông báo no-result nếu không có kết quả
    if (result) {
      res.json({
        from: 'Service A',
        status: '✅ result',
        result: result,
      });
    } else {
      res.json({
        from: 'Service A',
        status: '⚠️ no-result',
        result: null,
      });
    }

  } catch (err) {
    // Nếu có lỗi trong quá trình gọi service B, trả về thông báo no-result
    res.status(500).json({
      from: 'Service A',
      status: '⚠️ no-result',
      reason: err.message
    });
  }
});

module.exports = router;
