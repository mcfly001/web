<template>
    <div>
        <div class="filter">
            <search :value="searchVal"></search>
            <div class="pull-right">
                <el-button type="primary" @click="handleAdd">新增</el-button>
                <el-button type="primary">删除</el-button>
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
                <el-table-column prop="ruleName" align="center" label="任务名称" width="180"></el-table-column>
                <el-table-column prop="ip" align="center" label="IP地址" width="180"></el-table-column>
                <el-table-column prop="subnetMark" align="center" label="子网掩码"></el-table-column>
                <el-table-column prop="vlanId" align="center" label="VLAN ID"></el-table-column>
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
                <el-form-item label="名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="IP 地址" prop="ip">
                    <el-input v-model="ruleForm.ip"></el-input>
                </el-form-item>

                <el-form-item label="子网掩码" prop="subnet">
                    <el-input v-model="ruleForm.subnet"></el-input>
                </el-form-item>

                <el-form-item label="VLAN ID" prop="vlanId">
                    <el-input v-model="ruleForm.vlanId"></el-input>
                </el-form-item>
            </el-form>
            <div class="model-footer">
                <el-button @click="handleModelCancel">取 消</el-button>
                <el-button type="primary" @click="handleModelComfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Search from "../../../../components/Search";
import NewBlack from "../../../../components/NewBlack";
import table from "../../../../mock/table";

export default {
    data() {
        return {
            isAdd: true,
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
                name: "",
                ip: "",
                subnet: "",
                vlanId: ""
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
                ip: [
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
                subnet: [
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
                vlanId: [
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
            tableData: table,
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
                ip: "",
                subnet: "",
                vlanId: ""
            };
            this.dialogVisible = true;
            this.isAdd = true;
        },
        handleChange() {
            this.ruleForm = {
                name: "",
                ip: "",
                subnet: "",
                vlanId: ""
            };
            this.dialogVisible = true;
            this.isAdd = false;
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

<style type="style/scss" lang="scss" scoped>
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
    content: "VLAN配置";
    display: inline-block;
    font-size: 13px;
    margin-left: 10px;
    color: #a8a8a8;
}

.en {
    /deep/ .el-dialog__title::after {
        content: "vlan config";
        display: inline-block;
        font-size: 13px;
        margin-left: 10px;
        color: #a8a8a8;
    }
}
</style>
