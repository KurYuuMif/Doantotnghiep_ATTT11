import { useEffect, useState } from 'react';
import { uploadFile } from '../services/fileService';
import { getKeys } from '../services/keyService';

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [keyId, setKeyId] = useState('');
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    getKeys(token).then(res => setKeys(res.data));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !keyId) {
      alert('Vui lòng chọn file và key trước khi upload!');
      return;
    }

    try {
      setLoading(true);
      setLoadingText('Đang tải file lên và mã hóa...');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('keyId', keyId);

      const res = await uploadFile(formData, token);
      const { size, encryptionTime } = res.data;

      alert(`✅ File đã được tải lên và mã hóa thành công!
      📂 Dung lượng: ${size} KB
      ⏱ Thời gian mã hóa: ${encryptionTime} giây`);
      
      setFile(null);
      setKeyId('');
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };
  
  return (
    <div className="p-4">
      {/* Overlay loading */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-sm">{loadingText}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4">Upload & Mã hóa File</h1>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          className="w-full mb-2 cursor-pointer" 
          required 
        />
        <select
          value={keyId}
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

        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
