const express = require("express");

const {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch
} = require("../controllers/matchController");

const protect = require("../controllers/authMiddleware");

const router = express.Router();

// Public
router.get("/", getMatches);
router.get("/:id", getMatchById);

// Admin only
router.post("/", protect, createMatch);
router.put("/:id", protect, updateMatch);
router.delete("/:id", protect, deleteMatch);

module.exports = router;