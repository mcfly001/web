var name_space = {
	_k: {
		errcode: "errCode",
		errmsg: "errMsg"
	},
	_v: {
		success: "0"
	},
	idpref: {
		page: "Tpage-",
		addbtn: "Tadds-",
		editbtn: "Tedits-",
		delbtn: "Tdeletes-",
		copybtn: "Tcopys-"
	},
	css: {
		Dialog: {
			Window: "dialog_window",
			WindowBg: "dialog_window-bg",
			WindowMain: "dialog_window-main",
			WindowHead: "dialog_window-head",
			WindowTitle: "dialog_window-title",
			WindowCloseBtn: "dialog_window-closebtn",
			WindowContent: "dialog_window-content"
		}
	},
	cookie: {
		session: "Duncki_Session",
		user: "Duncki_User"
	},
	requestKey: {

	},
	returnKey: {

	},
	returnValue: {

	},
	tip: {
		simplename: "只能输入字母、数字、-或_",
		strtegyname: "只能输入字母、数字、中文、-或_"
	}
};

var regx = {
	ip: /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/,
	mask: /^(254|252|248|240|224|192|128)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0))$/,
	mac: /^([a-fA-F\d]{2}[\-\:]){5}[a-fA-F\d]{2}$/,
	url: /^((http|https):\/\/)?(([a-zA-Z0-9][a-zA-Z0-9_-]*)(.[a-zA-Z0-9][a-zA-Z0-9_-]*)+)/,
	urlOnlyHttp: /^http:\/\/[\w\-\?\/\&\+:\.]*$/,
	domain: /^((http|https):\/\/)?[\w-]+(\.[\w-]+)*\.[a-z]+$/
};

T.format = function(v1, v2) {
	return {
		isIp: function() {
			if (regx.ip.test(v1))
				return true;
			else
				return false;
		},
		isMask: function() {
			if (regx.mask.test(v1))
				return true;
			else
				return false;
		},
		isUrl: function() {
			if (regx.url.test(v1))
				return true;
			else
				return false;
		},
		isUrlOnlyHttp: function() {
			if (regx.urlOnlyHttp.test(v1))
				return true;
			else
				return false;
		},
		isDomain: function() {
			if (regx.domain.test(v1))
				return true;
			else
				return false;
		},
		/**
		 * 判断两个IP是否在同一网段
		 */
		isIpInSameNet: function(smask) {
			if (!regx.ip.test(v1) || !regx.ip.test(v2) || !regx.mask.test(smask))
				return false;
			var aip1 = new Array();
			var aip2 = new Array();
			var anetmask = new Array();
			aip1 = v1.split(".");
			aip2 = v2.split(".");
			anetmask = smask.split(".");

			for (var i = 0; i < 4; i++) {
				var iret1 = aip1[i] & anetmask[i];
				var iret2 = aip2[i] & anetmask[i];

				if (iret1 != iret2)
					return false;
			}
			return true;
		},
		/**
		 * 判断两个IP地址是否符合始末
		 */
		isIpPool: function(sip) {
			if (!regx.ip.test(v1) || !regx.ip.test(sip))
				return false;
			var aip1 = new Array();
			var aip2 = new Array();
			aip1 = v1.split(".");
			aip2 = sip.split(".");

			var ip1, ip2;

			for (var i = 0; i < 4; i++) {
				ip1 = parseInt(aip1[i]);
				ip2 = parseInt(aip2[i]);
				if (ip1 < ip2)
					return true;
				else if (ip1 > ip2)
					return false;
			}
			return false;
		},
		isNumRange: function(imin, imax) {
			var ival = parseInt(v1);
			if (/^-?[0-9]*$/.test(v1)) {
				if (ival >= imin && ival <= imax)
					return true;
			}
			return false;
		}
	};
}

var CDialogWindow = function() {
	this.DomObj_ = null;
	this.DomMainObj_ = null;
	this.DomId_ = "";
	this.InnerHTML_ = "";
	this.ShowHTML_ = "";
	this.Title_ = "Notes";
};

CDialogWindow.prototype.show = function(vContent) {
	var sContentHtml = "";
	var nameGroup = name_space.css.Dialog;
	if (typeof vContent === "string") {
		sContentHtml = vContent;
	}
	this.InnerHTML_ = "<div class='" + nameGroup.WindowBg + "'></div>" + "<div class='" + nameGroup.WindowMain + "'>" + "<div class='" + nameGroup.WindowHead + "'>" + "<div class='" + nameGroup.WindowTitle + "'>" + this.Title_ + "</div>" + "<div class='" + nameGroup.WindowCloseBtn + "'></div>" + "</div>" + "<div class='" + nameGroup.WindowContent + "'>" + sContentHtml + "</div>" + "</div>";

	var dialogDomObj = this.DomObj_;
	if (dialogDomObj && document.body[dialogDomObj])
		return;
	else {
		dialogDomObj = document.createElement("div");
		dialogDomObj.className = nameGroup.Window;
		dialogDomObj.innerHTML = this.InnerHTML_;
		this.DomObj_ = dialogDomObj;
		document.body.appendChild(dialogDomObj);
	}
	this.DomMainObj_ = dialogDomObj.childNodes[1];
	var oCloseBtn = this.DomMainObj_.childNodes[0].childNodes[1];
	T.addEvent(oCloseBtn, "click", function() {
		dialogDomObj.style.display = "none";
	});
	this.resetPosition();
}

CDialogWindow.prototype.resetPosition = function() {
	var iDialogWidth = this.DomMainObj_.offsetWidth;
	var iDialogHeight = this.DomMainObj_.offsetHeight;
	var iBodyWidth = document.body.offsetWidth;
	var iBodyHeight = document.body.offsetHeight;
	this.DomMainObj_.style.top = (iBodyHeight - iDialogHeight) / 2 + "px";
	this.DomMainObj_.style.left = (iBodyWidth - iDialogWidth) / 2 + "px";
}

