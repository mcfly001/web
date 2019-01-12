var max_wlan = 16
var wlan_name = "ath"
function Wlan() {
    this.wlan_name="ath00";
    this.ssid="Smart-WiFi";
    this.radioid=2;
    this.code_type="GB2312";
    this.hidden=0;
    this.auth_mode=33;
    this.chiphers=6;
    this.keytype=0;
    this.keynum=1;
    this.ssid_pwd="";
    this.auth_server="";
    this.auth_port=1812;
    this.auth_secret="";
    this.acct_server="";
    this.acct_port=1813;
    this.acct_secret="";
    this.vlan="lan";
    this.maxsta=64;
    this.maxtfdown=0;
    this.maxtfup=0;
    this.stamaxtfdown=0;
    this.stamaxtfup=0;
    this.mcastenhance=4;
    this.me_length=32;
    this.metimeout=120000;
    this.metimeout1=120000;
    this.isolate=0;
    this.wmm=1;
    this.wds=0;
    this.disabled=0;
    this.macfilter=0;
    this.maclist="";
}

//对象元素计数
function count(o){
    var t = typeof o;
    if(t == 'string'){
        return o.length;
    }else if(t == 'object'){
        var n = 0;
        for(var i in o){
            n++;
        }
        return n;
    }
    return false;
}

//获取当前所有配置项的值
function get_cur_wlan_data_and_check(wlan) {
	wlan.radioid=$("#radioid").val();
    wlan.wlan_name=$("#wlan_name").val();
    //2G+5G时，wlan_name值格式为ath00/ath16
    if (action == "add") {
        wlan.wlan_name=find_unuse_wlan_name_by_radioid(wlan.radioid)
        if(wlan.wlan_name == "none"){
            alert("已达到SSID个数上限，无法创建！")
            return false
        }
    }

	wlan.ssid=$("#ssid").val();
	wlan.code_type=$("#code_type").val();
	if (!ssid_check(wlan.ssid, wlan.code_type)){
		return false;
	}

	if ($("#hidden").is(':checked') == true){
        wlan.hidden = 1;
    } else {
        wlan.hidden = 0;
    }

	wlan.auth_mode=$("#auth_mode").val();
	wlan.chiphers=$("#chiphers").val();
	wlan.keytype=$("input:radio[name='keytype']:checked").val();; 
	wlan.keynum=$("#keynum").val();
	wlan.ssid_pwd=$("#ssid_pwd").val();
	if(!check_pwd(wlan.auth_mode, wlan.chiphers, wlan.keytype, wlan.ssid_pwd)){
		return false;
	}

	wlan.auth_server=$("#auth_server").val();
	wlan.auth_port=$("#auth_port").val();
	wlan.auth_secret=$("#auth_secret").val();
	wlan.acct_server=$("#acct_server").val();
	wlan.acct_port=$("#acct_port").val();
	wlan.acct_secret=$("#acct_secret").val();

	if(wlan.auth_mode == 4 || wlan.auth_mode == 8){
        if(!ip_check("RADIUS服务器地址", wlan.auth_server)){
            return false;
        }
        if(!num_check("RADIUS服务器端口", wlan.auth_port, 1, 65535)){
            return false;
        }
        if(!ascii_check_tips("RADIUS服务器密钥", wlan.auth_secret)){
            return false;
        }

        if(!ip_check("RADIUS计费服务器地址", wlan.acct_server)){
            return false;
        }

        if(!num_check("RADIUS计费服务器端口", wlan.acct_port, 1, 65535)){
            return false;
        }

        if(!ascii_check_tips("RADIUS计费服务器密钥", wlan.acct_secret)){
            return false;
        }
    }

	wlan.vlan=$("#vlan_interface").val();

	wlan.maxsta=$("#maxsta").val();
    if(!num_check("最大用户数", wlan.maxsta, 1, 128)){
        return false;
    }

    wlan.stamaxtfdown=$("#stamaxtfdown").val();
    wlan.stamaxtfup=$("#stamaxtfup").val();
	wlan.maxtfdown=$("#maxtfdown").val();
	wlan.maxtfup=$("#maxtfup").val();
    if(!num_check("STA下行", wlan.stamaxtfdown, 0, 1048576)){
        return false;
    }
    if(!num_check("STA上行", wlan.stamaxtfup, 0, 1048576)){
        return false;
    }
    if(!num_check("SSID下行", wlan.maxtfdown, 0, 1048576)){
        return false;
    }
    if(!num_check("SSID上行", wlan.maxtfup, 0, 1048576)){
        return false;
    }

    wlan.mcastenhance=$("#mcastenhance").val();
    wlan.me_length=$("#me_length").val();
    wlan.metimeout=$("#metimeout").val();
    if(wlan.mcastenhance == 2){
        if(!num_check("组播最大终端数", wlan.me_length, 1, 64)){
            return false;
        }
        if(!num_check("组播超时时间", wlan.metimeout, 10, 600)){
            return false;
        }

        //s转换成ms
        wlan.metimeout = wlan.metimeout*1000;
    }
    //关闭状态时，如果数值非法，则设置为默认值，防止非法值写入配置文件
    else{
        if(!num_check_notips("组播最大终端数", wlan.me_length, 1, 64, 0)){
            wlan.me_length = 32;
        }
        if(!num_check_notips("组播超时时间", wlan.metimeout, 10, 600, 0)){
            wlan.metimeout = 120*1000;
        }
    }

	wlan.isolate=$("#isolate").val();
	wlan.wmm=$("#wmm").val();
	wlan.wds=$("#wds").val();
	wlan.disabled=$("#disabled").val();
	wlan.macfilter=$("#macfilter").val();
	
	wlan.maclist="";
	var maclist = $("#maclist input");
	len = maclist.length
    for (var i = 0; i < len; i++) {
		if(maclist[i].value != ""){
            if(!mac_check(maclist[i].value)){
                alert(maclist[i].value + " MAC地址不合法！");
                return false;
            }
            if(i != 0){
                wlan.maclist += ","
            }
            wlan.maclist = wlan.maclist + maclist[i].value.toLowerCase();
        }
    }

    //mac重复检查
    for (var i = 0; i < len; i++) {
        if(maclist[i].value != ""){
            for(var j = i+1; j < len; j++) {
                if (maclist[i].value.toLowerCase() == maclist[j].value.toLowerCase()) {
                    alert(maclist[i].value + " MAC地址重复！");
                    return false;
                }
            }
        }
    }

	return true
}

