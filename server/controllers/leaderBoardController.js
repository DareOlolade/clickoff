const User = require('../models/User'); // adjust path if needed
// routes/auth.js (or wherever your user routes are)

// Get leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const { timeframe = "all", limit = 100 } = req.query;

    let dateFilter = {};

    // Filter by timeframe
    if (timeframe === "daily") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dateFilter = { "stats.lastRaceAt": { $gte: today } };
    } else if (timeframe === "weekly") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = { "stats.lastRaceAt": { $gte: weekAgo } };
    } else if (timeframe === "monthly") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = { "stats.lastRaceAt": { $gte: monthAgo } };
    }
    // Get top players sorted by best WPM
    const leaderboard = await User.find(dateFilter)
      .select(
        "username stats.bestWpm stats.avgWpm stats.racesWon stats.racesPlayed",
      )
      .sort({ "stats.bestWpm": -1 })
      .limit(parseInt(limit));

    // Format response with rankings
    const formattedLeaderboard = leaderboard.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      bestWpm: user.stats?.bestWpm || 0,
      avgWpm: Math.round(user.stats?.avgWpm || 0),
      racesWon: user.stats?.racesWon || 0,
      racesPlayed: user.stats?.racesPlayed || 0,
      winRate:
        user.stats?.racesPlayed > 0
          ? ((user.stats.racesWon / user.stats.racesPlayed) * 100).toFixed(1)
          : 0,
    }));

    res.json({
      success: true,
      timeframe,
      leaderboard: formattedLeaderboard,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard",
    });
  }
};

// Get user's rank
const getUserRank = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("username stats");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Count users with better WPM
    const betterPlayers = await User.countDocuments({
      "stats.bestWpm": { $gt: user.stats?.bestWpm || 0 },
    });

    const rank = betterPlayers + 1;
    const totalPlayers = await User.countDocuments();

    res.json({
      success: true,
      rank,
      totalPlayers,
      percentile: (((totalPlayers - rank) / totalPlayers) * 100).toFixed(1),
    });
  } catch (error) {
    console.error("Error fetching user rank:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch rank",
    });
  }
};

module.exports = { getLeaderboard, getUserRank };
