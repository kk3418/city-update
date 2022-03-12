<template>
  <div id="app">
    <div id="map"></div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  mounted() {
    this.initialLeaflet();
    this.polygon();
  },
  data() {
    return {
      L: window.L,
      map: null,
    };
  },
  methods: {
    initialLeaflet() {
      const map = this.L.map("map").setView([51.505, -0.09], 13);
      this.map = map;

      this.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    },
    setMarker(latlng) {
      this.L.marker(latlng).addTo(this.map);
    },
    polygon() {
      this.L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047],
      ]).addTo(this.map);
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
  height: 70vh;
}

.container {
  padding-top: 2vh;
  height: 30vh;
  width: 100vw;
  background-color: rgb(153, 196, 210);
  color: rgb(255, 255, 255);
}
</style>
