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

var data = {
  'Taro' : 'taro@yamada',
  'Hanako' : 'hanako@yamada',
  'Sachiko' : 'sachiko@yamada',
  'Ichiro' : 'ichiro@yamada',
}

// トップページ
app.get('/', (req, res) => {
  var msg = 'This is Index Page!<br>' + 'これはトップページです。';
  res.render('index.ejs', {
    title: 'Index',
    content: msg,
    data: data
  });
});

// 待受開始
var server = app.listen(3000, () => {
  console.log('Server is running');
});
