<template>
  <div class="before-login">
    <div class="text">登入後可查詢</div>
    <div id="my-signin2"></div>
  </div>
</template>
<script>
export default {
  name: "home-page",
  mounted() {
    this.renderLoginButton();
  },
  methods: {
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
      this.$store.dispatch("signInSuccess", {
        idToken,
        profileImage: profile.getImageUrl(),
      });
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
      this.$router.push("/info");
    },
    onFailure(error) {
      console.log("login error", error);
    },
  },
  computed: {
    isSignIn() {
      console.log("update");
      return this.$store.idToken;
    },
  },
};
</script>
<style lang="scss" scoped>
.before-login {
  margin: 0 auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    font-weight: bold;
    margin: 2vh 0 3vh;
  }
}
</style>