function Id(sid) {
	return document.getElementById(sid);
}

function CreateTipDiv(scontent) {

}

function ShowTip(scontent) {
	var dtip = CreateTipDiv(scontent);
	alert(scontent);
}

function CheckFormat(oformat, oconfSet) {
	for (var param in oformat) {
		if (param in oconfSet) {
			var dom = T.id(param);
			var val = oconfSet[param].val;

			if (val == "") {
				if (oformat[param].cb == 1) {
					dom.focus();
					PopCheckError(oformat[param].show + "不能为空");
					return false;
				}
			} else {
				if (oformat[param].cf == 1 && !oformat[param].reg.test(val)) {
					dom.select();
					PopCheckError(oformat[param].show + oformat[param].err);
					return false;
				}
			}
		}
	}

	return true;
}

function CheckCgiReturn(vdata, fcallback) {
	var errorcode = [
		"WEB_SUCCESS",
		"WEB_CONFIG_FAILURE",
		"WEB_NOT_LOGIN",
		"WEB_LOGIN_TIMEOUT",
		"WEB_DATA_ILLEGAL",
		"WEB_NO_PRIVILRGE",
		"WEB_INNER_ERROR",
		"ERROR_CODE_MAX"
	];

	var serrorCode = "errCode";
	var serrorMsg = "errMsg";

	if (typeof vdata == "object" && vdata[serrorCode] != undefined && vdata[serrorCode] != "0") {
		if (errorcode[vdata[serrorCode]] == "WEB_NOT_LOGIN" || errorcode[vdata[serrorCode]] == "WEB_LOGIN_TIMEOUT")
			window.parent.location.href = 'index.html';
		return false;
		/*
		   if (errorcode[vdata[serrorCode]] == "WEB_NOT_LOGIN")
		   T.CDialog({title:"错误!", scontent:"您尚未登录，请先<a target='_top' href='/'>登录</a>", onlyone:true});
		   else if (errorcode[vdata[serrorCode]] == "WEB_LOGIN_TIMEOUT")
		   T.CDialog({title:"错误!", scontent:"登录超时，请重新<a target='_top' href='/'>登录</a>", onlyone:true});
		   return false;
		 */
	}

	if (fcallback)
		fcallback();
	return true;
}

function BuildConfigSet(oconfig) {
	var obj = {};
	T.eachObject(oconfig, function(key, value) {
		obj[key] = {};
		obj[key].defVal = value;
		obj[key].dom = T.id(key);
		obj[key].oldVal = "";
		obj[key].val = "";
		obj[key].able = true;
	});
	return obj;
}

function PopCheckError(smsg, dom) {
	$("._dialog_dialog").remove();
	alert(smsg);
	//T.CDialog({title:"错误",scontent:smsg});
}

function CreateDialog(sid, stitle) {
	var diag = new Dialog();
	diag.InvokeElementId = sid;
	diag.Title = stitle;
	return diag;
}

function SetOneConfigValue(dom, sval) {
	if (!dom)
        return false;
    if (dom.type == "checkbox")
    {
        dom.checked = (sval == "1" ? true : false);
    }
    else if (dom.type == "radio")
    {
        var name = dom.name;
        if (name != undefined)
            $('input:radio[name="' + name + '"][value="' + sval + '"]').attr("checked", true);
    }
    else if (dom.type == "select-one")
    {
                if(sval !== undefined&&sval !== null&&sval !== ""){
                        dom.value=sval;
                }else{
                        dom.selectedIndex = 0;
                }
    }
    else if (dom.type != "file")
    {
        dom.value = ((sval !== undefined&&sval !== null)?sval:"");
    }
}

function SetDomsToValue(doms, val) {
	if (!doms || !val)
		return false;

	for (var i = 0; i < doms.length; i++) {
		SetOneConfigValue(doms[i], val);
	}
}

function SetDomsToAble(doms, bdisable) {
	if (!doms)
		return false;

	for (var i = 0; i < doms.length; i++) {
		if (bdisable == false)
			SetToDisable(doms[i]);
		else
			SetToEnable(doms[i]);
	}
}

function InitBox(oconfigSet) {
	for (var param in oconfigSet) {
		var sval = oconfigSet[param].defVal;
		var dom = T.id(param); //oconfigSet[param].dom ie bug
		if (dom)
			SetOneConfigValue(dom, sval);
	}
}

function ShowBoxByOldVal(oconfigSet) {
	for (var param in oconfigSet) {
		var sval = oconfigSet[param].oldVal;
		var dom = T.id(param);
		if (dom)
			SetOneConfigValue(dom, sval);
	}
}

function SetOldValue(oconfigSet, orow) {
	for (var param in oconfigSet) {
		var sval = orow[param];
		oconfigSet[param].oldVal = sval;
	}
}

function SetConfigValue(oconfigSet, orow) {
	for (var param in oconfigSet)
    {
        var sval = orow[param];
        if (undefined != sval){
                oconfigSet[param].oldVal = sval;
        }else{
        		oconfigSet[param].oldVal = ""; //修复：当返回不存在的key，缓存之前的值
        }
        var dom = T.id(param); //oconfigSet[param].dom ie bug
        if (dom)
            SetOneConfigValue(dom, sval);
    }
}

