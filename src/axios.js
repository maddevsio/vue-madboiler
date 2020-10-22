import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

export default httpClient;
