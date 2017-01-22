var http = require("http");
var fs = require("fs");
var events = require('events');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('connection', function() {
   console.log('连接成功。');
   eventEmitter.emit('data_received');
});
 
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});

eventEmitter.emit('connection');

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

http.createServer(function(request, response) {
  fs.readFile('input.txt', function (err, data) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World\n");
    if (err) {
      response.write(err.stack);
    }
    else {
      response.write(data.toString());
    }
    response.end();
  });
}).listen(8000);
