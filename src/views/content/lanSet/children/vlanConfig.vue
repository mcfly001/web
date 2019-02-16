<template>
    <div>
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
                <el-table-column prop="date" align="center" label="任务名称" width="180"></el-table-column>
                <el-table-column prop="name" align="center" label="IP地址" width="180"></el-table-column>
                <el-table-column prop="address" align="center" label="子网掩码"></el-table-column>
                <el-table-column prop="address" align="center" label="VLAN ID"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <span class="a-blue" @click="handleChange(scope.$index, scope.row)">修改</span>
                        <span class="a-blue" @click="handleDelete(scope.$index, scope.row)">删除</span>
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
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
        handleSelectionChange() {},
        handleDelete() {},
        handleChange() {},
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
