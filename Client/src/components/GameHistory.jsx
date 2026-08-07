import React, { useEffect, useState } from "react";
import "../style/GameHistory.css";

function GameHistory({ closeHistory }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [deletingAll, setDeletingAll] = useState(false);

  // -----------------------------------
  // FETCH GAME HISTORY
  // -----------------------------------

  useEffect(() => {
    fetch("http://localhost:5000/api/games")
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

  // -----------------------------------
  // DELETE ONE GAME
  // -----------------------------------

  async function deleteGame(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      const response = await fetch(
        `http://localhost:5000/api/games/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to delete game"
        );
      }

      // Remove game from UI
      setGames((prevGames) =>
        prevGames.filter(
          (game) => game._id !== id
        )
      );

    } catch (error) {
      console.log(
        "Delete game error:",
        error
      );

      alert(
        "Unable to delete this game."
      );

    } finally {
      setDeletingId(null);
    }
  }

  // -----------------------------------
  // DELETE ALL HISTORY
  // -----------------------------------

  async function deleteAllGames() {
    if (games.length === 0) {
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL game history? This action cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingAll(true);

      const response = await fetch(
        "http://localhost:5000/api/games",
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to delete history"
        );
      }

      setGames([]);

    } catch (error) {
      console.log(
        "Delete all games error:",
        error
      );

      alert(
        "Unable to delete game history."
      );

    } finally {
      setDeletingAll(false);
    }
  }

  // -----------------------------------
  // LOADING
  // -----------------------------------

  if (loading) {
    return (
      <div className="history-page">

        <div className="history-header">
          <h1>📜 Game History</h1>
          <p>
            Loading your previous games...
          </p>
        </div>

        <div className="history-loading">
          <div className="loading-spinner"></div>
          <p>Loading Game History...</p>
        </div>

      </div>
    );
  }

  // -----------------------------------
  // ERROR
  // -----------------------------------

  if (error) {
    return (
      <div className="history-page">

        <div className="history-header">
          <h1>📜 Game History</h1>
        </div>

        <div className="history-error">
          <h2>⚠️</h2>
          <p>{error}</p>

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

  // -----------------------------------
  // MAIN UI
  // -----------------------------------

  return (
    <div className="history-page">

      {/* HEADER */}

      <div className="history-header">

        <div>
          <h1>📜 Game History</h1>

          <p>
            Review your previous
            QuizTac battles
          </p>
        </div>

        <div className="history-count">
          {games.length}{" "}
          {games.length === 1
            ? "Game"
            : "Games"}
        </div>

      </div>

      {/* ACTIONS */}

      {games.length > 0 && (
        <div className="history-actions">

          <button
            className="delete-all-btn"
            onClick={deleteAllGames}
            disabled={deletingAll}
          >
            {deletingAll
              ? "Deleting..."
              : "🧹 Clear All History"}
          </button>

        </div>
      )}

      {/* EMPTY STATE */}

      {games.length === 0 ? (

        <div className="history-empty">

          <div className="empty-icon">
            🎮
          </div>

          <h2>
            No Games Yet
          </h2>

          <p>
            Play your first QuizTac
            game and your results
            will appear here.
          </p>

        </div>

      ) : (

        <div className="history-container">

          {games.map((game) => {

            const isDraw =
              game.winner === "Draw";

            const player1Won =
              game.winner ===
              game.player1;

            const player2Won =
              game.winner ===
              game.player2;

            return (
              <div
                className="history-card"
                key={game._id}
              >

                {/* CARD TOP */}

                <div className="history-card-top">

                  <div className="match-title">

                    <span>
                      🎮
                    </span>

                    <h3>
                      {game.player1}
                      {" "}
                      <span className="vs">
                        VS
                      </span>
                      {" "}
                      {game.player2}
                    </h3>

                  </div>

                  <button
                    className="delete-game-btn"
                    onClick={() =>
                      deleteGame(
                        game._id
                      )
                    }
                    disabled={
                      deletingId ===
                      game._id
                    }
                    title="Delete this game"
                  >
                    {deletingId ===
                    game._id
                      ? "..."
                      : "🗑️"}
                  </button>

                </div>

                {/* MODE */}

                <div className="history-meta">

                  <span className="mode-badge">
                    {game.mode ===
                    "computer"
                      ? "🤖 Player vs Computer"
                      : "⚔️ Player vs Player"}
                  </span>

                  <span className="date-badge">
                    📅{" "}
                    {new Date(
                      game.createdAt
                    ).toLocaleString()}
                  </span>

                </div>

                {/* RESULT */}

                <div
                  className={`winner-banner ${
                    isDraw
                      ? "draw-result"
                      : player1Won
                      ? "player1-result"
                      : "player2-result"
                  }`}
                >

                  <span className="winner-icon">
                    {isDraw
                      ? "🤝"
                      : "🏆"}
                  </span>

                  <div>
                    <small>
                      RESULT
                    </small>

                    <strong>
                      {isDraw
                        ? "It's a Draw"
                        : `${game.winner} Wins`}
                    </strong>
                  </div>

                </div>

                {/* SCORE */}

                <div className="score-section">

                  <div
                    className={`player-score ${
                      player1Won
                        ? "winner-player"
                        : ""
                    }`}
                  >

                    <div className="player-info">
                      <span className="player-symbol player-one">
                        X
                      </span>

                      <span>
                        {game.player1}
                      </span>
                    </div>

                    <strong>
                      {game.player1Points}
                      <small>
                        pts
                      </small>
                    </strong>

                  </div>

                  <div
                    className={`player-score ${
                      player2Won
                        ? "winner-player"
                        : ""
                    }`}
                  >

                    <div className="player-info">
                      <span className="player-symbol player-two">
                        O
                      </span>

                      <span>
                        {game.player2}
                      </span>
                    </div>

                    <strong>
                      {game.player2Points}
                      <small>
                        pts
                      </small>
                    </strong>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* BACK BUTTON */}

      <button
        className="mode-btn history-back-btn"
        onClick={closeHistory}
      >
        🏠 Back to Main Menu
      </button>

    </div>
  );
}

export default GameHistory;