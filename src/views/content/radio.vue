<template>
    <div class="radio-wrapper">
        <second-level-tab-list v-model="SecondLevelTabActive" :list="SecondLevelTabList"></second-level-tab-list>
        <div class="content">
            <div class="config-info">
                <div class="title">2.4G射频</div>
                <el-form :model="form" label-width="80px" label-position="left">
                    <el-form-item label="模式">
                        <el-select v-model="form.model2">
                            <el-option
                                v-for="item in models2"
                                :key="item"
                                :lable="item"
                                :value="item"
                            >{{item}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="信道">
                        <el-select v-model="form.signal2">
                            <el-option
                                v-for="item in signals2"
                                :key="item"
                                :lable="item"
                                :value="item"
                            >{{item}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="信道带宽">
                        <el-select v-model="form.bandwidth2">
                            <el-option
                                v-for="item in bandwidths2"
                                :key="item"
                                :lable="item"
                                :value="item"
                            >{{item}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="传输功率">
                        <el-select v-model="form.power2">
                            <el-option
                                v-for="item in powers2"
                                :key="item"
                                :lable="item"
                                :value="item"
                            >{{item}}</el-option>
                        </el-select>
                        <el-select v-model="form.power26" v-show="form.power2 === '手动'">
                            <el-option
                                v-for="item in powers26"
                                :key="item"
                                :lable="item"
                                :value="item"
                            >{{item}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="config-info second">
                <div class="title">5G射频</div>
                <el-form :model="form" label-width="80px" label-position="left">
                    <el-form-item label="模式">
                        <el-select v-model="form.model5">
                            <el-option
                                v-for="item in models5"
                                :key="item"
                                :lable="item"
                                :value="item"
                            >{{item}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="信道">
                        <el-select v-model="form.signal5">
                            <el-option
                                v-for="item in signals5"
                                :key="item"
                                :lable="item"
                                :value="item"
                            >{{item}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="信道带宽">
                        <el-select v-model="form.bandwidth5">
                            <el-option
                                v-for="item in bandwidths5"
                                :key="item"
                                :lable="item"
                                :value="item"
                            >{{item}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="传输功率">
                        <el-select v-model="form.power5">
                            <el-option
                                v-for="item in powers5"
                                :key="item"
                                :lable="item"
                                :value="item"
                            >{{item}}</el-option>
                        </el-select>
                        <el-select v-model="form.power56" v-show="form.power5 === '手动'">
                            <el-option
                                v-for="item in powers56"
                                :key="item"
                                :lable="item"
                                :value="item"
                            >{{item}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="align-center operation">
                <el-button type="default">重置</el-button>
                <el-button type="primary">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            SecondLevelTabList: ["射频配置"],
            SecondLevelTabActive: "射频配置",
            form: {
                model2: "仅11g",
                signal2: "自动",
                bandwidth2: "自动",
                power2: "自动",
                power26: "中",
                model5: "仅11g",
                signal5: "自动",
                bandwidth5: "自动",
                power5: "手动",
                power56: "中"
            },
            models2: ["仅11g", "仅11n", "11b/g/n混合"],
            signals2: ["自动", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            bandwidths2: ["自动", "20M"],
            powers2: ["自动", "手动"],
            powers26: ["高", "中", "低"],
            models5: ["仅11n", "11a/n混合"],
            signals5: ["自动", 36, 40, 44, 48, 149, 153, 157, 161, 165],
            bandwidths5: ["自动", "20M"],
            powers5: ["自动", "手动"],
            powers56: ["高", "中", "低"]
        };
    },
    created() {}
};
</script>

<style lang="scss" scoped>
.content {
    flex: 1;
    margin: 0 20px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
    background: white;
    padding: 10px 20px;

    .title {
        line-height: 45px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
    }

    /deep/ input {
        width: 200px;
    }

    .second {
        margin-bottom: 40px;
    }

    .operation {
        padding-top: 20px;
        padding-bottom: 20px;
        border-top: 1px solid #eee;
    }
}
</style>
