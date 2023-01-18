const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();

// MIDDLEWARE
isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send('Invalid credentials');
  } else {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(403).send('Invalid credentials');
      } else {
        next();
      }
    })
  }
  res.send('sup');
};

// ROUTER ENDPOINTS
router.post('/login', (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    const token = jwt.sign({
      userId: 1,
    }, process.env.SECRET);
    res.json({
      token,
    });
  } else {
    res.status(401).send('Incorrect password');
  }
});

router.get('/tasks', isLoggedIn, (req, res) => {
  res.send('sup');
});

module.exports = router;