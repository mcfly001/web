<template>
  <div>
    <el-form-item>
      <el-input
        v-model="ip"
        placeholder="IP地址"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-input
        v-model="subnetmask"
        placeholder="子网掩码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="gateway"
        placeholder="网关地址"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-input
        v-model="dns"
        placeholder="DNS服务器"
      ></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ip: "",
      subnetmask: "",
      gateway: "",
      dns: ""
    };
  }
};
</script>

<style type="style/scss" lang="scss" scoped>
</style>
