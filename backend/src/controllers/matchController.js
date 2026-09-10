const Match = require("../models/Match");

// GET all matches
const getMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({
      date: 1,
      time: 1
    });

    res.json(matches);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get matches",
      error: error.message
    });
  }
};

// GET single match
const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({
        message: "Match not found"
      });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get match",
      error: error.message
    });
  }
};

// CREATE match
const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);

    res.status(201).json({
      message: "Match created successfully",
      match
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create match",
      error: error.message
    });
  }
};

// UPDATE match
const updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!match) {
      return res.status(404).json({
        message: "Match not found"
      });
    }

    res.json({
      message: "Match updated successfully",
      match
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update match",
      error: error.message
    });
  }
};

// DELETE match
const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
      return res.status(404).json({
        message: "Match not found"
      });
    }

    res.json({
      message: "Match deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete match",
      error: error.message
    });
  }
};

module.exports = {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch
};