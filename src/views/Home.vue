<template>
  <div class="container">
    <div class="before-login">
      <div class="text">登入後可查詢</div>
      <div id="my-signin2"></div>
    </div>
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
      this.$store.commit("setIdToken", profile.getId());
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
.container {
  padding-top: 5vh;
  display: flex;
  justify-content: center;
  height: 30vh;
  width: 100vw;
  background-color: rgb(153, 196, 210);
  color: rgb(255, 255, 255);
}
.before-login {
  .text {
    font-weight: bold;
    margin-bottom: 3vh;
  }
}
</style>
