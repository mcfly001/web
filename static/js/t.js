/**
 * DESCRIPTION:
 *  UPDATETIME:2013.7.31
 *   DEVELOPER:KK
 * REVISETIMES:2
 *  CREATETIME:2013.6.20
 *   COPYRIGHT:HANGZHOU DUNCHONG TECHNOLOGY CO.,LTD.
 */

/**
 * [T Basic]
 * @param  {[type]} window [description]
 * @return {[type]}        [description]
 */
(function(window) {

    var document = window.document,
        navigator = window.navigator,
        location = window.location,

        i_error = -1,
        s_class_pref = "_BX_",
        s_id_pref = "_BX_",

        regx_ip = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/,
        regx_domain = /^((http|https):\/\/)?[a-z0-9]+(\.[\w]+){0,2}\.[a-z]+$/,
        regx_mask = /^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0))$/,
        regx_mac = /([a-fA-F\d]{2}-){5}[a-fA-F\d]{2}/,
        regx_name = /^[\w\- \u4e00-\u9fa5]+$/,
        regx_url = /^(http|https):\/\/[\w\- \?\/\&\+:\.]*$/,
        regx_pass = /^[\u4e00-\u9fa5]+$/;

    var id = function(sid) {
        return document.getElementById(sid);
    };

    var funx = {
        getType: function(value) {
            return Object.prototype.toString.call(value);
        },
        isArray: function(value) {
            return Object.prototype.toString.call(value) == "[object Array]";
        },
        isObject: function(value) {
            return Object.prototype.toString.call(value) == "[object Object]";
        },
        isFunction: function(value) {
            return Object.prototype.toString.call(value) == "[object Function]";
        },
        /**
         * [eachObject description]
         * @param {[type]} obj   [description]
         * @param {[type]} fCall [function(key, value, index, self)]
         */
        eachObject: function(obj, fcall) {
            if (this.isObject(obj)) {
                var i = 0;
                for (var param in obj) {
                    fcall(param, obj[param], i, obj);
                    i++;
                }
            }
        },
        eachArray: function(array, fcall) {
            if (this.isArray(array)) {
                if (array.forEach)
                    array.forEach(fcall);
                else {
                    for (var i = 0; i < array.length; i++)
                        fcall(array[i], i, array);
                }
            }
        },
        every: function(array, fcall) {
            if (array.every)
                return array.every(fcall);
            else {
                var bret;
                for (var i = 0; i < array.length; i++) {
                    bret = fcall(array[i], i, array);
                    if (!bret)
                        return false;
                }
                return true;
            }
        },
        getInnerText: function(dom) {
            return (typeof dom.textContent == "string") ? dom.textContent : dom.innerText;
        },
        escapeHtml: function(str) {
            if (str != "" && typeof str === "string") {
                return str.replace(/[&<> ]/g, function(word) {
                    var otags = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        " ": "&nbsp;"
                    };
                    return otags[word] || word;
                });
            } else if (typeof str === "number")
                return str;
            else
                return "";
        },
        addSelectItem: function(dom, show, val) {
            for (var i = 0; i < dom.options.length; i++) {
                if (dom.options[i].value == val)
                    return i;
            }
            dom.options[dom.options.length] = new Option(show, val);
            return (dom.options.length - 1);
        },
        setSelectItem: function(dom, val) {
            for (var i = 0; i < dom.options.length; i++) {
                if (dom.options[i].value == val) {
                    dom.options[i].selected = true;
                    return i;
                }
            }
            return -1;
        },
        initSelectItem: function(dom, aval, ftransShow) {
            dom.options.length = 0;
            if (ftransShow != undefined) {
                for (var i = 0; i < aval.length; i++)
                    dom.options[i] = new Option(ftransShow(aval[i], i), aval[i]);
            } else {
                for (var i = 0; i < aval.length; i++)
                    dom.options[i] = new Option(aval[i], aval[i]);
            }
        },
        findSelectValue: function(dom, sval) {
            for (var i = 0; i < dom.options.length; i++) {
                if (dom.options[i].value == sval)
                    return i;
            }
            return -1;
        },
        findSelectText: function(dom, stext) {
            for (var i = 0; i < dom.options.length; i++) {
                if (this.getInnerText(dom.options[i]) == stext)
                    return i;
            }
            return -1;
        },
        /*
        splitTrimBlank: function(str, sdelimChar) {
            var atmp = str.split(sdelimChar);
            var alist = [];
            this.eachArray(atmp, function(val) {
                if (val != "")
                    alist.push(val);
            });
            return alist;
        },
        */
        splitTrimBlank: function(str, sdelim, subdelim) {
            var vbj = null;
            var atemp = str.split(sdelim);

            if (subdelim == null) {
                vbj = [];
                for (var i = 0; i < atemp.length; i++) {
                    if (atemp[i] != "")
                        vbj.push(atemp[i]);
                }
            } else {
                vbj = {};
                for (var i = 0; i < atemp.length; i++) {
                    if (atemp[i] != "") {
                        var asubtemp = atemp[i].split(subdelim);
                        vbj[asubtemp[0]] = asubtemp[1];
                    }
                }
            }
            return vbj;
        },
        loadScript: function(spath, scharset) {
            var dhead = document.getElementsByTagName("head")[0];
            var dscript = document.createElement("script");
            dscript.type = "text/javascript";
            dscript.src = spath;
            dhead.appendChild(dscript);
        },
        loadCss: function(spath, scharset) {
            var dhead = document.getElementsByTagName("head")[0];
            var dscript = document.createElement("link");
            dscript.rel = "stylesheet";
            dscript.type = "text/css";
            dscript.href = spath;
            dhead.appendChild(dscript);
        },
        /**
         * 删除URL字符串中指定的 pair
         * @param {String} url URL字符串
         * @param {String} key 被删除的pair名
         * @return {String} 被删除指定 pair 后的URL字符串
         */
        deleteUrlPair: function(surl, skey) {
            skey = escapeReg(skey);
            var rtmp = new RegExp("((\\?)(" + skey + "=[^&]*&)+(?!" + skey + "=))|(((\\?|&)" + skey + "=[^&]*)+$)|(&" + skey + "=[^&]*)", "g");
            return surl.replace(rtmp, "\x241");
        },
        eventPosition: function(eve) {
            var left, top;
            if (eve.pageX) {
                left = eve.pageX;
                top = eve.pageY;
            } else if (eve.x) {
                left = eve.x;
                top = eve.y;
            } else {
                left = eve.screenX;
                top = eve.screenY;
            }
            return {
                X: left,
                Y: top
            };
        },
        eventTarget: function(eve) {
            if (eve.target)
                return eve.target;
            else if (eve.srcElement)
                return eve.srcElement;
        },
        addEvent: function(dom, sevent, func) {
            if (!dom)
                return;
            if (dom.addEventListener) {
                dom.addEventListener(sevent, func, false); //非ie 和ie9
            } else if (dom.attachEvent) {
                dom.attachEvent("on" + sevent, func); //ie6到ie8
            } else {
                dom["on" + sevent] = func; //ie5
            }
        },
        removeEvent: function(dom, sevent, func) {
            if (!dom)
                return;
            if (dom.removeEventListener) {
                dom.removeEventListener(sevent, func, false);
            } else if (dom.detachEvent) {
                dom.detachEvent("on" + sevent, func);
            } else {
                dom["on" + sevent] = null;
            }
        },
        val: function(sid) {
            var dom = id(sid);
            if (dom)
                return dom.value;
            else
                return "";
        },
        isEmptyObj: function(obj) {
            for (var param in obj)
                return false;
            return true;
        },
        getScrollPos: function(dom) {
            var win = null,
                x = 0,
                y = 0;

            if (!dom || dom && typeof dom === "object" && "setInterval" in dom) {
                win = window;
                if ("PageXOffset" in win) {
                    x = win.pageXOffset;
                    y = win.pageYOffset;
                } else {
                    x = win.document.documentElement.scrollLeft || win.document.body.scrollLeft;
                    y = win.document.documentElement.scrollTop || win.document.body.scrollTop;
                }
            } else {
                x = dom.scrollLeft;
                y = dom.scrollTop;
            }
            return { x: x, y: y };
        }
    };

    funx.id = id;

    function escapeReg(str) {
        return str.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), "\\\x241");
    }

    var getByClass = function(sclassname, dparent, stagname) {
        if (document.getElementsByClassName) {
            //Todo:增加 dparent, stagname 的筛选
            var nodes = (dparent || document).getElementsByClassName(sclassname),
                results = [];
            for (var i = 0; i < nodes.length; i++) {
                if (stagname && (nodes[i].tagName.toUpperCase() !== stagname.toUpperCase())) {
                    continue;
                }
                //(new ctest()).add(sclassname, nodes[i].className);
                results.push(nodes[i]);
            }
            return results;
        } else {
            stagname = stagname || "*";
            var nodes = (dparent || document).getElementsByTagName(stagname),
                results = [];
            for (var i = 0; i < nodes.length; i++) {
                if (sclassname && nodes[i].className && nodes[i].className.indexOf(sclassname) != -1) {
                    //(new ctest()).add(sclassname, nodes[i].className);
                    results.push(nodes[i]);
                }
            }
            return results;
        }
    };

    funx.c2ds = getByClass;

    var ctest = function(sid) {
        this.sid_ = sid || s_id_pref + "ctest";
        this.dom_ = id(this.sid_);

        var self = this;
        if (!self.dom_) {
            var elem = document.createElement("div");
            elem.id = self.sid_;
            document.body.appendChild(elem);
            self.dom_ = elem;
            window.onscroll = function() {
                self.resetPosition();
            }
        }
        self.dom_.className = "ctest";
        self.dom_.style.display = "none";
        self.time_ = new Date();
        self.torigin_ = self.time_;
    };

    ctest.prototype.resetPosition = function() {
        var oscroll = T.getScrollPos();
        var dom = this.dom_;
        dom.style.display = "";
        dom.style.left = (oscroll.x + 5).toString() + "px";
        dom.style.top = (oscroll.y + 5).toString() + "px";
    }

    ctest.prototype.add = function(scontent) {
        var now = new Date();
        var duration = now.getTime() - this.time_.getTime();
        var dorigin = now.getTime() - this.torigin_.getTime();
        var dom = this.dom_;
        if (dom) {
            this.resetPosition();
            var elem = document.createElement("div");
            var smsg = "";
            for (var i = 0; i < arguments.length; i++) {
                smsg += arguments[i] + " | ";
            }
            elem.innerHTML = "<strong>+" + duration + "ms, total:" + dorigin + "ms:</strong> " + smsg;
            dom.appendChild(elem);
        }
        this.time_ = new Date();
        return this;
    }

    ctest.prototype.show = function(scontent) {
        var now = new Date();
        var duration = now.getTime() - this.time_.getTime();
        var dorigin = now.getTime() - this.torigin_.getTime();
        var dom = this.dom_;
        if (dom) {
            this.resetPosition();
            var smsg = "";
            for (var i = 0; i < arguments.length; i++) {
                smsg += arguments[i] + " | ";
            }
            dom.innerHTML = "<div><strong>+" + duration + "ms, total:" + dorigin + "ms:</strong> " + smsg + "</div>";
        }
        this.time_ = new Date();
        return this;
    }

    ctest.prototype.popId = function() {
        return this.sid_;
    }

    funx.CTest = ctest;

    var otest = null;
    funx.S = function() {
        if (otest)
            return otest.add.apply(otest, arguments);
        else {
            otest = new ctest;
            this.CDialog({ title: "u5A04u5A77\u6D4B\u8BD5", sid: otest.popId() });
            return otest.add.apply(otest, arguments);
        }
    }

    funx.N = function() {
        if (otest)
            return otest.show.apply(otest, arguments);
        else {
            otest = new ctest;
            this.CDialog({ title: "u5A04u5A77\u6D4B\u8BD5", sid: otest.popId() });
            return otest.show.apply(otest, arguments);
        }
    }

    /**
     * [CDialog description]
     * @param {[type]} o [description]
     * o {
     *     title:
     *     scontent:
     *     fcontent:
     *     fbtn:
     *     closebtn:true
     *     sid:
     *     onlyone:
     * }
     */

    funx.CDialog = function(o) {
        var title = o.title,
            content = o.fcontent ? o.fcontent() : "",
            btn = o.fbtn ? o.fbtn() : "",
            onlyone = o.onlyone;

        var spref = "_dialog_";
        var isactive = 0;
        if (ostart) {
            ostart.x += 20;
            ostart.y += 20;
        } else {
            var ostart = {
                x: 200,
                y: 120
            };
        }

        if (onlyone)
            $("." + spref + "dialog").remove();

        function createDiv() {
            return document.createElement("div");
        }
        var dialog = createDiv();
        dialog.className = spref + "dialog";

        var dhead = createDiv();
        dhead.innerHTML = "<div class='" + spref + "title'>" + title + "</div>";
        var dclose = createDiv();
        dclose.className = spref + "close";
        dclose.innerHTML = "X";
        T.addEvent(dclose, "click", function() {
            document.body.removeChild(dialog);
        });
        dhead.className = spref + "head";
        dhead.appendChild(dclose);

        dialog.appendChild(dhead);

        var dcontent = null;
        if (o.fcontent)
            dialog.appendChild(o.fcontent(dialog));
        else if (o.scontent != null) {
            dcontent = createDiv();
            dcontent.className = spref + "content";
            dcontent.innerHTML = o.scontent;
            dialog.appendChild(dcontent);
        } else if (o.sid) {
            dcontent = id(o.sid);
            if (dcontent) {
                dcontent.parentNode.removeChild(dcontent);
                dcontent.className = spref + "content";
                dialog.appendChild(dcontent);
            }
        }

        if (o.fbtn)
            dialog.appendChild(o.fbtn(dialog));

        document.body.appendChild(dialog);

        T.addEvent(dhead, "mousedown", function(event) {
            move(event, 1);
        });

        T.addEvent(document.body, "mousemove", function(event) {
            move(event, 0);
        });

        T.addEvent(document.body, "mouseup", function(event) {
            move(event, 2);
        });

        reposition(($(window).width() - $(dialog).width()) / 2,
            ($(window).height() - $(dialog).height()) / 2);
        opos = ostart;

        function move(event, mark) {
            if (mark == 1) {
                isactive = 1;
                opos.x = event.clientX;
                opos.y = event.clientY;
            } else if (mark == 2) {
                isactive = 0;
            } else if (mark == 0 && isactive == 1) {
                var $dom = $(dialog);
                reposition($dom.offset().left + event.clientX - opos.x,
                    $dom.offset().top + event.clientY - opos.y)
                opos.x = event.clientX;
                opos.y = event.clientY;
            }
        }

        function reposition(x, y) {
            var $dom = $(dialog);
            $dom.css("left", x);
            $dom.css("top", y);
        }

        return dcontent;
    }

    /**
     * [ExVal description]
     * @param {[type]} val [description]
     */
    function exVal(val) {
        this.int_ = 0;
        this.str_ = "";
        this.array_ = [];
        this.obj_ = {};

        var self = this;

        if (typeof val === "number")
            self.int_ = val;
        else if (typeof val === "string")
            self.str_ = val;
        else if (funx.isArray(val))
            self.array_ = val;
        else if (funx.isObject(val))
            self.obj_ = val;
    }

    exVal.prototype = {
        join: function(scharactor) {
            return this.array_.join(scharactor);
        },
        split: function(scharactor) {
            var atmp = [];
            var aset = [];
            atmp = this.str_.split(scharactor);
            funx.eachArray(atmp, function(val) {
                if (val != "")
                    aset.push(val);
            });
            atmp = null;
            return aset;
        }
    }

    window.T = funx;

    var Xrandom = (function() {

        var Xrandom = function(str) {
            return new random(str);
        };

        function random(str) {
            this.schar_ = str || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }

        random.prototype.gen = function(isize) {
            var res = "";
            var schar = this.schar_;
            var charLen = schar.length;
            for (var i = 0; i < isize; i++) {
                var index = Math.round(Math.random() * (charLen - 1));
                res += schar.charAt(index);
            }
            return res;
        }

        random.prototype.rand = function(imin, imax) {
            var inum = imin;
            if (imax != null) {
                inum = imax - imin;
                return imin + Math.round(Math.random() * inum);
            } else
                return Math.round(Math.random() * inum);
        }

        var extend = function(o, ofn) {
            for (var param in ofn)
                o[param] = ofn[param];
        }

        extend(Xrandom, {
            cut: function(str, isize) {
                var atip = [];
                var icount = Math.ceil(str.length / isize);
                for (var i = 0; i < icount; i++)
                    atip.push(str.substr(i * isize, isize));
                return atip;
            },
            genIp: function(shex) {
                var s1 = shex ? shex : Xr("0123456789ABCDEF").gen(8);
                var s = parseInt(s1, 16).toString(2);
                /**
                 * fill "0" when length less than 32
                 */
                if (s.length < 32) {
                    var k = 32 - s.length;
                    var stmp = "";
                    for (var i = 0; i < k; i++)
                        stmp += "0";
                    s = stmp + s;
                }
                var aipCut = this.cut(s, 8);
                var aipCutTmp = [];
                for (var i = 0; i < aipCut.length; i++)
                    aipCutTmp[i] = parseInt(aipCut[i], 2).toString();
                aipCut = null;
                return aipCutTmp.join(".");
            },
            genChinese: function(shex) {
                var s = (shex ? shex : "\\u" + (parseInt("4e00", 16) + Xr().rand(20901)).toString(16));

                var s2 = s.replace(/\\u([0-9a-zA-Z]{4})/g, "%u$1");
                return unescape(s2);
            }
        });

        Xrandom.extend = extend;
        return Xrandom;
    })();

    window.Xr = Xrandom;



})(window);

