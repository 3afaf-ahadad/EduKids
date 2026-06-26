import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { getColors, saveProgress } from "../../services/api";

// Emoji map for colors (fallback if image_url is empty)
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
  const [colors, setColors] = useState([]);
  const [completedIds, setCompletedIds] = useState({});
  const [justCompleted, setJustCompleted] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    getColors().then((res) => {
      setColors(res.data);
      api
        .get("/progress/color")
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
    try {
      const audio = new Audio(`http://localhost:8000${soundUrl}`);
      audio.play();
    } catch {
      // Sound file not yet uploaded – silent fallback
    }
  };

  const handleClick = (color) => {
    // Open popup
    setSelectedColor(color);

    if (completedIds[color.id]) return;

    playSound(color.sound_url);
    saveProgress("color", color.id);

    // Color learned on first correct identification (RG5)
    if (!completedIds[color.id]) {
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
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] via-[#F0F8FF] to-[#E8F0F8] font-['Nunito',sans-serif] p-6">
      <div className="relative container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(`/enfant/${childId}`)}
            className="bg-white text-[#00639C] font-semibold px-5 py-2.5 rounded-full shadow-md border hover:bg-gray-50 transition"
          >
            ← Retour
          </button>
          <span className="text-sm text-gray-500">
            Bonjour {user?.child?.name}
          </span>
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
              {justCompleted === color.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
                  <span className="text-3xl animate-bounce">🎉</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Popup Modal for selected color */}
      {selectedColor && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center border border-[#E0E2E9] animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>

            {/* Big color circle */}
            <div
              className="w-32 h-32 rounded-full mx-auto mb-6 shadow-xl border-8 border-white"
              style={{ backgroundColor: selectedColor.hex_code }}
            />

            {/* Color name */}
            <div className="text-3xl font-extrabold text-[#181C21] mb-4">
              {selectedColor.name}
            </div>

            {/* Emoji */}
            <div className="text-7xl mb-6">{getEmoji(selectedColor)}</div>

            {/* Sound button */}
            <button
              onClick={() => playSound(selectedColor.sound_url)}
              className="bg-gradient-to-r from-[#4DABF7] to-[#9C7AFF] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 text-xl flex items-center gap-2 mx-auto"
            >
              🔊 Écouter le son
            </button>

            {/* Progress info */}
            <div className="mt-4 text-sm text-gray-500">
              {completedIds[selectedColor.id]
                ? "✅ Couleur apprise !"
                : "Clique pour apprendre cette couleur"}
            </div>

            {justCompleted === selectedColor.id && (
              <div className="mt-2 text-2xl animate-bounce">🎉 Bravo !</div>
            )}
          </div>
        </div>
      )}

      {/* Simple bounce animation for the popup */}
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
