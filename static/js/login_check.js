var console = console || {
    log: function () {}
}
    
function outRemind() {
    lang_alert('relogin');
    sessionStorage.clear();
    //window.parent.location.href = "login.html";
}

var myTime = setTimeout(outRemind, 1000 * 60 * 10);

function resetTime() {
    console.log(myTime)
    clearTimeout(myTime);
    myTime = setTimeout(outRemind, 1000 * 60 * 10);
}

(function() {
    //rem
    var cssEl = document.createElement('style');
    document.documentElement.firstElementChild.appendChild(cssEl);

    function setPxPerRem() {
        var dpr = window.devicePixelRatio || 1;
        //把viewport分成10份的rem，html标签的font-size设置为1rem的大小;
        var pxPerRem = (document.documentElement.clientWidth + 200) * dpr / 10;
        cssEl.innerHTML = 'html{font-size:' + pxPerRem + 'px!important;}';
    }
    setPxPerRem();
    console.log(document.documentElement.clientWidth);
    //页面超时
    if (sessionStorage.username != "admin" && sessionStorage.time == undefined) {
        //window.parent.location.href = "login.html";
    }
    document.addEventListener("click", function() {
        console.log("1");
        resetTime();
    });




})()