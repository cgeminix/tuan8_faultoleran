// service-b/app.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/process', (req, res) => {
  res.json({ status: '✅ Processed by Service B' });
});

app.listen(4000, () => {
  console.log('🟢 Service B đang chạy tại http://localhost:4000');
});
