<template>
    <div class="chart">
        <div class="network-info">
            <div class="title">网络信息</div>
            <div class="content">
                <ul>
                    <li>
                        <div class="value">已连接</div>
                        <div class="label">WAN口状态</div>
                    </li>
                    <li>
                        <div class="value">36天1小时18分38秒</div>
                        <div class="label">连接时间</div>
                    </li>
                    <li>
                        <div class="value">静态接入</div>
                        <div class="label">连接类型</div>
                    </li>
                    <li>
                        <div class="value">192.168.10.12</div>
                        <div class="label">Ip地址</div>
                    </li>
                    <li>
                        <div class="value">255.255.255.0</div>
                        <div class="label">子网掩码</div>
                    </li>
                    <li>
                        <div class="value">192.168.30.1</div>
                        <div class="label">主DNS服务器</div>
                    </li>
                    <li>
                        <div class="value">192.168.30.1</div>
                        <div class="label">备DNS服务器</div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="router-info">
            <div class="title">路由信息</div>
            <div class="content">
                <ul>
                    <li>
                        <div class="value">iL-NB180</div>
                        <div class="label">路由器型号</div>
                    </li>
                    <li>
                        <div class="value">ILink2.8.3</div>
                        <div class="label">系统版本</div>
                    </li>
                    <li>
                        <div class="value">00:22:AA:DD:24:3A</div>
                        <div class="label">MAC地址</div>
                    </li>
                    <li>
                        <div class="value">15757/2131231</div>
                        <div class="label">SN</div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="chart-list">
            <div class="half pull-left">
                <div id="top-left">
                    <div class="label m-l name">
                        <span>实时网络状态</span>
                        <i
                            style="font-size: 30px; margin-top: -7px; margin-left: 15px"
                            :class="openState[0] ? 'icon-haofangtuoiconfont_shaixuanzhedie iconfont pull-right' :  'icon-haofangtuoiconfont_shaixuanzhedieguanbi iconfont pull-right'"
                            @click="changeState(0)"
                        ></i>
                        <i
                            @click="refresh(0)"
                            style="font-weight: bold;"
                            class="iconfont pull-right icon-shuaxin"
                        ></i>
                    </div>
                    <div v-show="!openState[0]">
                        <div class="info">
                            <div class="args">
                                <div class="m-r">
                                    <span class="title">实时下行流量:</span>
                                    <span class="value green">168KB/S</span>
                                </div>
                                <div>
                                    <span class="title">实时上行流量:</span>
                                    <span class="value blue">16.8KB/S</span>
                                </div>
                            </div>
                        </div>
                        <div id="top-left-chart"></div>
                        <div class="footer">
                            <span class="label">最快下载：</span>
                            <span class="value blue">768.99KB/S</span>
                        </div>
                    </div>
                </div>
                <div id="bottom-left">
                    <div class="label m-l name">
                        <span>当前CPU状态</span>
                        <i
                            style="font-size: 30px; margin-top: -7px; margin-left: 15px"
                            :class="openState[2] ? 'icon-haofangtuoiconfont_shaixuanzhedie iconfont pull-right' :  'icon-haofangtuoiconfont_shaixuanzhedieguanbi iconfont pull-right'"
                            @click="changeState(2)"
                        ></i>
                        <i
                            @click="refresh(2)"
                            style="font-weight: bold;"
                            class="iconfont pull-right icon-shuaxin"
                        ></i>
                    </div>
                    <div v-show="!openState[2]">
                        <div class="info">
                            <div class="args">
                                <div class="m-r">
                                    <span class="title">当前CPU负载:</span>
                                    <span class="value green">168KB/S</span>
                                </div>
                            </div>
                        </div>
                        <div id="bottom-left-chart"></div>
                        <div class="footer">
                            <span class="label">CPU核心数:</span>
                            <span class="value blue">4</span>
                            <span class="label">核心频率:</span>
                            <span class="value blue">880/Mhz</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="half pull-left">
                <div id="top-right">
                    <div class="label m-l name">
                        <span>终端流量统计</span>
                        <i
                            style="font-size: 30px; margin-top: -7px; margin-left: 15px"
                            :class="openState[1] ? 'icon-haofangtuoiconfont_shaixuanzhedie iconfont pull-right' :  'icon-haofangtuoiconfont_shaixuanzhedieguanbi iconfont pull-right'"
                            @click="changeState(1)"
                        ></i>
                        <i
                            @click="refresh(1)"
                            style="font-weight: bold;"
                            class="iconfont pull-right icon-shuaxin"
                        ></i>
                    </div>
                    <div v-show="!openState[1]">
                        <div class="info">
                            <div class="args">
                                <div class="m-r">
                                    <span class="title">当前终端:</span>
                                    <span class="value green">1</span>
                                </div>
                            </div>
                        </div>
                        <div id="top-right-chart">
                            <el-table
                                class="p-t"
                                stripe
                                :data="tableData3"
                                height="170"
                                style="width: 100%"
                            >
                                <el-table-column prop="user" label="用户"></el-table-column>
                                <el-table-column prop="ip" label="IP地址" width="110"></el-table-column>
                                <el-table-column prop="mac" label="MAC地址" width="150"></el-table-column>
                                <el-table-column prop="upload" label="上次数据"></el-table-column>
                                <el-table-column prop="download" label="下载数据"></el-table-column>
                            </el-table>
                        </div>
                        <div class="footer">
                            <span class="label">总下载量:</span>
                            <span class="value blue">68M</span>
                            <span class="label">/总上传量:</span>
                            <span class="value blue">6.8MB</span>
                            <span class="label">/累计终端:</span>
                            <span class="value blue">3</span>
                        </div>
                    </div>
                </div>

                <div id="bottom-right">
                    <div class="label m-l name">
                        <span>当前内存状态</span>
                        <i
                            style="font-size: 30px; margin-top: -7px; margin-left: 15px"
                            :class="openState[3] ? 'icon-haofangtuoiconfont_shaixuanzhedie iconfont pull-right' :  'icon-haofangtuoiconfont_shaixuanzhedieguanbi iconfont pull-right'"
                            @click="changeState(3)"
                        ></i>
                        <i
                            @click="refresh(3)"
                            style="font-weight: bold;"
                            class="iconfont pull-right icon-shuaxin"
                        ></i>
                    </div>
                    <div v-show="!openState[3]">
                        <div class="info">
                            <div class="args">
                                <div class="m-r">
                                    <span class="title">当前内存占用:</span>
                                    <span class="value green">28%</span>
                                </div>
                            </div>
                        </div>
                        <div id="bottom-right-chart"></div>
                        <div class="footer">
                            <span class="label">CPU核心数:</span>
                            <span class="value blue">4</span>
                            <span class="label">核心频率:</span>
                            <span class="value blue">880/Mhz</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            openState: [false, false, false, false],
            tableData3: [
                {
                    user: "xiaoming",
                    ip: "192.168.0.1",
                    mac: "00:11:22:33:44:55",
                    upload: "12.8MB",
                    download: "128MB"
                },
                {
                    user: "xiaoming",
                    ip: "192.168.0.1",
                    mac: "00:11:22:33:44:55",
                    upload: "12.8MB",
                    download: "128MB"
                }
            ]
        };
    },
    mounted() {
        let topLeft = echarts.init(document.getElementById("top-left-chart"));
        let bottomLeft = echarts.init(
            document.getElementById("bottom-left-chart")
        );
        let bottomRight = echarts.init(
            document.getElementById("bottom-right-chart")
        );

        const breakLineOptions = {
            xAxis: {
                show: false,
                type: "category",
                boundaryGap: false,
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            yAxis: {
                type: "value",
                show: false
            },
            grid: {
                left: "10px",
                right: 0,
                top: 0,
                bottom: "20px"
            },
            series: [
                {
                    data: [820, 1222, 777, 8, 932, 901, 934, 1290, 1330, 1320],
                    type: "line",
                    smooth: true,
                    areaStyle: {
                        normal: {
                            color: "#cce8fe",
                            type: "solid"
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#0098fe",
                            width: "3"
                        }
                    },
                    showSymbol: false
                }
            ]
        };

        topLeft.setOption(breakLineOptions);
        bottomLeft.setOption(breakLineOptions);
        bottomRight.setOption(breakLineOptions);
    },
    methods: {
        changeState(index) {
            this.openState.splice(index, 1, !this.openState[index]);
        },
        refresh(index) {
            console.log(index);
        }
    }
};
</script>

