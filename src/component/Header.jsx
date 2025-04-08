import React from "react";

export default function Header({ selectedTopic }) {
  return (
    <header>
      <img src="/quiz-logo.png" alt="logo" />
      <h1>{selectedTopic} Quiz</h1>
    </header>
  );
}