function creGoPage(pageid, goid) {
    var newnode = document.createElement("div");
    newnode.setAttribute("id", "pa");
    var nodec1 = document.createTextNode("第 ");
    var nodec2 = document.createTextNode(" 页 ");
    if (g_lang === "zh") {
        nodec1 = document.createTextNode("第 ");
        nodec2 = document.createTextNode(" 页 ");
    } else  {
        nodec1 = document.createTextNode("The ");
        nodec2 = document.createTextNode(" page ");
    }
    newnode.appendChild(nodec1);

    var node1 = document.createElement("input");
    node1.setAttribute("type", "text");
    node1.setAttribute("id", pageid);
    node1.style.width = "25px";
    node1.style.height = "16px";
    newnode.appendChild(node1);
    newnode.appendChild(nodec2);

    var node2 = document.createElement("input");
    node2.setAttribute("type", "button");

    if (g_lang === "zh") {
        node2.setAttribute("value", "跳转");
    } else  {
        node2.setAttribute("value", "Jump");
    }

    node2.setAttribute("class", "btn");
    node2.setAttribute("id", goid);
    newnode.appendChild(node2);
    newnode.style.display = "inline-block";
    return newnode;
};
var rDrag = {

    o: null,

    init: function(o) {
        o.onmousedown = this.start;
    },
    start: function(e) {
        var o;
        e = rDrag.fixEvent(e);
        e.preventDefault && e.preventDefault();
        rDrag.o = o = document.getElementById("addf");
        o.x = e.clientX - rDrag.o.offsetLeft;
        o.y = e.clientY - rDrag.o.offsetTop;
        console.log(o.x, o.y, e.clientX, e.clientY, rDrag.o.offsetLeft, rDrag.o.offsetTop)
        document.onmousemove = rDrag.move;
        document.onmouseup = rDrag.end;
    },
    move: function(e) {
        // e = rDrag.fixEvent(e);
        var oLeft, oTop;
        var h = document.documentElement.clientHeight;
        var w = document.documentElement.clientWidth;

        oLeft = e.clientX - rDrag.o.x;
        if (oLeft < 0) { //弹窗不能超出浏览器可视窗口边界
            oLeft = 0;
        } else if (oLeft > w - rDrag.o.offsetWidth) {
            oLeft = w - rDrag.o.offsetWidth;
        }

        oTop = e.clientY - rDrag.o.y;
        if (oTop < 0) {
            oTop = 0;
        } else if (oTop > h - rDrag.o.offsetHeight) {
            oTop = h - rDrag.o.offsetHeight
            if (oTop < 0)
                oTop = 0;
        }

        rDrag.o.style.left = oLeft + 'px';
        rDrag.o.style.top = oTop + 'px';
    },
    end: function(e) {
        e = rDrag.fixEvent(e);
        rDrag.o = document.onmousemove = document.onmouseup = null;
    },
    fixEvent: function(e) {
        if (!e) {
            e = window.event;
            e.target = e.srcElement;
            e.layerX = e.offsetX;
            e.layerY = e.offsetY;
        }
        return e;
    }
};

