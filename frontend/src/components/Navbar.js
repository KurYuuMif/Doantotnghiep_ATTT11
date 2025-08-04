import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { user, setUser } = useUser();

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center shadow-md">
  <div className="font-bold text-lg tracking-wide">🔐 RRPBA File System</div>
  <div className="flex items-center space-x-4">
    {user ? (
      <>
        <span className="text-sm">Hello, <span className="font-semibold">{user.username}</span></span>
        <button onClick={logout} className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-sm">Logout</button>
      </>
    ) : (
      <Link to="/login" className="hover:underline">Login</Link>
    )}
  </div>
</nav>
  );
}