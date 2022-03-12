import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: "",
  },
  getters: {},
  mutations: {
    setIdToken(val) {
      this.idToken = val;
    },
  },
  actions: {},
  modules: {},
});
