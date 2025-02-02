import { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./components/Quiz";
import "./App.css";

const mockData = {
  questions: [
    {
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Processing Unit",
        "Central Process Unit",
        "Computer Process Unit",
      ],
      correctAnswer: "Central Processing Unit",
      hint: "It's the brain of the computer.",
    },
    {
      question: "Which language is used for web development?",
      options: ["Python", "Java", "HTML", "C++"],
      correctAnswer: "HTML",
      hint: "It's used to structure content on the web.",
    },
    {
      question: "What is the binary equivalent of the decimal number 10?",
      options: ["1010", "1100", "1001", "1111"],
      correctAnswer: "1010",
      hint: "Binary is base 2.",
    },
    {
      question: "Which data structure uses LIFO (Last In, First Out)?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: "Stack",
      hint: "Think of a stack of plates.",
    },
    {
      question: "What is the time complexity of a binary search algorithm?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      correctAnswer: "O(log n)",
      hint: "It halves the search space each time.",
    },
    {
      question: "Which protocol is used for secure communication over the internet?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      correctAnswer: "HTTPS",
      hint: "It encrypts data.",
    },
    {
      question: "What is the main purpose of an operating system?",
      options: [
        "Manage hardware resources",
        "Run applications",
        "Provide user interface",
        "All of the above",
      ],
      correctAnswer: "All of the above",
      hint: "It does multiple things.",
    },
    {
      question: "Which of the following is NOT a programming language?",
      options: ["Python", "Java", "HTML", "C++"],
      correctAnswer: "HTML",
      hint: "It's a markup language.",
    },
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Standard Query Language",
        "Sequential Query Language",
      ],
      correctAnswer: "Structured Query Language",
      hint: "It's used for databases.",
    },
    {
      question: "Which of the following is a NoSQL database?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      correctAnswer: "MongoDB",
      hint: "It's document-based.",
    },
    {
      question: "What is the primary function of a compiler?",
      options: [
        "Execute code",
        "Translate high-level code to machine code",
        "Debug code",
        "Optimize code",
      ],
      correctAnswer: "Translate high-level code to machine code",
      hint: "It converts code for the computer to understand.",
    },
    {
      question: "Which of the following is a dynamically typed language?",
      options: ["Java", "C++", "Python", "C#"],
      correctAnswer: "Python",
      hint: "You don't need to declare variable types.",
    },
    {
      question: "What is the default port for HTTP?",
      options: ["80", "443", "8080", "21"],
      correctAnswer: "80",
      hint: "It's the standard port for web traffic.",
    },
    {
      question: "Which algorithm is used for sorting in Python's `sorted()` function?",
      options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Timsort"],
      correctAnswer: "Timsort",
      hint: "It's a hybrid sorting algorithm.",
    },
    {
      question: "What is the main purpose of a firewall?",
      options: [
        "Monitor network traffic",
        "Block unauthorized access",
        "Encrypt data",
        "All of the above",
      ],
      correctAnswer: "Block unauthorized access",
      hint: "It acts as a barrier.",
    },
  ],
};

export default function App() {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          "https://corsproxy.io/?https://api.jsonserve.com/Uw5CrX"
        );
        setQuizData(response.data.questions);
      } catch (err) {
        console.error("API Error:", err);
        setQuizData(mockData.questions); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app">
      <h1>Quiz App</h1>
      <hr></hr>
      {error && <div className="error">{error}</div>}
      {!gameStarted ? (
        <button onClick={() => setGameStarted(true)}>Start Quiz</button>
      ) : (
        <Quiz quizData={quizData} />
      )}
    </div>
  );
}