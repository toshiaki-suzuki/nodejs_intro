var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var mysql_setting = {
  host: '192.168.64.2',
  port: '3306',
  user: 'admin',
  password: 'password',
  database: 'my-nodeapp-db',
};

/* GET home page. */
router.get('/', (req, res, next) => {
  var connection = mysql.createConnection(mysql_setting);
  // dbに接続
  connection.connect();

  // データ取得→取得後の処理
  connection.query('SELECT * from mydata', function(error, results, fields) {
    if (error == null) {
      var data = {title: 'mysql', content: results};
      res.render('hello', data);
    }
    console.log(error);
    connection.end();
  });
});

module.exports = router;
