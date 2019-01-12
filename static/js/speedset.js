var speed_conf = function()
{
    this.dis_legacy = 0;
	this.disable11nmcs = 0;	
}

var cur_speedconf = new speed_conf();
var mod_speedconf = new speed_conf();

function init_check() {
	var flag = 0;
	var i = 0;
	var tmp = 0;

	$("#dis_legacy").val(parseInt($("#dis_legacy").val(),16)); 
	var a = 0xfff ^ $("#dis_legacy").val();
	var nn = 0;
	for(i = 0; i < 12; i++) {
		flag = (a & (0x1 << i));
		
		if((0x1 << i) == flag) {
			$("#bgadata_rate"+i).prop('checked', true);
			nn ++;
		} else
			$("#bgadata_rate"+i).prop('checked', false);
	}
	if (nn == 12) {
		$("#11bga").prop('checked', true);
	}

	$("#disable11nmcs").val(parseInt($("#disable11nmcs").val(),16)); 
	var nnn = 0;
	var a = $("#disable11nmcs").val();
	var r = $("#rxchainmask").val();
	var l = r == 1 ? 8 : (r == 3 ? 16 : 24);
	if (l == 8) {
		a = 0xff ^ a;
	}
	else if (l == 16) {
		a = 0xffff ^ a;
	}
	else {
		a = 0xffffff ^ a;
	}
	for(i = 0; i < l; i++) {
		flag = (a & (0x1 << i));
		
		if((0x1 << i) == flag) {
			$("#ndata_rate"+i).prop('checked', true);
			nnn ++;
		}
		else
			$("#ndata_rate"+i).prop('checked', false);
	}
	if (nnn == l) {
		$("#11n").prop('checked', true);
	}
}

function select_all(sel) {

	var flag = 0;
	var i = 0;
	
	if (1 == sel) {
		flag = $("#11bga").is(':checked')?1:0;
		if(flag) {
			for(i = 0; i < 12; i++)
				$("#bgadata_rate" + i).prop('checked', true);
		} else {	
			for(i = 0; i < 12; i++)
				$("#bgadata_rate" + i).prop('checked', false);
		}
	} else if (2 == sel) {
		flag = $("#11n").is(':checked')?1:0;
		var r = $("#rxchainmask").val();
		var l = r == 1 ? 8 : (r == 3 ? 16 : 24);
		if(flag) {
			for(i = 0; i < l; i++) {	
				$("#ndata_rate" + i).prop('checked', true);
			}
		} else {
			for(i = 0; i < l; i++) {
				$("#ndata_rate" + i).prop('checked', false);
			}
		}
	}
}

$()

function install_flag() {
	var dis_legacy = 0;
	var disable11nmcs = 0;
	
	for(i = 0; i < 12; i++) {
		if($("#bgadata_rate"+i).is(":checked"))
			dis_legacy |= (0x1 << i);
	}
	dis_legacy = 0xfff ^ dis_legacy;
	
	var r = $("#rxchainmask").val();
	var l = r == 1 ? 8 : (r == 3 ? 16 : 24);

	for(i = 0; i < l; i++) {
		if($("#ndata_rate"+i).is(':checked'))
			disable11nmcs |= (0x1 << i);
	}
	if (l == 8) {
		disable11nmcs = 0xff ^ disable11nmcs;
	}
	else if (l == 16) {
		disable11nmcs = 0xffff ^ disable11nmcs;
	}
	else {
		disable11nmcs = 0xffffff ^ disable11nmcs;
	}
	
	$("#disable11nmcs").val(disable11nmcs); 
	$("#dis_legacy").val(dis_legacy);
}

function speedset_submit_config() {

	var submit_data = "";
	/* 载入要修改的参数 */
	install_flag();

	for(var para in mod_speedconf) {
		mod_speedconf[para] = $("#" + para).val();
	}

	for (var para in mod_speedconf) {
		if (mod_speedconf[para] != cur_speedconf[para]) {
			var intData;
			if(para == 'dis_legacy') {
				intData = parseInt(mod_speedconf[para]);
				if (intData == 0xfff) {
					lang_alert('at_least_select_one_11bga')
					return;
				}
			} else if (para == 'disable11nmcs') {
				intData = parseInt(mod_speedconf[para]);
				var r = $("#rxchainmask").val();
				var l = r == 1 ? 8 : (r == 3 ? 16 : 24);
				if (l == 8) {
					if (intData == 0xff) {
						lang_alert('at_least_select_one_11n')
						return;
					}
				}
				else if (l == 16) {
					if (intData == 0xffff) {
						lang_alert('at_least_select_one_11n')
						return;
					}					}
				else {
					if (intData == 0xffffff) {
						lang_alert('at_least_select_one_11n')
						return;
					}
				}
			}
			submit_data += "&" + para + "=0x" + parseInt(mod_speedconf[para]).toString(16);
		}
	}

	/* 判断是否没有修改任何参数 */
	if (submit_data == "") {
		lang_alert('no_modify_any_configuration')
		return;
	} 

	getReq ('all', submit_data);
}
/*type_wifi: wifi0/wifi1/all*/
/* 提交修改 */
function getReq (type_wifi, submit_para) {
	var url = url_host + 'wireless_device&action=modify&device=' + type_wifi + submit_para + url_time;
	$.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            if (data.result.code == 0) {
                console.log("success");
            	alert("修改成功！");
            	window.location.reload();
            }
        },
        error: function() {
            console.log("error");
        }
    })
}


