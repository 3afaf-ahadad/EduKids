import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Numbers() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedIds, setCompletedIds] = useState({});

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const res = await api.get('/enfant/numbers');
        setNumbers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNumbers();
  }, []);

  const playSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
  };

  const saveProgress = async (numberId) => {
    if (completedIds[numberId]) return;
    setCompletedIds(prev => ({ ...prev, [numberId]: true }));
    await api.post('/enfant/progress', {
      content_type: 'number',
      content_id: numberId,
      completed: true,
      score: 1
    });
  };

  const handleClick = (num) => {
    playSound(num.sound_url);
    saveProgress(num.id);
  };

  if (loading) return <div>Loading numbers...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(`/enfant/${childId}`)} className="bg-gray-600 text-white px-4 py-2 rounded">⬅ Back</button>
          <h1 className="text-3xl font-bold text-white">Numbers 1-10</h1>
          <div></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {numbers.map((num) => (
            <button
              key={num.id}
              onClick={() => handleClick(num)}
              className="bg-white rounded-xl p-4 text-center shadow-lg hover:scale-105 transition"
            >
              <div className="text-6xl font-bold text-green-700">{num.value}</div>
              <div className="text-xl text-gray-600 mt-2">{num.word}</div>
              {completedIds[num.id] && <span className="text-green-500">★</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}