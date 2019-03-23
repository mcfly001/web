<template>
    <div class="topnav">
        <div class="logo">
            <img src="../image/logo.png">
        </div>

        <el-menu
            backgroundColor="#0969C8"
            class="topnav_right"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <div class="item userinfo">
                <div class="baseinfo" @click.stop="openPop">
                    <span class="portrait"></span>
                    <span>郑泳健</span>
                    <i class="el-icon-arrow-down" v-if="!showPop"></i>
                    <i class="el-icon-arrow-up" v-else></i>
                </div>
                <div :class="['operation', {active: showPop}]">
                    <div @click="changePassword">修改密码</div>
                    <div @click="loginOut">登出</div>
                </div>
            </div>

            <!-- <el-submenu
        class="item p-r"
      >
        <template slot="title">{{ $t(lang) }}</template>
        <el-menu-item
          v-for="list in langOpt"
          :key="list"
          :index="list"
        >
          {{ $t(list) }}
        </el-menu-item>
            </el-submenu>-->
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lang: "zh",
            langOpt: ["zh", "en"],
            showPop: false
        };
    },
    mounted() {
        window.addEventListener("click", this.closePop);
    },
    methods: {
        openPop() {
            this.showPop = true;
        },
        closePop() {
            this.showPop = false;
        },
        handleSelect(key, keyPath) {
            if (["zh", "en"].indexOf(key) >= 0) {
                this.$i18n.locale = key;
                this.lang = key;
            }
        },
        loginOut() {
            this.$router.replace({
                path: "/login"
            });
        },
        changePassword() {
            this.$router.replace({
                path: "/changepassword"
            });
        }
    },
    destroyed() {
        window.removeEventListener("click", this.closePop);
    }
};
</script>

<style type="text/scss" lang="scss" scoped>
.logo {
    position: absolute;
    left: 25px;
    width: 114px;
    height: 50px;
    z-index: 10000;
}

.logo > img {
    width: 100%;
    height: 100%;
}

.item {
    float: right;
}

.topnav_right {
    position: relative;

    .baseinfo {
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        color: white;
        margin-right: 10px;
        cursor: pointer;

        .portrait {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-image: url("../image/header.png");
            background-size: cover;
            margin-right: 5px;
            vertical-align: -7px;
        }
    }

    .operation {
        width: 150px;
        background: white;
        position: absolute;
        top: 60px;
        right: 0;
        box-shadow: -2px 5px 5px #ccc;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        display: none;
        padding: 5px 0;

        &.active {
            display: block;
        }
    }
}
</style>
