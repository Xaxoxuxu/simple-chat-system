const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http).sockets;

const chatMsgEventStr = 'chat message';
const systemMsgEventStr = 'system message';

const port = 3000;

// set public root dir
app.use(express.static('public'));

// response when we hit main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// on connect, main func
io.on('connection', (socket) => {
    const ip = socket.handshake.address;
    const connectMsg = 'user with ip \'' + ip + '\' connected';

    console.log(connectMsg);
    socket.broadcast.emit(systemMsgEventStr, connectMsg);

    socket.on('disconnect', () => {
        const disconnectMsg = 'user with ip \'' + ip + '\' disconnected';
        console.log(disconnectMsg);
        socket.broadcast.emit(systemMsgEventStr, disconnectMsg);
    });

    socket.on(chatMsgEventStr, (msg) => {
        console.log(ip + ': ' + msg);
        socket.broadcast.emit(chatMsgEventStr, msg);
    });
});

// listen on ipv4 only
http.listen(port, '0.0.0.0', () => {
    console.log('listening on *:' + port);
});