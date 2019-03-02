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

            <el-form-item label="时区选择" prop="area">
                <el-select v-model="ruleForm.area" placeholder="请选择活动区域">
                    <el-option v-for="item in areas" :key="item" :value="item">{{item}}</el-option>
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
            areas: [
                "UTC - 1100(中途岛， 萨摩亚群岛)",
                "UTC-1000(夏威夷)",
                "UTC-0900(阿拉斯加州)",
                "UTC-0800(太平洋时间，美国，加拿大)",
                "UTC-0700(山地时间（美国和加拿大），亚利桑那州)",
                "UTC-0600(中部时间（美国和加拿大）;中美洲)",
                "UTC-0500(美国，加拿大东部时间)",
                "UTC-0400(大西洋时间（加拿大），加拉加斯，圣地亚哥)",
                "UTC-0330(纽芬兰)",
                "UTC-0300(巴西利亚，布宜诺斯艾利斯，乔治敦)",
                "UTC-0200(中大西洋)",
                "UTC-0100(佛得角群岛，亚速尔群岛)",
                "UTC+0000(GMT，都柏林，爱丁堡，伦敦，里斯本)",
                "UTC+0100(巴黎，柏林，罗马)",
                "UTC+0200(开罗，雅典)",
                "UTC+0300(莫斯科，科威特)",
                "UTC+0330(德黑兰)",
                "UTC+0400(阿布扎比，马斯喀特，巴库，第比利斯，迪拜)",
                "UTC+0430(喀布尔)",
                "UTC+0500(叶嘉洁林堡，伊斯兰堡，卡拉奇，塔什干)",
                "UTC+0530(马德拉斯，加尔各答，孟买，新德里)",
                "UTC+0600(新西伯利亚，阿拉木图，阿斯塔纳，达卡)",
                "UTC+0630(仰光)",
                "UTC+0700(曼谷，雅加达，河内)",
                "UTC+0800(北京，重庆，香港，乌鲁木齐)",
                "UTC+0900(东京，大阪)",
                "UTC+0930(达尔文，阿德莱德)",
                "UTC+1000(布里斯班，关岛，堪培拉，墨尔本，悉尼)",
                "UTC+1100(马加丹，所罗门群岛，新喀里多尼亚)",
                "UTC+1200(富士，堪察加半岛，马绍尔群岛，惠灵顿)"
            ],
            ruleForm: {
                area: "UTC+0800(北京，重庆，香港，乌鲁木齐)",
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
