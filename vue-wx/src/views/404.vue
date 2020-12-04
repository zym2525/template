<template>
  <div class="bullshit__headline">{{ message }}</div>
</template>

<script>
  export default {
    name: "Page404",
    computed: {
      message() {
        return "The webmaster said that you can not enter this page...";
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
