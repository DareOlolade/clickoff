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
  
  const containerRef = useRef(null);
  const cursorRef = useRef(null)
  const prevLineRef = useRef(0);
  const hasStartedTyping = useRef(false);
  const [charsPerLine, setCharsPerLine] = useState(75);

  const location = useLocation();
  const { gameText, roomCode } = location.state || {};

  const [currentText, setCurrentText] = useState(gameText || "");
  const [currentRoom, setCurrentRoom] = useState(roomCode || "");





  useEffect(() => {
    const calculateCharsPerLine = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const charWidth = 14.4; // JetBrains Mono at 24px = ~14.4px per char
        setCharsPerLine(Math.floor(containerWidth / charWidth));
      }
    };

    calculateCharsPerLine();
    window.addEventListener("resize", calculateCharsPerLine);
    return () => window.removeEventListener("resize", calculateCharsPerLine);
  }, []);

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
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (winner) return;

      // Start timer
      if (startTime.current === null) {
        startTime.current = Date.now();
      }

      if (e.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key.length === 1) {
        setTypedText((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [winner]);
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
      setCurrentText(data.text);
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
    let correct = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === currentText[i]) correct++;
      else break;
    }

    const newProgress = Math.floor((correct / currentText.length) * 100);

    if (startTime.current) {
      const elapsed = (Date.now() - startTime.current) / 1000 / 60;
      const newWpm = elapsed > 0 ? Math.floor(correct / 5 / elapsed) : 0;
      setWpm(newWpm);

      socket.emit("game:progress", {
        roomCode: currentRoom,
        progress: newProgress,
        wpm: newWpm,
      });

      if (newProgress === 100) {
        socket.emit("game:finished", currentRoom);
      }
    }
  }, [typedText]);

  useEffect(() => {
    if (location.state) {
      setCurrentText(location.state.gameText);
      setCurrentRoom(location.state.roomCode);
    }
  }, [location.state]);
  
useEffect(() => {
  if (cursorRef.current && containerRef.current) {
    const cursor = cursorRef.current;
    const container = containerRef.current;

    const lineHeight = 41.6; // 2.6rem * 16px
    
    // Get cursor position relative to the container
    const cursorTop = cursor.offsetTop;
    const currentScroll = container.scrollTop;

    // Calculate which line the cursor is on (0-indexed)
    const currentLine = Math.floor(cursorTop / lineHeight);

    // MonkeyType logic: keep cursor on line 1 (second visible line) after first line
    if (currentLine > 0) {
      container.scrollTop = cursorTop - lineHeight;
    } else {
      container.scrollTop = 0;
    }
  }
}, [typedText]); // Runs every time a character is typed
  return (
    <div className="flex flex-col min-h-screen bg-monkey-bg text-white">
      {/* 🔝 TOP BAR */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-neutral-800">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-widest text-yellow-400">
          CLICKOFF
        </h1>

        {/* Progress Bar */}
        <div className="flex-1 mx-10 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-yellow-400 font-mono w-6">you</span>
            <div className="flex-1 h-1 bg-neutral-800 rounded">
              <div
                className="h-1 bg-yellow-400 rounded transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-yellow-400 font-mono w-8">
              {progress}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-red-400 font-mono w-6">opp</span>
            <div className="flex-1 h-1 bg-neutral-800 rounded">
              <div
                className="h-1 bg-red-400 rounded transition-all duration-200 ease-out"
                style={{ width: `${opponentProgress}%` }}
              />
            </div>
            <span className="text-xs text-red-400 font-mono w-8">
              {opponentProgress}%
            </span>
          </div>
        </div>
        {/* Stats */}
        <div className="flex gap-6 text-sm text-neutral-300">
          <span>WPM: {wpm}</span>
          <span>OPP: {opponentWpm}</span>
          <span>Chars: {typedText.length}</span>
        </div>
      </div>

      {/* 🎮 GAME ZONE */}
{/* 🎮 GAME ZONE */}
<div className="flex flex-1 items-center justify-center px-16">
  {/* The fixed-height viewport (shows 3 lines) */}
  <div 
    className="max-w-[900px] w-full relative overflow-hidden" 
    style={{ height: "7.8rem" }} // 2.6rem * 3 lines
  >
    <div 
  ref={containerRef}
  className="font-mono text-2xl"
  style={{
    lineHeight: "2.6rem",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
    height: "100%",
    overflowY: "scroll", // ✅ Allow scrolling
    scrollbarWidth: "none", // Hide scrollbar (Firefox)
    msOverflowStyle: "none", // Hide scrollbar (IE/Edge)
  }}
>
      {currentText.split("").map((char, index) => {
        let className = "text-neutral-600"; // Default (monkey-text)
        
        if (index < typedText.length) {
          className = typedText[index] === currentText[index]
            ? "text-yellow-400" // Correct (monkey-correct)
            : "text-red-500 bg-red-500/20"; // Wrong (monkey-wrong)
        }

        const isCursor = index === typedText.length;

        return (
          <span
            key={index}
            ref={isCursor ? cursorRef : null}
            className={`${className} relative transition-colors duration-100`}
          >
            {isCursor && (
              <span 
                className="absolute left-0 top-0 h-full w-[2px] bg-yellow-400 animate-pulse" 
                style={{ marginLeft: "-1px" }}
              />
            )}
            {char}
          </span>
        );
      })}
    </div>
  </div>
</div>
      {/* 🔻 BOTTOM HINT */}
      <div className="text-center text-sm text-neutral-500 pb-6">
        start typing to begin · backspace to correct
      </div>

      {winnerId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#2c2e31] border border-neutral-700 rounded-xl p-12 text-center flex flex-col gap-6 max-w-md w-full mx-4">
            <h2 className="font-cinzel text-4xl font-bold text-yellow-400">
              {winnerId === socket.id ? "Victory" : "Defeat"}
            </h2>
            <p className="text-neutral-400 font-mono text-sm">
              {winnerId === socket.id
                ? "You finished first!"
                : "Your opponent was faster"}
            </p>
            <div className="flex flex-col gap-2 text-sm font-mono text-neutral-400">
              <span>
                Your WPM: <span className="text-yellow-400">{wpm}</span>
              </span>
              <span>
                Opponent WPM:{" "}
                <span className="text-red-400">{opponentWpm}</span>
              </span>
            </div>

            {!rematchRequested && !rematchRecieved && (
              <button
                onClick={requestRematch}
                className="bg-yellow-400 text-black font-cinzel font-bold tracking-widest py-3 rounded-lg hover:bg-yellow-300 transition-all"
              >
                Request Rematch
              </button>
            )}

            {rematchRequested && (
              <p className="text-neutral-500 font-mono text-sm tracking-widest">
                Waiting for opponent...
              </p>
            )}

            {rematchRecieved && (
              <div className="flex flex-col gap-3">
                <p className="text-neutral-400 font-mono text-sm">
                  Opponent wants a rematch
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={acceptRematch}
                    className="flex-1 bg-yellow-400 text-black font-cinzel font-bold py-3 rounded-lg hover:bg-yellow-300 transition-all"
                  >
                    Accept
                  </button>
                  <button
                    onClick={declineRematch}
                    className="flex-1 border border-neutral-600 text-neutral-400 font-cinzel font-bold py-3 rounded-lg hover:border-neutral-400 transition-all"
                  >
                    Decline
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
