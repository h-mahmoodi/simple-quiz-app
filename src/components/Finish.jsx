import React from "react";

function Finish({ totalPoints, point, reset }) {
  return (
    <div>
      <div>Your Quiz is Finished</div>
      <div>
        Your score is {point}/{totalPoints}
      </div>
      <button onClick={reset}>Reset Quiz</button>
    </div>
  );
}

export default Finish;
