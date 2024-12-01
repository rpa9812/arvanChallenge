<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("tryLogin");
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
