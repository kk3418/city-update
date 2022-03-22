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

    setMarker() {
      const marker = this.L.marker(this.latlng).addTo(window.map);
      marker
        .bindTooltip(
          `<img src="${this.profileImage}" class="tooltip" alt="" />`,
        )
        .openTooltip();
    },

    async nearbySearch() {
      if (this.isSearching) return;
      this.isSearching = true;
      const res = await fetch(
        "https://asia-east2-botfat.cloudfunctions.net/project_controller",
        {
          ...this.options,
          body: JSON.stringify({
            lat: this.latlng[0],
            lng: this.latlng[1],
            function: "xinbei_distance",
          }),
        },
      );
      const data = await res.json();
      this.$store.dispatch("setPlaceResult", data.result || []);
      this.isSearching = false;
      console.log("data", data);
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
  },
  watch: {
    isSignIn(newVal) {
      if (newVal) {
        this.setMarker(this.latlng);
      }
    },
  },
};
</script>
<style lang="scss" scpoed>
.after-login {
  font-size: 24px;
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
    font-size: 20px;
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
