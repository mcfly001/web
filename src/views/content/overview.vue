<template>
  <div class="chart">
    <div class="top">
      <div id="top-left">

      </div>

      <div id="top-right">

      </div>
    </div>
    <div class="bottom">
      <div id="bottom-left">

      </div>

      <div id="bottom-right">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    mounted() {
      let topLeft = echarts.init(document.getElementById("top-left"));
      let topRight = echarts.init(document.getElementById("top-right"));
      let bottomLeft = echarts.init(document.getElementById("bottom-left"));
      let bottomRight = echarts.init(document.getElementById("bottom-right"));

      const breakLineOptions = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      };

      topLeft.setOption(breakLineOptions);
      topRight.setOption(breakLineOptions);
      bottomLeft.setOption(breakLineOptions);
      bottomRight.setOption(breakLineOptions);
    },
    methods: {}
  };
</script>

<style type="text/scss" lang="scss" scoped>
  .chart {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    .top,
    .bottom {
      height: 50%;
    }

    .top {
      margin-bottom: 15px;
    }

    .bottom {
      margin-top: 15px;
    }

    #top-left,
    #top-right,
    #bottom-left,
    #bottom-right {
      width: 48%;
      height: 100%;
      background: red;
      float: left;
      background: white;
      padding-left: 10px;
      box-sizing: border-box;

      &>div:first-child>div:first-child{
        margin: auto;
      }
    }

    #top-left,
    #bottom-left {
      margin-right: 2%;
    }
  }
</style>
