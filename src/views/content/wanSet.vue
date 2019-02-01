<template>
  <div class="wrapper">
    <second-level-tab-list
      v-model="SecondLevelTabActive"
      :list="SecondLevelTabList"
    ></second-level-tab-list>
    <div class="content">
      <el-form
        class="login-form"
        label-width="110px"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
      >
        <el-form-item
          prop="type"
          label="连接类型"
        >
          <el-select
            class="switch"
            v-model="ruleForm.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-show="ruleForm.type === '2'"
          label="IP地址"
          prop="ip"
        >
          <el-input v-model="ruleForm.ip"></el-input>
        </el-form-item>

        <el-form-item
          v-show="ruleForm.type === '2'"
          label="子网掩码"
          prop='subnetmask'
        >
          <el-input v-model="ruleForm.subnetmask"></el-input>
        </el-form-item>

        <el-form-item
          v-show="ruleForm.type === '2'"
          label="网关地址"
          prop="gateway"
        >
          <el-input v-model="ruleForm.gateway"></el-input>
        </el-form-item>

        <el-form-item
          v-show="ruleForm.type === '2'"
          label="主DNS服务器"
          prop="mainDns"
        >
          <el-input v-model="ruleForm.mainDns"></el-input>
        </el-form-item>

        <el-form-item
          v-show="ruleForm.type === '2'"
          label="备DNS服务器"
          prop="copyDns"
        >
          <el-input v-model="ruleForm.copyDns"></el-input>
        </el-form-item>

        <el-form-item
          v-show="ruleForm.type === '3'"
          label="宽带账号"
          prop="userName"
        >
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>

        <el-form-item
          v-show="ruleForm.type === '3'"
          label="宽带密码"
          prop="password"
        >
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-button
          class="submit"
          type="primary"
          @click.native.prevent="handleClick"
        >{{ $t('next') }}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SecondLevelTabList: ["外网配置"],
      SecondLevelTabActive: "外网配置",
      options: [
        {
          label: "动态接入",
          value: "1"
        },
        {
          label: "固定接入",
          value: "2"
        },
        {
          label: "PPPoE接入",
          value: "3"
        }
      ],
      ruleForm: {
        type: "1",
        ip: "",
        subnetmask: "",
        gateway: "",
        mainDns: "",
        copyDns: "",
        userName: "",
        password: ""
      },
      rules: {
        ip: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        subnetmask: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        gateway: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        mainDns: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.src = "../../static" + this.$route.path + ".html";
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-flow: nowrap column;
}

.content {
  flex: 1;
  margin: 0 20px;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
  background: white;
  padding: 10px 20px;
}

/deep/ input {
  height: 25px;
  width: 140px !important;
}
</style>
