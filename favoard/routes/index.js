const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Favoard' });
});

// app.jsでインポートするのに必要
module.exports = router;