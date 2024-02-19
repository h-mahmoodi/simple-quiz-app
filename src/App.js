import "./App.css";
import { useEffect, useReducer, useState } from "react";
import StartScreen from "./components/StartScreen";
import Error from "./components/Error";
import Question from "./components/Question";
import Finish from "./components/Finish";

const APP_URL = process.env.REACT_APP_API_URL;

const initialState = {
  questions: [],
  status: "", //loading,error,ready,active,finished
  errorMessage: "",
  index: 0,
  userAnswer: null,
  point: 0,
  timer: 100,
};

const actionTypes = {
  SET_QUESTIONS: "SET_QUESTIONS",
  SET_STATUS: "SET_STATUS",
  SET_ERROR_MESSAGE: "SET_ERROR_MESSAGE",
  SET_USER_ANSWER: "SET_USER_ANSWER",
  SET_NEXT_INDEX: "SET_NEXT_INDEX",
  RESET_QUIZ: "RESET_QUIZ",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_QUESTIONS: {
      return {
        ...state,
        questions: action.payload,
      };
    }
    case actionTypes.SET_STATUS: {
      return { ...state, status: action.payload };
    }
    case actionTypes.SET_ERROR_MESSAGE: {
      return { ...state, errorMessage: action.payload };
    }
    case actionTypes.SET_USER_ANSWER: {
      const currentQuestion = state.questions[state.index];
      return {
        ...state,
        userAnswer: action.payload,
        point:
          currentQuestion.correctOption === action.payload
            ? state.point + currentQuestion.points
            : state.point,
      };
    }
    case actionTypes.SET_NEXT_INDEX: {
      return {
        ...state,
        index: state.index + 1,
        userAnswer: null,
      };
    }

    case actionTypes.RESET_QUIZ: {
      return {
        ...state,
        status: "ready", //loading,error,ready,active,finished
        errorMessage: "",
        index: 0,
        userAnswer: null,
        point: 0,
      };
    }

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, errorMessage, index, userAnswer, point, timer } =
    state;

  const setStatus = (value) => {
    dispatch({ type: actionTypes.SET_STATUS, payload: value });
  };

  const setErrorMessage = (errorMessage) => {
    dispatch({
      type: actionTypes.SET_ERROR_MESSAGE,
      payload: `Failed to fetch data : ${errorMessage}`,
    });
  };

  const setQuestions = (data) => {
    dispatch({ type: actionTypes.SET_QUESTIONS, payload: data });
  };

  const setUserAnswer = (id) => {
    dispatch({ type: actionTypes.SET_USER_ANSWER, payload: id });
  };

  const setNextIndex = () => {
    dispatch({ type: actionTypes.SET_NEXT_INDEX });
  };

  const reset = () => {
    dispatch({ type: actionTypes.RESET_QUIZ });
  };

  const totalPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );

  console.log(totalPoints);

  useEffect(() => {
    setStatus("loading");
    const fetcher = async () => {
      try {
        if (!APP_URL) {
          throw new Error("API URL is not define!");
        }

        const response = await fetch(APP_URL);

        if (!response.ok) {
          throw new Error(`Status Code ${response.status}`);
        }

        const data = await response.json();
        setQuestions(data);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
        setErrorMessage(error.message);
      }
    };

    fetcher();
  }, []);

  return (
    <div className="App">
      {status === "loading" && <div>Loading data ... </div>}
      {status === "error" && (
        <div>
          <Error message={errorMessage} />
        </div>
      )}
      {status === "ready" && (
        <StartScreen count={questions.length} setStatus={setStatus} />
      )}
      {status === "active" && (
        <Question
          timer={timer}
          count={questions.length}
          totalPoints={totalPoints}
          question={questions[index]}
          index={index}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          point={point}
          setNextIndex={setNextIndex}
          setStatus={setStatus}
        />
      )}
      {status === "finished" && (
        <Finish totalPoints={totalPoints} point={point} reset={reset} />
      )}
    </div>
  );
}

export default App;
