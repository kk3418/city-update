export default {
  state: {
    idToken: "",
    profileImage: "",
    fbLogin: false,
    FbImage: "",
  },
  getters: {},
  mutations: {
    setIdToken(state, val) {
      state.idToken = val;
    },
    setProfileImage(state, val) {
      state.profileImage = val;
    },
    setFbImage(state, val) {
      state.FbImage = val;
    },
    setFbLogin(state, val) {
      state.fbLogin = val;
    },
  },
  actions: {
    signIn({ commit }, payload) {
      const { idToken, profileImage } = payload;
      commit("setIdToken", idToken);
      commit("setProfileImage", profileImage);
    },
    signout({ commit }) {
      commit("setIdToken", "");
      commit("setProfileImage", "");
    },
    bindFB({ commit }) {
      commit("setFbLogin", true);
    },
    disconnectFB({ commit }) {
      commit("setFbLogin", false);
    },
  },
};
