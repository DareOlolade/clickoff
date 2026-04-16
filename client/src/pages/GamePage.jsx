import { useEffect, useState, useRef } from "react";
import socket from "../socket/socket";
import { useLocation, useNavigate } from "react-router-dom";
import SaveStatsModal from "../components/SaveStatsModal";
import {
  Trophy,
  Skull,
  Zap,
  Target,
  TrendingUp,
  Swords,
  RotateCcw,
  X,
  ChevronRight,
  Flame,
  Clock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const GamePage = () => {
  const [typedText, setTypedText] = useState("");
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [winner, setWinner] = useState(false);
  const [winnerId, setWinnerId] = useState("");
  const startTime = useRef(null);
  const [wpm, setWpm] = useState(0);
  const [opponentWpm, setOpponentWpm] = useState(0);
  const [rematchRequested, setRematchRequested] = useState(false);
  const [rematchRecieved, setRematchRecieved] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const lastLength = useRef(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true); // ✅ Set to true initially
  const [opponentCorrectChars, setOpponentCorrectChars] = useState(0);
  const [showSaveStats, setShowSaveStats] = useState(false);

  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { isGuest } = useAuth();

  const { gameText, roomCode } = location.state || {};
  const [currentText, setCurrentText] = useState(gameText || "");
  const [currentRoom, setCurrentRoom] = useState(roomCode || "");

  // ✅ Ensure game is active when component loads with game data
  useEffect(() => {
    if (currentText && currentRoom) {
      setGameActive(true);
      console.log("Game initialized and active");
    }
  }, [currentText, currentRoom]);

  useEffect(() => {
    const calculateCharsPerLine = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const charWidth = 14.4;
      }
    };

    calculateCharsPerLine();
    window.addEventListener("resize", calculateCharsPerLine);
    return () => window.removeEventListener("resize", calculateCharsPerLine);
  }, []);

  if (!currentText) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-monkey-bg text-white">
        <p className="text-neutral-500 font-mono mb-4">No game in progress.</p>
        <a
          href="/"
          className="text-yellow-400 hover:text-yellow-300 font-mono underline"
        >
          Go back home
        </a>
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
      console.log(
        "Key pressed:",
        e.key,
        "gameActive:",
        gameActive,
        "winner:",
        winner,
      ); // ✅ Debug log

      if (winner || !gameActive) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (startTime.current === null) {
        startTime.current = Date.now();
        console.log("Timer started"); // ✅ Debug log
      }

      if (e.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key.length === 1) {
        setTypedText((prev) =>
          prev.length < currentText.length ? prev + e.key : prev,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [winner, currentText, gameActive]);

  useEffect(() => {
    socket.on("opponent:progress", (data) => {
      setOpponentProgress(data.progress);
      setOpponentWpm(data.wpm);
      setOpponentCorrectChars(data.correctChars || 0);
    });

    socket.on("game:winner", (data) => {
      console.log("Game winner event received:", data); // ✅ Debug log
      setWinner(true);
      setWinnerId(data.winnerId);
      setGameActive(false);

      // Show save stats modal for guests after 3 seconds
      if (isGuest) {
        setTimeout(() => {
          setShowSaveStats(true);
        }, 3000);
      }
    });

    socket.on("game:timer", (time) => {
      console.log("Timer update:", time); // ✅ Debug log
      setTimeLeft(time);
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
      console.log("Game start event received:", data); // ✅ Debug log
      setTypedText("");
      setOpponentProgress(0);
      setWpm(0);
      setOpponentWpm(0);
      setWinnerId("");
      setWinner(false);
      setCurrentText(data.text);
      setRematchRequested(false);
      setRematchRecieved(false);
      setAccuracy(100);
      setCombo(0);
      setMaxCombo(0);
      setTimeLeft(data.duration || 30);
      setGameActive(true);
      setOpponentCorrectChars(0);
      setShowSaveStats(false);
      lastLength.current = 0;
      startTime.current = null;
    });

    return () => {
      socket.off("opponent:progress");
      socket.off("game:winner");
      socket.off("game:timer");
      socket.off("game:rematch-request");
      socket.off("game:rematch-declined");
      socket.off("game:start");
    };
  }, [currentRoom, navigate, isGuest]);

  useEffect(() => {
    let correct = 0;
    let total = typedText.length;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === currentText[i]) correct++;
      else break;
    }

    const newProgress = Math.floor((correct / currentText.length) * 100);
    const newAccuracy = total > 0 ? Math.floor((correct / total) * 100) : 100;
    setAccuracy(newAccuracy);

    const typedMore = typedText.length > lastLength.current;
    const deleted = typedText.length < lastLength.current;

    if (deleted) {
      setCombo(0);
    } else if (typedMore) {
      const isPerfectStreak = correct === typedText.length;
      if (isPerfectStreak && correct > 0) {
        setCombo((c) => {
          const next = c + 1;
          setMaxCombo((m) => Math.max(m, next));
          return next;
        });
      } else {
        setCombo(0);
      }
    }
    lastLength.current = typedText.length;

    if (startTime.current && gameActive) {
      const elapsed = (Date.now() - startTime.current) / 1000 / 60;
      const newWpm = elapsed > 0 ? Math.floor(correct / 5 / elapsed) : 0;
      setWpm(newWpm);

      socket.emit("game:progress", {
        roomCode: currentRoom,
        progress: newProgress,
        wpm: newWpm,
        correctChars: correct,
      });
    }
  }, [typedText, currentText, currentRoom, gameActive]);

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
      const lineHeight = 41.6;
      const cursorTop = cursor.offsetTop;
      const currentLine = Math.floor(cursorTop / lineHeight);

      if (currentLine > 0) {
        container.scrollTop = cursorTop - lineHeight;
      } else {
        container.scrollTop = 0;
      }
    }
  }, [typedText]);

  return (
    <div className="flex flex-col min-h-screen bg-monkey-bg text-white">
      {/* 🔝 TOP BAR */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-neutral-800 backdrop-blur-sm bg-monkey-bg/80 sticky top-0 z-10">
        <h1 className="text-xl font-bold tracking-widest text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
          CLICKOFF
        </h1>

        {/* Timer */}
        <div className="flex items-center gap-3 px-6 py-3 bg-neutral-800/50 rounded-lg border border-neutral-700">
          <Clock
            className={`w-5 h-5 ${timeLeft <= 5 ? "text-red-400 animate-pulse" : "text-yellow-400"}`}
          />
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-neutral-500 leading-none">
              TIME
            </span>
            <span
              className={`text-2xl font-bold tabular-nums leading-none ${timeLeft <= 5 ? "text-red-400" : "text-yellow-400"}`}
            >
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="flex-1 mx-10 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-yellow-400 font-mono w-6">you</span>
            <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-yellow-400 font-mono w-16 tabular-nums">
              {correctLength} chars
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-red-400 font-mono w-6">opp</span>
            <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                style={{ width: `${opponentProgress}%` }}
              />
            </div>
            <span className="text-xs text-red-400 font-mono w-16 tabular-nums">
              {opponentCorrectChars} chars
            </span>
          </div>
        </div>

        {/* Stats with Icons */}
        <div className="flex gap-4 text-sm font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-500 leading-none">
                WPM
              </span>
              <span className="text-yellow-400 font-bold tabular-nums leading-none">
                {wpm}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <Target className="w-3.5 h-3.5 text-green-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-500 leading-none">
                ACC
              </span>
              <span
                className={`font-bold tabular-nums leading-none ${accuracy >= 95 ? "text-green-400" : accuracy >= 80 ? "text-yellow-400" : "text-red-400"}`}
              >
                {accuracy}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <TrendingUp className="w-3.5 h-3.5 text-red-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-500 leading-none">
                OPP
              </span>
              <span className="text-red-400 font-bold tabular-nums leading-none">
                {opponentWpm}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Combo Counter with Fire Icon */}
      {combo > 10 && (
        <div className="fixed top-24 right-8 z-20 animate-bounce">
          <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-lg px-4 py-3 backdrop-blur-sm flex items-center gap-3">
            <Flame className="w-6 h-6 text-yellow-400 animate-pulse" />
            <div>
              <div className="text-xs text-yellow-400 font-mono leading-none mb-1">
                COMBO
              </div>
              <div className="text-2xl font-bold text-yellow-400 tabular-nums leading-none">
                {combo}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🎮 GAME ZONE */}
      <div className="flex flex-1 items-center justify-center px-16">
        <div
          className="max-w-[900px] w-full relative"
          style={{ height: "7.8rem" }}
        >
          <div
            ref={containerRef}
            className="font-mono text-2xl"
            style={{
              lineHeight: "2.6rem",
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              height: "100%",
              overflowY: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {currentText.split("").map((char, index) => {
              let className = "text-neutral-600";

              if (index < typedText.length) {
                className =
                  typedText[index] === currentText[index]
                    ? "text-yellow-400"
                    : "text-red-500 bg-red-500/20 rounded px-0.5";
              }

              const isCursor = index === typedText.length;

              return (
                <span
                  key={index}
                  ref={isCursor ? cursorRef : null}
                  className={`${className} relative transition-all duration-100`}
                >
                  {isCursor && gameActive && (
                    <span
                      className="absolute left-0 top-0 h-full w-[3px] bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                      style={{ marginLeft: "-1.5px" }}
                    />
                  )}
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM HINT */}
      <div className="text-center text-sm text-neutral-500 pb-6 font-mono">
        {gameActive
          ? "type as much as you can in 30 seconds"
          : "waiting for game to start"}
      </div>

      {/* Win Modal - Rest of the code remains the same */}
      {winnerId && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 border-2 border-neutral-700 rounded-2xl p-12 text-center flex flex-col gap-6 max-w-md w-full mx-4 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-center mb-2">
              {winnerId === socket.id ? (
                <div className="relative">
                  <Trophy className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] animate-bounce" />
                  <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"></div>
                </div>
              ) : (
                <Skull className="w-20 h-20 text-neutral-500 animate-pulse" />
              )}
            </div>

            <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">
              {winnerId === socket.id ? "VICTORY" : "DEFEAT"}
            </h2>

            <p className="text-neutral-400 font-mono text-sm flex items-center justify-center gap-2">
              {winnerId === socket.id ? (
                <>
                  <Flame className="w-4 h-4 text-yellow-400" />
                  You typed {correctLength} correct characters!
                </>
              ) : (
                `You typed ${correctLength} correct characters`
              )}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 text-sm font-mono">
              <div className="bg-neutral-800/50 rounded-lg p-3 border border-neutral-700">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Zap className="w-3 h-3 text-neutral-500" />
                  <span className="text-xs text-neutral-500">YOUR WPM</span>
                </div>
                <div className="text-2xl font-bold text-yellow-400 tabular-nums">
                  {wpm}
                </div>
              </div>
              <div className="bg-neutral-800/50 rounded-lg p-3 border border-neutral-700">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Swords className="w-3 h-3 text-neutral-500" />
                  <span className="text-xs text-neutral-500">OPP WPM</span>
                </div>
                <div className="text-2xl font-bold text-red-400 tabular-nums">
                  {opponentWpm}
                </div>
              </div>
              <div className="bg-neutral-800/50 rounded-lg p-3 border border-neutral-700">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Target className="w-3 h-3 text-neutral-500" />
                  <span className="text-xs text-neutral-500">ACCURACY</span>
                </div>
                <div
                  className={`text-2xl font-bold tabular-nums ${accuracy >= 95 ? "text-green-400" : "text-yellow-400"}`}
                >
                  {accuracy}%
                </div>
              </div>
              <div className="bg-neutral-800/50 rounded-lg p-3 border border-neutral-700">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Flame className="w-3 h-3 text-neutral-500" />
                  <span className="text-xs text-neutral-500">MAX COMBO</span>
                </div>
                <div className="text-2xl font-bold text-purple-400 tabular-nums">
                  {maxCombo}
                </div>
              </div>
            </div>

            {/* Rematch buttons */}
            {!rematchRequested && !rematchRecieved && (
              <button
                onClick={requestRematch}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold tracking-widest py-4 rounded-lg hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                REQUEST REMATCH
              </button>
            )}

            {rematchRequested && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <p className="text-neutral-500 font-mono text-sm tracking-widest">
                  Waiting for opponent...
                </p>
              </div>
            )}

            {rematchRecieved && (
              <div className="flex flex-col gap-3">
                <p className="text-neutral-400 font-mono text-sm flex items-center justify-center gap-2">
                  <Swords className="w-4 h-4 text-yellow-400" />
                  Opponent wants a rematch
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={acceptRematch}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <ChevronRight className="w-5 h-5" />
                    ACCEPT
                  </button>
                  <button
                    onClick={declineRematch}
                    className="flex-1 border-2 border-neutral-600 text-neutral-400 font-bold py-4 rounded-lg hover:border-red-500 hover:text-red-500 transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    DECLINE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Save Stats Modal for Guests */}
      {showSaveStats && (
        <SaveStatsModal
          wpm={wpm}
          accuracy={accuracy}
          onClose={() => setShowSaveStats(false)}
        />
      )}

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default GamePage;
