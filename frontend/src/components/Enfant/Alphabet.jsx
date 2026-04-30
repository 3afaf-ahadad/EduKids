import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Alphabet() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedLetters, setClickedLetters] = useState({});

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const res = await api.get('/enfant/alphabet');
        setLetters(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLetters();
  }, []);

  const playSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
  };

  const saveProgress = async (letterId) => {
    if (clickedLetters[letterId]) return; // already saved
    setClickedLetters(prev => ({ ...prev, [letterId]: true }));
    try {
      await api.post('/enfant/progress', {
        content_type: 'alphabet',
        content_id: letterId,
        completed: true,
        score: 1
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLetterClick = (letter) => {
    playSound(letter.sound_url);
    saveProgress(letter.id);
  };

  if (loading) return <div className="text-center p-10">Loading alphabet...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(`/enfant/${childId}`)} className="bg-gray-600 text-white px-4 py-2 rounded">⬅ Back</button>
          <h1 className="text-3xl font-bold text-white">Alphabet</h1>
          <div></div>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-4">
          {letters.map((letter) => (
            <button
              key={letter.id}
              onClick={() => handleLetterClick(letter)}
              className="bg-white rounded-xl p-4 text-center shadow-lg hover:scale-105 transition transform"
            >
              <div className="text-5xl font-bold text-blue-700">{letter.letter_uppercase}</div>
              <div className="text-sm text-gray-500 mt-2">{letter.example_word}</div>
              {clickedLetters[letter.id] && <span className="text-green-500 text-xs">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}