<template>
    <div class="search">
        <el-input placeholder="请输入搜索内容" v-model="text" class="input-with-select">
            <el-button class="primary" type="primary" slot="append">搜索</el-button>
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
.search {
    display: inline-block;
}

.el-input {
    width: 230px !important;

    /deep/ input {
        height: 26px !important;
        line-height: 26px !important;
    }

    button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        height: 26px;
        line-height: 26px;
        vertical-align: 1px;
    }
}

.primary {
    background: #0969c8 !important;
    color: white !important;
    letter-spacing: 3px;
}
</style>
