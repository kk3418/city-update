<template>
  <div id="app">
    <div id="map"></div>
    <div class="container">
      <component :is="info"></component>
    </div>
  </div>
</template>
<script>
import Home from "@/components/Home.vue";
import Info from "@/components/Info.vue";
export default {
  name: "App",
  components: { Home, Info },
  mounted() {
    this.getCurrentPosition();
  },
  data() {
    return {
      L: window.L,
      map: null,
      currentPosition: { lat: 0, lng: 0 },
    };
  },
  methods: {
    handleSuccess(pos) {
      const crd = pos.coords;
      this.$store.dispatch("setCurrentPosition", {
        lat: crd.latitude,
        lng: crd.longitude,
      });
      this.currentPosition.lat = crd.latitude;
      this.currentPosition.lng = crd.longitude;
      this.initialLeaflet();
    },

    handleError(e) {
      throw ("Can't get user position", e);
    },

    getCurrentPosition() {
      navigator.geolocation.getCurrentPosition(
        this.handleSuccess,
        this.handleError,
      );
    },

    initialLeaflet() {
      const { lat, lng } = this.currentPosition;
      const map = this.L.map("map").setView([lat, lng], 13);
      this.map = map;

      this.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 15,
      }).addTo(map);

      this.setMarker([lat, lng]);
    },

    setMarker(latlng) {
      const marker = this.L.marker(latlng).addTo(this.map);
      marker.bindPopup(`${this.isSignIn && "123"} logined`).openPopup();
    },

    polygon(value) {
      this.L.polygon(value).addTo(this.map);
    },
  },
  computed: {
    isSignIn() {
      return !!this.$store.state.SignIn.idToken;
    },
    info() {
      return this.isSignIn ? Info : Home;
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

.profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
