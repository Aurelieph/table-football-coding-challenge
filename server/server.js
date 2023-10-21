const express = require('express');
const app = express();

require('dotenv').config({ path: '../.env' });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
