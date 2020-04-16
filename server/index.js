const express = require("express");
const socket = require("socket.io");
const http = require("http");
const router = require("./router");
const { addUser, removeUser, getUsersInRoom, getUser } = require("./user");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on("connection", (socket) => {
  console.log("Connected with Socket IO Server");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    //Join room is exist or creating room and join
    socket.join(user.room);

    // This will be emitted to specific person or client
    socket.emit("message", {
      user: "admin",
      text: `Hi ${user.name}, Welcome to room ${user.room}`,
    });
    //this will be emitted to all ROOM people
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined room`,
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback("Successfully received data" + name);
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} left room ${user.room}`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
    console.log("disconnected");
  });
});

app.use(router);
server.listen(PORT, () => console.log(`Listening Port ${PORT}`));
