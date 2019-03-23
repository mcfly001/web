<template>
    <div class="wlan-wrapper">
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
                <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    stripe
                    class="table"
                    @selection-change="handleSelectionChange"
                    :data="tableData"
                >
                    <el-table-column type="selection" width="25"></el-table-column>
                    <el-table-column prop="name" align="center" label="名称"></el-table-column>
                    <el-table-column prop="encryptionType" align="加密方式" label="服务商"></el-table-column>
                    <el-table-column prop="wifiPassword" align="center" label="无线密码" width="150"></el-table-column>
                    <el-table-column prop="vlan" align="加密方式" label="VLAN"></el-table-column>
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
        </div>
        <el-dialog
            :class="{'en': lang === 'en'}"
            title="新增"
            :visible.sync="dialogVisible"
            width="450px"
        >
            <Model></Model>
            <div class="model-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Search from "../../../components/Search";
import NewBlack from "../../../components/NewBlack";
import Model from "./Model.vue";

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
            tableData: [
                {
                    name: "myWifi",
                    encryptionType: "WAP个人",
                    wifiPassword: "123456789",
                    vlan: "80"
                }
            ],
            SecondLevelTabList: ["无线网络"],
            SecondLevelTabActive: "无线网络",
            currentPage: 1,
            total: 400
        };
    },
    created() {
        this.lang = this.$i18n.locale;
    },
    methods: {
        handleSelectionChange() {},
        handleChange() {},
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
            this.tableData = [];
        },
        handleSizeChange() {},
        handleCurrentChange() {}
    },
    components: {
        Search,
        NewBlack,
        Model
    }
};
</script>

<style type="text/scss" lang="scss" scoped>
.wlan-wrapper {
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

.pagination {
    margin-top: 30px;
    width: 100%;
    text-align: right;
}

.model-footer {
    text-align: right;
}

/deep/ .el-dialog__title::after {
    content: "无线网络";
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
