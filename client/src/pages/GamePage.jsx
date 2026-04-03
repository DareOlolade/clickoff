import { useEffect } from "react";
import { useState, useRef } from "react";
import socket from "../socket/socket";
import { useLocation } from "react-router-dom";

const GamePage = () => {
  const [typedText, setTypedText] = useState("");
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [winner, setWinner] = useState(false);
  const [winnerId, setWinnerId] = useState("");
  const startTime = useRef(null);
  const [wpm, setWpm] = useState(0);
  const [opponentWpm, setOpponentWpm] = useState("");

  const location = useLocation();
  const { gameText, roomCode } = location.state || {};

  if (!gameText) {
    return (
      <div>
        <p>No game in progress.</p>
        <a href="/">Go back home</a>
      </div>
    );
  }
  console.log("roomCode:", roomCode);
  console.log("gameText:", gameText);

  const getCorrectLength = () => {
    let correct = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === gameText[i]) {
        correct++;
      } else {
        break;
      }
    }

    return correct;
  };

  const correctLength = getCorrectLength();

  const progress = Math.floor((correctLength / gameText.length) * 100);
  const handleChange = (e) => {
    const newText = e.target.value;
    setTypedText(newText);

    // calculate from newText, not typedText
    let correct = 0;
    for (let i = 0; i < newText.length; i++) {
      if (newText[i] === gameText[i]) correct++;
      else break;
    }
    if (startTime.current == null) {
      startTime.current = Date.now();
    }
    const newProgress = Math.floor((correct / gameText.length) * 100);
    const elapsed = (Date.now() - startTime.current) / 1000 / 60;
    const elapsedSeconds = elapsed * 60;
    const newWpm = elapsedSeconds >= 1 ? Math.floor(correct / 5 / elapsed) : 0;
    setWpm(newWpm);
    socket.emit("game:progress", {
      roomCode,
      progress: newProgress,
      wpm: newWpm,
    });
    if (newProgress == 100) {
      socket.emit("game:finished", roomCode);
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


    return () => {
      socket.off("opponent:progress");
      socket.off("game:winner");
    };
  }, []);
  return (
    <div>
      <h2>Type the text below:</h2>
      <div className="wpm">WPM: {wpm}</div>
      <div className="wpm">OPPONENT-WPM: {opponentWpm}</div>

      <p style={{ fontSize: "18px", lineHeight: "1.5" }}>
        {gameText.split("").map((char, index) => {
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
        onChange={handleChange}
        placeholder="Start typing..."
        rows={5}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <h3>Progress: {progress}%</h3>

      {winnerId && <div>{winnerId == socket.id ? "you won" : "you lost"}</div>}
    </div>
  );
};

export default GamePage;
