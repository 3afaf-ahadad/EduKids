import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center p-10 font-kids text-xl text-gray-500">
        Chargement...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    if (user.role === 'parent') {
      return <Navigate to="/dashboard" replace />;
    }
    if (user.role === 'enfant') {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}