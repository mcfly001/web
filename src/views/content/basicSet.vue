<template>
    <div class="work-mode">
        <second-level-tab-list v-model="SecondLevelTabActive" :list="SecondLevelTabList"></second-level-tab-list>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="left"
            label-width="120px"
            class="ruleForm"
        >
            <el-form-item label="当前时间">{{ currentTime }}</el-form-item>

            <el-form-item label="时区选择" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="时间设置方式">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="手动设置"></el-radio>
                    <el-radio label="网络同步"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item class="date" v-show="ruleForm.resource === '手动设置'">
                <el-form-item prop="date1" class="pull-left m-r">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="ruleForm.date1"
                        style="width: 300px;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item class="pull-left">-</el-form-item>
                <el-form-item prop="date2" class="pull-left m-l">
                    <el-time-picker
                        type="fixed-time"
                        placeholder="选择时间"
                        v-model="ruleForm.date2"
                        style="width: 300px;"
                    ></el-time-picker>
                </el-form-item>
            </el-form-item>

            <el-form-item v-show="ruleForm.resource === '网络同步'" label="服务器1 IP地址" prop="name1">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item v-show="ruleForm.resource === '网络同步'" label="服务器2 IP地址" prop="name2">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item v-show="ruleForm.resource === '网络同步'" label="服务器3 IP地址" prop="name3">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            SecondLevelTabList: ["时间设置"],
            SecondLevelTabActive: "时间设置",
            ruleForm: {
                name1: "",
                name2: "",
                date1: "",
                date2: "",
                resource: "手动设置",
                desc: ""
            },
            rules: {
                name1: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur"
                    }
                ],
                name2: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur"
                    }
                ],
                date1: [
                    {
                        type: "date",
                        required: true,
                        message: "请选择日期",
                        trigger: "change"
                    }
                ],
                date2: [
                    {
                        type: "date",
                        required: true,
                        message: "请选择时间",
                        trigger: "change"
                    }
                ],
                resource: [
                    {
                        required: true,
                        message: "请选择活动资源",
                        trigger: "change"
                    }
                ],
                desc: [
                    {
                        required: true,
                        message: "请填写活动形式",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        currentTime() {
            let date = new Date();
            return (
                date.getFullYear() +
                "年" +
                (date.getMonth() + 1) +
                "月" +
                date.getDate() +
                "日 " +
                date.getHours() +
                ":" +
                date.getMinutes()
            );
        }
    }
};
</script> 

<style lang="scss" scoped>
.work-mode {
    height: 100%;
    display: flex;
    flex-flow: nowrap column;

    .ruleForm {
        flex: 1;
        background: white;
        margin: 0 20px;
        padding-top: 10px;
        box-sizing: border-box;
        padding-left: 20px;

        /deep/ input {
            width: 300px;
            height: 30px;
            line-height: 30px;
        }
    }

    .date {
        margin-top: -20px;
        box-sizing: border-box;

        /deep/ input {
            width: 300px;
        }
    }
}
</style>
