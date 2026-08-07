const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    player1: {
      type: String,
      required: true
    },

    player2: {
      type: String,
      required: true
    },

    mode: {
      type: String,
      required: true
    },

    winner: {
      type: String,
      required: true
    },

    player1Points: {
      type: Number,
      default: 0
    },

    player2Points: {
      type: Number,
      default: 0
    },

    player1Wins: {
      type: Number,
      default: 0
    },

    player2Wins: {
      type: Number,
      default: 0
    },

    draw: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Game", gameSchema);