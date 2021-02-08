import { LIKES_REQUEST, LIKES_SUCCESS, LIKES_ERROR } from '@/store/modules/likes/types';

export default {
  [LIKES_REQUEST]: state => {
    state.status = false;
  },
  [LIKES_SUCCESS]: (state, count) => {
    state.status = true;
    state.count = count;
  },
  [LIKES_ERROR]: state => {
    state.status = false;
  }
};
