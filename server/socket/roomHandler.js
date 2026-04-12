const typingTexts = require("../data/texts");

const generateRoomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const generateRandomText = (data) => {
  return data[Math.floor(Math.random() * data.length)];
};

// Store rematch timeouts per room
const rematchTimeouts = new Map();

const roomHandler = (io, socket) => {
  socket.on("room:create", () => {
    const roomCode = generateRoomCode();
    socket.join(roomCode);
    socket.roomCode = roomCode; // Track user's room
    console.log(`Room created: ${roomCode} by ${socket.id}`);
    socket.emit("room:created", roomCode);
  });

  socket.on("room:join", (roomCode) => {
    const room = io.sockets.adapter.rooms.get(roomCode);
    const numberOfClients = room ? room.size : 0;

    if (numberOfClients === 0) {
      socket.emit("room:not-found", { message: "Room does not exist" });
      return;
    }

    if (numberOfClients >= 2) {
      socket.emit("room:full", { message: "Room is full" });
      return;
    }

    // Join the room
    socket.join(roomCode);
    socket.roomCode = roomCode; // Track user's room
    console.log(`User ${socket.id} joined room: ${roomCode}`);

    io.to(roomCode).emit("room:ready");

    // Start countdown only when 2 players are present
    let count = 3;
    const countdown = setInterval(() => {
      io.to(roomCode).emit("game:countdown", count);
      count--;
      if (count < 0) {
        clearInterval(countdown);
        io.to(roomCode).emit("game:start", {
          text: generateRandomText(typingTexts),
        });
      }
    }, 1000);
  });

  socket.on("game:progress", (data) => {
    socket
      .to(data.roomCode)
      .emit("opponent:progress", { progress: data.progress, wpm: data.wpm });
  });

  socket.on("game:finished", (roomCode) => {
    io.to(roomCode).emit("game:winner", socket.id);
  });

  socket.on("game:rematch-request", (roomCode) => {
    console.log(`Rematch requested in room ${roomCode}`);
    socket.to(roomCode).emit("game:rematch-request");

    if (rematchTimeouts.has(roomCode)) {
      clearTimeout(rematchTimeouts.get(roomCode));
    }

    const timeout = setTimeout(() => {
      console.log(`Rematch timeout in room ${roomCode}`);
      io.to(roomCode).emit("game:rematch-declined");
      rematchTimeouts.delete(roomCode);
    }, 30000);

    rematchTimeouts.set(roomCode, timeout);
  });

  socket.on("game:rematch-accepted", (roomCode) => {
    console.log(`Rematch accepted in room ${roomCode}`);

    if (rematchTimeouts.has(roomCode)) {
      clearTimeout(rematchTimeouts.get(roomCode));
      rematchTimeouts.delete(roomCode);
    }

    let count = 3;
    const countdown = setInterval(() => {
      io.to(roomCode).emit("game:countdown", count);
      count--;
      if (count < 0) {
        clearInterval(countdown);
        io.to(roomCode).emit("game:start", {
          text: generateRandomText(typingTexts),
        });
      }
    }, 1000);
  });

  socket.on("game:rematch-declined", (roomCode) => {
    console.log(`Rematch declined in room ${roomCode}`);

    if (rematchTimeouts.has(roomCode)) {
      clearTimeout(rematchTimeouts.get(roomCode));
      rematchTimeouts.delete(roomCode);
    }

    io.to(roomCode).emit("game:rematch-declined");
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);

    if (socket.roomCode) {
      const roomCode = socket.roomCode;

      socket.to(roomCode).emit("opponent:disconnected");

      // Clear any pending rematch timeout
      if (rematchTimeouts.has(roomCode)) {
        clearTimeout(rematchTimeouts.get(roomCode));
        rematchTimeouts.delete(roomCode);
      }
    }
  });
};

module.exports = roomHandler;
