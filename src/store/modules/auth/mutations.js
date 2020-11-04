import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT
} from '@/store/modules/auth/types';

export default {
  [SIGNUP_REQUEST]: state => {
    state.statusSignup = false;
  },
  [SIGNUP_SUCCESS]: state => {
    state.statusSignup = true;
  },
  [SIGNUP_ERROR]: state => {
    state.statusSignup = false;
  },
  [AUTH_REQUEST]: state => {
    state.status = false;
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = true;
    state.token = token;
    state.LoggedIn = true;
  },
  [AUTH_ERROR]: (state, payload) => {
    state.status = payload;
    state.LoggedIn = false;
  },
  [LOGOUT]: state => {
    state.status = false;
    state.token = '';
    state.LoggedIn = false;
  }
};
