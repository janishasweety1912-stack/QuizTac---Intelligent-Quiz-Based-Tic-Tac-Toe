import React, { useEffect, useState } from "react";

function Leaderboard({ closeLeaderboard }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games/leaderboard`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        return response.json();
      })
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Leaderboard error:", error);
        setError("Unable to load leaderboard");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="game-container">
        <h2>Loading Leaderboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-container">
        <h2>{error}</h2>

        <button
          className="mode-btn"
          onClick={closeLeaderboard}
        >
          🏠 Back
        </button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1 className="title">
        🏆 QuizTac Leaderboard
      </h1>

      {players.length === 0 ? (
        <p>No players yet.</p>
      ) : (
        <div className="leaderboard-container">
          <table className="result-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Wins</th>
                <th>Points</th>
              </tr>
            </thead>

            <tbody>
              {players.map((player, index) => (
                <tr key={player.player}>
                  <td>
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </td>

                  <td>{player.player}</td>

                  <td>{player.wins}</td>

                  <td>{player.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="mode-btn"
        onClick={closeLeaderboard}
      >
        🏠 Back to Main Menu
      </button>
    </div>
  );
}

export default Leaderboard;