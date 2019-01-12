<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <top-header></top-header>
    <div class="container">
      <!-- 左侧导航栏 -->
      <left-nav></left-nav>
      <div class="right-content">
        <router-view class="main" />
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from "../components/TopHeader";
import LeftNav from "../components/LeftNav";

export default {
  name: "App",
  components: {
    TopHeader,
    LeftNav
  }
};
</script>

<style>
#app {
  height: 100%;
}

.container{
  height: 100%;
  margin-top: -61px;
  box-sizing: border-box;
  padding-top: 61px;
}

.right-content {
  margin-left: 250px;
  height: 100%;
  overflow-y: hidden;
}

.right-content>.main{
  width: 100%;
  height: 100%;
}
</style>
