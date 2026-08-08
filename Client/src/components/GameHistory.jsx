import React, { useEffect, useState } from "react";
import "../style/GameHistory.css";

const API_URL = import.meta.env.VITE_API_URL;

function GameHistory({ closeHistory }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/games`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch game history"
          );
        }

        return response.json();
      })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(
          "Game history error:",
          error
        );

        setError(
          "Unable to load game history"
        );

        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-loading">
          <div className="loading-spinner"></div>

          <h2>Loading Game History...</h2>

          <p>
            Fetching your previous games
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-page">
        <div className="history-error">
          <div className="error-icon">
            ⚠️
          </div>

          <h2>{error}</h2>

          <p>
            Please check your connection
            and try again.
          </p>

          <button
            className="mode-btn"
            onClick={closeHistory}
          >
            🏠 Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">

      {/* HEADER */}

      <div className="history-header">

        <div>
          <span className="history-label">
            QUIZTAC
          </span>

          <h1>
            📜 Game History
          </h1>

          <p>
            Review your previous matches
          </p>
        </div>

        <div className="history-count">
          <span>{games.length}</span>
          <small>
            {games.length === 1
              ? "Game"
              : "Games"}
          </small>
        </div>

      </div>

      {/* EMPTY STATE */}

      {games.length === 0 ? (
        <div className="empty-history">

          <div className="empty-icon">
            🎮
          </div>

          <h2>
            No games played yet
          </h2>

          <p>
            Start your first QuizTac
            match to see it here.
          </p>

        </div>
      ) : (
        <div className="history-container">

          {games.map((game) => {

            const isDraw =
              game.winner === "Draw";

            const isPlayer1Winner =
              game.winner === game.player1;

            const isPlayer2Winner =
              game.winner === game.player2;

            return (
              <div
                className={`history-card ${
                  isDraw
                    ? "draw-card"
                    : isPlayer1Winner
                    ? "winner-card"
                    : "loss-card"
                }`}
                key={game._id}
              >

                {/* CARD TOP */}

                <div className="history-card-top">

                  <span className="game-number">
                    GAME
                  </span>

                  <span
                    className={`result-badge ${
                      isDraw
                        ? "draw-badge"
                        : isPlayer1Winner
                        ? "win-badge"
                        : "loss-badge"
                    }`}
                  >
                    {isDraw
                      ? "🤝 DRAW"
                      : isPlayer1Winner
                      ? "🏆 WIN"
                      : "💀 LOSS"}
                  </span>

                </div>

                {/* PLAYERS */}

                <div className="match-players">

                  <div
                    className={`history-player ${
                      isPlayer1Winner
                        ? "match-winner"
                        : ""
                    }`}
                  >
                    <div className="player-symbol x-symbol">
                      X
                    </div>

                    <div>
                      <strong>
                        {game.player1}
                      </strong>

                      <span>
                        {isPlayer1Winner
                          ? "Winner"
                          : "Player 1"}
                      </span>
                    </div>

                    <b>
                      {game.player1Points}
                    </b>
                  </div>

                  <div className="vs-text">
                    VS
                  </div>

                  <div
                    className={`history-player ${
                      isPlayer2Winner
                        ? "match-winner"
                        : ""
                    }`}
                  >
                    <div className="player-symbol o-symbol">
                      O
                    </div>

                    <div>
                      <strong>
                        {game.player2}
                      </strong>

                      <span>
                        {isPlayer2Winner
                          ? "Winner"
                          : "Player 2"}
                      </span>
                    </div>

                    <b>
                      {game.player2Points}
                    </b>
                  </div>

                </div>

                {/* GAME INFORMATION */}

                <div className="history-info">

                  <div>
                    <span>
                      🎮 Mode
                    </span>

                    <strong>
                      {game.mode ===
                      "computer"
                        ? "Player vs Computer"
                        : "Player vs Player"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      🏆 Result
                    </span>

                    <strong>
                      {game.winner}
                    </strong>
                  </div>

                  <div>
                    <span>
                      📅 Date
                    </span>

                    <strong>
                      {new Date(
                        game.createdAt
                      ).toLocaleString()}
                    </strong>
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* BACK BUTTON */}

      <div className="history-footer">

        <button
          className="mode-btn"
          onClick={closeHistory}
        >
          🏠 Back to Main Menu
        </button>

      </div>

    </div>
  );
}

export default GameHistory;