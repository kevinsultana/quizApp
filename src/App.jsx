import { useState } from "react";
import Header from "./component/Header";
import Quiz from "./component/Quiz";
import TopicSelection from "./component/TopicSelection";
import questions from "./questions";
import generalQuestions from "./general-questions";

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const questionsQuiz =
    selectedTopic === "react"
      ? questions
      : selectedTopic === "general"
      ? generalQuestions
      : [];

  return (
    <>
      <Header selectedTopic={selectedTopic} />
      <main>
        {selectedTopic === null ? (
          <TopicSelection onSelectTopic={handleSelectTopic} />
        ) : (
          <Quiz questions={questionsQuiz} />
        )}
      </main>
    </>
  );
}

export default App;
