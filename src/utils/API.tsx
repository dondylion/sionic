import axios from 'axios';

const API = axios.create({
  baseURL: 'https://test2.sionic.ru/api',
  withCredentials: false,
});

export default API;
