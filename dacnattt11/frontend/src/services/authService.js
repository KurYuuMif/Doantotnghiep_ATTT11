import axios from 'axios';
const API = process.env.REACT_APP_API_URL + '/auth';

export const login = (data) => axios.post(`${API}/login`, data);
export const register = (data) => axios.post(`${API}/register`, data);