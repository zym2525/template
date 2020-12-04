<template>
  <div id="app">
    <router-link to="/"> home </router-link>
    <router-link to="/about"> about </router-link>
    <router-view />
  </div>
</template>

<script>
  import HelloWorld from "./components/HelloWorld.vue";

  export default {
    name: "app",
    components: {
      HelloWorld,
    },
    created() {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "", // 必填，公众号的唯一标识
        timestamp: "", // 必填，生成签名的时间戳
        nonceStr: "", // 必填，生成签名的随机串
        signature: "", // 必填，签名
        jsApiList: [], // 必填，需要使用的JS接口列表
      });
      wx.ready(function () {
        console.log("ready: ");
      });
      wx.error(function (res) {
        console.log("res: ", res);
      });
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
