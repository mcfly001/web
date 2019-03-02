<template>
    <div class="systemip-wrapper">
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
                :label-width="labelWidth"
                class="demo-ruleForm"
            >
                <el-form-item v-show="SecondLevelTabActive === '软件升级'" label="软件版本">
                    <span>ILink 2.8.3</span>
                </el-form-item>

                <el-form-item v-show="SecondLevelTabActive === '软件升级'" label="手动升级">
                    <el-upload
                        class="upload"
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                    >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button
                            style="margin-left: 10px;"
                            size="small"
                            type="success"
                            @click="submitUpload"
                        >升级</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item v-show="SecondLevelTabActive === '软件升级'" label="升级后重启">
                    <el-checkbox v-model="checked"></el-checkbox>
                </el-form-item>

                <el-form-item class="form-item" v-show="SecondLevelTabActive === '配置管理'">
                    <div class="title">备份配置</div>
                    <div class="item-content">
                        <el-button type="primary">新建备份</el-button>
                    </div>
                </el-form-item>

                <el-form-item class="form-item" v-show="SecondLevelTabActive === '配置管理'">
                    <div class="title">恢复配置</div>
                    <el-upload
                        class="upload item-content"
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                    >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button
                            style="margin-left: 10px;"
                            size="small"
                            type="success"
                            @click="submitUpload"
                        >恢复</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item class="form-item" v-show="SecondLevelTabActive === '配置管理'">
                    <div class="title">恢复出厂设置</div>
                    <div class="item-content">
                        <el-button type="primary">立即恢复</el-button>
                    </div>
                </el-form-item>

                <el-form-item v-show="SecondLevelTabActive === '重启设备'" label="重新启动设备">
                    <el-button type="primary" @click="dialogVisible = false">立即重启</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            SecondLevelTabList: ["软件升级", "配置管理", "重启设备"],
            SecondLevelTabActive: "软件升级",
            ruleForm: {},
            rules: {},
            checked: true,
            fileList: [
                {
                    name: "food.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                },
                {
                    name: "food2.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                }
            ]
        };
    },
    computed: {
        labelWidth() {
            return this.SecondLevelTabActive !== "配置管理" ? "100px" : "0";
        }
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
};
</script>

<style lang="scss" scoped>
.systemip-wrapper {
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
        padding-top: 20px;
    }

    .title {
        color: #1f88ff;
        border-bottom: 1px solid #ccc;
        margin-bottom: 15px;
    }

    .item-content {
        padding-left: 100px;
    }
}
</style>
