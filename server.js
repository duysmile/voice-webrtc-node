const uuid = require('uuid').v4;
const express = require('express');
const socketio = require('socket.io');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = require('http').Server(app);
const io = socketio(server, {
    allowEIO3: true,
});
const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.use('/peerjs', peerServer);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (_, res) => {
    res.redirect(`/${uuid()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', {
        roomId: req.params.room,
    });
});

io.on('connection', socket => {
    console.log('connected');
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
    });
});

server.listen(3030, () => {
    console.log("Server started at: http://localhost:3030");
});
