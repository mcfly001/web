<template>
    <div class="stalist">
        <second-level-tab-list v-model="SecondLevelTabActive" :list="SecondLevelTabList"></second-level-tab-list>
        <div class="content">
            <div class="filter">
                <search :value="searchVal"></search>

                <div class="pull-right">
                    <el-select class="m-r" v-model="choosedTime" placeholder="请选择">
                        <el-option
                            v-for="item in timeOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                    <el-button type="primary">刷新</el-button>
                    <el-button type="primary">移动到</el-button>
                    <el-button type="primary">加入黑名单</el-button>
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
                    <el-table-column prop="date" align="center" label="ID"></el-table-column>
                    <el-table-column prop="name" align="center" label="用户名"></el-table-column>
                    <el-table-column prop="name" align="center" label="IP地址"></el-table-column>
                    <el-table-column prop="address" align="center" label="MAC地址"></el-table-column>
                    <el-table-column prop="name" align="center" label="终端类型"></el-table-column>
                    <el-table-column prop="name" align="center" label="连接的SSID"></el-table-column>
                    <el-table-column prop="name" align="center" label="信号强度"></el-table-column>
                    <el-table-column prop="name" align="center" label="协商速率"></el-table-column>
                    <el-table-column prop="name" align="center" label="上行数率"></el-table-column>
                    <el-table-column prop="name" align="center" label="下行速率"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <span class="a-blue" @click="handleDelete(scope.$index, scope.row)">黑名单</span>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    size="small"
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
    </div>
</template>

<script>
import Search from "../../components/Search";

export default {
    data() {
        return {
            activeTab: "first",
            searchVal: "",
            choosedTime: "5",
            timeOptions: ["3", "5", "10", "60", "手动"],
            tableData: [
                {
                    date: "1",
                    name: "127.0.0.2",
                    address: "00-01-6C-06-A6-29"
                },
                {
                    date: "2",
                    name: "127.0.0.3",
                    address: "00-01-6C-06-A6-30"
                },
                {
                    date: "3",
                    name: "127.0.0.4",
                    address: "00-01-6C-06-A6-31"
                },
                {
                    date: "4",
                    name: "127.0.0.5",
                    address: "00-01-6C-06-A6-32"
                },
                {
                    date: "5",
                    name: "127.0.0.6",
                    address: "00-01-6C-06-A6-33"
                },
                {
                    date: "6",
                    name: "127.0.0.7",
                    address: "00-01-6C-06-A6-34"
                },
                {
                    date: "7",
                    name: "127.0.0.111",
                    address: "00-01-6C-06-A6-35"
                },
                {
                    date: "8",
                    name: "127.0.0.8",
                    address: "00-01-6C-06-A6-36"
                },
                {
                    date: "9",
                    name: "127.0.0.9",
                    address: "00-01-6C-06-A6-37"
                },
                {
                    date: "10",
                    name: "127.0.0.10",
                    address: "00-01-6C-06-A6-38"
                },
                {
                    date: "11",
                    name: "127.0.0.11",
                    address: "00-01-6C-06-A6-39"
                },
                {
                    date: "12",
                    name: "127.0.0.12",
                    address: "00-01-6C-06-A6-40"
                },
                {
                    date: "13",
                    name: "127.0.0.13",
                    address: "00-01-6C-06-A6-41"
                },
                {
                    date: "14",
                    name: "127.0.0.14",
                    address: "00-01-6C-06-A6-43"
                },
                {
                    date: "15",
                    name: "127.0.0.15",
                    address: "00-01-6C-06-A6-45"
                }
            ],
            SecondLevelTabList: ["用户状态"],
            SecondLevelTabActive: "用户状态",
            currentPage: 1,
            total: 400
        };
    },
    methods: {
        handleSelectionChange() {},
        handleDelete() {},
        handleSizeChange() {},
        handleCurrentChange() {}
    },
    components: {
        Search
    }
};
</script>

<style type="text/scss" lang="scss" scoped>
.content {
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
</style>
