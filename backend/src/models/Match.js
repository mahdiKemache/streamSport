const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    url: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    _id: false
  }
);

const matchSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: String,
      required: true,
      trim: true
    },

    awayTeam: {
      type: String,
      required: true,
      trim: true
    },

    homeLogo: {
      type: String,
      default: ""
    },

    awayLogo: {
      type: String,
      default: ""
    },

    competition: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["upcoming", "live", "finished", "postponed"],
      default: "upcoming"
    },

    servers: {
      type: [serverSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Match", matchSchema);