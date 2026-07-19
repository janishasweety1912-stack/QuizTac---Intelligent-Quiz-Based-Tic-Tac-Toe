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
    if (mode === "player" && player2.trim() === "") {
      alert("Enter Player 2 name");
      return;
    }
    startGame({
      player1,
      player2: mode === "computer" ? "Computer" : player2,
      difficulty,
    });
  }

  return (
    <div className="game-container">
      <h1 className="title">🧠 QuizTac</h1>
      <h2>Player Setup</h2>
      <input
        className="input-box"
        placeholder="Player 1 Name"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      {mode === "player" && (
        <input
          className="input-box"
          placeholder="Player 2 Name"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
      )}
      {mode === "computer" && (
        <select
          className="input-box"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      )}
      <button className="mode-btn" onClick={handleStart}>
        🚀 Start Game
      </button>
    </div>
  );
}

export default PlayerSetup;
