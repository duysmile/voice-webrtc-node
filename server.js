const uuid = require('uuid').v4;
const express = require('express');

const app = express();
const server = require('http').Server(app);

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

server.listen(3000, () => {
    console.log("Server started at port 3000");
});
