var lang_url = "../i18n/datatables-zh.lang"
if (g_lang === "zh") {
    lang_url = "../i18n/datatables-zh.lang"
} else {
    lang_url = ""
}

var allResources = {
    'wrongpass_reinput': {
        zh: '密码错误，请重新输入',
        en: 'Wrong password, please re-enter'
    },
    'check_network': {
        zh: '网络不通，请检查网络',
        en: 'The network is unreachable, please check the network.'
    },
    'connected': {
        zh: '已连接',
        en: 'Connected'
    },
    'disconnected': {
        zh: '未连接',
        en: 'Disconnected'
    },
    'mtu_setting_info': {
        zh: 'MTU配置错误！MTU值的范围是500~1500！',
        en: 'MTU configuration error! The MTU value ranges from 500 to 1500.'
    },
    'primary_dns_novalid': {
        zh: '主DNS服务器IP地址不合法！',
        en: 'The primary DNS server IP address is not valid!'
    },
    'secondary_dns_novalid': {
        zh: '辅DNS服务器IP地址不合法！',
        en: 'The secondary DNS server IP address is invalid!'
    },
    'user_name_pass_empty': {
        zh: '用户名和密码不能为空！',
        en: 'Username and password cannot be empty!'
    },
    'ipv4_empty': {
        zh: 'IPv4地址不能为空！',
        en: 'The IPv4 address cannot be empty!'
    },
    'subnet_empty': {
        zh: '子网掩码不能为空！',
        en: 'The subnet mask cannot be empty!'
    },
    'ipv4_novalid': {
        zh: 'IPv4地址不合法！',
        en: 'The IPv4 address is not legal!'
    },
    'custom_subnet_mask_novalid': {
        zh: '自定义的子网掩码不合法！',
        en: 'The custom subnet mask is not legal!'
    },
    'gateway_address_novalid': {
        zh: '网关地址不合法！',
        en: 'The gateway address is not legal!'
    },
    'ip_mask_empty': {
        zh: 'IP地址和子网掩码不能为空！',
        en: 'The IP address and subnet mask cannot be empty!'
    },
    'ip_novalid': {
        zh: 'IP地址不合法！',
        en: 'The IP address is not legal!'
    },
    'ip_mask_novalid': {
        zh: '子网掩码不合法！',
        en: 'The subnet mask is not legal!'
    },
    'ipv4_mask_novalid': {
        zh: 'IPv4子网掩码不合法！',
        en: 'The IPv4 subnet mask is not legal!'
    },
    'data_not_fully': {
        zh: '请完整配置所需数据！',
        en: 'Please fully configure the required data!'
    },
    'start_address_novalid': {
        zh: '起始地址IP不合法！',
        en: 'The starting address IP is not legal!'
    },
    'start_not_same_lan': {
        zh: '起始地址IP和LAN口IP地址不在同一个网段内！',
        en: 'The starting address IP and LAN port IP address are not in the same network segment!'
    },
    'end_address_novalid': {
        zh: '结束地址IP不合法！',
        en: 'End address IP is not legal!'
    },
    'end_not_same_lan': {
        zh: '结束地址IP和LAN口IP地址不在同一个网段内！',
        en: 'End address IP and LAN port IP address are not in the same network segment!'
    },
    'end_not_same_vlan': {
        zh: '结束地址IP和vlan接口IP不在同一个网段内！',
        en: 'End address IP and VLAN interface IP address are not in the same network segment!'
    },
    'end_less_start': {
        zh: '结束地址IP 小于 起始地址IP！请重新配置！',
        en: 'End address IP is less than start address IP! Please reconfigure!'
    },
    'lease_time_novalid': {
        zh: '租用时间配置错误，租用时间范围是5~720min！',
        en: 'The lease time is incorrectly configured. The lease time range is 5~720min!'
    },
    'custom_subnet_mask': {
        zh: '自定义子网掩码',
        en: 'Custom subnet mask'
    },
    'cannot_scan': {
        zh: '无法正常扫描！',
        en: 'Can\'t scan properly!'
    },
    'ssid_mac_not_empty': {
        zh: 'SSID和MAC不能同时为空！',
        en: 'SSID and MAC cannot be empty at the same time!'
    },
    'input_passwd': {
        zh: '请输入密码！',
        en: 'Please enter your password!'
    },
    'conf_all': {
        zh: '请完整配置所有数据！',
        en: 'Please configure all data completely!'
    },
    'on': {
        zh: '开',
        en: 'on'
    },
    'off': {
        zh: '关',
        en: 'off'
    },
    'modify': {
        zh: '修改',
        en: 'modify'
    },
    'delete': {
        zh: '删除',
        en: 'delete'
    },
    'donot_del_if': {
        zh: '接口已被绑定！禁止删除！',
        en: 'The interface has been bound! Do not delete!'
    },
    'del_suc_wait': {
        zh: '删除成功,请等待系统配置！',
        en: 'The deletion is successful, please wait for the system configuration!'
    },
    'dhcp_opt_novalid': {
        zh: 'DHCP-OPTION 数据格式不正确！',
        en: 'The DHCP-OPTION data format is incorrect!'
    },
    'vlanid_empty': {
        zh: 'vlanId不能为空！',
        en: 'vlanId can\'t be empty!'
    },
    'vlanid_novalid': {
        zh: 'vlanId值的范围是3~4094！',
        en: 'The range of vlanId values is 3~4094!'
    },
    'vlanid_exist': {
        zh: 'valnId已存在！',
        en: 'valnId already exists!'
    },
    'ipv4_mask_empty': {
        zh: 'ipv4地址和ipv4子网掩码不能为空！',
        en: 'The ipv4 address and ipv4 subnet mask cannot be empty!'
    },
    'end_less_start': {
        zh: '结束地址IP小于起始地址IP！请重新配置！',
        en: 'End address IP is less than start address IP! Please reconfigure!'
    },
    'add_succ_wait': {
        zh: '添加成功，等待系统配置！',
        en: 'Added successfully, waiting for system configuration!'
    },
    'please_choose': {
        zh: '请选择',
        en: 'please choose'
    },
    'name_novalid': {
        zh: '名字只能由字母和数字组成！',
        en: 'The name can only consist of letters and numbers!'
    },
    'name_exist': {
        zh: '名字已存在，请不要重复配置！',
        en: 'The name already exists, please do not repeat the configuration!'
    },
    'external_port_err1': {
        zh: '外部端口号配置错误，端口配置范围是1~65535！',
        en: 'The external port number is incorrectly configured. The port configuration range is 1~65535!'
    },
    'external_port_err2': {
        zh: '外部端口号配置错误！',
        en: 'The external port number is incorrectly configured!'
    },
    'external_port_err3': {
        zh: '外部端口段配置错误！',
        en: 'The external port segment is incorrectly configured!'
    },
    'internal_port_err1': {
        zh: '内部端口号配置错误，端口配置范围是1~65535！',
        en: 'The internal port number is incorrectly configured. The port configuration range is 1~65535!'
    },
    'internal_port_err2': {
        zh: '内部端口号配置错误！',
        en: 'Internal port number configuration error!'
    },
    'internal_port_err3': {
        zh: '内部端口段配置错误！',
        en: 'Internal port segment configuration error!'
    },
    'port_err1': {
        zh: '请输入正确的端口范围，端口配置范围是1~65535！',
        en: 'Please enter the correct port range, the port configuration range is 1~65535!'
    },
    'internal_ipaddr_novalid': {
        zh: '内部IP地址不合法！',
        en: 'The internal IP address is not legal!'
    },
    'forbid': {
        zh: '禁止',
        en: 'forbid'
    },
    'allow': {
        zh: '允许',
        en: 'allow'
    },
    'the': {
        zh: '第',
        en: 'The '
    },
    'ge': {
        zh: '个',
        en: ' '
    },
    'illegal': {
        zh: '非法！',
        en: ' is illegal!'
    },
    'seg': {
        zh: '段',
        en: 'segment'
    },
    'null': {
        zh: '为空！',
        en: 'is null!'
    },
    'noninteger': {
        zh: '非整数！',
        en: 'non-integer!'
    },
    'greater1': {
        zh: '非法,需大于1！',
        en: ' is illegal, should be greater than 1!'
    },
    'ip_dup': {
        zh: '存在重复的IP！',
        en: 'There are duplicate IPs!'
    },
    'toenable': {
        zh: '开启',
        en: 'Enable'
    },
    'disable': {
        zh: '关闭',
        en: 'Disable'
    },
    'rts_thre': {
        zh: 'RTS门限',
        en: 'RTS threshold'
    },
    'frame_seg_thre': {
        zh: '报文分段门限',
        en: 'Frame segmentation threshold'
    },
    'beacon_interval': {
        zh: 'Beacon帧间隔',
        en: 'Beacon frame interval'
    },
    'dtim_interval': {
        zh: 'DTIM间隔',
        en: 'DTIM interval'
    },
    'preamble': {
        zh: '前导码',
        en: 'Preamble'
    },
    'config_set_wait': {
        zh: '系统配置中，请稍候...',
        en: 'Please wait while the system is configured...'
    },
    'relogin': {
        zh: '您的登录已超时, 请点确定后重新登录!',
        en: 'Your login has expired, please click OK and login again!'
    },
    'at_least_select_one_11bga': {
        zh: '11bga速率集至少选中一项。',
        en: 'At least one item in the 11bga rate set.'
    },
    'at_least_select_one_11n': {
        zh: '11n速率集至少选中一项。',
        en: 'At least one item in the 11n rate set.'
    },
    'no_modify_any_configuration': {
        zh: '没有修改任何配置。',
        en: 'Without modifying configuration.'
    },
    'band_steering_nochange': {
        zh: '频段切换模式未改变',
        en: 'Band steering has not changed'
    },
    'choose_if': {
        zh: '请选择接口！',
        en: 'Please select the interface!'
    },
    'goal_empty': {
        zh: '目标不能为空！',
        en: 'The goal cannot be empty!'
    },
    'subnet_empty': {
        zh: '子网掩码不能为空！',
        en: 'The subnet mask cannot be empty!'
    },
    'gateway_not_empty': {
        zh: 'ipv4网关不能为空！',
        en: 'The gateway cannot be empty!'
    },
    'target_invalid': {
        zh: '目标IP不合法！',
        en: 'Target IP address is invalid!'
    },
    'netmask_invalid': {
        zh: 'ipv4子网掩码不合法！',
        en: 'Netmask is invalid!'
    },
    'gateway_invalid': {
        zh: 'ipv4网关IP不合法！',
        en: 'Gateway is invalid!'
    },
    'network_ne2_netmask': {
        zh: '网络与掩码不符！',
        en: 'Network is not match netmask!'
    },
    'mtu_novalid': {
        zh: 'mtu配置错误,mtu配置范围是500~1500！',
        en: 'Mtu configuration error, mtu configuration range is 500~1500!'
    },
    'passwd_empty': {
        zh: '密码不能设为空！',
        en: 'Password cannot be set to empty!'
    },
    'passwd_len_less': {
        zh: '密码长度少于5位，请重新输入！',
        en: 'Password length is less than 5 bits, please re input!'
    },
    'passwd_len_more': {
        zh: '密码长度大于9位，请重新输入！',
        en: 'Password length is greater than 9 bits. Please re-enter.'
    },
    'passwd_illegal': {
        zh: '密码含有非法字符，请重新输入！',
        en: 'Password contains illegal characters. Please re-enter!'
    },
    'confirm_passwd': {
        zh: '请确认密码！',
        en: 'Please confirm your password!'
    },
    'passwd_novalid': {
        zh: '两次输入密码不一致！',
        en: 'The two passwords are inconsistent!'
    },
    'apply_success': {
        zh: '修改成功',
        en: 'Apply Successfully'
    },
    'apply_fail': {
        zh: '应用失败',
        en: 'Apply failed.'
    },
    'contrl_switch_no_change': {
        zh: '控制开关均未改变',
        en: 'Control switches have not changed.'
    },
    'timezone_empty_tips': {
        zh: '时区不能为空',
        en: 'Time zone can not be empty'
    },
    'no_config_changes': {
        zh: '没有修改配置!',
        en: 'Configuration has not changed!'
    },
    'upgrade_err2': {
        zh: '版本文件上传成功，是否确认升级？',
        en: 'The version file was successfully uploaded. Do you confirm the upgrade?'
    },
    'upgrade_err3': {
        zh: '请选择文件升级！',
        en: 'Please choose a file upgrade!'
    },
    'upgrade_err4': {
        zh: '版本文件有误，请上传正确的文件！',
        en: 'The version file is incorrect. Please upload the correct file!'
    },
    'upgrade_err5': {
        zh: '请选择备份文件！',
        en: 'Please choose a backup file!'
    },
    'upgrade_err6': {
        zh: '配置文件上传成功，是否确认恢复？',
        en: 'The configuration file is uploaded successfully. Is the recovery confirmed?'
    },
    'upgrade_err7': {
        zh: '配置文件有误，请上传正确的文件！',
        en: 'The configuration file is incorrect. Please upload the correct file!'
    },
    'reboot_err1': {
        zh: '是否确认恢复出厂设置？',
        en: 'Are you sure to restore the factory settings?'
    },
    'reboot_err2': {
        zh: '是否确认重启设备？',
        en: 'Do you want to confirm restarting the device?'
    },
    'netJudge_alert3': {
        zh: '指定的地址错误或网络未连接！',
        en: 'The specified address is incorrect or the network is not connected!'
    },
    'exit_ornot': {
        zh: '是否确定退出后台管理系统？',
        en: 'Exit the system or not?'
    },
    'cpu_usage': {
        zh: '内存使用 - ',
        en: 'CPU usage - '
    },
    'mem_usage': {
        zh: '内存使用 - ',
        en: 'Memory usage - '
    },
    'key': {
        zh: 'tmp',
        en: 'tmp'
    },



};

var lang = 'en';
var key = "TMP:001";
var defval = "N/A";

function lang_alert(key) {
    var resource = allResources[key];
    if (resource) {
        var replacer = resource[g_lang];
        if (!replacer) {
            replacer = defval;
        }
    } else {
        replacer = defval;
    }

    alert(replacer);
}

function lang_reboot(key) {
    var resource = allResources[key];
    if (resource) {
        var replacer = resource[g_lang];
        if (!replacer) {
            replacer = defval;
        }
    } else {
        replacer = defval;
    }

    reboot(replacer);
}
