const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  res.send('hello');
});

router.get('/tasks', (req, res) => {
  res.send('sup');
});

module.exports = router;