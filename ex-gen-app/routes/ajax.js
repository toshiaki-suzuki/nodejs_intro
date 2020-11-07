var express = require('express');
const { route } = require('.');
var router = express.Router();

var data = [
  {name: 'Taro', age: 35, mail: 'taro@yamada'},
  {name: 'Hanako', age: 29, mail: 'Hanako@yamada'},
  {name: 'Sachiko', age: 41, mail: 'Sachiko@yamada'},
];

router.get('/', (req, res, next) => {
  var n = req.query.id;
  res.json(data[n]);
});

module.exports = router;