<template>
  <div class="search">
    <el-input
      placeholder="请输入内容"
      v-model="text"
      class="input-with-select"
    >
      <el-button
        class="primary"
        type="primary"
        slot="append"
      >搜索</el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  }
};
</script>

<style type="style/scss" lang="scss" scoped>

.search{
  display: inline-block;
}

.el-input{
  width: 270px !important;

  /deep/ input{
    height: 35px !important;
    line-height: 35px !important;
  }

  button{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 35px;
  }
}

.primary{
  background: #1f8bff !important;
  color: white !important;
  letter-spacing: 3px;
}
</style>
