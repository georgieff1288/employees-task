const ws = require('ws')
const wss = new ws.WebSocketServer({ port: 8080 });

const clients = new Set();
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        clients.add(ws);
        console.log('received: %s', data);
        for(let client of clients) {
            client.send(data);
        }
    });
});