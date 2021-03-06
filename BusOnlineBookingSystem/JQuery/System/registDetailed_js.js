﻿function dhtmlXCalendarObject(f, k) {
    this.i = {};
    this.initShowFlag = false;
    this.uid = function () {
        if (!this.uidd) {
            this.uidd = new Date().getTime()
        }
        return this.uidd++
    };
    var c = null;
    if (typeof (f) == "string") {
        var d = document.getElementById(f)
    } else {
        var d = f
    }
    if (d && typeof (d) == "object" && d.tagName && String(d.tagName).toLowerCase() != "input") {
        c = d
    }
    d = null;
    if (typeof (f) != "object" || !f.length) {
        f = [f]
    }
    for (var b = 0; b < f.length; b++) {
        if (typeof (f[b]) == "string") {
            f[b] = (document.getElementById(f[b]) || null)
        }
        if (f[b] != null && f[b].tagName && String(f[b].tagName).toLowerCase() == "input") {
            this.i[this.uid()] = {
                input: f[b]
            }
        } else {
            if (!(f[b] instanceof Array) && f[b] instanceof Object && (f[b].input != null || f[b].button != null)) {
                if (f[b].input != null && typeof (f[b].input) == "string") {
                    f[b].input = document.getElementById(f[b].input)
                }
                if (f[b].button != null && typeof (f[b].button) == "string") {
                    f[b].button = document.getElementById(f[b].button)
                }
                this.i[this.uid()] = f[b]
            }
        }
        f[b] = null
    }
    this.skin = (k != null ? k : (typeof (dhtmlx) != "undefined" && typeof (dhtmlx.skin) == "string" ? dhtmlx.skin : "dhx_skyblue"));
    this.setSkin = function (l, a) {
        if (this.skin == l && !a) {
            return
        }
        this.skin = l;
        this.base.className = "dhtmlxcalendar_container dhtmlxcalendar_skin_" + this.skin + (String(this.base.className).search("dhtmlxcalendar_time_hidden") > 0 ? " dhtmlxcalendar_time_hidden" : "");
        this._ifrSize()
    };
    this.base = document.createElement("DIV");
    this.base.className = "dhtmlxcalendar_container";
    this.base.style.display = "none";
    if (c != null) {
        this._hasParent = true;
        c.appendChild(this.base);
        c = null
    } else {
        document.body.appendChild(this.base)
    }
    this.setParent = function (a) {
        if (this._hasParent) {
            if (typeof (a) == "object") {
                a.appendChild(this.base)
            } else {
                if (typeof (a) == "string") {
                    document.getElementById(a).appendChild(this.base)
                }
            }
        }
    };
    this.setSkin(this.skin, true);
    this.base.onclick = function (a) {
        a = a || event;
        a.cancelBubble = true
    };
    this.base.onmousedown = function () {
        return false
    };
    this.loadUserLanguage = function (n) {
        if (!this.langData[n]) {
            return
        }
        this.lang = n;
        this.setWeekStartDay(this.langData[this.lang].weekstart);
        this.setDateFormat(this.langData[this.lang].dateformat || "%Y-%m-%d");
        if (this.msCont) {
            var m = 0;
            for (var l = 0; l < this.msCont.childNodes.length; l++) {
                for (var a = 0; a < this.msCont.childNodes[l].childNodes.length; a++) {
                    this.msCont.childNodes[l].childNodes[a].innerHTML = this.langData[this.lang].monthesSNames[m++]
                }
            }
        }
    };
    this.contMonth = document.createElement("DIV");
    this.contMonth.className = "dhtmlxcalendar_month_cont";
    this.contMonth.onselectstart = function (a) {
        a = a || event;
        a.cancelBubble = true;
        a.returnValue = false;
        return false
    };
    this.base.appendChild(this.contMonth);
    var g = document.createElement("UL");
    g.className = "dhtmlxcalendar_line";
    this.contMonth.appendChild(g);
    var j = document.createElement("LI");
    j.className = "dhtmlxcalendar_cell dhtmlxcalendar_month_hdr";
    j.innerHTML = "<div name='arrow_left' onclick='leftArrowClick()' class='dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_left' onmouseover='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_left_hover\";' onmouseout='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_left\";'></div><span class='dhtmlxcalendar_month_label_month'>Month</span><span class='dhtmlxcalendar_month_label_year'>Year</span><div name='arrow_right' onclick='rightArrowClick()' class='dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_right' onmouseover='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_right_hover\";' onmouseout='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_right\";'></div>";
    g.appendChild(j);
    var e = this;
    j.onclick = function (n) {
        n = n || event;
        var l = (n.target || n.srcElement);
        if (l.className && l.className.indexOf("dhtmlxcalendar_month_arrow") === 0) {
            e._hideSelector();
            var m = (l.parentNode.firstChild == l ? -1 : 1);
            var a = new Date(e._activeMonth);
            e._drawMonth(new Date(e._activeMonth.getFullYear(), e._activeMonth.getMonth() + m, 1, 0, 0, 0, 0));
            e.callEvent("onArrowClick", [a, new Date(e._activeMonth)]);
            return
        }
        if (l.className && l.className == "dhtmlxcalendar_month_label_month") {
            n.cancelBubble = true;
            e._showSelector("month", 31, 21, "selector_month", true);
            return
        }
        if (l.className && l.className == "dhtmlxcalendar_month_label_year") {
            n.cancelBubble = true;
            e._showSelector("year", 42, 21, "selector_year", true);
            return
        }
        e._hideSelector()
    };
    this.contDays = document.createElement("DIV");
    this.contDays.className = "dhtmlxcalendar_days_cont";
    this.base.appendChild(this.contDays);
    this.setWeekStartDay = function (a) {
        if (a == 0) {
            a = 7
        }
        this._wStart = Math.min(Math.max((isNaN(a) ? 1 : a), 1), 7);
        this._drawDaysOfWeek()
    };
    this._drawDaysOfWeek = function () {
        if (this.contDays.childNodes.length == 0) {
            var n = document.createElement("UL");
            n.className = "dhtmlxcalendar_line";
            this.contDays.appendChild(n)
        } else {
            var n = this.contDays.firstChild
        }
        var l = this._wStart;
        var m = this.langData[this.lang].daysSNames;
        m.push(String(this.langData[this.lang].daysSNames[0]).valueOf());
        for (var o = 0; o < 7; o++) {
            if (n.childNodes[o] == null) {
                var a = document.createElement("LI");
                n.appendChild(a)
            } else {
                var a = n.childNodes[o]
            }
            a.className = "dhtmlxcalendar_cell" + (l >= 6 ? " dhtmlxcalendar_day_weekday_cell" : "") + (o == 0 ? "_first" : "");
            a.innerHTML = m[l];
            if (++l > 7) {
                l = 1
            }
        }
        if (this._activeMonth != null) {
            this._drawMonth(this._activeMonth)
        }
    };
    this._wStart = this.langData[this.lang].weekstart;
    this.setWeekStartDay(this._wStart);
    this.contDates = document.createElement("DIV");
    this.contDates.className = "dhtmlxcalendar_dates_cont";
    this.base.appendChild(this.contDates);
    this.contDates.onclick = function (p) {
        p = p || event;
        var l = (p.target || p.srcElement);
        if (l._date != null && !l._css_dis) {
            var n = e._activeDate.getHours();
            var m = e._activeDate.getMinutes();
            var o = l._date;
            if (e.checkEvent("onBeforeChange")) {
                if (!e.callEvent("onBeforeChange", [new Date(l._date.getFullYear(), l._date.getMonth(), l._date.getDate(), n, m)])) {
                    return
                }
            }
            if (e._activeDateCell != null) {
                e._activeDateCell._css_date = false;
                e._updateCellStyle(e._activeDateCell._q, e._activeDateCell._w)
            }
            var a = (e._activeDate.getFullYear() + "_" + e._activeDate.getMonth() != o.getFullYear() + "_" + o.getMonth());
            e._nullDate = false;
            e._activeDate = new Date(o.getFullYear(), o.getMonth(), o.getDate(), n, m);
            e._activeDateCell = l;
            e._activeDateCell._css_date = true;
            e._activeDateCell._css_hover = false;
            e._lastHover = null;
            e._updateCellStyle(e._activeDateCell._q, e._activeDateCell._w);
            if (a) {
                e._drawMonth(e._activeDate)
            }
            if (e._activeInp && e.i[e._activeInp] && e.i[e._activeInp].input != null) {
                e.i[e._activeInp].input.value = e._dateToStr(new Date(e._activeDate.getTime()))
            }
            if (!e._hasParent) {
                e._hide()
            }
            e.callEvent("onClick", [new Date(e._activeDate.getTime())])
        }
    };
    this.contDates.onmouseover = function (l) {
        l = l || event;
        var a = (l.target || l.srcElement);
        if (a._date != null) {
            a._css_hover = true;
            e._updateCellStyle(a._q, a._w);
            e._lastHover = a
        }
    };
    this.contDates.onmouseout = function () {
        e._clearDayHover()
    };
    this._lastHover = null;
    this._clearDayHover = function () {
        if (!this._lastHover) {
            return
        }
        this._lastHover._css_hover = false;
        this._updateCellStyle(this._lastHover._q, this._lastHover._w);
        this._lastHover = null
    };
    for (var b = 0; b < 6; b++) {
        var g = document.createElement("UL");
        g.className = "dhtmlxcalendar_line";
        this.contDates.appendChild(g);
        for (var i = 0; i < 7; i++) {
            var j = document.createElement("LI");
            j.className = "dhtmlxcalendar_cell";
            g.appendChild(j)
        }
    }
    this.contTime = document.createElement("DIV");
    this.contTime.className = "dhtmlxcalendar_time_cont";
    this.base.appendChild(this.contTime);
    this.showTime = function () {
        if (String(this.base.className).search("dhtmlxcalendar_time_hidden") > 0) {
            this.base.className = String(this.base.className).replace(/dhtmlxcalendar_time_hidden/gi, "")
        }
        this._ifrSize()
    };
    this.hideTime = function () {
        if (String(this.base.className).search("dhtmlxcalendar_time_hidden") < 0) {
            this.base.className += " dhtmlxcalendar_time_hidden"
        }
        this._ifrSize()
    };
    var g = document.createElement("UL");
    g.className = "dhtmlxcalendar_line";
    this.contTime.appendChild(g);
    var j = document.createElement("LI");
    j.className = "dhtmlxcalendar_cell dhtmlxcalendar_time_hdr";
    j.innerHTML = "<div class='dhtmlxcalendar_time_label'></div><span class='dhtmlxcalendar_label_hours'></span><span class='dhtmlxcalendar_label_colon'>:</span><span class='dhtmlxcalendar_label_minutes'></span>";
    g.appendChild(j);
    j.onclick = function (l) {
        l = l || event;
        var a = (l.target || l.srcElement);
        if (a.className && a.className == "dhtmlxcalendar_label_hours") {
            l.cancelBubble = true;
            e._showSelector("hours", 3, 115, "selector_hours", true);
            return
        }
        if (a.className && a.className == "dhtmlxcalendar_label_minutes") {
            l.cancelBubble = true;
            e._showSelector("minutes", 59, 115, "selector_minutes", true);
            return
        }
        e._hideSelector()
    };
    this._activeMonth = null;
    this._activeDate = new Date();
    this._activeDateCell = null;
    this.setDate = function (l) {
        this._nullDate = (typeof (l) == "undefined" || l === "" || !l);
        if (!(l instanceof Date)) {
            l = this._strToDate(String(l || ""));
            if (l == "Invalid Date") {
                l = new Date()
            }
        }
        var a = l.getTime();
        if (this._isOutOfRange(a)) {
            return
        }
        this._activeDate = new Date(a);
        this._drawMonth(this._nullDate ? new Date() : this._activeDate);
        this._updateVisibleHours();
        this._updateVisibleMinutes()
    };
    this.getDate = function (l) {
        if (this._nullDate) {
            return null
        }
        var a = new Date(this._activeDate.getTime());
        if (l) {
            return this._dateToStr(a)
        }
        return a
    };
    this._drawMonth = function (s) {
        if (!(s instanceof Date)) {
            return
        }
        if (isNaN(s.getFullYear())) {
            s = new Date(this._activeMonth.getFullYear(), this._activeMonth.getMonth(), 1, 0, 0, 0, 0)
        }
        this._activeMonth = new Date(s.getFullYear(), s.getMonth(), 1, 0, 0, 0, 0);
        this._activeDateCell = null;
        var p = new Date(this._activeMonth.getTime());
        var m = p.getDay();
        var u = m - this._wStart;
        if (u < 0) {
            u = u + 7
        }
        p.setDate(p.getDate() - u);
        var x = s.getMonth();
        var y = new Date(this._activeDate.getFullYear(), this._activeDate.getMonth(), this._activeDate.getDate(), 0, 0, 0, 0).getTime();
        var o = 0;
        for (var l = 0; l < 6; l++) {
            var r = this._wStart;
            for (var v = 0; v < 7; v++) {
                var a = new Date(p.getFullYear(), p.getMonth(), p.getDate() + o++, 0, 0, 0, 0);
                this.contDates.childNodes[l].childNodes[v].innerHTML = a.getDate();
                var t = a.getDay();
                var n = a.getTime();
                this.contDates.childNodes[l].childNodes[v]._date = new Date(n);
                this.contDates.childNodes[l].childNodes[v]._q = l;
                this.contDates.childNodes[l].childNodes[v]._w = v;
                this.contDates.childNodes[l].childNodes[v]._css_month = (a.getMonth() == x);
                this.contDates.childNodes[l].childNodes[v]._css_date = (!this._nullDate && n == y);
                this.contDates.childNodes[l].childNodes[v]._css_weekend = (r >= 6);
                this.contDates.childNodes[l].childNodes[v]._css_dis = this._isOutOfRange(n);
                this.contDates.childNodes[l].childNodes[v]._css_holiday = (this._holidays[n] == true);
                this._updateCellStyle(l, v);
                if (n == y) {
                    this._activeDateCell = this.contDates.childNodes[l].childNodes[v]
                }
                if (++r > 7) {
                    r = 1
                }
            }
        }
        this.contMonth.firstChild.firstChild.childNodes[1].innerHTML = this.langData[this.lang].monthesFNames[s.getMonth()];
        this.contMonth.firstChild.firstChild.childNodes[2].innerHTML = s.getFullYear()
    };
    this._updateCellStyle = function (n, a) {
        var m = this.contDates.childNodes[n].childNodes[a];
        var l = "dhtmlxcalendar_cell dhtmlxcalendar_cell";
        l += (m._css_month ? "_month" : "");
        l += (m._css_date ? "_date" : "");
        l += (m._css_weekend ? "_weekend" : "");
        l += (m._css_holiday ? "_holiday" : "");
        l += (m._css_dis ? "_dis" : "");
        l += (m._css_hover && !m._css_dis ? "_hover" : "");
        m.className = l;
        m = null
    };
    this._initSelector = function (p, o) {
        if (!this._selCover) {
            this._selCover = document.createElement("DIV");
            this._selCover.className = "dhtmlxcalendar_selector_cover";
            this.base.appendChild(this._selCover)
        }
        if (!this._sel) {
            this._sel = document.createElement("DIV");
            this._sel.className = "dhtmlxcalendar_selector_obj";
            this.base.appendChild(this._sel);
            this._sel.appendChild(document.createElement("TABLE"));
            this._sel.firstChild.className = "dhtmlxcalendar_selector_table";
            this._sel.firstChild.cellSpacing = 0;
            this._sel.firstChild.cellPadding = 0;
            this._sel.firstChild.border = 0;
            this._sel.firstChild.appendChild(document.createElement("TBODY"));
            this._sel.firstChild.firstChild.appendChild(document.createElement("TR"));
            this._sel.firstChild.firstChild.firstChild.appendChild(document.createElement("TD"));
            this._sel.firstChild.firstChild.firstChild.appendChild(document.createElement("TD"));
            this._sel.firstChild.firstChild.firstChild.appendChild(document.createElement("TD"));
            this._sel.firstChild.firstChild.firstChild.childNodes[0].className = "dhtmlxcalendar_selector_cell_left";
            this._sel.firstChild.firstChild.firstChild.childNodes[1].className = "dhtmlxcalendar_selector_cell_middle";
            this._sel.firstChild.firstChild.firstChild.childNodes[2].className = "dhtmlxcalendar_selector_cell_right";
            this._sel.firstChild.firstChild.firstChild.childNodes[0].innerHTML = "&nbsp;";
            this._sel.firstChild.firstChild.firstChild.childNodes[2].innerHTML = "&nbsp;";
            this._sel.firstChild.firstChild.firstChild.childNodes[0].onmouseover = function () {
                this.className = "dhtmlxcalendar_selector_cell_left dhtmlxcalendar_selector_cell_left_hover"
            };
            this._sel.firstChild.firstChild.firstChild.childNodes[0].onmouseout = function () {
                this.className = "dhtmlxcalendar_selector_cell_left"
            };
            this._sel.firstChild.firstChild.firstChild.childNodes[2].onmouseover = function () {
                this.className = "dhtmlxcalendar_selector_cell_right dhtmlxcalendar_selector_cell_right_hover"
            };
            this._sel.firstChild.firstChild.firstChild.childNodes[2].onmouseout = function () {
                this.className = "dhtmlxcalendar_selector_cell_right"
            };
            this._sel.firstChild.firstChild.firstChild.childNodes[0].onclick = function (q) {
                q = q || event;
                q.cancelBubble = true;
                e._scrollYears(-1)
            };
            this._sel.firstChild.firstChild.firstChild.childNodes[2].onclick = function (q) {
                q = q || event;
                q.cancelBubble = true;
                e._scrollYears(1)
            };
            this._sel._ta = {};
            this._selHover = null;
            this._sel.onmouseover = function (s) {
                s = s || event;
                var q = (s.target || s.srcElement);
                if (q._cell === true) {
                    if (e._selHover != q) {
                        e._clearSelHover()
                    }
                    if (String(q.className).match(/^\s{0,}dhtmlxcalendar_selector_cell\s{0,}$/gi) != null) {
                        q.className += " dhtmlxcalendar_selector_cell_hover";
                        e._selHover = q
                    }
                }
            };
            this._sel.onmouseout = function () {
                e._clearSelHover()
            };
            this._sel.appendChild(document.createElement("DIV"));
            this._sel.lastChild.className = "dhtmlxcalendar_selector_obj_arrow"
        }
        if (this._sel._ta[p] == true) {
            return
        }
        if (p == "month") {
            this._msCells = {};
            this.msCont = document.createElement("DIV");
            this.msCont.className = "dhtmlxcalendar_area_" + o;
            this._sel.firstChild.firstChild.firstChild.childNodes[1].appendChild(this.msCont);
            var n = 0;
            for (var r = 0; r < 4; r++) {
                var m = document.createElement("UL");
                m.className = "dhtmlxcalendar_selector_line";
                this.msCont.appendChild(m);
                for (var l = 0; l < 3; l++) {
                    var a = document.createElement("LI");
                    a.innerHTML = this.langData[this.lang].monthesSNames[n];
                    a.className = "dhtmlxcalendar_selector_cell";
                    m.appendChild(a);
                    a._month = n;
                    a._cell = true;
                    this._msCells[n++] = a
                }
            }
            this.msCont.onclick = function (s) {
                s = s || event;
                s.cancelBubble = true;
                var q = (s.target || s.srcElement);
                if (q._month != null) {
                    e._hideSelector();
                    e._updateActiveMonth();
                    e._drawMonth(new Date(e._activeMonth.getFullYear(), q._month, 1, 0, 0, 0, 0));
                    e._doOnSelectorChange()
                }
            }
        }
        if (p == "year") {
            this._ysCells = {};
            this.ysCont = document.createElement("DIV");
            this.ysCont.className = "dhtmlxcalendar_area_" + o;
            this._sel.firstChild.firstChild.firstChild.childNodes[1].appendChild(this.ysCont);
            for (var r = 0; r < 4; r++) {
                var m = document.createElement("UL");
                m.className = "dhtmlxcalendar_selector_line";
                this.ysCont.appendChild(m);
                for (var l = 0; l < 3; l++) {
                    var a = document.createElement("LI");
                    a.className = "dhtmlxcalendar_selector_cell";
                    a._cell = true;
                    m.appendChild(a)
                }
            }
            this.ysCont.onclick = function (s) {
                s = s || event;
                s.cancelBubble = true;
                var q = (s.target || s.srcElement);
                if (q._year != null) {
                    e._hideSelector();
                    e._drawMonth(new Date(q._year, e._activeMonth.getMonth(), 1, 0, 0, 0, 0));
                    e._doOnSelectorChange()
                }
            }
        }
        if (p == "hours") {
            this._hsCells = {};
            this.hsCont = document.createElement("DIV");
            this.hsCont.className = "dhtmlxcalendar_area_" + o;
            this._sel.firstChild.firstChild.firstChild.childNodes[1].appendChild(this.hsCont);
            var n = 0;
            for (var r = 0; r < 4; r++) {
                var m = document.createElement("UL");
                m.className = "dhtmlxcalendar_selector_line";
                this.hsCont.appendChild(m);
                for (var l = 0; l < 6; l++) {
                    var a = document.createElement("LI");
                    a.innerHTML = this._fixLength(n, 2);
                    a.className = "dhtmlxcalendar_selector_cell";
                    m.appendChild(a);
                    a._hours = n;
                    a._cell = true;
                    this._hsCells[n++] = a
                }
            }
            this.hsCont.onclick = function (s) {
                s = s || event;
                s.cancelBubble = true;
                var q = (s.target || s.srcElement);
                if (q._hours != null) {
                    e._hideSelector();
                    e._activeDate.setHours(q._hours);
                    e._updateActiveHours();
                    e._updateVisibleHours();
                    e._doOnSelectorChange()
                }
            }
        }
        if (p == "minutes") {
            this._rsCells = {};
            this.rsCont = document.createElement("DIV");
            this.rsCont.className = "dhtmlxcalendar_area_" + o;
            this._sel.firstChild.firstChild.firstChild.childNodes[1].appendChild(this.rsCont);
            var n = 0;
            for (var r = 0; r < 4; r++) {
                var m = document.createElement("UL");
                m.className = "dhtmlxcalendar_selector_line";
                this.rsCont.appendChild(m);
                for (var l = 0; l < 3; l++) {
                    var a = document.createElement("LI");
                    a.innerHTML = this._fixLength(n, 2);
                    a.className = "dhtmlxcalendar_selector_cell";
                    m.appendChild(a);
                    a._minutes = n;
                    a._cell = true;
                    this._rsCells[n] = a;
                    n += 5
                }
            }
            this.rsCont.onclick = function (s) {
                s = s || event;
                s.cancelBubble = true;
                var q = (s.target || s.srcElement);
                if (q._minutes != null) {
                    e._hideSelector();
                    e._activeDate.setMinutes(q._minutes);
                    e._updateActiveMinutes();
                    e._updateVisibleMinutes();
                    e._doOnSelectorChange()
                }
            }
        }
        this._sel._ta[p] = true
    };
    this._showSelector = function (n, l, o, m, a) {
        if (a === true && this._sel != null && this._isSelectorVisible() && n == this._sel._t) {
            this._hideSelector();
            return
        }
        if (this.skin == "dhx_terrace") {
            l += {
                month: 14,
                year: 27,
                hours: 19,
                minutes: 24
            }[n];
            o += {
                month: 8,
                year: 8,
                hours: 14,
                minutes: 14
            }[n]
        }
        if (!this._sel || !this._sel._ta[n]) {
            this._initSelector(n, m)
        }
        this._selCover.style.display = "";
        this._sel._t = n;
        this._sel.style.left = l + "px";
        this._sel.style.top = o + "px";
        this._sel.style.display = "";
        this._sel.className = "dhtmlxcalendar_selector_obj dhtmlxcalendar_" + m;
        this._doOnSelectorShow(n)
    };
    this._doOnSelectorShow = function (a) {
        if (a == "month") {
            this._updateActiveMonth()
        }
        if (a == "year") {
            this._updateYearsList(this._activeMonth)
        }
        if (a == "hours") {
            this._updateActiveHours()
        }
        if (a == "minutes") {
            this._updateActiveMinutes()
        }
    };
    this._hideSelector = function () {
        if (!this._sel) {
            return
        }
        this._sel.style.display = "none";
        this._selCover.style.display = "none"
    };
    this._isSelectorVisible = function () {
        if (!this._sel) {
            return false
        }
        return (this._sel.style.display != "none")
    };
    this._doOnSelectorChange = function (a) {
        this.callEvent("onChange", [new Date(this._activeMonth.getFullYear(), this._activeMonth.getMonth(), this._activeDate.getDate(), this._activeDate.getHours(), this._activeDate.getMinutes(), this._activeDate.getSeconds()), a])
    };
    this._clearSelHover = function () {
        if (!this._selHover) {
            return
        }
        this._selHover.className = String(this._selHover.className.replace(/dhtmlxcalendar_selector_cell_hover/gi, ""));
        this._selHover = null
    };
    this._updateActiveMonth = function () {
        if (typeof (this._msActive) != "undefined" && typeof (this._msCells[this._msActive]) != "undefined") {
            this._msCells[this._msActive].className = "dhtmlxcalendar_selector_cell"
        }
        this._msActive = this._activeMonth.getMonth();
        this._msCells[this._msActive].className = "dhtmlxcalendar_selector_cell dhtmlxcalendar_selector_cell_active"
    };
    this._updateActiveYear = function () {
        var a = this._activeMonth.getFullYear();
        if (this._ysCells[a]) {
            this._ysCells[a].className = "dhtmlxcalendar_selector_cell dhtmlxcalendar_selector_cell_active"
        }
    };
    this._updateYearsList = function (p) {
        for (var m in this._ysCells) {
            this._ysCells[m] = null;
            delete this._ysCells[m]
        }
        var n = 12 * Math.floor(p.getFullYear() / 12);
        for (var o = 0; o < 4; o++) {
            for (var l = 0; l < 3; l++) {
                this.ysCont.childNodes[o].childNodes[l].innerHTML = n;
                this.ysCont.childNodes[o].childNodes[l]._year = n;
                this.ysCont.childNodes[o].childNodes[l].className = "dhtmlxcalendar_selector_cell";
                this._ysCells[n++] = this.ysCont.childNodes[o].childNodes[l]
            }
        }
        this._updateActiveYear()
    };
    this._scrollYears = function (a) {
        var m = (a < 0 ? this.ysCont.firstChild.firstChild._year : this.ysCont.lastChild.lastChild._year) + a;
        var l = new Date(m, this._activeMonth.getMonth(), 1, 0, 0, 0, 0);
        this._updateYearsList(l)
    };
    this._updateActiveHours = function () {
        if (typeof (this._hsActive) != "undefined" && typeof (this._hsCells[this._hsActive]) != "undefined") {
            this._hsCells[this._hsActive].className = "dhtmlxcalendar_selector_cell"
        }
        this._hsActive = this._activeDate.getHours();
        this._hsCells[this._hsActive].className = "dhtmlxcalendar_selector_cell dhtmlxcalendar_selector_cell_active"
    };
    this._updateVisibleHours = function () {
        this.contTime.firstChild.firstChild.childNodes[1].innerHTML = this._fixLength(this._activeDate.getHours(), 2)
    };
    this._updateActiveMinutes = function () {
        if (typeof (this._rsActive) != "undefined" && typeof (this._rsCells[this._rsActive]) != "undefined") {
            this._rsCells[this._rsActive].className = "dhtmlxcalendar_selector_cell"
        }
        this._rsActive = this._activeDate.getMinutes();
        if (typeof (this._rsCells[this._rsActive]) != "undefined") {
            this._rsCells[this._rsActive].className = "dhtmlxcalendar_selector_cell dhtmlxcalendar_selector_cell_active"
        }
    };
    this._updateVisibleMinutes = function () {
        this.contTime.firstChild.firstChild.childNodes[3].innerHTML = this._fixLength(this._activeDate.getMinutes(), 2)
    };
    this._fixLength = function (a, l) {
        while (String(a).length < l) {
            a = "0" + String(a)
        }
        return a
    };
    this._dateFormat = "";
    this._dateFormatRE = null;
    this.setDateFormat = function (a) {
        this._dateFormat = a;
        this._dateFormatRE = new RegExp(String(this._dateFormat).replace(/%[a-zA-Z]+/g,
        function (l) {
            var m = l.replace(/%/, "");
            switch (m) {
                case "n":
                case "h":
                case "j":
                case "g":
                case "G":
                    return "\\d{1,2}";
                case "m":
                case "d":
                case "H":
                case "i":
                case "s":
                case "y":
                    return "\\d{2}";
                case "Y":
                    return "\\d{4}";
                case "M":
                    return "(" + e.langData[e.lang].monthesSNames.join("|").toLowerCase() + "){1,}";
                case "F":
                    return "(" + e.langData[e.lang].monthesFNames.join("|").toLowerCase() + "){1,}";
                case "D":
                    return "[a-z]{2}";
                case "a":
                case "A":
                    return "AM|PM"
            }
            return l
        }), "i")
    };
    this.setDateFormat(this.langData[this.lang].dateformat || "%Y-%m-%d");
    this._getInd = function (m, a) {
        for (var l = 0; l < a.length; l++) {
            if (a[l].toLowerCase() == m) {
                return l
            }
        }
        return -1
    };
    this._strToDate = function (o, z) {
        z = (z || this._dateFormat);
        var B = o.match(/[a-z0-9]{1,}/gi);
        var u = z.match(/%[a-zA-Z]/g);
        if (!B || B.length != u.length) {
            return "Invalid Date"
        }
        var m = {
            "%y": 1,
            "%Y": 1,
            "%n": 2,
            "%m": 2,
            "%M": 2,
            "%F": 2,
            "%d": 3,
            "%j": 3,
            "%a": 4,
            "%A": 4,
            "%H": 5,
            "%G": 5,
            "%h": 5,
            "%g": 5,
            "%i": 6,
            "%s": 7
        };
        var x = {};
        var t = {};
        for (var l = 0; l < u.length; l++) {
            if (typeof (m[u[l]]) != "undefined") {
                var n = m[u[l]];
                if (!x[n]) {
                    x[n] = [];
                    t[n] = []
                }
                x[n].push(B[l]);
                t[n].push(u[l])
            }
        }
        B = [];
        u = [];
        for (var l = 1; l <= 7; l++) {
            if (x[l] != null) {
                for (var y = 0; y < x[l].length; y++) {
                    B.push(x[l][y]);
                    u.push(t[l][y])
                }
            }
        }
        var a = new Date();
        a.setDate(1);
        a.setMinutes(0);
        a.setSeconds(0);
        for (var l = 0; l < B.length; l++) {
            switch (u[l]) {
                case "%d":
                case "%j":
                case "%n":
                case "%m":
                case "%Y":
                case "%H":
                case "%G":
                case "%i":
                case "%s":
                    if (!isNaN(B[l])) {
                        a[{
                            "%d": "setDate",
                            "%j": "setDate",
                            "%n": "setMonth",
                            "%m": "setMonth",
                            "%Y": "setFullYear",
                            "%H": "setHours",
                            "%G": "setHours",
                            "%i": "setMinutes",
                            "%s": "setSeconds"
                        }[u[l]]](Number(B[l]) + (u[l] == "%m" || u[l] == "%n" ? -1 : 0))
                    }
                    break;
                case "%M":
                case "%F":
                    var s = this._getInd(B[l].toLowerCase(), e.langData[e.lang][{
                        "%M": "monthesSNames",
                        "%F": "monthesFNames"
                    }[u[l]]]);
                    if (s >= 0) {
                        a.setMonth(s)
                    }
                    break;
                case "%y":
                    if (!isNaN(B[l])) {
                        var A = Number(B[l]);
                        a.setFullYear(A + (A > 50 ? 1900 : 2000))
                    }
                    break;
                case "%g":
                case "%h":
                    if (!isNaN(B[l])) {
                        var A = Number(B[l]);
                        if (A <= 12 && A >= 0) {
                            a.setHours(A + (this._getInd("pm", B) >= 0 ? (A == 12 ? 0 : 12) : (A == 12 ? -12 : 0)))
                        }
                    }
                    break
            }
        }
        return a
    };
    this._dateToStr = function (o, m) {
        if (o instanceof Date) {
            var n = function (p) {
                return (String(p).length == 1 ? "0" + String(p) : p)
            };
            var a = function (p) {
                switch (p) {
                    case "%d":
                        return n(o.getDate());
                    case "%j":
                        return o.getDate();
                    case "%D":
                        return e.langData[e.lang].daysSNames[o.getDay()];
                    case "%l":
                        return e.langData[e.lang].daysFNames[o.getDay()];
                    case "%m":
                        return n(o.getMonth() + 1);
                    case "%n":
                        return o.getMonth() + 1;
                    case "%M":
                        return e.langData[e.lang].monthesSNames[o.getMonth()];
                    case "%F":
                        return e.langData[e.lang].monthesFNames[o.getMonth()];
                    case "%y":
                        return n(o.getYear() % 100);
                    case "%Y":
                        return o.getFullYear();
                    case "%g":
                        return (o.getHours() + 11) % 12 + 1;
                    case "%h":
                        return n((o.getHours() + 11) % 12 + 1);
                    case "%G":
                        return o.getHours();
                    case "%H":
                        return n(o.getHours());
                    case "%i":
                        return n(o.getMinutes());
                    case "%s":
                        return n(o.getSeconds());
                    case "%a":
                        return (o.getHours() > 11 ? "pm" : "am");
                    case "%A":
                        return (o.getHours() > 11 ? "PM" : "AM");
                    case "%%":
                        "%";
                    default:
                        return p
                }
            };
            var l = String(m || this._dateFormat).replace(/%[a-zA-Z]/g, a)
        }
        return (l || String(o))
    };
    this._updateDateStr = function (l) {
        if (!this._dateFormatRE || !l.match(this._dateFormatRE)) {
            return
        }
        if (l == this.getFormatedDate()) {
            return
        }
        var a = this._strToDate(l);
        if (!(a instanceof Date)) {
            return
        }
        if (this.checkEvent("onBeforeChange")) {
            if (!this.callEvent("onBeforeChange", [new Date(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds())])) {
                if (this.i != null && this._activeInp != null && this.i[this._activeInp] != null && this.i[this._activeInp].input != null) {
                    this.i[this._activeInp].input.value = this.getFormatedDate()
                }
                return
            }
        }
        this._nullDate = false;
        this._activeDate = a;
        this._drawMonth(this._nullDate ? new Date() : this._activeDate);
        this._updateVisibleMinutes();
        this._updateVisibleHours();
        if (this._sel && this._isSelectorVisible()) {
            this._doOnSelectorShow(this._sel._t)
        }
        this._doOnSelectorChange(true)
    };
    this.showMonth = function (a) {
        this._drawMonth(a)
    };
    this.setFormatedDate = function (o, p, l, n) {
        var m = this._strToDate(p, o);
        if (n) {
            return m
        }
        this.setDate(m)
    };
    this.getFormatedDate = function (l, a) {
        if (!(a && a instanceof Date)) {
            if (this._nullDate) {
                return ""
            }
            a = new Date(this._activeDate)
        }
        return this._dateToStr(a, l)
    };
    this.show = function (m) {
        if (!m && this._hasParent) {
            this._show();
            return
        }
        if (typeof (m) == "object" && typeof (m._dhtmlxcalendar_uid) != "undefined" && this.i[m._dhtmlxcalendar_uid] == m) {
            this._show(m._dhtmlxcalendar_uid);
            return
        }
        if (typeof (m) == "undefined") {
            for (var l in this.i) {
                if (!m) {
                    m = l
                }
            }
        }
        if (!m) {
            return
        }
        this._show(m)
    };
    this.initShow = function (m, n) {
        this.initShowFlag = m;
        if (!n && this._hasParent) {
            this._show();
            return
        }
        if (typeof (n) == "object" && typeof (n._dhtmlxcalendar_uid) != "undefined" && this.i[n._dhtmlxcalendar_uid] == n) {
            this._show(n._dhtmlxcalendar_uid);
            return
        }
        if (typeof (n) == "undefined") {
            for (var l in this.i) {
                if (!n) {
                    n = l
                }
            }
        }
        if (!n) {
            return
        }
        this._show(n)
    };
    this.hide = function () {
        if (this._isVisible()) {
            this._hide()
        }
    };
    this.isVisible = function () {
        return this._isVisible()
    };
    this.draw = function () {
        this.show()
    };
    this.close = function () {
        this.hide()
    };
    this._activeInp = null;
    this.pos = "bottom";
    this.setPosition = function (a, l) {
        this._px = null;
        this._py = null;
        if (a == "right" || a == "bottom") {
            this.pos = a
        } else {
            this.pos = "int";
            if (typeof (a) != "undefined" && !isNaN(a)) {
                this.base.style.left = a + "px";
                this._px = a
            }
            if (typeof (l) != "undefined" && !isNaN(l)) {
                this.base.style.top = l + "px";
                this._py = l
            }
            this._ifrSize()
        }
    };
    this._show = function (p, a) {
        if (a === true && this._activeInp == p && this._isVisible()) {
            this._hide();
            return
        }
        this.base.style.visibility = "hidden";
        this.base.style.display = "";
        if (!p) {
            if (this._px && this._py) {
                this.base.style.left = this._px + "px";
                this.base.style.top = this._py + "px"
            } else {
                this.base.style.left = "0px";
                this.base.style.top = "0px"
            }
        } else {
            var n = (this.i[p].input || this.i[p].button);
            var l = (navigator.appVersion.indexOf("MSIE") != -1);
            var o = Math.max((l ? document.documentElement : document.getElementsByTagName("html")[0]).scrollTop, document.body.scrollTop);
            var m = o + (l ? Math.max(document.documentElement.clientHeight || 0, document.documentElement.offsetHeight || 0, document.body.clientHeight || 0) : window.innerHeight);
            if (this.pos == "right") {
                this.base.style.left = this._getLeft(n) + n.offsetWidth - 1 + "px";
                this.base.style.top = Math.min(this._getTop(n), m - this.base.offsetHeight) + "px"
            } else {
                if (this.pos == "bottom") {
                    this.base.style.left = this._getLeft(n) + "px";
                    this.base.style.top = this._getTop(n) + n.offsetHeight + 1 + "px"
                } else {
                    this.base.style.left = (this._px || 0) + "px";
                    this.base.style.top = (this._py || 0) + "px"
                }
            }
            this._activeInp = p;
            n = null
        }
        this._hideSelector();
        this.base.style.visibility = "visible";
        this._ifrSize();
        if (this._ifr) {
            this._ifr.style.display = ""
        }
    };
    this.setInitShowFlag = function (a) {
        this.initShowFlag = a
    };
    this._hide = function () {
        if (this.initShowFlag) {
            this.initShowFlag = false;
            return
        }
        this._hideSelector();
        this.base.style.display = "none";
        this._activeInp = null;
        if (this._ifr) {
            this._ifr.style.display = "none"
        }
        this.callEvent("onHide", [])
    };
    this._isVisible = function () {
        return (this.base.style.display != "none")
    };
    this._getLeft = function (a) {
        return this._posGetOffset(a).left
    };
    this._getTop = function (a) {
        return this._posGetOffset(a).top
    };
    this._posGetOffsetSum = function (a) {
        var m = 0,
        l = 0;
        while (a) {
            m = m + parseInt(a.offsetTop);
            l = l + parseInt(a.offsetLeft);
            a = a.offsetParent
        }
        return {
            top: m,
            left: l
        }
    };
    this._posGetOffsetRect = function (n) {
        var q = n.getBoundingClientRect();
        var r = document.body;
        var l = document.documentElement;
        var a = window.pageYOffset || l.scrollTop || r.scrollTop;
        var o = window.pageXOffset || l.scrollLeft || r.scrollLeft;
        var p = l.clientTop || r.clientTop || 0;
        var s = l.clientLeft || r.clientLeft || 0;
        var t = q.top + a - p;
        var m = q.left + o - s;
        return {
            top: Math.round(t),
            left: Math.round(m)
        }
    };
    this._posGetOffset = function (a) {
        return this[a.getBoundingClientRect ? "_posGetOffsetRect" : "_posGetOffsetSum"](a)
    };
    this._rangeActive = false;
    this._rangeFrom = null;
    this._rangeTo = null;
    this._rangeSet = {};
    this.setInsensitiveDays = function (m) {
        var a = this._extractDates(m);
        for (var l = 0; l < a.length; l++) {
            this._rangeSet[new Date(a[l].getFullYear(), a[l].getMonth(), a[l].getDate(), 0, 0, 0, 0).getTime()] = true
        }
        this._drawMonth(this._activeMonth)
    };
    this.clearInsensitiveDays = function () {
        this._clearRangeSet();
        this._drawMonth(this._activeMonth)
    };
    this._holidays = {};
    this.setHolidays = function (l) {
        if (l == null) {
            this._clearHolidays()
        } else {
            if (l != null) {
                var a = this._extractDates(l);
                for (var m = 0; m < a.length; m++) {
                    this._holidays[new Date(a[m].getFullYear(), a[m].getMonth(), a[m].getDate(), 0, 0, 0, 0).getTime()] = true
                }
            }
        }
        this._drawMonth(this._activeMonth)
    };
    this._extractDates = function (m) {
        if (typeof (m) == "string" || m instanceof Date) {
            m = [m]
        }
        var l = [];
        for (var n = 0; n < m.length; n++) {
            if (typeof (m[n]) == "string") {
                var o = m[n].split(",");
                for (var a = 0; a < o.length; a++) {
                    l.push(this._strToDate(o[a]))
                }
            } else {
                if (m[n] instanceof Date) {
                    l.push(m[n])
                }
            }
        }
        return l
    };
    this._clearRange = function () {
        this._rangeActive = false;
        this._rangeType = null;
        this._rangeFrom = null;
        this._rangeTo = null
    };
    this._clearRangeSet = function () {
        for (var l in this._rangeSet) {
            this._rangeSet[l] = null;
            delete this._rangeSet[l]
        }
    };
    this._clearHolidays = function () {
        for (var l in this._holidays) {
            this._holidays[l] = null;
            delete this._holidays[l]
        }
    };
    this._isOutOfRange = function (l) {
        if (this._rangeSet[l] == true) {
            return true
        }
        if (this._rangeActive) {
            if (this._rangeType == "in" && (l < this._rangeFrom || l > this._rangeTo)) {
                return true
            }
            if (this._rangeType == "out" && (l >= this._rangeFrom && l <= this._rangeTo)) {
                return true
            }
            if (this._rangeType == "from" && l < this._rangeFrom) {
                return true
            }
            if (this._rangeType == "to" && l > this._rangeTo) {
                return true
            }
        }
        var a = new Date(l);
        if (this._rangeWeek) {
            if (this._rangeWeekData[a.getDay()] === true) {
                return true
            }
        }
        if (this._rangeMonth) {
            if (this._rangeMonthData[a.getDate()] === true) {
                return true
            }
        }
        if (this._rangeYear) {
            if (this._rangeYearData[a.getMonth() + "_" + a.getDate()] === true) {
                return true
            }
        }
        return false
    };
    this.clearSensitiveRange = function () {
        this._clearRange();
        this._drawMonth(this._activeMonth)
    };
    this.setSensitiveRange = function (n, m, a) {
        var l = false;
        if (n != null && m != null) {
            if (!(n instanceof Date)) {
                n = this._strToDate(n)
            }
            if (!(m instanceof Date)) {
                m = this._strToDate(m)
            }
            if (n.getTime() > m.getTime()) {
                return
            }
            this._rangeFrom = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0, 0).getTime();
            this._rangeTo = new Date(m.getFullYear(), m.getMonth(), m.getDate(), 0, 0, 0, 0).getTime();
            this._rangeActive = true;
            this._rangeType = "in";
            l = true
        }
        if (!l && n != null && m == null) {
            if (!(n instanceof Date)) {
                n = this._strToDate(n)
            }
            this._rangeFrom = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0, 0).getTime();
            this._rangeTo = null;
            if (a === true) {
                this._rangeFrom++
            }
            this._rangeActive = true;
            this._rangeType = "from";
            l = true
        }
        if (!l && n == null && m != null) {
            if (!(m instanceof Date)) {
                m = this._strToDate(m)
            }
            this._rangeFrom = null;
            this._rangeTo = new Date(m.getFullYear(), m.getMonth(), m.getDate(), 0, 0, 0, 0).getTime();
            if (a === true) {
                this._rangeTo--
            }
            this._rangeActive = true;
            this._rangeType = "to";
            l = true
        }
        if (l) {
            this._drawMonth(this._activeMonth)
        }
    };
    this.setInsensitiveRange = function (l, a) {
        if (l != null && a != null) {
            if (!(l instanceof Date)) {
                l = this._strToDate(l)
            }
            if (!(a instanceof Date)) {
                a = this._strToDate(a)
            }
            if (l.getTime() > a.getTime()) {
                return
            }
            this._rangeFrom = new Date(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0, 0).getTime();
            this._rangeTo = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 0, 0, 0, 0).getTime();
            this._rangeActive = true;
            this._rangeType = "out";
            this._drawMonth(this._activeMonth);
            return
        }
        if (l != null && a == null) {
            this.setSensitiveRange(null, l, true);
            return
        }
        if (l == null && a != null) {
            this.setSensitiveRange(a, null, true);
            return
        }
    };
    this.disableDays = function (p, o) {
        if (p == "week") {
            if (typeof (o) != "object" && typeof (o.length) == "undefined") {
                o = [o]
            }
            if (!this._rangeWeekData) {
                this._rangeWeekData = {}
            }
            for (var l in this._rangeWeekData) {
                this._rangeWeekData[l] = false;
                delete this._rangeWeekData[l]
            }
            for (var n = 0; n < o.length; n++) {
                this._rangeWeekData[o[n]] = true;
                if (o[n] == 7) {
                    this._rangeWeekData[0] = true
                }
            }
            this._rangeWeek = true
        }
        if (p == "month") {
            if (typeof (o) != "object" && typeof (o.length) == "undefined") {
                o = [o]
            }
            if (!this._rangeMonthData) {
                this._rangeMonthData = {}
            }
            for (var l in this._rangeMonthData) {
                this._rangeMonthData[l] = false;
                delete this._rangeMonthData[l]
            }
            for (var n = 0; n < o.length; n++) {
                this._rangeMonthData[o[n]] = true
            }
            this._rangeMonth = true
        }
        if (p == "year") {
            var m = this._extractDates(o);
            if (!this._rangeYearData) {
                this._rangeYearData = {}
            }
            for (var l in this._rangeYearData) {
                this._rangeYearData[l] = false;
                delete this._rangeYearData[l]
            }
            for (var n = 0; n < m.length; n++) {
                this._rangeYearData[m[n].getMonth() + "_" + m[n].getDate()] = true
            }
            this._rangeYear = true
        }
        this._drawMonth(this._activeMonth)
    };
    this.enableDays = function (a) {
        if (a == "week") {
            this._rangeWeek = false
        }
        if (a == "month") {
            this._rangeMonth = false
        }
        if (a == "year") {
            this._rangeYear = false
        }
        this._drawMonth(this._activeMonth)
    };
    this._updateFromInput = function (a) {
        if (this._nullInInput && ((a.value).replace(/\s/g, "")).length == 0) {
            if (this.checkEvent("onBeforeChange")) {
                if (!this.callEvent("onBeforeChange", [null])) {
                    if (this.i != null && this._activeInp != null && this.i[this._activeInp] != null && this.i[this._activeInp].input != null) {
                        this.i[this._activeInp].input.value = this.getFormatedDate()
                    }
                    return
                }
            }
            this.setDate(null)
        } else {
            this._updateDateStr(a.value)
        }
        a = null
    };
    this._doOnClick = function (l) {
        l = l || event;
        var a = (l.target || l.srcElement);
        if (a._dhtmlxcalendar_uid && a._dhtmlxcalendar_uid != e._activeInp && e._isVisible() && e._activeInp) {
            e._hide();
            return
        }
        if (!a._dhtmlxcalendar_uid || !e.i[a._dhtmlxcalendar_uid]) {
            if (e._isSelectorVisible()) {
                e._hideSelector()
            } else {
                if (!e._hasParent && e._isVisible()) {
                    e._hide()
                }
            }
        }
    };
    this._doOnKeyDown = function (a) {
        a = a || event;
        if (a.keyCode == 27 || a.keyCode == 13) {
            if (e._isSelectorVisible()) {
                e._hideSelector()
            } else {
                if (e._isVisible() && !e._hasParent) {
                    e._hide()
                }
            }
        }
    };
    this._doOnInpClick = function (l) {
        l = l || event;
        var a = (l.target || l.srcElement);
        if (!a._dhtmlxcalendar_uid) {
            return
        }
        if (!e._listenerEnabled) {
            e._updateFromInput(a)
        }
        e._show(a._dhtmlxcalendar_uid, true)
    };
    this._doOnInpKeyUp = function (l) {
        l = l || event;
        var a = (l.target || l.srcElement);
        if (l.keyCode == 13 || !a._dhtmlxcalendar_uid) {
            return
        }
        if (!e._listenerEnabled) {
            e._updateFromInput(a)
        }
    };
    this._doOnBtnClick = function (l) {
        l = l || event;
        var a = (l.target || l.srcElement);
        if (!a._dhtmlxcalendar_uid) {
            return
        }
        if (e.i[a._dhtmlxcalendar_uid].input != null) {
            e._updateFromInput(e.i[a._dhtmlxcalendar_uid].input)
        }
        e._show(a._dhtmlxcalendar_uid, true)
    };
    this._doOnUnload = function () {
        if (e && e.unload) {
            e.unload()
        }
    };
    if (window.addEventListener) {
        document.body.addEventListener("click", e._doOnClick, false);
        window.addEventListener("keydown", e._doOnKeyDown, false);
        window.addEventListener("unload", e._doOnUnload, false)
    } else {
        document.body.attachEvent("onclick", e._doOnClick);
        document.body.attachEvent("onkeydown", e._doOnKeyDown);
        window.attachEvent("onunload", e._doOnUnload)
    }
    this.attachObj = function (m) {
        if (typeof (m) == "string") {
            m = document.getElementById(m)
        }
        var l = this.uid();
        this.i[l] = m;
        this._attachEventsToObject(l)
    };
    this.detachObj = function (m) {
        if (typeof (m) == "string") {
            m = document.getElementById(m)
        }
        var l = m._dhtmlxcalendar_uid;
        if (this.i[l] != null) {
            this._detachEventsFromObject(l);
            this.i[l]._dhtmlxcalendar_uid = null;
            this.i[l] = null;
            delete this.i[l]
        }
    };
    this._attachEventsToObject = function (l) {
        if (this.i[l].button != null) {
            this.i[l].button._dhtmlxcalendar_uid = l;
            if (window.addEventListener) {
                this.i[l].button.addEventListener("click", e._doOnBtnClick, false)
            } else {
                this.i[l].button.attachEvent("onclick", e._doOnBtnClick)
            }
        } else {
            if (this.i[l].input != null) {
                this.i[l].input._dhtmlxcalendar_uid = l;
                if (window.addEventListener) {
                    this.i[l].input.addEventListener("click", e._doOnInpClick, false);
                    this.i[l].input.addEventListener("keyup", e._doOnInpKeyUp, false)
                } else {
                    this.i[l].input.attachEvent("onclick", e._doOnInpClick);
                    this.i[l].input.attachEvent("onkeyup", e._doOnInpKeyUp)
                }
            }
        }
    };
    this.enableListener = function (a) {
        if (!a) {
            return
        }
        if (window.addEventListener) {
            a.addEventListener("focus", e._listenerEvFocus, false);
            a.addEventListener("blur", e._listenerEvBlur, false)
        } else {
            a.attachEvent("onfocus", e._listenerEvFocus);
            a.attachEvent("onblur", e._listenerEvBlur)
        }
        a = null
    };
    this.disableListener = function (a) {
        if (!a) {
            return
        }
        a._f0 = false;
        if (this._tmListener) {
            window.clearTimeout(this._tmListener)
        }
        if (window.addEventListener) {
            a.removeEventListener("focus", e._listenerEvFocus, false);
            a.removeEventListener("blur", e._listenerEvBlur, false)
        } else {
            a.detachEvent("onfocus", e._listenerEvFocus);
            a.detachEvent("onblur", e._listenerEvBlur)
        }
        a = null
    };
    this._startListener = function (a) {
        if (this._tmListener) {
            window.clearTimeout(this._tmListener)
        }
        if (typeof (a._v1) == "undefined") {
            a._v1 = a.value
        }
        if (a._v1 != a.value) {
            this._updateFromInput(a);
            a._v1 = a.value
        }
        if (a._f0) {
            this._tmListener = window.setTimeout(function () {
                e._startListener(a)
            },
            100)
        }
    };
    this._listenerEvFocus = function (l) {
        l = l || event;
        var a = l.target || l.srcElement;
        a._f0 = true;
        e._startListener(a);
        a = null
    };
    this._listenerEvBlur = function (l) {
        l = l || event;
        var a = l.target || l.srcElement;
        a._f0 = false;
        a = null
    };
    this._detachEventsFromObject = function (l) {
        if (this.i[l].button != null) {
            if (window.addEventListener) {
                this.i[l].button.removeEventListener("click", e._doOnBtnClick, false)
            } else {
                this.i[l].button.detachEvent("onclick", e._doOnBtnClick)
            }
        } else {
            if (this.i[l].input != null) {
                if (window.addEventListener) {
                    this.i[l].input.removeEventListener("click", e._doOnInpClick, false);
                    this.i[l].input.removeEventListener("keyup", e._doOnInpKeyUp, false)
                } else {
                    this.i[l].input.detachEvent("onclick", e._doOnInpClick);
                    this.i[l].input.detachEvent("onkeyup", e._doOnInpKeyUp)
                }
            }
        }
    };
    for (var h in this.i) {
        this._attachEventsToObject(h)
    }
    this.evs = {};
    this.attachEvent = function (a, m) {
        var l = this.uid();
        this.evs[l] = {
            name: String(a).toLowerCase(),
            func: m
        };
        return l
    };
    this.detachEvent = function (a) {
        if (this.evs[a]) {
            this.evs[a].name = null;
            this.evs[a].func = null;
            this.evs[a] = null;
            delete this.evs[a]
        }
    };
    this.callEvent = function (o, q) {
        var m = true;
        var s = String(o).toLowerCase();
        q = (q || []);
        for (var l in this.evs) {
            if (this.evs[l].name == s) {
                var p = this.evs[l].func.apply(this, q);
                m = (m && p)
            }
        }
        return m
    };
    this.checkEvent = function (o) {
        var m = false;
        var p = String(o).toLowerCase();
        for (var l in this.evs) {
            m = (m || this.evs[l].name == p)
        }
        return m
    };
    this.unload = function () {
        this._activeDate = null;
        this._activeDateCell = null;
        this._activeInp = null;
        this._activeMonth = null;
        this._dateFormat = null;
        this._dateFormatRE = null;
        this._lastHover = null;
        this.uid = null;
        this.uidd = null;
        if (this._tmListener) {
            window.clearTimeout(this._tmListener)
        }
        this._tmListener = null;
        if (window.addEventListener) {
            document.body.removeEventListener("click", e._doOnClick, false);
            window.removeEventListener("keydown", e._doOnKeyDown, false);
            window.removeEventListener("unload", e._doOnUnload, false)
        } else {
            document.body.detachEvent("onclick", e._doOnClick);
            document.body.detachEvent("onkeydown", e._doOnKeyDown);
            window.detachEvent("onunload", e._doOnKeyDown)
        }
        this._doOnClick = null;
        this._doOnKeyDown = null;
        this._doOnUnload = null;
        for (var l in this.i) {
            this.i[l]._dhtmlxcalendar_uid = null;
            this._detachEventsFromObject(l);
            this.disableListener(this.i[l].input);
            this.i[l] = null;
            delete this.i[l]
        }
        this.i = null;
        this._doOnInpClick = null;
        this._doOnInpKeyUp = null;
        for (var l in this.evs) {
            this.detachEvent(l)
        }
        this.evs = null;
        this.attachEvent = null;
        this.detachEvent = null;
        this.checkEvent = null;
        this.callEvent = null;
        this.contMonth.onselectstart = null;
        this.contMonth.firstChild.firstChild.onclick = null;
        this.contMonth.firstChild.firstChild.firstChild.onmouseover = null;
        this.contMonth.firstChild.firstChild.firstChild.onmouseout = null;
        this.contMonth.firstChild.firstChild.lastChild.onmouseover = null;
        this.contMonth.firstChild.firstChild.lastChild.onmouseout = null;
        while (this.contMonth.firstChild.firstChild.childNodes.length > 0) {
            this.contMonth.firstChild.firstChild.removeChild(this.contMonth.firstChild.firstChild.lastChild)
        }
        this.contMonth.firstChild.removeChild(this.contMonth.firstChild.firstChild);
        this.contMonth.removeChild(this.contMonth.firstChild);
        this.contMonth.parentNode.removeChild(this.contMonth);
        this.contMonth = null;
        while (this.contDays.firstChild.childNodes.length > 0) {
            this.contDays.firstChild.removeChild(this.contDays.firstChild.lastChild)
        }
        this.contDays.removeChild(this.contDays.firstChild);
        this.contDays.parentNode.removeChild(this.contDays);
        this.contDays = null;
        this.contDates.onclick = null;
        this.contDates.onmouseover = null;
        this.contDates.onmouseout = null;
        while (this.contDates.childNodes.length > 0) {
            while (this.contDates.lastChild.childNodes.length > 0) {
                this.contDates.lastChild.lastChild._css_date = null;
                this.contDates.lastChild.lastChild._css_month = null;
                this.contDates.lastChild.lastChild._css_weekend = null;
                this.contDates.lastChild.lastChild._css_hover = null;
                this.contDates.lastChild.lastChild._date = null;
                this.contDates.lastChild.lastChild._q = null;
                this.contDates.lastChild.lastChild._w = null;
                this.contDates.lastChild.removeChild(this.contDates.lastChild.lastChild)
            }
            this.contDates.removeChild(this.contDates.lastChild)
        }
        this.contDates.parentNode.removeChild(this.contDates);
        this.contDates = null;
        this.contTime.firstChild.firstChild.onclick = null;
        while (this.contTime.firstChild.firstChild.childNodes.length > 0) {
            this.contTime.firstChild.firstChild.removeChild(this.contTime.firstChild.firstChild.lastChild)
        }
        this.contTime.firstChild.removeChild(this.contTime.firstChild.firstChild);
        this.contTime.removeChild(this.contTime.firstChild);
        this.contTime.parentNode.removeChild(this.contTime);
        this.contTime = null;
        this._lastHover = null;
        if (this.msCont) {
            this.msCont.onclick = null;
            this._msActive = null;
            for (var l in this._msCells) {
                this._msCells[l]._cell = null;
                this._msCells[l]._month = null;
                this._msCells[l].parentNode.removeChild(this._msCells[l]);
                this._msCells[l] = null
            }
            this._msCells = null;
            while (this.msCont.childNodes.length > 0) {
                this.msCont.removeChild(this.msCont.lastChild)
            }
            this.msCont.parentNode.removeChild(this.msCont);
            this.msCont = null
        }
        if (this.ysCont) {
            this.ysCont.onclick = null;
            for (var l in this._ysCells) {
                this._ysCells[l]._cell = null;
                this._ysCells[l]._year = null;
                this._ysCells[l].parentNode.removeChild(this._ysCells[l]);
                this._ysCells[l] = null
            }
            this._ysCells = null;
            while (this.ysCont.childNodes.length > 0) {
                this.ysCont.removeChild(this.ysCont.lastChild)
            }
            this.ysCont.parentNode.removeChild(this.ysCont);
            this.ysCont = null
        }
        if (this.hsCont) {
            this.hsCont.onclick = null;
            this._hsActive = null;
            for (var l in this._hsCells) {
                this._hsCells[l]._cell = null;
                this._hsCells[l]._hours = null;
                this._hsCells[l].parentNode.removeChild(this._hsCells[l]);
                this._hsCells[l] = null
            }
            this._hsCells = null;
            while (this.hsCont.childNodes.length > 0) {
                this.hsCont.removeChild(this.hsCont.lastChild)
            }
            this.hsCont.parentNode.removeChild(this.hsCont);
            this.hsCont = null
        }
        if (this.rsCont) {
            this.rsCont.onclick = null;
            this._rsActive = null;
            for (var l in this._rsCells) {
                this._rsCells[l]._cell = null;
                this._rsCells[l]._minutes = null;
                this._rsCells[l].parentNode.removeChild(this._rsCells[l]);
                this._rsCells[l] = null
            }
            this._rsCells = null;
            while (this.rsCont.childNodes.length > 0) {
                this.rsCont.removeChild(this.rsCont.lastChild)
            }
            this.rsCont.parentNode.removeChild(this.rsCont);
            this.rsCont = null
        }
        if (this._selCover) {
            this._selCover.parentNode.removeChild(this._selCover);
            this._selCover = null
        }
        if (this._sel) {
            for (var l in this._sel._ta) {
                this._sel._ta[l] = null
            }
            this._sel._ta = null;
            this._sel._t = null;
            this._sel.onmouseover = null;
            this._sel.onmouseout = null;
            while (this._sel.firstChild.firstChild.firstChild.childNodes.length > 0) {
                this._sel.firstChild.firstChild.firstChild.lastChild.onclick = null;
                this._sel.firstChild.firstChild.firstChild.lastChild.onmouseover = null;
                this._sel.firstChild.firstChild.firstChild.lastChild.onmouseout = null;
                this._sel.firstChild.firstChild.firstChild.removeChild(this._sel.firstChild.firstChild.firstChild.lastChild)
            }
            this._sel.firstChild.firstChild.removeChild(this._sel.firstChild.firstChild.firstChild);
            this._sel.firstChild.removeChild(this._sel.firstChild.firstChild);
            while (this._sel.childNodes.length > 0) {
                this._sel.removeChild(this._sel.lastChild)
            }
            this._sel.parentNode.removeChild(this._sel);
            this._sel = null
        }
        this.base.onclick = null;
        this.base.onmouseout = null;
        this.base.parentNode.removeChild(this.base);
        this.base = null;
        this._clearDayHover = null;
        this._clearSelHover = null;
        this._doOnSelectorChange = null;
        this._doOnSelectorShow = null;
        this._drawMonth = null;
        this._fixLength = null;
        this._getLeft = null;
        this._getTop = null;
        this._ifrSize = null;
        this._hide = null;
        this._hideSelector = null;
        this._initSelector = null;
        this._isSelectorVisible = null;
        this._isVisible = null;
        this._posGetOffset = null;
        this._posGetOffsetRect = null;
        this._posGetOffsetSum = null;
        this._scrollYears = null;
        this._show = null;
        this._showSelector = null;
        this._strToDate = null;
        this._updateActiveHours = null;
        this._updateActiveMinutes = null;
        this._updateActiveMonth = null;
        this._updateActiveYear = null;
        this._updateCellStyle = null;
        this._updateDateStr = null;
        this._updateVisibleHours = null;
        this._updateVisibleMinutes = null;
        this._updateYearsList = null;
        this.enableIframe = null;
        this.hide = null;
        this.hideTime = null;
        this.setDate = null;
        this.setDateFormat = null;
        this.setYearsRange = null;
        this.show = null;
        this.showTime = null;
        this.unload = null;
        for (var l in this) {
            delete this[l]
        }
        l = e = null
    };
    this.setDate(this._activeDate);
    return this
}
dhtmlXCalendarObject.prototype.setYearsRange = function () { };
dhtmlXCalendarObject.prototype.lang = "en";
dhtmlXCalendarObject.prototype.langData = {
    en: {
        dateformat: "%Y-%m-%d",
        monthesFNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthesSNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        daysFNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        daysSNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekstart: 1
    }
};
dhtmlXCalendarObject.prototype.enableIframe = function (a) {
    if (a == true) {
        if (!this._ifr) {
            this._ifr = document.createElement("IFRAME");
            this._ifr.frameBorder = 0;
            this._ifr.border = 0;
            this._ifr.setAttribute("src", "javascript:false;");
            this._ifr.className = "dhtmlxcalendar_ifr";
            this._ifr.onload = function () {
                this.onload = null;
                this.contentWindow.document.open("text/html", "replace");
                this.contentWindow.document.write("<html><head><style>html,body{width:100%;height:100%;overflow:hidden;margin:0px;}</style></head><body</body></html>")
            };
            this.base.parentNode.insertBefore(this._ifr, this.base);
            this._ifrSize()
        }
    } else {
        if (this._ifr) {
            this._ifr.parentNode.removeChild(this._ifr);
            this._ifr = null
        }
    }
};
dhtmlXCalendarObject.prototype._ifrSize = function () {
    if (this._ifr) {
        this._ifr.style.left = this.base.style.left;
        this._ifr.style.top = this.base.style.top;
        this._ifr.style.width = this.base.offsetWidth + "px";
        this._ifr.style.height = this.base.offsetHeight + "px"
    }
};
dhtmlxCalendarObject = dhtmlXCalendarObject;