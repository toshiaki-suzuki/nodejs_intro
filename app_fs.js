// インターネットサクセスするhttpオブジェクトを読み込む
const http = require('http');
const fs = require('fs');

// サーバーのオブジェクトを作成
var server = http.createServer(getFromClient);

// サーバーを待ち受け状態にする
server.listen(3000);
console.log('Server start!');

function getFromClient(req, res) {
  request = req;
  response = res;
  fs.readFile('./index.html', 'UTF-8', writeToResponse);
}

function writeToResponse(error, data) {
  response.writeHead(200, {'Content-Type': 'text:html'});
  response.write(data);
  response.end();
}
