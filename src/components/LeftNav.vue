<template>
  <el-menu
    :default-active="defaultActive"
    class="leftnav"
    backgroundColor="#001525"
    text-color="#fff"
    :unique-opened="true"
    active-text-color="#1585ff"
  >
    <div
      v-for="items in routerList"
      :key="items.name"
    >
      <el-menu-item
        class="first-level"
        v-if="!items.children"
        :index="items.index"
        @click.native="jumpTo(items.path)"
      >
        <i :class="items.icon"></i>
        <span
          class="title"
          slot="title"
        >{{items.name}}</span>
      </el-menu-item>

      <el-submenu
        :index="items.index"
        v-if="!!items.children && !!items.children.length"
      >
        <template slot="title">
          <i :class="items.icon"></i>
          <span class="title">{{items.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            class="second-level"
            v-for="item in items.children"
            @click.native="jumpTo(item.path)"
            :key="item.index"
            :index="item.index"
          >
            <span
              class="title"
              slot="title"
            >{{item.name}}</span>
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
          icon: "icon iconfont icon-xitongjiankong",
          index: "1",
          name: "系统监控",
          path: "/htmls/overview"
        },
        {
          icon: "icon iconfont icon-wangluopeizhi",
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
              index: "2-5",
              name: "VLAN配置",
              path: "/htmls/vlanInf"
            },
            {
              index: "2-6",
              name: "端口映射",
              path: "/htmls/virtualServer"
            },
            {
              index: "2-7",
              name: "动态域名",
              path: "/htmls/wlan"
            }
          ]
        },
        {
          icon: "icon iconfont icon-wuxianpeizhi",
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
          icon: "icon iconfont icon-yonghuguanli",
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
          icon: "icon iconfont icon-xitongpeizhi",
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
              name: "时钟管理",
              path: "/htmls/basicSet"
            },
            {
              index: "5-3",
              name: "系统维护",
              path: "/htmls/systemMaintenance"
            },
            {
              index: "5-4",
              name: "计划任务",
              path: "/htmls/workMode"
            }
          ]
        },
        {
          icon: "el-icon-menu",
          index: "6",
          name: "引导",
          children: [
            {
              index: "6-1",
              name: "密码修改",
              path: "/htmls/workMode"
            },
            {
              index: "6-2",
              name: "工作模式",
              path: "/htmls/workMode"
            },
            {
              index: "6-3",
              name: "外网配置",
              path: "/htmls/workMode"
            },
            {
              index: "6-4",
              name: "无线配置",
              path: "/htmls/workMode"
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
  width: 300px;
  float: left;
  height: 100%;
  overflow: auto;

  .title {
    font-size: 13px;
    letter-spacing: 2px;
  }

  .is-active {
    background: #1585ff !important;
    > span {
      color: white;
    }
  }

  /deep/ .el-submenu__title {
    height: 40px;
    line-height: 40px;
    color: white;
  }

  .icon {
    font-size: 18px;
    margin-right: 7px;
    font-weight: bold;
    display: inline-block;
    color: white;
    vertical-align: -2px;
    margin-left: 3px;
  }

  .first-level {
    height: 40px;
    line-height: 40px;

    &:hover {
      color: #1585ff !important;
    }
  }

  .second-level {
    height: 40px;
    line-height: 40px;
    padding-left: 50px !important;
    min-width: auto;
    color: white !important;

    &:hover {
      color: #1585ff !important;
    }
  }
}
</style>
