import { useEffect } from "react";
import { useState, useRef } from "react";
import socket from "../socket/socket";
import { useLocation, useNavigate } from "react-router-dom";

const GamePage = () => {
  const [typedText, setTypedText] = useState("");
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [winner, setWinner] = useState(false);
  const [winnerId, setWinnerId] = useState("");
  const startTime = useRef(null);
  const [wpm, setWpm] = useState(0);
  const [opponentWpm, setOpponentWpm] = useState("");
  const [rematchRequested, setRematchRequested] = useState(false);
  const [rematchRecieved, setRematchRecieved] = useState(false);
  
  const location = useLocation();
  const { gameText, roomCode } = location.state || {};

  const [currentText, setCurrentText] = useState(gameText || "")
  const [currentRoom, setCurrentRoom] = useState(roomCode || "")

  const navigate = useNavigate();
  if (!currentText) {
    return (
      <div>
        <p>No game in progress.</p>
        <a href="/">Go back home</a>
      </div>
    );
  }

  const requestRematch = () => {
    setRematchRequested(true);
    socket.emit("game:rematch-request", currentRoom);
  };
  const acceptRematch = () => {
    socket.emit("game:rematch-accepted", currentRoom);
  };
  const declineRematch = () => {
    socket.emit("game:rematch-declined", currentRoom);
  };
  const getCorrectLength = () => {
    let correct = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === currentText[i]) {
        correct++;
      } else {
        break;
      }
    }

    return correct;
  };

  const correctLength = getCorrectLength();

  const progress = Math.floor((correctLength / currentText.length) * 100);
  const handleChange = (e) => {
    const newText = e.target.value;
    setTypedText(newText);

    // calculate from newText, not typedText
    let correct = 0;
    for (let i = 0; i < newText.length; i++) {
      if (newText[i] === currentText[i]) correct++;
      else break;
    }
    if (startTime.current == null) {
      startTime.current = Date.now();
    }
    const newProgress = Math.floor((correct / currentText.length) * 100);
    const elapsed = (Date.now() - startTime.current) / 1000 / 60;
    const elapsedSeconds = elapsed * 60;
    const newWpm = elapsedSeconds >= 1 ? Math.floor(correct / 5 / elapsed) : 0;
    setWpm(newWpm);
    socket.emit("game:progress", {
      roomCode: currentRoom,
      progress: newProgress,
      wpm: newWpm,
    });
    if (newProgress == 100) {
      socket.emit("game:finished", currentRoom);
    }
  };

  useEffect(() => {
    socket.on("opponent:progress", (data) => {
      setOpponentProgress(data.progress);
      setOpponentWpm(data.wpm);
    });

    socket.on("game:winner", (id) => {
      setWinner(true);
      setWinnerId(id);
    });

    socket.on("game:rematch-request", () => {
      setRematchRecieved(true);
    });
    socket.on("game:rematch-declined", () => {
      setRematchRequested(false);
      setRematchRecieved(false);
      navigate("/");
    });
    socket.on("game:start", (data) => {
      setTypedText("");
      setOpponentProgress(0);
      setWpm(0);
      setOpponentWpm(0);
      setWinnerId("");
      setWinner(false);
        setCurrentText(data.text)
      setRematchRequested(false);
      setRematchRecieved(false);
      startTime.current = null;
    });

    return () => {
      socket.off("opponent:progress");
      socket.off("game:winner");
      socket.off("game:rematch-request");
      socket.off("game:rematch-declined");
      socket.off("game:start");
    };
  }, [currentRoom]);

  useEffect(() => {
  if (location.state) {
    setCurrentText(location.state.gameText);
    setCurrentRoom(location.state.roomCode);
  }
}, [location.state]);
  return (
    <div> 
      <h2>Type the text below:</h2>
      <div className="wpm">WPM: {wpm}</div>
      <div className="wpm">OPPONENT-WPM: {opponentWpm}</div>

      <p style={{ fontSize: "18px", lineHeight: "1.5" }}>
        {currentText.split("").map((char, index) => {
          let color = "black";

          if (index < typedText.length) {
            if (typedText[index] === char) {
              color = "green";
            } else {
              color = "red";
            }
          }

          return (
            <span key={index} style={{ color }}>
              {char}
            </span>
          );
        })}
      </p>
      <div className="progress-bar">
        <div>
          <label htmlFor="">you</label>
          <span>{progress}%</span>
        </div>
        <div>
          <label htmlFor="">opponent</label>
          <span>{opponentProgress}%</span>
        </div>
      </div>

      <textarea
        value={typedText}
        disabled={winnerId !== ""}
        onChange={handleChange}
        placeholder="Start typing..."
        rows={5}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <h3>Progress: {progress}%</h3>

      {winnerId && (
        <div>
          {winnerId == socket.id ? "you won" : "you lost"}

          {!rematchRequested && !rematchRecieved && (
            <button onClick={requestRematch}>Request Rematch</button>
          )}

          {rematchRequested && <p>Waiting for opponent...</p>}

          {rematchRecieved && (
            <div>
              <p>Opponent wants a rematch</p>
              <button onClick={acceptRematch}>Accept</button>
              <button onClick={declineRematch}>Decline</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GamePage;
