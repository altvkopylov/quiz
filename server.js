const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));

// io.on('connection', (socket) => {
//     console.log('Пользователь подключен');

//     socket.on('disconnect', () => {
//         console.log('Пользователь отключен');
//     });
// });

//-----------------
// Массив с картами
let deck = Array.from({ length: 36 }, (_, i) => i + 1);

io.on('connection', (socket) => {
    console.log('Пользователь подключен');

    // Отправка оставшихся карт новому подключившемуся клиенту
    socket.emit('updateCards', deck.length);

    // Обработка события "взятия карты"
    socket.on('takeCard', () => {
        if (deck.length > 0) {
            const card = deck.pop();
            // Отправка взятой карты всем подключенным клиентам
            //io.emit('cardTaken', card);
            // Отправка обновленного количества оставшихся карт всем клиентам
            io.emit('updateCards', deck.length);
        } else {
            // Отправка сообщения, если все карты взяты
            socket.emit('allCardsTaken');
        }
    });

    socket.on('resetDeck', () => {
        // Восстановление массива до 36 карт
        deck = Array.from({ length: 36 }, (_, i) => i + 1);

        // Отправка обновленного количества оставшихся карт всем клиентам
        io.emit('updateCards', deck.length);
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключен');
    });
});
//-----------------

//-----------------
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//-----------------

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});