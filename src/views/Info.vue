<template>
  <div class="after-login">
    <div class="signout-btn" @click="signout">logut</div>
    <div
      @click="checkFBLoginState"
      class="fb-login-button right-btn"
      data-width=""
      data-size="large"
      data-button-type="continue_with"
      data-layout="default"
      data-auto-logout-link="true"
      data-use-continue-as="false"
    ></div>
    <input v-if="showSearch" class="search-box" type="search" />
  </div>
</template>
<script>
export default {
  name: "info-page",
  mounted() {
    const timer = setTimeout(() => {
      const googleAuthInstance = window.gapi.auth2.getAuthInstance();
      if (!googleAuthInstance.isSignedIn.get()) {
        this.$router.replace("/");
      }
      clearTimeout(timer);
    }, 700);
    this.checkFBLoginState();
  },
  data() {
    return {
      showSearch: false,
    };
  },
  methods: {
    checkFBLoginState() {
      // eslint-disable-next-line
      FB.getLoginStatus((res) => {
        if (res.status === "connected") {
          this.showSearch = true;
        } else {
          this.showSearch = false;
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
