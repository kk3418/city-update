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
  async mounted() {
    await this.initialLeaflet();
    await this.getLocation();
    this.renderLoginButton();
  },
  data() {
    return {
      L: window.L,
    };
  },
  methods: {
    initialLeaflet() {
      return new Promise((resolve) => {
        const map = this.L.map("map");
        window.map = map;

        this.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 15,
          minZoom: 13,
        }).addTo(map);
        resolve();
      });
    },

    getLocation() {
      return new Promise((resolve) => {
        window.map.locate({ setView: true, watch: true, maxZoom: 14 });
        window.map.on("locationfound", (e) => {
          resolve();
          const crd = e.latlng;
          if (!window.currentMarker) {
            window.currentMarker = this.L.marker(crd).addTo(window.map);
          } else {
            window.currentMarker.setLatLng(crd);
          }
          this.$store.dispatch("setCurrentPosition", {
            lat: crd.lat,
            lng: crd.lng,
          });
        });
      });
    },

    renderLoginButton() {
      window.gapi.signin2.render("my-signin2", {
        scope: "profile email",
        width: 240,
        height: 50,
        longtitle: true,
        theme: "dark",
        onsuccess: this.onSuccess,
        onfailure: this.onFailure,
      });
    },

    onSuccess(googleUser) {
      const profile = googleUser.getBasicProfile();
      const idToken = googleUser.getAuthResponse().id_token;
      const profileImage = profile.getImageUrl();

      this.$store.dispatch("signIn", {
        idToken,
        profileImage,
      });
      window.currentMarker
        .bindTooltip(`<img src="${profileImage}" alt="" class="tooltip" />`)
        .addTo(window.map)
        .openTooltip();
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    },

    onFailure(error) {
      console.log("login error", error);
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
