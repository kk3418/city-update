<template>
  <div @click="signout">logut</div>
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
