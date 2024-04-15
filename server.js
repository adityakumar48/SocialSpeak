require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const DBConnect = require("./database");
const cookeParser = require("cookie-parser");
const ACTIONS = require("./actions");
const morgan = require("morgan");
const {
  logGenerator,
  morganMiddleware,
  morganAllRequests,
} = require("./util/logGenerator");

const app = express();
const server = require("http").createServer(app);

// Middleware
app.use(morganMiddleware);
app.use(morganAllRequests);
app.use(morgan("dev"));
logGenerator();

const io = require("socket.io")(server, {
  cors: {
    origin: "https://social-speak.vercel.app",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 8000;
DBConnect();

const corsOptions = {
  credentials: true,
  origin: ["https://social-speak.vercel.app"],
};

app.use(cookeParser());
app.use("/storage", express.static("storage"));
app.use(express.json({ limit: "10mb" }));
app.use(cors(corsOptions));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Sockets

const socketUserMapping = {};

io.on("connection", (socket) => {
  console.log(`A User Connected - ${socket?.id}`);

  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMapping[socket.id] = user;

    //
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    //
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });
      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMapping[clientId],
      });
    });
    socket.join(roomId);
  });

  // Handle ICE candidate
  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  // Handle SDP
  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  // handle Mute
  socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
    console.log(`Mute Triggered on room - ${roomId} by User - ${userId}`);
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.MUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  // handle UnMute
  socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
    console.log("unmute", userId);
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.UNMUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  // Leave the room
  const leaveRoom = ({ roomId }) => {
    const { rooms } = socket;

    Array.from(rooms).forEach((room) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(room) || []);

      clients.forEach((client) => {
        io.to(client).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          user: socketUserMapping[socket.id]?.id,
        });

        socket.emit(ACTIONS.REMOVE_PEER, {
          peerId: client,
          user: socketUserMapping[client]?.id,
        });
      });

      socket.leave(room);
    });
    delete socketUserMapping[socket.id];
  };

  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on("disconnect", leaveRoom);
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
