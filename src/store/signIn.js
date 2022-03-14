export default {
  state: {
    idToken: "",
    profileImage: "",
    FbImage: "",
  },
  getters: {},
  mutations: {
    setIdToken(val) {
      this.idToken = val;
    },
    setProfileImage(val) {
      this.profileImage = val;
    },
    setFbImage(val) {
      this.FbImage = val;
    },
  },
  actions: {
    signInSuccess({ commit }, payload) {
      const { idToken, profileImage } = payload;
      commit("setIdToken", idToken);
      commit("setProfileImage", profileImage);
    },
    bindFB({ commit }, payload) {
      const { fbImage } = payload;
      commit("setFbImage", fbImage);
    },
  },
};
