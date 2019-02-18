<template>
    <div class="virtual-wrapper">
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
                    <el-button type="primary" @click="handleDelete">删除</el-button>
                </div>
            </div>

            <div class="table-content">
                <el-table class="table" @selection-change="handleSelectionChange" :data="tableData">
                    <el-table-column type="selection" width="25"></el-table-column>
                    <el-table-column prop="ruleName" align="center" label="规则名称" width="180"></el-table-column>
                    <el-table-column prop="state" align="center" label="状态" width="180">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.state"
                                active-color="#2b8afa"
                                inactive-color="#ccc"
                            ></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="innerAddress" align="center" label="内网地址"></el-table-column>
                    <el-table-column prop="agreement" align="center" label="协议"></el-table-column>
                    <el-table-column prop="innerPort" align="center" label="内网端口"></el-table-column>
                    <el-table-column prop="outterPort" align="center" label="外网端口"></el-table-column>
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
                width="450px"
            >
                <el-form
                    label-position="left"
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="状态" prop="state">
                        <el-input v-model="ruleForm.state"></el-input>
                    </el-form-item>

                    <el-form-item label="规则名称" prop="ruleName">
                        <el-input v-model="ruleForm.ruleName"></el-input>
                    </el-form-item>

                    <el-form-item label="内网地址" prop="netAddress">
                        <el-input v-model="ruleForm.netAddress"></el-input>
                    </el-form-item>

                    <el-form-item label="协议">
                        <el-select v-model="ruleForm.agreement" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="内网端口" prop="innerPort">
                        <el-input v-model="ruleForm.innerPort"></el-input>
                    </el-form-item>

                    <el-form-item label="外网端口" prop="outterPort">
                        <el-input v-model="ruleForm.outterPort"></el-input>
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
            options: [
                {
                    value: "1",
                    label: "TCP/UDP"
                }
            ],
            ruleForm: {
                state: "",
                ruleName: "",
                netAddress: "",
                agreement: "",
                innerPort: "",
                outterPort: ""
            },
            rules: {
                ruleName: [
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
                netAddress: [
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
                innerPort: [
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
                outterPort: [
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
                    ruleName: "web服务",
                    state: true,
                    innerAddress: "192.168.1.1",
                    agreement: "TCP/UDP",
                    innerPort: "80",
                    outterPort: "8090"
                }
            ],
            SecondLevelTabList: ["端口映射"],
            SecondLevelTabActive: "端口映射",
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
.virtual-wrapper {
    display: flex;
    flex-flow: nowrap column;
    height: 100%;
}

.content {
    margin: 0 20px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
    background: white;
    padding: 10px 20px;
    flex: 1;
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
    content: "端口映射";
    display: inline-block;
    font-size: 13px;
    margin-left: 10px;
    color: #a8a8a8;
}

.en {
    /deep/ .el-dialog__title::after {
        content: "virtual server";
        display: inline-block;
        font-size: 13px;
        margin-left: 10px;
        color: #a8a8a8;
    }
}
</style>
