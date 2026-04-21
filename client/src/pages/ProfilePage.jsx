import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Trophy, TrendingUp, Target, Award, RefreshCw, ArrowLeft, Zap, Percent } from "lucide-react";
import { BASE_URL } from "../config";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserStats = async () => {
    try {
      setRefreshing(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

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
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
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

  // Calculate win rate
  const winRate = stats?.racesPlayed > 0 
    ? ((stats.racesWon / stats.racesPlayed) * 100).toFixed(1) 
    : 0;

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-monkey-bg text-white px-4">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-neutral-800 rounded-full flex items-center justify-center border-4 border-neutral-700">
            <Trophy className="w-12 h-12 text-neutral-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Profile Locked</h2>
            <p className="text-neutral-400 mb-6">Please login to view your profile and stats</p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition-all transform hover:scale-105"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-monkey-bg text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8 mb-8 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
          
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-5xl font-bold text-black">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-neutral-900"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-bold text-white mb-2">{user?.username}</h2>
              <p className="text-neutral-400 mb-4">{user?.email}</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-medium">
                  Active Player
                </span>
                {stats?.racesWon > 0 && (
                  <span className="px-3 py-1 bg-purple-400/10 border border-purple-400/30 rounded-full text-purple-400 text-sm font-medium">
                    🏆 Winner
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <button
              onClick={fetchUserStats}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 rounded-lg transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-red-400 text-xs">!</span>
            </div>
            <div>
              <p className="text-sm font-medium text-red-400 mb-1">Failed to load stats</p>
              <p className="text-xs text-red-400/70">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-neutral-700 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-400 font-mono">Loading your stats...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Races Won */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-yellow-400/50 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-400/10 rounded-lg group-hover:bg-yellow-400/20 transition">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Total</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">
                  {stats?.racesWon || 0}
                </div>
                <div className="text-sm text-neutral-400">Races Won</div>
              </div>

              {/* Games Played */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-blue-400/50 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-400/10 rounded-lg group-hover:bg-blue-400/20 transition">
                    <Award className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Total</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">
                  {stats?.racesPlayed || 0}
                </div>
                <div className="text-sm text-neutral-400">Games Played</div>
              </div>

              {/* Average WPM */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-green-400/50 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-400/10 rounded-lg group-hover:bg-green-400/20 transition">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Average</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">
                  {Math.round(stats?.avgWpm || 0)}
                </div>
                <div className="text-sm text-neutral-400">WPM</div>
              </div>

              {/* Best WPM */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-purple-400/50 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-400/10 rounded-lg group-hover:bg-purple-400/20 transition">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">Best</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">
                  {stats?.bestWpm || 0}
                </div>
                <div className="text-sm text-neutral-400">WPM</div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-400" />
                Performance Insights
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Win Rate */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-400">Win Rate</span>
                    <span className="text-sm font-bold text-yellow-400">{winRate}%</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(winRate, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Consistency (avgWPM vs bestWPM) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-400">Consistency</span>
                    <span className="text-sm font-bold text-green-400">
                      {stats?.bestWpm > 0 
                        ? Math.round((stats.avgWpm / stats.bestWpm) * 100) 
                        : 0}%
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${stats?.bestWpm > 0 ? Math.min((stats.avgWpm / stats.bestWpm) * 100, 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-400">Activity Level</span>
                    <span className="text-sm font-bold text-blue-400">
                      {stats?.racesPlayed > 50 ? 'High' : stats?.racesPlayed > 20 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min((stats?.racesPlayed || 0) * 2, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Ready for the next challenge?</h3>
              <p className="text-neutral-400 mb-6">Jump into a race and improve your typing speed!</p>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition-all transform hover:scale-105 inline-flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Start Racing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;