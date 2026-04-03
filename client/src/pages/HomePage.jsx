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
  }, []);

  return (
    <div className="flex w-full justify-center items-center flex-col min-h-screen">
      <div className="text-center mb-12">
        <h1 className="font-cinzel text-5xl md:text-6xl font-bold tracking-[0.25em] text-soul">
          CLICKOFF
        </h1>
        <p className="mt-4 text-sm tracking-[0.4em] opacity-80">
          TYPE · FIGHT · DOMINATE
        </p>
        <div className="w-48 h-px bg-soul/30 mx-auto mt-8"></div>
      </div>

      <div className="flex gap-5 w-full max-w-xl">
        <div className="flex-1 bg-cave border border-border-dark rounded-xl p-7">
          {/* Create Room panel */}
          <p className="font-cinzel text-xs tracking-[0.3em] text-soul-dim uppercase">
            Create Battle
          </p>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Start a new game. Share your code, wait for your opponent
          </p>
          <button
            onClick={createRoom}
            className="w-full bg-soul text-void font-cinzel text-sm font-bold tracking-widest py-3 rounded-md mt-4"
          >
            Enter the Arena
          </button>
          {inRoom && myRoomCode && (
            <div className="mt-4 border border-soul/20 rounded-lg p-4 text-center">
              <p className="font-cinzel text-xs tracking-[0.3em] text-soul-dim mb-2">
                Your Battle Code
              </p>
              <p className="font-cinzel text-3xl font-bold tracking-[0.5em] text-soul">
                {myRoomCode}
              </p>
              <p className="text-xs tracking-widest text-gray-600 mt-2">
                Waiting for opponent...
              </p>
            </div>
          )}
          {inRoom && countDown && (
            <div className="mt-4 text-center">
              <p className="font-cinzel text-6xl font-bold text-soul">
                {countDown}
              </p>
            </div>
          )}
        </div>
        <div className="flex-1 bg-cave border border-border-dark rounded-xl p-7">
          {/* Join Room panel */}
          <p className="font-cinzel text-xs tracking-[0.3em] text-soul-dim uppercase">
            Join Battle
          </p>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Enter your opponent's code and step into the fight
          </p>
          <input
            className="w-full bg-void border border-border-dark text-soul-dim font-cinzel tracking-widest uppercase text-sm px-4 py-3 rounded-md"
            onChange={(e) => setRoomCode(e.target.value)}
            value={roomCode}
            placeholder="Enter battle code"
          />
          <button
            onClick={joinRoom}
            className="w-full border border-soul text-soul font-cinzel text-sm font-bold tracking-widest py-3 rounded-md mt-4"
          >
            Challenge
          </button>
          {inRoom && !myRoomCode && <p>waiting for opponent...</p>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
