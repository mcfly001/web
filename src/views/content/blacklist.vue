<template>
    <div class="blacklist-wrapper">
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
                    <el-button type="primary">删除</el-button>
                </div>
            </div>

            <div class="table-content">
                <el-table
                    stripe
                    :default-sort="{prop: 'date', order: 'descending'}"
                    class="table"
                    @selection-change="handleSelectionChange"
                    :data="tableData"
                >
                    <el-table-column type="selection" width="25"></el-table-column>
                    <el-table-column prop="id" align="center" label="ID"></el-table-column>
                    <el-table-column prop="userName" align="center" label="用户名"></el-table-column>
                    <el-table-column prop="ip" align="center" label="IP地址"></el-table-column>
                    <el-table-column prop="macAddress" align="center" label="MAC地址"></el-table-column>
                    <el-table-column prop="joinDate" align="center" label="加入时间"></el-table-column>
                    <el-table-column prop="note" align="center" label="备注"></el-table-column>
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
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="MAC地址" prop="mac">
                        <el-input v-model="ruleForm.mac"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="note">
                        <el-input v-model="ruleForm.note"></el-input>
                    </el-form-item>
                </el-form>
                <div class="model-footer">
                    <el-button @click="handleCancel">取 消</el-button>
                    <el-button type="primary" @click="handleComfirm">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Search from "../../components/Search";
import NewBlack from "../../components/NewBlack";
import { CheckForm2 } from "../../utils";

export default {
    data() {
        return {
            lang: "zh",
            searchVal: "",
            dialogVisible: false,
            ruleForm: {
                name: "",
                mac: "",
                note: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (!!value) {
                                callback();
                            } else {
                                callback("用户名不能为空");
                            }
                        }
                    }
                ],
                mac: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback("MAC地址不能为空");
                            } else if (!CheckForm2(value)) {
                                callback("MAC地址不规范");
                            } else {
                                callback("");
                            }
                        }
                    }
                ]
            },
            tableData: [
                {
                    id: "1",
                    ip: "127.0.0.2",
                    userName: "小米",
                    macAddress: "00:01:6C:06:A6:29",
                    joinDate: "12月13日 11:38",
                    note: "老板"
                }
            ],
            SecondLevelTabList: ["黑名单"],
            SecondLevelTabActive: "黑名单",
            currentPage: 1,
            total: 400
        };
    },
    created() {
        this.lang = this.$i18n.locale;
    },
    methods: {
        handleAdd() {
            this.ruleForm = {
                name: "",
                mac: "",
                note: ""
            };
            this.dialogVisible = true;
        },
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
        handleCancel() {
            this.$refs["ruleForm"].resetFields();
            this.dialogVisible = false;
        },
        handleComfirm() {
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
.blacklist-wrapper {
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
    margin-bottom: 10px;
}

.model-footer {
    text-align: right;
}

/deep/ .el-dialog__title::after {
    content: "黑名单";
    display: inline-block;
    font-size: 13px;
    margin-left: 10px;
    color: #a8a8a8;
}

.en {
    /deep/ .el-dialog__title::after {
        content: "blacklist";
        display: inline-block;
        font-size: 13px;
        margin-left: 10px;
        color: #a8a8a8;
    }
}
</style>
