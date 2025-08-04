import { useEffect, useState } from 'react';
import { uploadFile } from '../services/fileService';
import { getKeys } from '../services/keyService';

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [keyId, setKeyId] = useState('');
  const [keys, setKeys] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    getKeys(token).then(res => setKeys(res.data));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('keyId', keyId);
    await uploadFile(formData, token);
    alert('File uploaded & encrypted');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Upload & Encrypt File</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full mb-2" required />
      <select onChange={(e) => setKeyId(e.target.value)} className="w-full mb-2" required>
        <option value="">Select Key</option>
        {keys.map((k, index) => (
        <option key={k.key_id || index} value={k.key_id}>
          {k.key_name || `Key ${index}`}
        </option>
))}
      </select>
      <button type="submit" className="bg-blue-500 px-4 py-2 text-white">Upload</button>
    </form>
  );
}