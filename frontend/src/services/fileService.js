import axios from 'axios';
const API = process.env.REACT_APP_API_URL + '/files';

export const uploadFile = (formData, token) => {
  return axios.post(`${API}/files/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getUserFiles = (token) => axios.get(`${API}/my-files`, {
  headers: { Authorization: `Bearer ${token}` },
});

export const deleteFile = (id, token) =>
  axios.delete(`${API}/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const downloadFile = (id, token) =>
  axios.get(`${API}/download/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  });