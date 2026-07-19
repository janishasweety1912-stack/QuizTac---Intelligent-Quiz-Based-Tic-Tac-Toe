import React from "react";
import Timer from "./Timer";

function QuestionBox({ question, selectAnswer, timeUp, playerName }) {
  return (
    <div className="question-box">
      <h3>{playerName}, your question:</h3>
      <Timer onTimeUp={timeUp} duration={question.duration} />
      <p>{question.question}</p>
      {question.options.map((opt, i) => (
        <button key={i} className="option-btn" onClick={() => selectAnswer(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export default QuestionBox;
