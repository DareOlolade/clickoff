// components/Leaderboard.jsx
import { useState, useEffect } from "react";
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Target,
  Crown,
  ChevronDown,
  RefreshCw,
  Flame
} from "lucide-react";
import { BASE_URL } from "../config";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all');
  const [error, setError] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/leaderboard?timeframe=${timeframe}&limit=100`
      );
      const data = await response.json();
      
      if (data.success) {
        setLeaderboard(data.leaderboard);
        setError(null);
      } else {
        setError('Failed to load leaderboard');
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe]);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-neutral-500 font-mono text-sm">#{rank}</span>;
  };

  const getRankBg = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border-yellow-400/50";
    if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50";
    if (rank === 3) return "bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/50";
    return "bg-neutral-900 border-neutral-800";
  };

  return (
    <div className="w-full">
      {/* Header with timeframe selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded-lg font-mono text-sm focus:outline-none focus:border-yellow-400 cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="monthly">This Month</option>
            <option value="weekly">This Week</option>
            <option value="daily">Today</option>
          </select>
          
          <button
            onClick={fetchLeaderboard}
            disabled={loading}
            className="p-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:border-yellow-400 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-neutral-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-neutral-700 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-400 font-mono">Loading leaderboard...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-400">{error}</p>
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="text-center py-20">
          <Trophy className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
          <p className="text-neutral-500 font-mono">No players yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs text-neutral-500 uppercase tracking-wider font-mono border-b border-neutral-800">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-2 text-center">Best WPM</div>
            <div className="col-span-2 text-center">Avg WPM</div>
            <div className="col-span-2 text-center">Win Rate</div>
            <div className="col-span-1 text-center">Wins</div>
          </div>

          {/* Leaderboard Entries */}
          {leaderboard.map((player) => (
            <div
              key={player.username}
              className={`grid grid-cols-12 gap-4 px-4 py-4 rounded-lg border transition-all hover:scale-[1.02] ${getRankBg(player.rank)}`}
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center">
                {getRankIcon(player.rank)}
              </div>

              {/* Username */}
              <div className="col-span-4 flex items-center">
                <span className="font-bold text-white truncate">
                  {player.username}
                </span>
                {player.rank <= 10 && (
                  <Flame className="w-4 h-4 text-orange-400 ml-2 flex-shrink-0" />
                )}
              </div>

              {/* Best WPM */}
              <div className="col-span-2 flex items-center justify-center">
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-400/10 border border-purple-400/30 rounded-lg">
                  <Target className="w-3 h-3 text-purple-400" />
                  <span className="font-bold text-purple-400 tabular-nums">
                    {player.bestWpm}
                  </span>
                </div>
              </div>

              {/* Avg WPM */}
              <div className="col-span-2 flex items-center justify-center">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-400/10 border border-blue-400/30 rounded-lg">
                  <TrendingUp className="w-3 h-3 text-blue-400" />
                  <span className="font-bold text-blue-400 tabular-nums">
                    {player.avgWpm}
                  </span>
                </div>
              </div>

              {/* Win Rate */}
              <div className="col-span-2 flex items-center justify-center">
                <span className={`font-bold tabular-nums ${
                  player.winRate >= 50 ? 'text-green-400' : 
                  player.winRate >= 30 ? 'text-yellow-400' : 
                  'text-neutral-400'
                }`}>
                  {player.winRate}%
                </span>
              </div>

              {/* Wins */}
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-yellow-400 font-bold tabular-nums">
                  {player.racesWon}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;