function showDiv(arr) {
    for (var x = 0; x < arr.length; x++) {
        $(arr[x]).css({ "display": 'block' });
    }


}

function hideDiv(arr) {
    for (var x = 0; x < arr.length; x++) {
        $(arr[x]).css({ "display": 'none' });
    }
}


var countOption = 0;

function addOption(inputPid, delid, sourceinp) {
    var parent = document.getElementById(inputPid);
    var parentdel = document.getElementById(delid);
    var newdel = document.createElement("button");
    var newinput = document.createElement("input");
    if ($("#" + inputPid + " input") == "") {
        countOption = -1;
    }
    countOption += 1;
    newinput.setAttribute("class", "form-control");
    newinput.setAttribute("id", sourceinp + countOption);
    newinput.setAttribute("type", "text");
    parent.appendChild(newinput);
    newdel.setAttribute("class", "btn-danger btn");
    console.log(sourceinp);
    newdel.setAttribute("onclick", "delOption(this, \"" + sourceinp + "\")");
    console.log(newdel.getAttribute("onclick"));
    newdel.setAttribute("id", countOption + delid);
    newdel.innerHTML = allResources['delete'][g_lang];
    parentdel.appendChild(newdel);
    console.log(parentdel.childNodes, parent.childNodes);
};

function delOption(obj, sourceinp) {
    console.log(sourceinp);
    var delid = obj.getAttribute("id");
    console.log(parseFloat(delid));
    var no = parseFloat(delid) - 1;
    var delbtn = document.getElementById(delid);
    delbtn.parentNode.removeChild(delbtn);
    console.log(sourceinp);
    switch (no) {
        case 0:
            if (document.getElementById(sourceinp) != null) {
                console.log(1);
                console.log(document.getElementById(sourceinp));
                var delinput = document.getElementById(sourceinp);
            } else if (document.getElementById(sourceinp + "00") != null) {
                console.log(2);
                console.log(document.getElementById(sourceinp + "00"));
                var delinput = document.getElementById(sourceinp + 0);
            } else if (document.getElementById(sourceinp + 1) != null) {
                console.log(3);
                console.log(document.getElementById(sourceinp + 1));
                var delinput = document.getElementById(sourceinp + 1);
            }
            break;
        default:
            console.log(4);
            var delinput = document.getElementById(sourceinp + no);
            break;
    }
    console.log(delinput);
    delinput.parentNode.removeChild(delinput);
};


