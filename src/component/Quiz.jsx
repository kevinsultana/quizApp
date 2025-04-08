import React, { useCallback, useState, useMemo } from "react";
import questions from "./../questions";
import QuestionTimer from "./QuestionTimer";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const activeQuestionIndex = userAnswers.length;
  const currentQuestion = questions[activeQuestionIndex];
  const quizComplete = activeQuestionIndex >= questions.length;

  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    const answers = [...currentQuestion.answers];
    return answers.sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const isCorrect = selectedAnswer === currentQuestion?.answers[0];

  const timerState =
    answerState === "answered"
      ? "answered"
      : answerState === "correct" || answerState === "wrong"
      ? "result"
      : "active";

  const handleAnswer = useCallback(
    async (answer) => {
      if (answerState !== "") return;

      setSelectedAnswer(answer);
      setAnswerState("answered");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const correct = answer === currentQuestion.answers[0];
      setAnswerState(correct ? "correct" : "wrong");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUserAnswers((prev) => [...prev, answer]);
      setSelectedAnswer(null);
      setAnswerState("");
    },
    [currentQuestion, answerState]
  );

  const handleTimeOut = useCallback(() => {
    if (answerState !== "") return;
    setUserAnswers((prev) => [...prev, null]); // skip tanpa jawaban
  }, [answerState]);

  if (quizComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex + answerState}
          timeOut={10000}
          onTimeOut={handleTimeOut}
          state={timerState}
          isCorrect={isCorrect}
        />
        <Question
          question={currentQuestion}
          answers={shuffledAnswers}
          selectedAnswer={selectedAnswer}
          answerState={answerState}
          onSelectAnswer={handleAnswer}
          activeQuestionIndex={activeQuestionIndex}
        />
      </div>
    </div>
  );
}
