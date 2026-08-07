import React, { useState } from "react";

function PlayerSetup({ mode, startGame }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  function handleStart() {
    if (player1.trim() === "") {
      alert("Enter Player 1 name");
      return;
    }

    if (
      mode === "player" &&
      player2.trim() === ""
    ) {
      alert("Enter Player 2 name");
      return;
    }

    startGame({
      player1: player1.trim(),

      player2:
        mode === "computer"
          ? "Computer"
          : player2.trim(),

      difficulty:
        mode === "computer"
          ? difficulty
          : null,
    });
  }

  return (
    <div className="game-container">

      {/* PLAYER VS PLAYER */}

      {mode === "player" && (
        <>
          <h1 className="title">
            ⚔ Player vs Player
          </h1>

          <h2>Player Setup</h2>

          <input
            className="input-box"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) =>
              setPlayer1(e.target.value)
            }
          />

          <input
            className="input-box"
            placeholder="Player 2 Name"
            value={player2}
            onChange={(e) =>
              setPlayer2(e.target.value)
            }
          />

          <button
            className="mode-btn"
            onClick={handleStart}
          >
            🚀 Start Game
          </button>
        </>
      )}

      {/* PLAYER VS COMPUTER */}

      {mode === "computer" && (
        <>
          <h1 className="title">
            🤖 Player vs Computer
          </h1>

          <h2>Player Setup</h2>

          <input
            className="input-box"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) =>
              setPlayer1(e.target.value)
            }
          />

          <select
            className="input-box"
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
            }
          >
            <option value="Easy">
              Easy
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Hard">
              Hard
            </option>
          </select>

          <button
            className="mode-btn"
            onClick={handleStart}
          >
            🚀 Start Game
          </button>
        </>
      )}

    </div>
  );
}

export default PlayerSetup;