var url_host = '../../cgi-bin/common.cgi?luaname=';
var url_time = '&tn=' + new Date().getTime();

function get_real_data(luaname) {
    var rdata, url;
    luaname = luaname + "";
    if (luaname.indexOf(".") == -1) {
        url = url_host + luaname + "&action=read" + url_time;
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            success: function(data) {
                if (data.result.code == 0) {
                    rdata = data.result.data;
                    console.log(rdata);
                } else {
                    console.log("code is not 0");
                    rdata = "";
                }
            }
        });
        return rdata;
    } else {
        url = '../../cgi-bin/' + luaname + '?action=read&time=' + new Date().getTime();;
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            success: function(data) {
                if (data.code == 0) {
                    rdata = data.data;
                    console.log(rdata);
                } else {
                    console.log("code is not 0");
                    rdata = "";
                }
            }
        });
        return rdata;
    }
}

function openLoad() {
    var node_bgd = '<div class="div-bgd"><div class="div-bgd1"><div class="div-bgd2"></div></div></div>',
        node_load = '<div class="load_div" style="display:none; text-align: center; font-size: 20px; color: red;"><p><img src="../img/loadingimg.gif" alt="">' + allResources['config_set_wait'][g_lang] + '</p></div>';
    if ($(".load_div").length > 0) {
        showDiv([".div-bgd", ".load_div"]);
    } else {
        $("body").prepend(node_load);
        $("body").prepend(node_bgd);
        showDiv([".div-bgd", ".load_div"]);
    }

}

