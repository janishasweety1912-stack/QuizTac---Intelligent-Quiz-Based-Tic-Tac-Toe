import React from "react";

function GameMode({ setMode }) {
  return (
    <div className="game-container">
      <h1 className="title">🧠 QuizTac</h1>
      <p className="subtitle">Test Your Brain. Conquer The Board.</p>
      <h2>Choose Game Mode</h2>
      <button className="mode-btn" onClick={() => setMode("player")}>
        ⚔ Player vs Player
      </button>
      <button className="mode-btn" onClick={() => setMode("computer")}>
        🤖 Player vs Computer
      </button>
    </div>
  );
}

export default GameMode;
