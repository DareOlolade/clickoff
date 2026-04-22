const express = require("express")
const { registerUser, loginUser, getProfile, saveStats } = require("../controllers/authController")
const protect = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", protect, getProfile)
router.post("/save-stats", protect, saveStats)

module.exports = router