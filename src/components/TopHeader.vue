<template>
  <div class="topnav">
    <div class="logo">
      <img src="https://assets.2dfire.com/frontend/11dfef885ad8f93b77397febcdd8e127.png" />
    </div>
    <el-menu
      :default-active="activeIndex"
      backgroundColor="#303133"
      class="topnav_right"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu
        class="item"
        index="1"
      >
        <template slot="title">{{ $t(lang) }}</template>
        <el-menu-item
          v-for="list in langOpt"
          :key="list"
          :index="list"
        >
          {{ $t(list) }}
        </el-menu-item>
      </el-submenu>

      <!-- <el-menu-item
        class="item"
        index="2"
      >处理中心</el-menu-item>

      <el-submenu
        index="3"
        class="item"
      >
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu> -->

    </el-menu>
  </div>

</template>

<script>
export default {
  data() {
    return {
      lang: "zh",
      langOpt: ["zh", "en"],
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (["zh", "en"].indexOf(key) >= 0) {
        this.$i18n.locale = key;
        this.lang = key;
      }
    }
  }
};
</script>

<style scoped>
.logo{
  position: absolute;
  left: 25px;
  width: 88px;
  height: 34px;
  margin-top: 10px;
  z-index: 10000
}

.logo>img{
  width: 100%;
  height: 100%;
}

.item {
  float: right;
}
</style>
