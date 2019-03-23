<template>
    <div id="app">
        <!-- 头部导航栏 -->
        <top-header></top-header>
        <div class="container">
            <!-- 左侧导航栏 -->
            <left-nav></left-nav>
            <div class="right-content">
                <el-breadcrumb class="breadcrumb" separator="/">
                    <el-breadcrumb-item class="item" v-for="item in breadList" :key="item">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="main">
                    <router-view/>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
import TopHeader from "../components/TopHeader";
import LeftNav from "../components/LeftNav";
import enumList from "../enum";

export default {
    name: "App",
    data() {
        return {
            breadList: []
        };
    },
    created() {
        let { path } = this.$route;
        this.breadList = enumList[path];
    },
    watch: {
        $route(to, from) {
            this.breadList = enumList[to.path];
        }
    },
    components: {
        TopHeader,
        LeftNav
    }
};
</script>

<style scoped>
.container {
    flex: 1;
    overflow: hidden;
}

.right-content {
    background: white;
    margin-left: 170px;
    height: 100%;
    display: flex;
    flex-flow: nowrap column;
    justify-content: space-around;
}

.breadcrumb {
    padding: 6px 10px;
    padding-top: 5px;
    border-bottom: 1px solid #cecece;
    background: linear-gradient(to bottom, #e7e7e7 30%, #e7e7e7 100%);
    box-sizing: border-box;
    border-bottom: 0.5px solid #ccc;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
}

.breadcrumb .item {
    font-size: 13px;
    cursor: pointer;
}

.main {
    flex: 1;
    overflow: auto;
}

.current {
    float: left;
}

.footer {
    height: 40px;
    background: #e9e9e9;
}
</style>
