import React from "react";

function ResultModal({ winner, players, score, points, restartGame, goHome }) {
  let message;
  if (winner === "draw") {
    message = "It's a Draw 🤝";
  } else {
    message =
      winner === "X"
        ? `${players.player1} Wins 🏆`
        : `${players.player2} Wins 🏆`;
  }

  return (
    <div className="result-overlay">
      <div className="result-box">
        <h1>🏆</h1>
        <h2>{message}</h2>
        <h3>Final Score</h3>
        <table className="result-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Points</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>🔵 {players.player1}</td>
              <td>{points.player1}</td>
              <td>{score.player1}</td>
            </tr>
            <tr>
              <td>🔴 {players.player2}</td>
              <td>{points.player2}</td>
              <td>{score.player2}</td>
            </tr>
          </tbody>
        </table>
        <button className="mode-btn" onClick={restartGame}>
          🔄 Play Again
        </button>
        <button className="mode-btn" onClick={goHome}>
          🏠 Main Menu
        </button>
      </div>
    </div>
  );
}

export default ResultModal;
