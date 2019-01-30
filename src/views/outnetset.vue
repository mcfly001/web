<template>
  <div class="login">
    <div class="form">
      <div class="logo">
        <img src="../image/logo.png" />
      </div>

      <div class="info">
        <h3 class="title">{{ $t('outnetset.title') }}</h3>
      </div>
      <el-form
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="password">
          <el-select
            v-model="value"
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

        <el-form-item v-show="value === '2'">
          <el-input
            v-model="ip"
            placeholder="IP地址"
          ></el-input>
        </el-form-item>

        <el-form-item v-show="value === '2'">
          <el-input
            v-model="subnetmask"
            placeholder="子网掩码"
          ></el-input>
        </el-form-item>

        <el-form-item v-show="value === '2'">
          <el-input
            v-model="gateway"
            placeholder="网关地址"
          ></el-input>
        </el-form-item>

        <el-form-item v-show="value === '2'">
          <el-input
            v-model="dns"
            placeholder="DNS服务器"
          ></el-input>
        </el-form-item>

        <el-form-item v-show="value === '3'">
          <el-input
            v-model="userName"
            placeholder="用户名"
          ></el-input>
        </el-form-item>

        <el-form-item v-show="value === '3'">
          <el-input
            v-model="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-button
          class="submit"
          type="primary"
          @click.native.prevent="handleClick"
        >{{ $t('next') }}</el-button>
      </el-form>
      <div class="footer">
        copyright<em>@</em>爱莲科技
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "1",
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
      ip: '',
      subnetmask: '',
      gateway: '',
      dns: '',
      userName: "",
      password: ""
    };
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.login {
  background-color: #263243;
  height: 100%;
  position: relative;
}

.logo {
  margin-bottom: 20px;
  text-align: center;
}

.logo > image {
  display: inline-block;
  width: 228px;
  height: 100px;
}

.form {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 460px;
  height: 500px;
  transform: translate3d(-50%, -40%, 0);
}

.el-button {
  margin-top: 25px;
  padding: 12px 20px;
}

.info {
  position: relative;
  font-size: 15px;
  color: #eee;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 1px dashed white;
  padding-bottom: 40px;
}

.login-form {
  position: relative;
  width: 460px;
  max-width: 100%;
  padding: 0 0 0;
  margin: 0 auto 40px;
  overflow: hidden;
}

.el-select {
  width: 100%;
}

.submit {
  width: 100%;
  line-height: 47px;
  padding: 0;
  box-sizing: border-box;
  display: inline-block;
  margin-bottom: 30px;
  cursor: pointer;
}

/deep/ .el-form-item__content {
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  background: white;
  border-radius: 7px;
  line-height: 47px;
}

/deep/ input {
  border: none;
}

.icon-password {
  font-size: 18px;
  z-index: 1000;
  color: #454545;
  padding: 0px 5px 0px 15px;
  float: left;
}

.icon-eye-copy {
  font-size: 12px;
  z-index: 1000;
  color: #454545;
  padding: 0 15px 0px 15px;
  float: right;
  color: #889aa4;
  cursor: pointer;
}

.footer {
  color: white;
  text-align: center;

  & > em {
    color: #1f8bff;
    margin-left: 5px;
    margin-right: 3px;
  }
}
</style>