//找出未使用的wlan_name
function find_unuse_wlan_name(radioid) {
	var i = 0;
	var j = 0;
	var len = real_data.length;
    if(typeof(len)=="undefined"){
	    len = 0
    }

	var wlan_name = ""
	var pre_name = "ath0";
	if(radioid == 1)
		pre_name = "ath1";

	for(i = 0; i < max_wlan; i++) {
		wlan_name = pre_name + i;
	    for(j=0; j<len; j++){
	        if(real_data[j].radioid == radioid
	        && real_data[j].wlan_name == wlan_name){
	            break;
	        }
	    }

	    if (j == len) {
	    	return wlan_name
	    }		
	}

	if (i == max_wlan) {
		return "none"
	}
}

function find_unuse_wlan_name_by_radioid(radioid) {
    var ret = ""
    var wlan_name = ""
    if(radioid == 2){
        for(i=0; i<2; i++){
            ret = find_unuse_wlan_name(i)
            if(ret == "none"){
                return "none"
            }else{
                wlan_name += ret
                if(i == 0){
                    wlan_name += "/"
                }
            }
        }
    }else{
        ret = find_unuse_wlan_name(radioid)
        if(ret == "none"){
            return "none"
        }else{
            wlan_name += ret
        }
    }

    return wlan_name
}

//删除wlan
function del_ssid(wlan){
    req_url = "../cgi-bin/wireless_wlan.lua?action=" + action
        +"&wlan_name=" + wlan.wlan_name
        + url_time;
    check_code0(req_url);
}

//数据合法性校验

//ssid校验：
//1. 字符输入限制
//2. 长度限制
function ssid_check(ssid, code_type)
{
    var len = 0;
    for (var i = 0; i < ssid.length; i++) 
    {   
        //字符合法输入判断
        if (ssid.charAt(i).match(/[\w\s\u4E00-\u9FA5\[\]?\.\/\\,=\-_{}:^!@~，。、；‘’【】{}：“”《》？]/g) == null)
        {
            alert("SSID名称含有非法字符！");
            return false;
        }
        //判断是否是中文字符
        if (ssid.charAt(i).match(/[\u4E00-\u9FA5]|[，。、；‘’【】{}：“”《》？]/g) != null) //全角 
        {
            if(0 == code_type) 
                len += 2; //如果是中文字符，且为GB2312,则占用两个字节
            else if(1 == code_type)
                len += 3; //UTF-8的中文字符
        }
        else
            len += 1; //英文占用一个字节
    }
    if (len > 32)
    {
        alert("SSID名称超过最大长度，请重新命名！");
        return false;
    }
    return true;
}

//无线密码校验：
//1. WEP密码校验
//2. PSK密码校验

//ascii字符校验
function ascii_check(str){
    if (!/^[\x00-\xff]+$/.test(str)) {
        return false;
    }

    return true;
}

function ascii_check_tips(describe, str){
    //密码不能为空
    if(str == "")
    {
        alert(describe + "不能为空！");
        return false;
    }

    if(!ascii_check(str)){
        alert(describe + "密码不合法，请重新输入！")
        return false;
    }

    return true;
}

