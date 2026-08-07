import React, { useEffect, useState } from "react";

import QuestionBox from "./QuestionBox";
import PlayerCard from "./PlayerCard";
import ResultModal from "./ResultModal";

function Board({ players, mode }) {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [round, setRound] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);

  const [score, setScore] = useState({
    player1: 0,
    player2: 0,
    draw: 0
  });

  const [points, setPoints] = useState({
    player1: 0,
    player2: 0
  });

  const isComputerMode = mode === "computer";

  // -----------------------------------
  // WINNING PATTERNS
  // -----------------------------------

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ];

  // -----------------------------------
  // CHECK WINNER
  // -----------------------------------

  function checkWinner(currentBoard) {
    for (const [a, b, c] of winningPatterns) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  }

  // -----------------------------------
  // CHECK DRAW
  // -----------------------------------

  function checkDraw(currentBoard) {
    return currentBoard.every((cell) => cell !== "");
  }

  // -----------------------------------
  // GET QUESTION DIFFICULTY
  // -----------------------------------

  function getQuestionDifficulty() {
    if (round <= 3) {
      return "Easy";
    }

    if (round <= 6) {
      return "Medium";
    }

    return "Hard";
  }

  // -----------------------------------
  // HANDLE CELL CLICK
  // -----------------------------------

  async function handleCellClick(index) {
    // Computer cannot manually click
    if (isComputerMode && turn === "O") {
      return;
    }

    // Prevent invalid moves
    if (
      board[index] ||
      winner ||
      activeQuestion
    ) {
      return;
    }

    setSelectedCell(index);

    const difficulty = getQuestionDifficulty();

    try {
      const response = await fetch(
        `http://localhost:5000/api/questions/random?difficulty=${difficulty}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch question");
      }

      const question = await response.json();

      if (!question || !question._id) {
        console.log("No question found");
        setSelectedCell(null);
        return;
      }

      // Prevent duplicate questions
      if (usedQuestions.includes(question._id)) {
        console.log("Question already used");
        setSelectedCell(null);
        return;
      }

      setUsedQuestions((prev) => [
        ...prev,
        question._id
      ]);

      let duration = 10;

      if (difficulty === "Medium") {
        duration = 15;
      }

      if (difficulty === "Hard") {
        duration = 20;
      }

      setActiveQuestion({
        ...question,
        duration
      });

    } catch (error) {
      console.log(
        "Error fetching question:",
        error
      );

      setSelectedCell(null);
    }
  }

  // -----------------------------------
  // SAVE GAME RESULT
  // -----------------------------------

  async function saveGameResult(
    finalWinner,
    finalPoints
  ) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/games",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            player1: players.player1,
            player2: players.player2,
            mode: mode,

            winner:
              finalWinner === "X"
                ? players.player1
                : finalWinner === "O"
                ? players.player2
                : "Draw",

            player1Points:
              finalPoints.player1,

            player2Points:
              finalPoints.player2,

            player1Wins:
              finalWinner === "X"
                ? 1
                : 0,

            player2Wins:
              finalWinner === "O"
                ? 1
                : 0,

            draw:
              finalWinner === "draw"
                ? 1
                : 0
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(
          "Game saved successfully ✅",
          data
        );
      } else {
        console.log(
          "Game save failed ❌",
          data
        );
      }

    } catch (error) {
      console.log(
        "Error saving game:",
        error
      );
    }
  }

  // -----------------------------------
  // MAKE PLAYER MOVE
  // -----------------------------------

  function makeMove(index, currentPoints) {
    const updatedBoard = [...board];

    updatedBoard[index] = turn;

    setBoard(updatedBoard);

    // Check winner
    const result = checkWinner(updatedBoard);

    if (result) {
      const updatedScore = {
        ...score
      };

      if (result === "X") {
        updatedScore.player1 += 1;
      } else {
        updatedScore.player2 += 1;
      }

      setScore(updatedScore);
      setWinner(result);

      saveGameResult(
        result,
        currentPoints
      );

      return;
    }

    // Check draw
    if (checkDraw(updatedBoard)) {
      const updatedScore = {
        ...score,
        draw: score.draw + 1
      };

      setScore(updatedScore);
      setWinner("draw");

      saveGameResult(
        "draw",
        currentPoints
      );

      return;
    }

    // Change turn
    setTurn(
      turn === "X"
        ? "O"
        : "X"
    );
  }

  // -----------------------------------
  // FIND WINNING MOVE
  // -----------------------------------

  function findWinningMove(
    currentBoard,
    symbol
  ) {
    for (
      let i = 0;
      i < currentBoard.length;
      i++
    ) {
      if (currentBoard[i] !== "") {
        continue;
      }

      const testBoard = [
        ...currentBoard
      ];

      testBoard[i] = symbol;

      if (
        checkWinner(testBoard) === symbol
      ) {
        return i;
      }
    }

    return null;
  }

  // -----------------------------------
  // MINIMAX
  // HARD AI
  // -----------------------------------

  function minimax(
    currentBoard,
    depth,
    isMaximizing
  ) {
    const result = checkWinner(currentBoard);

    // Computer wins
    if (result === "O") {
      return 10 - depth;
    }

    // Player wins
    if (result === "X") {
      return depth - 10;
    }

    // Draw
    if (checkDraw(currentBoard)) {
      return 0;
    }

    // Computer's turn
    if (isMaximizing) {
      let bestScore = -Infinity;

      for (
        let i = 0;
        i < currentBoard.length;
        i++
      ) {
        if (currentBoard[i] === "") {
          const testBoard = [
            ...currentBoard
          ];

          testBoard[i] = "O";

          const score = minimax(
            testBoard,
            depth + 1,
            false
          );

          bestScore = Math.max(
            bestScore,
            score
          );
        }
      }

      return bestScore;
    }

    // Player's turn
    let bestScore = Infinity;

    for (
      let i = 0;
      i < currentBoard.length;
      i++
    ) {
      if (currentBoard[i] === "") {
        const testBoard = [
          ...currentBoard
        ];

        testBoard[i] = "X";

        const score = minimax(
          testBoard,
          depth + 1,
          true
        );

        bestScore = Math.min(
          bestScore,
          score
        );
      }
    }

    return bestScore;
  }

  // -----------------------------------
  // GET BEST MOVE
  // -----------------------------------

  function getBestMove(currentBoard) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (
      let i = 0;
      i < currentBoard.length;
      i++
    ) {
      if (currentBoard[i] === "") {
        const testBoard = [
          ...currentBoard
        ];

        testBoard[i] = "O";

        const score = minimax(
          testBoard,
          0,
          false
        );

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  }

  // -----------------------------------
  // COMPUTER MOVE
  // -----------------------------------

  function computerMove() {
    if (
      !isComputerMode ||
      turn !== "O" ||
      winner
    ) {
      return;
    }

    const emptyCells = board
      .map((cell, index) =>
        cell === ""
          ? index
          : null
      )
      .filter(
        (index) => index !== null
      );

    if (emptyCells.length === 0) {
      return;
    }

    let selectedIndex = null;

    // -----------------------------------
    // EASY
    // RANDOM MOVE
    // -----------------------------------

    if (players.difficulty === "Easy") {
      const randomIndex =
        Math.floor(
          Math.random() *
          emptyCells.length
        );

      selectedIndex =
        emptyCells[randomIndex];
    }

    // -----------------------------------
    // MEDIUM
    // WIN + BLOCK
    // -----------------------------------

    else if (
      players.difficulty === "Medium"
    ) {
      // First: try to win
      selectedIndex =
        findWinningMove(
          board,
          "O"
        );

      // Second: block player
      if (selectedIndex === null) {
        selectedIndex =
          findWinningMove(
            board,
            "X"
          );
      }

      // Third: take center
      if (selectedIndex === null) {
        if (board[4] === "") {
          selectedIndex = 4;
        }
      }

      // Fourth: random empty cell
      if (selectedIndex === null) {
        const randomIndex =
          Math.floor(
            Math.random() *
            emptyCells.length
          );

        selectedIndex =
          emptyCells[randomIndex];
      }
    }

    // -----------------------------------
    // HARD
    // MINIMAX
    // -----------------------------------

    else if (
      players.difficulty === "Hard"
    ) {
      selectedIndex =
        getBestMove(board);

      // Safety fallback
      if (selectedIndex === null) {
        const randomIndex =
          Math.floor(
            Math.random() *
            emptyCells.length
          );

        selectedIndex =
          emptyCells[randomIndex];
      }
    }

    // -----------------------------------
    // COMPUTER POINTS
    // -----------------------------------

    let computerPoints = 10;

    if (
      players.difficulty === "Medium"
    ) {
      computerPoints = 20;
    }

    if (
      players.difficulty === "Hard"
    ) {
      computerPoints = 30;
    }

    // -----------------------------------
    // UPDATE BOARD
    // -----------------------------------

    const updatedBoard = [...board];

    updatedBoard[selectedIndex] = "O";

    // -----------------------------------
    // UPDATE COMPUTER POINTS
    // -----------------------------------

    const updatedPoints = {
      ...points,

      player2:
        points.player2 +
        computerPoints
    };

    setPoints(updatedPoints);
    setBoard(updatedBoard);

    // -----------------------------------
    // CHECK COMPUTER WIN
    // -----------------------------------

    const result =
      checkWinner(updatedBoard);

    if (result === "O") {
      const updatedScore = {
        ...score,

        player2:
          score.player2 + 1
      };

      setScore(updatedScore);
      setWinner("O");

      saveGameResult(
        "O",
        updatedPoints
      );

      return;
    }

    // -----------------------------------
    // CHECK DRAW
    // -----------------------------------

    if (checkDraw(updatedBoard)) {
      const updatedScore = {
        ...score,

        draw:
          score.draw + 1
      };

      setScore(updatedScore);
      setWinner("draw");

      saveGameResult(
        "draw",
        updatedPoints
      );

      return;
    }

    // Give turn back to player
    setTurn("X");
  }

  // -----------------------------------
  // COMPUTER TURN
  // -----------------------------------

  useEffect(() => {
    if (
      isComputerMode &&
      turn === "O" &&
      !winner &&
      !activeQuestion
    ) {
      const timer = setTimeout(() => {
        computerMove();
      }, 700);

      return () =>
        clearTimeout(timer);
    }
  }, [
    turn,
    winner,
    activeQuestion,
    board,
    isComputerMode
  ]);

  // -----------------------------------
  // HANDLE ANSWER
  // -----------------------------------

  function handleAnswer(answer) {
    if (!activeQuestion) {
      return;
    }

    // -----------------------------------
    // CORRECT ANSWER
    // -----------------------------------

    if (
      answer === activeQuestion.answer
    ) {
      const updatedPoints = {
        ...points
      };

      if (turn === "X") {
        updatedPoints.player1 +=
          activeQuestion.points;
      } else {
        updatedPoints.player2 +=
          activeQuestion.points;
      }

      setPoints(updatedPoints);

      setRound(
        (prev) => prev + 1
      );

      makeMove(
        selectedCell,
        updatedPoints
      );

    } else {
      // -----------------------------------
      // WRONG ANSWER
      // -----------------------------------

      setTurn(
        turn === "X"
          ? "O"
          : "X"
      );
    }

    setActiveQuestion(null);
    setSelectedCell(null);
  }

  // -----------------------------------
  // RESTART GAME
  // -----------------------------------

  function restartGame() {
    setBoard(
      Array(9).fill("")
    );

    setTurn("X");
    setWinner(null);
    setRound(1);

    setActiveQuestion(null);
    setSelectedCell(null);
    setUsedQuestions([]);

    setScore({
      player1: 0,
      player2: 0,
      draw: 0
    });

    setPoints({
      player1: 0,
      player2: 0
    });
  }

  // -----------------------------------
  // UI
  // -----------------------------------

  return (
    <div className="game-layout">

      {/* LEFT SIDE GAME */}

      <div className="game-area">

        <h1 className="title">
          🧠 QuizTac
        </h1>

        <h3>
          Round: {round}
        </h3>

        <div className="players">

          <PlayerCard
            name={players.player1}
            symbol="X"
            active={turn === "X"}
          />

          <PlayerCard
            name={players.player2}
            symbol="O"
            active={turn === "O"}
          />

        </div>

        {/* COMPUTER THINKING */}

        {isComputerMode &&
          turn === "O" &&
          !winner && (
            <p>
              🤖 Computer is
              thinking...
            </p>
          )}

        {/* BOARD */}

        <div className="board">

          {board.map(
            (cell, index) => (
              <button
                key={index}
                className="cell"
                onClick={() =>
                  handleCellClick(index)
                }
              >
                {cell}
              </button>
            )
          )}

        </div>

      </div>

      {/* RIGHT SIDE QUESTION */}

      <div className="question-area">

        {activeQuestion && (
          <QuestionBox
            question={activeQuestion}
            selectAnswer={handleAnswer}
            timeUp={() =>
              handleAnswer(null)
            }
            playerName={
              turn === "X"
                ? players.player1
                : players.player2
            }
          />
        )}

        {!activeQuestion &&
          !winner &&
          !(
            isComputerMode &&
            turn === "O"
          ) && (
            <div className="waiting-box">

              <h2>🧠</h2>

              <p>
                Answer the question
                to make your move
              </p>

            </div>
          )}

        {/* COMPUTER MESSAGE */}

        {isComputerMode &&
          turn === "O" &&
          !winner && (
            <div className="waiting-box">

              <h2>🤖</h2>

              <p>
                Computer is
                choosing a move...
              </p>

            </div>
          )}

      </div>

      {/* RESULT MODAL */}

      {winner && (
        <ResultModal
          winner={winner}
          players={players}
          score={score}
          points={points}
          restartGame={restartGame}
          goHome={() =>
            window.location.reload()
          }
        />
      )}

    </div>
  );
}

export default Board;