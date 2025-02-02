export default function Results({ score, totalQuestions }) {
  return (
    <div className="results-container">
      <h2>Quiz Completed!</h2>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <button onClick={() => window.location.reload()}>Restart Quiz</button>
    </div>
  );
}