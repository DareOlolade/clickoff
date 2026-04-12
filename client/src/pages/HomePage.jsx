import { useState, useEffect, useRef } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [countDown, setCountDown] = useState("");
  const [gameText, setGameText] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [myRoomCode, setMyRoomCode] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const roomCodeRef = useRef("");

  const navigate = useNavigate();

  const createRoom = () => {
    socket.emit("room:create");
  };

  const joinRoom = () => {
    if (!roomCode.trim()) return;
    roomCodeRef.current = roomCode;
    socket.emit("room:join", roomCode);
  };

  useEffect(() => {
    const handleRoomCreated = (code) => {
      roomCodeRef.current = code;
      setMyRoomCode(code);
      setRoomCode(code);
      setInRoom(true);
    };

    const handleRoomJoined = () => {
      setInRoom(true);
    };

    const handleRoomFull = (data) => {
      alert(data.message);
    };

    const handleCountdown = (count) => {
      setCountDown(count);
    };

    const handleGameStart = (data) => {
      setGameText(data.text);
      setGameStarted(true);
      navigate("/game", {
        state: { gameText: data.text, roomCode: roomCodeRef.current },
      });
    };

    socket.on("room:created", handleRoomCreated);
    socket.on("room:joined", handleRoomJoined);
    socket.on("room:full", handleRoomFull);
    socket.on("game:countdown", handleCountdown);
    socket.on("game:start", handleGameStart);

    return () => {
      socket.off("room:created", handleRoomCreated);
      socket.off("room:joined", handleRoomJoined);
      socket.off("room:full", handleRoomFull);
      socket.off("game:countdown", handleCountdown);
      socket.off("game:start", handleGameStart);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-monkey-bg text-white">
      {/* 🔝 TOP BAR */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-neutral-800">
        <h1 className="text-xl font-bold tracking-widest text-yellow-400">
          CLICKOFF
        </h1>
        <div className="flex gap-6 text-sm text-neutral-400 font-mono">
          <span>1v1 typing battles</span>
        </div>
      </div>

      {/* 🎮 MAIN CONTENT */}
      <div className="flex flex-1 items-center justify-center px-8">
        <div className="max-w-2xl w-full">
          {/* Title Section */}
          {!inRoom && (
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-300 mb-3">
                ready to race?
              </h2>
              <p className="text-neutral-500 font-mono text-sm">
                create a room or join with a code
              </p>
            </div>
          )}

          {/* Waiting / Countdown State */}
          {inRoom && (
            <div className="text-center mb-12">
              {countDown ? (
                <div className="animate-pulse">
                  <div className="text-8xl font-bold text-yellow-400 mb-4">
                    {countDown}
                  </div>
                  <p className="text-neutral-400 font-mono text-sm">
                    get ready...
                  </p>
                </div>
              ) : (
                <div>
                  <div className="inline-block px-6 py-3 bg-neutral-800 rounded-lg mb-4">
                    <p className="text-xs text-neutral-500 font-mono mb-1">
                      ROOM CODE
                    </p>
                    <p className="text-3xl font-bold tracking-widest text-yellow-400 font-mono">
                      {myRoomCode || roomCode}
                    </p>
                  </div>
                  <p className="text-neutral-500 font-mono text-sm flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                    waiting for opponent...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {!inRoom && (
            <div className="space-y-4">
              {/* Create Room */}
              <button
                onClick={createRoom}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-5 rounded-lg transition-all font-mono tracking-wider"
              >
                CREATE ROOM
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-neutral-800"></div>
                <span className="text-neutral-600 text-xs font-mono">OR</span>
                <div className="flex-1 h-px bg-neutral-800"></div>
              </div>

              {/* Join Room */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && joinRoom()}
                  placeholder="ENTER ROOM CODE"
                  maxLength={6}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-yellow-400 text-yellow-400 font-mono text-center text-2xl tracking-widest py-4 rounded-lg outline-none transition-all placeholder:text-neutral-700"
                />
                <button
                  onClick={joinRoom}
                  disabled={!roomCode.trim()}
                  className="w-full border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black text-yellow-400 font-bold py-5 rounded-lg transition-all font-mono tracking-wider disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-yellow-400"
                >
                  JOIN ROOM
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🔻 BOTTOM HINT */}
      <div className="text-center text-sm text-neutral-500 pb-6 font-mono">
        {inRoom
          ? "share the code with your opponent"
          : "create a room to get started · or join an existing one"}
      </div>
    </div>
  );
};

export default HomePage;