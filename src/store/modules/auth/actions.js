import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT
} from '@/store/modules/auth/types';
import {
  queryGet,
  queryPost,
  RESPONSE_ACCESS_PARAM,
  RESPONSE_REFRESH_PARAM
} from '@/api/config';
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
      queryGet('/api/users/signup', data).then(resp => {
        commit(SIGNUP_SUCCESS, resp);
        resolve(resp);
      }).catch(err => {
        commit(SIGNUP_ERROR, err);
        reject(err);
      });
    });
  },
  signin({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit(SIGNIN_REQUEST);
      const data = {
        email: user.email,
        password: user.password
      };
      queryPost('/api/users/signin', data).then(resp => {
        LocalStorageService.setToken({ access_token: resp.data[RESPONSE_ACCESS_PARAM], refresh_token: resp.data[RESPONSE_REFRESH_PARAM] });
        commit(SIGNIN_SUCCESS, resp);
        resolve(resp);
      }).catch(err => {
        commit(SIGNIN_ERROR, err);
        reject(err);
      });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit(LOGOUT);
      localStorageService.clearToken();
      resolve();
    });
  }
};
