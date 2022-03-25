export default {
  state: {
    lat: 0,
    lng: 0,
    list: [],
    result: [],
    searchResult: {},
    polygons: [],
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
    setList(state, v) {
      state.list = v;
    },
    setResult(state, v) {
      if (v?.length) {
        state.result = v;
      }
    },
    setSearchResult(state, v) {
      state.searchResult = v;
    },
    setPolygons(state, v) {
      state.polygons = v;
    },
  },
  actions: {
    classifyResult({ commit }, payload) {
      const r = {};
      payload.forEach((item) => {
        const data = {
          id: item.id,
          lat: item.latitude,
          lng: item.longitude,
        };
        if (r[item.stop_name]) {
          r[item.stop_name].push(data);
        } else {
          r[item.stop_name] = [data];
        }
      });
      commit("setSearchResult", r);
    },
    setPlaceResult({ commit, dispatch }, payload) {
      const result = payload?.map((item) => {
        return {
          id: item.id,
          distance: item.distance,
          latitude: item.latitude,
          longitude: item.longitude,
          stop_name: item.stop_name,
        };
      });
      const list = result?.slice(0, 5);

      dispatch("classifyResult", result);
      commit("setList", list);
      commit("setResult", result);
    },
    setCurrentPosition({ commit }, payload) {
      commit("setLat", payload.lat);
      commit("setLng", payload.lng);
    },
    setPolygonsResult({ commit }, payload) {
      const { features = [] } = payload;
      const polygons = [];

      features.forEach((item) => {
        const crd = item?.geometry?.coordinates;
        if (crd && crd[0]?.length) {
          const inverse = crd[0].map((iter) => {
            return [iter[1], iter[0]];
          });
          polygons.push(inverse);
        }
      });

      commit("setPolygons", polygons);
    },
  },
};