function GetConfigValue(oconfigSet) {
	for (var param in oconfigSet) {
		var dom = T.id(param); //oconfigSet[param].dom ie bug
		if (!dom)
			continue;
		if (dom.type == "checkbox") {
			oconfigSet[param].val = (dom.checked ? "1" : "0");
		} else {
			//如果是WLAN安全策略，密码可以为全空
			if (param == "key" && document.URL.indexOf("gwlsecu") > 0) {
				var dom_val = dom.value;
			} else {
				var dom_val = $.trim(dom.value);
			}
			oconfigSet[param].val = (dom_val ? dom_val : "");
		}
		dom = null;
	}
	//console.log(oconfigSet);
}

function SetToEnable(vdom) {
	if (!vdom)
		return;
	if (vdom.length == undefined)
		vdom.disabled = "";
	else {
		T.eachArray(vdom, function(val) {
			val.disabled = "";
		})
	}
}

function SetToDisable(vdom) {
	if (!vdom)
		return;
	if (vdom.length == undefined)
		vdom.disabled = "disabled";
	else {
		T.eachArray(vdom, function(val) {
			val.disabled = "disabled";
		})
	}
}

function Query(scgipath, orequestSet, fcallback, fcallbackError) {
	Request(scgipath, orequestSet, function(data) {
		if (CheckCgiReturn(data)) {
			if (fcallback)
				fcallback(data);
		} else {
			if (fcallbackError)
				fcallbackError(data);
		}
	});
}

function Query1(scgipath, orequestSet, fcallback, fcallbackError) {
	Request1(scgipath, orequestSet, function(data) {
		if (CheckCgiReturn(data)) {
			if (fcallback)
				fcallback(data);
		} else {
			if (fcallbackError)
				fcallbackError(data);
		}
	});
}

function ModyfyS(scgi, oconfigSet, fcallback) {
	var oparam = {};
	var bchangeFlag = false;
	T.eachObject(oconfigSet, function(key, odata) {
		if (odata.able && odata.val != odata.oldVal) {
			oparam[key] = odata.val;
			if (odata.oldVal != null)
				bchangeFlag = true;
		}
	});

	if (!bchangeFlag) {
		PopCheckError("您没有修改配置");
		return;
	}

	oparam._op = EDIT;
	Query(scgi, oparam, function(data) {
		//PopCheckError("配置成功。");
		if (fcallback)
			fcallback(data);
	}, function(data) {
		if (data.showOwnMsg == true || data.showOwnMsg == "1")
			PopCheckError(data.errMsg);
		else
			PopCheckError("配置失败。");
	});
}

function ModyfyS1(scgi, oconfigSet, fcallback, fcallbackerror) {
	var oparam = {};
	var bchangeFlag = false;
	T.eachObject(oconfigSet, function(key, odata) {
		if (odata.able && odata.val != odata.oldVal) {
			oparam[key] = odata.val;
			if (odata.oldVal != null)
				bchangeFlag = true;
		}
	});

	if (!bchangeFlag) {
		PopCheckError("您没有修改配置");
		return;
	}

	oparam._op = EDIT;
	Query1(scgi, oparam, function(data) {
		//PopCheckError("配置成功。");
		if (fcallback)
			fcallback(data);
	}, function(data) {
		if (fcallbackerror)
			fcallbackerror(data);
	});
}

function Modify(scgi, oconfig, oldData, fcallback) {
	var oconfigSet = BuildConfigSet(oconfig);
	/**
	 * 可能可以省略 oldVal 
	 * CheckValid可以弥补GetConfigValue的不足，
	 * 下面就可以直接与oldData作对比
	 * */
	SetOldValue(oconfigSet, oldData);
	GetConfigValue(oconfigSet);

	if (!CheckValid(oconfigSet))
		return;
	ModyfyS(scgi, oconfigSet, fcallback);
}

function Request(scgipath, vparam, fcallback) {
	var xmlhttp;
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	else // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

	var url = scgipath;
	if (T.isFunction(vparam)) {
		fcallback = fcallback || vparam;
		vparam = null;
	}
	var url;
	if (!vparam)
		url = scgipath;
	else if (typeof vparam === "string") {
		url += "?" + vparam;
		vparam = null;
	} else if (typeof vparam === "object") {
		url += "?";
		for (var param in vparam) {
			var value = vparam[param];
			if ("name" == param && /[:;,]/.test(value)) {
				var dom = T.id(param);
				try {
					dom.select();
				} catch (e) {}
				PopCheckError("输入不能包含 , : 和 ;");
				return;
			} else if (/[;,]/.test(value)) {
				var dom = T.id(param);
				try {
					dom.select();
				} catch (e) {}
				PopCheckError("输入不能包含 , 和 ;");
				return;
			}
			url += param + "=" + encodeURIComponent(value) + "&";
		}
		url += "/=" + Math.random();
	} else
		url = scgipath;

	var jdata = null;
	xmlhttp.open("GET", url, false);
	try {
		xmlhttp.send();
	} catch (e) {
		PopCheckError("可能由于网络原因，您的请求未能发送，请检查连接后重试。");
		return;
	}
	var sresponse = xmlhttp.responseText;
	//var vReturnHeaders = xmlhttp.getAllResponseHeaders();
	var sreturnMIMEtype = xmlhttp.getResponseHeader("Content-Type");
	if (/json/.test(sreturnMIMEtype)) //判断返回类型
	{
		try {
			jdata = $.parseJSON(sresponse.replace(/\t/g, ""));
		} catch (e) //返回的不是正确的json字符串, 不能解析
		{
			return;
		}
	}
	if (fcallback)
		fcallback(jdata || sresponse, true);
}

