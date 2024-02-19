import React from "react";

function Options({ question, userAnswer, setUserAnswer }) {
  const styles = {
    backgroundColor: userAnswer
      ? userAnswer === question.correctOption
        ? "green"
        : "red"
      : "white",
  };
  return (
    <div>
      {question.options.map((opt, i) => (
        <button
          key={i}
          style={{
            backgroundColor:
              userAnswer != null
                ? i === question.correctOption
                  ? "green"
                  : "red"
                : "white",
          }}
          onClick={() => setUserAnswer(i)}
          disabled={userAnswer !== null}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
