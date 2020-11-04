import Vue from 'vue';
import Vuex from 'vuex';
import authActions from '@/store/modules/auth/actions';
import authMutations from '@/store/modules/auth/mutations';
import likesActions from '@/store/modules/likes/actions';
import likesMutations from '@/store/modules/likes/mutations';
import likesGetters from '@/store/modules/likes/getters';

Vue.use(Vuex);

const data = {
  modules: {
    auth: {
      statusSignup: false
    },
    likes: {
      status: false,
      count: 0
    }
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth: {
      namespaced: true,
      state: data.modules.auth,
      actions: authActions,
      mutations: authMutations
    },
    likes: {
      namespaced: true,
      state: data.modules.likes,
      actions: likesActions,
      mutations: likesMutations,
      getters: likesGetters
    }
  }
});
