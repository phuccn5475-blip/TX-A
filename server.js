const express = require('express');
const app = express();

// Phục vụ các file tĩnh (html, css, js) trong thư mục dự án
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});