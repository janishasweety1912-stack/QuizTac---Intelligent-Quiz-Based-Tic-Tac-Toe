import { useState } from "react";
import GameMode from "./components/GameMode";
import PlayerSetup from "./components/PlayerSetup";
import Board from "./components/Board";
import GameHistory from "./components/GameHistory";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [mode, setMode] = useState(null);
  const [players, setPlayers] = useState(null);

  const [showHistory, setShowHistory] =
    useState(false);

  const [showLeaderboard, setShowLeaderboard] =
    useState(false);

  function startGame(data) {
    setPlayers(data);
  }

  function openHistory() {
    setShowHistory(true);
  }

  function closeHistory() {
    setShowHistory(false);
  }

  function openLeaderboard() {
    setShowLeaderboard(true);
  }

  function closeLeaderboard() {
    setShowLeaderboard(false);
  }

  // -------------------------------
  // LEADERBOARD
  // -------------------------------

  if (showLeaderboard) {
    return (
      <Leaderboard
        closeLeaderboard={
          closeLeaderboard
        }
      />
    );
  }

  // -------------------------------
  // GAME HISTORY
  // -------------------------------

  if (showHistory) {
    return (
      <GameHistory
        closeHistory={closeHistory}
      />
    );
  }

  // -------------------------------
  // GAME
  // -------------------------------

  if (players !== null) {
    return (
      <Board
        players={players}
        mode={mode}
      />
    );
  }

  // -------------------------------
  // PLAYER SETUP
  // -------------------------------

  if (mode !== null) {
    return (
      <PlayerSetup
        mode={mode}
        startGame={startGame}
      />
    );
  }

  // -------------------------------
  // MAIN MENU
  // -------------------------------

  return (
    <GameMode
      setMode={setMode}
      openHistory={openHistory}
      openLeaderboard={
        openLeaderboard
      }
    />
  );
}

export default App;