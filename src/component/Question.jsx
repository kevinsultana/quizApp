import React from "react";
export default function Question({
  question,
  answers,
  selectedAnswer,
  answerState,
  onSelectAnswer,
  activeQuestionIndex,
  questions,
}) {
  const getClass = (answer) => {
    if (!selectedAnswer) return "";

    const isCorrectAnswer =
      answer === questions[activeQuestionIndex].answers[0];
    const isSelected = answer === selectedAnswer;

    if (isSelected) {
      if (answerState === "answered") return "selected";
      return answerState === "correct" ? "correct" : "wrong";
    }

    if (answerState === "wrong" && isCorrectAnswer) {
      return "correct"; // Tampilkan jawaban benar juga
    }

    return "";
  };

  return (
    <>
      <h2>{question.text}</h2>
      <ul id="answers">
        {answers.map((answer, index) => (
          <li key={index} className="answer">
            <button
              className={getClass(answer)}
              onClick={() => onSelectAnswer(answer)}
              disabled={!!selectedAnswer}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
