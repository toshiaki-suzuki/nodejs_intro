var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var mysql_setting = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'favoard',
};

router.get('/', (req, res, next) => {
  var connection = mysql.createConnection(mysql_setting);
  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
  });
  connection.query('SELECT * from articles', function(error, results, fields) {
    // var data = {title: 'Articles', content: results};
    // res.render('articles', data);
    connection.end();
  });
});

router.get('/add', function(req, res, next) {
  res.render('articles/add', {'title': 'New Articles'});
});

module.exports = router;
