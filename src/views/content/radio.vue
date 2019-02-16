<template>
    <div class="radio-wrapper">
        <second-level-tab-list v-model="SecondLevelTabActive" :list="SecondLevelTabList"></second-level-tab-list>
        <div class="content">
            <div class="config-info">
                <div class="title">2.4G射频</div>
                <el-form :model="form" label-width="80px" label-position="left">
                    <el-form-item label="模式">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="信道">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="信道带宽">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="传输功率">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="config-info second">
                <div class="title">5G射频</div>
                <el-form :model="form" label-width="80px" label-position="left">
                    <el-form-item label="模式">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="信道">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="信道带宽">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="传输功率">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
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
                region: ""
            }
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
