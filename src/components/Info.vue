<template>
  <div class="after-login">
    <div class="signout-btn" @click="signout">登出</div>
    <div v-if="!isFbLogin" data-fb @click="signInFB" class="signout-btn">
      綁定FB
    </div>
    <div v-if="isFbLogin" data-fb @click="signoutFB" class="signout-btn">
      解除綁定FB
    </div>
    <input v-if="isFbLogin" class="search-box" type="search" />
  </div>
</template>
<script>
export default {
  name: "info-page",
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
      if (!this.isFbLogin) {
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
</style>