function closeLoad() {
    hideDiv([".div-bgd", ".load_div"]);
}

function check_code0(url_new) {
    url_new = url_new + "";
    if (url_new.indexOf(".lua") == -1) {
        $.ajax({
            url: url_new,
            type: 'GET',
            contentType: 'application/json',
            beforeSend: function() {
                openLoad();
                hideDiv([".addf"]);

            },
            success: function(data) {
                var obj = data.result;
                if (obj.code == 0) {
                    closeLoad()
                    lang_alert("apply_success")
                    window.location.reload();
                } else {
                    closeLoad()
                    alert(data.result.result);
                    console.log("code is not 0");
                }
            },
            error: function() {
                closeLoad()
                lang_alert("apply_fail")
                console.log("err");
            }
        })
    } else {
        $.ajax({
            url: url_new,
            type: 'GET',
            contentType: 'application/json',
            beforeSend: function() {
                openLoad();
                hideDiv([".addf"]);

            },
            success: function(data) {
                var obj = data;
                if (obj.code == 0) {
                    closeLoad()
                    lang_alert("apply_success")
                    window.location.reload();
                } else {
                    closeLoad()
                    alert(data.result.result);
                    console.log("code is not 0");
                }
            },
            error: function() {
                closeLoad()
                lang_alert("apply_fail")
                console.log("err");
            }
        })
    }

}

