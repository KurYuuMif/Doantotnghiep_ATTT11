import { useEffect, useState } from 'react';
import { getUserFiles, deleteFile, downloadFile } from '../services/fileService';

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem('token');

  const fetchFiles = () => {
    getUserFiles(token).then(res => setFiles(res.data));
  };

  useEffect(() => {
  fetchFiles();
}, [fetchFiles]);

  const handleDelete = async (id) => {
    await deleteFile(id, token);
    fetchFiles();
  };

  const handleDownload = async (id, name) => {
    const res = await downloadFile(id, token);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">My Files</h1>
      <ul>
        {files.map(f => (
          <li key={f.id} className="mb-1"> 
            <span className="font-semibold">{f.filename}</span> 
            <span className="ml-2 text-sm text-gray-500">(🔑Encrypted with key: {f.key_name || "❌ [Deleted Key]"})</span>
            <button onClick={() => handleDownload(f.id, f.filename)}>Download</button>
            <button onClick={() => handleDelete(f.id)}>Delete</button> 
          </li>
        ))}
      </ul>
    </div>
  );
}