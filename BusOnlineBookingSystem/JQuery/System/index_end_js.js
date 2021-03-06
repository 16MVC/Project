﻿var frameComplete = false;
var iframeOnload = function () {
    frameComplete = true
}; (function () {
    var g = 8000;
    var a = "";
    var h = "";
    $(document).ready(function () {
        initPageTitle(0);
        $._index_init_style();
        var j = "https://ad.12306.cn/res/0003.html";
        $("#item_pic").html('<iframe onload="iframeOnload()" style="border:0;width:100%;height:450px;" id="ad_frame_index" src="' + j + '"></iframe>');
        $._ad_frame_index();
        $._index_initQueryInput();
        $._index_initChangeStation();
        $._index_initSearch();
        $._index_sessionUser();
        jQuery("#item_pic").slide({
            titCell: ".pic-hd li",
            mainCell: ".pic-bd ul",
            autoPlay: true,
            delayTime: 1000,
            interTime: 10000
        })
    });
    jQuery.extend({
        _index_initCookieValues: function () {
            var l = $.jc_getFromStation();
            if (l) {
                var k = l.split(",");
                if (k && k.length == 2) {
                    $("#fromStationText").val(k[0]);
                    $("#fromStation").val(k[1])
                }
            }
            var p = $.jc_getToStation();
            if (l) {
                var k = p.split(",");
                if (k && k.length == 2) {
                    $("#toStationText").val(k[0]);
                    $("#toStation").val(k[1])
                }
            }
            var j = $.jc_getFromDate();
            if (j) {
                if (j >= initTrainDate && j <= initToDate) {
                    $("#train_date").val(j)
                } else {
                    $("#train_date").val(initTrainDate)
                }
            } else {
                $("#train_date").val(initTrainDate)
            }
            var n = $.jc_getToDate();
            if (n) {
                if (n >= initTrainDate && n <= initToDate) {
                    $("#back_train_date").val(n)
                } else {
                    $("#back_train_date").val(initTrainDate)
                }
            } else {
                $("#back_train_date").val(initTrainDate)
            }
            var o = true;
            var m = $.jc_getWfOrDc();
            if (m && "wf" == m) {
                o = false;
                $("#_wf_span_date").removeClass("color999");
                $("#dc").attr("checked", false);
                $("#wf").attr("checked", true)
            }
            return o
        },
        _index_setCookieValues: function () {
            $.jc_setFromStation($("#fromStationText").val(), $("#fromStation").val());
            $.jc_setToStation($("#toStationText").val(), $("#toStation").val());
            $.jc_setFromDate($("#train_date").val());
            $.jc_setToDate($("#back_train_date").val());
            $.jc_setWfOrDc($("#wf").is(":checked") ? "wf" : "dc")
        },
        _index_init_style: function () {
            $("#ccTypeAll").css("cursor", "pointer");
            $("#ccStartTimeAll").css("cursor", "pointer");
            $("#ccArriveTimeAll").css("cursor", "pointer");
            $("#ccSeatTypeAll").css("cursor", "pointer");
            $("#change_station").css("cursor", "pointer");
            $("#see_more").css("cursor", "pointer");
            $("#date_normal").css("cursor", "pointer");
            $("#dc").css("cursor", "pointer");
            $("#wf").css("cursor", "pointer");
            $("#from_station_imageB").css("cursor", "pointer");
            $("#to_station_imageB").css("cursor", "pointer");
            $("#back_imageClick").css("cursor", "pointer");
            $("#from_imageClick").css("cursor", "pointer")
        },
        _index_initQueryInput: function () {
            $.stationFor12306.init(["fromStation", "toStation"], {
                _init_input: index_messages.jianma_hanzi,
                _top_4_initInput: index_messages.jianpin_hanzi,
                _unselected_class: "error",
                confirmCallBack: function (k) {
                    if (k[0]["id"] == "fromStationText") {
                        if ($("#toStationText").val() != "" && $("#toStationText").val() != index_messages.jianma_hanzi && $("#toStationText").val() != index_messages.jianpin_hanzi) {
                            $("#toStationText").select()
                        } else {
                            $("#toStationText").val("")
                        }
                        $("#toStationText").focus()
                    }
                }
            });
            var j = $._index_initCookieValues();
            if (j) {
                $("#back_train_date").attr("disabled", true);
                $("#_wf_span_date").addClass("color999")
            }
            $("#dc").click(function () {
                $("#_wf_span_date").addClass("color999");
                $("#back_train_date").removeClass("inp-txt_select");
                $("#wf").attr("checked", false);
                $(this).attr("checked", "checked");
                $("#back_train_date").attr("disabled", true)
            });
            $("#wf").click(function () {
                $("#_wf_span_date").removeClass("color999");
                $("#dc").attr("checked", false);
                $(this).attr("checked", "checked");
                $("#back_train_date").removeAttr("disabled");
                if ($("#back_train_date").val() == "" || $("#back_train_date").val() < $("#train_date").val()) {
                    $("#back_train_date").val($("#train_date").val())
                }
            });
            $("#from_station_imageB").click(function () {
                if ($("#fromStationText").val() == index_messages.jianma_hanzi || $("#fromStationText").val() == index_messages.jianpin_hanzi) {
                    $("#fromStationText").val("")
                }
                $("#fromStationText").focus()
            });
            $("#to_station_imageB").click(function () {
                if ($("#toStationText").val() == index_messages.jianma_hanzi || $("#toStationText").val() == index_messages.jianpin_hanzi) {
                    $("#toStationText").val("")
                }
                $("#toStationText").focus()
            });
            $("#back_imageClick").click(function () {
                if ($("#wf").is(":checked")) {
                    $("#back_train_date").focus()
                } else { }
            });
            $("#from_imageClick").click(function () {
                $("#train_date").focus()
            });
            if ($("#fromStationText").val() == "") {
                $("#fromStationText").val(index_messages.jianma_hanzi)
            }
            if ($("#toStationText").val() == "") {
                $("#toStationText").val(index_messages.jianma_hanzi)
            }
        },
        _index_initChangeStation: function () {
            $("#change_station").click(function () {
                var o = $("#fromStationText");
                var m = o.val();
                var j = $("#toStationText");
                var n = j.val();
                var l = $("#toStation").val();
                var k = $("#fromStation").val();
                o.val(n);
                j.val(m);
                if (n != "" && n != index_messages.jianma_hanzi && n != index_messages.jianpin_hanzi) {
                    o.removeClass("inp-txt");
                    o.addClass("inp-txt_select")
                } else {
                    o.removeClass("inp-txt_select");
                    o.addClass("inp-txt")
                }
                if (m != "" && m != index_messages.jianma_hanzi && m != index_messages.jianpin_hanzi) {
                    j.removeClass("inp-txt");
                    j.addClass("inp-txt_select")
                } else {
                    j.removeClass("inp-txt_select");
                    j.addClass("inp-txt")
                }
                $("#fromStation").val(l);
                $("#toStation").val(k)
            })
        },
        _index_initSearch: function (j) {
            $("#a_search_ticket").click(function () {
                $._index_toGoTicketQuery();
                if (j && j.preventDefault) {
                    j.preventDefault()
                } else {
                    window.event.returnValue = false
                }
                return false
            })
        },
        _ad_frame_index: function () {
            setTimeout(function () {
                if (!frameComplete) {
                    var j = $("#ad_frame_index");
                    var k = ctx + "resources/images/pic/new-ad3.jpg";
                    j.after("<img style='border:0;width:100%;height:450px;' src='" + k + "'></img>");
                    j.remove()
                }
            },
            g)
        },
        _index_sessionUser: function () {
            if (notify_SESSION && "Y" == notify_SESSION) {
                dhtmlx.alert({
                    title: "温馨提示",
                    ok: "确定",
                    text: "本次登录成功！该用户已在其他地点登录，前次登录将被强制退出！",
                    type: "alert-error"
                })
            }
        },
        _index_toGoTicketQuery: function () {
            var u = "dc";
            var k = $("#fromStationText");
            var l = k.val();
            var t = $("#toStationText");
            var r = t.val();
            var p = i();
            if ("" == l || l == index_messages.jianma_hanzi || l == index_messages.jianpin_hanzi) {
                k.addClass("error");
                return
            } else {
                if ("" == r || r == index_messages.jianma_hanzi || r == index_messages.jianpin_hanzi) {
                    t.addClass("error");
                    return
                }
            }
            var s = $("#train_date");
            var n = s.val();
            if ("" == n) {
                s.addClass("error");
                return
            } else {
                if (n < initTrainDate || n > initToDate) {
                    c(index_messages.trainDate_not_in + "<br>" + initTrainDate + "到" + initToDate, s);
                    return
                } else {
                    if (!f(n)) {
                        c(index_messages.trainDate_error, s);
                        return
                    }
                }
            }
            var o = $("#back_train_date");
            var v = o.val();
            if ($("#wf").is(":checked")) {
                if ("" == v) {
                    o.addClass("error");
                    return
                } else {
                    if (v < initTrainDate || v > initToDate) {
                        c(index_messages.backTrainDate_not_in + "<br>" + initTrainDate + "到" + initToDate, o);
                        return
                    } else {
                        if (!f(v)) {
                            c(index_messages.backTrainDate_error, o);
                            return
                        }
                    }
                }
                if (n > v) {
                    c(index_messages.error_date, s);
                    return
                }
                u = "wf"
            }
            var m = ctx + "leftTicket/init";
            var j = $("#fromStation").val();
            var q = $("#toStation").val();
            $._index_setCookieValues();
            otsRedirect("post", m, {
                "leftTicketDTO.from_station_name": l,
                "leftTicketDTO.to_station_name": r,
                "leftTicketDTO.from_station": j,
                "leftTicketDTO.to_station": q,
                "leftTicketDTO.train_date": n,
                back_train_date: v,
                flag: u,
                purpose_code: p,
                pre_step_flag: "index"
            })
        },
        getMindateForCal: function () {
            if ($("#sf2").is(":checked")) {
                a = studentMindate
            } else {
                a = otherMindate
            }
            return a
        },
        getMaxdateForCal: function () {
            if ($("#sf2").is(":checked")) {
                h = studentMaxdate
            } else {
                h = otherMaxdate
            }
            return h
        }
    });
    function i() {
        if ($("#sf2").is(":checked")) {
            return "0X00"
        } else {
            return "ADULT"
        }
    }
    function d(j) {
        var n = j.split("-");
        var m = n[1];
        var l = n[2];
        var k = n[0];
        alert(b(Date.parse(m + "/" + l + "/" + k)));
        return Date.parse(m + "/" + l + "/" + k)
    }
    function c(k, j) {
        dhtmlx.alert({
            title: messages["message.error"],
            ok: messages["button.ok"],
            text: k,
            type: "alert-error",
            callback: function () {
                if (j && j.val() == index_messages.jianma_hanzi) {
                    j.val("")
                }
                if (j) {
                    j.focus()
                }
            }
        })
    }
    function e(l, k) {
        var j = new Date(Date.parse(l.replace(/-/g, "/")));
        j.setDate(j.getDate() + k);
        return b(j)
    }
    function b(k) {
        var l = k.getFullYear();
        var n = k.getMonth() + 1;
        var m = k.getDate();
        var j = l + "-" + n + "-" + m;
        return j
    }
    function f(m) {
        var k = m;
        var j = k.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (j == null) {
            return false
        }
        var l = new Date(j[1], j[3] - 1, j[4]);
        return (l.getFullYear() == j[1] && (l.getMonth() + 1) == j[3] && l.getDate() == j[4])
    }
    $("#train_date").focus(function () {
        WdatePicker({
            doubleCalendar: true,
            minDate: $.getMindateForCal(),
            maxDate: $.getMaxdateForCal(),
            isShowClear: false,
            readOnly: true,
            qsEnabled: false,
            onpicked: function () {
                $("#train_date").blur();
                var k = $("#back_train_date").val();
                var j = $("#train_date").val();
                if ($("#wf").is(":checked")) {
                    if (!k | j > k) {
                        $("#back_train_date").val(j)
                    }
                }
                if (!$("#train_date").hasClass("inp-txt_select")) {
                    $("#train_date").addClass("inp-txt_select")
                }
                if ($("#train_date").hasClass("error")) {
                    $("#train_date").removeClass("error")
                }
            }
        })
    });
    $("#back_train_date").focus(function () {
        WdatePicker({
            doubleCalendar: true,
            minDate: $("#train_date").val(),
            maxDate: $.getMaxdateForCal(),
            isShowClear: false,
            readOnly: true,
            qsEnabled: false,
            onpicked: function () {
                if (!$("#back_train_date").hasClass("inp-txt_select")) {
                    $("#back_train_date").addClass("inp-txt_select")
                }
                if ($("#back_train_date").hasClass("error")) {
                    $("#back_train_date").removeClass("error")
                }
                $("#back_train_date").blur()
            }
        })
    });
    $("#back_imageClick").click(function () {
        $("#back_train_date").focus()
    })
})();