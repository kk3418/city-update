<template>
  <div class="after-login">
    <div class="signout-btn" @click="signout">登出</div>
    <div v-if="!isfbLogin" data-fb @click="signInFB" class="signout-btn">
      綁定FB
    </div>
    <div v-if="isfbLogin" data-fb @click="signoutFB" class="signout-btn">
      解除綁定FB
    </div>
    <input
      v-if="isfbLogin"
      class="search-box"
      type="search"
      v-model="input"
      @keyup.enter="search"
    />
  </div>
</template>
<script>
export default {
  name: "logined-component",
  data() {
    return {
      L: window.L,
      isSearching: false,
      input: "",
      url: "https://asia-east2-botfat.cloudfunctions.net/project_controller",
      options: {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    };
  },
  mounted() {
    this.checkFBLoginState();
  },
  methods: {
    signoutFB() {
      // eslint-disable-next-line
      FB.logout(() => {
        this.$store.dispatch("disconnectFB");
        this.$store.commit("setList", []);
      });
    },

    signInFB() {
      if (!this.isfbLogin) {
        // eslint-disable-next-line
        FB.login(
          (respond) => {
            if (respond.status === "connected") {
              this.$store.dispatch("bindFB");
              this.nearbySearch();
              this.getPolygonResults();
            }
          },
          { scope: "public_profile,email" },
        );
      }
    },

    checkFBLoginState() {
      // eslint-disable-next-line
      FB.getLoginStatus((res) => {
        if (res.status === "connected") {
          this.$store.dispatch("bindFB");
          this.nearbySearch();
          this.getPolygonResults();
        }
      });
    },

    signout() {
      const googleAuthInstance = window.gapi.auth2.getAuthInstance();
      googleAuthInstance
        .signOut()
        .then(() => {
          window.location.reload();
        })
        .catch((e) => console.error("logout error", e));
    },

    setCurrentMarker() {
      window.currentMarker
        .bindTooltip(
          `<img src="${this.profileImage}" class="tooltip" alt="" />`,
        )
        .openTooltip();
    },

    async nearbySearch() {
      if (this.isSearching) return;
      this.isSearching = true;
      const res = await fetch(this.url, {
        ...this.options,
        body: JSON.stringify({
          lat: this.latlng[0],
          lng: this.latlng[1],
          function: "xinbei_distance",
        }),
      });
      const data = await res.json();
      this.$store.dispatch("setPlaceResult", data.result || []);
      this.isSearching = false;
      console.log("data", data);
    },

    async getPolygonResults() {
      const res = await fetch(this.url, {
        ...this.options,
        body: JSON.stringify({
          directory: "tucheng.json",
          function: "xinbei_json",
        }),
      });
      const data = await res.json();
      this.$store.dispatch("setPolygonsResult", data.result || {});
    },

    setPolygon(value) {
      const polygon = this.L.polygon(value, {
        color: "blue",
        fill: true,
        fillColor: "purple",
        opacity: 0.6,
        weight: 3,
      }).addTo(window.map);
      window.polygon = polygon;
    },

    setPlaceMarkers(values) {
      if (values?.length) {
        values?.forEach((value) => {
          this.L.marker([value.latitude, value.longitude]).addTo(window.map);
        });
      }
    },

    search() {
      const search = this.searchResult[this.input];

      if (search) {
        const latlng = [search[0].lat, search[0].lng];
        window.map.stopLocate();
        window.map.setView(latlng, 16);

        search.forEach((place) => {
          const latlng = [place.lat, place.lng];
          this.L.marker(latlng).addTo(window.map);
        });

        const searchList = this.result.filter(
          ({ stop_name }) => stop_name === this.input,
        );
        this.$store.commit("setList", searchList);
      }
    },
  },
  computed: {
    latlng() {
      return this.$store.getters.latlng;
    },
    isfbLogin() {
      return this.$store.state.SignIn.fbLogin;
    },
    FbImage() {
      return this.$store.state.SignIn.FbImage;
    },
    isSignIn() {
      return this.$store.state.SignIn.isSignIn;
    },
    profileImage() {
      return this.$store.state.SignIn.profileImage;
    },
    polygons() {
      return this.$store.state.Position.polygons;
    },
    result() {
      return this.$store.state.Position.result;
    },
    searchResult() {
      return this.$store.state.Position.searchResult;
    },
  },
  watch: {
    isSignIn(newVal) {
      if (newVal) {
        this.setCurrentMarker(this.latlng);
      }
    },
    polygons(newVal) {
      if (newVal) {
        this.setPolygon(newVal);
      }
    },
    result(newVal) {
      if (newVal) {
        // this.setPlaceMarkers(newVal);
      }
    },
  },
};
</script>
<style lang="scss" scpoed>
.after-login {
  font-size: 2vmax;
  width: 55%;
  margin: 0 auto;
  display: flex;

  .signout-btn {
    background: rgb(198, 67, 67);
    padding: 0 2%;
    line-height: 1.6;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }

  [data-fb] {
    background-color: #1877f2;
    margin-left: 5%;
  }

  .search-box {
    margin-left: 10%;
    padding: 0 2%;
    width: 45%;
    font-size: 2vmax;
  }

  .right-btn {
    margin-left: 10%;
  }
}

img.tooltip {
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
