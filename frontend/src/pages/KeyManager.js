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
}, [fetchKeys]);

  const handleCreate = async () => {
    if (!keyName.trim()) return;
    await createKey(keyName, token);
    setKeyName('');
    fetchKeys();
  };

  const handleDelete = async (keyId) => {
    await deleteKey(keyId, token);
    fetchKeys();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Key Manager</h1>
      <input type="text" placeholder="Key name" value={keyName} onChange={(e) => setKeyName(e.target.value)} className="w-full mb-2" />
      <button onClick={handleCreate} className="bg-blue-500 px-4 py-2 text-white mb-4">Generate Key</button>
      <ul>
        {keys.map(k => (
          <li key={k.key_id} className="mb-1">🔑 {k.key_name} - {k.key_value} <button onClick={() => handleDelete(k.key_id)}>Delete</button> </li>
        ))}
      </ul>
    </div>
  );
}