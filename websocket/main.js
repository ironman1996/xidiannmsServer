const WebSocket = require('ws');
const wsSend = require('./send'),
      wsMessage = require('./message');

const wss=new WebSocket.Server({port:3000});
console.log('webSocket port:3000');

// ws连接成功
wss.on('connection',function(ws,info){
  // 初始化token
  ws.token=undefined;
  // 返回wsKey
  var wsRes={ message:'wsInfo', data:{ name:'wskey', results:info.headers['sec-websocket-key'] } };
  ws.send(JSON.stringify(wsRes));
  wsSend(ws);
  wsMessage(ws);
})