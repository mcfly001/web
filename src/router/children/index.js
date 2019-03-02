export default [{
        path: '',
        redirect: 'overview',
    },
    {
        path: 'overview',
        name: 'overview',
        meta: {
            title: '系统监控',
        },
        component: () => import(`../../views/content/overview.vue`),
    },
    {
        path: 'workMode',
        name: 'workMode',
        meta: {
            title: '工作模式',
        },
        component: () => import(`../../views/content/workMode.vue`),
    },
    {
        path: 'wanSet',
        name: 'wanSet',
        meta: {
            title: '外网配置',
        },
        component: () => import(`../../views/content/wanSet.vue`),
    },
    {
        path: 'lanSet',
        name: 'lanSet',
        meta: {
            title: '内网配置',
        },
        component: () => import(`../../views/content/lanSet/index.vue`),
    },
    {
        path: 'dhcpSet',
        name: 'dhcpSet',
        meta: {
            title: 'DHCP服务',
        },
        component: () => import(`../../views/content/dhcpSet.vue`),
    },
    {
        path: 'virtualServer',
        name: 'virtualServer',
        meta: {
            title: '端口映射',
        },
        component: () => import(`../../views/content/virtualServer.vue`),
    },
    {
        path: 'dynamicDns',
        name: 'dynamicDns',
        meta: {
            title: '动态域名',
        },
        component: () => import(`../../views/content/dynamicDns.vue`),
    },
    {
        path: 'wlan',
        name: 'wlan',
        meta: {
            title: '网络名称',
        },
        component: () => import(`../../views/content/wlan/index.vue`),
    },
    {
        path: 'radio',
        name: 'radio',
        meta: {
            title: '射频配置',
        },
        component: () => import(`../../views/content/radio.vue`),
    },
    {
        path: 'stalist',
        name: 'stalist',
        meta: {
            title: '用户状态',
        },
        component: () => import(`../../views/content/stalist.vue`),
    },
    {
        path: 'blacklist',
        name: 'blacklist',
        meta: {
            title: '黑名单',
        },
        component: () => import(`../../views/content/blacklist.vue`),
    },
    {
        path: 'managementStrategy',
        name: 'managementStrategy',
        meta: {
            title: '网管策略',
        },
        component: () => import(`../../views/content/managementStrategy.vue`),
    },
    {
        path: 'basicSet',
        name: 'basicSet',
        meta: {
            title: '时间设置',
        },
        component: () => import(`../../views/content/basicSet.vue`),
    },
    {
        path: 'systemUp',
        name: 'systemUp',
        meta: {
            title: '系统维护',
        },
        component: () => import(`../../views/content/systemUp.vue`),
    },
    {
        path: 'scheduletask',
        name: 'scheduletask',
        meta: {
            title: '计划任务',
        },
        component: () => import(`../../views/content/scheduletask.vue`),
    }
];