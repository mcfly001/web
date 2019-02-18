<template>
    <div class="stalist-wrapper">
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
                    <el-table-column prop="id" align="center" label="ID"></el-table-column>
                    <el-table-column prop="userName" align="center" label="用户名"></el-table-column>
                    <el-table-column prop="ip" align="center" label="IP地址" width="120"></el-table-column>
                    <el-table-column prop="macAddress" align="center" label="MAC地址" width="150"></el-table-column>
                    <el-table-column prop="terminalType" align="center" label="终端类型"></el-table-column>
                    <el-table-column prop="ssid" align="center" label="连接的SSID" width="100"></el-table-column>
                    <el-table-column prop="signal" align="center" label="信号强度"></el-table-column>
                    <el-table-column prop="speed" align="center" label="协商速率"></el-table-column>
                    <el-table-column prop="upper" align="center" label="上行数率"></el-table-column>
                    <el-table-column prop="down" align="center" label="下行速率"></el-table-column>
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
                    id: "1",
                    userName: "小米",
                    ip: "192.168.168.1",
                    macAddress: "00-01-6C-06-A6-29",
                    terminalType: "WIFI-5G",
                    ssid: "你敢连么？",
                    signal: "-36",
                    speed: "144",
                    upper: "300",
                    down: "600"
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
.stalist-wrapper {
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
</style>
