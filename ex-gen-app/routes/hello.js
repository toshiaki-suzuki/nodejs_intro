var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.query.name;
  var mail = req.query.mail;
  var data = { 
    title: 'Hello!',
    content: 'あなたの名前は、' + name + '。<br>' + 'メールアドレスは' + mail + 'です。'
  };
  res.render('hello', data);
});

router.post('/post', function(req, res, next) {
  // リクエストパラメータの取り出し方
  var msg = req.body['message'];
  var data = {
    title: 'Hello!',
    content: 'あなたは、「' + msg + '」と送信しました。'
  };
  res.render('hello', data);
});

module.exports = router;