function check_pwd(auth_mode, chiphers, keytype, ssid_pwd)
{
    if(auth_mode == 0){
        return true;
    }

    //WEP
    if (auth_mode == 1) {
    	ret = check_wep_pwd(chiphers, keytype, ssid_pwd)
        if (!ret){
    	    return false
        }
    }
    //WPA EAP
    else if (auth_mode == 4 || auth_mode == 8) {

    }
    //WPA PSK
    else if (auth_mode == 16 || auth_mode == 32 || auth_mode == 33) {
    	ret = check_wpa_psk(ssid_pwd)
        if (!ret){
            return false
        }
    }

    return true;
}

//wep密码检查
function check_length(chiphers, keytype, ssid_pwd)
{
    if (ssid_pwd.length == 0)
    {
    	alert("密码不能为空！");
    	return false;
    }

    if (chiphers == 1)  //64位
    {
        if (keytype == 0) //ASCII
        {
            if (ssid_pwd.length != 5)
            {
                alert("密码长度应为5位！");
                return false;
            }
        }
        else   // 16
        {
            if (ssid_pwd.length != 10)
            {
                alert("密码长度应为10位！");
                return false;
            }
        }
    }
    else if (chiphers == 2)  //128位
    {
        if (keytype == 0) //ASCII
        {
            if (ssid_pwd.length != 13)
            {
                alert("密码长度应为13位！");
                return false;
            }
        }
        else   // 16
        {
            if (ssid_pwd.length != 26)
            {
                alert("密码长度应为26位！");
                return false;
            }
        }
    }
    else if (chiphers == 3)  //152位
    {
        if (keytype == 0) //ASCII
        {
            if (ssid_pwd.length != 16)
            {
                alert("密码长度应为16位！");
                return false;
            }
        }
        else   // 16
        {
            if (ssid_pwd.length != 32)
            {
                alert("密码长度应为32位！");
                return false;
            }
        }
    }
    else
    {
        return false;
    }
    
    return true;
}

function check_16(ssid_pwd)
{
    var len = ssid_pwd.length;
    for (i=0; i<len; i++)   // 检测是否十六进制数
    {
        var tmp_str="0123456789abcdefABCDEF";
        var j=tmp_str.indexOf(ssid_pwd.charAt(i));
        if (j==-1)
        {
            alert("密码不合法，请重新输入！");
            return false;
        }
    }

    return true;
}

function check_wep_pwd(chiphers, keytype, ssid_pwd)
{
    if (!check_length(chiphers, keytype, ssid_pwd))
    {
        return false;
    }

    if (keytype == 0)
    {
    	if(!ascii_check(ssid_pwd)){
            alert("密码不合法，请重新输入！")
            return false;
        }
    }
    else
    {
        if(!check_16(ssid_pwd))
            return false;
    }

    return true;
}

//EAP加密检查
function check_wpa_eap(pwd)
{

    return true;
}

//wpa密码检查
function check_wpa_psk(ssid_pwd)
{
    //psk密码不能为空
    if (ssid_pwd.length == 0)
    {
        alert("密码不能为空！");
        return false;
    }

    //检查ascii key是否合法
    if(!ascii_check(ssid_pwd)){
        alert("密码不合法，请重新输入！")
        return false;
    }

    //psk密码长度不能小于8
    if(ssid_pwd.length < 8)
    {
        alert("密码不能少于8个字符，请重新输入！");
        return false;
    }

    return true;
}
//数字校验：
//1. 数字校验
function IsNum(num){
    var reg=/^\d+$/;
    return reg.test(num);
}
//2. 范围校验
function num_check(describe, num, min, max) {
    if(num == ""){
        alert(describe + "不能为空！");
        return false;
    }

    if(num.length > 1 && num[0] == 0){
        alert(describe + "不合法，不能以０开头！");
        return false;
    }

    if(!IsNum(num)){
        alert(describe + "不合法，请输入数字！");
        return false;
    }

    if(num<min || num>max){
        alert(describe + "必须是" + min + "到" + max + "的整数！");
        return false;
    }

    return true;
}
function num_check_notips(describe, num, min, max) {
    if(num == ""){
        return false;
    }

    if(num.length > 1 && num[0] == 0){
        return false;
    }

    if(!IsNum(num)){
        return false;
    }

    if(num<min || num>max){
        return false;
    }

    return true;
}

//mac校验：
//1. 数字校验
//2. 范围校验
function mac_check(mac){
    var reg=/^([0-9a-fA-F]{2})(([/:][0-9a-fA-F]{2}){5})$/;
    return reg.test(mac);   
}

// 校验IP地址
function IsIp(ip){
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    return reg.test(ip);
}

function ip_check(describe, ip){
    if(ip == ""){
        alert(describe + "不能为空！");
        return false;
    }

    if(!IsIp(ip)){
        alert(describe + "不合法！");
        return false;
    }

    return true;
}