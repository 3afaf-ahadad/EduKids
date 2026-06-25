import { useState, useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { useParams, useNavigate } from 'react-router-dom';
import { getColors, saveProgress } from '../../services/api';

export default function Colors() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);
  const [completedIds, setCompletedIds] = useState({});
  const [justCompleted, setJustCompleted] = useState(null);

  useEffect(() => {
    getColors().then((res) => {
      setColors(res.data);
      setCompletedIds({});
    });
  }, []);

  const playSound = (soundUrl) => {
    const audio = new Audio(`http://localhost:8000${soundUrl}`);
    audio.play();
  };

  const handleClick = (color) => {
    playSound(color.sound_url);
    saveProgress('color', color.id);
    // Color learned on first correct identification (RG5)
    if (!completedIds[color.id]) {
      setCompletedIds((prev) => ({ ...prev, [color.id]: true }));
      setJustCompleted(color.id);
      setTimeout(() => setJustCompleted(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] via-[#F0F8FF] to-[#E8F0F8] font-['Nunito',sans-serif] p-6">
      <div className="relative container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(`/enfant/${childId}`)}
            className="bg-white text-[#00639C] font-semibold px-5 py-2.5 rounded-full shadow-md border"
          >
            ← Retour
          </button>
          <h1 className="text-3xl font-extrabold text-[#DB980F]">Couleurs</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleClick(color)}
              className={`relative bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition transform hover:scale-105 border-2 ${
                completedIds[color.id] ? 'border-green-400 bg-green-50' : 'border-[#E0E2E9]'
              }`}
            >
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4 shadow-inner border-4 border-white"
                style={{ backgroundColor: color.hex_code }}
              />
              <div className="text-xl font-bold text-[#181C21]">{color.name}</div>
              <div className="text-4xl mt-2">
                <img
                  src={`http://localhost:8000${color.image_url}`}
                  alt={color.name}
                  className="w-12 h-12 mx-auto object-contain"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </div>
              {completedIds[color.id] && (
                <div className="absolute top-2 right-2 text-green-500 text-2xl">✓</div>
              )}
              {justCompleted === color.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
                  <span className="text-3xl animate-bounce">🎉</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}