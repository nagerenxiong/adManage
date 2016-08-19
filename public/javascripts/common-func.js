function loading() {
    $("#loadingLayer").show();
}
function loaded() {
    $("#loadingLayer").hide();
}
function dialog(msg, ok, url) {
    var rc = "ui-icon-circle-check";
    var ac = "ui-icon-alert";
    var tt = "警告：出错啦！！！";
    if (ok) {
        rc = "ui-icon-alert";
        ac = "ui-icon-circle-check";
        tt = "恭喜：成功啦！！！";
    }
    $("#dialogIcon").removeClass(rc).addClass(ac);
    $("#dialogTip").html(msg);
    $("#dialog>p").addClass("ui-state-highlight");
    $("#dialog").dialog({
        title: tt,
        buttons: [{
                text: "确定",
                click: function () {
                    $(this).dialog("close");
                    if (url)
                        location = url;
                }
            }, {
                text: "后退",
                click: function () {
                    $(this).dialog("close");
                    history.go(-1);
                }
            }]
    }).dialog("open");
    setTimeout(function () {
        $("#dialog>p").removeClass("ui-state-highlight");
    }, 5000);
}
function checkInput(obj, regexp) {
    if ($(obj).val().match(regexp)) {
        $(obj).next("span").removeClass("ui-state-error");
        $(obj).parent().next("span").removeClass("ui-state-error");
        return true;
    } else {
        $(obj).focus().next("span").addClass("ui-state-error");
        $(obj).focus().parent().next("span").addClass("ui-state-error");
        return false;
    }
}
function setCoo(name, value, days) {
    var cookie = name + "=" + encodeURIComponent(value);
    if (days) {
        var now = new Date();
        now.setDate(now.getDate() + days);
        cookie += ";expires=" + now.toUTCString();
    }
    document.cookie = cookie + ";path=/";
}
function getCoo(name) {
    var all = document.cookie;
    var start = all.indexOf(name + "=");
    if (all.length < 1 || start == -1)
        return "";
    start = start + name.length + 1;
    var end = all.indexOf(";", start);
    if (end == -1)
        end = all.length;
    return decodeURIComponent(all.substring(start, end));
}
function checkCoo(name, value, days) {
    var c_value = getCoo(name);
    if (c_value) {
        setCoo(name, parseInt(c_value) + 1, days);
        return parseInt(c_value) + 1;
    } else {
        setCoo(name, value, days);
        return value;
    }
}
function codeInsert(a, b) {
    if (document.selection)
        a.focus(), document.selection.createRange().text = b;
    else if ("number" === typeof a.selectionStart && "number" === typeof a.selectionEnd) {
        var d = a.selectionEnd, c = a.value;
        a.value = c.substring(0, a.selectionStart) + b + c.substring(d, c.length);
    } else
        a.value += b;
}
function htmlspecialchars(a) {
    a = a.replace(/&/img, '&amp;');
    a = a.replace(/"/img, '&quot;');
    a = a.replace(/'/img, '&#039;');
    a = a.replace(/</img, '&lt;');
    a = a.replace(/>/img, '&gt;');
    return a;
}