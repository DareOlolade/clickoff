import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Trophy, TrendingUp, Target, Award } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../config";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserStats = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log("Token:", token ? "✅ exists" : "❌ missing");
    
    const response = await fetch(`${BASE_URL}/api/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${data.message || 'Unknown error'}`);
    }

    setStats(data.user.stats || {});
    setError(null);
  } catch (err) {
    console.error("❌ Full error:", err);
    setError(err.message);
    setStats({
      racesWon: 0,
      racesPlayed: 0,
      avgWpm: 0,
      bestWpm: 0,
    });
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (!isAuthenticated || !user?.id) {
    console.log("Not authenticated, skipping fetch");
    setLoading(false);
    return;
  }

  let isMounted = true;

  const loadStats = async () => {
    if (isMounted) {
      await fetchUserStats();
    }
  };

  loadStats();

  return () => {
    isMounted = false;
  };
}, [isAuthenticated, user?.id]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-monkey-bg text-white">
        <div className="text-center">
          <p className="text-neutral-400 mb-4">Please login to view profile</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-monkey-bg text-white">
      <div className="border-b border-neutral-800 px-8 py-4">
        <h1 
          className="text-2xl font-bold tracking-widest text-yellow-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          CLICKOFF
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-black">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{user?.username}</h2>
              <p className="text-neutral-400">{user?.email}</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-neutral-400 font-mono">
              Loading stats...
            </div>
          ) : error ? (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-neutral-800 p-6 rounded-lg text-center border border-neutral-700 hover:border-yellow-400 transition">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stats?.racesWon || 0}
                </div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider">Wins</div>
              </div>

              <div className="bg-neutral-800 p-6 rounded-lg text-center border border-neutral-700 hover:border-blue-400 transition">
                <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stats?.racesPlayed || 0}
                </div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider">Games Played</div>
              </div>

              <div className="bg-neutral-800 p-6 rounded-lg text-center border border-neutral-700 hover:border-green-400 transition">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">
                  {Math.round(stats?.avgWpm || 0)}
                </div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider">Avg WPM</div>
              </div>

              <div className="bg-neutral-800 p-6 rounded-lg text-center border border-neutral-700 hover:border-purple-400 transition">
                <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stats?.bestWpm || 0}
                </div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider">Best WPM</div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            <button
              onClick={fetchUserStats}
              className="flex-1 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold py-2 rounded-lg transition"
            >
              Refresh Stats
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded-lg transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;