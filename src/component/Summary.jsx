export default function Summary({ userAnswers, questions }) {
  const skippedQuestions =
    (userAnswers.filter((answer) => answer === null).length /
      userAnswers.length) *
    100;

  const correctAnswer = questions.map((question, index) => {
    if (userAnswers[index] === question.answers[0]) {
      return true;
    }
    return false;
  });

  const isCorrect =
    (correctAnswer.filter((answer) => answer === true).length /
      userAnswers.length) *
    100;

  return (
    <div id="summary">
      <img src="/quiz-complete.png" alt="logo" />
      <h2>Quiz Complete!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedQuestions.toFixed(0)}%</span>
          <span className="text">question skipped</span>
        </p>
        <p>
          <span className="number">{isCorrect.toFixed(0)}%</span>
          <span className="text">answerd correctly</span>
        </p>
        <p>
          <span className="number">
            {100 - skippedQuestions.toFixed(0) - isCorrect.toFixed(0)}%
          </span>
          <span className="text">answer incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClasses = "user-answer";
          if (answer === null) {
            cssClasses += " skipped";
          } else if (answer === questions[index].answers[0]) {
            cssClasses += " correct";
          } else {
            cssClasses += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{questions[index].text}</p>
              <p className={cssClasses}>
                {answer === null ? "Skipped" : answer}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
