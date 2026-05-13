// src/components/Enfant/Numbers.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockNumbers, mockCompletedNumberIds } from '../../mockData';

export default function Numbers() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState({});
  const [attempts, setAttempts] = useState({});
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    setNumbers(mockNumbers);
    setCompletedIds(mockCompletedNumberIds);
    const initialAttempts = {};
    Object.keys(mockCompletedNumberIds).forEach(id => {
      initialAttempts[id] = 3;
    });
    setAttempts(initialAttempts);
  }, []);

  const playSound = () => alert('🔊 Son du nombre (simulation)');

  const saveProgress = (numberId) => {
    if (completedIds[numberId]) return;
    const newAttempts = { ...attempts };
    newAttempts[numberId] = (newAttempts[numberId] || 0) + 1;
    setAttempts(newAttempts);
    if (newAttempts[numberId] >= 3) {
      setCompletedIds(prev => ({ ...prev, [numberId]: true }));
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 1500);
      alert('🎉 Félicitations ! Ce nombre est maintenant appris.');
    }
  };

  const handleListen = () => {
    const current = numbers[currentIndex];
    if (current) {
      playSound();
      saveProgress(current.id);
    }
  };

  const goToNext = () => {
    if (currentIndex + 1 < numbers.length) setCurrentIndex(currentIndex + 1);
  };

  if (numbers.length === 0) return <div>Aucun nombre</div>;
  const current = numbers[currentIndex];
  const isCompleted = completedIds[current.id];
  const currentAttempts = attempts[current.id] || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] via-[#F0F8FF] to-[#E8F0F8] font-['Nunito',sans-serif] p-6">
      <div className="relative container mx-auto max-w-md">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate(`/enfant/${childId}`)} className="bg-white text-[#00639C] font-semibold px-4 py-2 rounded-full shadow-md border">← Accueil</button>
          <h1 className="text-2xl font-bold text-[#00639C]">Les nombres</h1>
          <div className="w-20" />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center border">
          <div className="text-8xl md:text-9xl font-black text-[#00639C] mb-4">{current.value}</div>
          <div className="text-3xl mb-2">{current.image}</div>
          <div className="text-3xl md:text-4xl font-semibold text-[#6844C8] mb-4">{current.word}</div>
          {!isCompleted && (
            <div className="text-md text-[#DB980F] mb-3">Écoutes : {currentAttempts}/3</div>
          )}
          {isCompleted && <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm mb-6">✓ Appris !</div>}
          {justCompleted && !isCompleted && <div className="inline-block bg-[#DB980F] text-white px-4 py-1 rounded-full text-sm mb-6 animate-pulse">🎉 Félicitations !</div>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <button onClick={handleListen} className="bg-gradient-to-r from-[#4DABF7] to-[#9C7AFF] text-white font-bold px-8 py-3 rounded-full shadow-md">🔊 Écouter</button>
            <button onClick={goToNext} disabled={currentIndex+1 >= numbers.length} className="bg-white border-2 border-[#00639C] text-[#00639C] font-bold px-8 py-3 rounded-full shadow-md">Suivant →</button>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {numbers.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-3 h-3 rounded-full transition ${idx === currentIndex ? 'bg-[#00639C] w-6' : 'bg-[#CEE5FF]'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}