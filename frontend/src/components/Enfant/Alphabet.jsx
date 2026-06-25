import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlphabet, saveProgress } from '../../services/api';

export default function Alphabet() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [letters, setLetters] = useState([]);
  const [completedIds, setCompletedIds] = useState({});
  const [attempts, setAttempts] = useState({});

  useEffect(() => {
    getAlphabet().then((res) => {
      setLetters(res.data);
      // fetch progress for this child (simplified: init empty)
      setCompletedIds({});
      setAttempts({});
    });
  }, []);

  const playSound = (soundUrl) => {
    const audio = new Audio(`http://localhost:8000${soundUrl}`);
    audio.play();
  };

  const handleClick = (letter) => {
    // Play sound
    playSound(letter.sound_url);

    if (completedIds[letter.id]) return;

    // Increment local attempts
    const newAttempts = { ...attempts };
    newAttempts[letter.id] = (newAttempts[letter.id] || 0) + 1;
    setAttempts(newAttempts);

    // Save to backend
    saveProgress('alphabet', letter.id);

    // Mark completed after 3 attempts (RG3)
    if (newAttempts[letter.id] >= 3) {
      setCompletedIds((prev) => ({ ...prev, [letter.id]: true }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] via-[#F0F8FF] to-[#E8F0F8] font-['Nunito',sans-serif] p-6">
      <div className="relative container mx-auto max-w-5xl">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <button
            onClick={() => navigate(`/enfant/${childId}`)}
            className="bg-white text-[#00639C] font-semibold px-5 py-2.5 rounded-full shadow-md border"
          >
            ← Retour
          </button>
          <h1 className="text-3xl font-extrabold text-[#00639C]">Alphabet</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {letters.map((letter) => (
            <button
              key={letter.id}
              onClick={() => handleClick(letter)}
              className={`relative bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition transform hover:scale-105 border-2 ${
                completedIds[letter.id] ? 'border-green-400 bg-green-50' : 'border-[#E0E2E9]'
              }`}
            >
              <div className="text-3xl font-extrabold text-[#181C21]">
                {letter.letter_uppercase}
              </div>
              <div className="text-xl text-gray-400">{letter.letter_lowercase}</div>
              <div className="text-4xl mt-2">
                <img
                  src={`http://localhost:8000${letter.image_url}`}
                  alt={letter.example_word}
                  className="w-10 h-10 mx-auto object-contain"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">{letter.example_word}</div>
              {completedIds[letter.id] && (
                <div className="absolute top-1 right-1 text-green-500 text-xl">✓</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}