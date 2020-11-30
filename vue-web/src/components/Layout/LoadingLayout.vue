<template>
  <!-- <div class="loadingLayout"> -->
  <div class="spinner-wrapper" v-if="loading">
    <div class="el-loading-spinner">
      <i class="el-icon-loading"></i>
      <p class="el-loading-text">拼命加载中</p>
    </div>
  </div>
  <div v-else>
    <div v-if="error">出错了</div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
  export default {
    name: "LoadingLayout",
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      error: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .spinner-wrapper {
    min-height: calc(100vh - 80px);
    // position: relative;
  }
  .hasTagsView {
    .spinner-wrapper {
      min-height: calc(100vh - 124px);
    }
  }
</style>