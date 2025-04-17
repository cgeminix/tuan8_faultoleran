const express = require('express');
const app = express();

// Khai báo biến toggle
let toggle = true;

app.use(express.json());

app.post('/process', (req, res) => {
  // Nếu toggle là true, trả về kết quả, ngược lại trả về null
  if (toggle) {
    res.json("processed ✅"); // Trả về kết quả khi toggle true
  } else {
    res.json(null); // Trả về "no-result"
  }

  // Đổi trạng thái toggle sau mỗi lần gọi
  toggle = !toggle;
});

app.listen(4000, () => {
  console.log('🟠 Service B đang chạy tại http://localhost:4000');
});
