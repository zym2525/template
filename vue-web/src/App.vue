<template>
  <div id="app">
    <router-link to="/"> home </router-link>
    <router-link to="/about"> about </router-link>
    <router-view />
  </div>
</template>

<script>
  import HelloWorld from "./components/HelloWorld.vue";
  import { ResizeHandler } from "@/mixins";

  export default {
    name: "app",
    mixins: [ResizeHandler],
    components: {
      HelloWorld,
    },
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
