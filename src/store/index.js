import Vue from 'vue';
import Vuex from 'vuex';
import likesActions from '@/store/modules/likes/actions';
import likesMutations from '@/store/modules/likes/mutations';
import likesGetters from '@/store/modules/likes/getters';

Vue.use(Vuex);

const data = {
  modules: {
    likes: {
      status: false,
      count: 0
    }
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    likes: {
      namespaced: true,
      state: data.modules.likes,
      actions: likesActions,
      mutations: likesMutations,
      getters: likesGetters
    }
  }
});
