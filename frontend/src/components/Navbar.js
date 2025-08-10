import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { user, setUser } = useUser();

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div class="bg-gray-300">
      <nav className="w-full p-2 sm:p-4 bg-white flex flex-col sm:flex-row items-center justify-between shadow-md border bg-opacity-60 background-blur">
        <div className="flex-1 flex justify-center sm:justify-start font-bold text-lg sm:text-xl tracking-wide mb-2 sm:mb-0">
          🔐 RRPBA File System
        </div>
        <div className="flex-1 flex justify-center sm:justify-end items-center flex-wrap gap-2">
          {user ? (
            <>
              <span className="text-xs sm:text-sm text-center">Đăng nhập với tên <span className="font-semibold">{user.username}</span></span>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 transition px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-white">Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline text-xs sm:text-sm">Đăng nhập</Link>
              <Link to="/register" className="hover:underline text-xs sm:text-sm">Đăng ký</Link>
            </>
          )}
        </div>
      </nav>

    {/* <nav className="w-full p-4 bg-white flex items-center justify-between shadow-md border bg-opacity-60 background-blur">
      <div className="w-1/3"></div>
      <div className="w-1/3 flex justify-center font-bold text-lg tracking-wide">
        🔐 RRPBA File System
      </div>
      <div className="w-1/3 flex justify-end items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm">Đăng nhập với tên <span className="font-semibold">{user.username}</span></span>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-sm text-white">Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Đăng nhập</Link>
            <Link to="/register" className="hover:underline">Đăng ký</Link>
          </>
        )}
      </div>
    </nav> */}
    </div>
  );
}