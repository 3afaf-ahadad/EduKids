import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockChild, mockProgress } from '../../mockData';

export default function Modules() {
  const { childId } = useParams();
  const [child, setChild] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setChild({ ...mockChild, id: parseInt(childId) });
    setProgress(mockProgress);
  }, [childId]);

  if (!child) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FDF4] via-[#E0F2FE] to-[#FDF4FF] font-['Nunito',sans-serif] p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#00639C]">EduKids</h1>
          <p className="text-[#404751] text-lg">Bonjour {child.name} !</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#181C21] mb-10">Amusons-nous !</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link to={`/enfant/${childId}/alphabet`} className="bg-white rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition transform hover:scale-105 border border-[#E0E2E9]">
            <div className="text-7xl mb-4">🔤</div>
            <h3 className="text-2xl font-bold text-[#00639C]">Alphabet</h3>
          </Link>
          <Link to={`/enfant/${childId}/numbers`} className="bg-white rounded-3xl p-8 text-center shadow-md transition transform hover:scale-105 border">
            <div className="text-7xl mb-4">🔢</div>
            <h3 className="text-2xl font-bold text-[#6844C8]">Nombres</h3>
          </Link>
          <Link to={`/enfant/${childId}/colors`} className="bg-white rounded-3xl p-8 text-center shadow-md transition transform hover:scale-105 border">
            <div className="text-7xl mb-4">🌈</div>
            <h3 className="text-2xl font-bold text-[#DB980F]">Couleurs</h3>
          </Link>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-2xl font-bold text-[#181C21] mb-4 flex items-center gap-2">⭐ Tes Progrès</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2"><span className="font-semibold text-[#00639C]">Alphabet</span><span className="font-bold">{progress.alphabet_completed}/{progress.alphabet_total}</span></div>
            <div className="flex justify-between items-center border-b pb-2"><span className="font-semibold text-[#6844C8]">Nombres</span><span className="font-bold">{progress.numbers_completed}/{progress.numbers_total}</span></div>
            <div className="flex justify-between items-center"><span className="font-semibold text-[#DB980F]">Couleurs</span><span className="font-bold">{progress.colors_completed}/{progress.colors_total}</span></div>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link to="/dashboard" className="inline-block bg-white text-[#00639C] font-semibold px-6 py-2 rounded-full shadow-md border">← Accueil</Link>
        </div>
      </div>
    </div>
  );
}