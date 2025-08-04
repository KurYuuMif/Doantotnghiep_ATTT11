import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { login } from '../services/authService';
import { FaUser, FaKey, FaArrowRight, FaUserCircle } from 'react-icons/fa';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    navigate('/dashboard');
  };

    return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full max-w-sm mx-auto mt-16">
      <h1 className="text-xl font-semibold text-center mb-4">User Authentication</h1>

      <div className="flex justify-center mb-4">
        <FaUserCircle size={50} className="text-gray-400" />
      </div>

      <div className="mb-4 flex items-center border border-gray-300 rounded px-3 py-2">
        <FaUser className="text-gray-500 mr-2" />
        <input type="text" placeholder="Username"
          className="w-full focus:outline-none"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required />
      </div>

      <div className="mb-4 flex items-center border border-gray-300 rounded px-3 py-2">
        <FaKey className="text-gray-500 mr-2" />
        <input type={showPassword ? 'text' : 'password'} placeholder="Password"
          className="w-full focus:outline-none"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required />
      </div>

      <div className="mb-4">
        <label className="text-sm flex items-center gap-2">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        Show password
      </label>
    </div>

      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold w-full py-2 rounded flex items-center justify-center gap-2">
        <FaArrowRight />
        LOGIN
      </button>
    </form>
  );
}