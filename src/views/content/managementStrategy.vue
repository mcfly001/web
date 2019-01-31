<template>
  <div class="manage-wrapper">
    <second-level-tab-list
      class="tab"
      v-model="SecondLevelTabActive"
      :list="SecondLevelTabList"
    ></second-level-tab-list>

    <div class="content">
      <el-form
        label-position="left"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          v-show="SecondLevelTabActive === '密码修改'"
          label="密码"
          prop="password"
        >
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-show="SecondLevelTabActive === '密码修改'"
          label="确认密码"
          prop="confirmPas"
        >
          <el-input
            v-model="ruleForm.confirmPas"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-show="SecondLevelTabActive === '远程管理'"
          label="确认密码"
          prop="confirmPas"
        >
          <el-radio
            v-model="radio"
            label="1"
          >开启</el-radio>
          <el-radio
            v-model="radio"
            label="2"
          >关闭</el-radio>
        </el-form-item>

        <el-form-item
          v-show="SecondLevelTabActive === '远程管理'"
          label="端口"
          prop="port"
        >
          <el-input
            v-model="ruleForm.port"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

      </el-form>
      <div class="align-center">
        <el-button @click="dialogVisible = false">重置</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SecondLevelTabList: ["密码修改", "远程管理"],
      SecondLevelTabActive: "密码修改",
      radio: '1',
      ruleForm: {
        password: "",
        confirmPas: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        confirmPas: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {}
};
</script>

<style type="text/scss" lang="scss" scoped>
.manage-wrapper {
  display: flex;
  flex-flow: nowrap column;
  height: 100%;
}

.content {
  flex: 1;
  margin: 0 20px;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
  background: white;
  padding: 10px 20px;

  form {
    margin-bottom: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
  }
}
</style>
