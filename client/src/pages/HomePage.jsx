import { useState, useEffect, useRef } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom"


const HomePage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [countDown, setCountDown] = useState("");
  const [gameText, setGameText] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [myRoomCode, setMyRoomCode] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const roomCodeRef = useRef("")

  const navigate = useNavigate();

  const createRoom = () => {
    socket.emit("room:create");
  };

  const joinRoom = () => {
    roomCodeRef.current = roomCode
    socket.emit("room:join", roomCode);
  };

  useEffect(() => {
    const handleRoomCreated = (code) => {
        roomCodeRef.current = code 
      setMyRoomCode(code);
      setRoomCode(code)
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
     navigate("/game", { state: { gameText: data.text, roomCode: roomCodeRef.current } })
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
    <div>
      {!inRoom ? (
        <>
          <button onClick={createRoom}>Create Room</button>
          <input
            onChange={(e) => setRoomCode(e.target.value)}
            value={roomCode}
            placeholder="Enter room code"
          />
          <button onClick={joinRoom}>Join Room</button>
        </>
      ) : (
        <div>
          {myRoomCode && <p>Your Room Code: <strong>{myRoomCode}</strong></p>}
          <p>Waiting for opponent...</p>
          {countDown && <h1>{countDown}</h1>}
        </div>
      )}
    </div>
  );
};

export default HomePage;
