export default {
  state: {
    lat: 0,
    lng: 0,
    list: [],
    result: [],
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
      if (v?.length) {
        state.list = v;
      }
    },
    setResult(state, v) {
      if (v?.length) {
        state.result = v;
      }
    },
    setPolygons(state, v) {
      state.polygons = [...v];
    },
  },
  actions: {
    setPlaceResult({ commit }, payload) {
      const result = payload?.map((item) => {
        return {
          id: item.id,
          distance: item.distance,
          latitude: item.latitude,
          longtitude: item.longtitude,
          stop_name: item.stop_name,
        };
      });
      const list = result?.slice(0, 5);

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
