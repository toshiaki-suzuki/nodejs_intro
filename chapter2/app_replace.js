const http = require('http');
const fs = require('fs');

var server = http.createServer(getFromClient);

server.listen('3000');
console.log('Server start!');

function getFromClient(reqest, response) {
  fs.readFile('./index_replace.html', 'UTF-8', 
    (error, data)=> {
      var content = data.
          // /dummy_title/g ←正規表現
          replace(/dummy_title/g, 'タイトルです').
          replace(/dummy_content/g, 'これがコンテンツです。');

      response.writeHead(200, {'Content-type': 'text/html'});
      response.write(content);
      response.end();
    }
  );

}
