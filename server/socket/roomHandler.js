const typingTexts = require("../data/texts");

const generateRoomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const generateRandomText = (data, category) => {
  const categoryTexts = data[category] || data["quotes"] || [];
  if (!categoryTexts.length) return "";
  return categoryTexts[Math.floor(Math.random() * categoryTexts.length)];
};

// Room/game state
const rematchTimeouts = new Map();
const roomSettings = new Map();
const roomCountdowns = new Map();
const gameTimers = new Map();
const roomProgress = new Map();
const activeGames = new Map();

const clearCountdown = (roomCode) => {
  const countdown = roomCountdowns.get(roomCode);
  if (countdown) clearInterval(countdown);
  roomCountdowns.delete(roomCode);
};

const clearTimer = (roomCode) => {
  const timer = gameTimers.get(roomCode);
  if (timer) clearInterval(timer);
  gameTimers.delete(roomCode);
};

const cleanupRoom = (roomCode) => {
  clearCountdown(roomCode);
  clearTimer(roomCode);

  if (rematchTimeouts.has(roomCode)) {
    clearTimeout(rematchTimeouts.get(roomCode));
    rematchTimeouts.delete(roomCode);
  }

  roomSettings.delete(roomCode);
  roomProgress.delete(roomCode);
  activeGames.delete(roomCode);
};

const determineTimeoutWinner = (io, roomCode) => {
  const room = io.sockets.adapter.rooms.get(roomCode);
  const memberIds = room ? Array.from(room) : [];
  const progressMap = roomProgress.get(roomCode) || new Map();

  let winnerId = null;
  let bestChars = -1;
  let bestWpm = -1;

  for (const memberId of memberIds) {
    const stats = progressMap.get(memberId) || {};
    const correctChars = stats.correctChars ?? 0;
    const wpm = stats.wpm ?? 0;

    if (
      correctChars > bestChars ||
      (correctChars === bestChars && wpm > bestWpm)
    ) {
      bestChars = correctChars;
      bestWpm = wpm;
      winnerId = memberId;
    }
  }

  if (!winnerId && memberIds.length > 0) {
    winnerId = memberIds[0];
  }

  return winnerId;
};

const endGame = (io, roomCode, winnerId, reason = "finished") => {
  const game = activeGames.get(roomCode);
  if (game?.finished) return false;

  activeGames.set(roomCode, { finished: true });
  clearTimer(roomCode);
  roomProgress.delete(roomCode);

  io.to(roomCode).emit("game:winner", {
    winnerId,
    reason,
  });

  return true;
};

const startRoomTimer = (io, roomCode, duration = 30) => {
  clearTimer(roomCode);

  let timeLeft = duration;
  io.to(roomCode).emit("game:timer", timeLeft);

  const interval = setInterval(() => {
    const game = activeGames.get(roomCode);
    if (!game || game.finished) {
      clearTimer(roomCode);
      return;
    }

    timeLeft -= 1;
    io.to(roomCode).emit("game:timer", Math.max(timeLeft, 0));

    if (timeLeft <= 0) {
      clearTimer(roomCode);
      const winnerId = determineTimeoutWinner(io, roomCode);
      endGame(io, roomCode, winnerId, "timeout");
    }
  }, 1000);

  gameTimers.set(roomCode, interval);
};

const startCountdownAndGame = (io, roomCode) => {
  clearCountdown(roomCode);

  let count = 3;

  const interval = setInterval(() => {
    const room = io.sockets.adapter.rooms.get(roomCode);

    // If the room loses a player during countdown, stop the countdown
    if (!room || room.size < 2) {
      clearCountdown(roomCode);
      return;
    }

    io.to(roomCode).emit("game:countdown", count);
    count -= 1;

    if (count < 0) {
      clearCountdown(roomCode);

      const currentRoom = io.sockets.adapter.rooms.get(roomCode);
      if (!currentRoom || currentRoom.size < 2) return;

      const settings = roomSettings.get(roomCode) || { category: "quotes" };
      const duration = 30;
      const text = generateRandomText(typingTexts, settings.category);

      roomProgress.set(roomCode, new Map());
      activeGames.set(roomCode, { finished: false });

      io.to(roomCode).emit("game:start", {
        text,
        duration,
      });

      startRoomTimer(io, roomCode, duration);
    }
  }, 1000);

  roomCountdowns.set(roomCode, interval);
};

