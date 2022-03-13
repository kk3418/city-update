export default {
  state: {
    idToken: "",
    profileImage: "",
  },
  getters: {},
  mutations: {
    setIdToken(val) {
      this.idToken = val;
    },
    setProfileImage(val) {
      this.profileImage = val;
    },
  },
  actions: {
    signInSuccess({ commit }, payload) {
      const { idToken, profileImage } = payload;
      commit("setIdToken", idToken);
      commit("setProfileImage", profileImage);
    },
  },
};
