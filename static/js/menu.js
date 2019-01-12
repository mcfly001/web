var console = console || {
    log: function () {}
}
function actmenu(main_item,onpage) { 
    topmenu("");
    var menu_items = document.getElementsByTagName("td");
    for (var i = 0 ; i < menu_items.length; i++)
    {
        var m_img = menu_items[i].children[0];
        var gifpath  =  m_img.src;
    }
    
    if (onpage){
        $("a").removeClass("active");
        if (main_item.id != "overview" && main_item.id != "stalist") {
            $(main_item).addClass("active");
        }
        
        //console.log(window.parent.document.getElementByName("main_frame").location);
        console.log(window.parent.location,window.parent.document.getElementById("main_frame"))
        window.parent.document.getElementById("main_frame").src = onpage;
    }
}

function topmenu(filename) {
    // if (filename == "")
    // {
    //     window.parent.top_frame.document.getElementById("top_menu").innerHTML = "";
    //     return;
    // }
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            // window.parent.top_frame.document.getElementById("top_menu").innerHTML = xmlhttp.responseText.replace(/[\r\n]/g,'');
        }
    }
    xmlhttp.open("GET", "" + filename + "?t=" + Math.random(), true);
    xmlhttp.send();
}

$(document).ready(function() {
    $("tr td .badge").each(function(){
        $(this).text($(this).parent().parent().next().children().find("tr").length);
    });
    $("li .badge").each(function(){

        $(this).text($(this).parent().next().find("li").length);
    });
    //$("img").attr("src", "").css("display", "none");

    $(".submenu > a").click(function(){
        $(".submenu").removeClass("open");
        $(this).parent().addClass("open");
        $("[class='submenu'][class!='open']").find("ul").slideUp();

        $(".rfa").removeClass("fa-caret-down");
        $(".rfa").addClass("fa-caret-right");

        if ($(this).parent().find("ul").is(':hidden'))
        {   
            $(this).find(".rfa").removeClass("fa-caret-right");
            $(this).find(".rfa").addClass("fa-caret-down");
        }

        $(this).parent().find("ul").slideToggle();
    });
});