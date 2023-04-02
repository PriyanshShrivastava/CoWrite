import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import Actions from "./src/EventActions.js";

const server = http.createServer(app);

const io = new Server(server);

// Socket mapping
const socketMap = {};
const getAllClients = (id) => {
  // checking all the rooms in the adapters ad getting specific room
  return Array.from(io.sockets?.adapter?.rooms.get(id) || []).map(
    (userSocketId) => {
      return {
        userSocketId,
        userName: socketMap[userSocketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  // console.log("Socket Connected", socket.id);

  socket.on(Actions.JOIN, ({ id, userName }) => {
    socketMap[socket.id] = userName;
    // making socket join the room
    socket.join(id);

    const allClients = getAllClients(id);

    // getting all clients detail
    allClients.forEach(({ userSocketId }) => {
      // message emit to every participant
      io.to(userSocketId).emit(Actions.JOINED, {
        allClients,
        userName,
        userSocketId: socket.id,
      });
    });
  });

  // event just before disconnecting (run when: browser close , different page)
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];

    rooms.forEach((id) => {
      // emit an event inside the room
      socket.in(id).emit(Actions.DISCONNECTED, {
        socketId: socket.id,
        userName: socketMap[socket.id],
      });
    });

    delete socketMap[socket.id];

    // leaving a room
    socket.leave();
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, (err, res) => {
  console.log(`Listening on ${PORT}`);
});
