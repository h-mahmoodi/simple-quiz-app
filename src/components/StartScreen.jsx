import React from "react";

function StartScreen({ count, setStatus }) {
  return (
    <div>
      <div>Welcom to the React Quiz!</div>
      <div>There are {count} Question to answer</div>
      <div>
        <button
          onClick={() => {
            setStatus("active");
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
