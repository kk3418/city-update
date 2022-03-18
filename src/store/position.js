export default {
  state: {
    lat: 0,
    lng: 0,
  },
  getters: {
    latlng(state) {
      return { lat: state.lat, lng: state.lng };
    },
  },
  mutation: {
    setLng(state, v) {
      state.lng = v;
    },
    setLat(state, v) {
      state.lat = v;
    },
  },
  action: {
    setCurrentPosition({ commit }, payload) {
      commit("setLat", payload.lat);
      commit("setLng", payload.lng);
    },
  },
};
