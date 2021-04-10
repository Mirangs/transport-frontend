<template>
  <div id="app">
    <el-header>
      <router-link to="/" exact>Home</router-link>
      <router-link to="/transport">Transports</router-link>
      <router-link to="/route">Routes</router-link>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<style lang="scss">
@import './assets/scss/variables.scss';
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $main-text-color;
  min-height: 100vh;
}
.el-header {
  text-align: center;
  background-color: $main-bg-color;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  a {
    display: inline-block;
    padding: 20px;
    color: #ffffff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: $main-text-color;
    }

    &:active {
      color: lighten($main-text-color, 25);
    }
  }

  .router-link-active {
    background-color: #ffffff;
    color: $main-text-color;
  }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