function Request1(scgipath, vparam, fcallback) {
	var xmlhttp;
	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	else // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

	var url = scgipath;
	if (T.isFunction(vparam)) {
		fcallback = fcallback || vparam;
		vparam = null;
	}

	var text = "";
	if (typeof vparam === "string") {
		text += vparam;
		vparam = null;
	} else if (typeof vparam === "object") {
		for (var param in vparam) {
			var value = vparam[param];
			if ("name" == param && /[:;,]/.test(value)) {
				var dom = T.id(param);
				try {
					dom.select();
				} catch (e) {}
				PopCheckError("输入不能包含, : 和 ;");
				return;
			} else if (/[;,]/.test(value)) {
				var dom = T.id(param);
				try {
					dom.select();
				} catch (e) {}
				PopCheckError("输入不能包含 , 和 ;");
				return;
			}
			text += param + "=" + encodeURIComponent(value) + "&";
		}
		text += "/=" + Math.random();
	}
	//alert(text);

	var jdata = null;
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencode");
	try {
		xmlhttp.send(text);
	} catch (e) {
		PopCheckError("可能由于网络原因，您的请求未能发送，请检查连接后重试。");
		return;
	}
	var sresponse = xmlhttp.responseText;
	//var vReturnHeaders = xmlhttp.getAllResponseHeaders();
	var sreturnMIMEtype = xmlhttp.getResponseHeader("Content-Type");
	if (/json/.test(sreturnMIMEtype)) //判断返回类型
	{
		try {
			jdata = $.parseJSON(sresponse);
		} catch (e) //返回的不是正确的json字符串, 不能解析
		{
			return;
		}
	}
	if (fcallback)
		fcallback(jdata || sresponse, true);
}

function BatchAction(index, fcall, fcallback, aselect) {
	if (index >= aselect.length) {
		fcallback();
		return;
	}
	var self = this;
	fcall.call(self, index, function() {
		index++;
		BatchAction.call(self, index, fcall, fcallback, aselect);
	});
}

function BatchAction2(index, fcall, fcallback, aselect) {
	while (index < aselect.length) {
		fcall.call(self, index);
		index++;
	}

	fcallback();
	return;
}

var CTable = function() {
	this.ahead_ = [];
	this.acolum_ = [];
	this.fline_ = null;
};

CTable.prototype.setHead = function(ahead) {
	this.ahead_ = ahead;
	return this;
}

CTable.prototype.setColumn = function(acolumn, fline) {
	this.acolum_ = acolumn;
	this.fline_ = fline;
	return this;
}

CTable.prototype.render = function(adataSet, fcallback) {
	var ahead = null,
		acolumn = null,
		atable = null,
		fline = null,
		shtml = "",
		shead = "",
		sbody = "";

	ahead = this.ahead_;
	acolumn = this.acolum_;
	atable = adataSet;
	fline = this.fline_;

	if (!ahead) {
		for (var i = 0; i < acolumn.length; i++) {
			if (typeof(acolumn[i]) == "string") {
				ahead[i] = acolumn[i];
			} else if (typeof(acolumn[i]) == "object") {
				ahead[i] = acolumn[i].key;
			}
		}
	}

	shtml = "<table cellspacing='0' cellpadding='0'>";

	shead = "<tr>";
	for (var i = 0; i < ahead.length; i++) {
		shead += "<th>" + ahead[i] + "</th>";
	}
	shead += "</tr>";
	shtml += shead;

	sbody = "";
	for (var i = 0; i < atable.length; i++) {
		if (fline)
			sbody += "<tr class='" + fline(i, atable) + "'>";
		else if (i % 2 == 0)
			sbody += "<tr class='table-even'>";
		else
			sbody += "<tr class='table-odd'>";

		for (var j = 0; j < acolumn.length; j++) {
			var param;
			if (typeof(acolumn[j]) == "string" && acolumn[j] != "") {
				param = acolumn[j];
				var val = atable[i][param];
				val = (val == "" ? "N/A" : T.escapeHtml(val));
				sbody += "<td>" + val + "</td>";
			} else if (T.isFunction(acolumn[j])) {
				sbody += "<td>" + acolumn[j](i, atable) + "</td>";
			} else if (T.isObject(acolumn[j])) {
				param = acolumn[j].key;

				var cls = "";
				var title = "";
				if (acolumn[j].cls)
					cls = acolumn[j].cls;
				if (acolumn[j].title)
					title = acolumn[j].title(atable[i][param], i, atable);

				if (acolumn[j].enableHtml)
					sbody += "<td>" + atable[i][param] + "</td>";

				else if (acolumn[j].format) {
					if (param == undefined)
						sbody += "<td>" + acolumn[j].format(i, atable) + "</td>";
					else
						sbody += "<td class='" + cls + "' title='" + title + "'>" + acolumn[j].format(atable[i][param], i, atable) + "</td>";
				} else
					sbody += "<td>N/A</td>";
			} else
				sbody += "<td>N/A</td>";
		}
		sbody += "</tr>";
	}
	shtml += sbody;
	shtml += "</table>";

	if (fcallback)
		fcallback(sbody, shtml);
	else
		return shtml;
}

var CPage = function(isize) {
	this.isize_ = isize || g.isize;
}

