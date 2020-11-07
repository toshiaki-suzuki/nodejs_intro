var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('hello', { 
    title: 'Hello!',
    content: 'これは、サンプルのコンテンツです。<br>this is sample content.'
  });
});

module.exports = router;
