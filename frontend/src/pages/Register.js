import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { FaUser, FaKey, FaUserCircle } from 'react-icons/fa';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate('/login');
  };
  
  const styles = {
  container: {
    width: '300px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  input: {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    borderRadius: '0.5rem',
  },
  button: {
    backgroundColor: '#0a74ffff',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    cursor: 'pointer',
    width: '100%',
    borderradius: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  },
};
  return (
    <div style={styles.container} class="bg-gray-300">
      <div className='w-full flex justify-center'>
        <FaUserCircle size={50} className="text-gray-400" />
      </div>
      <h1 className='text-xl font-head font-bold text-gray-800 mb-12 w-full flex justify-center'>Đăng ký</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <FaUser className="text-gray-500 mr-2" />
          <label htmlFor="username">Tên đăng nhập:</label>
        </div>

        <input 
          type="text" 
          placeholder="Nhập tên đăng nhập" 
          required 
          value={form.username} 
          onChange={(e) => setForm({ ...form, username: e.target.value })} 
          style={styles.input}
        />
        <div className="flex items-center">
          <FaKey className="text-gray-500 mr-2" />
          <label htmlFor="password">Mật khẩu:</label>
        </div>

        <input 
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="Nhập mật khẩu" 
          value={form.password} 
          onChange={(e) => setForm({ ...form, password: e.target.value })} 
          style={styles.input}
        />

        <label className="text-sm flex items-center gap-2">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        Hiển thị mật khẩu
        </label>

        <button type="submit" style={styles.button}>Đăng ký</button>
      </form>
    </div>
  );
}
