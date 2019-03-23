<template>
    <el-menu
        :default-active="defaultActive"
        class="leftnav"
        background="linear-gradient(to bottom, #eff0f5 30%, #eff0f5 100%);"
        text-color="#333"
        :unique-opened="true"
        active-text-color="#096ed2"
    >
        <div v-for="items in routerList" :key="items.name">
            <el-menu-item
                class="first-level"
                v-if="!items.children"
                :index="items.index"
                @click.native="jumpTo(items.path)"
            >
                <i :class="items.icon"></i>
                <span class="title" slot="title">{{items.name}}</span>
            </el-menu-item>

            <el-submenu :index="items.index" v-if="!!items.children && !!items.children.length">
                <template slot="title">
                    <i :class="items.icon"></i>
                    <span class="title">{{ items.name }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item
                        class="second-level"
                        v-for="item in items.children"
                        @click.native="jumpTo(item.path)"
                        :key="item.index"
                        :index="item.index"
                    >
                        <span class="title" slot="title">{{item.name}}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </div>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            defaultActive: "1",
            routerList: [
                {
                    icon: "icon icon1",
                    index: "1",
                    name: "系统监控",
                    path: "/htmls/overview"
                },
                {
                    icon: "icon icon2",
                    index: "2",
                    name: "网络配置",
                    children: [
                        {
                            index: "2-1",
                            name: "工作模式",
                            path: "/htmls/workMode"
                        },
                        {
                            index: "2-2",
                            name: "外网配置",
                            path: "/htmls/wanSet"
                        },
                        {
                            index: "2-3",
                            name: "内网配置",
                            path: "/htmls/lanSet"
                        },
                        {
                            index: "2-4",
                            name: "DHCP服务",
                            path: "/htmls/dhcpSet"
                        },
                        {
                            index: "2-6",
                            name: "端口映射",
                            path: "/htmls/virtualServer"
                        },
                        {
                            index: "2-7",
                            name: "动态域名",
                            path: "/htmls/dynamicDns"
                        }
                    ]
                },
                {
                    icon: "icon icon3",
                    index: "3",
                    name: "无线配置",
                    children: [
                        {
                            index: "3-1",
                            name: "网络名称",
                            path: "/htmls/wlan"
                        },
                        {
                            index: "3-2",
                            name: "射频配置",
                            path: "/htmls/radio"
                        }
                    ]
                },
                {
                    icon: "icon icon4",
                    index: "4",
                    name: "用户管理",
                    children: [
                        {
                            index: "4-1",
                            name: "用户状态",
                            path: "/htmls/stalist"
                        },
                        {
                            index: "4-2",
                            name: "黑名单",
                            path: "/htmls/blacklist"
                        }
                    ]
                },
                {
                    icon: "icon icon5",
                    index: "5",
                    name: "系统配置",
                    children: [
                        {
                            index: "5-1",
                            name: "网管策略",
                            path: "/htmls/managementStrategy"
                        },
                        {
                            index: "5-2",
                            name: "时间设置",
                            path: "/htmls/basicSet"
                        },
                        {
                            index: "5-3",
                            name: "系统维护",
                            path: "/htmls/systemUp"
                        },
                        {
                            index: "5-4",
                            name: "计划任务",
                            path: "/htmls/scheduletask"
                        }
                    ]
                },
                {
                    icon: "icon icon6",
                    index: "6",
                    name: "引导",
                    children: [
                        {
                            index: "6-1",
                            name: "密码修改",
                            path: "/changepassword"
                        },
                        {
                            index: "6-2",
                            name: "工作模式",
                            path: "/htmls/workMode"
                        },
                        {
                            index: "6-3",
                            name: "外网配置",
                            path: "/outnetset"
                        },
                        {
                            index: "6-4",
                            name: "无线配置",
                            path: "/wireconfig"
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        jumpTo(path) {
            this.$router.push({
                path: path
            });
        }
    }
};
</script>

<style type="text/scss" lang="scss" scoped>
.leftnav {
    width: 170px;
    float: left;
    height: 100%;
    overflow: auto;
    background: #eff0f5;
    padding: 0 5px;
    font-weight: bold;

    .title {
        font-size: 12px;
        letter-spacing: 2px;
    }

    .is-active {
        > span {
            color: #096ed2 !important;
        }
    }

    /deep/ .el-submenu__title {
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #c0d4f5;
    }

    .icon {
        font-size: 18px;
        margin-right: 7px;
        font-weight: bold;
        display: inline-block;
        vertical-align: -2px;
        margin-left: 3px;
    }

    .first-level {
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
        border-bottom: 1px solid #c0d4f5;
    }

    .second-level {
        height: 30px;
        line-height: 30px;
        padding-left: 50px !important;
        min-width: auto;
        border-bottom: 1px solid #c8c8c8;
        background: #e9e9e9;

        &:hover {
            color: #096ed2 !important;
        }
    }

    /deep/ .el-menu-item-group__title {
        padding: 0;
    }
}

.icon {
    width: 16px;
    height: 16px;
    background-size: cover;
    background: url("../../static/icon.png");
    display: inline-block;
    vertical-align: middle;
}

.icon1 {
    background-position: -16px;
}

.icon2 {
    background-position: -32px;
}

.icon3 {
    background-position: -48px;
}

.icon4 {
    background-position: -80px;
}

.icon5 {
    background-position: -176px;
}

.icon6 {
    background-position: -160px;
}
</style>
