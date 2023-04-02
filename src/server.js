import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server);

io.on("connetion", (socket) => {
  console.log("Socket Connected");
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, (err, res) => {
  console.log(`Listening on ${PORT}`);
});
