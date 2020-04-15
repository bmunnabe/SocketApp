const express = require('express');
const socket = require('socket.io');
const http = require('http');
const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(router);
server.listen(PORT, () => console.log(`Listening Port ${PORT}`));
