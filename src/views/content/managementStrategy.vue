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
                v-show="SecondLevelTabActive === '密码修改'"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="confirmPas">
                    <el-input v-model="ruleForm.confirmPas" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>

            <el-form
                label-position="left"
                :model="ruleForm3"
                :rules="rules3"
                ref="ruleForm3"
                label-width="100px"
                class="demo-ruleForm"
                v-show="SecondLevelTabActive === '远程管理'"
            >
                <el-form-item label="确认密码" prop="confirmPas">
                    <el-radio v-model="radio" label="1">开启</el-radio>
                    <el-radio v-model="radio" label="2">关闭</el-radio>
                </el-form-item>

                <el-form-item label="端口" prop="port">
                    <el-input v-model="ruleForm3.port" placeholder="8001"></el-input>
                </el-form-item>
            </el-form>
            <div class="align-center">
                <el-button @click="handleRest">重置</el-button>
                <el-button type="primary" @click="handleComfirm">确 定</el-button>
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
            radio: "1",
            ruleForm: {
                password: "",
                confirmPas: ""
            },
            rules: {
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (!!value) {
                                callback();
                            } else {
                                callback("密码不能为空");
                            }
                        }
                    }
                ],
                confirmPas: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (!!value) {
                                callback();
                            } else if (this.ruleForm.password !== value) {
                                callback("2次密码不相同");
                            } else {
                                callback("密码不能为空");
                            }
                        }
                    }
                ]
            },
            ruleForm3: {
                port: ""
            },
            rules3: {
                port: {
                    required: true,
                    message: "密码不能为空",
                    trigger: "blur",
                    validator: (rule, value, callback) => {
                        if (!!value) {
                            callback();
                        } else {
                            callback("密码不能为空");
                        }
                    }
                }
            }
        };
    },
    methods: {
        handleRest() {
            if (this.SecondLevelTabActive === "密码修改") {
                this.$refs["ruleForm"].resetFields();
            } else if (this.SecondLevelTabActive === "远程管理") {
                this.$refs["ruleForm3"].resetFields();
            }
        },
        handleComfirm() {
            if (this.SecondLevelTabActive === "密码修改") {
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            } else if (this.SecondLevelTabActive === "远程管理") {
                this.$refs["ruleForm3"].validate(valid => {
                    if (valid) {
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    }
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
