<template>
    <div>
        <el-form
            label-position="left"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="名称/SSID" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="启用">
                <el-radio v-model="ruleForm.enable">启用该无线网络</el-radio>
            </el-form-item>

            <el-form-item label="加密方式">
                <el-select v-model="ruleForm.encryption">
                    <el-option
                        v-for="item in ruleForm.encryptionOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="WEP密钥">
                <el-input v-model="ruleForm.key"></el-input>
                <el-select v-model="ruleForm.keySelect">
                    <el-option
                        v-for="item in ruleForm.keySelectOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <div class="senior-config">
            <div class="title">高级配置</div>
            <el-form
                label-position="left"
                :model="ruleForm2"
                :rules="rules2"
                ref="ruleForm2"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="VLAN" prop="vlan">
                    <el-input v-model="ruleForm2.vlan"></el-input>
                </el-form-item>

                <el-form-item label="隐藏SSID">
                    <el-radio v-model="ruleForm2.ssid">不广播该SSID</el-radio>
                </el-form-item>
                <el-form-item label="用户隔离">
                    <el-radio v-model="ruleForm2.user"></el-radio>
                </el-form-item>
            </el-form>
        </div>

        <div class="filter">
            <div class="title">MAC过滤</div>
            <el-form
                label-position="left"
                :model="ruleForm3"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="启用">
                    <el-radio v-model="ruleForm3.enable">启用MAC过滤</el-radio>
                </el-form-item>
                <el-form-item label="策略">
                    <el-select v-model="ruleForm3.agreement">
                        <el-option
                            v-for="item in ruleForm3.agreementOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        >{{item}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MAC地址">
                    <div :key="item.value" v-for="item in ruleForm3.address">
                        <el-input
                            style="display: inline-block; width: 190px;"
                            class="pull-left"
                            v-model="item.value"
                        ></el-input>
                        <span class="pull-left pointer">{{item.value ? '删除' : '添加'}}</span>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name: "",
                enable: false,
                encryption: "",
                keySelect: "1",
                encryptionOptions: [],
                keySelectOptions: [1, 2, 3, 4]
            },
            ruleForm2: {
                vlan: "",
                ssid: "",
                user: ""
            },
            ruleForm3: {
                enable: false,
                agreement: "黑名单",
                agreementOptions: ["黑名单"],
                address: [
                    {
                        value: "AA:BB:CC:DD:EE:FF"
                    }
                ]
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    }
                ]
            },
            rules2: {
                vlan: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    }
};
</script>

<style type="style/scss" lang="scss" scoped>
.title {
    font-weight: bold;
    //border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    padding-left: 20px;
}

.el-dialog form {
    padding-bottom: 0;
}
</style>
