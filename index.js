const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

let server = app.listen(process.env.PORT || 3000);

console.log(server);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('someone connected');
    socket.on('message', (mes) => {
        console.log(mes);
        io.emit('message', mes);
    });
    socket.on('disconnect', () => {
        console.log('someone disconnected');
    });
});