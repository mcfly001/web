/**
 * 微信连Wi-Fi协议3.1供运营商portal呼起微信浏览器使用
 */
 var loadIframe = null;
 var noResponse = null;
 
function disClick(self, m){
    var org_str = self.val();
    
    self.val(org_str + "(" + (m) + ")");
    m--;
    self.attr("disabled",true);
    var time = setInterval(function(){
        self.val(org_str + "(" + m + ")");
        if (m > 0) 
            m--;
        else{
          self.attr("disabled",false);
          self.val(org_str);
          clearInterval(time);
        }
    },1000);
    return time;
}
 
function putNoResponse(ev){
         clearTimeout(noResponse);
}	

 function errorJump()
 {
         alert('该浏览器不支持自动跳转微信\n请试试其他浏览器或切换认证方式\n如果已跳转请忽略此提示');
 }

 myHandler = function(error) {
         errorJump();
 };

 function createIframe(){
	 var iframe = document.createElement("iframe");
     iframe.style.cssText = "display:none;width:0px;height:0px;";
     document.body.appendChild(iframe);
     loadIframe = iframe;
 }
//注册回调函数
function jsonpCallback(result){  
	if(result && result.success){
            //alert('WeChat will call up : ' + result.success + '  data:' + result.data);			    
		var ua=navigator.userAgent;              
		if (ua.indexOf("iPhone") != -1 ||ua.indexOf("iPod")!=-1||ua.indexOf("iPad") != -1) {   //iPhone             
			document.location = result.data;
		}else{
		    createIframe();
		    loadIframe.src=result.data;
			noResponse = setTimeout(function(){
				errorJump();
	      	},3000);
		}
	}else if(result && !result.success){
		alert(result.data);
	}
}

function Wechat_GotoRedirect(appId, extend, timestamp, sign, shopId, authUrl, mac, ssid, bssid){
	
	//将回调函数名称带到服务器端
	var url = "https://wifi.weixin.qq.com/operator/callWechatBrowser.xhtml?appId=" + appId 
																		+ "&extend=" + extend 
																		+ "&timestamp=" + timestamp 
																		+ "&sign=" + sign;	
	
	//如果sign后面的参数有值，则是新3.1发起的流程
	if(authUrl && shopId){
		
		
		url = "https://wifi.weixin.qq.com/operator/callWechat.xhtml?appId=" + appId 
																		+ "&extend=" + extend 
																		+ "&timestamp=" + timestamp 
																		+ "&sign=" + sign
																		+ "&shopId=" + shopId
																		+ "&authUrl=" + encodeURIComponent(authUrl)
																		+ "&mac=" + mac
																		+ "&ssid=" + ssid
																		+ "&bssid=" + bssid;
		
	}			
	
	//通过dom操作创建script节点实现异步请求  
	var script = document.createElement('script');  
	script.setAttribute('src', url);  
	document.getElementsByTagName('head')[0].appendChild(script);
}
window.location.host
$(".wifi-btn").click(function() {
	var _this = $(this);
	var myDate = new Date();
	
	var URL = "http://" + window.location.host + window.location.pathname;
	
		URL += '?wlanposition=' + $("#wlanposition").val();
		URL += '&wlanapmac=' + $("#wlanapmac").val();
		URL += '&wlanssid=' + $("#wlanssid").val();
		URL += '&wlanapip=' + $("#wlanapip").val();
		URL += '&wlanstamac=' + $("#wlanstamac").val();
		URL += '&wlanuserip=' + $("#wlanuserip").val();
		URL += '&radioid=' + $("#radioid").val();
		URL += '&wlanid=' + $("#wlanid").val();
		URL += '&inname=' + $("#inname").val();
		URL += '&action=wechatWIFI';
		
	URL = encodeURI(URL);
	//alert(URL);
    var appid = $("#appid").val(),
	
		extend = '',
		timestamp = myDate.getTime(),
		
		shop_id = $("#shop_id").val(),
		authUrl = URL,
		mac = $("#wlanstamac").val(),
		ssid = '',
		bssid = '',
		secretkey = $("#secretkey").val(),
		
		sign = $.md5(appid+extend+timestamp+shop_id+authUrl+mac+ssid+bssid+secretkey);
	Wechat_GotoRedirect(appid, extend, timestamp, sign, shop_id, authUrl, mac, ssid, bssid);
	disClick(_this, 10);
})
