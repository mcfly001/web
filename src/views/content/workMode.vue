<template>
    <div class="workmode-wrapper">
        <second-level-tab-list v-model="SecondLevelTabActive" :list="SecondLevelTabList"></second-level-tab-list>
        <div class="content">
            <el-form label-position="left" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="工作模式">
                    <el-select v-model="type">
                        <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="align-center">
                <el-button @click="dialogVisible = false">重置</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            SecondLevelTabList: ["工作模式"],
            SecondLevelTabActive: "工作模式",
            type: "本地管理",
            options: ["本地管理", "集中管理"]
        };
    },
    methods: {}
};
</script>

<style type="text/scss" lang="scss" scoped>
.workmode-wrapper {
    display: flex;
    flex-flow: nowrap column;
    height: 100%;
}

.content {
    flex: 1;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
    background: white;
    padding: 10px 20px;

    form {
        margin-bottom: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid #f1f1f1;

        /deep/ input {
            width: auto !important;
            height: 35px;
        }
    }
}
</style>
