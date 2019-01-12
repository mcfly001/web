<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <top-header></top-header>
    <div class="container">
      <!-- 左侧导航栏 -->
      <left-nav></left-nav>
      <div class="right-content">
        <el-breadcrumb
          class="breadcrumb"
          separator="/"
        >
          <span class="current">当前位置：</span>
          <el-breadcrumb-item v-for="item in breadList"    
                              :key="item">
              {{item}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from "../components/TopHeader";
import LeftNav from "../components/LeftNav";
import enumList from '../enum'

export default {
  name: "App",
  data () {
    return {
      breadList: []
    }
  },
  created () {
    let { path } = this.$route
    this.breadList = enumList[path]
  },
  watch: {
    '$route'(to, from){
      this.breadList = enumList[to.path]
    }
  },
  components: {
    TopHeader,
    LeftNav
  }
};
</script>

<style scoped>
.container {
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

.right-content > .main {
  width: auto;
  margin-top: -44px;
  padding-top: 44px;
  height: 100%;
  box-sizing: border-box;
}

.breadcrumb {
  height: 44px;
  padding: 15px 10px 15px 20px;
  background: white;
  box-sizing: border-box;
}

.current {
  float: left;
}
</style>
