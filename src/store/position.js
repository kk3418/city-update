export default {
  state: {
    lat: 0,
    lng: 0,
  },
  getters: {
    latlng(state) {
      return [state.lat, state.lng];
    },
  },
  mutations: {
    setLng(state, v) {
      state.lng = v;
    },
    setLat(state, v) {
      state.lat = v;
    },
  },
  actions: {
    setCurrentPosition({ commit }, payload) {
      commit("setLat", payload.lat);
      commit("setLng", payload.lng);
    },
  },
};
