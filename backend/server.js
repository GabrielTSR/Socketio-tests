const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app); // criando o protocolo http
const io = require('socket.io')(server); // criando o protocolo wss para o socket

// Chat logic
let messages = [];

io.on('connection', (socket) => {
    console.log(`Socket conectado: ${socket.id}`);
    socket.emit('previousMessages', messages);

    socket.on('sendMessage', (data) => {
        messages.push(data);
        socket.emit('receivedMessage', data);
        socket.broadcast.emit('receivedMessage', data); // Envia mensagem para todos na conexao
    });
});

// Iniciando server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server Running at Port: ${PORT}`);
});