import axios from 'axios';

const getUrl = () => {
  return 'http://localhost:8000';
};

const baseURL = getUrl();

const api = axios.create({
  baseURL,
});

export default api;
