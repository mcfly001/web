$(document).ready(function() {
	ChangeTemplate();
    ChangeAuthAd($("#auth_ad_type").val());
    $("#auth_ad_type").change(function() {
        ChangeAuthAd($(this).val());
    });

    ChangeAuthType($("#auth_type").val());
    $("#auth_type").change(function() {
        ChangeAuthType($(this).val());
    });

    $("td span[class!=required]").prepend("&nbsp;&nbsp;");
    $("span.required").prepend("<font color='red'>*&nbsp;</b></font>");

	$("#template").change(function() {
		ChangeTemplate();
	});
})

function ChangeTemplate()
{
	var template = $("#template").val();
	if ("0" != template)
		$(".template").hide();
	else
		$(".template").show();
}

function ChangeAuthType(sval) {
    var $authTypeInput = $("#auth_type");
    if ($authTypeInput.length == 0)
        return;
    switch (sval)
    {
        case "0":
        default:
            $(".stuff_username").attr("disabled", "disabled");
            $(".stuff_password").attr("disabled", "disabled");
            $(".stuff_username").hide(0);
            $(".stuff_password").hide(0);
            break;
        case "1":
            $(".stuff_username").removeAttr("disabled", "disabled");
            $(".stuff_password").removeAttr("disabled", "disabled");
            $(".stuff_username").show();
            $(".stuff_password").show();
            break;
    }
}

function ChangeAuthAd(sVal) {
    var $authAdInput = $("#auth_ad_url");
    if ($authAdInput.length == 0)
        return;
    switch (sVal)
    {
        case "0":
        case "1":
        default:
            $authAdInput.attr("disabled", "disabled");
            $authAdInput.hide(0);
            break;
        case "2":
            $authAdInput.removeAttr("disabled", "disabled");
            $authAdInput.show();
            break;
    }
}

function CheckSubmit() {
    if (document.form1.inname.value == "")
    {
        PopCheckError("请输入Portal策略名");
        document.form1.inname.focus();
        return false;
    }
    else if (!/^[\w\-]*$/.test(document.form1.inname.value))
    {
        PopCheckError("Portal策略名只能为字母、数字、- 或 _");
        document.form1.inname.select();
        return false;
    }
    /*
    if (document.form1.ad_url.value != "" && !/^(http|https):\/\/([^ \f\n\r\t\v\.]+\.)+[^ \f\n\r\t\v\.]+$/.test(document.form1.ad_url.value))
    {
        PopCheckError("请输入完整的链接地址，如http://www.dunchongnet.com，包含http://");
        document.form1.ad_url.select();
        return false;
    }
    */

    var auth_type = document.getElementById("auth_type").value;
    var stuff_username = document.getElementsByName("stuff_username")[0].value;
    var stuff_password = document.getElementsByName("stuff_password")[0].value;

    if (auth_type == "1")
    {
        if (stuff_username == "")
        {
            PopCheckError("请输入用户名");
            document.form1.stuff_username.select();
            return false;
        }
        if (stuff_password == "")
        {
            PopCheckError("请输入密码");
            document.form1.stuff_password.select();
            return false;
        }
    };
    
    return true;
}