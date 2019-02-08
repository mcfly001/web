<template>
  <div>
    <el-form-item>
      <el-input
        v-model="userName"
        placeholder="用户名"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-input
        v-model="password"
        placeholder="密码"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      password: ""
    };
  }
};
</script>

<style type="style/scss" lang="scss" scoped>
</style>
