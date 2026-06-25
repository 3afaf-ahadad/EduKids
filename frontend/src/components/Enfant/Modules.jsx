import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

export default function Modules() {
  const { childId } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const child = user?.child;

  // If the loaded child doesn't match the URL parameter, still use the authenticated child
  if (!child) {
    return <div className="text-center p-10 text-xl text-gray-500">Chargement...</div>;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
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
          {/* We'll add progress bars here later if needed */}
        </div>
      </div>
    </div>
  );
}