import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlphabet, saveProgress } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const letterEmojis = {
  A: '🍎', B: '⚽', C: '🐱', D: '🐬', E: '🐘', F: '🌸', G: '🐸',
  H: '🦉', I: '🏔️', J: '🧸', K: '🥝', L: '🦁', M: '🏠',
  N: '☁️', O: '🐦', P: '🍎', Q: '🎳', R: '🤖', S: '☀️',
  T: '🐢', U: '🏭', V: '🚗', W: '🚃', X: '🎵', Y: '🥛', Z: '🦓',
};

export default function Alphabet() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [letters, setLetters] = useState([]);
  const [completedIds, setCompletedIds] = useState({});
  const [attempts, setAttempts] = useState({});
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [justCompleted, setJustCompleted] = useState(null);

  // Load letters + saved progress
  useEffect(() => {
    getAlphabet().then((res) => {
      setLetters(res.data);
      api.get('/progress/alphabet')
        .then(progRes => {
          const savedAttempts = {};
          const savedCompleted = {};
          progRes.data.forEach(p => {
            savedAttempts[p.content_id] = p.attempts;
            if (p.completed) savedCompleted[p.content_id] = true;
          });
          setAttempts(savedAttempts);
          setCompletedIds(savedCompleted);
        })
        .catch(() => {});
    });
  }, []);

  const playSound = (soundUrl) => {
    try {
      const audio = new Audio(`http://localhost:8000${soundUrl}`);
      audio.play();
    } catch {
      // silent fallback
    }
  };

  // Open popup only – NO sound, NO progress
  const handleClick = (letter) => {
    setSelectedLetter(letter);
  };

  // Called only from the pop-up sound button
  const handleListenInPopup = (letter) => {
    playSound(letter.sound_url);

    if (completedIds[letter.id]) return;

    const newAttempts = { ...attempts };
    newAttempts[letter.id] = (newAttempts[letter.id] || 0) + 1;
    setAttempts(newAttempts);

    saveProgress('alphabet', letter.id);

    if (newAttempts[letter.id] >= 3) {
      setCompletedIds((prev) => ({ ...prev, [letter.id]: true }));
      setJustCompleted(letter.id);
      setTimeout(() => setJustCompleted(null), 1500);
    }
  };

  const closePopup = () => {
    setSelectedLetter(null);
    setJustCompleted(null);
  };

  const getEmoji = (letter) => {
    return letterEmojis[letter.letter_uppercase] || '📖';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] via-[#F0F8FF] to-[#E8F0F8] font-['Nunito',sans-serif] p-6">
      <div className="relative container mx-auto max-w-5xl">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <button
            onClick={() => navigate(`/enfant/${childId}`)}
            className="bg-white text-[#00639C] font-semibold px-5 py-2.5 rounded-full shadow-md border hover:bg-gray-50 transition"
          >
            ← Retour
          </button>
          <span className="text-sm text-gray-500">Bonjour {user?.child?.name}</span>
          <h1 className="text-3xl font-extrabold text-[#00639C]">Alphabet</h1>
        </div>

        {/* Letter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {letters.map((letter) => (
            <button
              key={letter.id}
              onClick={() => handleClick(letter)}
              className={`relative bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition transform hover:scale-105 border-2 ${
                completedIds[letter.id]
                  ? 'border-green-400 bg-green-50'
                  : 'border-[#E0E2E9]'
              }`}
            >
              <div className="text-3xl font-extrabold text-[#181C21]">
                {letter.letter_uppercase}
              </div>
              <div className="text-xl text-gray-400">{letter.letter_lowercase}</div>
              <div className="text-4xl mt-2">{getEmoji(letter)}</div>
              <div className="text-xs text-gray-500 mt-1">{letter.example_word}</div>
              {completedIds[letter.id] && (
                <div className="absolute top-1 right-1 text-green-500 text-xl">✓</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedLetter && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center border border-[#E0E2E9] animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>

            <div className="text-8xl font-extrabold text-[#00639C] mb-2">
              {selectedLetter.letter_uppercase}
            </div>
            <div className="text-5xl text-gray-400 mb-4">
              {selectedLetter.letter_lowercase}
            </div>
            <div className="text-7xl mb-4">{getEmoji(selectedLetter)}</div>
            <div className="text-2xl font-bold text-[#181C21] mb-6">
              {selectedLetter.example_word}
            </div>

            {/* Sound button – the ONLY way to count an attempt */}
            <button
              onClick={() => handleListenInPopup(selectedLetter)}
              className="bg-gradient-to-r from-[#4DABF7] to-[#9C7AFF] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 text-xl flex items-center gap-2 mx-auto"
            >
              🔊 Écouter le son
            </button>

            {/* Progress info */}
            <div className="mt-4 text-sm text-gray-500">
              {completedIds[selectedLetter.id]
                ? '✅ Lettre apprise !'
                : `Clics : ${attempts[selectedLetter.id] || 0} / 3`}
            </div>

            {justCompleted === selectedLetter.id && (
              <div className="mt-2 text-2xl animate-bounce">🎉 Bravo !</div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in { animation: bounce-in 0.4s ease-out; }
      `}</style>
    </div>
  );
}