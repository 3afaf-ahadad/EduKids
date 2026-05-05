import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center p-10 font-kids">Chargement...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
}