function check_code1(url_new) {
    url_new = url_new + "";
    if (url_new.indexOf(".lua") == -1) {
        $.ajax({
            url: url_new,
            type: 'GET',
            async: false,   //发送同步请求
            contentType: 'application/json',
            beforeSend: function() {
                location.href = "wait_refresh_page.html";
            }
        })
    } else {
        $.ajax({
            url: url_new,
            type: 'GET',
            contentType: 'application/json',
            beforeSend: function() {
                location.href = "wait_refresh_page.html";
            }
        })
    }
}

function reboot(msg) {
     return confirm(msg);
 }
 
window.onload = function() {
    $("#Tadd").click(function() {
        showDiv(["#addf", ".div-bgd"]);
    });
    $("#close").click(function(event) {
        hideDiv([".addf", ".div-bgd"]);
    });
    $(".close").click(function(event) {
        hideDiv([".addf", ".div-bgd"]);
    });
    $(".cansel").click(function(event) {
        hideDiv([".addf", ".div-bgd"]);
    });
    if (document.getElementById("addf-head")) {
        var pop_height = $("#addf").height(),
            pop_width = $("#addf").width(),
            w_height = $(window).height(),
            w_width = $(window).width();
        real_h = ((w_height / 2 - pop_height / 2) > 0) ? (w_height / 2 - pop_height / 2) : 0;
        real_w = ((w_width / 2 - pop_width / 2) > 0) ? (w_width / 2 - pop_width / 2) : 0;
        $(".addf").css({ "top": real_h + "px", "left": real_w + "px" })
        console.log("h ", pop_height, "w", pop_width, "h", w_height, "w", w_width)
        var obj = document.getElementById('addf-head');
        rDrag.init(obj);
    }
}
//校验名字，只能是字母和数字组成
function IsName(str){
    var reg=/^[a-zA-Z0-9]+$/;
    return reg.test(str);
}
//整数校验
function IsNum(num){
    var reg=/^\d+$/;
    return reg.test(num);
}
// 校验IP地址
function IsIp(ip){
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    return reg.test(ip);
}
//校验子网掩码
function IsMask(mask){
    var reg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0))$|^(255\.255\.255\.255)$/;
    return reg.test(mask);
}
//校验domain
function IsDomaim(domain){
    var strRegex = '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
                + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
                + '[a-z]{2,6})' ;// first level domain- .com or .museum 
    var re=new RegExp(strRegex); 
    return re.test(domain);
}

