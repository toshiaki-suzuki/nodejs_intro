// expressをインポート
var express = require('express');
var ejs = require('ejs');

// アプリ作成
var app = express();

// 静的ファイルを利用している
app.use(express.static('public'));

// 蓮んだリングエンジンの設定　拡張子とレンダリングに用いる関数を引数に持たせる
app.engine('ejs', ejs.renderFile);

// ルーティング
app.get('/', (req, res) => {
  // index.ejs
  res.render('index.ejs', {
    title: 'Index',
    content: 'This is Express-app Top page!'
  });
})

// 待受開始
app.listen(3000, ()=> {
  console.log('Start server port:3000');
})
