// pages/HomePage.jsx
import { useState, useEffect, useRef } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Loader2, Copy, Check, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = [
  { id: 'quotes', name: 'Quotes', desc: 'Inspirational quotes' },
  { id: 'code', name: 'Code', desc: 'Programming snippets' },
  { id: 'words', name: 'Words', desc: 'Random words' },
  { id: 'facts', name: 'Facts', desc: 'Science and history facts' },
];

const HomePage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [countDown, setCountDown] = useState("");
  const [myRoomCode, setMyRoomCode] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('quotes');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const roomCodeRef = useRef("");
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  const navigate = useNavigate();
  const { user, isGuest, isAuthenticated, logout } = useAuth();

  const createRoom = () => {
    setIsCreatingRoom(true);
    socket.emit("room:create", selectedCategory);
  };

  const joinRoom = () => {
    if (!roomCode.trim()) return;
    setIsJoiningRoom(true);
    roomCodeRef.current = roomCode;
    socket.emit("room:join", roomCode);
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(myRoomCode || roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleRoomCreated = (code) => {
      roomCodeRef.current = code;
      setMyRoomCode(code);
      setRoomCode(code);
      setInRoom(true);
      setIsCreatingRoom(false);
    };

    const handleRoomJoined = () => {
      setInRoom(true);
      setIsJoiningRoom(false);
    };

    const handleRoomFull = (data) => {
      alert(data.message);
      setIsJoiningRoom(false);
    };

    const handleRoomNotFound = (data) => {
      alert(data.message);
      setIsJoiningRoom(false);
    };

    const handleCountdown = (count) => {
      setCountDown(count);
    };

    const handleGameStart = (data) => {
      navigate("/game", {
        state: { gameText: data.text, roomCode: roomCodeRef.current },
      });
    };

    socket.on("room:created", handleRoomCreated);
    socket.on("room:joined", handleRoomJoined);
    socket.on("room:full", handleRoomFull);
    socket.on("room:not-found", handleRoomNotFound);
    socket.on("game:countdown", handleCountdown);
    socket.on("game:start", handleGameStart);

    return () => {
      socket.off("room:created", handleRoomCreated);
      socket.off("room:joined", handleRoomJoined);
      socket.off("room:full", handleRoomFull);
      socket.off("room:not-found", handleRoomNotFound);
      socket.off("game:countdown", handleCountdown);
      socket.off("game:start", handleGameStart);
    };
  }, [navigate]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategoryData = CATEGORIES.find(cat => cat.id === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-monkey-bg text-white">
      {/* 🔝 TOP BAR */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-neutral-800">
        <h1 
          className="text-2xl font-bold tracking-widest text-yellow-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          CLICKOFF
        </h1>

        <div className="flex items-center gap-6">
          <span className="text-sm text-neutral-400 font-mono hidden md:block">
            1v1 typing battles
          </span>

          {/* User Section */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:border-yellow-400 transition"
              >
                <User className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-mono text-neutral-200">
                  {user?.username}
                </span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-neutral-700 transition flex items-center gap-2 text-sm"
                  >
                    <User className="w-4 h-4 text-yellow-400" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-neutral-700 transition flex items-center gap-2 text-sm border-t border-neutral-700"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm font-mono text-yellow-400 hover:text-yellow-300 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 text-sm font-mono bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🎮 MAIN CONTENT */}
      <div className="flex flex-1 items-center justify-center px-8 py-12">
        <div className="max-w-md w-full">
          {/* Guest Notice */}
          {isGuest && !inRoom && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-400 text-center">
                Playing as guest. <span className="font-bold">Stats won't be saved.</span>
                <br />
                <span 
                  onClick={() => navigate("/register")}
                  className="text-yellow-400 cursor-pointer hover:underline"
                >
                  Create an account
                </span> to track your progress!
              </p>
            </div>
          )}

          {/* Title Section */}
          {!inRoom && (
            <div className="text-center mb-10">
              <h2 className="text-5xl font-bold text-white mb-4">
                Ready to Race?
              </h2>
              <p className="text-neutral-400 font-mono text-sm">
                Test your typing speed against another player
              </p>
            </div>
          )}

          {/* Waiting / Countdown State */}
          {inRoom && (
            <div className="text-center mb-12">
              {countDown ? (
                <div className="animate-pulse">
                  <div className="text-9xl font-bold text-yellow-400 mb-6">
                    {countDown}
                  </div>
                  <p className="text-neutral-400 font-mono text-lg">
                    get ready...
                  </p>
                </div>
              ) : (
                <div>
                  <div className="inline-block px-8 py-6 bg-neutral-800/50 backdrop-blur-sm rounded-xl mb-6 border border-neutral-700">
                    <p className="text-xs text-neutral-500 font-mono mb-3 uppercase tracking-wider">
                      Room Code
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-4xl font-bold tracking-[0.3em] text-yellow-400 font-mono">
                        {myRoomCode || roomCode}
                      </p>
                      <button
                        onClick={copyRoomCode}
                        className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
                        title="Copy code"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-neutral-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="relative">
                      <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                      <span className="absolute inset-0 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></span>
                    </div>
                    <p className="text-neutral-400 font-mono text-sm">
                      Waiting for opponent...
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {!inRoom && (
            <div className="space-y-6">
              {/* Category Dropdown */}
              <div className="space-y-2" ref={dropdownRef}>
                <label className="block text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  Category
                </label>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full bg-neutral-800 border border-neutral-700 hover:border-neutral-600 text-white font-mono text-left px-4 py-4 rounded-lg outline-none transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-neutral-200">
                      {selectedCategoryData?.name}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {selectedCategoryData?.desc}
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-neutral-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute z-10 w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-lg mt-1 shadow-2xl overflow-hidden">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-neutral-700 transition-colors border-b border-neutral-700 last:border-b-0 ${
                          selectedCategory === category.id ? 'bg-neutral-700/50' : ''
                        }`}
                      >
                        <div className={`font-bold font-mono ${selectedCategory === category.id ? 'text-yellow-400' : 'text-neutral-200'}`}>
                          {category.name}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {category.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Create Room */}
              <button
                onClick={createRoom}
                disabled={isCreatingRoom}
                className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-400/50 text-black font-bold py-4 rounded-lg transition-all font-mono tracking-wider uppercase text-sm shadow-lg hover:shadow-yellow-400/20 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCreatingRoom ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Room...
                  </>
                ) : (
                  'Create Room'
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-4">
                <div className="flex-1 h-px bg-neutral-800"></div>
                <span className="text-neutral-600 text-xs font-mono uppercase tracking-widest">
                  Or
                </span>
                <div className="flex-1 h-px bg-neutral-800"></div>
              </div>

              {/* Join Room */}
              <div className="space-y-3">
                <label className="block text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  Join Existing Room
                </label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && joinRoom()}
                  placeholder="ENTER CODE"
                  maxLength={6}
                  disabled={isJoiningRoom}
                  className="w-full bg-neutral-800 border border-neutral-700 focus:border-yellow-400 text-yellow-400 font-mono text-center text-3xl tracking-[0.3em] py-4 rounded-lg outline-none transition-all placeholder:text-neutral-700 placeholder:tracking-widest disabled:opacity-50"
                />
                <button
                  onClick={joinRoom}
                  disabled={!roomCode.trim() || isJoiningRoom}
                  className="w-full border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black text-yellow-400 font-bold py-4 rounded-lg transition-all font-mono tracking-wider uppercase text-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-yellow-400 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isJoiningRoom ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Joining Room...
                    </>
                  ) : (
                    'Join Room'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/*  BOTTOM HINT */}
      <div className="text-center text-xs text-neutral-600 pb-8 font-mono uppercase tracking-wider">
        {inRoom
          ? "Share the code with your opponent to start"
          : "Select a category and create a room to begin"}
      </div>
    </div>
  );
};

export default HomePage;