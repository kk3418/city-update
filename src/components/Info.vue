<template>
  <div class="after-login">
    <div class="signout-btn" @click="signout">logut</div>
    <div v-if="!isFbLogin" @click="signInFB" class="fb-login-btn">login</div>
    <div v-if="isFbLogin" @click="signoutFB" class="fb-login-btn">logout</div>
    <input v-if="isFbLogin" class="search-box" type="search" />
  </div>
</template>
<script>
export default {
  name: "info-page",
  mounted() {
    const timer = setTimeout(() => {
      this.checkFBLoginState();
      clearTimeout(timer);
    }, 1000);
  },
  methods: {
    signoutFB() {
      // eslint-disable-next-line
      FB.logout(() => {
        this.$store.dispatch("disconnectFB");
      });
    },
    signInFB() {
      if (this.$store.state.SignIn.fbLogin) {
        // eslint-disable-next-line
        FB.login(
          (response) => {
            console.log("FB status", response.status);
            this.$store.dispatch("bindFB");
          },
          { scope: "public_profile,email" },
        );
      }
    },
    checkFBLoginState() {
      // eslint-disable-next-line
      FB.getLoginStatus((res) => {
        if (res.status === "connected") {
          console.log("check fb", res.status);
          this.$store.dispatch("bindFB");
        }
      });
    },
    signout() {
      const googleAuthInstance = window.gapi.auth2.getAuthInstance();
      googleAuthInstance
        .signOut()
        .then(() => {
          this.$store.dispatch("signout");
          this.$router.replace("/");
        })
        .catch((e) => console.error("logout error", e));
    },
  },
  computed: {
    isFbLogin() {
      return this.$store.state.SignIn.fbLogin;
    },
    isSignIn() {
      return this.$store.state.SignIn.idToken;
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
</style>
