const socket = io();

function takeCard() {
    socket.emit('takeCard');
}

function resetDeck() {
    socket.emit('resetDeck');
}

// Обработка события "взятия карты"
socket.on('cardTaken', (card) => {
    alert(`Вы взяли карту: ${card}`);
});

// Обработка события "все карты взяты"
socket.on('allCardsTaken', () => {
    alert('Все карты взяты');
});

// Обновление информации об оставшихся картах
socket.on('updateCards', (remainingCards) => {
    document.getElementById('remainingCards').textContent = `Осталось карт: ${remainingCards}`;
});