CPage.prototype.render = function(odataSet, fcallback) {
	var isize = this.isize_;
	var scount = odataSet.filternum;
	var sstart = odataSet.start;
	var icount = isNaN(parseInt(scount)) ? odataSet.rows.length : parseInt(scount);
	var istart = isNaN(parseInt(sstart)) ? 0 : parseInt(sstart);

	var ipageMax = 0;
	if (icount > 0)
		ipageMax = parseInt((icount - 1) / isize);
	var ipageNow = parseInt(istart / isize);
	var shtml = "";
	var apageId = [];
	var sid;
	shtml += "<span>共" + icount + "条</span>";
	if (ipageMax > 0) {
		shtml += ",<span>第" + (ipageNow + 1) + "/" + (ipageMax + 1) + "页</span>";
		sid = name_space.idpref.page + "0";
		shtml += '<span><a href="javascript:;" class="' + sid + '">首页</a></span>';
		apageId.push(sid);
		if (ipageNow >= 1) {
			sid = name_space.idpref.page + (ipageNow - 1);
			shtml += '<span><a href="javascript:;" class="' + sid + '">上一页</a></span>';
			apageId.push(sid);
		}
		if (ipageNow <= (ipageMax - 1)) {
			sid = name_space.idpref.page + (ipageNow + 1);
			shtml += '<span><a href="javascript:;" class="' + sid + '">下一页</a></span>';
			apageId.push(sid);
		}
		sid = name_space.idpref.page + ipageMax;
		shtml += '<span><a href="javascript:;" class="' + sid + '">末页</a></span>';
		apageId.push(sid);
	}
	fcallback(shtml, apageId);
}

function GetSelectItem(scgipath, orequestSet, sparam, sid, fcall) {
	if (orequestSet._start == undefined) {
		orequestSet._start = 0;
	}
	if (orequestSet._size == undefined) {
		orequestSet._size = 512;
	}
	Query(scgipath, orequestSet, function(data) {
		var oselect = {},
			aselect = [];
		T.eachArray(data.rows, function(oset) {
			oselect[oset[sparam]] = oset[sparam];
		});

		T.eachObject(oselect, function(oset) {
			aselect.push(oset);
		});
		T.initSelectItem(T.id(sid), aselect);
		if (fcall)
			fcall(aselect);
		//aselect.length = 0;
	});
}

function ShowIndex(i) {
	var num = g.istart + i + 1;
	return "<input type='checkbox' id='rowdisp_" + i + "'/><span> " + num + "</span>";
}

function ShowOperate(i) {
	return "<a href='javascript:;' id='" + name_space.idpref.editbtn + i + "'>编辑</a> | " + "<a href='javascript:;' id='" + name_space.idpref.delbtn + i + "'>删除</a>";
}

function GetCurrentCookies() {
	return document.cookie;
}

function RebootAc(smsg) {
	var action = confirm(smsg);
	if (action == true) {
		var url = "/cgi-bin/reboot.cgi?/=" + Math.random();
		$.get(url, function(data, status) {
			if (CheckCgiReturn(data)) {
				PopCheckError("正在重启，稍后请手动刷新页面。");
			} else {
				PopCheckError("重启失败。");
			}
		});
	}
}

function GetSelectInnerText(sid, sval) {
	var dom = T.id(sid);
	var i = T.findSelectValue(dom, sval);
	if (i != -1)
		return T.getInnerText(dom.options[i]);
	else
		return "N/A";
}
var ADD = 1,
	DELETE = 2,
	EDIT = 3,
	QUERY = 4,
	OP_5 = 5,
	OP_6 = 6,
	OP_7 = 7;

var g = {
	scgi: "",
	oconfig: null,
	iselect: 0,
	aselect: [],
	isize: 100,
	istart: 0,
	adata: []
};

var CFrame = function(scgi) {
	this.scgi_ = "/cgi-bin/" + scgi + ".cgi";

	this.oconfig_ = null;
	this.oconfigSet_ = null;

	this.iselect_ = 0;
	this.aselect_ = [];
	this.isize_ = 100;
	this.icount_ = 0;
	this.istart_ = 0;
	this.ipage_ = 0;
	this.adata_ = [];
	this.odata_ = {};
	this.otableColumn_ = null;

	this.oparam_ = {};

	var otableEvent = {};
	otableEvent[name_space.idpref.editbtn] = this.Edit;
	otableEvent[name_space.idpref.delbtn] = this.Delete;

	this.otableEvent_ = otableEvent;
	this.otableEvents_ = null;

	this.aonceAction_ = [];

	this.atableInitProcess_ = [];

	this.fprocessShowEdit_ = null;
	this.fprocessShowAdd_ = null;
	this.fprocessSumbit_ = null;

	var self = this;
	T.addEvent(T.id("Tadd"), "click", function() {
		self.Add();
	})

	/*
	   T.addEvent(T.id("TtestShowPage"), "click", function() {
	   self.showPage();
	   })
	 */
	T.addEvent(T.id("Tdeletes"), "click", function() {
		self.batchAction("删除", self.Delete);
	})

	$(".tsort").click(function() {
		var shtml = $(this).html().replace(/ .*$/, "");
		var sclass = $(this).attr("class");
		var skey;
		$.each(sclass.split(" "), function(i, val) {
			if (/tsort_/.test(val)) {
				skey = val.replace(/tsort_/, "");
				return false;
			}
		})
		if (!/sortup/.test(sclass)) {
			self.showPage(self.ipage_, {
				sort: {
					_sort: 2,
					_sortkey: skey
				}
			});
			$(".tsort").removeClass("sortup").removeClass("sortdown");
			$(this).addClass("sortup");
		} else {
			self.showPage(self.ipage_, {
				sort: {
					_sort: 1,
					_sortkey: skey
				}
			});
			$(".tsort").removeClass("sortup").removeClass("sortdown");
			$(this).addClass("sortdown");
		}
	})

	this.odatabase_ = {};
}

CFrame.prototype.setConfigItem = function(oconfig) {
	this.oconfig_ = oconfig;
	this.oconfigSet_ = BuildConfigSet(oconfig);
	return this;
}

CFrame.prototype.setTableColumn = function(acolumn, fline) {
	this.otableColumn_ = {
		acolumn: acolumn,
		fline: fline
	};
	return this;
}

