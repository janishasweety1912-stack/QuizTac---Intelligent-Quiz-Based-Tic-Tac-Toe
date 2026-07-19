import React from "react";

function PlayerCard({ name, symbol, active }) {
  return (
    <div className={`player-card ${active ? "active" : ""}`}>
      <h3>
        {symbol === "X" ? "🔵" : "🔴"} {name}
      </h3>
      <p>Symbol: {symbol}</p>
      {active && <p className="turn-text">⚡ Your Turn</p>}
    </div>
  );
}

export default PlayerCard;
