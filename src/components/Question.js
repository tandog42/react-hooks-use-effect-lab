import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  useEffect(() => {
    if (timeRemaining === 0) {
      onAnswered();
      setTimeRemaining(10);
     
    }

    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining => timeRemaining - 1);
    }, 1000);
    return function cleanup() {
      clearTimeout(timer);
    };
  }, [timeRemaining, onAnswered]);

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
