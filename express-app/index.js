// expressをインポート
var express = require('express');
var ejs = require('ejs');

// アプリ作成
var app = express();

// 静的ファイルを利用している
// app.use(func) アプリに処理を追加
// express.static('folder') folder内の静的ファイルを全て利用可能にする
app.use(express.static('public'));

// 蓮んだリングエンジンの設定　拡張子とレンダリングに用いる関数を引数に持たせる
app.engine('ejs', ejs.renderFile);

// トップページ
app.get('/', (req, res) => {
  var msg = 'This is Index Page!<br>' + 'これはトップページです。';
  var url = '/other?name=taro&pass=yamada';
  res.render('index.ejs', {
    title: 'Index',
    content: msg,
    link: {href: url, text: '※別のページに移動'}
  });
});

// otherページ
app.get('/other', (req, res) => {
  var name = req.query.name;
  var pass = req.query.pass;
  var msg = 'あなたの名前は' + name + 'です。<br>' + 'パスワードは' + pass + 'です。';
  res.render('index.ejs', {
    title: 'other',
    content: msg,
    link: {href: '/', text: '※トップに戻る'}
  });
});

// 待受開始
app.listen(3000, ()=> {
  console.log('Start server port:3000');
})
