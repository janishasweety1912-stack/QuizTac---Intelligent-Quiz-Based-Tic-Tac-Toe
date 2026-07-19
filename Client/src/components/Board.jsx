import React, { useState } from "react";
import QuestionBox from "./QuestionBox";
import PlayerCard from "./PlayerCard";
import ResultModal from "./ResultModal";
import questions from "../data/questions";

function Board({ players }) {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [round, setRound] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);

  const [score, setScore] = useState({ player1: 0, player2: 0, draw: 0 });
  const [points, setPoints] = useState({ player1: 0, player2: 0 });

  const winningPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function checkWinner(updatedBoard) {
    for (let [a,b,c] of winningPatterns) {
      if (updatedBoard[a] && updatedBoard[a] === updatedBoard[b] && updatedBoard[a] === updatedBoard[c]) {
        return updatedBoard[a];
      }
    }
    return null;
  }

  function checkDraw(updatedBoard) {
    return updatedBoard.every(cell => cell !== "");
  }

  function getQuestionDifficulty() {
    if (round <= 3) return "Easy";
    else if (round <= 6) return "Medium";
    else return "Hard";
  }

  function handleCellClick(index) {
    if (board[index] || winner || activeQuestion) return;
    setSelectedCell(index);
    const difficulty = getQuestionDifficulty();

    const availableQuestions = questions.filter(
      q => q.difficulty === difficulty && !usedQuestions.includes(q.id)
    );
    if (availableQuestions.length === 0) return;

    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    setUsedQuestions(prev => [...prev, randomQuestion.id]);

    // attach duration based on difficulty
    let duration = 10;
    if (difficulty === "Medium") duration = 15;
    if (difficulty === "Hard") duration = 20;

    setActiveQuestion({ ...randomQuestion, duration });
  }

  function makeMove(index) {
    const updatedBoard = [...board];
    updatedBoard[index] = turn;
    setBoard(updatedBoard);

    const result = checkWinner(updatedBoard);
    if (result) {
      setWinner(result);
      if (result === "X") setScore(prev => ({ ...prev, player1: prev.player1 + 1 }));
      else setScore(prev => ({ ...prev, player2: prev.player2 + 1 }));
      return;
    }
    if (checkDraw(updatedBoard)) {
      setWinner("draw");
      setScore(prev => ({ ...prev, draw: prev.draw + 1 }));
      return;
    }
    setTurn(turn === "X" ? "O" : "X");
  }

  function handleAnswer(answer) {
    if (answer === activeQuestion.answer) {
      makeMove(selectedCell);
      setRound(prev => prev + 1);
      if (turn === "X") {
        setPoints(prev => ({ ...prev, player1: prev.player1 + activeQuestion.points }));
      } else {
        setPoints(prev => ({ ...prev, player2: prev.player2 + activeQuestion.points }));
      }
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
    setActiveQuestion(null);
    setSelectedCell(null);
  }

  function restartGame() {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setWinner(null);
    setRound(1);
    setActiveQuestion(null);
    setSelectedCell(null);
    setUsedQuestions([]);
  }

  return (
    <div className="game-layout">
      {/* LEFT SIDE GAME */}
      <div className="game-area">
        <h1 className="title">🧠 QuizTac</h1>
        <h3>Round: {round}</h3>
        <div className="players">
          <PlayerCard name={players.player1} symbol="X" active={turn === "X"} />
          <PlayerCard name={players.player2} symbol="O" active={turn === "O"} />
        </div>
        <div className="board">
          {board.map((cell, index) => (
            <button key={index} className="cell" onClick={() => handleCellClick(index)}>
              {cell}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE QUESTION */}
      <div className="question-area">
        {activeQuestion && (
          <QuestionBox
            question={activeQuestion}
            selectAnswer={handleAnswer}
            timeUp={() => handleAnswer(null)}
            playerName={turn === "X" ? players.player1 : players.player2}
          />
        )}
        {!activeQuestion && !winner && (
          <div className="waiting-box">
            <h2>🧠</h2>
            <p>Answer the question to make your move</p>
          </div>
        )}
      </div>

      {winner && (
        <ResultModal
          winner={winner}
          players={players}
          score={score}
          points={points}
          restartGame={restartGame}
          goHome={() => window.location.reload()}
        />
      )}
    </div>
  );
}

export default Board;
