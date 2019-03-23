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
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                    <el-button type="primary" @click="handleDelete">删除</el-button>
                </div>
            </div>

            <div class="table-content">
                <el-table
                    class="table"
                    stripe
                    @selection-change="handleSelectionChange"
                    :data="tableData"
                >
                    <el-table-column type="selection" width="25"></el-table-column>
                    <el-table-column prop="ruleName" align="center" label="规则名称"></el-table-column>
                    <el-table-column prop="state" align="center" label="状态">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.state"
                                active-color="#2b8afa"
                                inactive-color="#ccc"
                            ></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="innerAddress" align="center" label="内网地址" width="150"></el-table-column>
                    <el-table-column prop="agreement" align="center" label="协议" width="150"></el-table-column>
                    <el-table-column prop="innerPort" align="center" label="内网端口"></el-table-column>
                    <el-table-column prop="outterPort" align="center" label="外网端口"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <span
                                class="a-blue pointer"
                                @click="handleChange(scope.$index, scope.row)"
                            >编辑</span>
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
                :title="isAdd ? (lang === 'en' ? 'add' : '新增') : (lang === 'en' ? 'edit' : '修改')"
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
                        <el-switch
                            v-model="ruleForm.state"
                            active-color="#2b8afa"
                            inactive-color="#ccc"
                        ></el-switch>
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
                    <el-button @click="handleModelCancel">取 消</el-button>
                    <el-button type="primary" @click="handleModelComfirm">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Search from "../../components/Search";
import NewBlack from "../../components/NewBlack";
import { isValidIP } from "../../utils";

export default {
    data() {
        return {
            lang: "zh",
            searchVal: "",
            dialogVisible: false,
            isAdd: true,
            options: [
                {
                    value: "TCP",
                    label: "TCP"
                },
                {
                    value: "UDP",
                    label: "UDP"
                },
                {
                    value: "TCP/UDP",
                    label: "TCP/UDP"
                }
            ],
            ruleForm: {
                state: true,
                ruleName: "",
                netAddress: "",
                agreement: "TCP/UDP",
                innerPort: "",
                outterPort: ""
            },
            rules: {
                ruleName: [
                    {
                        required: true,
                        message: "长度在 0 到 64 个字节",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback("不能为空");
                            } else if (value.length > 64) {
                                callback("长度不能超过64个字节");
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                netAddress: [
                    {
                        required: true,
                        message: "ip地址不合法",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (isValidIP(value)) {
                                callback();
                            } else {
                                callback("ip地址不合法");
                            }
                        }
                    }
                ],
                innerPort: [
                    {
                        required: true,
                        message: "请输入数字, 且在 1 到 65535之间",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (value < 1) {
                                callback("不能为空");
                            } else if (value > 65535) {
                                callback("长度不能超过64个字节");
                            } else if (isNaN(value)) {
                                callback("请输入数字");
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                outterPort: [
                    {
                        required: true,
                        message: "请输入数字, 且在 1 到 65535之间",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (value < 1) {
                                callback("不能为空");
                            } else if (value > 65535) {
                                callback("长度不能超过64个字节");
                            } else if (isNaN(value)) {
                                callback("请输入数字");
                            } else {
                                callback();
                            }
                        }
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
        handleAdd() {
            this.ruleForm = {
                state: "",
                ruleName: "",
                netAddress: "",
                agreement: "TCP/UDP",
                innerPort: "",
                outterPort: ""
            };
            this.dialogVisible = true;
            this.isAdd = true;
        },
        handleChange() {
            this.ruleForm = {
                state: "",
                ruleName: "",
                netAddress: "",
                agreement: "TCP/UDP",
                innerPort: "",
                outterPort: ""
            };
            this.dialogVisible = true;
            this.isAdd = false;
        },
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
        handleModelCancel() {
            this.dialogVisible = false;
            this.$refs["ruleForm"].resetFields();
        },
        handleModelComfirm() {
            this.$refs["ruleForm"].validate(valid => {
                if (valid) {
                    this.dialogVisible = false;
                } else {
                    console.log("error submit!!");
                    return false;
                }
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
    margin-bottom: 10px;
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
