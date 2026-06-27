import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

export default function Modules() {
  const { childId } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const child = user?.child;
  const [progress, setProgress] = useState({
    alphabet: 0,
    number: 0,
    color: 0,
  });

  useEffect(() => {
  if (!child) return;

  let cancelled = false;

  api.get('/child/progress')
    .then((res) => {
      if (!cancelled) setProgress(res.data);
    })
    .catch(() => {});

  return () => { cancelled = true; };
}, [child]);

  if (!child) {
    return (
      <div className="text-center p-10 text-xl text-gray-500">
        Chargement...
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FDF4] via-[#E0F2FE] to-[#FDF4FF] font-['Nunito',sans-serif] p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-extrabold text-[#00639C]">EduKids</h1>
            <p className="text-[#404751] text-lg">Bonjour {child.name} !</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white border border-[#E0E2E9] text-[#404751] px-5 py-2 rounded-full hover:bg-gray-50 transition shadow-sm"
          >
            Se déconnecter
          </button>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#181C21] mb-10">
          Amusons-nous !
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            to={`/enfant/${child.id}/alphabet`}
            className="bg-white rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition transform hover:scale-105 border border-[#E0E2E9]"
          >
            <div className="text-7xl mb-4">🔤</div>
            <h3 className="text-2xl font-bold text-[#00639C]">Alphabet</h3>
          </Link>
          <Link
            to={`/enfant/${child.id}/numbers`}
            className="bg-white rounded-3xl p-8 text-center shadow-md transition transform hover:scale-105 border"
          >
            <div className="text-7xl mb-4">🔢</div>
            <h3 className="text-2xl font-bold text-[#6844C8]">Nombres</h3>
          </Link>
          <Link
            to={`/enfant/${child.id}/colors`}
            className="bg-white rounded-3xl p-8 text-center shadow-md transition transform hover:scale-105 border"
          >
            <div className="text-7xl mb-4">🌈</div>
            <h3 className="text-2xl font-bold text-[#DB980F]">Couleurs</h3>
          </Link>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-2xl font-bold text-[#181C21] mb-4 flex items-center gap-2">
            ⭐ Ma progression
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl">🔤</div>
              <div className="text-sm font-semibold text-[#00639C]">
                Alphabet
              </div>
              <div className="text-lg font-bold">{progress.alphabet}/26</div>
            </div>
            <div className="text-center">
              <div className="text-3xl">🔢</div>
              <div className="text-sm font-semibold text-[#6844C8]">
                Nombres
              </div>
              <div className="text-lg font-bold">{progress.number}/10</div>
            </div>
            <div className="text-center">
              <div className="text-3xl">🌈</div>
              <div className="text-sm font-semibold text-[#DB980F]">
                Couleurs
              </div>
              <div className="text-lg font-bold">{progress.color}/8</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
