import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function MissingLetter() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const fetchLetters = async () => {
      const res = await api.get('/enfant/alphabet');
      setLetters(res.data);
      loadQuestion(res.data);
    };
    fetchLetters();
  }, []);

  const loadQuestion = (letterList) => {
    if (currentIndex >= 10) {
      setGameOver(true);
      return;
    }
    const randomLetter = letterList[Math.floor(Math.random() * letterList.length)];
    const word = randomLetter.example_word;
    const missingIndex = Math.floor(Math.random() * word.length);
    const correctLetter = word[missingIndex];
    const wrongOptions = letterList
      .filter(l => l.letter_uppercase !== correctLetter.toUpperCase() && l.letter_lowercase !== correctLetter)
      .slice(0, 2)
      .map(l => l.letter_uppercase);
    const allOptions = [correctLetter.toUpperCase(), ...wrongOptions];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    setQuestion({ word, missingIndex, correctLetter });
  };

  const handleAnswer = async (selectedLetter) => {
    if (selectedLetter === question.correctLetter.toUpperCase()) {
      setScore(prev => prev + 1);
    }
    const next = currentIndex + 1;
    setCurrentIndex(next);
    if (next >= 10) {
      // save final score
      await api.post('/enfant/game-score', {
        game_type: 'missing_letter',
        score: score + (selectedLetter === question.correctLetter.toUpperCase() ? 1 : 0),
        played_at: new Date().toISOString()
      });
      setGameOver(true);
    } else {
      loadQuestion(letters);
    }
  };

  if (!question && !gameOver) return <div>Loading game...</div>;
  if (gameOver) {
    return (
      <div className="text-center p-10">
        <h2 className="text-3xl font-bold">Game Over!</h2>
        <p className="text-xl">Your score: {score}/10</p>
        <button onClick={() => navigate(`/enfant/${childId}`)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Back to modules</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-100 p-6">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Missing Letter Game</h1>
        <p className="text-xl mb-2">Score: {score}/10</p>
        <div className="bg-white p-8 rounded-xl shadow-xl inline-block">
          <p className="text-4xl mb-6">
            {question.word.split('').map((ch, idx) => (
              <span key={idx} className="mx-1">
                {idx === question.missingIndex ? ' ___ ' : ch}
              </span>
            ))}
          </p>
          <div className="flex gap-4 justify-center">
            {options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(opt)} className="bg-blue-600 text-white px-6 py-3 rounded-xl text-2xl font-bold">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}