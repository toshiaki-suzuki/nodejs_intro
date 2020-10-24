// インターネットサクセスするhttpオブジェクトを読み込む
const http = require('http');

// サーバーのオブジェクトを作成
var server = http.createServer(
  (request, response)=>{
    response.end('Hello Node,js!');
  }
);

// サーバーを待ち受け状態にする
server.listen(3000);
