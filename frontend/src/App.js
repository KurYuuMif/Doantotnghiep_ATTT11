import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FileManager from './pages/FileManager';
import UploadFile from './pages/UploadFile';
import KeyManager from './pages/KeyManager';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><UploadFile /></ProtectedRoute>} />
          <Route path="/files" element={<ProtectedRoute><FileManager /></ProtectedRoute>} />
          <Route path="/keys" element={<ProtectedRoute><KeyManager /></ProtectedRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
