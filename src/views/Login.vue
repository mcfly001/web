<template>
  <div class="login">
    <div class="form">
      <div class="logo">
        <img src="../image/logo.png" />
      </div>

      <div class="info">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <lang-select class="set-language" />
      </div>
      <el-form
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="password">
          <span class="svg-container svg-password">
            <i class="iconfont icon-password"></i>
          </span>
          <el-input
            :type="passwordType"
            class="password"
            v-model="password"
            :placeholder="$t('login.password')"
            name="password"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <i class="iconfont icon-eye-copy"></i>
          </span>
        </el-form-item>
        <el-button
          class="submit"
          type="primary"
          @click.native.prevent="handleLogin"
        >{{ $t('login.logIn') }}</el-button>
      </el-form>
      <div class="footer">
        copyright<em>@</em>爱莲科技
      </div>
    </div>
  </div>
</template>

<script>
import LangSelect from "../components/LangSelect";

export default {
  data() {
    return {
      passwordType: "password",
      password: ""
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      this.$router.replace("/htmls/overview");
    }
  },
  components: {
    LangSelect
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

.password {
  width: 350px !important;
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

.footer{
  color: white;
  text-align: center;

  & > em{
    color: #1f8bff;
    margin-left: 5px;
    margin-right: 3px;
  }
}
</style>