//校验MAC地址
function IsMac(mac){
    var reg=/^([0-9a-fA-F]{2})(([/:][0-9a-fA-F]{2}){5})$/;
    return reg.test(mac);   
}

//将一般格式的IP地址转换成 全位数的十进制整数，如：1.1.1.1 --->001001001001,即十进制整数1001001001 
function IptoNum(ip){
    var str="",
        sub = ip.split(".");
    for(var i=0;i<sub.length;i++){
        if(sub[i].length == 1){
            sub[i] = "00"+sub[i];
        }
        if(sub[i].length == 2){
            sub[i] = "0"+sub[i];
        }
        str += sub[i];
    }
    return parseInt(str);
}

function NumtoIp(number) {
    return (Math.floor(number/(256*256*256))) + "." +
        (Math.floor(number%(256*256*256)/(256*256))) + "." +
        (Math.floor(number%(256*256)/256)) + "." +
        (Math.floor(number%256));
}

//检测两个IP是否在同一个网段
function IsEqualIPAddress (addr1,addr2,mask){
    var res1 = [], res2 = [];
    addr1 = addr1.split(".");
    addr2 = addr2.split(".");
    mask = mask.split(".");
    for(var i=0; i<4; i++){
        res1.push( parseInt(addr1[i])&parseInt(mask[i]) );
        res2.push( parseInt(addr2[i])&parseInt(mask[i]) );
    }
    if(res1.join(".") == res2.join(".")){
        return true;
    }else{
        return false;
    }
} 
//检测网络地址与掩码是否匹配
function Network_mask_consistency(net, mask)
{
    var res1 = [], res2 = [];
    net = net.split(".");
    mask = mask.split(".");
    for (var i = 0; i<4; i++) {
        res1.push( parseInt(net[i]) | parseInt(mask[i]) )
    }
    if (res1.join(".") == mask.join(".")) {
        return true;
    } else {
        return false;
    }
}
