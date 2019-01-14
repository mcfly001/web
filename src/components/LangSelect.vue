<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <i class="icon iconfont icon-language"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$i18n.locale
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
  width: 1em;
  height: 1em;
  vertical-align: -.15em;
  fill: currentColor;
  overflow: hidden;
}

.icon-language{
  color: white;
  font-size: 18px; 
}

.international{
  position: absolute;
  top: 10px;
  right: 0;
}
</style>

