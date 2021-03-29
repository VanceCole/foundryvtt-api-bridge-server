const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');

const port = 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    wss.broadcast(message);
  });

  // Send handshake confirmation on connect
  ws.send(JSON.stringify({ topic: 'handshake' }));
});

wss.broadcast = function broadcast(msg) {
  console.log(msg);
  wss.clients.forEach(function each(client) {
      client.send(msg);
  });
};

// Serve up static files dir
app.use(express.static('pub'));

server.listen(port);
console.log(`Web server listening on http://localhost:${port}`);
console.log(`Socket server listening on ws://localhost:${port}`);