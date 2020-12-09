import axios from 'axios';

const DEFAULT_URL = 'http://localhost:8000/';

export const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || DEFAULT_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
});

export const clearTokenInStorage = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiInstance.interceptors.response.use(response => response,
  error => {
    const originalRequest = error.config;
    const err = error.response;
    if (err.status === 403) {
      const message = err.data ? err.data.detail : err.statusText;
      console.error(message);
    }

    if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/api/token/')) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiInstance(originalRequest);
        }).catch(errResponse => Promise.reject(errResponse));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refresh = window.localStorage.getItem('refresh');

      return new Promise((resolve, reject) => {
        apiInstance.post('/api/token/refresh/', { refresh })
          .then(({ data }) => {
            window.localStorage.setItem('access', data.access);
            apiInstance.defaults.headers.common.Authorization = `Bearer ${data.access}`;
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            processQueue(null, data.access);
            resolve(apiInstance(originalRequest));
          })
          .catch(errResponse => {
            processQueue(errResponse, null);
            clearTokenInStorage();
            reject(errResponse);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  });

export default apiInstance;
