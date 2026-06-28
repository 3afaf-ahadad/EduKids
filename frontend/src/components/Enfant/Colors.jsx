import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { getColors, saveProgress } from "../../services/api";
import api from "../../services/api";
import Logo from "../Common/Logo";
import { useFadeTransition } from "../../hooks/useFadeTransition";
const colorEmojis = {
  Rouge: "🍎",
  Bleu: "🌊",
  Vert: "🌳",
  Jaune: "☀️",
  Orange: "🥕",
  Violet: "🌸",
  Rose: "🍬",
  Noir: "🐧",
};

export default function Colors() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [colors, setColors] = useState([]);
  const [completedIds, setCompletedIds] = useState({});
  const [attempts, setAttempts] = useState({});
  const [justCompleted, setJustCompleted] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { exiting, navigateWithFade } = useFadeTransition();

    useEffect(() => {
    let cancelled = false;

    getColors().then((res) => {
      if (cancelled) return;
      setColors(res.data);
      api
        .get("/progress/color")
        .then((progRes) => {
          if (cancelled) return;
          const savedAttempts = {};
          const savedCompleted = {};
          progRes.data.forEach((p) => {
            savedAttempts[p.content_id] = p.attempts;
            if (p.completed) savedCompleted[p.content_id] = true;
          });
          setAttempts(savedAttempts);
          setCompletedIds(savedCompleted);
        })
        .catch(() => {});
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const audioCache = {};

  const playSound = (soundUrl) => {
    if (!audioCache[soundUrl]) {
      audioCache[soundUrl] = new Audio(soundUrl);
    }
    const audio = audioCache[soundUrl];
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  // Open the popup only – NO sound, NO progress
  const handleClick = (color) => {
    setSelectedColor(color);
  };

  // Called ONLY from the pop-up sound button
  const handleListenInPopup = (color) => {
    playSound(color.sound_url);

    if (completedIds[color.id]) return;

    const newAttempts = { ...attempts };
    newAttempts[color.id] = (newAttempts[color.id] || 0) + 1;
    setAttempts(newAttempts);

    saveProgress("color", color.id);

    if (newAttempts[color.id] >= 3) {
      setCompletedIds((prev) => ({ ...prev, [color.id]: true }));
      setJustCompleted(color.id);
      setTimeout(() => setJustCompleted(null), 1500);
    }
  };

  const closePopup = () => setSelectedColor(null);

  const getEmoji = (color) => {
    return colorEmojis[color.name] || "🎨";
  };

  return (
    <div className="min-h-screen page-fade-in bg-gradient-to-br from-[#FEFEFE] via-[#F0F8FF] to-[#E8F0F8] font-['Nunito',sans-serif] p-6">
      <div className="relative container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(`/enfant/${childId}`)}
            className="bg-white text-[#00639C] font-semibold px-5 py-2.5 rounded-full shadow-md border hover:bg-gray-50 transition"
          >
            ← Retour
          </button>
          <div className="flex flex-col items-start">
            <Logo size="text-4xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#DB980F]">Couleurs</h1>
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleClick(color)}
              className={`relative bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition transform hover:scale-105 border-2 ${
                completedIds[color.id]
                  ? "border-green-400 bg-green-50"
                  : "border-[#E0E2E9]"
              }`}
            >
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4 shadow-inner border-4 border-white"
                style={{ backgroundColor: color.hex_code }}
              />
              <div className="text-xl font-bold text-[#181C21]">
                {color.name}
              </div>
              <div className="text-4xl mt-2">{getEmoji(color)}</div>
              {completedIds[color.id] && (
                <div className="absolute top-2 right-2 text-green-500 text-2xl">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedColor && (
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

            <div
              className="w-32 h-32 rounded-full mx-auto mb-6 shadow-xl border-8 border-white"
              style={{ backgroundColor: selectedColor.hex_code }}
            />
            <div className="text-3xl font-extrabold text-[#181C21] mb-4">
              {selectedColor.name}
            </div>
            <div className="text-7xl mb-6">{getEmoji(selectedColor)}</div>

            {/* The ONLY button that counts an attempt */}
            <button
              onClick={() => handleListenInPopup(selectedColor)}
              className="bg-gradient-to-r from-[#4DABF7] to-[#9C7AFF] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 text-xl flex items-center gap-2 mx-auto"
            >
              🔊 Écouter le son
            </button>

            {/* Progress info – shows attempts or completed */}
            <div className="mt-4 text-sm text-gray-500">
              {completedIds[selectedColor.id]
                ? "✅ Couleur apprise !"
                : `Clics : ${attempts[selectedColor.id] || 0} / 3`}
            </div>

            {/* Celebration */}
            {justCompleted === selectedColor.id && (
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
