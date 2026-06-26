import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { getNumbers, saveProgress } from "../../services/api";
import api from "../../services/api";

const numberEmojis = {
  1: "⭐",
  2: "⭐⭐",
  3: "⭐⭐⭐",
  4: "⭐⭐⭐⭐",
  5: "⭐⭐⭐⭐⭐",
  6: "⭐⭐⭐⭐⭐⭐",
  7: "⭐⭐⭐⭐⭐⭐⭐",
  8: "⭐⭐⭐⭐⭐⭐⭐⭐",
  9: "⭐⭐⭐⭐⭐⭐⭐⭐⭐",
  10: "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐",
};

export default function Numbers() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState({});
  const [justCompleted, setJustCompleted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    getNumbers().then((res) => {
      setNumbers(res.data);
      setCompletedIds({});
    });
  }, []);

  useEffect(() => {
    getNumbers().then((res) => {
      setNumbers(res.data);
      api
        .get("/progress/number")
        .then((progRes) => {
          const saved = {};
          progRes.data.forEach((p) => {
            if (p.completed) saved[p.content_id] = true;
          });
          setCompletedIds(saved);
        })
        .catch(() => {});
    });
  }, []);

  const playSound = (soundUrl) => {
    const audio = new Audio(`http://localhost:8000${soundUrl}`);
    audio.play();
  };

  const handleListen = () => {
    const current = numbers[currentIndex];
    if (!current) return;
    playSound(current.sound_url);
    saveProgress("number", current.id);
    if (!completedIds[current.id]) {
      setCompletedIds((prev) => ({ ...prev, [current.id]: true }));
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 1500);
    }
  };

  const goToNext = () => {
    if (currentIndex + 1 < numbers.length) setCurrentIndex(currentIndex + 1);
  };

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (numbers.length === 0)
    return <div className="text-center p-10">Chargement...</div>;

  const current = numbers[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] via-[#F0F8FF] to-[#E8F0F8] font-['Nunito',sans-serif] p-6">
      <div className="relative container mx-auto max-w-md">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(`/enfant/${childId}`)}
            className="bg-white text-[#00639C] font-semibold px-4 py-2 rounded-full shadow-md border"
          >
            ← Retour
          </button>
          <span className="text-sm text-gray-500">
            Bonjour {user?.child?.name}
          </span>
          <h1 className="text-3xl font-extrabold text-[#6844C8]">Nombres</h1>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#E0E2E9] text-center">
          <div
            className={`text-8xl font-extrabold text-[#181C21] mb-4 ${animating ? "animate-bounce" : ""}`}
          >
            {current.value}
          </div>
          <div className="text-3xl text-gray-500 mb-4">{current.word}</div>
          <div
            className={`text-5xl mb-6 transition-all duration-300 ${animating ? "scale-110" : ""}`}
          >
            {numberEmojis[current.value]}
          </div>
          {completedIds[current.id] && (
            <div className="text-green-500 text-2xl mb-4">✓ Appris !</div>
          )}
          {justCompleted && (
            <div className="text-yellow-500 text-2xl mb-4 animate-bounce">
              🎉 Bravo !
            </div>
          )}
          <button
            onClick={handleListen}
            className="bg-gradient-to-r from-[#6844C8] to-[#9C7AFF] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 text-xl"
          >
            🔊 Écouter
          </button>
          <div className="flex justify-between mt-6">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="bg-gray-200 text-gray-600 px-5 py-2 rounded-full disabled:opacity-50"
            >
              ← Précédent
            </button>
            <span className="text-gray-500">
              {currentIndex + 1} / {numbers.length}
            </span>
            <button
              onClick={goToNext}
              disabled={currentIndex + 1 >= numbers.length}
              className="bg-gray-200 text-gray-600 px-5 py-2 rounded-full disabled:opacity-50"
            >
              Suivant →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
