<template>
  <div class="pageContainer">
    <headerNav/>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import headerNav from '@/components/headerNav/index.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style lang="scss" scoped>
.pageContainer {
  padding-top: 46px;
  .content {
    position: relative;
    height: calc(100% - 46px);
  }
}
</style>
