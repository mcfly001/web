<template>
    <div class="wrapper">
        <second-level-tab-list v-model="SecondLevelTabActive" :list="SecondLevelTabList"></second-level-tab-list>
        <div class="content">
            <el-form label-width="110px" label-position="left">
                <el-form-item prop="type" label="连接类型">
                    <el-select
                        class="switch"
                        v-model="type"
                        placeholder="请选择"
                        @change="handleChange"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-form
                class="login-form"
                v-show="type === '2'"
                label-width="110px"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-position="left"
            >
                <el-form-item label="IP地址" prop="ip">
                    <el-input placeholder="192.168.1.168" v-model="ruleForm.ip"></el-input>
                </el-form-item>

                <el-form-item label="子网掩码" prop="subnetmask">
                    <el-input placeholder="255.255.255.0" v-model="ruleForm.subnetmask"></el-input>
                </el-form-item>

                <el-form-item label="网关地址" prop="gateway">
                    <el-input placeholder="192.168.1.1" v-model="ruleForm.gateway"></el-input>
                </el-form-item>

                <el-form-item label="主DNS服务器" prop="mainDns">
                    <el-input placeholder="192.168.1.1" v-model="ruleForm.mainDns"></el-input>
                </el-form-item>

                <el-form-item label="备DNS服务器" prop="copyDns">
                    <el-input placeholder="8.8.8.8" v-model="ruleForm.copyDns"></el-input>
                </el-form-item>
            </el-form>

            <el-form
                class="login-form"
                v-show="type === '3'"
                label-width="110px"
                :model="ruleForm3"
                :rules="rules3"
                ref="ruleForm3"
                label-position="left"
            >
                <el-form-item label="宽带账号" prop="userName">
                    <el-input v-model="ruleForm3.userName"></el-input>
                </el-form-item>

                <el-form-item label="宽带密码" prop="password">
                    <el-input v-model="ruleForm3.password"></el-input>
                </el-form-item>
            </el-form>
            <div class="align-center">
                <el-button @click="handleCancel">重置</el-button>
                <el-button type="primary" @click="handleComfirm">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { isValidIP, checkMask } from "../../utils";

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
            type: "1",
            ruleForm: {
                ip: "",
                subnetmask: "",
                gateway: "",
                mainDns: "",
                copyDns: ""
            },
            ruleForm3: {
                userName: "",
                password: ""
            },
            rules: {
                ip: [
                    {
                        required: true,
                        message: "ip地址不合法",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback("不能为空");
                            } else if (isValidIP(value)) {
                                callback();
                            } else {
                                callback("ip地址不合法");
                            }
                        }
                    }
                ],
                subnetmask: [
                    {
                        required: true,
                        message: "子网掩码不合法",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback("不能为空");
                            } else if (checkMask(value)) {
                                callback();
                            } else {
                                callback("子网掩码不合法");
                            }
                        }
                    }
                ],
                gateway: [
                    {
                        required: true,
                        message: "网关地址不合法",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback("不能为空");
                            } else if (isValidIP(value)) {
                                callback();
                            } else {
                                callback("网关地址不合法");
                            }
                        }
                    }
                ],
                mainDns: [
                    {
                        required: true,
                        message: "主DNS不合法",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback("不能为空");
                            } else if (isValidIP(value)) {
                                callback();
                            } else {
                                callback("主DNS不合法");
                            }
                        }
                    }
                ]
            },
            rules3: {
                userName: [
                    {
                        required: true,
                        message: "宽带账号不能为空",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (!!value) {
                                callback();
                            } else {
                                callback("宽带账号不能为空");
                            }
                        }
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "宽带密码不能为空",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (!!value) {
                                callback();
                            } else {
                                callback("宽带密码不能为空");
                            }
                        }
                    }
                ]
            }
        };
    },
    methods: {
        handleChange(value) {
            if (this.type === "2") {
                this.$refs["ruleForm"].resetFields();
            } else if (this.type === "3") {
                this.$refs["ruleForm3"].resetFields();
            }
            console.log(value);
        },
        handleCancel() {
            if (this.type === "2") {
                this.$refs["ruleForm"].resetFields();
            } else if (this.type === "3") {
                this.$refs["ruleForm3"].resetFields();
            }
        },
        handleComfirm() {
            if (this.type === "2") {
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            } else if (this.type === "3") {
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

form.login-form {
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 15px;
}

/deep/ input {
    width: 140px !important;
}
</style>
