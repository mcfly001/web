<template>
    <div class="dhcp-wrapper">
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
                    <el-table-column prop="serviceName" align="center" label="服务名称"></el-table-column>
                    <el-table-column prop="state" align="center" label="状态">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.state"
                                active-color="#2b8afa"
                                inactive-color="#ccc"
                            ></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="interface" align="center" label="接口"></el-table-column>
                    <el-table-column prop="startAddress" align="center" label="起始地址" width="110"></el-table-column>
                    <el-table-column prop="endAddress" align="center" label="结束地址" width="110"></el-table-column>
                    <el-table-column prop="subnetMask" align="center" label="子网掩码" width="120"></el-table-column>
                    <el-table-column prop="mainDns" align="center" label="主DNS服务器" width="120"></el-table-column>
                    <el-table-column prop="copyDns" align="center" label="备DNS服务器" width="120"></el-table-column>
                    <el-table-column prop="lease" align="center" label="租期"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <span
                                class="a-blue pointer"
                                @click="handleChange(scope.$index, scope.row)"
                            >修改</span>
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
                    label-width="120px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="状态" prop="state">
                        <el-switch
                            v-model="ruleForm.state"
                            active-color="#2b8afa"
                            inactive-color="#ccc"
                        ></el-switch>
                    </el-form-item>

                    <el-form-item label="接口">
                        <el-select v-model="ruleForm.agreement" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="起始地址" prop="ruleName">
                        <el-input v-model="ruleForm.ruleName"></el-input>
                    </el-form-item>

                    <el-form-item label="结束地址" prop="ruleName">
                        <el-input v-model="ruleForm.ruleName"></el-input>
                    </el-form-item>

                    <el-form-item label="子网掩码" prop="netAddress">
                        <el-input v-model="ruleForm.netAddress"></el-input>
                    </el-form-item>

                    <el-form-item label="网关地址" prop="innerPort">
                        <el-input v-model="ruleForm.innerPort"></el-input>
                    </el-form-item>

                    <el-form-item label="租期" prop="outterPort">
                        <el-input v-model="ruleForm.outterPort"></el-input>
                    </el-form-item>

                    <el-form-item label="主DNS服务器" prop="outterPort">
                        <el-input v-model="ruleForm.outterPort"></el-input>
                    </el-form-item>

                    <el-form-item label="备DNS服务器" prop="outterPort">
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
                name: "",
                state: false,
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
                    serviceName: "访客网络",
                    state: true,
                    interface: "VLAN10",
                    startAddress: "192.168.10.1",
                    endAddress: "192.168.10.1",
                    subnetMask: "255.255.255.0",
                    mainDns: "255.255.255.0",
                    copyDns: "255.255.255.0",
                    lease: "120分钟"
                }
            ],
            SecondLevelTabList: ["DHCP服务"],
            SecondLevelTabActive: "DHCP服务",
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
        NewBlack
    }
};
</script>

<style type="text/scss" lang="scss" scoped>
.dhcp-wrapper {
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
    content: "DHCP 服务";
    display: inline-block;
    font-size: 13px;
    margin-left: 10px;
    color: #a8a8a8;
}

.en {
    /deep/ .el-dialog__title::after {
        content: "DHCP server";
        display: inline-block;
        font-size: 13px;
        margin-left: 10px;
        color: #a8a8a8;
    }
}
</style>
