// src/components/Enfant/Colors.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockColors, mockCompletedColorIds } from '../../mockData';

export default function Colors() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);
  const [completedIds, setCompletedIds] = useState({});
  const [attempts, setAttempts] = useState({});

  useEffect(() => {
    setColors(mockColors);
    setCompletedIds(mockCompletedColorIds);
    const initialAttempts = {};
    Object.keys(mockCompletedColorIds).forEach(id => {
      initialAttempts[id] = 3;
    });
    setAttempts(initialAttempts);
  }, []);

  const playSound = () => alert('🔊 Son de la couleur (simulation)');

  const saveProgress = (colorId) => {
    if (completedIds[colorId]) return;
    const newAttempts = { ...attempts };
    newAttempts[colorId] = (newAttempts[colorId] || 0) + 1;
    setAttempts(newAttempts);
    if (newAttempts[colorId] >= 3) {
      setCompletedIds(prev => ({ ...prev, [colorId]: true }));
      alert('🎉 Félicitations ! Cette couleur est maintenant apprise.');
    }
  };

  const handleClick = (color) => {
    playSound();
    saveProgress(color.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] via-[#FFF5EC] to-[#E8F0F8] font-['Nunito',sans-serif] p-6">
      <div className="relative container mx-auto max-w-5xl">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <button onClick={() => navigate(`/enfant/${childId}`)} className="bg-white text-[#00639C] font-semibold px-5 py-2.5 rounded-full shadow-md border">← Accueil</button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#00639C]">Les couleurs</h1>
          <Link to={`/enfant/${childId}/alphabet`} className="bg-gradient-to-r from-[#4DABF7] to-[#9C7AFF] text-white font-semibold px-5 py-2.5 rounded-full">L'alphabet →</Link>
        </div>
        <p className="text-center text-[#404751] text-lg mb-10">Clique sur une carte pour entendre le nom. Après 3 fois, tu l'auras apprise !</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {colors.map(color => {
            const isCompleted = completedIds[color.id];
            const currentAttempts = attempts[color.id] || 0;
            return (
              <button
                key={color.id}
                onClick={() => handleClick(color)}
                className="relative bg-white rounded-2xl p-5 text-left shadow-md hover:shadow-xl transition transform hover:scale-105 border overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-2" style={{ backgroundColor: color.hex_code }} />
                <div className="pl-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#181C21]">{color.name}</h3>
                    {isCompleted && <span className="text-[#DB980F] text-lg font-bold">✓</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[#6B7280]">
                    <span className="text-2xl">{color.image}</span>
                    <span className="text-base font-medium">{color.example_word}</span>
                  </div>
                  {!isCompleted && (
                    <div className="text-xs text-[#DB980F] mt-2">{currentAttempts}/3</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}