import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT
} from '@/store/modules/auth/types';
import httpClient from '@/axios';
import LocalStorageService from '@/services/localStorageService';

const localStorageService = LocalStorageService.installService();

export default {
  signup({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit(SIGNUP_REQUEST);
      const data = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password
      };
      httpClient.post('/api/users/signup', data).then(resp => {
        commit(SIGNUP_SUCCESS, resp);
        resolve(resp);
      }).catch(err => {
        commit(SIGNUP_ERROR, err);
        reject(err);
      });
    });
  },
  refreshToken() {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('client_id', 'spa');
      data.append('grant_type', 'refresh_token');
      data.append('scope', 'VMS.ClientWebAPI offline_access');
      data.append('refresh_token', localStorageService.getRefreshToken());
      httpClient.post(`${process.env.VUE_APP_API_URL}/connect/token`, data).then(resp => {
        localStorageService.setToken({
          access_token: resp.data.access_token,
          refresh_token: resp.data.refresh_token
        });
        resolve(resp);
      }).catch(err => {
        localStorageService.clearToken();
        reject(err);
      });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit(LOGOUT);
      localStorageService.clearToken();
      delete httpClient.defaults.headers.common.Authorization;
      resolve();
    });
  }
};
