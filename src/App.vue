<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
/* 国家哀悼日全站置灰 */
#app {
  filter: grayscale(1);
}
</style>
