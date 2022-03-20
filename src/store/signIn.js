export default {
  state: {
    isSignIn: false,
    idToken: "",
    profileImage: "",
    fbLogin: false,
    FbImage: "",
  },
  getters: {},
  mutations: {
    setIsSignIn(state, val) {
      state.isSignIn = val;
    },
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
      commit("setIsSignIn", true);
    },
    signout({ commit }) {
      commit("setIdToken", "");
      commit("setProfileImage", "");
      commit("setIsSignIn", false);
    },
    bindFB({ commit }, payload) {
      commit("setFbLogin", true);
      commit("setFbImage", payload?.FbImage);
    },
    disconnectFB({ commit }) {
      commit("setFbLogin", false);
    },
  },
};
