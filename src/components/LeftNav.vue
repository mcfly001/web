<template>
  <el-menu
    default-active="2"
    class="leftnav"
    backgroundColor="#303133"
    background-color="#545c64"
    text-color="#fff"
    unique-opened="true"
    active-text-color="#ffd04b"
  >
    <div
      v-for="items in routerList"
      :key="items.name"
    >
      <el-menu-item
        v-if="!items.children"
        :index="items.index"
        @click.native="jumpTo(items.path)"
      >
        <i :class="items.icon"></i>
        <span slot="title">{{items.name}}</span>
      </el-menu-item>

      <el-submenu
        :index="items.index"
        v-if="!!items.children && !!items.children.length"
      >
        <template slot="title">
          <i :class="items.icon"></i>
          <span>{{items.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="item in items.children"
            @click.native="jumpTo(item.path)"
            :key="item.index"
            :index="item.index"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
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
      routerList: [
        {
          icon: "el-icon-location",
          index: "1",
          name: "系统监控",
          path: "/htmls/overview"
        },
        {
          icon: "el-icon-menu",
          index: "2",
          name: "网络配置",
          children: [
            {
              icon: "el-icon-menu",
              index: "2-1",
              name: "工作模式",
              path: "/htmls/workMode"
            },
            {
              icon: "el-icon-menu",
              index: "2-2",
              name: "外网配置",
              path: "/htmls/wanSet"
            },
            {
              icon: "el-icon-menu",
              index: "2-3",
              name: "内网配置",
              path: "/htmls/lanSet"
            },
            {
              icon: "el-icon-menu",
              index: "2-4",
              name: "DHCP服务",
              path: "/htmls/dhcpSet"
            },
            {
              icon: "el-icon-menu",
              index: "2-5",
              name: "VLAN配置",
              path: "/htmls/vlanInf"
            },
            {
              icon: "el-icon-menu",
              index: "2-6",
              name: "端口映射",
              path: "/htmls/virtualServer"
            },
            {
              icon: "el-icon-menu",
              index: "2-7",
              name: "动态域名",
              path: "/htmls/wlan"
            }
          ]
        },
        {
          icon: "el-icon-menu",
          index: "3",
          name: "无线配置",
          children: [
            {
              icon: "el-icon-menu",
              index: "3-1",
              name: "网络名称",
              path: "/htmls/wlan"
            },
            {
              icon: "el-icon-menu",
              index: "3-2",
              name: "射频配置",
              path: "/htmls/radio"
            }
          ]
        },
        {
          icon: "el-icon-menu",
          index: "4",
          name: "用户管理",
          children: [
            {
              icon: "el-icon-menu",
              index: "4-1",
              name: "用户状态",
              path: "/htmls/stalist"
            },
            {
              icon: "el-icon-menu",
              index: "4-2",
              name: "黑名单",
              path: "/htmls/blacklist"
            }
          ]
        },
        {
          icon: "el-icon-menu",
          index: "5",
          name: "系统配置",
          children: [
            {
              icon: "el-icon-menu",
              index: "5-1",
              name: "网管策略",
              path: "/htmls/managementStrategy"
            },
            {
              icon: "el-icon-menu",
              index: "5-2",
              name: "时钟管理",
              path: "/htmls/basicSet"
            },
            {
              icon: "el-icon-menu",
              index: "5-3",
              name: "系统维护",
              path: "/htmls/systemMaintenance"
            },
            {
              icon: "el-icon-menu",
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
              icon: "el-icon-menu",
              index: "6-1",
              name: "密码修改",
              path: "/htmls/workMode"
            },
            {
              icon: "el-icon-menu",
              index: "6-2",
              name: "工作模式",
              path: "/htmls/workMode"
            },
            {
              icon: "el-icon-menu",
              index: "6-3",
              name: "外网配置",
              path: "/htmls/workMode"
            },
            {
              icon: "el-icon-menu",
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

<style scoped>
.leftnav {
  width: 250px;
  float: left;
  height: 100%;
  overflow: auto;
}
</style>
