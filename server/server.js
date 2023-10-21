require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const api = require('./routes/routes');

app.use('/api', api);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