CFrame.prototype.setTableEvent = function(otableEvent) {
	this.otableEvent_ = otableEvent;
	return this;
}

CFrame.prototype.setProcessShowEdit = function(fcall) {
	this.fprocessShowEdit_ = fcall;
	return this;
}

CFrame.prototype.setProcessShowAdd = function(fcall) {
	this.fprocessShowAdd_ = fcall;
	return this;
}

CFrame.prototype.setProcessSubmit = function(fcall) {
	this.fprocessSumbit_ = fcall;
	return this;
}

CFrame.prototype.setTableEvent = function(otableEvent) {
	this.otableEvent_ = otableEvent;
	return this;
}

CFrame.prototype.addTableEvent = function(otableEvent) {
	this.otableEvent_ = $.extend({}, this.otableEvent_, otableEvent);
	return this;
}

CFrame.prototype.setTableEvents = function(otableEvents) {
	this.otableEvents_ = otableEvents;
	return this;
}

CFrame.prototype.addTableInitProcess = function(fcall) {
	this.atableInitProcess_.push(fcall);
	return this;
}

CFrame.prototype.addOnceAction = function(fcall) {
	this.aonceAction_.push(fcall);
	return this;
}

CFrame.prototype.Ade = function(orequestSet, fcallback) {
	var self = this;
	var scgi = self.scgi_;
	Query(scgi, orequestSet, function(data) {
		//PopCheckError("配置成功。");
		if (fcallback && T.isFunction(fcallback))
			fcallback(data);
		else
			self.showPage(self.ipage_);
	}, function(data) {
		if (data.showOwnMsg == true || data.showOwnMsg == "1")
			PopCheckError(data.errMsg);
		else
			PopCheckError("配置失败。");
	});
}

CFrame.prototype.Ade2 = function(orequestSet, fcallback) {
	var self = this;
	var scgi = self.scgi_;
	Query(scgi, orequestSet, function(data) {
		//PopCheckError("配置成功。");
		if (fcallback && T.isFunction(fcallback))
			fcallback(data);
		else
			self.showPage(self.ipage_);
	});
}

CFrame.prototype.batchAction = function(sop, fcall) {
	var self = this;
	if (self.aselect_.length == 0) {
		PopCheckError("请选择需要批量操作的项。");
		return;
	}
	if (!confirm("您确认要执行批量" + sop + "吗?"))
		return;

	var dcontent = T.CDialog({
		title: "批量" + sop,
		scontent: ""
	});
	var icount = self.aselect_.length;
	BatchAction.call(self, 0, function(i, fcallback) {
		$(dcontent).html("正在" + sop + "第" + (i + 1) + "个，总共" + icount + "个...");
		fcall.call(self, self.aselect_[i], fcallback);
	}, function() {
		$(dcontent).html(sop + icount + "个成功。");
		self.aselect_.length = 0;
		T.id("Tselect-all").checked = false;
		self.showPage();
	}, self.aselect_);
}

CFrame.prototype.batchAction2 = function(sop, fcall) {
	var self = this;
	if (self.aselect_.length == 0) {
		PopCheckError("请选择需要批量操作的项。");
		return;
	}

	if (!confirm("您确认要执行批量" + sop + "吗?"))
		return;

	var dcontent = T.CDialog({
		title: "批量" + sop,
		scontent: ""
	});
	var icount = self.aselect_.length;
	BatchAction2.call(self, 0, function(i, fcallback) {
		$(dcontent).html("正在" + sop + "第" + (i + 1) + "个，总共" + icount + "个...");
		fcall.call(self, self.aselect_[i], fcallback);
	}, function() {
		$(dcontent).html(sop + icount + "个成功。");
		self.aselect_.length = 0;
		T.id("Tselect-all").checked = false;
		self.showPage();
	}, self.aselect_);
}

CFrame.prototype.setEvent = function(sid, fcall) {
	var self = this;
	T.addEvent(T.id(sid), "click", function(e) {
		fcall.call(self, e);
	});
	return this;
}

CFrame.prototype.Edit = function(i) {
	var self = this;
	var diag = CreateDialog("strategy_box", "编辑策略");
	var oconfigSet = $.extend({}, self.oconfigSet_);

	SetConfigValue(oconfigSet, self.adata_[i]);

	diag.OKEvent = function() {
		//SetOldValue(oconfigSet, self.adata_[i]);
		GetConfigValue(oconfigSet);

		if (!CheckValid(oconfigSet))
			return;
		if (self.fprocessSumbit_)
			self.fprocessSumbit_(oconfigSet);
		var oparam = {};
		var bchangeFlag = false;
		T.eachObject(oconfigSet, function(key, odata) {
			if (odata.able) {
				oparam[key] = odata.val;
				if (odata.val != odata.oldVal)
					bchangeFlag = true;
			}
		});

		if (!bchangeFlag) {
			PopCheckError("您没有修改配置");
			return;
		}

		oparam._op = EDIT;
		self.Ade(oparam, function(data) {
			diag.close();
			self.showPage(self.ipage_);
		});
	}

	diag.CancelEvent = function() {
		diag.close();
	}

	SetToDisable(T.id("name"));
	if (self.fprocessShowEdit_)
		self.fprocessShowEdit_(oconfigSet);
	diag.show();
}

CFrame.prototype.Delete = function(i, fcallback) {
	var self = this;
	var oparam = {};
	T.eachObject(self.oconfig_, function(key) {
		oparam[key] = self.adata_[i][key];
	});

	oparam._op = DELETE;

	self.Ade(oparam, fcallback);
}

