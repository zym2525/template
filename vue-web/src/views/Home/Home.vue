<template>
  <!-- <div>this is home</div> -->
  <div class="wrapper hidden-sm-only" id="wrapper">
    <ul class="list" id="list">
      <li class="item">1</li>
      <li class="item">2</li>
      <li class="item">3</li>
      <li class="item">4</li>
      <li class="item">5</li>
      <li class="item">6</li>
      <li class="item">7</li>
      <li class="item">8</li>
      <li class="item">9</li>
      <li class="item">10</li>
      <li class="item">11</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from "@better-scroll/core";
  import Slide from "@better-scroll/slide";
  BScroll.use(Slide);

  export default {
    name: "Home",
    mounted() {
      // const bs = new BScroll(".wrapper", {
      //   // slide: true,
      // });
      // bs.scrollTo(0, bs.maxScrollY, 3000);
      // var wrapper = document.getElementById("wrapper");
      // var list = document.getElementById("list");
      // const runkeyframes = ` @keyframes mymove{
      //                       0% {
      //                         transform: translateY(0);
      //                       }
      //                       100% {
      //                         transform: translateY(-${
      //                           list.clientHeight - wrapper.clientHeight
      //                         }px);
      //                       }
      //                   }`;
      // const style = document.createElement("style");
      // style.type = "text/css";
      // style.innerHTML = runkeyframes;
      // document.getElementsByTagName("head")[0].appendChild(style);
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/common.scss";

  .wrapper {
    width: 400px;
    height: 400px;
    border: 1px solid #dcdcdc;
    margin: 100px auto 0;
    overflow: hidden;

    // @include res("sm-only", $--breakpoints-spec) {
    //   background-color: blue;
    // }
  }
  .list {
    animation: mymove 5s ease-in-out infinite;
  }
  .item {
    height: 60px;
    border-bottom: 1px solid #dcdcdc;
    font-size: 20px;
    text-align: center;
    line-height: 60px;
  }
  @keyframes mymove {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-90%);
    }
  }
</style>