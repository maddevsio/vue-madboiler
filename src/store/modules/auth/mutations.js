import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
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
  [SIGNIN_REQUEST]: state => {
    state.statusSignin = false;
  },
  [SIGNIN_SUCCESS]: state => {
    state.statusSignin = true;
  },
  [SIGNIN_ERROR]: state => {
    state.statusSignin = false;
  },
  [LOGOUT]: state => {
    state.status = false;
    state.token = '';
    state.LoggedIn = false;
  }
};
