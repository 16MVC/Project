﻿(function (a) {
    jQuery.extend({
        jc_getFromStation: function () {
            return a.jc_getcookie("_jc_save_fromStation")
        },
        jc_setFromStation: function (d, c) {
            if ("undefined" == typeof (d) || "undefined" == typeof (c) || "" == d || "" == c) {
                throw "参数错误"
            }
            var b = d + "," + c;
            a.jc_setcookie("_jc_save_fromStation", b, 365 * 24 * 60 * 60)
        },
        jc_getToStation: function () {
            return a.jc_getcookie("_jc_save_toStation")
        },
        jc_setToStation: function (d, c) {
            if ("undefined" == typeof (d) || "undefined" == typeof (c) || "" == d || "" == c) {
                throw "参数错误"
            }
            var b = d + "," + c;
            a.jc_setcookie("_jc_save_toStation", b, 365 * 24 * 60 * 60)
        },
        jc_getFromDate: function () {
            return a.jc_getcookie("_jc_save_fromDate")
        },
        jc_setFromDate: function (c) {
            if ("undefined" == typeof (c)) {
                c = ""
            }
            var b = c;
            a.jc_setcookie("_jc_save_fromDate", b, 365 * 24 * 60 * 60)
        },
        jc_getToDate: function () {
            return a.jc_getcookie("_jc_save_toDate")
        },
        jc_setToDate: function (c) {
            if ("undefined" == typeof (c)) {
                c = ""
            }
            var b = c;
            a.jc_setcookie("_jc_save_toDate", b, 365 * 24 * 60 * 60)
        },
        jc_getWfOrDc: function () {
            return a.jc_getcookie("_jc_save_wfdc_flag")
        },
        jc_setWfOrDc: function (c) {
            if ("undefined" == typeof (c)) {
                throw "参数错误"
            }
            var b = c;
            a.jc_setcookie("_jc_save_wfdc_flag", b, 365 * 24 * 60 * 60)
        },
        jc_getcookie: function (d) {
            var c = document.cookie.indexOf(d);
            var b = document.cookie.indexOf(";", c);
            return c == -1 ? "" : unescape(document.cookie.substring(c + d.length + 1, (b > c ? b : document.cookie.length)))
        },
        jc_setcookie: function (h, g, f, e, c, d) {
            var b = new Date();
            b.setTime(b.getTime() + f * 1000);
            document.cookie = escape(h) + "=" + escape(g) + (b ? "; expires=" + b.toGMTString() : "") + (e ? "; path=" + e : ";path=/") + (c ? "; domain=" + c : "") + (d ? "; secure" : "")
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
/*!
 * SuperSlide v2.0 
 * 轻松解决网站大部分特效展示问题
 * 详尽信息请看官网：http://www.SuperSlide2.com/
 *
 * Copyright 2011-2013, 大话主席
 *
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途
 */
(function (b) {
    b.fn.slide = function (a) {
        return b.fn.slide.defaults = {
            effect: "fade",
            autoPlay: !1,
            delayTime: 500,
            interTime: 2500,
            triggerTime: 150,
            defaultIndex: 0,
            titCell: ".hd li",
            mainCell: ".bd",
            targetCell: null,
            trigger: "mouseover",
            scroll: 1,
            vis: 1,
            titOnClassName: "on",
            autoPage: !1,
            prevCell: ".prev",
            nextCell: ".next",
            pageStateCell: ".pageState",
            opp: !1,
            pnLoop: !0,
            easing: "linear",
            startFun: null,
            endFun: null,
            switchLoad: null
        },
        this.each(function () {
            var ar = b.extend({},
            b.fn.slide.defaults, a),
            aq = ar.effect,
            ap = b(ar.prevCell, b(this)),
            ao = b(ar.nextCell, b(this)),
            an = b(ar.pageStateCell, b(this)),
            am = b(ar.titCell, b(this)),
            al = am.size(),
            ak = b(ar.mainCell, b(this)),
            aj = ak.children().size(),
            ai = ar.switchLoad;
            if (null != ar.targetCell) {
                var ah = b(ar.targetCell, b(this))
            }
            var ag = parseInt(ar.defaultIndex),
            af = parseInt(ar.delayTime),
            ae = parseInt(ar.interTime);
            parseInt(ar.triggerTime);
            var ab = parseInt(ar.scroll),
            Z = parseInt(ar.vis),
            X = "false" == ar.autoPlay || 0 == ar.autoPlay ? !1 : !0,
            V = "false" == ar.opp || 0 == ar.opp ? !1 : !0,
            T = "false" == ar.autoPage || 0 == ar.autoPage ? !1 : !0,
            R = "false" == ar.pnLoop || 0 == ar.pnLoop ? !1 : !0,
            P = 0,
            N = 0,
            L = 0,
            ad = 0,
            ac = ar.easing,
            aa = null,
            Y = ag;
            if (0 == al && (al = aj), T) {
                var W = aj - Z;
                al = 1 + parseInt(0 != W % ab ? W / ab + 1 : W / ab),
                0 >= al && (al = 1),
                am.html("");
                for (var U = 0; al > U; U++) {
                    am.append("<li>" + (U + 1) + "</li>")
                }
                var am = b("li", am)
            }
            if (ak.children().each(function () {
                b(this).width() > L && (L = b(this).width(), N = b(this).outerWidth(!0)),
                b(this).height() > ad && (ad = b(this).height(), P = b(this).outerHeight(!0))
            }), aj >= Z) {
                switch (aq) {
                    case "fold":
                        ak.css({
                            position:
                            "relative",
                            width: N,
                            height: P
                        }).children().css({
                            position: "absolute",
                            width: L,
                            left: 0,
                            top: 0,
                            display: "none"
                        });
                        break;
                    case "top":
                        ak.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + Z * P + 'px"></div>').css({
                            position: "relative",
                            padding: "0",
                            margin: "0"
                        }).children().css({
                            height: ad
                        });
                        break;
                    case "left":
                        ak.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + Z * N + 'px"></div>').css({
                            width: aj * N,
                            position: "relative",
                            overflow: "hidden",
                            padding: "0",
                            margin: "0"
                        }).children().css({
                            "float": "left",
                            width: L
                        });
                        break;
                    case "leftLoop":
                    case "leftMarquee":
                        ak.children().clone().appendTo(ak).clone().prependTo(ak),
                        ak.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + Z * N + 'px"></div>').css({
                            width: 3 * aj * N,
                            position: "relative",
                            overflow: "hidden",
                            padding: "0",
                            margin: "0",
                            left: -aj * N
                        }).children().css({
                            "float": "left",
                            width: L
                        });
                        break;
                    case "topLoop":
                    case "topMarquee":
                        ak.children().clone().appendTo(ak).clone().prependTo(ak),
                        ak.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + Z * P + 'px"></div>').css({
                            height: 3 * aj * P,
                            position: "relative",
                            padding: "0",
                            margin: "0",
                            top: -aj * P
                        }).children().css({
                            height: ad
                        })
                }
            }
            var S = function () {
                b.isFunction(ar.startFun) && ar.startFun(ag, al)
            },
            Q = function () {
                b.isFunction(ar.endFun) && ar.endFun(ag, al)
            },
            O = function (c) {
                c.eq(ag).find("img").each(function () {
                    b(this).attr(ai) !== void 0 && b(this).attr("src", b(this).attr(ai)).removeAttr(ai)
                })
            },
            M = function (d) {
                if (Y != ag || d || "leftMarquee" == aq || "topMarquee" == aq) {
                    switch (aq) {
                        case "fade":
                        case "fold":
                        case "top":
                        case "left":
                            ag >= al ? ag = 0 : 0 > ag && (ag = al - 1);
                            break;
                        case "leftMarquee":
                        case "topMarquee":
                            ag >= 1 ? ag = 1 : 0 >= ag && (ag = 0);
                            break;
                        case "leftLoop":
                        case "topLoop":
                            var c = ag - Y;
                            al > 2 && c == -(al - 1) && (c = 1),
                            al > 2 && c == al - 1 && (c = -1);
                            var g = Math.abs(c * ab);
                            ag >= al ? ag = 0 : 0 > ag && (ag = al - 1)
                    }
                    if (S(), null != ai && O(ak.children()), ah && (null != ai && O(ah), ah.hide().eq(ag).animate({
                        opacity: "show"
                    },
                    af,
                    function () {
                        ak[0] || Q()
                    })), aj >= Z) {
                        switch (aq) {
                            case "fade":
                                ak.children().stop(!0, !0).eq(ag).animate({
                                    opacity: "show"
                                },
                                af, ac,
                                function () {
                                    Q()
                                }).siblings().hide();
                                break;
                            case "fold":
                                ak.children().stop(!0, !0).eq(ag).animate({
                                    opacity: "show"
                                },
                                af, ac,
                                function () {
                                    Q()
                                }).siblings().animate({
                                    opacity: "hide"
                                },
                                af, ac);
                                break;
                            case "top":
                                ak.stop(!0, !1).animate({
                                    top: -ag * ab * P
                                },
                                af, ac,
                                function () {
                                    Q()
                                });
                                break;
                            case "left":
                                ak.stop(!0, !1).animate({
                                    left: -ag * ab * N
                                },
                                af, ac,
                                function () {
                                    Q()
                                });
                                break;
                            case "leftLoop":
                                0 > c ? ak.stop(!0, !0).animate({
                                    left: -(aj - g) * N
                                },
                                af, ac,
                                function () {
                                    for (var h = 0; g > h; h++) {
                                        ak.children().last().prependTo(ak)
                                    }
                                    ak.css("left", -aj * N),
                                    Q()
                                }) : ak.stop(!0, !0).animate({
                                    left: -(aj + g) * N
                                },
                                af, ac,
                                function () {
                                    for (var h = 0; g > h; h++) {
                                        ak.children().first().appendTo(ak)
                                    }
                                    ak.css("left", -aj * N),
                                    Q()
                                });
                                break;
                            case "topLoop":
                                0 > c ? ak.stop(!0, !0).animate({
                                    top: -(aj - g) * P
                                },
                                af, ac,
                                function () {
                                    for (var h = 0; g > h; h++) {
                                        ak.children().last().prependTo(ak)
                                    }
                                    ak.css("top", -aj * P),
                                    Q()
                                }) : ak.stop(!0, !0).animate({
                                    top: -(aj + g) * P
                                },
                                af, ac,
                                function () {
                                    for (var h = 0; g > h; h++) {
                                        ak.children().first().appendTo(ak)
                                    }
                                    ak.css("top", -aj * P),
                                    Q()
                                });
                                break;
                            case "leftMarquee":
                                var f = ak.css("left").replace("px", "");
                                0 == ag ? ak.animate({
                                    left: ++f
                                },
                                0,
                                function () {
                                    if (ak.css("left").replace("px", "") >= 0) {
                                        for (var h = 0; aj > h; h++) {
                                            ak.children().last().prependTo(ak)
                                        }
                                        ak.css("left", -aj * N)
                                    }
                                }) : ak.animate({
                                    left: --f
                                },
                                0,
                                function () {
                                    if (2 * -aj * N >= ak.css("left").replace("px", "")) {
                                        for (var h = 0; aj > h; h++) {
                                            ak.children().first().appendTo(ak)
                                        }
                                        ak.css("left", -aj * N)
                                    }
                                });
                                break;
                            case "topMarquee":
                                var e = ak.css("top").replace("px", "");
                                0 == ag ? ak.animate({
                                    top: ++e
                                },
                                0,
                                function () {
                                    if (ak.css("top").replace("px", "") >= 0) {
                                        for (var h = 0; aj > h; h++) {
                                            ak.children().last().prependTo(ak)
                                        }
                                        ak.css("top", -aj * P)
                                    }
                                }) : ak.animate({
                                    top: --e
                                },
                                0,
                                function () {
                                    if (2 * -aj * P >= ak.css("top").replace("px", "")) {
                                        for (var h = 0; aj > h; h++) {
                                            ak.children().first().appendTo(ak)
                                        }
                                        ak.css("top", -aj * P)
                                    }
                                })
                        }
                    }
                    am.removeClass(ar.titOnClassName).eq(ag).addClass(ar.titOnClassName),
                    Y = ag,
                    0 == R && (ao.removeClass("nextStop"), ap.removeClass("prevStop"), 0 == ag ? ap.addClass("prevStop") : ag == al - 1 && ao.addClass("nextStop")),
                    an.html("<span>" + (ag + 1) + "</span>/" + al)
                }
            };
            M(!0),
            X && ("leftMarquee" == aq || "topMarquee" == aq ? (V ? ag-- : ag++, aa = setInterval(M, ae), ak.hover(function () {
                X && clearInterval(aa)
            },
            function () {
                X && (clearInterval(aa), aa = setInterval(M, ae))
            })) : (aa = setInterval(function () {
                V ? ag-- : ag++,
                M()
            },
            ae), b(this).hover(function () {
                X && clearInterval(aa)
            },
            function () {
                X && (clearInterval(aa), aa = setInterval(function () {
                    V ? ag-- : ag++,
                    M()
                },
                ae))
            })));
            var q;
            "mouseover" == ar.trigger ? am.hover(function () {
                ag = am.index(this),
                q = window.setTimeout(M, ar.triggerTime)
            },
            function () {
                clearTimeout(q)
            }) : am.click(function () {
                ag = am.index(this),
                M()
            }),
            ao.click(function () {
                (1 == R || ag != al - 1) && (ag++, M())
            }),
            ap.click(function () {
                (1 == R || 0 != ag) && (ag--, M())
            })
        })
    }
})(jQuery),
jQuery.easing.jswing = jQuery.easing.swing,
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (g, f, j, i, h) {
        return jQuery.easing[jQuery.easing.def](g, f, j, i, h)
    },
    easeInQuad: function (g, f, j, i, h) {
        return i * (f /= h) * f + j
    },
    easeOutQuad: function (g, f, j, i, h) {
        return -i * (f /= h) * (f - 2) + j
    },
    easeInOutQuad: function (g, f, j, i, h) {
        return 1 > (f /= h / 2) ? i / 2 * f * f + j : -i / 2 * (--f * (f - 2) - 1) + j
    },
    easeInCubic: function (g, f, j, i, h) {
        return i * (f /= h) * f * f + j
    },
    easeOutCubic: function (g, f, j, i, h) {
        return i * ((f = f / h - 1) * f * f + 1) + j
    },
    easeInOutCubic: function (g, f, j, i, h) {
        return 1 > (f /= h / 2) ? i / 2 * f * f * f + j : i / 2 * ((f -= 2) * f * f + 2) + j
    },
    easeInQuart: function (g, f, j, i, h) {
        return i * (f /= h) * f * f * f + j
    },
    easeOutQuart: function (g, f, j, i, h) {
        return -i * ((f = f / h - 1) * f * f * f - 1) + j
    },
    easeInOutQuart: function (g, f, j, i, h) {
        return 1 > (f /= h / 2) ? i / 2 * f * f * f * f + j : -i / 2 * ((f -= 2) * f * f * f - 2) + j
    },
    easeInQuint: function (g, f, j, i, h) {
        return i * (f /= h) * f * f * f * f + j
    },
    easeOutQuint: function (g, f, j, i, h) {
        return i * ((f = f / h - 1) * f * f * f * f + 1) + j
    },
    easeInOutQuint: function (g, f, j, i, h) {
        return 1 > (f /= h / 2) ? i / 2 * f * f * f * f * f + j : i / 2 * ((f -= 2) * f * f * f * f + 2) + j
    },
    easeInSine: function (g, f, j, i, h) {
        return -i * Math.cos(f / h * (Math.PI / 2)) + i + j
    },
    easeOutSine: function (g, f, j, i, h) {
        return i * Math.sin(f / h * (Math.PI / 2)) + j
    },
    easeInOutSine: function (g, f, j, i, h) {
        return -i / 2 * (Math.cos(Math.PI * f / h) - 1) + j
    },
    easeInExpo: function (g, f, j, i, h) {
        return 0 == f ? j : i * Math.pow(2, 10 * (f / h - 1)) + j
    },
    easeOutExpo: function (g, f, j, i, h) {
        return f == h ? j + i : i * (-Math.pow(2, -10 * f / h) + 1) + j
    },
    easeInOutExpo: function (g, f, j, i, h) {
        return 0 == f ? j : f == h ? j + i : 1 > (f /= h / 2) ? i / 2 * Math.pow(2, 10 * (f - 1)) + j : i / 2 * (-Math.pow(2, -10 * --f) + 2) + j
    },
    easeInCirc: function (g, f, j, i, h) {
        return -i * (Math.sqrt(1 - (f /= h) * f) - 1) + j
    },
    easeOutCirc: function (g, f, j, i, h) {
        return i * Math.sqrt(1 - (f = f / h - 1) * f) + j
    },
    easeInOutCirc: function (g, f, j, i, h) {
        return 1 > (f /= h / 2) ? -i / 2 * (Math.sqrt(1 - f * f) - 1) + j : i / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + j
    },
    easeInElastic: function (j, i, p, o, n) {
        var m = 1.70158,
        l = 0,
        k = o;
        if (0 == i) {
            return p
        }
        if (1 == (i /= n)) {
            return p + o
        }
        if (l || (l = 0.3 * n), Math.abs(o) > k) {
            k = o;
            var m = l / 4
        } else {
            var m = l / (2 * Math.PI) * Math.asin(o / k)
        }
        return -(k * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * n - m) * 2 * Math.PI / l)) + p
    },
    easeOutElastic: function (j, i, p, o, n) {
        var m = 1.70158,
        l = 0,
        k = o;
        if (0 == i) {
            return p
        }
        if (1 == (i /= n)) {
            return p + o
        }
        if (l || (l = 0.3 * n), Math.abs(o) > k) {
            k = o;
            var m = l / 4
        } else {
            var m = l / (2 * Math.PI) * Math.asin(o / k)
        }
        return k * Math.pow(2, -10 * i) * Math.sin((i * n - m) * 2 * Math.PI / l) + o + p
    },
    easeInOutElastic: function (j, i, p, o, n) {
        var m = 1.70158,
        l = 0,
        k = o;
        if (0 == i) {
            return p
        }
        if (2 == (i /= n / 2)) {
            return p + o
        }
        if (l || (l = n * 0.3 * 1.5), Math.abs(o) > k) {
            k = o;
            var m = l / 4
        } else {
            var m = l / (2 * Math.PI) * Math.asin(o / k)
        }
        return 1 > i ? -0.5 * k * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * n - m) * 2 * Math.PI / l) + p : 0.5 * k * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * n - m) * 2 * Math.PI / l) + o + p
    },
    easeInBack: function (h, g, l, k, j, i) {
        return void 0 == i && (i = 1.70158),
        k * (g /= j) * g * ((i + 1) * g - i) + l
    },
    easeOutBack: function (h, g, l, k, j, i) {
        return void 0 == i && (i = 1.70158),
        k * ((g = g / j - 1) * g * ((i + 1) * g + i) + 1) + l
    },
    easeInOutBack: function (h, g, l, k, j, i) {
        return void 0 == i && (i = 1.70158),
        1 > (g /= j / 2) ? k / 2 * g * g * (((i *= 1.525) + 1) * g - i) + l : k / 2 * ((g -= 2) * g * (((i *= 1.525) + 1) * g + i) + 2) + l
    },
    easeInBounce: function (g, f, j, i, h) {
        return i - jQuery.easing.easeOutBounce(g, h - f, 0, i, h) + j
    },
    easeOutBounce: function (g, f, j, i, h) {
        return 1 / 2.75 > (f /= h) ? i * 7.5625 * f * f + j : 2 / 2.75 > f ? i * (7.5625 * (f -= 1.5 / 2.75) * f + 0.75) + j : 2.5 / 2.75 > f ? i * (7.5625 * (f -= 2.25 / 2.75) * f + 0.9375) + j : i * (7.5625 * (f -= 2.625 / 2.75) * f + 0.984375) + j
    },
    easeInOutBounce: function (g, f, j, i, h) {
        return h / 2 > f ? 0.5 * jQuery.easing.easeInBounce(g, 2 * f, 0, i, h) + j : 0.5 * jQuery.easing.easeOutBounce(g, 2 * f - h, 0, i, h) + 0.5 * i + j
    }
}); (function (x) {
    jQuery.extend({
        ht_getcookie: function (O) {
            var N = document.cookie.indexOf(O);
            var M = document.cookie.indexOf(";", N);
            return N == -1 ? "" : unescape(document.cookie.substring(N + O.length + 1, (M > N ? M : document.cookie.length)))
        },
        ht_setcookie: function (S, R, Q, P, N, O) {
            var M = new Date();
            M.setTime(M.getTime() + Q * 1000);
            document.cookie = escape(S) + "=" + escape(R) + (M ? "; expires=" + M.toGMTString() : "") + (P ? "; path=" + P : "; path=/") + (N ? "; domain=" + N : "") + (O ? "; secure" : "")
        },
        textFocus: function (O) {
            var N, M, O = O === undefined ? 0 : parseInt(O);
            this.each(function () {
                if (!this.setSelectionRange) {
                    N = this.createTextRange();
                    O === 0 ? N.collapse(false) : N.move("character", O);
                    N.select()
                } else {
                    M = this.value.length;
                    O === 0 ? this.setSelectionRange(M, M) : this.setSelectionRange(O, O)
                }
                this.focus()
            });
            return this
        }
    });
    var s = [];
    var y = [];
    var z = [];
    var A = [];
    var r = 0;
    var t = 0;
    var v = 0;
    var J = 0;
    var K = false;
    var f = false;
    var B = false;
    var u = 0;
    var C = null;
    var i = -1;
    var e = [];
    var d = [];
    var c = [];
    var b = [];
    var L = [];
    var p = [];
    var o = [];
    var m = [];
    var l = [];
    var k = [];
    var E = [];
    var a = false;
    var F = true;
    var q = 30;
    var g = "简码/汉字";
    var j = "简码/汉字";
    var n = "inp-txt_select";
    var h = "inp-txt";
    var w = false;
    var D = null;
    var I = null;
    var G = false;
    var H = x.ht_getcookie("hj_favcity");
    x.stationFor12306 = {
        bindInputs: [],
        get_initInputValue: function () {
            return g
        },
        get_initTopInputValue: function () {
            return j
        },
        city_Bind: function (N) {
            if (N.length == 0) {
                return
            }
            var M = "";
            x.each(N,
            function (O) {
                if (H == N[O][2]) {
                    M += "<div class='cityline' id='citem_" + O + "' cturn='" + N[O][6] + "'><span class='ralign'><b>" + N[O][1] + "</b></span></div>\n"
                } else {
                    M += "<div class='cityline' id='citem_" + O + "' cturn='" + N[O][6] + "'><span class='ralign'>" + N[O][1] + "</span></div>\n"
                }
            });
            x("#panel_cities").html(M);
            x(".cityline").mouseover(function () {
                x.stationFor12306.city_shiftSelect(this)
            }).click(function () {
                x.stationFor12306.city_confirmSelect();
                z = x.stationFor12306.filterCity("");
                x.stationFor12306.city_showlist(0)
            });
            x.stationFor12306.city_shiftSelect(x("#citem_0"))
        },
        city_changeSelectIndex: function (M) {
            var N = v + M;
            if (N == -1) {
                x.stationFor12306.city_showlist(u - 1);
                x.stationFor12306.city_shiftSelect(x("#citem_" + (A.length - 1)))
            } else {
                if (N == A.length) {
                    x.stationFor12306.city_showlist(u + 1);
                    x.stationFor12306.city_shiftSelect(x("#citem_0"))
                } else {
                    x.stationFor12306.city_shiftSelect(x("#citem_" + N))
                }
            }
        },
        city_confirmSelect: function () {
            C.val(J[1]);
            curObjCode.val(J[2]);
            if (w) {
                x.stationFor12306.setStationInCookies(J[1], J[2])
            }
            x("#form_cities").css("display", "none");
            x("#form_cities2").css("display", "none");
            x("#form_cities3").css("display", "none");
            i = -1;
            t = 0;
            x.stationFor12306.setStationStyle();
            if (F) {
                x.stationFor12306.LoadJS(J[2])
            }
            if (D) {
                D(C, curObjCode)
            }
        },
        city_shiftSelect: function (N) {
            if (r != N) {
                if (r != 0) {
                    x(r).removeClass("citylineover").addClass("cityline").css("backgroundColor", "white")
                }
                if (N != 0) {
                    try {
                        r = N;
                        var M = x(r).removeClass("cityline").addClass("citylineover").css("backgroundColor", "#c8e3fc");
                        v = Number(M.attr("id").split("_")[1]);
                        J = s[Number(M.attr("cturn"))];
                        x("#cityid").val(J[2])
                    } catch (O) { }
                }
            }
        },
        city_shiftSelectInLi: function (M) {
            if (t != M) {
                if (t != 0) {
                    x(t).removeClass("ac_over").addClass("ac_odd")
                }
                if (M != 0) {
                    try {
                        t = M;
                        x(t).removeClass("ac_odd").addClass("ac_over")
                    } catch (N) { }
                }
            }
        },
        js: function (N) {
            var M;
            for (M = 1; M <= 7; M++) {
                if (M == N) {
                    x("#ul_list" + M).css("display", "block");
                    x("#nav_list" + M).addClass("action");
                    if (M == 1 || M == 7) {
                        x("#flip_cities2").css("display", "none")
                    }
                    if (M > 1 && M < 7) {
                        var P = x.stationFor12306.tHtmlGetCityName(N - 1, -1, 0);
                        if (P > q) {
                            var O = Math.ceil((P + 1) / q);
                            if (O > 1) {
                                x.stationFor12306.pageDesigh(O, 0, M)
                            }
                            x("#flip_cities2").css("display", "block")
                        } else {
                            x("#flip_cities2").css("display", "none")
                        }
                    } else {
                        C.focus()
                    }
                } else {
                    x("#ul_list" + M).css("display", "none");
                    x("#nav_list" + M).removeClass("action")
                }
            }
            if (1 != N) {
                x(".ac_even").on("mouseover",
                function () {
                    x.stationFor12306.city_shiftSelectInLi(this)
                }).on("click",
                function () {
                    C.val(x(this).text());
                    curObjCode.val(x(this).attr("data"));
                    if (w) {
                        x.stationFor12306.setStationInCookies(x(this).text(), x(this).attr("data"))
                    }
                    x("#form_cities2").css("display", "none");
                    i = -1;
                    t = 0;
                    x.stationFor12306.setStationStyle();
                    if (F) {
                        x.stationFor12306.LoadJS(x(this).attr("data"))
                    }
                    if (D) {
                        D(C, curObjCode)
                    }
                })
            }
        },
        tHtmlGetCityName: function (N, M, P) {
            switch (N) {
                case 0:
                    if (M == -1) {
                        return y.length
                    }
                    if (M == -2) {
                        return y
                    }
                    return y[M];
                    break;
                case 1:
                    if (M == -1) {
                        return e.length
                    }
                    if (M == -2) {
                        return e
                    }
                    if (e.length > q) {
                        var O = Math.ceil((e.length + 1) / q);
                        if (O > 1) {
                            p = e.slice(q * (P), Math.min(q * (P + 1), e.length));
                            return p[M]
                        }
                    }
                    return e[M];
                    break;
                case 2:
                    if (M == -1) {
                        return d.length
                    }
                    if (M == -2) {
                        return d
                    }
                    if (d.length > q) {
                        var O = Math.ceil((d.length + 1) / q);
                        if (O > 1) {
                            o = d.slice(q * (P), Math.min(q * (P + 1), d.length));
                            return o[M]
                        }
                    }
                    return d[M];
                    break;
                case 3:
                    if (M == -1) {
                        return c.length
                    }
                    if (M == -2) {
                        return c
                    }
                    if (c.length > q) {
                        var O = Math.ceil((c.length + 1) / q);
                        if (O > 1) {
                            m = c.slice(q * (P), Math.min(q * (P + 1), c.length));
                            return m[M]
                        }
                    }
                    return c[M];
                    break;
                case 4:
                    if (M == -1) {
                        return b.length
                    }
                    if (M == -2) {
                        return b
                    }
                    if (b.length > q) {
                        var O = Math.ceil((b.length + 1) / q);
                        if (O > 1) {
                            l = b.slice(q * (P), Math.min(q * (P + 1), b.length));
                            return l[M]
                        }
                    }
                    return b[M];
                    break;
                case 5:
                    if (M == -1) {
                        return L.length
                    }
                    if (M == -2) {
                        return L
                    }
                    if (L.length > q) {
                        var O = Math.ceil((L.length + 1) / q);
                        if (O > 1) {
                            k = L.slice(q * (P), Math.min(q * (P + 1), L.length));
                            return k[M]
                        }
                    }
                    return L[M];
                    break;
                default:
                    return "error";
                    break
            }
        },
        closeShowCity: function () {
            x("#form_cities2").css("display", "none");
            i = -1;
            t = 0;
            x.each(x.stationFor12306.bindInputs,
            function (Q, P) {
                var O = "#" + P;
                var N = "#" + P + "Text";
                var M = x(N).val();
                if ("" == M) {
                    x(N).val(g);
                    x.stationFor12306.from_to_station_class_gray(x(N));
                    x(O).val("")
                }
            })
        },
        showAllCity: function () {
            var T = "";
            var N = "370px";
            if (w) {
                N = "400px"
            }
            T = '<div class="com_hotresults" id="thetable" style="width:' + N + '"><div style="width:100%;"><div class="ac_title"><span>拼音支持首字母输入</span><a class="ac_close" style="cursor:pointer" title="关闭" onclick="$.stationFor12306.closeShowCity()"></a></div><ul class="AbcSearch clx" id="abc">';
            if (w) {
                T = T + '<li class="action" index="7" method="liHotTab"  onclick="$.stationFor12306.js(7)" id="nav_list7">常用</li>'
            }
            T = T + '<li index="1" method="liHotTab"  onclick="$.stationFor12306.js(1)" id="nav_list1">热门</li><li index="2" method="liHotTab"  onclick="$.stationFor12306.js(2)" id="nav_list2">A－E</li><li index="3" method="liHotTab"  onclick="$.stationFor12306.js(3)" id="nav_list3">F－J</li><li index="4" method="liHotTab"  onclick="$.stationFor12306.js(4)" id="nav_list4">K－O</li><li index="5" method="liHotTab"  onclick="$.stationFor12306.js(5)" id="nav_list5">P－T</li><li index="6" method="liHotTab"  onclick="$.stationFor12306.js(6)" id="nav_list6">U－Z</li></ul>';
            if (w) {
                T += '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;" method="hotData" id="ul_list7">';
                var U = x.stationFor12306.getStationInCookies();
                var Q = U.length;
                if (Q > 2) {
                    G = true;
                    for (var V = 0; V < Q; V++) {
                        T += '<li class="ac_even"   title="' + U[V][0] + '" data="' + U[V][1] + '">' + U[V][0] + "</li>"
                    }
                }
                T += "</ul>"
            }
            T += '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;display:none;" method="hotData" id="ul_list1">';
            var P = x.stationFor12306.tHtmlGetCityName(0, -1, 0);
            var S = "";
            if (!w) {
                S = " openLi"
            }
            for (var V = 0; V < P; V++) {
                T += '<li class="ac_even' + S + '"   title="' + x.stationFor12306.tHtmlGetCityName(0, V, 0)[1] + '" data="' + x.stationFor12306.tHtmlGetCityName(0, V, 0)[2] + '">' + x.stationFor12306.tHtmlGetCityName(0, V, 0)[1] + "</li>"
            }
            T += "</ul>";
            for (var W = 2; W <= 6; W++) {
                var R = W - 1;
                var M = x.stationFor12306.tHtmlGetCityName(R, -1, 0);
                if (M > q) {
                    var O = Math.ceil((M + 1) / q);
                    if (O > 1) {
                        T += '<ul  class="popcitylist" style="overflow: auto; max-height: 260px; height: 170px;display:none;" id="ul_list' + W + '">';
                        x.stationFor12306.pageDesigh(O, 0, W)
                    }
                    x("#flip_cities2").css("display", "block")
                } else {
                    T += '<ul  class="popcitylist" style="overflow: auto; max-height: 260px; height: 191px;display:none;" id="ul_list' + W + '">';
                    x("#flip_cities2").css("display", "none");
                    var S = "";
                    if (!w) {
                        S = " openLi"
                    }
                    for (var V = 0; V < x.stationFor12306.tHtmlGetCityName(R, -1, 0) ; V++) {
                        T += '<li class="ac_even' + S + '"   title="' + x.stationFor12306.tHtmlGetCityName(R, V, 0)[1] + '" data="' + x.stationFor12306.tHtmlGetCityName(R, V, 0)[2] + '">' + x.stationFor12306.tHtmlGetCityName(R, V, 0)[1] + "</li>"
                    }
                }
                T += "</ul>"
            }
            T += '<div id="flip_cities2"> 翻页控制区</div>';
            T += "</div>";
            x("#panel_cities2").html(T);
            x("#thetable").on("click",
            function () {
                if (x("#form_cities2").css("display") == "block") {
                    if (i == 1 | i == 0) {
                        i == -1
                    }
                    C.select()
                }
            });
            x("#form_cities").on("click",
            function () {
                if (x("#form_cities").css("display") == "block") {
                    if (i == 1 | i == 0) {
                        i == -1
                    }
                    C.select()
                }
            });
            x(".ac_even").on("mouseover",
            function () {
                x.stationFor12306.city_shiftSelectInLi(this)
            }).on("click",
            function () {
                C.val(x(this).text());
                curObjCode.val(x(this).attr("data"));
                if (w) {
                    x.stationFor12306.setStationInCookies(x(this).text(), x(this).attr("data"))
                }
                x("#form_cities2").css("display", "none");
                i = -1;
                t = 0;
                x.stationFor12306.setStationStyle();
                if (F) {
                    x.stationFor12306.LoadJS(x(this).attr("data"))
                }
                if (D) {
                    D(C, curObjCode)
                }
            });
            x("#flip_cities2").css("display", "none");
            return s
        },
        LoadJS: function (O) {
            if (((typeof (mm_addjs) != "undefined")) && ("" != mm_addjs) && (mm_addjs == 1)) {
                var N = document.getElementsByTagName("HEAD").item(0);
                var M = document.createElement("SCRIPT");
                M.src = mm_srcjs + O + ".js";
                M.type = "text/javascript";
                N.appendChild(M)
            }
        },
        pageDesigh: function (R, T, S) {
            var P = "";
            if (R > 1) {
                if (T == -1) {
                    T = (R - 1)
                } else {
                    if (T == R) {
                        T = 0
                    }
                }
                E = x.stationFor12306.tHtmlGetCityName(S - 1, -2, 0).slice(q * (T), Math.min(q * (T + 1), x.stationFor12306.tHtmlGetCityName(S - 1, -2, 0).length));
                var Q = "";
                if (!w) {
                    Q = " openLi"
                }
                for (var N = 0; N < E.length; N++) {
                    var O = E[N];
                    P += '<li class="ac_even' + Q + '"   title="' + O[1] + '" data="' + O[2] + '">' + O[1] + "</li>"
                }
                x("#ul_list" + S).html(P);
                var M = (T == 0) ? "&laquo;&nbsp;上一页" : "<a style='cursor:pointer'    class='cityflip' onclick='$.stationFor12306.pageDesigh(" + R + "," + (T - 1) + "," + S + ");return false;'>&laquo;&nbsp;上一页</a>";
                M += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;";
                M += (T == R - 1) ? "下一页&nbsp;&raquo;" : "<a style='cursor:pointer' class='cityflip'  onclick='$.stationFor12306.pageDesigh(" + R + "," + (T + 1) + "," + S + ")'>下一页&nbsp;&raquo;</a>";
                x("#flip_cities2").html(M);
                if (i == 1 | i == 0 | i == 2) {
                    i == -1
                }
                if (C) {
                    C.select()
                }
            } else { }
            x(".ac_even").on("mouseover",
            function () {
                x.stationFor12306.city_shiftSelectInLi(this)
            }).on("click",
            function () {
                C.val(x(this).text());
                curObjCode.val(x(this).attr("data"));
                if (w) {
                    x.stationFor12306.setStationInCookies(x(this).text(), x(this).attr("data"))
                }
                x("#form_cities2").css("display", "none");
                i = -1;
                t = 0;
                x.stationFor12306.setStationStyle();
                if (F) {
                    x.stationFor12306.LoadJS(x(this).attr("data"))
                }
                if (D) {
                    D(C, curObjCode)
                }
            })
        },
        filterCity: function (P) {
            if (P.length == 0) {
                x("#top_cities").html(j);
                return s
            }
            var N = [];
            var M = /[^A-z]/.test(P);
            for (var O = 0; O < s.length; O++) {
                if (x.stationFor12306.isMatchCity(s[O], P, M)) {
                    N.push(s[O])
                }
            }
            if (N.length > 0) {
                x("#top_cities").html('按"<font color=red>' + P + '</font>"检索：');
                return N
            } else {
                x("#top_cities").html("无法匹配:<font color=red>" + P + "</font>");
                return []
            }
        },
        replaceChar: function (M, O, N) {
            return M.substr(0, O) + N + M.substr(O + 1, M.length - 1)
        },
        isMatchCity: function (R, U, O) {
            var U = U.toLowerCase();
            var N = [R[4].toLowerCase(), R[1], R[3].toLowerCase()];
            var T = -1;
            var Q = -1;
            if (O) {
                U = U.split("");
                for (var P = 0; P < U.length; P++) {
                    var W = N[1].indexOf(U[P]);
                    if (W > T && W <= P) {
                        N[1] = x.stationFor12306.replaceChar(N[1], W, "-");
                        T = W
                    } else {
                        return false
                    }
                }
            } else {
                U = U.split("");
                var M = true;
                var S = true;
                for (var P = 0; P < U.length; P++) {
                    var W = N[0].indexOf(U[P]);
                    if (W > T && W <= P) {
                        N[0] = x.stationFor12306.replaceChar(N[0], W, "-");
                        T = W
                    } else {
                        M = false;
                        break
                    }
                }
                for (var P = 0; P < U.length; P++) {
                    var V = N[2].indexOf(U[P]);
                    if (V > Q && V <= P) {
                        N[2] = x.stationFor12306.replaceChar(N[2], V, "-");
                        Q = V
                    } else {
                        S = false;
                        break
                    }
                }
                if ((M == false) && (S == false)) {
                    return false
                }
            }
            return true
        },
        city_showlist: function (O) {
            if (z.length > 6) {
                var N = Math.ceil((z.length + 1) / 6);
                if (O == -1) {
                    O = (N - 1)
                } else {
                    if (O == N) {
                        O = 0
                    }
                }
                A = z.slice(6 * (O), Math.min(6 * (O + 1), z.length));
                x.stationFor12306.city_Bind(A);
                var M = (O == 0) ? "<span style='float:left;'>&laquo;&nbsp;向前</span>" : "<a style='float:left;cursor:pointer' href='' class='cityflip' onclick='$.stationFor12306.city_showlist(" + (O - 1) + ");return false;'>&laquo;&nbsp;向前</a>";
                M += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                M += (O == N - 1) ? "<span style='float:right;'>向后&nbsp;&raquo;</span>" : "<a style='float:right;cursor:pointer' href='' class='cityflip' onclick='$.stationFor12306.city_showlist(" + (O + 1) + ");return false;'>向后&nbsp;&raquo;</a>";
                x("#flip_cities").html(M);
                x("#flip_cities").css("display", "block")
            } else {
                O = 0;
                A = z;
                x.stationFor12306.city_Bind(A);
                x("#flip_cities").css("display", "none")
            }
            u = O;
            if (x("#form_cities").css("display") == "block") {
                a = true;
                C.focus()
            }
        },
        fixDivBugInIE6: function (M) {
            try {
                M.bgiframe();
                if (M.width() > x("> ul", M).width()) {
                    M.css("overflow", "hidden")
                } else {
                    x("> iframe.bgiframe", M).width(x("> ul", M).width());
                    M.css("overflow", "scroll")
                }
                if (M.height() > x("> ul", M).height()) {
                    M.css("overflow", "hidden")
                } else {
                    x("> iframe.bgiframe", M).height(x("> ul", M).height());
                    M.css("overflow", "scroll")
                }
            } catch (N) { }
        },
        clearStation: function (M) {
            i = -1;
            var O = C.val();
            var P = curObjCode.val();
            if (O == "" || P == "") {
                C.val("");
                curObjCode.val("")
            } else {
                var N = O + "|" + P;
                if (typeof (station_names) != "undefined") {
                    if (station_names.indexOf(N) == -1) {
                        C.val("");
                        curObjCode.val("")
                    } else {
                        if ("click" == M) {
                            C.select();
                            if (x("#form_cities").is(":hidden")) {
                                x("#form_cities2").css("display", "block")
                            }
                        }
                    }
                } else {
                    C.val("");
                    curObjCode.val("")
                }
            }
        },
        MapCityID: function (N) {
            for (var M = 0; M < s.length; M++) {
                if (s[M][1] == N) {
                    return s[M][2]
                }
            }
            return 0
        },
        MapCityName: function (M) {
            for (var N = 0; N < s.length; N++) {
                if (s[N][2] == M) {
                    return s[N][1]
                }
            }
            return ""
        },
        SetISPos: function (Q) {
            if (I) {
                I(x("#form_cities"), x("#form_cities2"))
            } else {
                x("#form_cities").css("left", Q.position().left);
                x("#form_cities").css("top", Q.position().top + Q.height() + 12);
                x("#form_cities2").css("left", Q.position().left);
                x("#form_cities2").css("top", Q.position().top + Q.height() + 12)
            }
            var P = Q.offset().top;
            var M = x("#search_div");
            var N = x("#choice_div");
            M.css("top", P);
            N.css("top", P);
            var O = Q.offset().left;
            M.css("left", O);
            N.css("left", O)
        },
        myHandlerFg: function (M) {
            if (M == null) {
                M.keyCode = 9
            } else {
                if (!M.which && M.which == 13) {
                    M.preventDefault()
                } else {
                    if (M.which && M.keyCode == 13) {
                        M.which = 9
                    }
                }
            }
        },
        myHandler2: function (M) {
            if (M == null) {
                M = window.event;
                M.returnValue = false
            } else {
                if (M.which && M.which == 13) {
                    var O = document.getElementById("Upload_Data3");
                    if (document.createEvent) {
                        var N = document.createEvent("MouseEvents");
                        N.initEvent("click", true, false);
                        O.dispatchEvent(N)
                    } else {
                        if (document.createEventObject) {
                            O.fireEvent("onclick")
                        }
                    }
                } else {
                    if (!M.which && M.which == 13) {
                        M.preventDefault()
                    }
                }
            }
        },
        from_to_station_class_plain: function (M) {
            if (h && h != "") {
                M.removeClass(h)
            }
            if (n && n != "") {
                M.addClass(n)
            }
        },
        from_to_station_class_gray: function (M) {
            if (n && n != "") {
                M.removeClass(n)
            }
            if (h && h != "") {
                M.addClass(h)
            }
        },
        setStationStyle: function () {
            var M = C.val();
            if (M == "") {
                C.val(g);
                x.stationFor12306.from_to_station_class_gray(C);
                curObjCode.val("")
            } else {
                x.stationFor12306.from_to_station_class_plain(C)
            }
        },
        setCurValue: function () {
            C.val(J[1]);
            curObjCode.val(J[2])
        },
        bindEvent: function (M) {
            var O = "#" + M;
            var N = "#" + M + "Text";
            x(N).keydown(function (Q) {
                C = x(N);
                curObjCode = x(O);
                i = 0;
                a = true;
                F = true;
                x("#form_cities2").css("display", "none");
                t = 0;
                var P = x(N).width();
                if (-[1, ]) {
                    P = P - 4
                }
                x("#form_cities").css("width", P);
                x("#form_cities").css("display", "block");
                x(".AbcSearch li").removeClass("action");
                x(".popcitylist").css("display", "none");
                if (G && w) {
                    x("#ul_list7").css("display", "block");
                    x("#nav_list7").addClass("action")
                } else {
                    x("#nav_list1").addClass("action");
                    x("#ul_list1").css("display", "block")
                }
                x("#flip_cities2").css("display", "none");
                x(".ac_even").removeClass("ac_over").addClass("ac_odd");
                Q = Q || window.event;
                if (Q.keyCode == 40) {
                    x.stationFor12306.city_changeSelectIndex(1);
                    x("#form_cities").css("display", "block");
                    x.stationFor12306.SetISPos(C);
                    x.stationFor12306.setCurValue()
                } else {
                    if (Q.keyCode == 38) {
                        x.stationFor12306.city_changeSelectIndex(-1);
                        x.stationFor12306.setCurValue();
                        x("#form_cities").css("display", "block");
                        x.stationFor12306.SetISPos(C)
                    } else {
                        if (Q.keyCode == 13) {
                            x.stationFor12306.city_confirmSelect();
                            if (document.addEventListener) {
                                document.addEventListener("keypress", x.stationFor12306.myHandlerFg, true)
                            } else {
                                evt = window.event;
                                evt.keyCode = 9
                            }
                        }
                    }
                }
            }).focus(function () {
                F = true;
                if (a) {
                    x("#form_cities2").css("display", "none");
                    t = 0;
                    a = false;
                    i = -1
                } else {
                    if (i == -1) {
                        x(".AbcSearch li").removeClass("action");
                        x(".popcitylist").css("display", "none");
                        x("#flip_cities2").css("display", "none");
                        if (G && w) {
                            x("#ul_list7").css("display", "block");
                            x("#nav_list7").addClass("action")
                        } else {
                            x("#nav_list1").addClass("action");
                            x("#ul_list1").css("display", "block")
                        }
                        x(".ac_even").removeClass("ac_over").addClass("ac_odd");
                        x("#form_cities2").css("display", "block")
                    }
                }
                C = x(N);
                curObjCode = x(O);
                i = 0;
                K = true;
                x.stationFor12306.SetISPos(C)
            }).blur(function () {
                C = x(N);
                curObjCode = x(O);
                i = 0;
                a = false;
                F = true;
                if (!f && !B) {
                    x.stationFor12306.clearStation("blur");
                    K = false;
                    x("#form_cities").css("display", "none");
                    x("#form_cities2").css("display", "none");
                    i = -1;
                    t = 0;
                    z = x.stationFor12306.filterCity("");
                    x.stationFor12306.city_showlist(0);
                    x.stationFor12306.setStationStyle()
                }
            }).keyup(function (P) {
                C = x(N);
                curObjCode = x(O);
                i = 0;
                a = true;
                P = P || window.event;
                if (P.keyCode != 40 && P.keyCode != 38 && P.keyCode != 37 && P.keyCode != 39 && P.keyCode != 13 && P.keyCode != 9) {
                    z = x.stationFor12306.filterCity(C.val());
                    x.stationFor12306.city_showlist(0)
                }
            }).click(function () {
                x.stationFor12306.clearStation("click")
            });
            x.stationFor12306.bindInputs.push(M)
        },
        getStationInCookies: function () {
            var O = [];
            var N = x.ht_getcookie("_city_name_save_station");
            if (N) {
                var M = N.split(",");
                if (M && M.length > 0) {
                    x.each(M,
                    function (S, R) {
                        var P = R.split("#");
                        var Q = [];
                        Q[0] = P[0];
                        Q[1] = P[1];
                        O[S] = Q
                    })
                }
            }
            return O
        },
        setStationInCookies: function (W, N) {
            var T = x.stationFor12306.getStationInCookies();
            var Q = [];
            var X = T.length;
            var P = true;
            var Y = 10;
            for (var R = 0; R < X; R++) {
                if (T[R][0] == W && T[R][1] == N) {
                    P = false
                }
                Q.push(T[R])
            }
            if (P) {
                Q.push([W, N])
            }
            var S = Q;
            var O = "";
            var U = S.length;
            var R = 0;
            if (U > Y) {
                R = 1
            }
            var M = R;
            if (U > 1) {
                x("#ul_list7").html("");
                G = true
            }
            var V = "";
            for (; R < U; R++) {
                if (R > M) {
                    O += ","
                }
                O += S[R][0] + "#" + S[R][1];
                if (G && w) {
                    V += '<li class="ac_even" onmouseover="$.stationFor12306.city_shiftSelectInLi(this);" onclick="$.stationFor12306.li_click(this);"   title="' + S[R][0] + '" data="' + S[R][1] + '">' + S[R][0] + "</li>"
                }
            }
            if (G && w) {
                x("#ul_list7").html(V)
            }
            x.ht_setcookie("_city_name_save_station", O, 365 * 24 * 60 * 60)
        },
        li_click: function (M) {
            C.val(x(M).text());
            curObjCode.val(x(M).attr("data"));
            if (w) {
                x.stationFor12306.setStationInCookies(x(M).text(), x(M).attr("data"))
            }
            x("#form_cities2").css("display", "none");
            i = -1;
            t = 0;
            x.stationFor12306.setStationStyle();
            if (F) {
                x.stationFor12306.LoadJS(x(M).attr("data"))
            }
            if (D) {
                D(C, curObjCode)
            }
        },
        init: function (R, S) {
            if (typeof (S) != "undefined") {
                if (typeof (S._init_input) != "undefined") {
                    g = S._init_input
                }
                if (typeof (S._top_4_initInput) != "undefined") {
                    j = S._top_4_initInput
                }
                if (typeof (S.confirmCallBack) != "undefined") {
                    D = S.confirmCallBack
                }
                if (typeof (S._selected_class) != "undefined") {
                    n = S._selected_class
                }
                if (typeof (S._unselected_class) != "undefined") {
                    h = S._unselected_class
                }
                if (typeof (S._12306_openFavorite) != "undefined") {
                    w = S._12306_openFavorite
                }
                if (typeof (S.position) != "undefined") {
                    I = S.position
                }
            }
            if (typeof (station_names) != "undefined") {
                var O = station_names.split("@");
                for (var N = 0; N < O.length; N++) {
                    var Q = O[N];
                    var P = Q.toString().charAt(0);
                    if (P == "a" || P == "b" || P == "c" || P == "d" || P == "e") {
                        e.push(Q.split("|"))
                    }
                    if (P == "f" || P == "g" || P == "h" || P == "i" || P == "j") {
                        d.push(Q.split("|"))
                    }
                    if (P == "k" || P == "l" || P == "m" || P == "n" || P == "o") {
                        c.push(Q.split("|"))
                    }
                    if (P == "p" || P == "q" || P == "r" || P == "s" || P == "t") {
                        b.push(Q.split("|"))
                    }
                    if (P == "u" || P == "v" || P == "w" || P == "x" || P == "y" || P == "z") {
                        L.push(Q.split("|"))
                    }
                    if (Q.length > 0) {
                        Q = Q.split("|");
                        if (H != "" && Q[2] == H) {
                            favcity = Q;
                            s.unshift(Q);
                            if (N > 6) {
                                s.push(Q)
                            }
                        } else {
                            s.push(Q)
                        }
                    }
                }
                for (var N = 0; N < s.length; N++) {
                    s[N].push(N)
                }
            }
            if (typeof (favorite_names) != "undefined") {
                var M = favorite_names.split("@");
                for (var N = 0; N < M.length; N++) {
                    var Q = M[N];
                    if (Q.length > 0) {
                        Q = Q.split("|");
                        y.push(Q)
                    }
                }
                for (var N = 0; N < y.length; N++) {
                    y[N].push(N)
                }
            }
            z = x.stationFor12306.filterCity("");
            x.stationFor12306.city_showlist(0);
            x.stationFor12306.showAllCity();
            a = false;
            x.stationFor12306.fixDivBugInIE6(x("#form_cities"));
            x.stationFor12306.fixDivBugInIE6(x("#form_cities2"));
            if (R && R.length > 0) {
                x.each(R,
                function (U, T) {
                    x.stationFor12306.bindEvent(T)
                })
            }
            x("#form_cities").mousedown(function () {
                f = true
            }).mouseup(function () {
                f = false
            });
            x("#form_cities2").mousedown(function () {
                B = true
            }).mouseup(function () {
                B = false
            })
        }
    }
})(jQuery);