import React, { useEffect, useState } from "react";
import Options from "./Options";

function Question({
  timer,
  count,
  totalPoints,
  question,
  index,
  userAnswer,
  setUserAnswer,
  point,
  setNextIndex,
  setStatus,
}) {
  const [userTimer, setUserTimer] = useState(200);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setUserTimer((state) => state - 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };

    // timerInterval();
  }, []);

  useEffect(() => {
    if (userTimer <= 0) {
      setStatus("finished");
    }
  }, [userTimer, setStatus]);

  //   if (userTimer <= 0) {
  //     setStatus("finished");
  //   }

  return (
    <div>
      <div>
        Question {index + 1}/ {count} | your point is : {point} / {totalPoints}
      </div>
      <div>
        <progress id="file" max={count} value={index + 1}>
          {index / count}
        </progress>
      </div>
      <hr />
      <div>{question.question}</div>

      <Options
        question={question}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
      />
      <div>
        {userAnswer !== null && index + 1 !== count && (
          <button onClick={setNextIndex}>Next</button>
        )}
        {userAnswer !== null && index + 1 === count && (
          <button onClick={() => setStatus("finished")}>Finish the quiz</button>
        )}
      </div>
      <div>Timer : {userTimer} sec</div>
    </div>
  );
}

export default Question;
