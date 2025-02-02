import { useState } from "react";
import Timer from "./Timer";
import Hint from "./Hint";
import Lifeline from "./Lifeline";
import Results from "./Results";

export default function Quiz({ quizData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerClick = (option) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks
    setSelectedAnswer(option);

    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowHint(false);
        setFilteredOptions([]);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  const handleFiftyFifty = () => {
    if (usedFiftyFifty) return;
    const incorrectOptions = currentQuestion.options.filter(
      (option) => option !== currentQuestion.correctAnswer
    );
    const removedOptions = incorrectOptions.slice(0, 2);
    setFilteredOptions(
      currentQuestion.options.filter(
        (option) => !removedOptions.includes(option)
      )
    );
    setUsedFiftyFifty(true);
  };

  if (quizCompleted) {
    return <Results score={score} totalQuestions={quizData.length} />;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <Lifeline
          usedFiftyFifty={usedFiftyFifty}
          onFiftyFifty={handleFiftyFifty}
        />
        <Hint
          hint={currentQuestion.hint}
          showHint={showHint}
          setShowHint={setShowHint}
          usedHint={usedHint}
          setUsedHint={setUsedHint}
        />
        <Timer initialTime={60} onTimeUp={() => setQuizCompleted(true)} />
      </div>
      <div className="question-number">
        Question {currentQuestionIndex + 1} of {quizData.length}
      </div>
      <div className="question">{currentQuestion.question}</div>
      <div className="options">
        {(filteredOptions.length > 0 ? filteredOptions : currentQuestion.options).map(
          (option, index) => (
            <button
              key={index}
              className={`option ${
                selectedAnswer === option
                  ? option === currentQuestion.correctAnswer
                    ? "correct"
                    : "incorrect"
                  : selectedAnswer !== null &&
                    option === currentQuestion.correctAnswer
                  ? "correct"
                  : ""
              }`}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          )
        )}
      </div>
      <div className="navigation">
        <button
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
          disabled={currentQuestionIndex === quizData.length - 1}
        >
          Next
        </button>
        <button onClick={() => setQuizCompleted(true)}>Quit</button>
      </div>
    </div>
  );
}