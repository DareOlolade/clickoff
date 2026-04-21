const express = require('express');
const { getLeaderboard, getUserRank } = require('../controllers/leaderBoardController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getLeaderboard);
router.get('/rank', protect, getUserRank);  

module.exports = router;