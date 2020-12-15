import axios from 'axios';
import LocalStorageService from '@/services/localStorageService';

const {
  clearToken,
  getRefreshToken,
  getAccessToken,
  setToken
} = LocalStorageService.installService();

export const REFRESH_URL = '/users/refresh_token';
export const RESPONSE_ACCESS_PARAM = 'token';
export const RESPONSE_REFRESH_PARAM = 'refresh_token';
// const DEFAULT_URL = 'http://localhost:8000/';
const DEFAULT_URL = 'https://api-staging.bandpay.me/';
export const baseURL = process.env.REACT_APP_API_URL || DEFAULT_URL;

export const apiInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${getAccessToken()}` }
});

let isRefreshing = false;
let failedQueue = [];

export const createNewInstance = token => axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` }
});


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

export const errorHandler = error => {
  const originalRequest = error.config;
  const err = error.response;
  if (err.status === 403) {
    const message = err.data ? err.data.detail : err.statusText;
    console.error(message);
  }

  if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes(REFRESH_URL)) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve,
          reject
        });
      }).then(token => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiInstance(originalRequest);
      })
        .catch(errResponse => Promise.reject(errResponse));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refresh = getRefreshToken();

    return new Promise((resolve, reject) => {
      createNewInstance(refresh)
        .post(REFRESH_URL)
        .then(({ data }) => {
          setToken({
            access_token: data[RESPONSE_ACCESS_PARAM],
            refresh_token: data[RESPONSE_REFRESH_PARAM]
          });
          apiInstance.defaults.headers.common.Authorization = `Bearer ${data[RESPONSE_ACCESS_PARAM]}`;
          originalRequest.headers.Authorization = `Bearer ${data[RESPONSE_ACCESS_PARAM]}`;
          processQueue(null, data[RESPONSE_ACCESS_PARAM]);
          resolve(apiInstance(originalRequest));
        })
        .catch(errResponse => {
          processQueue(errResponse, null);
          clearToken();
          reject(errResponse);
        })
        .then(() => {
          isRefreshing = false;
        });
    });
  }
  return Promise.reject(error);
};

apiInstance.interceptors.response.use(response => response,
  error => errorHandler(error));

export default apiInstance;

export const queryGet = (url, config = {}) => apiInstance.get(url, config);

export const queryPost = (url, data = null, config = {}) => apiInstance.post(url, data, config);