CFrame.prototype.DeleteNew = function(i, para, fcallback) { //{name:"asd"}
	var self = this;
	var oparam = {};
	T.eachObject(self.oconfig_, function(key) {
		oparam[key] = self.adata_[i][key];
	});

	if (para) {
		for (var key in para) {
			oparam[key] = para[key];
		}
	}

	oparam._op = DELETE;

	self.Ade(oparam, fcallback);
}

CFrame.prototype.Add = function() {
	var self = this;
	var diag = CreateDialog("strategy_box", "添加策略");
	var oconfigSet = $.extend({}, self.oconfigSet_);

	InitBox(oconfigSet);

	diag.OKEvent = function() {
		GetConfigValue(oconfigSet);
		if (!CheckValid(oconfigSet))
			return;
		if (self.fprocessSumbit_)
			self.fprocessSumbit_(oconfigSet);
		var oparam = {};
		T.eachObject(oconfigSet, function(key, val) {
			if (val.able)
				oparam[key] = val.val;
		});

		oparam._op = ADD;
		self.Ade(oparam, function(data) {
			diag.close();
			self.showPage(self.ipage_);
		})
	}


	diag.CancelEvent = function() {
		diag.close();
	}

	SetToEnable(T.id("name"));
	if (self.fprocessShowAdd_)
		self.fprocessShowAdd_(oconfigSet);
	diag.show();
}

/**
 * [showPage description]
 * @param  {[type]} index  [description]
 * @param  {[type]} oextra [{filer:{}, sort:{}}]
 * @return {[type]}        [description]
 */
CFrame.prototype.showPage = function(index, oextra) {
	var isize = this.isize_;
	var ipage = (!isNaN(index) && index > 0 ? index : 0);
	var istart = ipage * isize;
	this.ipage_ = ipage;

	var self = this;
	var oparam = null;
	if (oextra && T.isObject(oextra)) {
		if (oextra.filter)
			this.oparam_.filter = oextra.filter;
		if (oextra.sort)
			this.oparam_.sort = oextra.sort;
	}

	oparam = $.extend({}, this.oparam_.filter, this.oparam_.sort);

	oparam._op = QUERY;
	oparam._start = istart;
	oparam._size = isize;

	Query(self.scgi_, oparam, function(data) {
		self.istart_ = isNaN(parseInt(data.start)) ? 0 : parseInt(data.start);

		g.istart = self.istart_; //global var

		self.odata_ = data;
		self.adata_ = data.rows;
		self.icount_ = (data.rows == null ? 0 : data.rows.length);

		var otableFrame = new CTable();
		if (self.otableColumn_)
			otableFrame.setColumn(self.otableColumn_.acolumn, self.otableColumn_.fline);
		else
			otableFrame.setHead(self.oconfig_);

		otableFrame.render(data.rows, function(sbody) {
			$("#table_data").html(sbody);
			T.eachObject(self.otableEvent_, function(key, fcall) {
				T.eachArray(data.rows, function(val, i) {
					T.addEvent(T.id(key + i), "click", function(e) {
						//var eve = window.event || e;
						fcall.call(self, i, e);
					});
				});
			});

			T.eachObject(self.otableEvents_, function(key, fcall) {
				T.eachArray(data.rows, function(val, i) {
					var adom = T.c2ds(key + i, T.id("table_data"), "a");
					T.eachArray(adom, function(dom, j) {
						T.addEvent(dom, "click", function(e) {
							//var eve = window.event || e;
							fcall.call(self, i, j, e);
						});
					})
				})
			});

			T.addEvent(T.id("Tselect-all"), "click", function(e) {
				var dom = T.id("Tselect-all");
				if (dom.checked) {
					self.aselect_.length = 0;
					for (var i = 0; i < self.icount_; i++) {
						T.id("rowdisp_" + i).checked = true;
						self.aselect_.push(i);
					}
				} else {
					for (var i = 0; i < self.icount_; i++) {
						T.id("rowdisp_" + i).checked = false;
					}
					self.aselect_.length = 0;
				}
			});

			for (var i = 0; i < self.icount_; i++) {
				T.addEvent(T.id("rowdisp_" + i), "click", function(e) {
					var dom = T.eventTarget(e);
					var index = parseInt(dom.id.replace("rowdisp_", ""));
					if (dom.checked) {
						if ($.inArray(index, self.aselect_) == -1) {
							self.aselect_.push(index);
						}
					} else {
						var pos = $.inArray(index, self.aselect_);
						if (pos != -1) {
							self.aselect_.splice(pos, 1);
						}
					}
					if (self.aselect_.length == self.icount_)
						T.id("Tselect-all").checked = true;
					else
						T.id("Tselect-all").checked = false;
				})
			}
		});

		var opageFrame = new CPage(isize);
		opageFrame.render(data, function(sdiv, apageClass) {
			$(".page_navi").html(sdiv);
			T.eachArray(apageClass, function(sclass) {
				/*
				   T.addEvent(T.id(sid), "click", function() {
				   var ipage = parseInt(sid.replace(name_space.idpref.page, ""));
				   self.showPage(ipage);
				   });
				 */
				$(".page_navi ." + sclass).click(function() {
					var ipage = parseInt(sclass.replace(name_space.idpref.page, ""));
					self.showPage(ipage);
					T.id("Tselect-all").checked = false;
					self.aselect_.length = 0;
				});
			});
		});


		T.eachArray(self.atableInitProcess_, function(fcall) {
			fcall.call(self);
		})

		if (self.aonceAction_ != null) {
			T.eachArray(self.aonceAction_, function(fcall) {
				fcall.call(self);
			});
			self.aonceAction_ = null;
		}
	});
	return this;
}

