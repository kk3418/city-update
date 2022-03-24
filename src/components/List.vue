<template>
  <div class="list">
    <div class="list-item" v-for="item in list" :key="item.id">
      <div class="name">{{ item.stop_name }}</div>
      <div class="distance">{{ `${item.distance} km` }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "list-page",
  methods: {},
  computed: {
    list() {
      return this.$store.state.Position.list;
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  margin: 3vh auto;
  width: 70%;
  overflow-y: scroll;
}
.list-item {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5vh;
  background-color: rgb(233, 242, 243);
  color: rgb(46, 43, 43);
  box-shadow: 1px 1px 1px rgb(104, 97, 97);
  margin-bottom: 1vh;
  .name {
    font-size: 2vmax;
  }

  .distance {
    font-size: 2.6vmax;
    color: rgb(117, 117, 174);
  }
}
</style>
