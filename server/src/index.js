const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./router');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.static('./dist'));
const port = parseInt(process.env.PORT) || 8080;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(`Starting on port ${port}`);
  app.listen(port);
});
