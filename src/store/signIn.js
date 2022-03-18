export default {
  state: {
    idToken: "",
    profileImage: "",
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
    bindFB({ commit }, payload) {
      const { fbImage } = payload;
      commit("setFbImage", fbImage);
    },
  },
};