const roomHandler = (io, socket) => {
  socket.on("room:create", (category = "quotes") => {
    const roomCode = generateRoomCode();

    socket.join(roomCode);
    socket.roomCode = roomCode;
    roomSettings.set(roomCode, { category });

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

    socket.join(roomCode);
    socket.roomCode = roomCode;

    io.to(roomCode).emit("room:ready");

    const roomAfterJoin = io.sockets.adapter.rooms.get(roomCode);
    if (roomAfterJoin && roomAfterJoin.size === 2) {
      startCountdownAndGame(io, roomCode);
    }
  });

  socket.on("game:progress", (data) => {
    const roomCode = data.roomCode;
    const game = activeGames.get(roomCode);

    if (!game || game.finished) return;

    if (!roomProgress.has(roomCode)) {
      roomProgress.set(roomCode, new Map());
    }

    roomProgress.get(roomCode).set(socket.id, {
      progress: data.progress,
      wpm: data.wpm,
      correctChars: data.correctChars,
    });

    socket.to(roomCode).emit("opponent:progress", {
      progress: data.progress,
      wpm: data.wpm,
      correctChars: data.correctChars || 0,
    });
  });

  socket.on("game:finished", (roomCode) => {
    const game = activeGames.get(roomCode);
    if (!game || game.finished) return;

    endGame(io, roomCode, socket.id, "finished");
  });

  socket.on("game:rematch-request", (roomCode) => {
    const room = io.sockets.adapter.rooms.get(roomCode);
    const game = activeGames.get(roomCode);

    if (!room || room.size < 2 || !game || !game.finished) return;

    socket.to(roomCode).emit("game:rematch-request");

    if (rematchTimeouts.has(roomCode)) {
      clearTimeout(rematchTimeouts.get(roomCode));
    }

    const timeout = setTimeout(() => {
      io.to(roomCode).emit("game:rematch-declined");
      rematchTimeouts.delete(roomCode);
    }, 30000);

    rematchTimeouts.set(roomCode, timeout);
  });

  socket.on("game:rematch-accepted", (roomCode) => {
    const room = io.sockets.adapter.rooms.get(roomCode);
    const game = activeGames.get(roomCode);

    if (!room || room.size < 2 || !game || !game.finished) return;

    if (rematchTimeouts.has(roomCode)) {
      clearTimeout(rematchTimeouts.get(roomCode));
      rematchTimeouts.delete(roomCode);
    }

    clearCountdown(roomCode);
    clearTimer(roomCode);

    startCountdownAndGame(io, roomCode);
  });

  socket.on("game:rematch-declined", (roomCode) => {
    if (rematchTimeouts.has(roomCode)) {
      clearTimeout(rematchTimeouts.get(roomCode));
      rematchTimeouts.delete(roomCode);
    }

    io.to(roomCode).emit("game:rematch-declined");
  });

  socket.on("disconnect", () => {
    if (!socket.roomCode) return;

    const roomCode = socket.roomCode;
    const room = io.sockets.adapter.rooms.get(roomCode);
    const remaining = room ? Array.from(room) : [];

    if (rematchTimeouts.has(roomCode)) {
      clearTimeout(rematchTimeouts.get(roomCode));
      rematchTimeouts.delete(roomCode);
    }

    // If one player remains during an active game, that player wins
    const game = activeGames.get(roomCode);
    if (remaining.length === 1 && game && !game.finished) {
      endGame(io, roomCode, remaining[0], "disconnect");
      return;
    }

    // If no players remain, clean up everything
    if (remaining.length === 0) {
      cleanupRoom(roomCode);
      return;
    }

    // If room still has one player but no active game (ex: during countdown), stop countdown
    if (remaining.length < 2) {
      clearCountdown(roomCode);
    }
  });
};

module.exports = roomHandler;