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
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    await deleteFile(id, token);
    fetchFiles();
    alert('✅ File đã được xóa thành công!');
  };

  const handleDownload = async (id, name, keyDeleted) => {
  if (keyDeleted) {
    alert('Key bị xóa không thể giải mã để download');
    return;
  }
  const res = await downloadFile(id, token);
  const decryptionTime = res.headers['x-decryption-time']; // lấy từ header

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();

  alert(`✅ File đã được giải mã và tải về thành công!
  ⏱ Thời gian giải mã: ${decryptionTime} giây`);
  };

  return (
    <div className="p-2 sm:p-4 overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">Quản lí file</h1>  

      <table className="min-w-full bg-white border border-gray-300 rounded shadow text-xs sm:text-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left">Tên file</th>
            <th className="px-4 py-2 text-left">Tên khóa dùng để mã hóa</th>
            <th className="px-4 py-2 text-left">Kích thước (MB)</th>
            <th className="px-4 py-2 text-left">Thời gian mã hóa(giây)</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((f) => {
              const isKeyDeleted = !f.key_name || f.key_name === "❌ [Key đã bị xóa]";
              return (
                <tr key={f.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{f.filename}</td>
                  <td className="px-4 py-2 font-mono">{f.key_name || "❌ [Key đã bị xóa]"}</td>
                  <td className="px-4 py-2 font-mono">{f.size} MB</td>
                  <td className="px-4 py-2 font-mono">{f.time} s</td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleDownload(f.id, f.filename, isKeyDeleted)}
                      disabled={isKeyDeleted}
                      className={`px-3 py-1 rounded text-sm text-white transition
                        ${isKeyDeleted 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-green-500 hover:bg-green-600 cursor-pointer'
                        }`}
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-sm text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-4 text-center text-gray-500">
                Chưa tải file nào lên
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
