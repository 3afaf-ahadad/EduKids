import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Colors() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedIds, setCompletedIds] = useState({});

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await api.get('/enfant/colors');
        setColors(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchColors();
  }, []);

  const playSound = (soundUrl) => new Audio(soundUrl).play();
  const saveProgress = async (colorId) => {
    if (completedIds[colorId]) return;
    setCompletedIds(prev => ({ ...prev, [colorId]: true }));
    await api.post('/enfant/progress', {
      content_type: 'color',
      content_id: colorId,
      completed: true,
      score: 1
    });
  };

  const handleClick = (color) => {
    playSound(color.sound_url);
    saveProgress(color.id);
  };

  if (loading) return <div>Loading colors...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-300 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(`/enfant/${childId}`)} className="bg-gray-600 text-white px-4 py-2 rounded">⬅ Back</button>
          <h1 className="text-3xl font-bold text-white">Colors</h1>
          <div></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleClick(color)}
              className="rounded-xl p-6 text-center shadow-lg hover:scale-105 transition"
              style={{ backgroundColor: color.hex_code }}
            >
              <div className="text-white text-2xl font-bold drop-shadow-md">{color.name}</div>
              {completedIds[color.id] && <div className="text-yellow-300 text-2xl mt-2">⭐</div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}