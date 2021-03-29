const WebSocket = require('ws');
const port = 3000;

console.log(`Foundry API Bridge | Listening on: ${port}`);
const wss = new WebSocket.Server({ port });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log(`Message Received | ${message}`);
  });

  ws.send(JSON.stringify({ type: 'handshake' }));
});
