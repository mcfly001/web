<template>
  <el-form
    label-position="left"
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item
      label="ip地址"
      prop="ip"
    >
      <el-input v-model="ruleForm.ip"></el-input>
    </el-form-item>

    <el-form-item
      label="子网掩码"
      prop="subnet"
    >
      <el-input v-model="ruleForm.subnet"></el-input>
    </el-form-item>

    <el-form-item
      label="DHCP服务"
      prop="dhcp"
    >
      <el-switch
        class="switch"
        v-model="ruleForm.dhcp"
        active-color="#2b8afa"
        inactive-color="#ccc"
      >
      </el-switch>
    </el-form-item>

    <el-form-item
      label="开始ip"
      prop="startIp"
    >
      <span>192.168.1.</span>
      <el-input class="small" v-model="ruleForm.startIp"></el-input>
    </el-form-item>

    <el-form-item
      label="结束ip"
      prop="endIp"
    >
      <span>192.168.1.</span>
      <el-input class="small" v-model="ruleForm.endIp"></el-input>
    </el-form-item>

    <el-form-item
      label="租约时间"
      prop="saleTime"
    >
      <el-input v-model="ruleForm.saleTime"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        ip: "",
        subnet: "",
        dhcp: true,
        startIp: "",
        endIp: "",
        saleTime: ""
      },
      rules: {
        ip: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        subnet: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        startIp: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        endIp: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        saleTime: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style type="style/scss" lang="scss" scoped>
.small{
  width: 20px;

  /deep/ input{
    width: 20px !important;
  }
}

.switch{
    /deep/ input{
    width: 40px !important;
  }
}
</style>
