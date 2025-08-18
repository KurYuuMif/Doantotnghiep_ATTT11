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

    const res = await uploadFile(formData, token);
    const { sizeInMB, encryptionTime } = res.data;

    alert(`✅ File đã được tải lên và mã hóa thành công!
  📂 Dung lượng: ${sizeInMB} MB
  ⏱ Thời gian mã hóa: ${encryptionTime} giây`);
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold mb-4">Upload & Mã hóa File</h1>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])} 
        className="w-full mb-2" 
        required 
        cursor="pointer"
      />
      <select
        onChange={(e) => setKeyId(e.target.value)}
        className="w-80 mb-2 px-2 py-1 border rounded cursor-pointer"
        required
      >
        <option value="">Select Key</option>
        {keys.map((k, index) => (
          <option key={k.key_id || index} value={k.key_id}>
            {k.key_name || `Key ${index}`}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">Upload</button>
    </form>
  );
}