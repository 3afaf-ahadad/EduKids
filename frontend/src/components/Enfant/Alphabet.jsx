// src/components/Enfant/Alphabet.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockLetters, mockCompletedAlphabetIds } from '../../mockData';

export default function Alphabet() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [letters, setLetters] = useState([]);
  const [completedIds, setCompletedIds] = useState({});
  // attempts stocke le nombre de clics pour chaque lettre (id -> count)
  const [attempts, setAttempts] = useState({});

  useEffect(() => {
    setLetters(mockLetters);
    setCompletedIds(mockCompletedAlphabetIds);
    // Initialiser attempts pour les lettres déjà complétées (optionnel)
    const initialAttempts = {};
    Object.keys(mockCompletedAlphabetIds).forEach(id => {
      initialAttempts[id] = 3; // déjà appris
    });
    setAttempts(initialAttempts);
  }, []);

  const playSound = () => alert('🔊 Son de la lettre (simulation)');

  const saveProgress = (letterId) => {
    if (completedIds[letterId]) return;

    // Incrémenter le compteur de tentatives
    const newAttempts = { ...attempts };
    newAttempts[letterId] = (newAttempts[letterId] || 0) + 1;
    setAttempts(newAttempts);

    // Si on atteint 3, marquer comme complété
    if (newAttempts[letterId] >= 3) {
      setCompletedIds(prev => ({ ...prev, [letterId]: true }));
      alert('🎉 Félicitations ! Cette lettre est maintenant apprise.');
    }
  };

  const handleClick = (letter) => {
    playSound();
    saveProgress(letter.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] via-[#F0F8FF] to-[#E8F0F8] font-['Nunito',sans-serif] p-6">
      <div className="relative container mx-auto max-w-5xl">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <button onClick={() => navigate(`/enfant/${childId}`)} className="bg-white text-[#00639C] font-semibold px-5 py-2.5 rounded-full shadow-md border">← Accueil</button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#00639C]">L'alphabet</h1>
          <Link to={`/enfant/${childId}/numbers`} className="bg-gradient-to-r from-[#4DABF7] to-[#9C7AFF] text-white font-semibold px-5 py-2.5 rounded-full">Les Nombres →</Link>
        </div>
        <p className="text-center text-[#404751] text-lg mb-10">Touche une lettre pour entendre son son. Après 3 fois, tu l'auras apprise !</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {letters.map(letter => {
            const isCompleted = completedIds[letter.id];
            const currentAttempts = attempts[letter.id] || 0;
            return (
              <button
                key={letter.id}
                onClick={() => handleClick(letter)}
                className={`relative bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition transform hover:scale-105 ${isCompleted ? 'border-l-4 border-l-[#DB980F]' : ''}`}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#00639C] mb-1">
                  {letter.letter_uppercase} {letter.letter_uppercase.toLowerCase()}
                </div>
                <div className="text-3xl mb-1">{letter.image}</div>
                <div className="text-xs md:text-sm text-[#6B7280] capitalize">{letter.example_word}</div>
                {!isCompleted && (
                  <div className="text-xs text-[#DB980F] mt-1">{currentAttempts}/3</div>
                )}
                {isCompleted && (
                  <span className="absolute top-2 right-2 text-[#DB980F] text-lg font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}