import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

export default function Modules() {
  const { childId } = useParams();
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const res = await api.get(`/parent/children/${childId}`);
        setChild(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChild();
  }, [childId]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!child) return <div className="text-center p-10">Child not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6">
      <div className="container mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800">Bonjour {child.name} !</h1>
          <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded">Quitter</Link>
        </header>
        <div className="grid md:grid-cols-3 gap-8">
          <Link to={`/enfant/${childId}/alphabet`} className="bg-white rounded-xl shadow-xl p-6 text-center hover:scale-105 transition transform">
            <div className="text-6xl mb-4">🔤</div>
            <h2 className="text-2xl font-bold text-blue-600">Alphabet</h2>
            <p className="text-gray-600">Learn letters A to Z</p>
          </Link>
          <Link to={`/enfant/${childId}/numbers`} className="bg-white rounded-xl shadow-xl p-6 text-center hover:scale-105 transition transform">
            <div className="text-6xl mb-4">🔢</div>
            <h2 className="text-2xl font-bold text-green-600">Numbers</h2>
            <p className="text-gray-600">Count from 1 to 10</p>
          </Link>
          <Link to={`/enfant/${childId}/colors`} className="bg-white rounded-xl shadow-xl p-6 text-center hover:scale-105 transition transform">
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-2xl font-bold text-purple-600">Colors</h2>
            <p className="text-gray-600">Identify basic colors</p>
          </Link>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <Link to={`/enfant/${childId}/game/missing-letter`} className="bg-white rounded-xl shadow-xl p-6 text-center hover:scale-105 transition transform">
            <div className="text-6xl mb-4">❓</div>
            <h2 className="text-2xl font-bold text-red-600">Missing Letter</h2>
            <p className="text-gray-600">Find the missing letter</p>
          </Link>
          <Link to={`/enfant/${childId}/game/count-objects`} className="bg-white rounded-xl shadow-xl p-6 text-center hover:scale-105 transition transform">
            <div className="text-6xl mb-4">🍎</div>
            <h2 className="text-2xl font-bold text-yellow-600">Count Objects</h2>
            <p className="text-gray-600">How many objects?</p>
          </Link>
          <Link to={`/enfant/${childId}/game/color-quiz`} className="bg-white rounded-xl shadow-xl p-6 text-center hover:scale-105 transition transform">
            <div className="text-6xl mb-4">🌈</div>
            <h2 className="text-2xl font-bold text-pink-600">Color Quiz</h2>
            <p className="text-gray-600">What color is this?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}