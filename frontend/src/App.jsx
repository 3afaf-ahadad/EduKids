
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Common/ProtectedRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Parent/Dashboard';
import Modules from './components/Enfant/Modules';
import Alphabet from './components/Enfant/Alphabet';
import Numbers from './components/Enfant/Numbers';
import Colors from './components/Enfant/Colors';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/enfant/:childId" element={<ProtectedRoute><Modules /></ProtectedRoute>} />
          <Route path="/enfant/:childId/alphabet" element={<ProtectedRoute><Alphabet /></ProtectedRoute>} />
          <Route path="/enfant/:childId/numbers" element={<ProtectedRoute><Numbers /></ProtectedRoute>} />
          <Route path="/enfant/:childId/colors" element={<ProtectedRoute><Colors /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;