const typingTexts = require("../data/texts");

const generateRoomCode = ()=>{
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

const generateRandomText = (data)=>{
  return data[Math.floor(Math.random() * data.length)]
}

const roomHandler = (io, socket) => {
  socket.on("room:create", () => {
    const roomCode = generateRoomCode();
    socket.join(roomCode);
    console.log(`Room created: ${roomCode}`);
    socket.emit("room:created", roomCode);
  });

  socket.on("room:join", (roomCode) => {
    const clientsInRoom = io.sockets.adapter.rooms.get(roomCode);
    const numberOfClients = clientsInRoom ? clientsInRoom.size : 0;

    if (numberOfClients < 2) {
      socket.join(roomCode);
      console.log(`User joined room: ${roomCode}`);
      io.to(roomCode).emit("room:joined");

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
      return;
    }
    socket.emit("room:full", { message: "Room is full" });
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
    socket.to(roomCode).emit("game:rematch-request");

    const timeout = setTimeout(() => {
      io.to(roomCode).emit("game:rematch-declined");
    }, 30000);
  });
  socket.on("game:rematch-accepted", (roomCode) => {
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
    io.to(roomCode).emit("game:rematch-declined");
  });
};

module.exports = roomHandler;
