import Vue from "vue";
import Vuex from "vuex";
import SignIn from "./signIn";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { SignIn },
});
