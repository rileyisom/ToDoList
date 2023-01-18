const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const router = require('./router');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(8080);
