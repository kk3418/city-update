<template>
  <div id="app">
    <div id="map"></div>
    <div class="current-btn" @click="currentLocation">現在位置</div>
    <div class="container">
      <component :is="logined"></component>
      <List v-if="isSignIn" />
    </div>
  </div>
</template>
<script>
import * as jose from "jose";
import Login from "@/components/Login.vue";
import Logined from "@/components/Logined.vue";
import List from "@/components/List.vue";
export default {
  name: "App",
  components: { Login, Logined, List },
  async mounted() {
    await this.initialLeaflet();
    await this.initialGoogle();
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
          minZoom: 13,
        }).addTo(map);
        resolve();
      });
    },

    initialGoogle() {
      return new Promise((resolve) => {
        window.onGoogleLibraryLoad = () => {
          window.google.accounts.id.initialize({
            client_id:
              "513374919811-20gi47snsc0vds9dvv1g9fr8leesn5o2.apps.googleusercontent.com",
            callback: this.handleResponse,
            auto_select: true,
          });
          window.google.accounts.id.prompt();
        };
        resolve();
      });
    },

    currentLocation() {
      window.map.setView(this.latlng, 16);
      const list = this.result?.slice(0, 5);
      list && this.$store.commit("setList", list);
    },

    getLocation() {
      return new Promise((resolve) => {
        window.map.locate({ setView: true, watch: true, maxZoom: 16 });
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
      window.onGoogleLibraryLoad();
      window.google.accounts.id.renderButton(
        document.getElementById("my-signin2"),
        {
          width: 120,
          type: "standard",
          size: "large",
          theme: "outline",
          shape: "pill",
          logo_alignment: "left",
          text: "signin",
        },
      );
    },

    handleResponse(res) {
      const profile = jose.decodeJwt(res.credential);
      const idToken = profile.aud;
      const profileImage = profile.picture;

      this.$store.dispatch("signIn", {
        idToken,
        profileImage,
      });
      window.currentMarker
        .bindTooltip(`<img src="${profileImage}" alt="" class="tooltip" />`)
        .addTo(window.map)
        .openTooltip();
    },

    onFailure(error) {
      console.log("login error", error);
    },
  },
  computed: {
    latlng() {
      return this.$store.getters.latlng;
    },
    logined() {
      return this.isSignIn ? Logined : Login;
    },
    isSignIn() {
      return this.$store.state.SignIn.isSignIn;
    },
    result() {
      return this.$store.state.Position.result;
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  position: relative;
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

.current-btn {
  position: absolute;
  right: 5vw;
  top: 45vh;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 1.5vh 1.5vw;
  z-index: 400;
  cursor: nesw-resize;
}
</style>
