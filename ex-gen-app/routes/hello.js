var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const { check, validationResult } = require('express-validator');

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
      res.render('hello/index', data);
    }
    
    connection.end();
  });
});

router.get('/add', (req, res, next) => {
  var data = {
    title: 'Hello/Add',
    content: '新しいレコードを入力：',
    form: {name: '', mail: '', age: 0},
  }
  res.render('hello/add', data);
});

router.post('/add', 
            [
              check('name', 'NAMEは必ず入力してください。').notEmpty(),
              check('mail', 'MAILはメールアドレスを記入してください。').isEmail(),
              check('age', 'AGEは年齢(整数)を入力ください。').isInt()
            ], 
            (req, res, next)=> {
              const errors = validationResult(req);

              if (!errors.isEmpty()) {
                var re = '<ul class="error">';
                var result_arr = errors.array();
                for (var n in result_arr) {
                  re += '<li>' + result_arr[n].msg + '</li>';
                }
                re += '</ul>';
                var data = {
                  title: 'Hello/Add',
                  content: re,
                  form: req.body
                }
                res.render('hello/add', data);
              } else {
                var nm = req.body.name;
                var ml = req.body.mail;
                var ag = req.body.age;
                var data = {'name': nm, 'mail':ml, 'age':ag};
          
                var connection = mysql.createConnection(mysql_setting);
                connection.connect();
                connection.query('insert into mydata set ?', data, function(error, results, fields) {
                  res.redirect('/hello');
                });
                connection.end();
              }
});

router.get('/show', (req, res, next) => {
  var id = req.query.id;

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('select * from mydata where id=?', id, function(error, results, fields) {
    if (error == null) {
      var data = {
        title: 'Hello',
        content: 'id = ' + id + 'のレコード',
        mydata: results[0]
      }
      res.render('hello/show', data);
    }
  });
});

router.get('/edit', (req, res, next)=> {
  var id = req.query.id;

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('SELECT * from mydata where id=?', id, function(error, results, fields) {
    if (error == null) {
      var data = {
        title: 'Hello/edit',
        content: 'id = ' + id + '　のレコード：',
        mydata: results[0]
      };
      res.render('hello/edit', data);
    } 
  });
  connection.end();
});

router.post('/edit', (req, res, next)=> {
  var id = req.body.id;
  var nm = req.body.name;
  var ml = req.body.mail;
  var ag = req.body.age;
  var data = {'name': nm, 'mail': ml, 'age': ag};

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('update mydata set ? where id = ?', [data, id], function (error, results, fields) {
    res.redirect('/hello');
  });
  connection.end();
});

router.get('/delete', (req, res, next)=> {
  var id = req.query.id;

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('SELECT * from mydata where id=?', id, function(error, results, fields) {
    if (error == null) {
      var data = {
        title: 'Hello/delete',
        content: 'id = ' + id + '　のレコード：',
        mydata: results[0]
      };
      res.render('hello/delete', data);
    } 
  });
  connection.end();
});

router.post('/delete', (req, res, next) => {
  var id = req.body.id;
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('delete from mydata where id = ? ', id, function(error, results, fields) {
    res.redirect('/hello')
  });
  connection.end();
});
module.exports = router;