function Duration2Array(second) {
	var isecond = parseInt(second, "10");
	var a = [];
	if (!isNaN(isecond)) {
		var day, hour, min = 0;
		day = parseInt(isecond / 3600 / 24, "10");
		hour = parseInt((isecond - day * 24 * 3600) / 3600, "10");
		min = parseInt((isecond - day * 24 * 3600 - hour * 3600) / 60, "10");
		a[0] = day;
		a[1] = hour;
		a[2] = min;
		return a;
	} else
		return null;
}

function Array2Duration(atime) {
	var atmp = [];
	for (var i = 0; i < atime.length; i++) {
		var itmp = parseInt(atime[i], "10");
		atmp[i] = isNaN(itmp) ? 0 : itmp;
	}
	return atmp[0] * 24 * 3600 + atmp[1] * 3600 + atmp[2] * 60;
}

function Time2LocalFormat(second) {
	var time = new Date();
	time.setTime(parseInt(second, "10") * 1000);
	var month = time.getMonth() + 1;
	var year, date, hours, minutes, seconds;
	var intHours, intMinutes, intSeconds;
	intHours = time.getHours();
	intMinutes = time.getMinutes();
	intSeconds = time.getSeconds();
	year = time.getFullYear();
	date = time.getDate();
	var time;
	if (intHours == 0)
		hours = "00:";
	else if (intHours < 10)
		hours = "0" + intHours + ":";
	else
		hours = intHours + ":";
	if (intMinutes < 10)
		minutes = "0" + intMinutes + ":";
	else
		minutes = intMinutes + ":";
	if (intSeconds < 10)
		seconds = "0" + intSeconds;
	else
		seconds = intSeconds;
	return year + "-" + month + "-" + date + "." + hours + minutes + seconds;
}

function LocalFormat2Time(stime) {
	if (time == "")
		return;
	else {
		var time = new Date();
		var adateTime = stime.split(".");

		var adate = adateTime[0].split("-");
		var atime = adateTime[1].split(":");

		time.setFullYear(parseInt(adate[0], "10"));
		time.setMonth(parseInt(adate[1], "10") - 1);
		time.setDate(parseInt(adate[2], "10"));

		var hour, min, sec = 0;

		hour = parseInt(atime[0], "10");
		min = parseInt(atime[1], "10");
		sec = parseInt(atime[2], "10");

		time.setHours(hour);
		time.setMinutes(min);
		time.setSeconds(sec);

		time.setMilliseconds(0);

		return time.getTime() / 1000;
	}
}

function GenerateMixed(n) {
	var res = "";
	var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	for (var i = 0; i < n; i++) {
		var id = Math.ceil(Math.random() * 35);
		res += chars[id];
	}
	return res;
}

function N2Ds(sname) {
	return document.getElementsByName(sname);
}

function ExportExcel(obj) {
	var xlsName;
	var contentFlag = $("#ContentFlag").val();

	if ("0" == contentFlag) {
		xlsName = "Database";
	} else if ("1" == contentFlag) {
		xlsName = $("#DBName").val();
	} else {
		return false;
	}

	var act = "/cgi-bin/export_excel_cgi.cgi/" + xlsName + ".xls";
	obj.action = act;

	return true;
}

function portalDel(inname) {
	var cgi_path = "/cgi-bin/gwlsrv.cgi";
	Query(cgi_path, {
			"_filter": "1",
			"portal_inname": inname,
			"portal_type": '1',
			"_onlynum": "1"
		},
		function(data) {
			if (typeof(data.filternum) != "undefined" && data.filternum > 0) {
				alert("该策略正在使用中，无法删除");
			} else {
				window.location.href = "/cgi-bin/portal_ad.cgi?operate=delet&inname=" + inname;
			}
		},
		function(data) {
			if (data.errCode != "0" && data.errMsg != "") {
				alert(data.errMsg);
			}
		});
}

function CheckFileType(obj, ext) {
	var file = obj.value;
	var pos = file.lastIndexOf(".");
	var lastname = file.substring(pos, file.length);
	if (lastname.toLowerCase() != ext) {
		alert("文件后缀名必须为 " + ext);
		obj.value = "";
		return false;
	}
	return true;
}

function ajaxFileUpload(url, fileElementId, moreData, func, funcErr) {
	$("#loading")
		.ajaxStart(function() {
			$(this).show();
		})
		.ajaxComplete(function() {
			$(this).hide(0);
		});
	$.ajaxFileUpload({
		url: '/cgi-bin/usrinfo.cgi',
		secureuri: false,
		fileElementId: 'fileToUpload',
		dataType: 'json',
		data: moreData,
		success: function(data, status) {
			$("#loading").hide(0);
			if (CheckCgiReturn(data)) {
				func(data, status);
			} else {
				funcErr(data, status);
			}
		},
		error: function(data, status, e) {
			$("#loading").hide(0);
			alert("file upload error");
		}
	})

	return false;
}


function ajaxFileUpload1(url, fileElementId, moreData, func, funcErr) {
	$("#loading")
		.ajaxStart(function() {
			$(this).show();
		}) //当AJAX请求开始(并还没有激活时)显示loading信息
		.ajaxComplete(function() {
			$(this).hide(0);
		}); //请求完成的执行函数     //隐藏显示的信息
	$.ajaxFileUpload({
		url: '/cgi-bin/dap.cgi', //	用于文件上传的服务器地址
		secureuri: false, //一般设置为false
		fileElementId: 'fileToUpload1', //文件上传控件的id属性
		dataType: 'json',
		data: moreData,
		success: function(data, status) {
			$("#loading").hide(0);
			if (CheckCgiReturn(data)) {
				func(data, status);
			} else {
				funcErr(data, status);
			}
		},
		error: function(data, status, e) {
			$("#loading").hide(0);
			alert("file upload error");
		}
	})
	return false;
}