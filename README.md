# 🧠 QuizTac — Intelligent Quiz Based Tic-Tac-Toe Game

QuizTac is a full-stack interactive Tic-Tac-Toe game that combines traditional Tic-Tac-Toe gameplay with quiz-based challenges.

Instead of simply placing a symbol on the board, players must answer a question correctly to make their move. The application also includes Player vs Player and Player vs Computer modes, multiple AI difficulty levels, game history, scoring, and a leaderboard.

## 🎮 Features

* 🎯 Quiz-based Tic-Tac-Toe gameplay
* 👥 Player vs Player mode
* 🤖 Player vs Computer mode
* 🟢 Easy computer difficulty
* 🟡 Medium computer difficulty
* 🔴 Hard computer difficulty using Minimax AI
* 🧠 Difficulty-based quiz questions
* ⏱️ Timed questions
* ⭐ Quiz-based point system
* 🏆 Game winner detection
* 📜 Game history
* 🗑️ Delete individual game history
* 🧹 Delete complete game history
* 🏅 Player leaderboard
* 💾 Persistent game data using MongoDB
* 🌐 Full-stack deployment
* 📱 Responsive user interface

## 🕹️ How the Game Works

### Player vs Player

1. Enter the names of both players.
2. Player 1 starts with `X`.
3. Select an empty cell.
4. A quiz question appears.
5. Answer the question within the given time.
6. A correct answer allows the player to make the move and earn points.
7. An incorrect answer passes the turn to the other player.
8. The first player to create three symbols in a row wins.

### Player vs Computer

1. Enter Player 1's name.
2. Select the computer difficulty.
3. Player 1 plays as `X`.
4. The computer plays as `O`.
5. The computer automatically selects its moves according to the selected difficulty.

## 🤖 Computer AI

QuizTac provides three computer difficulty levels.

### 🟢 Easy

The computer chooses an available cell randomly.

### 🟡 Medium

The computer follows a basic strategy:

1. Attempts to win if possible.
2. Blocks the player's winning move.
3. Takes the center when available.
4. Otherwise selects an available cell.

### 🔴 Hard

The Hard mode uses the **Minimax algorithm** to evaluate possible game states and select the optimal move.

This allows the computer to make significantly stronger decisions than the Easy and Medium modes.

## 🧠 Quiz System

Questions are retrieved from the backend based on difficulty.

The quiz difficulty progresses according to the game round:

| Round | Question Difficulty |
| ----- | ------------------- |
| 1–3   | Easy                |
| 4–6   | Medium              |
| 7+    | Hard                |

Each question contains a point value.

A correct answer awards the question's points to the player.

An incorrect answer or timeout awards no points and passes the turn.

## ⭐ Scoring System

Player points are generated from correctly answered quiz questions.

The computer receives points according to its selected difficulty:

| Computer Difficulty | Points per Move |
| ------------------- | --------------: |
| Easy                |              10 |
| Medium              |              20 |
| Hard                |              30 |

The **Tic-Tac-Toe winner is determined independently from the quiz points**.

The winner is the player who successfully creates three matching symbols in a row.

Therefore, having more quiz points does not necessarily mean winning the Tic-Tac-Toe game.

## 🏆 Game Results

After a game finishes, QuizTac records:

* Player names
* Game mode
* Winner
* Player 1 points
* Player 2 points
* Player wins
* Computer/player wins
* Draw result
* Game date and time

## 📜 Game History

QuizTac stores completed games in MongoDB.

The Game History section allows users to:

* View previous games
* View players and game mode
* View the winner
* View points earned
* View date and time
* Delete an individual game
* Delete complete game history

Games are displayed with the newest games first.

## 🏅 Leaderboard

The leaderboard calculates player performance using stored game results.

Players are ranked primarily by:

1. Number of wins
2. Total points

This provides an overall ranking of players based on their game performance.

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* Mongoose

### AI / Game Logic

* Minimax Algorithm
* Tic-Tac-Toe Game State Evaluation
* Rule-based AI strategies

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

## 📂 Project Structure

```text
Tic-Tac-Toe Game Application/
│
├── Client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Board.jsx
│   │   │   ├── GameHistory.jsx
│   │   │   ├── GameMode.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── PlayerCard.jsx
│   │   │   ├── PlayerSetup.jsx
│   │   │   ├── QuestionBox.jsx
│   │   │   └── ResultModal.jsx
│   │   │
│   │   ├── style/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── .env
│
├── Server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── Game.js
│   │   └── Question.js
│   │
│   ├── routes/
│   │   ├── gameRoutes.js
│   │   └── questionRoutes.js
│   │
│   ├── seedQuestions.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── LICENSE
└── README.md
```

## 🔌 API Endpoints

### Questions

| Method | Endpoint                                  | Description                |
| ------ | ----------------------------------------- | -------------------------- |
| GET    | `/api/questions/random`                   | Get a random quiz question |
| GET    | `/api/questions/random?difficulty=Easy`   | Get an Easy question       |
| GET    | `/api/questions/random?difficulty=Medium` | Get a Medium question      |
| GET    | `/api/questions/random?difficulty=Hard`   | Get a Hard question        |

### Games

| Method | Endpoint                 | Description               |
| ------ | ------------------------ | ------------------------- |
| POST   | `/api/games`             | Save a completed game     |
| GET    | `/api/games`             | Retrieve game history     |
| GET    | `/api/games/leaderboard` | Retrieve leaderboard data |

## ⚙️ Environment Variables

### Client

Create a `.env` file inside the `Client` directory:

```env
VITE_API_URL=your_backend_url
```

Example:

```env
VITE_API_URL=https://quiztac-game-application.onrender.com
```

### Server

Create a `.env` file inside the `Server` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Do not commit `.env` files or database credentials to GitHub.

## 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd "Tic-Tac-Toe Game Application"
```

### 2. Install frontend dependencies

```bash
cd Client
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Install backend dependencies

Open another terminal:

```bash
cd Server
npm install
```

### 5. Start the backend

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

The frontend will run on the Vite development URL shown in the terminal.

## 🌐 Live Application

**Frontend:**
https://tic-tac-toe-game-application-89rw8ol3f.vercel.app

**Backend:**
https://quiztac-game-application.onrender.com

## 🔐 Security

Environment variables are used for sensitive configuration such as the MongoDB connection string.

The `.env` files are excluded from version control and should never be committed to the repository.

## 🎯 Future Improvements

Possible future enhancements include:

* 🔐 User authentication
* 👤 Individual player profiles
* 🌐 Online multiplayer
* 🧩 Larger question bank
* 📊 Advanced player statistics
* 🏆 Global leaderboard
* 🎨 Theme customization
* 🔊 Sound effects
* 📱 Progressive Web App support
* 🧠 More advanced AI strategies

## 👩‍💻 Author

**Anisha Sweety J**

Computer Science & Engineering Student

### Project

**QuizTac — Quiz-Based Tic-Tac-Toe Game Application**

Built using React, Node.js, Express, MongoDB, and AI-based game logic.
