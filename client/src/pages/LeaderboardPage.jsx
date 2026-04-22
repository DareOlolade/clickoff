// pages/LeaderboardPage.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy } from "lucide-react";
import Leaderboard from "../components/Leaderboard";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [userRank, setUserRank] = useState(null);
  const [loadingRank, setLoadingRank] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchUserRank();
    }
  }, [isAuthenticated, user?.id]);

  const fetchUserRank = async () => {
    try {
      setLoadingRank(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/leaderboard/rank`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (data.success) {
        setUserRank(data);
      }
    } catch (err) {
      console.error('Error fetching user rank:', err);
    } finally {
      setLoadingRank(false);
    }
  };

  return (
    <div className="min-h-screen bg-monkey-bg text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 
            className="text-2xl font-bold tracking-widest text-yellow-400 cursor-pointer hover:text-yellow-300 transition"
            onClick={() => navigate("/")}
          >
            CLICKOFF
          </h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* User Rank Card (if authenticated) */}
        {isAuthenticated && userRank && (
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/30 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Your Global Rank</h3>
                  <p className="text-sm text-neutral-400">Out of {userRank.totalPlayers} players</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-yellow-400">#{userRank.rank}</div>
                <div className="text-sm text-neutral-400">Top {userRank.percentile}%</div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Component */}
        <Leaderboard />
      </div>
    </div>
  );
};

export default LeaderboardPage;