import axios from 'axios';

const getUrl = () => {
  return 'http://localhost:8090';
};

const baseURL = getUrl();

const api = axios.create({
  baseURL,
});

export default api;
