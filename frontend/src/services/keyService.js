import axios from 'axios';
const API = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getKeys = (token) => {
  return axios.get(`${API}/keys`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const createKey = (keyName, token) => {
  return axios.post(`${API}/keys/create`, { key_name: keyName }, {
    headers: { Authorization: `Bearer ${token}` , 'Content-Type': 'application/json' }
  });
}

export const deleteKey = (keyId, token) => {
  return axios.delete(`${API}/keys/${keyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
// export const deleteKey = (keyId, token) => 
//   axios.delete(`${API}/keys/${keyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
