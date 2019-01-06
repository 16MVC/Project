(function (a) {
    jQuery.extend({
        jc_getFromStation: function ()
        { return a.jc_getcookie("_jc_save_fromStation") },
        jc_setFromStation: function (d, c) {
            if ("undefined" == typeof (d) || "undefined" == typeof (c) || "" == d || "" == c)
            { throw "参数错误" } var b = d + "," + c; a.jc_setcookie("_jc_save_fromStation", b, 365 * 24 * 60 * 60)
        }, jc_getToStation: function () { return a.jc_getcookie("_jc_save_toStation") },
        jc_setToStation: function (d, c) {
            if ("undefined" == typeof (d) || "undefined" == typeof (c) || "" == d || "" == c)
            { throw "参数错误" } var b = d + "," + c; a.jc_setcookie("_jc_save_toStation", b, 365 * 24 * 60 * 60)
        }, jc_getFromDate: function () { return a.jc_getcookie("_jc_save_fromDate") },
        jc_setFromDate: function (c) {
            if ("undefined" == typeof (c)) { c = "" }
            var b = c; a.jc_setcookie("_jc_save_fromDate", b, 365 * 24 * 60 * 60)
        }, jc_getToDate: function () { return a.jc_getcookie("_jc_save_toDate") },
        jc_setToDate: function (c) {
            if ("undefined" == typeof (c)) { c = "" }
            var b = c; a.jc_setcookie("_jc_save_toDate", b, 365 * 24 * 60 * 60)
        }, jc_getWfOrDc: function () { return a.jc_getcookie("_jc_save_wfdc_flag") },
        jc_setWfOrDc: function (c) {
            if ("undefined" == typeof (c)) { throw "参数错误" }
            var b = c; a.jc_setcookie("_jc_save_wfdc_flag", b, 365 * 24 * 60 * 60)
        }, jc_getcookie: function (d) {
            var c = document.cookie.indexOf(d); var b = document.cookie.indexOf(";", c);
            return c == -1 ? "" : unescape(document.cookie.substring(c + d.length + 1, (b > c ? b : document.cookie.length)))
        }, jc_setcookie: function (h, g, f, e, c, d) {
            var b = new Date();
            b.setTime(b.getTime() + f * 1000); document.cookie = escape(h) + "=" + escape(g) + (b ? "; expires=" + b.toGMTString() : "") + (e ? "; path=" + e : ";path=/") + (c ? "; domain=" + c : "") + (d ? "; secure" : "")
        }
    })
})(jQuery);
var index_messages = {
    to_station_request: "请输入目的地!",
    from_station_request: "请输入出发地!",
    same_to_from_station: "出发地与目的地不能相同!",
    jianma_hanzi: "简拼/全拼/汉字",
    trainDate_request: "请输入出发日期!",
    trainDate_error: "请输入合法的出发日期(1970-01-01)!",
    backTrainDate_request: "请输入返程日期!",
    backTrainDate_request: "请输入返程日期!",
    trainDate_not_in: "出发日期不在预售期内!",
    backTrainDate_not_in: "返程日期不在预售期内!",
    backTrainDate_error: "请输入合法的返程日期(1970-01-01)!",
    error_date: "请输入合法的往返日期(返程日期不能小于出发日期)!"
};
