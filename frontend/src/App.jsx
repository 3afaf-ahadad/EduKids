import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/Common/ProtectedRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Parent/Dashboard';
import Modules from './components/Enfant/Modules';
import Alphabet from './components/Enfant/Alphabet';
import Numbers from './components/Enfant/Numbers';
import Colors from './components/Enfant/Colors';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Parent-only routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="parent">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Child-only routes */}
      <Route
        path="/enfant/:childId"
        element={
          <ProtectedRoute role="enfant">
            <Modules />
          </ProtectedRoute>
        }
      />
      <Route
        path="/enfant/:childId/alphabet"
        element={
          <ProtectedRoute role="enfant">
            <Alphabet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/enfant/:childId/numbers"
        element={
          <ProtectedRoute role="enfant">
            <Numbers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/enfant/:childId/colors"
        element={
          <ProtectedRoute role="enfant">
            <Colors />
          </ProtectedRoute>
        }
      />

      {/* Root redirect — based on role */}
      <Route
        path="/"
        element={
          user ? (
            user.role === 'parent' ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to={`/enfant/${user.child?.id || 1}`} replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch-all — redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;