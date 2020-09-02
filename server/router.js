const express = require('express'),
  router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the president speaking');
});

module.exports = router