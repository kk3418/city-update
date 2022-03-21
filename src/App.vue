<template>
  <div id="app">
    <div id="map"></div>
    <div class="container">
      <component :is="info"></component>
      <List v-if="isSignIn" />
    </div>
  </div>
</template>
<script>
import Home from "@/components/Home.vue";
import Info from "@/components/Info.vue";
import List from "@/components/List.vue";
export default {
  name: "App",
  components: { Home, Info, List },
  mounted() {
    this.initialLeaflet();
  },
  data() {
    return {
      L: window.L,
    };
  },
  methods: {
    initialLeaflet() {
      const map = this.L.map("map");
      window.map = map;

      this.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 15,
        minZoom: 13,
      }).addTo(map);

      map.locate({ setView: true, watch: true, maxZoom: 14 });
      map.on("locationfound", (e) => {
        const crd = e.latlng;
        if (!window.currentMarker) {
          window.currentMarker = this.L.marker(crd).addTo(map);
        } else {
          window.currentMarker.setLatLng(crd);
        }
        this.$store.dispatch("setCurrentPosition", {
          lat: crd.lat,
          lng: crd.lng,
        });
      });
    },

    polygon(value) {
      this.L.polygon(value).addTo(window.map);
    },
  },
  computed: {
    info() {
      return this.isSignIn ? Info : Home;
    },
    isSignIn() {
      return this.$store.state.SignIn.isSignIn;
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#map {
  height: 55vh;
}

.container {
  padding-top: 2vh;
  height: 45vh;
  width: 100vw;
  background-color: rgb(153, 196, 210);
  color: rgb(255, 255, 255);
}

.profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
