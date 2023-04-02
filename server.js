import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import Actions from "./src/EventActions.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("dist"));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

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

  socket.on(Actions.CODE_CHANGE, ({ id, text }) => {
    // server event emit
    // send code to every client other then me
    socket.in(id).emit(Actions.CODE_CHANGE, { text });
  });

  // listening to sync text
  socket.on(Actions.SYNC_CODE, ({ userSocketId, text }) => {
    // server event emit
    // send code to every client other then me
    io.to(userSocketId).emit(Actions.CODE_CHANGE, { text });
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

  if (err) {
    console.log(err);
  }
});
