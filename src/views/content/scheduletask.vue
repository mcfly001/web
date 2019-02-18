<template>
    <div class="scheduletask-wrapper">
        <second-level-tab-list
            class="tab"
            v-model="SecondLevelTabActive"
            :list="SecondLevelTabList"
        ></second-level-tab-list>
        <div class="content">
            <div class="filter">
                <search :value="searchVal"></search>
                <div class="pull-right">
                    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
                    <el-button type="primary">删除</el-button>
                </div>
            </div>

            <div class="table-content">
                <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    class="table"
                    @selection-change="handleSelectionChange"
                    :data="tableData"
                >
                    <el-table-column type="selection" width="25"></el-table-column>
                    <el-table-column prop="ruleName" align="center" label="任务名称" width="180"></el-table-column>
                    <el-table-column prop="effectiveObj" align="center" label="生效对象" width="180"></el-table-column>
                    <el-table-column prop="startType" align="center" label="启动类型"></el-table-column>
                    <el-table-column prop="workTime" align="center" label="运行时间"></el-table-column>
                    <el-table-column prop="workContent" align="center" label="任务内容"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <span
                                class="a-blue pointer"
                                @click="handleDelete(scope.$index, scope.row)"
                            >删除</span>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    class="pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next"
                    :total="total"
                ></el-pagination>
            </div>
            <el-dialog
                :class="{'en': lang === 'en'}"
                title="新增"
                :visible.sync="dialogVisible"
                width="490px"
            >
                <el-form
                    label-position="left"
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="任务名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="生效对象" prop="mac">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="任务间隔" prop="mac">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="运行时间" prop="mac">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                        <el-time-picker
                            class="time"
                            type="fixed-time"
                            placeholder="选择时间"
                            v-model="time"
                            style="width: 100%;"
                        ></el-time-picker>
                    </el-form-item>

                    <el-form-item label="任务内容" prop="mac">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="model-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Search from "../../components/Search";
import NewBlack from "../../components/NewBlack";

export default {
    data() {
        return {
            lang: "zh",
            searchVal: "",
            dialogVisible: false,
            time: "",
            ruleForm: {
                name: "",
                mac: "",
                note: ""
            },
            rules: {
                name: [
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
                mac: [
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
                ]
            },
            tableData: [
                {
                    ruleName: "定时重启",
                    effectiveObj: "本设备",
                    startType: "每天",
                    workTime: "11:38",
                    workContent: "设备重启"
                }
            ],
            SecondLevelTabList: ["任务计划"],
            SecondLevelTabActive: "任务计划",
            currentPage: 1,
            total: 400
        };
    },
    created() {
        this.lang = this.$i18n.locale;
    },
    methods: {
        handleSelectionChange() {},
        handleDelete() {
            this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.tableData = [];
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        handleSizeChange() {},
        handleCurrentChange() {}
    },
    components: {
        Search,
        NewBlack
    }
};
</script>

<style type="text/scss" lang="scss" scoped>
.scheduletask-wrapper {
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
}

.filter {
    margin-bottom: 20px;
}

.pagination {
    margin-top: 30px;
    width: 100%;
    text-align: right;
}

.model-footer {
    text-align: right;
}

/deep/ .el-dialog__title::after {
    content: "任务计划";
    display: inline-block;
    font-size: 13px;
    margin-left: 10px;
    color: #a8a8a8;
}

.en {
    /deep/ .el-dialog__title::after {
        content: "Schedule task";
        display: inline-block;
        font-size: 13px;
        margin-left: 10px;
        color: #a8a8a8;
    }
}

.time {
    width: 100px !important;

    /deep/ input {
        height: 35px;
    }
}
</style>
