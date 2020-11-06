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

var bodyParser = require('body-parser');
// urlエンコードしたボディを返す巻数を利用　 こういうのあ → %E3%81%82
app.use(bodyParser.urlencoded({extended: false}));

// トップページ
app.get('/', (req, res) => {
  var msg = 'This is Index Page!<br>' + 'これはトップページです。';
  res.render('index.ejs', {
    title: 'Index',
    content: msg,
  });
});

app.post('/', (req, res) => {
  var msg = 'This is Posted Page!' + 'あなたは「<b>' + req.body.message + '</b>」と送信しました。';
  res.render('index.ejs', {
    title: 'Posted',
    content: msg,
  });
});

// 待受開始
var server = app.listen(3000, () => {
  console.log('Server is running');
});
