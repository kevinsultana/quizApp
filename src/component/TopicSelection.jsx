export default function TopicSelection({ onSelectTopic }) {
  return (
    <div id="topic-selection">
      <h2>Select a Topic</h2>
      <div className="topics">
        <button onClick={() => onSelectTopic("react")}>React</button>
        <button onClick={() => onSelectTopic("general")}>
          General Knowledge
        </button>
      </div>
    </div>
  );
}
