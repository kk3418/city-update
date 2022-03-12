<template>
  <div class="after-login">
    <div class="signout-btn" @click="signout">logut</div>
    <input class="search-box" type="search" />
  </div>
</template>
<script>
export default {
  name: "info-page",
  methods: {
    signout() {
      const googleAuthInstance = window.gapi.auth2.getAuthInstance();
      googleAuthInstance
        .signOut()
        .then(() => {
          console.log("signout!!");
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
    cursor: pointer;
  }
  .search-box {
    margin-left: 10%;
    padding: 0 2%;
    width: 45%;
    font-size: 20px;
  }
}
</style>
