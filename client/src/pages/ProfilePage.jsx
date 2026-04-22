import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  TrendingUp,
  Target,
  Award,
  RefreshCw,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { BASE_URL } from "../config";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [userRank, setUserRank] = useState(null);

  const token = localStorage.getItem("token");

  const fetchUserStats = async () => {
    try {
      setRefreshing(true);

      const res = await fetch(`${BASE_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load stats");

      setStats(data.user.stats || {});
      setError(null);
    } catch (err) {
      setError(err.message);
      setStats({
        racesWon: 0,
        racesPlayed: 0,
        avgWpm: 0,
        bestWpm: 0,
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchRank = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/leaderboard/rank`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUserRank(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchRank();
      fetchUserStats();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user?.id]);

  const winRate =
    stats?.racesPlayed > 0
      ? ((stats.racesWon / stats.racesPlayed) * 100).toFixed(1)
      : 0;

  const consistency =
    stats?.bestWpm > 0 ? Math.round((stats.avgWpm / stats.bestWpm) * 100) : 0;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-6">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
          <h2 className="text-3xl font-bold">Profile Locked</h2>
          <p className="text-neutral-400">
            Login to view your stats and ranking
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:scale-105 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 py-12 space-y-10 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1
            className="text-2xl font-bold text-yellow-400 cursor-pointer hover:text-yellow-300"
            onClick={() => navigate("/")}
          >
            CLICKOFF
          </h1>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-neutral-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Profile Card */}
        <div className="relative group">
          <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-2xl">
                  <span className="text-6xl font-extrabold text-black">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-neutral-900 animate-pulse"></div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-5xl font-extrabold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-3">
                  {user?.username}
                </h2>
                <p className="text-neutral-500 mb-6">{user?.email}</p>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-4 py-1.5 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-semibold">
                    ⚡ Active Racer
                  </span>
                  {stats?.racesWon > 0 && (
                    <span className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold flex items-center gap-2">
                      <Trophy className="text-purple-400" /> Champion
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ranking */}
        {userRank && (
          <div className="relative">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl hover:border-yellow-500/40 transition">
              {/* Top Section */}
              <div className="flex justify-between items-start">
                {/* Rank */}
                <div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Your Rank
                  </div>
                  <div className="text-6xl font-extrabold text-yellow-400 leading-none">
                    #{userRank.rank}
                  </div>
                  <div className="text-sm text-neutral-500 mt-2">
                    out of {userRank.totalPlayers} players
                  </div>
                </div>

                {/* Percentile */}
                <div className="text-right">
                  <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Percentile
                  </div>
                  <div className="text-5xl font-bold text-green-400 leading-none">
                    {userRank.percentile}%
                  </div>

                  {/* subtle progress bar */}
                  <div className="w-32 h-1 bg-neutral-800 rounded-full mt-3 ml-auto overflow-hidden">
                    <div
                      className="h-full bg-green-400"
                      style={{ width: `${userRank.percentile}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-neutral-800"></div>

              {/* Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => navigate("/leaderboard")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg hover:border-yellow-400 hover:bg-neutral-700 transition group"
                >
                  <Trophy className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition" />
                  <span className="font-semibold tracking-wide">
                    View Leaderboard
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-neutral-700 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
            <p className="text-neutral-400 mt-4">Loading stats...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  label: "Races Won",
                  value: stats?.racesWon || 0,
                  icon: <Trophy className="text-yellow-400" />,
                },
                {
                  label: "Games Played",
                  value: stats?.racesPlayed || 0,
                  icon: <Award className="text-blue-400" />,
                },
                {
                  label: "Average WPM",
                  value: Math.round(stats?.avgWpm || 0),
                  icon: <TrendingUp className="text-green-400" />,
                },
                {
                  label: "Best WPM",
                  value: stats?.bestWpm || 0,
                  icon: <Zap className="text-purple-400" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between mb-4">{item.icon}</div>
                  <div className="text-5xl font-extrabold bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm text-neutral-400">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Performance */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="text-yellow-400" size={20} />
                Performance Insights
              </h3>

              <div className="space-y-6">
                {[
                  { label: "Win Rate", value: winRate },
                  { label: "Consistency", value: consistency },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-neutral-400">{item.label}</span>
                      <span className="text-yellow-400 font-bold">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(item.value, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-500/10 border border-yellow-400/30 rounded-3xl p-10 text-center">
              <h3 className="text-3xl font-bold mb-4">
                Ready for the next race?
              </h3>
              <p className="text-neutral-400 mb-6">
                Push your limits and climb the leaderboard.
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold rounded-xl transition-all transform hover:scale-110 shadow-lg shadow-yellow-400/20 inline-flex items-center gap-3"
              >
                <Zap size={18} />
                Start Racing
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
