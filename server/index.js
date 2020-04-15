const express = require('express');
const socket = require('socket.io');
const http = require('http');
const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket) => {
	console.log('Connected with Socket IO Server');

	socket.on('join', ({ name, room }, callback) => {
		console.log('Connected on join');
		console.log(name, room);
		callback(name, room, 'FuckTest');
	});

	socket.on('disconnect', () => {
		console.log('disconnected');
	});
});

app.use(router);
server.listen(PORT, () => console.log(`Listening Port ${PORT}`));
