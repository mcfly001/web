<template>
  <el-tabs
    v-model="activeTab"
    type="border-card"
    class="tabs"
  >
    <el-tab-pane
      label="用户状态"
      name="first"
    >
        <div class="filter">
          <el-input
            v-model.tirm="searchVal"
            placeholder="请输入内容"
            size="small"
          ></el-input>
          <div class="pull-right">
            <el-select
              size="small"
              v-model="choosedTime"
              placeholder="请选择"
            >
              <el-option
                v-for="item in timeOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-button size="small">刷新</el-button>
            <el-button size="small">移动到</el-button>
            <el-button size="small">加入黑名单</el-button>
          </div>
        </div>

        <el-table
          height="200"
          stripe
          border
          :default-sort="{prop: 'date', order: 'descending'}"
          class="table"
          :data="tableData"
        >
          <el-table-column
            prop="date"
            label="用户ID"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="IP地址"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="MAC地址"
          >
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
        >
        </el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "first",
      searchVal: "",
      choosedTime: "5",
      timeOptions: ["3", "5", "10", "60", "手动"],
      tableData: [
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      currentPage: 1,
      total: 400
    };
  },
  created() {
    this.src = "../../static" + this.$route.path + ".html";
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style scoped>

.table {
  flex: 1;
  margin-top: 15px;
  margin-bottom: 60px;
  height: 100% !important;
}

.pagination{
  position: fixed;
  bottom: 10px;
  right: 30px;
  width: 100%;
  text-align: right;
}
</style>
