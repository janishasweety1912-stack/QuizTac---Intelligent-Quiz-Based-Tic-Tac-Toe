const express = require("express");
const router = express.Router();

const Game = require("../models/Game");

// -----------------------------------
// SAVE GAME RESULT
// -----------------------------------

router.post("/", async (req, res) => {
  try {
    const {
      player1,
      player2,
      mode,
      winner,
      player1Points,
      player2Points,
      player1Wins,
      player2Wins,
      draw
    } = req.body;

    const game = new Game({
      player1,
      player2,
      mode,
      winner,
      player1Points,
      player2Points,
      player1Wins,
      player2Wins,
      draw
    });

    await game.save();

    res.status(201).json({
      message: "Game saved successfully",
      game
    });

  } catch (error) {
    console.log("Save game error:", error);

    res.status(500).json({
      message: "Failed to save game"
    });
  }
});

// -----------------------------------
// GET ALL GAME HISTORY
// -----------------------------------

router.get("/", async (req, res) => {
  try {
    const games = await Game.find()
      .sort({ createdAt: -1 });

    res.status(200).json(games);

  } catch (error) {
    console.log(
      "Get game history error:",
      error
    );

    res.status(500).json({
      message: "Failed to get game history"
    });
  }
});

// -----------------------------------
// DELETE ONE GAME
// -----------------------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGame =
      await Game.findByIdAndDelete(id);

    if (!deletedGame) {
      return res.status(404).json({
        message: "Game not found"
      });
    }

    res.status(200).json({
      message: "Game deleted successfully",
      game: deletedGame
    });

  } catch (error) {
    console.log(
      "Delete game error:",
      error
    );

    res.status(500).json({
      message: "Failed to delete game"
    });
  }
});

// -----------------------------------
// DELETE ALL GAME HISTORY
// -----------------------------------

router.delete("/", async (req, res) => {
  try {
    const result =
      await Game.deleteMany({});

    res.status(200).json({
      message: "All game history deleted successfully",
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.log(
      "Delete all games error:",
      error
    );

    res.status(500).json({
      message: "Failed to delete game history"
    });
  }
});

// -----------------------------------
// GET LEADERBOARD
// -----------------------------------

router.get("/leaderboard", async (req, res) => {
  try {
    const games = await Game.find();

    const leaderboard = {};

    games.forEach((game) => {

      // Player 1
      if (!leaderboard[game.player1]) {
        leaderboard[game.player1] = {
          player: game.player1,
          wins: 0,
          points: 0
        };
      }

      leaderboard[game.player1].points +=
        game.player1Points || 0;

      leaderboard[game.player1].wins +=
        game.player1Wins || 0;

      // Player 2
      if (!leaderboard[game.player2]) {
        leaderboard[game.player2] = {
          player: game.player2,
          wins: 0,
          points: 0
        };
      }

      leaderboard[game.player2].points +=
        game.player2Points || 0;

      leaderboard[game.player2].wins +=
        game.player2Wins || 0;
    });

    const result =
      Object.values(leaderboard).sort(
        (a, b) => {
          if (b.wins !== a.wins) {
            return b.wins - a.wins;
          }

          return b.points - a.points;
        }
      );

    res.status(200).json(result);

  } catch (error) {
    console.log(
      "Leaderboard error:",
      error
    );

    res.status(500).json({
      message: "Failed to get leaderboard"
    });
  }
});

module.exports = router;