<style type="text/scss" lang="scss" scoped>
.chart {
    padding: 10px 20px 20px 20px;
    padding-bottom: 20px;
    box-sizing: border-box;
    background: white;
    overflow: hidden;

    .network-info,
    .router-info {
        padding: 8px;

        & > .title {
            font-size: 15px;
        }

        & > .content {
            box-sizing: border-box;
            background-color: #f2f2f2;
            margin-top: 5px;
            width: 100%;

            ul {
                display: flex;
                flex-flow: nowrap row;
                justify-content: space-between;
                padding: 5px;
            }

            .value {
                font-size: 13px;
                margin-bottom: 5px;
                background-color: #f2f2f2 !important;
            }

            .label {
                font-size: 10px;
                color: #d1d1d1;
                background-color: #f2f2f2 !important;
            }
        }
    }

    .chart-list {
        align-content: center;
        background: white;

        #top-left,
        #top-right,
        #bottom-left,
        #bottom-right {
            box-sizing: border-box;
            padding-right: 10px;

            .info {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                line-height: 25px;
                padding-left: 10px;

                .label {
                    font-size: 15px;
                }

                .args {
                    flex: 1;
                    padding-left: 25px;
                    font-size: 13px;
                    margin-top: 2px;
                    text-align: right;

                    & > div {
                        display: inline-block;
                    }
                }
            }
        }

        #top-left,
        #top-right {
            margin-bottom: 15px;
        }

        #top-left,
        #bottom-left {
            border-right: 2px solid #ebebeb;
        }

        #top-left-chart,
        #top-right-chart,
        #bottom-left-chart,
        #bottom-right-chart {
            height: 200px;
        }

        #top-right-chart {
            margin-left: 10px;
            margin-right: 10px;
            box-sizing: border-box;
        }

        .footer {
            height: 30px;
            line-height: 30px;
            background: #f2f2f2;
            font-size: 13px;
            padding-left: 10px;
            margin-left: 10px;
            box-sizing: border-box;
        }
    }
}

/deep/ th {
    padding-top: 10px;
    padding-bottom: 10px;
}

/deep/ td {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

.name {
    padding-bottom: 5px;
    border-bottom: 1px solid #0098fe;
}

.half {
    width: 50%;
}
</style>
