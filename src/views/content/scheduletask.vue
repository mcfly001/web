<template>
  <div class="stalist">
    <second-level-tab-list
      class="tab"
      v-model="SecondLevelTabActive"
      :list="SecondLevelTabList"
    ></second-level-tab-list>
    <div class="content">
      <div class="filter">
        <search :value="searchVal"></search>
        <div class="pull-right">
          <el-button
            type="primary"
            @click="dialogVisible = true"
          >新增</el-button>
          <el-button type="primary">删除</el-button>
        </div>
      </div>

      <div class="table-content">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          class="table"
          :data="tableData"
        >
          <el-table-column
            prop="date"
            sortable
            :sort-method="sortFn"
            align='center'
            label="用户ID"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            align='center'
            label="IP地址"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            align='center'
            label="MAC地址"
          >
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
        >
        </el-pagination>
      </div>
      <el-dialog
        :class="{'en': lang === 'en'}"
        title="新增"
        :visible.sync="dialogVisible"
        width="490px"
      >
        <el-form
          label-position="left"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="任务名称"
            prop="name"
          >
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item
            label="生效对象"
            prop="mac"
          >
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择活动区域"
            >
              <el-option
                label="区域一"
                value="shanghai"
              ></el-option>
              <el-option
                label="区域二"
                value="beijing"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="任务间隔"
            prop="mac"
          >
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择活动区域"
            >
              <el-option
                label="区域一"
                value="shanghai"
              ></el-option>
              <el-option
                label="区域二"
                value="beijing"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="运行时间"
            prop="mac"
          >
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择活动区域"
            >
              <el-option
                label="区域一"
                value="shanghai"
              ></el-option>
              <el-option
                label="区域二"
                value="beijing"
              ></el-option>
            </el-select>
             <el-time-picker
              class="time"
              type="fixed-time"
              placeholder="选择时间"
              v-model="time"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>

          <el-form-item
            label="任务内容"
            prop="mac"
          >
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择活动区域"
            >
              <el-option
                label="区域一"
                value="shanghai"
              ></el-option>
              <el-option
                label="区域二"
                value="beijing"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="model-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
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
      lang: 'zh',
      searchVal: "",
      dialogVisible: false,
      time: '',
      ruleForm: {
        name: "",
        mac: "",
        note: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        mac: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
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
      SecondLevelTabList: ["任务计划"],
      SecondLevelTabActive: "任务计划",
      currentPage: 1,
      total: 400
    };
  },
  created() {
    this.lang = this.$i18n.locale
  },
  methods: {
    sortFn(a, b) {
      return a.date - b.date;
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

.model-footer {
  text-align: right;
}

/deep/ .el-dialog__title::after{
  content: '任务计划';
  display: inline-block;
  font-size: 13px;
  margin-left: 10px;
  color: #a8a8a8;
}

.en{
  /deep/ .el-dialog__title::after{
  content: 'Schedule task';
  display: inline-block;
  font-size: 13px;
  margin-left: 10px;
  color: #a8a8a8;
  }
}

.time{
  width: 100px !important;

  /deep/ input{
    height: 35px;
  }
}
</style>
