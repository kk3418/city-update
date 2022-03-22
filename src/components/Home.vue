<template>
  <div class="before-login">
    <div class="text">登入後可查詢</div>
    <div id="my-signin2"></div>
  </div>
</template>
<script>
export default {
  name: "home-page",
  data() {
    return {
      L: window.L,
    };
  },
  mounted() {},
  methods: {},
  computed: {
    latlng() {
      return this.$store.getters.latlng;
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
