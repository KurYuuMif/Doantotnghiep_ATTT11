import { useEffect, useState } from 'react';
import { createKey, deleteKey, getKeys } from '../services/keyService';

export default function KeyManager() {
  const [keys, setKeys] = useState([]);
  const [keyName, setKeyName] = useState('');
  const token = localStorage.getItem('token');

  const fetchKeys = () => {
    getKeys(token).then(res => setKeys(res.data));
  };

  useEffect(() => {
    fetchKeys();
    // eslint-disable-next-line
  }, []);

  const handleCreate = async () => {
    if (!keyName.trim()) return;
    await createKey(keyName, token);
    setKeyName('');
    fetchKeys();
    alert('✅ Key đã được tạo thành công!');
  };

  const handleDelete = async (keyId) => {
    await deleteKey(keyId, token);
    fetchKeys();
    alert('✅ Key đã được xóa thành công!');
  };

  return (
    <div className="p-2 sm:p-4 overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">Quản lí khóa</h1>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Key name"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          className="w-80 px-2 py-1 border rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600 transition"
        >
          Tạo khóa
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded shadow text-xs sm:text-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left">Tên khóa</th>
            <th className="px-4 py-2 text-left">Giá trị khóa</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {keys.length > 0 ? (
            keys.map((k) => (
              <tr key={k.key_id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{k.key_name}</td>
                <td className="px-4 py-2 font-mono">{k.key_value}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-sm text-white"
                    onClick={() => handleDelete(k.key_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-4 text-center text-gray-500">
                Chưa có key nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
