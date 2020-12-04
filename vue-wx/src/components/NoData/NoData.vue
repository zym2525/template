<template>
  <div class="no-data">
    <!-- <img v-if="type == 'content'" src="@/assets/noData_images/no-info.png" />
    <img
      v-else-if="type == 'network'"
      src="@/assets/noData_images/no-net.png"
    />
    <img v-else src="@/assets/noData_images/no-data.png" /> -->
    <div class="no-data-text">{{ noDataText }}</div>
  </div>
</template>

<script>
  const NoDataText = {
    content: "暂无内容",
    data: "暂无数据",
    network: "暂无网络",
  };

  export default {
    name: "NoData",
    props: {
      type: {
        type: String,
        default: "data",
        validator: function (value) {
          return ["content", "data", "network"].indexOf(value) !== -1;
        },
      },
      text: {
        type: String,
        default: "",
      },
    },
    computed: {
      noDataText() {
        return this.text ? this.text : NoDataText[this.type];
      },
    },
  };
</script>

<style lang="scss" scoped>
  .no-data {
    margin-top: 40px;
    margin-bottom: 40px;
    img {
      display: block;
      margin: 0 auto;
    }
    .no-data-text {
      font-size: 22px;
      margin-top: 20px;
      text-align: center;
      color: #67666e;
    }
  }
</style>