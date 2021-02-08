import { LIKES_REQUEST, LIKES_SUCCESS, LIKES_ERROR } from '@/store/modules/likes/types';

export default {
  setLike({ commit }, count) {
    return new Promise((resolve, reject) => {
      commit(LIKES_REQUEST);
      if (count) {
        commit(LIKES_SUCCESS, count);
        resolve(count);
      }
      commit(LIKES_ERROR);
      reject(new Error('count not found'));
    });
  }
};
