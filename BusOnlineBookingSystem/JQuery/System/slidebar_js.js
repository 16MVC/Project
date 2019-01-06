(function(da, ch) {
    var cx, cb, cn, cH, cJ, cS, cT, dg, cV, cB, co, cd, cZ, db, ca, cF, cD, c5 = "sizzle" + -(new Date()),
    cI = da.document,
    dd = {},
    de = 0,
    c0 = 0,
    b5 = cz(),
    c4 = cz(),
    cG = cz(),
    c9 = typeof ch,
    cN = 1 << 31,
    c7 = [],
    c8 = c7.pop,
    b4 = c7.push,
    cm = c7.slice,
    b9 = c7.indexOf ||
    function(di) {
        var dh = 0,
        e = this.length;
        for (; dh < e; dh++) {
            if (this[dh] === di) {
                return dh
            }
        }
        return - 1
    },
    cp = "[\\x20\\t\\r\\n\\f]",
    b3 = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
    cK = b3.replace("w", "w#"),
    ci = "([*^$|!~]?=)",
    c2 = "\\[" + cp + "*(" + b3 + ")" + cp + "*(?:" + ci + cp + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + cK + ")|)|)" + cp + "*\\]",
    ck = ":(" + b3 + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + c2.replace(3, 8) + ")*)|.*)\\)|)",
    cr = new RegExp("^" + cp + "+|((?:^|[^\\\\])(?:\\\\.)*)" + cp + "+$", "g"),
    cu = new RegExp("^" + cp + "*," + cp + "*"),
    cA = new RegExp("^" + cp + "*([\\x20\\t\\r\\n\\f>+~])" + cp + "*"),
    cP = new RegExp(ck),
    cQ = new RegExp("^" + cK + "$"),
    cY = {
        ID: new RegExp("^#(" + b3 + ")"),
        CLASS: new RegExp("^\\.(" + b3 + ")"),
        NAME: new RegExp("^\\[name=['\"]?(" + b3 + ")['\"]?\\]"),
        TAG: new RegExp("^(" + b3.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + c2),
        PSEUDO: new RegExp("^" + ck),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + cp + "*(even|odd|(([+-]|)(\\d*)n|)" + cp + "*(?:([+-]|)" + cp + "*(\\d+)|))" + cp + "*\\)|)", "i"),
        needsContext: new RegExp("^" + cp + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + cp + "*((?:-\\d)?\\d*)" + cp + "*\\)|)(?=[^-]|$)", "i")
    },
    cW = /[\x20\t\r\n\f]*[+~]/,
    cM = /^[^{]+\{\s*\[native code/,
    cO = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
    b8 = /^(?:input|select|textarea|button)$/i,
    cl = /^h\d$/i,
    cL = /'|\\/g,
    ct = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
    cs = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
    c1 = function(e, di) {
        var dh = "0x" + di - 65536;
        return dh !== dh ? di: dh < 0 ? String.fromCharCode(dh + 65536) : String.fromCharCode(dh >> 10 | 55296, dh & 1023 | 56320)
    };
    try {
        cm.call(cI.documentElement.childNodes, 0)[0].nodeType
    } catch(cC) {
        cm = function(dh) {
            var di, e = [];
            while ((di = this[dh++])) {
                e.push(di)
            }
            return e
        }
    }
    function cE(e) {
        return cM.test(e + "")
    }
    function cz() {
        var e, dh = [];
        return (e = function(di, dj) {
            if (dh.push(di += " ") > cn.cacheLength) {
                delete e[dh.shift()]
            }
            return (e[di] = dj)
        })
    }
    function cj(e) {
        e[c5] = true;
        return e
    }
    function cc(dh) {
        var dj = cB.createElement("div");
        try {
            return dh(dj)
        } catch(di) {
            return false
        } finally {
            dj = null
        }
    }
    function cv(dp, dh, dt, dv) {
        var du, dl, dm, dr, ds, dk, dj, e, di, dq;
        if ((dh ? dh.ownerDocument || dh: cI) !== cB) {
            cV(dh)
        }
        dh = dh || cB;
        dt = dt || [];
        if (!dp || typeof dp !== "string") {
            return dt
        }
        if ((dr = dh.nodeType) !== 1 && dr !== 9) {
            return []
        }
        if (!cd && !dv) {
            if ((du = cO.exec(dp))) {
                if ((dm = du[1])) {
                    if (dr === 9) {
                        dl = dh.getElementById(dm);
                        if (dl && dl.parentNode) {
                            if (dl.id === dm) {
                                dt.push(dl);
                                return dt
                            }
                        } else {
                            return dt
                        }
                    } else {
                        if (dh.ownerDocument && (dl = dh.ownerDocument.getElementById(dm)) && cF(dh, dl) && dl.id === dm) {
                            dt.push(dl);
                            return dt
                        }
                    }
                } else {
                    if (du[2]) {
                        b4.apply(dt, cm.call(dh.getElementsByTagName(dp), 0));
                        return dt
                    } else {
                        if ((dm = du[3]) && dd.getByClassName && dh.getElementsByClassName) {
                            b4.apply(dt, cm.call(dh.getElementsByClassName(dm), 0));
                            return dt
                        }
                    }
                }
            }
            if (dd.qsa && !cZ.test(dp)) {
                dj = true;
                e = c5;
                di = dh;
                dq = dr === 9 && dp;
                if (dr === 1 && dh.nodeName.toLowerCase() !== "object") {
                    dk = cf(dp);
                    if ((dj = dh.getAttribute("id"))) {
                        e = dj.replace(cL, "\\$&")
                    } else {
                        dh.setAttribute("id", e)
                    }
                    e = "[id='" + e + "'] ";
                    ds = dk.length;
                    while (ds--) {
                        dk[ds] = e + cg(dk[ds])
                    }
                    di = cW.test(dp) && dh.parentNode || dh;
                    dq = dk.join(",")
                }
                if (dq) {
                    try {
                        b4.apply(dt, cm.call(di.querySelectorAll(dq), 0));
                        return dt
                    } catch(dn) {} finally {
                        if (!dj) {
                            dh.removeAttribute("id")
                        }
                    }
                }
            }
        }
        return dc(dp.replace(cr, "$1"), dh, dt, dv)
    }
    cJ = cv.isXML = function(e) {
        var dh = e && (e.ownerDocument || e).documentElement;
        return dh ? dh.nodeName !== "HTML": false
    };
    cV = cv.setDocument = function(e) {
        var dh = e ? e.ownerDocument || e: cI;
        if (dh === cB || dh.nodeType !== 9 || !dh.documentElement) {
            return cB
        }
        cB = dh;
        co = dh.documentElement;
        cd = cJ(dh);
        dd.tagNameNoComments = cc(function(di) {
            di.appendChild(dh.createComment(""));
            return ! di.getElementsByTagName("*").length
        });
        dd.attributes = cc(function(dj) {
            dj.innerHTML = "<select></select>";
            var di = typeof dj.lastChild.getAttribute("multiple");
            return di !== "boolean" && di !== "string"
        });
        dd.getByClassName = cc(function(di) {
            di.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
            if (!di.getElementsByClassName || !di.getElementsByClassName("e").length) {
                return false
            }
            di.lastChild.className = "e";
            return di.getElementsByClassName("e").length === 2
        });
        dd.getByName = cc(function(dj) {
            dj.id = c5 + 0;
            dj.innerHTML = "<a name='" + c5 + "'></a><div name='" + c5 + "'></div>";
            co.insertBefore(dj, co.firstChild);
            var di = dh.getElementsByName && dh.getElementsByName(c5).length === 2 + dh.getElementsByName(c5 + 0).length;
            dd.getIdNotName = !dh.getElementById(c5);
            co.removeChild(dj);
            return di
        });
        cn.attrHandle = cc(function(di) {
            di.innerHTML = "<a href='#'></a>";
            return di.firstChild && typeof di.firstChild.getAttribute !== c9 && di.firstChild.getAttribute("href") === "#"
        }) ? {}: {
            href: function(di) {
                return di.getAttribute("href", 2)
            },
            type: function(di) {
                return di.getAttribute("type")
            }
        };
        if (dd.getIdNotName) {
            cn.find.ID = function(dk, dj) {
                if (typeof dj.getElementById !== c9 && !cd) {
                    var di = dj.getElementById(dk);
                    return di && di.parentNode ? [di] : []
                }
            };
            cn.filter.ID = function(dj) {
                var di = dj.replace(cs, c1);
                return function(dk) {
                    return dk.getAttribute("id") === di
                }
            }
        } else {
            cn.find.ID = function(dk, dj) {
                if (typeof dj.getElementById !== c9 && !cd) {
                    var di = dj.getElementById(dk);
                    return di ? di.id === dk || typeof di.getAttributeNode !== c9 && di.getAttributeNode("id").value === dk ? [di] : ch: []
                }
            };
            cn.filter.ID = function(dj) {
                var di = dj.replace(cs, c1);
                return function(dl) {
                    var dk = typeof dl.getAttributeNode !== c9 && dl.getAttributeNode("id");
                    return dk && dk.value === di
                }
            }
        }
        cn.find.TAG = dd.tagNameNoComments ?
        function(di, dj) {
            if (typeof dj.getElementsByTagName !== c9) {
                return dj.getElementsByTagName(di)
            }
        }: function(di, dm) {
            var dn, dl = [],
            dk = 0,
            dj = dm.getElementsByTagName(di);
            if (di === "*") {
                while ((dn = dj[dk++])) {
                    if (dn.nodeType === 1) {
                        dl.push(dn)
                    }
                }
                return dl
            }
            return dj
        };
        cn.find.NAME = dd.getByName &&
        function(di, dj) {
            if (typeof dj.getElementsByName !== c9) {
                return dj.getElementsByName(name)
            }
        };
        cn.find.CLASS = dd.getByClassName &&
        function(dj, di) {
            if (typeof di.getElementsByClassName !== c9 && !cd) {
                return di.getElementsByClassName(dj)
            }
        };
        db = [];
        cZ = [":focus"];
        if ((dd.qsa = cE(dh.querySelectorAll))) {
            cc(function(di) {
                di.innerHTML = "<select><option selected=''></option></select>";
                if (!di.querySelectorAll("[selected]").length) {
                    cZ.push("\\[" + cp + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
                }
                if (!di.querySelectorAll(":checked").length) {
                    cZ.push(":checked")
                }
            });
            cc(function(di) {
                di.innerHTML = "<input type='hidden' i=''/>";
                if (di.querySelectorAll("[i^='']").length) {
                    cZ.push("[*^$]=" + cp + "*(?:\"\"|'')")
                }
                if (!di.querySelectorAll(":enabled").length) {
                    cZ.push(":enabled", ":disabled")
                }
                di.querySelectorAll("*,:x");
                cZ.push(",.*:")
            })
        }
        if ((dd.matchesSelector = cE((ca = co.matchesSelector || co.mozMatchesSelector || co.webkitMatchesSelector || co.oMatchesSelector || co.msMatchesSelector)))) {
            cc(function(di) {
                dd.disconnectedMatch = ca.call(di, "div");
                ca.call(di, "[s!='']:x");
                db.push("!=", ck)
            })
        }
        cZ = new RegExp(cZ.join("|"));
        db = new RegExp(db.join("|"));
        cF = cE(co.contains) || co.compareDocumentPosition ?
        function(dj, di) {
            var dl = dj.nodeType === 9 ? dj.documentElement: dj,
            dk = di && di.parentNode;
            return dj === dk || !!(dk && dk.nodeType === 1 && (dl.contains ? dl.contains(dk) : dj.compareDocumentPosition && dj.compareDocumentPosition(dk) & 16))
        }: function(dj, di) {
            if (di) {
                while ((di = di.parentNode)) {
                    if (di === dj) {
                        return true
                    }
                }
            }
            return false
        };
        cD = co.compareDocumentPosition ?
        function(dj, di) {
            var dk;
            if (dj === di) {
                cT = true;
                return 0
            }
            if ((dk = di.compareDocumentPosition && dj.compareDocumentPosition && dj.compareDocumentPosition(di))) {
                if (dk & 1 || dj.parentNode && dj.parentNode.nodeType === 11) {
                    if (dj === dh || cF(cI, dj)) {
                        return - 1
                    }
                    if (di === dh || cF(cI, di)) {
                        return 1
                    }
                    return 0
                }
                return dk & 4 ? -1 : 1
            }
            return dj.compareDocumentPosition ? -1 : 1
        }: function(dj, di) {
            var dq, dm = 0,
            dp = dj.parentNode,
            dl = di.parentNode,
            dk = [dj],
            dn = [di];
            if (dj === di) {
                cT = true;
                return 0
            } else {
                if (!dp || !dl) {
                    return dj === dh ? -1 : di === dh ? 1 : dp ? -1 : dl ? 1 : 0
                } else {
                    if (dp === dl) {
                        return b6(dj, di)
                    }
                }
            }
            dq = dj;
            while ((dq = dq.parentNode)) {
                dk.unshift(dq)
            }
            dq = di;
            while ((dq = dq.parentNode)) {
                dn.unshift(dq)
            }
            while (dk[dm] === dn[dm]) {
                dm++
            }
            return dm ? b6(dk[dm], dn[dm]) : dk[dm] === cI ? -1 : dn[dm] === cI ? 1 : 0
        };
        cT = false; [0, 0].sort(cD);
        dd.detectDuplicates = cT;
        return cB
    };
    cv.matches = function(dh, e) {
        return cv(dh, null, null, e)
    };
    cv.matchesSelector = function(di, dk) {
        if ((di.ownerDocument || di) !== cB) {
            cV(di)
        }
        dk = dk.replace(ct, "='$1']");
        if (dd.matchesSelector && !cd && (!db || !db.test(dk)) && !cZ.test(dk)) {
            try {
                var dh = ca.call(di, dk);
                if (dh || dd.disconnectedMatch || di.document && di.document.nodeType !== 11) {
                    return dh
                }
            } catch(dj) {}
        }
        return cv(dk, cB, null, [di]).length > 0
    };
    cv.contains = function(e, dh) {
        if ((e.ownerDocument || e) !== cB) {
            cV(e)
        }
        return cF(e, dh)
    };
    cv.attr = function(dh, e) {
        var di;
        if ((dh.ownerDocument || dh) !== cB) {
            cV(dh)
        }
        if (!cd) {
            e = e.toLowerCase()
        }
        if ((di = cn.attrHandle[e])) {
            return di(dh)
        }
        if (cd || dd.attributes) {
            return dh.getAttribute(e)
        }
        return ((di = dh.getAttributeNode(e)) || dh.getAttribute(e)) && dh[e] === true ? e: di && di.specified ? di.value: null
    };
    cv.error = function(e) {
        throw new Error("Syntax error, unrecognized expression: " + e)
    };
    cv.uniqueSort = function(di) {
        var dj, dk = [],
        dh = 1,
        e = 0;
        cT = !dd.detectDuplicates;
        di.sort(cD);
        if (cT) {
            for (; (dj = di[dh]); dh++) {
                if (dj === di[dh - 1]) {
                    e = dk.push(dh)
                }
            }
            while (e--) {
                di.splice(dk[e], 1)
            }
        }
        return di
    };
    function b6(dh, e) {
        var dj = e && dh,
        di = dj && (~e.sourceIndex || cN) - (~dh.sourceIndex || cN);
        if (di) {
            return di
        }
        if (dj) {
            while ((dj = dj.nextSibling)) {
                if (dj === e) {
                    return - 1
                }
            }
        }
        return dh ? 1 : -1
    }
    function cw(e) {
        return function(di) {
            var dh = di.nodeName.toLowerCase();
            return dh === "input" && di.type === e
        }
    }
    function b7(e) {
        return function(di) {
            var dh = di.nodeName.toLowerCase();
            return (dh === "input" || dh === "button") && di.type === e
        }
    }
    function c3(e) {
        return cj(function(dh) {
            dh = +dh;
            return cj(function(di, dm) {
                var dk, dj = e([], di.length, dh),
                dl = dj.length;
                while (dl--) {
                    if (di[(dk = dj[dl])]) {
                        di[dk] = !(dm[dk] = di[dk])
                    }
                }
            })
        })
    }
    cH = cv.getText = function(dk) {
        var dj, dh = "",
        di = 0,
        e = dk.nodeType;
        if (!e) {
            for (; (dj = dk[di]); di++) {
                dh += cH(dj)
            }
        } else {
            if (e === 1 || e === 9 || e === 11) {
                if (typeof dk.textContent === "string") {
                    return dk.textContent
                } else {
                    for (dk = dk.firstChild; dk; dk = dk.nextSibling) {
                        dh += cH(dk)
                    }
                }
            } else {
                if (e === 3 || e === 4) {
                    return dk.nodeValue
                }
            }
        }
        return dh
    };
    cn = cv.selectors = {
        cacheLength: 50,
        createPseudo: cj,
        match: cY,
        find: {},
        relative: {
            ">": {
                dir: "parentNode",
                first: true
            },
            " ": {
                dir: "parentNode"
            },
            "+": {
                dir: "previousSibling",
                first: true
            },
            "~": {
                dir: "previousSibling"
            }
        },
        preFilter: {
            ATTR: function(e) {
                e[1] = e[1].replace(cs, c1);
                e[3] = (e[4] || e[5] || "").replace(cs, c1);
                if (e[2] === "~=") {
                    e[3] = " " + e[3] + " "
                }
                return e.slice(0, 4)
            },
            CHILD: function(e) {
                e[1] = e[1].toLowerCase();
                if (e[1].slice(0, 3) === "nth") {
                    if (!e[3]) {
                        cv.error(e[0])
                    }
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd"));
                    e[5] = +((e[7] + e[8]) || e[3] === "odd")
                } else {
                    if (e[3]) {
                        cv.error(e[0])
                    }
                }
                return e
            },
            PSEUDO: function(dh) {
                var e, di = !dh[5] && dh[2];
                if (cY.CHILD.test(dh[0])) {
                    return null
                }
                if (dh[4]) {
                    dh[2] = dh[4]
                } else {
                    if (di && cP.test(di) && (e = cf(di, true)) && (e = di.indexOf(")", di.length - e) - di.length)) {
                        dh[0] = dh[0].slice(0, e);
                        dh[2] = di.slice(0, e)
                    }
                }
                return dh.slice(0, 3)
            }
        },
        filter: {
            TAG: function(e) {
                if (e === "*") {
                    return function() {
                        return true
                    }
                }
                e = e.replace(cs, c1).toLowerCase();
                return function(dh) {
                    return dh.nodeName && dh.nodeName.toLowerCase() === e
                }
            },
            CLASS: function(e) {
                var dh = b5[e + " "];
                return dh || (dh = new RegExp("(^|" + cp + ")" + e + "(" + cp + "|$)")) && b5(e,
                function(di) {
                    return dh.test(di.className || (typeof di.getAttribute !== c9 && di.getAttribute("class")) || "")
                })
            },
            ATTR: function(di, dh, e) {
                return function(dk) {
                    var dj = cv.attr(dk, di);
                    if (dj == null) {
                        return dh === "!="
                    }
                    if (!dh) {
                        return true
                    }
                    dj += "";
                    return dh === "=" ? dj === e: dh === "!=" ? dj !== e: dh === "^=" ? e && dj.indexOf(e) === 0 : dh === "*=" ? e && dj.indexOf(e) > -1 : dh === "$=" ? e && dj.slice( - e.length) === e: dh === "~=" ? (" " + dj + " ").indexOf(e) > -1 : dh === "|=" ? dj === e || dj.slice(0, e.length + 1) === e + "-": false
                }
            },
            CHILD: function(dh, dk, dj, dl, di) {
                var dn = dh.slice(0, 3) !== "nth",
                e = dh.slice( - 4) !== "last",
                dm = dk === "of-type";
                return dl === 1 && di === 0 ?
                function(dp) {
                    return !! dp.parentNode
                }: function(dv, dt, dy) {
                    var dp, dB, dw, dA, dx, ds, du = dn !== e ? "nextSibling": "previousSibling",
                    dz = dv.parentNode,
                    dr = dm && dv.nodeName.toLowerCase(),
                    dq = !dy && !dm;
                    if (dz) {
                        if (dn) {
                            while (du) {
                                dw = dv;
                                while ((dw = dw[du])) {
                                    if (dm ? dw.nodeName.toLowerCase() === dr: dw.nodeType === 1) {
                                        return false
                                    }
                                }
                                ds = du = dh === "only" && !ds && "nextSibling"
                            }
                            return true
                        }
                        ds = [e ? dz.firstChild: dz.lastChild];
                        if (e && dq) {
                            dB = dz[c5] || (dz[c5] = {});
                            dp = dB[dh] || [];
                            dx = dp[0] === de && dp[1];
                            dA = dp[0] === de && dp[2];
                            dw = dx && dz.childNodes[dx];
                            while ((dw = ++dx && dw && dw[du] || (dA = dx = 0) || ds.pop())) {
                                if (dw.nodeType === 1 && ++dA && dw === dv) {
                                    dB[dh] = [de, dx, dA];
                                    break
                                }
                            }
                        } else {
                            if (dq && (dp = (dv[c5] || (dv[c5] = {}))[dh]) && dp[0] === de) {
                                dA = dp[1]
                            } else {
                                while ((dw = ++dx && dw && dw[du] || (dA = dx = 0) || ds.pop())) {
                                    if ((dm ? dw.nodeName.toLowerCase() === dr: dw.nodeType === 1) && ++dA) {
                                        if (dq) { (dw[c5] || (dw[c5] = {}))[dh] = [de, dA]
                                        }
                                        if (dw === dv) {
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        dA -= di;
                        return dA === dl || (dA % dl === 0 && dA / dl >= 0)
                    }
                }
            },
            PSEUDO: function(dj, di) {
                var e, dh = cn.pseudos[dj] || cn.setFilters[dj.toLowerCase()] || cv.error("unsupported pseudo: " + dj);
                if (dh[c5]) {
                    return dh(di)
                }
                if (dh.length > 1) {
                    e = [dj, dj, "", di];
                    return cn.setFilters.hasOwnProperty(dj.toLowerCase()) ? cj(function(dm, dp) {
                        var dl, dk = dh(dm, di),
                        dn = dk.length;
                        while (dn--) {
                            dl = b9.call(dm, dk[dn]);
                            dm[dl] = !(dp[dl] = dk[dn])
                        }
                    }) : function(dk) {
                        return dh(dk, 0, e)
                    }
                }
                return dh
            }
        },
        pseudos: {
            not: cj(function(e) {
                var dh = [],
                di = [],
                dj = cS(e.replace(cr, "$1"));
                return dj[c5] ? cj(function(dl, dr, dp, dm) {
                    var dq, dk = dj(dl, null, dm, []),
                    dn = dl.length;
                    while (dn--) {
                        if ((dq = dk[dn])) {
                            dl[dn] = !(dr[dn] = dq)
                        }
                    }
                }) : function(dm, dl, dk) {
                    dh[0] = dm;
                    dj(dh, null, dk, di);
                    return ! di.pop()
                }
            }),
            has: cj(function(e) {
                return function(dh) {
                    return cv(e, dh).length > 0
                }
            }),
            contains: cj(function(e) {
                return function(dh) {
                    return (dh.textContent || dh.innerText || cH(dh)).indexOf(e) > -1
                }
            }),
            lang: cj(function(e) {
                if (!cQ.test(e || "")) {
                    cv.error("unsupported lang: " + e)
                }
                e = e.replace(cs, c1).toLowerCase();
                return function(di) {
                    var dh;
                    do {
                        if ((dh = cd ? di.getAttribute("xml:lang") || di.getAttribute("lang") : di.lang)) {
                            dh = dh.toLowerCase();
                            return dh === e || dh.indexOf(e + "-") === 0
                        }
                    } while (( di = di . parentNode ) && di.nodeType === 1);
                    return false
                }
            }),
            target: function(e) {
                var dh = da.location && da.location.hash;
                return dh && dh.slice(1) === e.id
            },
            root: function(e) {
                return e === co
            },
            focus: function(e) {
                return e === cB.activeElement && (!cB.hasFocus || cB.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
            },
            enabled: function(e) {
                return e.disabled === false
            },
            disabled: function(e) {
                return e.disabled === true
            },
            checked: function(e) {
                var dh = e.nodeName.toLowerCase();
                return (dh === "input" && !!e.checked) || (dh === "option" && !!e.selected)
            },
            selected: function(e) {
                if (e.parentNode) {
                    e.parentNode.selectedIndex
                }
                return e.selected === true
            },
            empty: function(e) {
                for (e = e.firstChild; e; e = e.nextSibling) {
                    if (e.nodeName > "@" || e.nodeType === 3 || e.nodeType === 4) {
                        return false
                    }
                }
                return true
            },
            parent: function(e) {
                return ! cn.pseudos.empty(e)
            },
            header: function(e) {
                return cl.test(e.nodeName)
            },
            input: function(e) {
                return b8.test(e.nodeName)
            },
            button: function(dh) {
                var e = dh.nodeName.toLowerCase();
                return e === "input" && dh.type === "button" || e === "button"
            },
            text: function(dh) {
                var e;
                return dh.nodeName.toLowerCase() === "input" && dh.type === "text" && ((e = dh.getAttribute("type")) == null || e.toLowerCase() === dh.type)
            },
            first: c3(function() {
                return [0]
            }),
            last: c3(function(e, dh) {
                return [dh - 1]
            }),
            eq: c3(function(e, di, dh) {
                return [dh < 0 ? dh + di: dh]
            }),
            even: c3(function(e, di) {
                var dh = 0;
                for (; dh < di; dh += 2) {
                    e.push(dh)
                }
                return e
            }),
            odd: c3(function(e, di) {
                var dh = 1;
                for (; dh < di; dh += 2) {
                    e.push(dh)
                }
                return e
            }),
            lt: c3(function(e, dj, di) {
                var dh = di < 0 ? di + dj: di;
                for (; --dh >= 0;) {
                    e.push(dh)
                }
                return e
            }),
            gt: c3(function(e, dj, di) {
                var dh = di < 0 ? di + dj: di;
                for (; ++dh < dj;) {
                    e.push(dh)
                }
                return e
            })
        }
    };
    for (cx in {
        radio: true,
        checkbox: true,
        file: true,
        password: true,
        image: true
    }) {
        cn.pseudos[cx] = cw(cx)
    }
    for (cx in {
        submit: true,
        reset: true
    }) {
        cn.pseudos[cx] = b7(cx)
    }
    function cf(dk, dq) {
        var dh, dl, dn, dp, dm, di, e, dj = c4[dk + " "];
        if (dj) {
            return dq ? 0 : dj.slice(0)
        }
        dm = dk;
        di = [];
        e = cn.preFilter;
        while (dm) {
            if (!dh || (dl = cu.exec(dm))) {
                if (dl) {
                    dm = dm.slice(dl[0].length) || dm
                }
                di.push(dn = [])
            }
            dh = false;
            if ((dl = cA.exec(dm))) {
                dh = dl.shift();
                dn.push({
                    value: dh,
                    type: dl[0].replace(cr, " ")
                });
                dm = dm.slice(dh.length)
            }
            for (dp in cn.filter) {
                if ((dl = cY[dp].exec(dm)) && (!e[dp] || (dl = e[dp](dl)))) {
                    dh = dl.shift();
                    dn.push({
                        value: dh,
                        type: dp,
                        matches: dl
                    });
                    dm = dm.slice(dh.length)
                }
            }
            if (!dh) {
                break
            }
        }
        return dq ? dm.length: dm ? cv.error(dk) : c4(dk, di).slice(0)
    }
    function cg(dj) {
        var di = 0,
        dh = dj.length,
        e = "";
        for (; di < dh; di++) {
            e += dj[di].value
        }
        return e
    }
    function cq(dk, di, dj) {
        var e = di.dir,
        dl = dj && e === "parentNode",
        dh = c0++;
        return di.first ?
        function(dp, dn, dm) {
            while ((dp = dp[e])) {
                if (dp.nodeType === 1 || dl) {
                    return dk(dp, dn, dm)
                }
            }
        }: function(dr, dp, dn) {
            var dt, dm, dq, ds = de + " " + dh;
            if (dn) {
                while ((dr = dr[e])) {
                    if (dr.nodeType === 1 || dl) {
                        if (dk(dr, dp, dn)) {
                            return true
                        }
                    }
                }
            } else {
                while ((dr = dr[e])) {
                    if (dr.nodeType === 1 || dl) {
                        dq = dr[c5] || (dr[c5] = {});
                        if ((dm = dq[e]) && dm[0] === ds) {
                            if ((dt = dm[1]) === true || dt === cb) {
                                return dt === true
                            }
                        } else {
                            dm = dq[e] = [ds];
                            dm[1] = dk(dr, dp, dn) || cb;
                            if (dm[1] === true) {
                                return true
                            }
                        }
                    }
                }
            }
        }
    }
    function df(e) {
        return e.length > 1 ?
        function(dk, dj, dh) {
            var di = e.length;
            while (di--) {
                if (!e[di](dk, dj, dh)) {
                    return false
                }
            }
            return true
        }: e[0]
    }
    function cX(e, dh, di, dj, dm) {
        var dk, dq = [],
        dl = 0,
        dn = e.length,
        dp = dh != null;
        for (; dl < dn; dl++) {
            if ((dk = e[dl])) {
                if (!di || di(dk, dj, dm)) {
                    dq.push(dk);
                    if (dp) {
                        dh.push(dl)
                    }
                }
            }
        }
        return dq
    }
    function ce(di, dh, dk, dj, dl, e) {
        if (dj && !dj[c5]) {
            dj = ce(dj)
        }
        if (dl && !dl[c5]) {
            dl = ce(dl, e)
        }
        return cj(function(dx, du, dp, dw) {
            var dz, dv, dr, dq = [],
            dy = [],
            dn = du.length,
            dm = dx || cy(dh || "*", dp.nodeType ? [dp] : dp, []),
            ds = di && (dx || !dh) ? cX(dm, dq, di, dp, dw) : dm,
            dt = dk ? dl || (dx ? di: dn || dj) ? [] : du: ds;
            if (dk) {
                dk(ds, dt, dp, dw)
            }
            if (dj) {
                dz = cX(dt, dy);
                dj(dz, [], dp, dw);
                dv = dz.length;
                while (dv--) {
                    if ((dr = dz[dv])) {
                        dt[dy[dv]] = !(ds[dy[dv]] = dr)
                    }
                }
            }
            if (dx) {
                if (dl || di) {
                    if (dl) {
                        dz = [];
                        dv = dt.length;
                        while (dv--) {
                            if ((dr = dt[dv])) {
                                dz.push((ds[dv] = dr))
                            }
                        }
                        dl(null, (dt = []), dz, dw)
                    }
                    dv = dt.length;
                    while (dv--) {
                        if ((dr = dt[dv]) && (dz = dl ? b9.call(dx, dr) : dq[dv]) > -1) {
                            dx[dz] = !(du[dz] = dr)
                        }
                    }
                }
            } else {
                dt = cX(dt === du ? dt.splice(dn, dt.length) : dt);
                if (dl) {
                    dl(null, du, dt, dw)
                } else {
                    b4.apply(du, dt)
                }
            }
        })
    }
    function c6(dm) {
        var dh, dk, di, dl = dm.length,
        dq = cn.relative[dm[0].type],
        dr = dq || cn.relative[" "],
        dj = dq ? 1 : 0,
        dn = cq(function(ds) {
            return ds === dh
        },
        dr, true),
        dp = cq(function(ds) {
            return b9.call(dh, ds) > -1
        },
        dr, true),
        e = [function(du, dt, ds) {
            return (!dq && (ds || dt !== dg)) || ((dh = dt).nodeType ? dn(du, dt, ds) : dp(du, dt, ds))
        }];
        for (; dj < dl; dj++) {
            if ((dk = cn.relative[dm[dj].type])) {
                e = [cq(df(e), dk)]
            } else {
                dk = cn.filter[dm[dj].type].apply(null, dm[dj].matches);
                if (dk[c5]) {
                    di = ++dj;
                    for (; di < dl; di++) {
                        if (cn.relative[dm[di].type]) {
                            break
                        }
                    }
                    return ce(dj > 1 && df(e), dj > 1 && cg(dm.slice(0, dj - 1)).replace(cr, "$1"), dk, dj < di && c6(dm.slice(dj, di)), di < dl && c6((dm = dm.slice(di))), di < dl && cg(dm))
                }
                e.push(dk)
            }
        }
        return df(e)
    }
    function cU(dj, di) {
        var dl = 0,
        e = di.length > 0,
        dk = dj.length > 0,
        dh = function(dw, dq, dv, du, dC) {
            var dr, ds, dx, dB = [],
            dA = 0,
            dt = "0",
            dm = dw && [],
            dy = dC != null,
            dz = dg,
            dp = dw || dk && cn.find.TAG("*", dC && dq.parentNode || dq),
            dn = (de += dz == null ? 1 : Math.random() || 0.1);
            if (dy) {
                dg = dq !== cB && dq;
                cb = dl
            }
            for (; (dr = dp[dt]) != null; dt++) {
                if (dk && dr) {
                    ds = 0;
                    while ((dx = dj[ds++])) {
                        if (dx(dr, dq, dv)) {
                            du.push(dr);
                            break
                        }
                    }
                    if (dy) {
                        de = dn;
                        cb = ++dl
                    }
                }
                if (e) {
                    if ((dr = !dx && dr)) {
                        dA--
                    }
                    if (dw) {
                        dm.push(dr)
                    }
                }
            }
            dA += dt;
            if (e && dt !== dA) {
                ds = 0;
                while ((dx = di[ds++])) {
                    dx(dm, dB, dq, dv)
                }
                if (dw) {
                    if (dA > 0) {
                        while (dt--) {
                            if (! (dm[dt] || dB[dt])) {
                                dB[dt] = c8.call(du)
                            }
                        }
                    }
                    dB = cX(dB)
                }
                b4.apply(du, dB);
                if (dy && !dw && dB.length > 0 && (dA + di.length) > 1) {
                    cv.uniqueSort(du)
                }
            }
            if (dy) {
                de = dn;
                dg = dz
            }
            return dm
        };
        return e ? cj(dh) : dh
    }
    cS = cv.compile = function(e, dl) {
        var di, dh = [],
        dk = [],
        dj = cG[e + " "];
        if (!dj) {
            if (!dl) {
                dl = cf(e)
            }
            di = dl.length;
            while (di--) {
                dj = c6(dl[di]);
                if (dj[c5]) {
                    dh.push(dj)
                } else {
                    dk.push(dj)
                }
            }
            dj = cG(e, cU(dk, dh))
        }
        return dj
    };
    function cy(dh, dk, dj) {
        var di = 0,
        e = dk.length;
        for (; di < e; di++) {
            cv(dh, dk[di], dj)
        }
        return dj
    }
    function dc(di, e, dj, dm) {
        var dk, dp, dh, dq, dn, dl = cf(di);
        if (!dm) {
            if (dl.length === 1) {
                dp = dl[0] = dl[0].slice(0);
                if (dp.length > 2 && (dh = dp[0]).type === "ID" && e.nodeType === 9 && !cd && cn.relative[dp[1].type]) {
                    e = cn.find.ID(dh.matches[0].replace(cs, c1), e)[0];
                    if (!e) {
                        return dj
                    }
                    di = di.slice(dp.shift().value.length)
                }
                dk = cY.needsContext.test(di) ? 0 : dp.length;
                while (dk--) {
                    dh = dp[dk];
                    if (cn.relative[(dq = dh.type)]) {
                        break
                    }
                    if ((dn = cn.find[dq])) {
                        if ((dm = dn(dh.matches[0].replace(cs, c1), cW.test(dp[0].type) && e.parentNode || e))) {
                            dp.splice(dk, 1);
                            di = dm.length && cg(dp);
                            if (!di) {
                                b4.apply(dj, cm.call(dm, 0));
                                return dj
                            }
                            break
                        }
                    }
                }
            }
        }
        cS(di, dl)(dm, e, cd, dj, cW.test(di));
        return dj
    }
    cn.pseudos.nth = cn.pseudos.eq;
    function cR() {}
    cn.filters = cR.prototype = cn.pseudos;
    cn.setFilters = new cR();
    cV();
    cv.attr = bJ.attr;
    bJ.find = cv;
    bJ.expr = cv.selectors;
    bJ.expr[":"] = bJ.expr.pseudos;
    bJ.unique = cv.uniqueSort;
    bJ.text = cv.getText;
    bJ.isXMLDoc = cv.isXML;
    bJ.contains = cv.contains
})(a2);
var aj = /Until$/,
bt = /^(?:parents|prev(?:Until|All))/,
an = /^.[^:#\[\.,]*$/,
y = bJ.expr.match.needsContext,
bx = {
    children: true,
    contents: true,
    next: true,
    prev: true
};
bJ.fn.extend({
    find: function(b3) {
        var b6, b5, b4, e = this.length;
        if (typeof b3 !== "string") {
            b4 = this;
            return this.pushStack(bJ(b3).filter(function() {
                for (b6 = 0; b6 < e; b6++) {
                    if (bJ.contains(b4[b6], this)) {
                        return true
                    }
                }
            }))
        }
        b5 = [];
        for (b6 = 0; b6 < e; b6++) {
            bJ.find(b3, this[b6], b5)
        }
        b5 = this.pushStack(e > 1 ? bJ.unique(b5) : b5);
        b5.selector = (this.selector ? this.selector + " ": "") + b3;
        return b5
    },
    has: function(b5) {
        var b4, b3 = bJ(b5, this),
        e = b3.length;
        return this.filter(function() {
            for (b4 = 0; b4 < e; b4++) {
                if (bJ.contains(this, b3[b4])) {
                    return true
                }
            }
        })
    },
    not: function(e) {
        return this.pushStack(aO(this, e, false))
    },
    filter: function(e) {
        return this.pushStack(aO(this, e, true))
    },
    is: function(e) {
        return !! e && (typeof e === "string" ? y.test(e) ? bJ(e, this.context).index(this[0]) >= 0 : bJ.filter(e, this).length > 0 : this.filter(e).length > 0)
    },
    closest: function(b6, b5) {
        var b7, b4 = 0,
        e = this.length,
        b3 = [],
        b8 = y.test(b6) || typeof b6 !== "string" ? bJ(b6, b5 || this.context) : 0;
        for (; b4 < e; b4++) {
            b7 = this[b4];
            while (b7 && b7.ownerDocument && b7 !== b5 && b7.nodeType !== 11) {
                if (b8 ? b8.index(b7) > -1 : bJ.find.matchesSelector(b7, b6)) {
                    b3.push(b7);
                    break
                }
                b7 = b7.parentNode
            }
        }
        return this.pushStack(b3.length > 1 ? bJ.unique(b3) : b3)
    },
    index: function(e) {
        if (!e) {
            return (this[0] && this[0].parentNode) ? this.first().prevAll().length: -1
        }
        if (typeof e === "string") {
            return bJ.inArray(this[0], bJ(e))
        }
        return bJ.inArray(e.jquery ? e[0] : e, this)
    },
    add: function(e, b3) {
        var b5 = typeof e === "string" ? bJ(e, b3) : bJ.makeArray(e && e.nodeType ? [e] : e),
        b4 = bJ.merge(this.get(), b5);
        return this.pushStack(bJ.unique(b4))
    },
    addBack: function(e) {
        return this.add(e == null ? this.prevObject: this.prevObject.filter(e))
    }
});
bJ.fn.andSelf = bJ.fn.addBack;
function aX(b3, e) {
    do {
        b3 = b3[e]
    } while ( b3 && b3 . nodeType !== 1 );
    return b3
}
bJ.each({
    parent: function(b3) {
        var e = b3.parentNode;
        return e && e.nodeType !== 11 ? e: null
    },
    parents: function(e) {
        return bJ.dir(e, "parentNode")
    },
    parentsUntil: function(b3, e, b4) {
        return bJ.dir(b3, "parentNode", b4)
    },
    next: function(e) {
        return aX(e, "nextSibling")
    },
    prev: function(e) {
        return aX(e, "previousSibling")
    },
    nextAll: function(e) {
        return bJ.dir(e, "nextSibling")
    },
    prevAll: function(e) {
        return bJ.dir(e, "previousSibling")
    },
    nextUntil: function(b3, e, b4) {
        return bJ.dir(b3, "nextSibling", b4)
    },
    prevUntil: function(b3, e, b4) {
        return bJ.dir(b3, "previousSibling", b4)
    },
    siblings: function(e) {
        return bJ.sibling((e.parentNode || {}).firstChild, e)
    },
    children: function(e) {
        return bJ.sibling(e.firstChild)
    },
    contents: function(e) {
        return bJ.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document: bJ.merge([], e.childNodes)
    }
},
function(e, b3) {
    bJ.fn[e] = function(b6, b4) {
        var b5 = bJ.map(this, b3, b6);
        if (!aj.test(e)) {
            b4 = b6
        }
        if (b4 && typeof b4 === "string") {
            b5 = bJ.filter(b4, b5)
        }
        b5 = this.length > 1 && !bx[e] ? bJ.unique(b5) : b5;
        if (this.length > 1 && bt.test(e)) {
            b5 = b5.reverse()
        }
        return this.pushStack(b5)
    }
});
bJ.extend({
    filter: function(b4, e, b3) {
        if (b3) {
            b4 = ":not(" + b4 + ")"
        }
        return e.length === 1 ? bJ.find.matchesSelector(e[0], b4) ? [e[0]] : [] : bJ.find.matches(b4, e)
    },
    dir: function(b4, b3, b6) {
        var e = [],
        b5 = b4[b3];
        while (b5 && b5.nodeType !== 9 && (b6 === aG || b5.nodeType !== 1 || !bJ(b5).is(b6))) {
            if (b5.nodeType === 1) {
                e.push(b5)
            }
            b5 = b5[b3]
        }
        return e
    },
    sibling: function(b4, b3) {
        var e = [];
        for (; b4; b4 = b4.nextSibling) {
            if (b4.nodeType === 1 && b4 !== b3) {
                e.push(b4)
            }
        }
        return e
    }
});
function aO(b5, b4, e) {
    b4 = b4 || 0;
    if (bJ.isFunction(b4)) {
        return bJ.grep(b5,
        function(b7, b6) {
            var b8 = !!b4.call(b7, b6, b7);
            return b8 === e
        })
    } else {
        if (b4.nodeType) {
            return bJ.grep(b5,
            function(b6) {
                return (b6 === b4) === e
            })
        } else {
            if (typeof b4 === "string") {
                var b3 = bJ.grep(b5,
                function(b6) {
                    return b6.nodeType === 1
                });
                if (an.test(b4)) {
                    return bJ.filter(b4, b3, !e)
                } else {
                    b4 = bJ.filter(b4, b3)
                }
            }
        }
    }
    return bJ.grep(b5,
    function(b6) {
        return (bJ.inArray(b6, b4) >= 0) === e
    })
}
function A(e) {
    var b4 = d.split("|"),
    b3 = e.createDocumentFragment();
    if (b3.createElement) {
        while (b4.length) {
            b3.createElement(b4.pop())
        }
    }
    return b3
}
var d = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
aA = / jQuery\d+="(?:null|\d+)"/g,
J = new RegExp("<(?:" + d + ")[\\s/>]", "i"),
b2 = /^\s+/,
aD = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
m = /<([\w:]+)/,
bX = /<tbody/i,
I = /<|&#?\w+;/,
al = /<(?:script|style|link)/i,
q = /^(?:checkbox|radio)$/i,
bU = /checked\s*(?:[^=]|=\s*.checked.)/i,
bz = /^$|\/(?:java|ecma)script/i,
ar = /^true\/(.*)/,
aK = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
T = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    area: [1, "<map>", "</map>"],
    param: [1, "<object>", "</object>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: bJ.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
},
aS = A(l),
j = aS.appendChild(l.createElement("div"));
T.optgroup = T.option;
T.tbody = T.tfoot = T.colgroup = T.caption = T.thead;
T.th = T.td;
bJ.fn.extend({
    text: function(e) {
        return bJ.access(this,
        function(b3) {
            return b3 === aG ? bJ.text(this) : this.empty().append((this[0] && this[0].ownerDocument || l).createTextNode(b3))
        },
        null, e, arguments.length)
    },
    wrapAll: function(e) {
        if (bJ.isFunction(e)) {
            return this.each(function(b4) {
                bJ(this).wrapAll(e.call(this, b4))
            })
        }
        if (this[0]) {
            var b3 = bJ(e, this[0].ownerDocument).eq(0).clone(true);
            if (this[0].parentNode) {
                b3.insertBefore(this[0])
            }
            b3.map(function() {
                var b4 = this;
                while (b4.firstChild && b4.firstChild.nodeType === 1) {
                    b4 = b4.firstChild
                }
                return b4
            }).append(this)
        }
        return this
    },
    wrapInner: function(e) {
        if (bJ.isFunction(e)) {
            return this.each(function(b3) {
                bJ(this).wrapInner(e.call(this, b3))
            })
        }
        return this.each(function() {
            var b3 = bJ(this),
            b4 = b3.contents();
            if (b4.length) {
                b4.wrapAll(e)
            } else {
                b3.append(e)
            }
        })
    },
    wrap: function(e) {
        var b3 = bJ.isFunction(e);
        return this.each(function(b4) {
            bJ(this).wrapAll(b3 ? e.call(this, b4) : e)
        })
    },
    unwrap: function() {
        return this.parent().each(function() {
            if (!bJ.nodeName(this, "body")) {
                bJ(this).replaceWith(this.childNodes)
            }
        }).end()
    },
    append: function() {
        return this.domManip(arguments, true,
        function(e) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                this.appendChild(e)
            }
        })
    },
    prepend: function() {
        return this.domManip(arguments, true,
        function(e) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                this.insertBefore(e, this.firstChild)
            }
        })
    },
    before: function() {
        return this.domManip(arguments, false,
        function(e) {
            if (this.parentNode) {
                this.parentNode.insertBefore(e, this)
            }
        })
    },
    after: function() {
        return this.domManip(arguments, false,
        function(e) {
            if (this.parentNode) {
                this.parentNode.insertBefore(e, this.nextSibling)
            }
        })
    },
    remove: function(e, b5) {
        var b4, b3 = 0;
        for (; (b4 = this[b3]) != null; b3++) {
            if (!e || bJ.filter(e, [b4]).length > 0) {
                if (!b5 && b4.nodeType === 1) {
                    bJ.cleanData(k(b4))
                }
                if (b4.parentNode) {
                    if (b5 && bJ.contains(b4.ownerDocument, b4)) {
                        bs(k(b4, "script"))
                    }
                    b4.parentNode.removeChild(b4)
                }
            }
        }
        return this
    },
    empty: function() {
        var b3, e = 0;
        for (; (b3 = this[e]) != null; e++) {
            if (b3.nodeType === 1) {
                bJ.cleanData(k(b3, false))
            }
            while (b3.firstChild) {
                b3.removeChild(b3.firstChild)
            }
            if (b3.options && bJ.nodeName(b3, "select")) {
                b3.options.length = 0
            }
        }
        return this
    },
    clone: function(b3, e) {
        b3 = b3 == null ? false: b3;
        e = e == null ? b3: e;
        return this.map(function() {
            return bJ.clone(this, b3, e)
        })
    },
    html: function(e) {
        return bJ.access(this,
        function(b6) {
            var b5 = this[0] || {},
            b4 = 0,
            b3 = this.length;
            if (b6 === aG) {
                return b5.nodeType === 1 ? b5.innerHTML.replace(aA, "") : aG
            }
            if (typeof b6 === "string" && !al.test(b6) && (bJ.support.htmlSerialize || !J.test(b6)) && (bJ.support.leadingWhitespace || !b2.test(b6)) && !T[(m.exec(b6) || ["", ""])[1].toLowerCase()]) {
                b6 = b6.replace(aD, "<$1></$2>");
                try {
                    for (; b4 < b3; b4++) {
                        b5 = this[b4] || {};
                        if (b5.nodeType === 1) {
                            bJ.cleanData(k(b5, false));
                            b5.innerHTML = b6
                        }
                    }
                    b5 = 0
                } catch(b7) {}
            }
            if (b5) {
                this.empty().append(b6)
            }
        },
        null, e, arguments.length)
    },
    replaceWith: function(b3) {
        var e = bJ.isFunction(b3);
        if (!e && typeof b3 !== "string") {
            b3 = bJ(b3).not(this).detach()
        }
        return this.domManip([b3], true,
        function(b6) {
            var b5 = this.nextSibling,
            b4 = this.parentNode;
            if (b4) {
                bJ(this).remove();
                b4.insertBefore(b6, b5)
            }
        })
    },
    detach: function(e) {
        return this.remove(e, true)
    },
    domManip: function(ca, cg, cf) {
        ca = aI.apply([], ca);
        var b8, b4, e, b6, cd, b9, b7 = 0,
        b5 = this.length,
        cc = this,
        ce = b5 - 1,
        cb = ca[0],
        b3 = bJ.isFunction(cb);
        if (b3 || !(b5 <= 1 || typeof cb !== "string" || bJ.support.checkClone || !bU.test(cb))) {
            return this.each(function(ci) {
                var ch = cc.eq(ci);
                if (b3) {
                    ca[0] = cb.call(this, ci, cg ? ch.html() : aG)
                }
                ch.domManip(ca, cg, cf)
            })
        }
        if (b5) {
            b9 = bJ.buildFragment(ca, this[0].ownerDocument, false, this);
            b8 = b9.firstChild;
            if (b9.childNodes.length === 1) {
                b9 = b8
            }
            if (b8) {
                cg = cg && bJ.nodeName(b8, "tr");
                b6 = bJ.map(k(b9, "script"), t);
                e = b6.length;
                for (; b7 < b5; b7++) {
                    b4 = b9;
                    if (b7 !== ce) {
                        b4 = bJ.clone(b4, true, true);
                        if (e) {
                            bJ.merge(b6, k(b4, "script"))
                        }
                    }
                    cf.call(cg && bJ.nodeName(this[b7], "table") ? x(this[b7], "tbody") : this[b7], b4, b7)
                }
                if (e) {
                    cd = b6[b6.length - 1].ownerDocument;
                    bJ.map(b6, bc);
                    for (b7 = 0; b7 < e; b7++) {
                        b4 = b6[b7];
                        if (bz.test(b4.type || "") && !bJ._data(b4, "globalEval") && bJ.contains(cd, b4)) {
                            if (b4.src) {
                                bJ.ajax({
                                    url: b4.src,
                                    type: "GET",
                                    dataType: "script",
                                    async: false,
                                    global: false,
                                    "throws": true
                                })
                            } else {
                                bJ.globalEval((b4.text || b4.textContent || b4.innerHTML || "").replace(aK, ""))
                            }
                        }
                    }
                }
                b9 = b8 = null
            }
        }
        return this
    }
});
function x(b3, e) {
    return b3.getElementsByTagName(e)[0] || b3.appendChild(b3.ownerDocument.createElement(e))
}
function t(b3) {
    var e = b3.getAttributeNode("type");
    b3.type = (e && e.specified) + "/" + b3.type;
    return b3
}
function bc(b3) {
    var e = ar.exec(b3.type);
    if (e) {
        b3.type = e[1]
    } else {
        b3.removeAttribute("type")
    }
    return b3
}
function bs(e, b4) {
    var b5, b3 = 0;
    for (; (b5 = e[b3]) != null; b3++) {
        bJ._data(b5, "globalEval", !b4 || bJ._data(b4[b3], "globalEval"))
    }
}
function at(b9, b3) {
    if (b3.nodeType !== 1 || !bJ.hasData(b9)) {
        return
    }
    var b6, b5, e, b8 = bJ._data(b9),
    b7 = bJ._data(b3, b8),
    b4 = b8.events;
    if (b4) {
        delete b7.handle;
        b7.events = {};
        for (b6 in b4) {
            for (b5 = 0, e = b4[b6].length; b5 < e; b5++) {
                bJ.event.add(b3, b6, b4[b6][b5])
            }
        }
    }
    if (b7.data) {
        b7.data = bJ.extend({},
        b7.data)
    }
}
function Q(b6, b3) {
    var b7, b5, b4;
    if (b3.nodeType !== 1) {
        return
    }
    b7 = b3.nodeName.toLowerCase();
    if (!bJ.support.noCloneEvent && b3[bJ.expando]) {
        b4 = bJ._data(b3);
        for (b5 in b4.events) {
            bJ.removeEvent(b3, b5, b4.handle)
        }
        b3.removeAttribute(bJ.expando)
    }
    if (b7 === "script" && b3.text !== b6.text) {
        t(b3).text = b6.text;
        bc(b3)
    } else {
        if (b7 === "object") {
            if (b3.parentNode) {
                b3.outerHTML = b6.outerHTML
            }
            if (bJ.support.html5Clone && (b6.innerHTML && !bJ.trim(b3.innerHTML))) {
                b3.innerHTML = b6.innerHTML
            }
        } else {
            if (b7 === "input" && q.test(b6.type)) {
                b3.defaultChecked = b3.checked = b6.checked;
                if (b3.value !== b6.value) {
                    b3.value = b6.value
                }
            } else {
                if (b7 === "option") {
                    b3.defaultSelected = b3.selected = b6.defaultSelected
                } else {
                    if (b7 === "input" || b7 === "textarea") {
                        b3.defaultValue = b6.defaultValue
                    }
                }
            }
        }
    }
}
bJ.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
},
function(e, b3) {
    bJ.fn[e] = function(b4) {
        var b5, b7 = 0,
        b6 = [],
        b9 = bJ(b4),
        b8 = b9.length - 1;
        for (; b7 <= b8; b7++) {
            b5 = b7 === b8 ? this: this.clone(true);
            bJ(b9[b7])[b3](b5);
            ao.apply(b6, b5.get())
        }
        return this.pushStack(b6)
    }
});
function k(b5, e) {
    var b3, b6, b4 = 0,
    b7 = typeof b5.getElementsByTagName !== aC ? b5.getElementsByTagName(e || "*") : typeof b5.querySelectorAll !== aC ? b5.querySelectorAll(e || "*") : aG;
    if (!b7) {
        for (b7 = [], b3 = b5.childNodes || b5; (b6 = b3[b4]) != null; b4++) {
            if (!e || bJ.nodeName(b6, e)) {
                b7.push(b6)
            } else {
                bJ.merge(b7, k(b6, e))
            }
        }
    }
    return e === aG || e && bJ.nodeName(b5, e) ? bJ.merge([b5], b7) : b7
}
function bV(e) {
    if (q.test(e.type)) {
        e.defaultChecked = e.checked
    }
}
bJ.extend({
    clone: function(b3, b5, e) {
        var b7, b4, ca, b6, b8, b9 = bJ.contains(b3.ownerDocument, b3);
        if (bJ.support.html5Clone || bJ.isXMLDoc(b3) || !J.test("<" + b3.nodeName + ">")) {
            ca = b3.cloneNode(true)
        } else {
            j.innerHTML = b3.outerHTML;
            j.removeChild(ca = j.firstChild)
        }
        if ((!bJ.support.noCloneEvent || !bJ.support.noCloneChecked) && (b3.nodeType === 1 || b3.nodeType === 11) && !bJ.isXMLDoc(b3)) {
            b7 = k(ca);
            b8 = k(b3);
            for (b6 = 0; (b4 = b8[b6]) != null; ++b6) {
                if (b7[b6]) {
                    Q(b4, b7[b6])
                }
            }
        }
        if (b5) {
            if (e) {
                b8 = b8 || k(b3);
                b7 = b7 || k(ca);
                for (b6 = 0; (b4 = b8[b6]) != null; b6++) {
                    at(b4, b7[b6])
                }
            } else {
                at(b3, ca)
            }
        }
        b7 = k(ca, "script");
        if (b7.length > 0) {
            bs(b7, !b9 && k(b3, "script"))
        }
        b7 = b8 = b4 = null;
        return ca
    },
    buildFragment: function(b3, b5, ca, cf) {
        var cb, b7, b9, ce, cg, cd, b4, b8 = b3.length,
        b6 = A(b5),
        e = [],
        cc = 0;
        for (; cc < b8; cc++) {
            b7 = b3[cc];
            if (b7 || b7 === 0) {
                if (bJ.type(b7) === "object") {
                    bJ.merge(e, b7.nodeType ? [b7] : b7)
                } else {
                    if (!I.test(b7)) {
                        e.push(b5.createTextNode(b7))
                    } else {
                        ce = ce || b6.appendChild(b5.createElement("div"));
                        cg = (m.exec(b7) || ["", ""])[1].toLowerCase();
                        b4 = T[cg] || T._default;
                        ce.innerHTML = b4[1] + b7.replace(aD, "<$1></$2>") + b4[2];
                        cb = b4[0];
                        while (cb--) {
                            ce = ce.lastChild
                        }
                        if (!bJ.support.leadingWhitespace && b2.test(b7)) {
                            e.push(b5.createTextNode(b2.exec(b7)[0]))
                        }
                        if (!bJ.support.tbody) {
                            b7 = cg === "table" && !bX.test(b7) ? ce.firstChild: b4[1] === "<table>" && !bX.test(b7) ? ce: 0;
                            cb = b7 && b7.childNodes.length;
                            while (cb--) {
                                if (bJ.nodeName((cd = b7.childNodes[cb]), "tbody") && !cd.childNodes.length) {
                                    b7.removeChild(cd)
                                }
                            }
                        }
                        bJ.merge(e, ce.childNodes);
                        ce.textContent = "";
                        while (ce.firstChild) {
                            ce.removeChild(ce.firstChild)
                        }
                        ce = b6.lastChild
                    }
                }
            }
        }
        if (ce) {
            b6.removeChild(ce)
        }
        if (!bJ.support.appendChecked) {
            bJ.grep(k(e, "input"), bV)
        }
        cc = 0;
        while ((b7 = e[cc++])) {
            if (cf && bJ.inArray(b7, cf) !== -1) {
                continue
            }
            b9 = bJ.contains(b7.ownerDocument, b7);
            ce = k(b6.appendChild(b7), "script");
            if (b9) {
                bs(ce)
            }
            if (ca) {
                cb = 0;
                while ((b7 = ce[cb++])) {
                    if (bz.test(b7.type || "")) {
                        ca.push(b7)
                    }
                }
            }
        }
        ce = null;
        return b6
    },
    cleanData: function(b3, cb) {
        var b5, ca, b4, b6, b7 = 0,
        cc = bJ.expando,
        e = bJ.cache,
        b8 = bJ.support.deleteExpando,
        b9 = bJ.event.special;
        for (; (b5 = b3[b7]) != null; b7++) {
            if (cb || bJ.acceptData(b5)) {
                b4 = b5[cc];
                b6 = b4 && e[b4];
                if (b6) {
                    if (b6.events) {
                        for (ca in b6.events) {
                            if (b9[ca]) {
                                bJ.event.remove(b5, ca)
                            } else {
                                bJ.removeEvent(b5, ca, b6.handle)
                            }
                        }
                    }
                    if (e[b4]) {
                        delete e[b4];
                        if (b8) {
                            delete b5[cc]
                        } else {
                            if (typeof b5.removeAttribute !== aC) {
                                b5.removeAttribute(cc)
                            } else {
                                b5[cc] = null
                            }
                        }
                        a6.push(b4)
                    }
                }
            }
        }
    }
});
var aE, bo, E, bg = /alpha\([^)]*\)/i,
aT = /opacity\s*=\s*([^)]*)/,
bn = /^(top|right|bottom|left)$/,
F = /^(none|table(?!-c[ea]).+)/,
aY = /^margin/,
a9 = new RegExp("^(" + bA + ")(.*)$", "i"),
W = new RegExp("^(" + bA + ")(?!px)[a-z%]+$", "i"),
S = new RegExp("^([+-])=(" + bA + ")", "i"),
bj = {
    BODY: "block"
},
bb = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
},
bC = {
    letterSpacing: 0,
    fontWeight: 400
},
bT = ["Top", "Right", "Bottom", "Left"],
av = ["Webkit", "O", "Moz", "ms"];
function b(b5, b3) {
    if (b3 in b5) {
        return b3
    }
    var b6 = b3.charAt(0).toUpperCase() + b3.slice(1),
    e = b3,
    b4 = av.length;
    while (b4--) {
        b3 = av[b4] + b6;
        if (b3 in b5) {
            return b3
        }
    }
    return e
}
function P(b3, e) {
    b3 = e || b3;
    return bJ.css(b3, "display") === "none" || !bJ.contains(b3.ownerDocument, b3)
}
function p(b8, e) {
    var b9, b6, b7, b3 = [],
    b4 = 0,
    b5 = b8.length;
    for (; b4 < b5; b4++) {
        b6 = b8[b4];
        if (!b6.style) {
            continue
        }
        b3[b4] = bJ._data(b6, "olddisplay");
        b9 = b6.style.display;
        if (e) {
            if (!b3[b4] && b9 === "none") {
                b6.style.display = ""
            }
            if (b6.style.display === "" && P(b6)) {
                b3[b4] = bJ._data(b6, "olddisplay", bE(b6.nodeName))
            }
        } else {
            if (!b3[b4]) {
                b7 = P(b6);
                if (b9 && b9 !== "none" || !b7) {
                    bJ._data(b6, "olddisplay", b7 ? b9: bJ.css(b6, "display"))
                }
            }
        }
    }
    for (b4 = 0; b4 < b5; b4++) {
        b6 = b8[b4];
        if (!b6.style) {
            continue
        }
        if (!e || b6.style.display === "none" || b6.style.display === "") {
            b6.style.display = e ? b3[b4] || "": "none"
        }
    }
    return b8
}
bJ.fn.extend({
    css: function(e, b3) {
        return bJ.access(this,
        function(b8, b5, b9) {
            var b4, b7, ca = {},
            b6 = 0;
            if (bJ.isArray(b5)) {
                b7 = bo(b8);
                b4 = b5.length;
                for (; b6 < b4; b6++) {
                    ca[b5[b6]] = bJ.css(b8, b5[b6], false, b7)
                }
                return ca
            }
            return b9 !== aG ? bJ.style(b8, b5, b9) : bJ.css(b8, b5)
        },
        e, b3, arguments.length > 1)
    },
    show: function() {
        return p(this, true)
    },
    hide: function() {
        return p(this)
    },
    toggle: function(b3) {
        var e = typeof b3 === "boolean";
        return this.each(function() {
            if (e ? b3: P(this)) {
                bJ(this).show()
            } else {
                bJ(this).hide()
            }
        })
    }
});
bJ.extend({
    cssHooks: {
        opacity: {
            get: function(b4, b3) {
                if (b3) {
                    var e = E(b4, "opacity");
                    return e === "" ? "1": e
                }
            }
        }
    },
    cssNumber: {
        columnCount: true,
        fillOpacity: true,
        fontWeight: true,
        lineHeight: true,
        opacity: true,
        orphans: true,
        widows: true,
        zIndex: true,
        zoom: true
    },
    cssProps: {
        "float": bJ.support.cssFloat ? "cssFloat": "styleFloat"
    },
    style: function(b5, b4, cb, b6) {
        if (!b5 || b5.nodeType === 3 || b5.nodeType === 8 || !b5.style) {
            return
        }
        var b9, ca, cc, b7 = bJ.camelCase(b4),
        b3 = b5.style;
        b4 = bJ.cssProps[b7] || (bJ.cssProps[b7] = b(b3, b7));
        cc = bJ.cssHooks[b4] || bJ.cssHooks[b7];
        if (cb !== aG) {
            ca = typeof cb;
            if (ca === "string" && (b9 = S.exec(cb))) {
                cb = (b9[1] + 1) * b9[2] + parseFloat(bJ.css(b5, b4));
                ca = "number"
            }
            if (cb == null || ca === "number" && isNaN(cb)) {
                return
            }
            if (ca === "number" && !bJ.cssNumber[b7]) {
                cb += "px"
            }
            if (!bJ.support.clearCloneStyle && cb === "" && b4.indexOf("background") === 0) {
                b3[b4] = "inherit"
            }
            if (!cc || !("set" in cc) || (cb = cc.set(b5, cb, b6)) !== aG) {
                try {
                    b3[b4] = cb
                } catch(b8) {}
            }
        } else {
            if (cc && "get" in cc && (b9 = cc.get(b5, false, b6)) !== aG) {
                return b9
            }
            return b3[b4]
        }
    },
    css: function(b8, b6, b3, b7) {
        var b5, b9, e, b4 = bJ.camelCase(b6);
        b6 = bJ.cssProps[b4] || (bJ.cssProps[b4] = b(b8.style, b4));
        e = bJ.cssHooks[b6] || bJ.cssHooks[b4];
        if (e && "get" in e) {
            b9 = e.get(b8, true, b3)
        }
        if (b9 === aG) {
            b9 = E(b8, b6, b7)
        }
        if (b9 === "normal" && b6 in bC) {
            b9 = bC[b6]
        }
        if (b3 === "" || b3) {
            b5 = parseFloat(b9);
            return b3 === true || bJ.isNumeric(b5) ? b5 || 0 : b9
        }
        return b9
    },
    swap: function(b7, b6, b8, b5) {
        var b4, b3, e = {};
        for (b3 in b6) {
            e[b3] = b7.style[b3];
            b7.style[b3] = b6[b3]
        }
        b4 = b8.apply(b7, b5 || []);
        for (b3 in b6) {
            b7.style[b3] = e[b3]
        }
        return b4
    }
});
if (a2.getComputedStyle) {
    bo = function(e) {
        return a2.getComputedStyle(e, null)
    };
    E = function(b6, b4, b8) {
        var b5, b3, ca, b7 = b8 || bo(b6),
        b9 = b7 ? b7.getPropertyValue(b4) || b7[b4] : aG,
        e = b6.style;
        if (b7) {
            if (b9 === "" && !bJ.contains(b6.ownerDocument, b6)) {
                b9 = bJ.style(b6, b4)
            }
            if (W.test(b9) && aY.test(b4)) {
                b5 = e.width;
                b3 = e.minWidth;
                ca = e.maxWidth;
                e.minWidth = e.maxWidth = e.width = b9;
                b9 = b7.width;
                e.width = b5;
                e.minWidth = b3;
                e.maxWidth = ca
            }
        }
        return b9
    }
} else {
    if (l.documentElement.currentStyle) {
        bo = function(e) {
            return e.currentStyle
        };
        E = function(b5, b3, b8) {
            var b4, b7, b9, b6 = b8 || bo(b5),
            ca = b6 ? b6[b3] : aG,
            e = b5.style;
            if (ca == null && e && e[b3]) {
                ca = e[b3]
            }
            if (W.test(ca) && !bn.test(b3)) {
                b4 = e.left;
                b7 = b5.runtimeStyle;
                b9 = b7 && b7.left;
                if (b9) {
                    b7.left = b5.currentStyle.left
                }
                e.left = b3 === "fontSize" ? "1em": ca;
                ca = e.pixelLeft + "px";
                e.left = b4;
                if (b9) {
                    b7.left = b9
                }
            }
            return ca === "" ? "auto": ca
        }
    }
}
function aJ(e, b4, b5) {
    var b3 = a9.exec(b4);
    return b3 ? Math.max(0, b3[1] - (b5 || 0)) + (b3[2] || "px") : b4
}
function aw(b6, b3, e, b8, b5) {
    var b4 = e === (b8 ? "border": "content") ? 4 : b3 === "width" ? 1 : 0,
    b7 = 0;
    for (; b4 < 4; b4 += 2) {
        if (e === "margin") {
            b7 += bJ.css(b6, e + bT[b4], true, b5)
        }
        if (b8) {
            if (e === "content") {
                b7 -= bJ.css(b6, "padding" + bT[b4], true, b5)
            }
            if (e !== "margin") {
                b7 -= bJ.css(b6, "border" + bT[b4] + "Width", true, b5)
            }
        } else {
            b7 += bJ.css(b6, "padding" + bT[b4], true, b5);
            if (e !== "padding") {
                b7 += bJ.css(b6, "border" + bT[b4] + "Width", true, b5)
            }
        }
    }
    return b7
}
function u(b6, b3, e) {
    var b5 = true,
    b7 = b3 === "width" ? b6.offsetWidth: b6.offsetHeight,
    b4 = bo(b6),
    b8 = bJ.support.boxSizing && bJ.css(b6, "boxSizing", false, b4) === "border-box";
    if (b7 <= 0 || b7 == null) {
        b7 = E(b6, b3, b4);
        if (b7 < 0 || b7 == null) {
            b7 = b6.style[b3]
        }
        if (W.test(b7)) {
            return b7
        }
        b5 = b8 && (bJ.support.boxSizingReliable || b7 === b6.style[b3]);
        b7 = parseFloat(b7) || 0
    }
    return (b7 + aw(b6, b3, e || (b8 ? "border": "content"), b5, b4)) + "px"
}
function bE(b4) {
    var b3 = l,
    e = bj[b4];
    if (!e) {
        e = a1(b4, b3);
        if (e === "none" || !e) {
            aE = (aE || bJ("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b3.documentElement);
            b3 = (aE[0].contentWindow || aE[0].contentDocument).document;
            b3.write("<!doctype html><html><body>");
            b3.close();
            e = a1(b4, b3);
            aE.detach()
        }
        bj[b4] = e
    }
    return e
}
function a1(e, b5) {
    var b3 = bJ(b5.createElement(e)).appendTo(b5.body),
    b4 = bJ.css(b3[0], "display");
    b3.remove();
    return b4
}
bJ.each(["height", "width"],
function(b3, e) {
    bJ.cssHooks[e] = {
        get: function(b6, b5, b4) {
            if (b5) {
                return b6.offsetWidth === 0 && F.test(bJ.css(b6, "display")) ? bJ.swap(b6, bb,
                function() {
                    return u(b6, e, b4)
                }) : u(b6, e, b4)
            }
        },
        set: function(b6, b7, b4) {
            var b5 = b4 && bo(b6);
            return aJ(b6, b7, b4 ? aw(b6, e, b4, bJ.support.boxSizing && bJ.css(b6, "boxSizing", false, b5) === "border-box", b5) : 0)
        }
    }
});
if (!bJ.support.opacity) {
    bJ.cssHooks.opacity = {
        get: function(b3, e) {
            return aT.test((e && b3.currentStyle ? b3.currentStyle.filter: b3.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "": e ? "1": ""
        },
        set: function(b6, b7) {
            var b5 = b6.style,
            b3 = b6.currentStyle,
            e = bJ.isNumeric(b7) ? "alpha(opacity=" + b7 * 100 + ")": "",
            b4 = b3 && b3.filter || b5.filter || "";
            b5.zoom = 1;
            if ((b7 >= 1 || b7 === "") && bJ.trim(b4.replace(bg, "")) === "" && b5.removeAttribute) {
                b5.removeAttribute("filter");
                if (b7 === "" || b3 && !b3.filter) {
                    return
                }
            }
            b5.filter = bg.test(b4) ? b4.replace(bg, e) : b4 + " " + e
        }
    }
}
bJ(function() {
    if (!bJ.support.reliableMarginRight) {
        bJ.cssHooks.marginRight = {
            get: function(b3, e) {
                if (e) {
                    return bJ.swap(b3, {
                        display: "inline-block"
                    },
                    E, [b3, "marginRight"])
                }
            }
        }
    }
    if (!bJ.support.pixelPosition && bJ.fn.position) {
        bJ.each(["top", "left"],
        function(e, b3) {
            bJ.cssHooks[b3] = {
                get: function(b5, b4) {
                    if (b4) {
                        b4 = E(b5, b3);
                        return W.test(b4) ? bJ(b5).position()[b3] + "px": b4
                    }
                }
            }
        })
    }
});
if (bJ.expr && bJ.expr.filters) {
    bJ.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || (!bJ.support.reliableHiddenOffsets && ((e.style && e.style.display) || bJ.css(e, "display")) === "none")
    };
    bJ.expr.filters.visible = function(e) {
        return ! bJ.expr.filters.hidden(e)
    }
}
bJ.each({
    margin: "",
    padding: "",
    border: "Width"
},
function(e, b3) {
    bJ.cssHooks[e + b3] = {
        expand: function(b6) {
            var b5 = 0,
            b4 = {},
            b7 = typeof b6 === "string" ? b6.split(" ") : [b6];
            for (; b5 < 4; b5++) {
                b4[e + bT[b5] + b3] = b7[b5] || b7[b5 - 2] || b7[0]
            }
            return b4
        }
    };
    if (!aY.test(e)) {
        bJ.cssHooks[e + b3].set = aJ
    }
});
var bv = /%20/g,
aR = /\[\]$/,
U = /\r?\n/g,
c = /^(?:submit|button|image|reset|file)$/i,
au = /^(?:input|select|textarea|keygen)/i;
bJ.fn.extend({
    serialize: function() {
        return bJ.param(this.serializeArray())
    },
    serializeArray: function() {
        return this.map(function() {
            var e = bJ.prop(this, "elements");
            return e ? bJ.makeArray(e) : this
        }).filter(function() {
            var e = this.type;
            return this.name && !bJ(this).is(":disabled") && au.test(this.nodeName) && !c.test(e) && (this.checked || !q.test(e))
        }).map(function(e, b3) {
            var b4 = bJ(this).val();
            return b4 == null ? null: bJ.isArray(b4) ? bJ.map(b4,
            function(b5) {
                return {
                    name: b3.name,
                    value: b5.replace(U, "\r\n")
                }
            }) : {
                name: b3.name,
                value: b4.replace(U, "\r\n")
            }
        }).get()
    }
});
bJ.param = function(e, b4) {
    var b5, b3 = [],
    b6 = function(b7, b8) {
        b8 = bJ.isFunction(b8) ? b8() : (b8 == null ? "": b8);
        b3[b3.length] = encodeURIComponent(b7) + "=" + encodeURIComponent(b8)
    };
    if (b4 === aG) {
        b4 = bJ.ajaxSettings && bJ.ajaxSettings.traditional
    }
    if (bJ.isArray(e) || (e.jquery && !bJ.isPlainObject(e))) {
        bJ.each(e,
        function() {
            b6(this.name, this.value)
        })
    } else {
        for (b5 in e) {
            i(b5, e[b5], b4, b6)
        }
    }
    return b3.join("&").replace(bv, "+")
};
function i(b4, b6, b3, b5) {
    var e;
    if (bJ.isArray(b6)) {
        bJ.each(b6,
        function(b8, b7) {
            if (b3 || aR.test(b4)) {
                b5(b4, b7)
            } else {
                i(b4 + "[" + (typeof b7 === "object" ? b8: "") + "]", b7, b3, b5)
            }
        })
    } else {
        if (!b3 && bJ.type(b6) === "object") {
            for (e in b6) {
                i(b4 + "[" + e + "]", b6[e], b3, b5)
            }
        } else {
            b5(b4, b6)
        }
    }
}
bJ.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "),
function(b3, e) {
    bJ.fn[e] = function(b5, b4) {
        return arguments.length > 0 ? this.on(e, null, b5, b4) : this.trigger(e)
    }
});
bJ.fn.hover = function(e, b3) {
    return this.mouseenter(e).mouseleave(b3 || e)
};
var b1, Y, bO = bJ.now(),
az = /\?/,
ap = /#.*$/,
O = /([?&])_=[^&]*/,
ag = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
B = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
o = /^(?:GET|HEAD)$/,
aH = /^\/\//,
aU = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
b0 = bJ.fn.load,
v = {},
a7 = {},
aW = "*/".concat("*");
try {
    Y = aL.href
} catch(bf) {
    Y = l.createElement("a");
    Y.href = "";
    Y = Y.href
}
b1 = aU.exec(Y.toLowerCase()) || [];
function bL(e) {
    return function(b6, b7) {
        if (typeof b6 !== "string") {
            b7 = b6;
            b6 = "*"
        }
        var b3, b4 = 0,
        b5 = b6.toLowerCase().match(ac) || [];
        if (bJ.isFunction(b7)) {
            while ((b3 = b5[b4++])) {
                if (b3[0] === "+") {
                    b3 = b3.slice(1) || "*"; (e[b3] = e[b3] || []).unshift(b7)
                } else { (e[b3] = e[b3] || []).push(b7)
                }
            }
        }
    }
}
function n(e, b4, b8, b5) {
    var b3 = {},
    b6 = (e === a7);
    function b7(b9) {
        var ca;
        b3[b9] = true;
        bJ.each(e[b9] || [],
        function(cc, cb) {
            var cd = cb(b4, b8, b5);
            if (typeof cd === "string" && !b6 && !b3[cd]) {
                b4.dataTypes.unshift(cd);
                b7(cd);
                return false
            } else {
                if (b6) {
                    return ! (ca = cd)
                }
            }
        });
        return ca
    }
    return b7(b4.dataTypes[0]) || !b3["*"] && b7("*")
}
function r(b4, b5) {
    var e, b3, b6 = bJ.ajaxSettings.flatOptions || {};
    for (b3 in b5) {
        if (b5[b3] !== aG) { (b6[b3] ? b4: (e || (e = {})))[b3] = b5[b3]
        }
    }
    if (e) {
        bJ.extend(true, b4, e)
    }
    return b4
}
bJ.fn.load = function(b5, b8, b9) {
    if (typeof b5 !== "string" && b0) {
        return b0.apply(this, arguments)
    }
    var e, b4, b6, b3 = this,
    b7 = b5.indexOf(" ");
    if (b7 >= 0) {
        e = b5.slice(b7, b5.length);
        b5 = b5.slice(0, b7)
    }
    if (bJ.isFunction(b8)) {
        b9 = b8;
        b8 = aG
    } else {
        if (b8 && typeof b8 === "object") {
            b6 = "POST"
        }
    }
    if (b3.length > 0) {
        bJ.ajax({
            url: b5,
            type: b6,
            dataType: "html",
            data: b8
        }).done(function(ca) {
            b4 = arguments;
            b3.html(e ? bJ("<div>").append(bJ.parseHTML(ca)).find(e) : ca)
        }).complete(b9 &&
        function(cb, ca) {
            b3.each(b9, b4 || [cb.responseText, ca, cb])
        })
    }
    return this
};
bJ.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
function(e, b3) {
    bJ.fn[b3] = function(b4) {
        return this.on(b3, b4)
    }
});
bJ.each(["get", "post"],
function(e, b3) {
    bJ[b3] = function(b4, b6, b7, b5) {
        if (bJ.isFunction(b6)) {
            b5 = b5 || b7;
            b7 = b6;
            b6 = aG
        }
        return bJ.ajax({
            url: b4,
            type: b3,
            dataType: b5,
            data: b6,
            success: b7
        })
    }
});
bJ.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
        url: Y,
        type: "GET",
        isLocal: B.test(b1[1]),
        global: true,
        processData: true,
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
            "*": aW,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
        },
        contents: {
            xml: /xml/,
            html: /html/,
            json: /json/
        },
        responseFields: {
            xml: "responseXML",
            text: "responseText"
        },
        converters: {
            "* text": a2.String,
            "text html": true,
            "text json": bJ.parseJSON,
            "text xml": bJ.parseXML
        },
        flatOptions: {
            url: true,
            context: true
        }
    },
    ajaxSetup: function(b3, e) {
        return e ? r(r(b3, bJ.ajaxSettings), e) : r(bJ.ajaxSettings, b3)
    },
    ajaxPrefilter: bL(v),
    ajaxTransport: bL(a7),
    ajax: function(b7, b4) {
        if (typeof b7 === "object") {
            b4 = b7;
            b7 = aG
        }
        b4 = b4 || {};
        var cg, ci, b8, cn, cc, b3, cj, b5, cb = bJ.ajaxSetup({},
        b4),
        cp = cb.context || cb,
        ce = cb.context && (cp.nodeType || cp.jquery) ? bJ(cp) : bJ.event,
        co = bJ.Deferred(),
        cl = bJ.Callbacks("once memory"),
        b9 = cb.statusCode || {},
        cf = {},
        cm = {},
        b6 = 0,
        ca = "canceled",
        ch = {
            readyState: 0,
            getResponseHeader: function(cq) {
                var e;
                if (b6 === 2) {
                    if (!b5) {
                        b5 = {};
                        while ((e = ag.exec(cn))) {
                            b5[e[1].toLowerCase()] = e[2]
                        }
                    }
                    e = b5[cq.toLowerCase()]
                }
                return e == null ? null: e
            },
            getAllResponseHeaders: function() {
                return b6 === 2 ? cn: null
            },
            setRequestHeader: function(cq, cr) {
                var e = cq.toLowerCase();
                if (!b6) {
                    cq = cm[e] = cm[e] || cq;
                    cf[cq] = cr
                }
                return this
            },
            overrideMimeType: function(e) {
                if (!b6) {
                    cb.mimeType = e
                }
                return this
            },
            statusCode: function(cq) {
                var e;
                if (cq) {
                    if (b6 < 2) {
                        for (e in cq) {
                            b9[e] = [b9[e], cq[e]]
                        }
                    } else {
                        ch.always(cq[ch.status])
                    }
                }
                return this
            },
            abort: function(cq) {
                var e = cq || ca;
                if (cj) {
                    cj.abort(e)
                }
                cd(0, e);
                return this
            }
        };
        co.promise(ch).complete = cl.add;
        ch.success = ch.done;
        ch.error = ch.fail;
        cb.url = ((b7 || cb.url || Y) + "").replace(ap, "").replace(aH, b1[1] + "//");
        cb.type = b4.method || b4.type || cb.method || cb.type;
        cb.dataTypes = bJ.trim(cb.dataType || "*").toLowerCase().match(ac) || [""];
        if (cb.crossDomain == null) {
            cg = aU.exec(cb.url.toLowerCase());
            cb.crossDomain = !!(cg && (cg[1] !== b1[1] || cg[2] !== b1[2] || (cg[3] || (cg[1] === "http:" ? 80 : 443)) != (b1[3] || (b1[1] === "http:" ? 80 : 443))))
        }
        if (cb.data && cb.processData && typeof cb.data !== "string") {
            cb.data = bJ.param(cb.data, cb.traditional)
        }
        n(v, cb, b4, ch);
        if (b6 === 2) {
            return ch
        }
        b3 = cb.global;
        if (b3 && bJ.active++===0) {
            bJ.event.trigger("ajaxStart")
        }
        cb.type = cb.type.toUpperCase();
        cb.hasContent = !o.test(cb.type);
        b8 = cb.url;
        if (!cb.hasContent) {
            if (cb.data) {
                b8 = (cb.url += (az.test(b8) ? "&": "?") + cb.data);
                delete cb.data
            }
            if (cb.cache === false) {
                cb.url = O.test(b8) ? b8.replace(O, "$1_=" + bO++) : b8 + (az.test(b8) ? "&": "?") + "_=" + bO++
            }
        }
        if (cb.ifModified) {
            if (bJ.lastModified[b8]) {
                ch.setRequestHeader("If-Modified-Since", bJ.lastModified[b8])
            }
            if (bJ.etag[b8]) {
                ch.setRequestHeader("If-None-Match", bJ.etag[b8])
            }
        }
        if (cb.data && cb.hasContent && cb.contentType !== false || b4.contentType) {
            ch.setRequestHeader("Content-Type", cb.contentType)
        }
        ch.setRequestHeader("Accept", cb.dataTypes[0] && cb.accepts[cb.dataTypes[0]] ? cb.accepts[cb.dataTypes[0]] + (cb.dataTypes[0] !== "*" ? ", " + aW + "; q=0.01": "") : cb.accepts["*"]);
        for (ci in cb.headers) {
            ch.setRequestHeader(ci, cb.headers[ci])
        }
        if (cb.beforeSend && (cb.beforeSend.call(cp, ch, cb) === false || b6 === 2)) {
            return ch.abort()
        }
        ca = "abort";
        for (ci in {
            success: 1,
            error: 1,
            complete: 1
        }) {
            ch[ci](cb[ci])
        }
        cj = n(a7, cb, b4, ch);
        if (!cj) {
            cd( - 1, "No Transport")
        } else {
            ch.readyState = 1;
            if (b3) {
                ce.trigger("ajaxSend", [ch, cb])
            }
            if (cb.async && cb.timeout > 0) {
                cc = setTimeout(function() {
                    ch.abort("timeout")
                },
                cb.timeout)
            }
            try {
                b6 = 1;
                cj.send(cf, cd)
            } catch(ck) {
                if (b6 < 2) {
                    cd( - 1, ck)
                } else {
                    throw ck
                }
            }
        }
        function cd(cu, cq, cv, cs) {
            var e, cy, cw, ct, cx, cr = cq;
            if (b6 === 2) {
                return
            }
            b6 = 2;
            if (cc) {
                clearTimeout(cc)
            }
            cj = aG;
            cn = cs || "";
            ch.readyState = cu > 0 ? 4 : 0;
            if (cv) {
                ct = g(cb, ch, cv)
            }
            if (cu >= 200 && cu < 300 || cu === 304) {
                if (cb.ifModified) {
                    cx = ch.getResponseHeader("Last-Modified");
                    if (cx) {
                        bJ.lastModified[b8] = cx
                    }
                    cx = ch.getResponseHeader("etag");
                    if (cx) {
                        bJ.etag[b8] = cx
                    }
                }
                if (cu === 204) {
                    e = true;
                    cr = "nocontent"
                } else {
                    if (cu === 304) {
                        e = true;
                        cr = "notmodified"
                    } else {
                        e = af(cb, ct);
                        cr = e.state;
                        cy = e.data;
                        cw = e.error;
                        e = !cw
                    }
                }
            } else {
                cw = cr;
                if (cu || !cr) {
                    cr = "error";
                    if (cu < 0) {
                        cu = 0
                    }
                }
            }
            ch.status = cu;
            ch.statusText = (cq || cr) + "";
            if (e) {
                co.resolveWith(cp, [cy, cr, ch])
            } else {
                co.rejectWith(cp, [ch, cr, cw])
            }
            ch.statusCode(b9);
            b9 = aG;
            if (b3) {
                ce.trigger(e ? "ajaxSuccess": "ajaxError", [ch, cb, e ? cy: cw])
            }
            cl.fireWith(cp, [ch, cr]);
            if (b3) {
                ce.trigger("ajaxComplete", [ch, cb]);
                if (! (--bJ.active)) {
                    bJ.event.trigger("ajaxStop")
                }
            }
        }
        return ch
    },
    getScript: function(e, b3) {
        return bJ.get(e, aG, b3, "script")
    },
    getJSON: function(e, b3, b4) {
        return bJ.get(e, b3, b4, "json")
    }
});
function g(cb, ca, b7) {
    var e, b6, b5, b8, b3 = cb.contents,
    b9 = cb.dataTypes,
    b4 = cb.responseFields;
    for (b8 in b4) {
        if (b8 in b7) {
            ca[b4[b8]] = b7[b8]
        }
    }
    while (b9[0] === "*") {
        b9.shift();
        if (b6 === aG) {
            b6 = cb.mimeType || ca.getResponseHeader("Content-Type")
        }
    }
    if (b6) {
        for (b8 in b3) {
            if (b3[b8] && b3[b8].test(b6)) {
                b9.unshift(b8);
                break
            }
        }
    }
    if (b9[0] in b7) {
        b5 = b9[0]
    } else {
        for (b8 in b7) {
            if (!b9[0] || cb.converters[b8 + " " + b9[0]]) {
                b5 = b8;
                break
            }
            if (!e) {
                e = b8
            }
        }
        b5 = b5 || e
    }
    if (b5) {
        if (b5 !== b9[0]) {
            b9.unshift(b5)
        }
        return b7[b5]
    }
}
function af(cd, b5) {
    var b3, b9, cb, b6, cc = {},
    b7 = 0,
    ca = cd.dataTypes.slice(),
    b4 = ca[0];
    if (cd.dataFilter) {
        b5 = cd.dataFilter(b5, cd.dataType)
    }
    if (ca[1]) {
        for (cb in cd.converters) {
            cc[cb.toLowerCase()] = cd.converters[cb]
        }
    }
    for (; (b9 = ca[++b7]);) {
        if (b9 !== "*") {
            if (b4 !== "*" && b4 !== b9) {
                cb = cc[b4 + " " + b9] || cc["* " + b9];
                if (!cb) {
                    for (b3 in cc) {
                        b6 = b3.split(" ");
                        if (b6[1] === b9) {
                            cb = cc[b4 + " " + b6[0]] || cc["* " + b6[0]];
                            if (cb) {
                                if (cb === true) {
                                    cb = cc[b3]
                                } else {
                                    if (cc[b3] !== true) {
                                        b9 = b6[0];
                                        ca.splice(b7--, 0, b9)
                                    }
                                }
                                break
                            }
                        }
                    }
                }
                if (cb !== true) {
                    if (cb && cd["throws"]) {
                        b5 = cb(b5)
                    } else {
                        try {
                            b5 = cb(b5)
                        } catch(b8) {
                            return {
                                state: "parsererror",
                                error: cb ? b8: "No conversion from " + b4 + " to " + b9
                            }
                        }
                    }
                }
            }
            b4 = b9
        }
    }
    return {
        state: "success",
        data: b5
    }
}
bJ.ajaxSetup({
    accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
        script: /(?:java|ecma)script/
    },
    converters: {
        "text script": function(e) {
            bJ.globalEval(e);
            return e
        }
    }
});
bJ.ajaxPrefilter("script",
function(e) {
    if (e.cache === aG) {
        e.cache = false
    }
    if (e.crossDomain) {
        e.type = "GET";
        e.global = false
    }
});
bJ.ajaxTransport("script",
function(b4) {
    if (b4.crossDomain) {
        var e, b3 = l.head || bJ("head")[0] || l.documentElement;
        return {
            send: function(b5, b6) {
                e = l.createElement("script");
                e.async = true;
                if (b4.scriptCharset) {
                    e.charset = b4.scriptCharset
                }
                e.src = b4.url;
                e.onload = e.onreadystatechange = function(b8, b7) {
                    if (b7 || !e.readyState || /loaded|complete/.test(e.readyState)) {
                        e.onload = e.onreadystatechange = null;
                        if (e.parentNode) {
                            e.parentNode.removeChild(e)
                        }
                        e = null;
                        if (!b7) {
                            b6(200, "success")
                        }
                    }
                };
                b3.insertBefore(e, b3.firstChild)
            },
            abort: function() {
                if (e) {
                    e.onload(aG, true)
                }
            }
        }
    }
});
var bq = [],
a5 = /(=)\?(?=&|$)|\?\?/;
bJ.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
        var e = bq.pop() || (bJ.expando + "_" + (bO++));
        this[e] = true;
        return e
    }
});
bJ.ajaxPrefilter("json jsonp",
function(b5, e, b6) {
    var b8, b3, b4, b7 = b5.jsonp !== false && (a5.test(b5.url) ? "url": typeof b5.data === "string" && !(b5.contentType || "").indexOf("application/x-www-form-urlencoded") && a5.test(b5.data) && "data");
    if (b7 || b5.dataTypes[0] === "jsonp") {
        b8 = b5.jsonpCallback = bJ.isFunction(b5.jsonpCallback) ? b5.jsonpCallback() : b5.jsonpCallback;
        if (b7) {
            b5[b7] = b5[b7].replace(a5, "$1" + b8)
        } else {
            if (b5.jsonp !== false) {
                b5.url += (az.test(b5.url) ? "&": "?") + b5.jsonp + "=" + b8
            }
        }
        b5.converters["script json"] = function() {
            if (!b4) {
                bJ.error(b8 + " was not called")
            }
            return b4[0]
        };
        b5.dataTypes[0] = "json";
        b3 = a2[b8];
        a2[b8] = function() {
            b4 = arguments
        };
        b6.always(function() {
            a2[b8] = b3;
            if (b5[b8]) {
                b5.jsonpCallback = e.jsonpCallback;
                bq.push(b8)
            }
            if (b4 && bJ.isFunction(b3)) {
                b3(b4[0])
            }
            b4 = b3 = aG
        });
        return "script"
    }
});
var ah, ax, ay = 0,
aP = a2.ActiveXObject &&
function() {
    var e;
    for (e in ah) {
        ah[e](aG, true)
    }
};
function bD() {
    try {
        return new a2.XMLHttpRequest()
    } catch(b3) {}
}
function bd() {
    try {
        return new a2.ActiveXObject("Microsoft.XMLHTTP")
    } catch(b3) {}
}
bJ.ajaxSettings.xhr = a2.ActiveXObject ?
function() {
    return ! this.isLocal && bD() || bd()
}: bD;
ax = bJ.ajaxSettings.xhr();
bJ.support.cors = !!ax && ("withCredentials" in ax);
ax = bJ.support.ajax = !!ax;
if (ax) {
    bJ.ajaxTransport(function(e) {
        if (!e.crossDomain || bJ.support.cors) {
            var b3;
            return {
                send: function(b9, b4) {
                    var b7, b5, b8 = e.xhr();
                    if (e.username) {
                        b8.open(e.type, e.url, e.async, e.username, e.password)
                    } else {
                        b8.open(e.type, e.url, e.async)
                    }
                    if (e.xhrFields) {
                        for (b5 in e.xhrFields) {
                            b8[b5] = e.xhrFields[b5]
                        }
                    }
                    if (e.mimeType && b8.overrideMimeType) {
                        b8.overrideMimeType(e.mimeType)
                    }
                    if (!e.crossDomain && !b9["X-Requested-With"]) {
                        b9["X-Requested-With"] = "XMLHttpRequest"
                    }
                    try {
                        for (b5 in b9) {
                            b8.setRequestHeader(b5, b9[b5])
                        }
                    } catch(b6) {}
                    b8.send((e.hasContent && e.data) || null);
                    b3 = function(cc, cb) {
                        var ca, cd, cg, ce;
                        try {
                            if (b3 && (cb || b8.readyState === 4)) {
                                b3 = aG;
                                if (b7) {
                                    b8.onreadystatechange = bJ.noop;
                                    if (aP) {
                                        delete ah[b7]
                                    }
                                }
                                if (cb) {
                                    if (b8.readyState !== 4) {
                                        b8.abort()
                                    }
                                } else {
                                    ce = {};
                                    ca = b8.status;
                                    cd = b8.getAllResponseHeaders();
                                    if (typeof b8.responseText === "string") {
                                        ce.text = b8.responseText
                                    }
                                    try {
                                        cg = b8.statusText
                                    } catch(cf) {
                                        cg = ""
                                    }
                                    if (!ca && e.isLocal && !e.crossDomain) {
                                        ca = ce.text ? 200 : 404
                                    } else {
                                        if (ca === 1223) {
                                            ca = 204
                                        }
                                    }
                                }
                            }
                        } catch(ch) {
                            if (!cb) {
                                b4( - 1, ch)
                            }
                        }
                        if (ce) {
                            b4(ca, cg, ce, cd)
                        }
                    };
                    if (!e.async) {
                        b3()
                    } else {
                        if (b8.readyState === 4) {
                            setTimeout(b3)
                        } else {
                            b7 = ++ay;
                            if (aP) {
                                if (!ah) {
                                    ah = {};
                                    bJ(a2).unload(aP)
                                }
                                ah[b7] = b3
                            }
                            b8.onreadystatechange = b3
                        }
                    }
                },
                abort: function() {
                    if (b3) {
                        b3(aG, true)
                    }
                }
            }
        }
    })
}
var K, ad, bR = /^(?:toggle|show|hide)$/,
bK = new RegExp("^(?:([+-])=|)(" + bA + ")([a-z%]*)$", "i"),
bQ = /queueHooks$/,
aB = [h],
a0 = {
    "*": [function(e, b9) {
        var b5, ca, cb = this.createTween(e, b9),
        b6 = bK.exec(b9),
        b7 = cb.cur(),
        b3 = +b7 || 0,
        b4 = 1,
        b8 = 20;
        if (b6) {
            b5 = +b6[2];
            ca = b6[3] || (bJ.cssNumber[e] ? "": "px");
            if (ca !== "px" && b3) {
                b3 = bJ.css(cb.elem, e, true) || b5 || 1;
                do {
                    b4 = b4 || ".5";
                    b3 = b3 / b4;
                    bJ.style(cb.elem, e, b3 + ca)
                } while ( b4 !== ( b4 = cb . cur () / b7) && b4 !== 1 && --b8)
            }
            cb.unit = ca;
            cb.start = b3;
            cb.end = b6[1] ? b3 + (b6[1] + 1) * b5: b5
        }
        return cb
    }]
};
function bm() {
    setTimeout(function() {
        K = aG
    });
    return (K = bJ.now())
}
function be(b3, e) {
    bJ.each(e,
    function(b8, b6) {
        var b7 = (a0[b8] || []).concat(a0["*"]),
        b4 = 0,
        b5 = b7.length;
        for (; b4 < b5; b4++) {
            if (b7[b4].call(b3, b8, b6)) {
                return
            }
        }
    })
}
function f(b4, b8, cb) {
    var cc, e, b7 = 0,
    b3 = aB.length,
    ca = bJ.Deferred().always(function() {
        delete b6.elem
    }),
    b6 = function() {
        if (e) {
            return false
        }
        var ci = K || bm(),
        cf = Math.max(0, b5.startTime + b5.duration - ci),
        cd = cf / b5.duration || 0,
        ch = 1 - cd,
        ce = 0,
        cg = b5.tweens.length;
        for (; ce < cg; ce++) {
            b5.tweens[ce].run(ch)
        }
        ca.notifyWith(b4, [b5, ch, cf]);
        if (ch < 1 && cg) {
            return cf
        } else {
            ca.resolveWith(b4, [b5]);
            return false
        }
    },
    b5 = ca.promise({
        elem: b4,
        props: bJ.extend({},
        b8),
        opts: bJ.extend(true, {
            specialEasing: {}
        },
        cb),
        originalProperties: b8,
        originalOptions: cb,
        startTime: K || bm(),
        duration: cb.duration,
        tweens: [],
        createTween: function(cf, cd) {
            var ce = bJ.Tween(b4, b5.opts, cf, cd, b5.opts.specialEasing[cf] || b5.opts.easing);
            b5.tweens.push(ce);
            return ce
        },
        stop: function(ce) {
            var cd = 0,
            cf = ce ? b5.tweens.length: 0;
            if (e) {
                return this
            }
            e = true;
            for (; cd < cf; cd++) {
                b5.tweens[cd].run(1)
            }
            if (ce) {
                ca.resolveWith(b4, [b5, ce])
            } else {
                ca.rejectWith(b4, [b5, ce])
            }
            return this
        }
    }),
    b9 = b5.props;
    am(b9, b5.opts.specialEasing);
    for (; b7 < b3; b7++) {
        cc = aB[b7].call(b5, b4, b9, b5.opts);
        if (cc) {
            return cc
        }
    }
    be(b5, b9);
    if (bJ.isFunction(b5.opts.start)) {
        b5.opts.start.call(b4, b5)
    }
    bJ.fx.timer(bJ.extend(b6, {
        elem: b4,
        anim: b5,
        queue: b5.opts.queue
    }));
    return b5.progress(b5.opts.progress).done(b5.opts.done, b5.opts.complete).fail(b5.opts.fail).always(b5.opts.always)
}
function am(b5, b7) {
    var b6, b4, b3, b8, e;
    for (b3 in b5) {
        b4 = bJ.camelCase(b3);
        b8 = b7[b4];
        b6 = b5[b3];
        if (bJ.isArray(b6)) {
            b8 = b6[1];
            b6 = b5[b3] = b6[0]
        }
        if (b3 !== b4) {
            b5[b4] = b6;
            delete b5[b3]
        }
        e = bJ.cssHooks[b4];
        if (e && "expand" in e) {
            b6 = e.expand(b6);
            delete b5[b4];
            for (b3 in b6) {
                if (! (b3 in b5)) {
                    b5[b3] = b6[b3];
                    b7[b3] = b8
                }
            }
        } else {
            b7[b4] = b8
        }
    }
}
bJ.Animation = bJ.extend(f, {
    tweener: function(b3, b6) {
        if (bJ.isFunction(b3)) {
            b6 = b3;
            b3 = ["*"]
        } else {
            b3 = b3.split(" ")
        }
        var b5, e = 0,
        b4 = b3.length;
        for (; e < b4; e++) {
            b5 = b3[e];
            a0[b5] = a0[b5] || [];
            a0[b5].unshift(b6)
        }
    },
    prefilter: function(b3, e) {
        if (e) {
            aB.unshift(b3)
        } else {
            aB.push(b3)
        }
    }
});
function h(b6, cc, e) {
    var b4, cb, b5, ce, ci, b8, ch, cg, cf, b7 = this,
    b3 = b6.style,
    cd = {},
    ca = [],
    b9 = b6.nodeType && P(b6);
    if (!e.queue) {
        cg = bJ._queueHooks(b6, "fx");
        if (cg.unqueued == null) {
            cg.unqueued = 0;
            cf = cg.empty.fire;
            cg.empty.fire = function() {
                if (!cg.unqueued) {
                    cf()
                }
            }
        }
        cg.unqueued++;
        b7.always(function() {
            b7.always(function() {
                cg.unqueued--;
                if (!bJ.queue(b6, "fx").length) {
                    cg.empty.fire()
                }
            })
        })
    }
    if (b6.nodeType === 1 && ("height" in cc || "width" in cc)) {
        e.overflow = [b3.overflow, b3.overflowX, b3.overflowY];
        if (bJ.css(b6, "display") === "inline" && bJ.css(b6, "float") === "none") {
            if (!bJ.support.inlineBlockNeedsLayout || bE(b6.nodeName) === "inline") {
                b3.display = "inline-block"
            } else {
                b3.zoom = 1
            }
        }
    }
    if (e.overflow) {
        b3.overflow = "hidden";
        if (!bJ.support.shrinkWrapBlocks) {
            b7.always(function() {
                b3.overflow = e.overflow[0];
                b3.overflowX = e.overflow[1];
                b3.overflowY = e.overflow[2]
            })
        }
    }
    for (cb in cc) {
        ce = cc[cb];
        if (bR.exec(ce)) {
            delete cc[cb];
            b8 = b8 || ce === "toggle";
            if (ce === (b9 ? "hide": "show")) {
                continue
            }
            ca.push(cb)
        }
    }
    b5 = ca.length;
    if (b5) {
        ci = bJ._data(b6, "fxshow") || bJ._data(b6, "fxshow", {});
        if ("hidden" in ci) {
            b9 = ci.hidden
        }
        if (b8) {
            ci.hidden = !b9
        }
        if (b9) {
            bJ(b6).show()
        } else {
            b7.done(function() {
                bJ(b6).hide()
            })
        }
        b7.done(function() {
            var cj;
            bJ._removeData(b6, "fxshow");
            for (cj in cd) {
                bJ.style(b6, cj, cd[cj])
            }
        });
        for (cb = 0; cb < b5; cb++) {
            b4 = ca[cb];
            ch = b7.createTween(b4, b9 ? ci[b4] : 0);
            cd[b4] = ci[b4] || bJ.style(b6, b4);
            if (! (b4 in ci)) {
                ci[b4] = ch.start;
                if (b9) {
                    ch.end = ch.start;
                    ch.start = b4 === "width" || b4 === "height" ? 1 : 0
                }
            }
        }
    }
}
function G(b4, b3, b6, e, b5) {
    return new G.prototype.init(b4, b3, b6, e, b5)
}
bJ.Tween = G;
G.prototype = {
    constructor: G,
    init: function(b5, b3, b7, e, b6, b4) {
        this.elem = b5;
        this.prop = b7;
        this.easing = b6 || "swing";
        this.options = b3;
        this.start = this.now = this.cur();
        this.end = e;
        this.unit = b4 || (bJ.cssNumber[b7] ? "": "px")
    },
    cur: function() {
        var e = G.propHooks[this.prop];
        return e && e.get ? e.get(this) : G.propHooks._default.get(this)
    },
    run: function(b4) {
        var b3, e = G.propHooks[this.prop];
        if (this.options.duration) {
            this.pos = b3 = bJ.easing[this.easing](b4, this.options.duration * b4, 0, 1, this.options.duration)
        } else {
            this.pos = b3 = b4
        }
        this.now = (this.end - this.start) * b3 + this.start;
        if (this.options.step) {
            this.options.step.call(this.elem, this.now, this)
        }
        if (e && e.set) {
            e.set(this)
        } else {
            G.propHooks._default.set(this)
        }
        return this
    }
};
G.prototype.init.prototype = G.prototype;
G.propHooks = {
    _default: {
        get: function(b3) {
            var e;
            if (b3.elem[b3.prop] != null && (!b3.elem.style || b3.elem.style[b3.prop] == null)) {
                return b3.elem[b3.prop]
            }
            e = bJ.css(b3.elem, b3.prop, "");
            return ! e || e === "auto" ? 0 : e
        },
        set: function(e) {
            if (bJ.fx.step[e.prop]) {
                bJ.fx.step[e.prop](e)
            } else {
                if (e.elem.style && (e.elem.style[bJ.cssProps[e.prop]] != null || bJ.cssHooks[e.prop])) {
                    bJ.style(e.elem, e.prop, e.now + e.unit)
                } else {
                    e.elem[e.prop] = e.now
                }
            }
        }
    }
};
G.propHooks.scrollTop = G.propHooks.scrollLeft = {
    set: function(e) {
        if (e.elem.nodeType && e.elem.parentNode) {
            e.elem[e.prop] = e.now
        }
    }
};
bJ.each(["toggle", "show", "hide"],
function(b3, e) {
    var b4 = bJ.fn[e];
    bJ.fn[e] = function(b5, b7, b6) {
        return b5 == null || typeof b5 === "boolean" ? b4.apply(this, arguments) : this.animate(bI(e, true), b5, b7, b6)
    }
});
bJ.fn.extend({
    fadeTo: function(e, b5, b4, b3) {
        return this.filter(P).css("opacity", 0).show().end().animate({
            opacity: b5
        },
        e, b4, b3)
    },
    animate: function(b8, b5, b7, b6) {
        var b4 = bJ.isEmptyObject(b8),
        e = bJ.speed(b5, b7, b6),
        b3 = function() {
            var b9 = f(this, bJ.extend({},
            b8), e);
            b3.finish = function() {
                b9.stop(true)
            };
            if (b4 || bJ._data(this, "finish")) {
                b9.stop(true)
            }
        };
        b3.finish = b3;
        return b4 || e.queue === false ? this.each(b3) : this.queue(e.queue, b3)
    },
    stop: function(b4, b3, e) {
        var b5 = function(b6) {
            var b7 = b6.stop;
            delete b6.stop;
            b7(e)
        };
        if (typeof b4 !== "string") {
            e = b3;
            b3 = b4;
            b4 = aG
        }
        if (b3 && b4 !== false) {
            this.queue(b4 || "fx", [])
        }
        return this.each(function() {
            var b9 = true,
            b6 = b4 != null && b4 + "queueHooks",
            b8 = bJ.timers,
            b7 = bJ._data(this);
            if (b6) {
                if (b7[b6] && b7[b6].stop) {
                    b5(b7[b6])
                }
            } else {
                for (b6 in b7) {
                    if (b7[b6] && b7[b6].stop && bQ.test(b6)) {
                        b5(b7[b6])
                    }
                }
            }
            for (b6 = b8.length; b6--;) {
                if (b8[b6].elem === this && (b4 == null || b8[b6].queue === b4)) {
                    b8[b6].anim.stop(e);
                    b9 = false;
                    b8.splice(b6, 1)
                }
            }
            if (b9 || !e) {
                bJ.dequeue(this, b4)
            }
        })
    },
    finish: function(e) {
        if (e !== false) {
            e = e || "fx"
        }
        return this.each(function() {
            var b5, b8 = bJ._data(this),
            b4 = b8[e + "queue"],
            b3 = b8[e + "queueHooks"],
            b7 = bJ.timers,
            b6 = b4 ? b4.length: 0;
            b8.finish = true;
            bJ.queue(this, e, []);
            if (b3 && b3.cur && b3.cur.finish) {
                b3.cur.finish.call(this)
            }
            for (b5 = b7.length; b5--;) {
                if (b7[b5].elem === this && b7[b5].queue === e) {
                    b7[b5].anim.stop(true);
                    b7.splice(b5, 1)
                }
            }
            for (b5 = 0; b5 < b6; b5++) {
                if (b4[b5] && b4[b5].finish) {
                    b4[b5].finish.call(this)
                }
            }
            delete b8.finish
        })
    }
});
function bI(b4, b6) {
    var b5, e = {
        height: b4
    },
    b3 = 0;
    b6 = b6 ? 1 : 0;
    for (; b3 < 4; b3 += 2 - b6) {
        b5 = bT[b3];
        e["margin" + b5] = e["padding" + b5] = b4
    }
    if (b6) {
        e.opacity = e.width = b4
    }
    return e
}
bJ.each({
    slideDown: bI("show"),
    slideUp: bI("hide"),
    slideToggle: bI("toggle"),
    fadeIn: {
        opacity: "show"
    },
    fadeOut: {
        opacity: "hide"
    },
    fadeToggle: {
        opacity: "toggle"
    }
},
function(e, b3) {
    bJ.fn[e] = function(b4, b6, b5) {
        return this.animate(b3, b4, b6, b5)
    }
});
bJ.speed = function(b4, b5, b3) {
    var e = b4 && typeof b4 === "object" ? bJ.extend({},
    b4) : {
        complete: b3 || !b3 && b5 || bJ.isFunction(b4) && b4,
        duration: b4,
        easing: b3 && b5 || b5 && !bJ.isFunction(b5) && b5
    };
    e.duration = bJ.fx.off ? 0 : typeof e.duration === "number" ? e.duration: e.duration in bJ.fx.speeds ? bJ.fx.speeds[e.duration] : bJ.fx.speeds._default;
    if (e.queue == null || e.queue === true) {
        e.queue = "fx"
    }
    e.old = e.complete;
    e.complete = function() {
        if (bJ.isFunction(e.old)) {
            e.old.call(this)
        }
        if (e.queue) {
            bJ.dequeue(this, e.queue)
        }
    };
    return e
};
bJ.easing = {
    linear: function(e) {
        return e
    },
    swing: function(e) {
        return 0.5 - Math.cos(e * Math.PI) / 2
    }
};
bJ.timers = [];
bJ.fx = G.prototype.init;
bJ.fx.tick = function() {
    var b4, b3 = bJ.timers,
    e = 0;
    K = bJ.now();
    for (; e < b3.length; e++) {
        b4 = b3[e];
        if (!b4() && b3[e] === b4) {
            b3.splice(e--, 1)
        }
    }
    if (!b3.length) {
        bJ.fx.stop()
    }
    K = aG
};
bJ.fx.timer = function(e) {
    if (e() && bJ.timers.push(e)) {
        bJ.fx.start()
    }
};
bJ.fx.interval = 13;
bJ.fx.start = function() {
    if (!ad) {
        ad = setInterval(bJ.fx.tick, bJ.fx.interval)
    }
};
bJ.fx.stop = function() {
    clearInterval(ad);
    ad = null
};
bJ.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
};
bJ.fx.step = {};
if (bJ.expr && bJ.expr.filters) {
    bJ.expr.filters.animated = function(e) {
        return bJ.grep(bJ.timers,
        function(b3) {
            return e === b3.elem
        }).length
    }
}
bJ.fn.offset = function(b3) {
    if (arguments.length) {
        return b3 === aG ? this: this.each(function(b8) {
            bJ.offset.setOffset(this, b3, b8)
        })
    }
    var e, b7, b5 = {
        top: 0,
        left: 0
    },
    b4 = this[0],
    b6 = b4 && b4.ownerDocument;
    if (!b6) {
        return
    }
    e = b6.documentElement;
    if (!bJ.contains(e, b4)) {
        return b5
    }
    if (typeof b4.getBoundingClientRect !== aC) {
        b5 = b4.getBoundingClientRect()
    }
    b7 = bp(b6);
    return {
        top: b5.top + (b7.pageYOffset || e.scrollTop) - (e.clientTop || 0),
        left: b5.left + (b7.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
    }
};
bJ.offset = {
    setOffset: function(b5, ce, b8) {
        var b9 = bJ.css(b5, "position");
        if (b9 === "static") {
            b5.style.position = "relative"
        }
        var b7 = bJ(b5),
        b3 = b7.offset(),
        e = bJ.css(b5, "top"),
        cc = bJ.css(b5, "left"),
        cd = (b9 === "absolute" || b9 === "fixed") && bJ.inArray("auto", [e, cc]) > -1,
        cb = {},
        ca = {},
        b4,
        b6;
        if (cd) {
            ca = b7.position();
            b4 = ca.top;
            b6 = ca.left
        } else {
            b4 = parseFloat(e) || 0;
            b6 = parseFloat(cc) || 0
        }
        if (bJ.isFunction(ce)) {
            ce = ce.call(b5, b8, b3)
        }
        if (ce.top != null) {
            cb.top = (ce.top - b3.top) + b4
        }
        if (ce.left != null) {
            cb.left = (ce.left - b3.left) + b6
        }
        if ("using" in ce) {
            ce.using.call(b5, cb)
        } else {
            b7.css(cb)
        }
    }
};
bJ.fn.extend({
    position: function() {
        if (!this[0]) {
            return
        }
        var b4, b5, e = {
            top: 0,
            left: 0
        },
        b3 = this[0];
        if (bJ.css(b3, "position") === "fixed") {
            b5 = b3.getBoundingClientRect()
        } else {
            b4 = this.offsetParent();
            b5 = this.offset();
            if (!bJ.nodeName(b4[0], "html")) {
                e = b4.offset()
            }
            e.top += bJ.css(b4[0], "borderTopWidth", true);
            e.left += bJ.css(b4[0], "borderLeftWidth", true)
        }
        return {
            top: b5.top - e.top - bJ.css(b3, "marginTop", true),
            left: b5.left - e.left - bJ.css(b3, "marginLeft", true)
        }
    },
    offsetParent: function() {
        return this.map(function() {
            var e = this.offsetParent || l.documentElement;
            while (e && (!bJ.nodeName(e, "html") && bJ.css(e, "position") === "static")) {
                e = e.offsetParent
            }
            return e || l.documentElement
        })
    }
});
bJ.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
},
function(b4, b3) {
    var e = /Y/.test(b3);
    bJ.fn[b4] = function(b5) {
        return bJ.access(this,
        function(b6, b9, b8) {
            var b7 = bp(b6);
            if (b8 === aG) {
                return b7 ? (b3 in b7) ? b7[b3] : b7.document.documentElement[b9] : b6[b9]
            }
            if (b7) {
                b7.scrollTo(!e ? b8: bJ(b7).scrollLeft(), e ? b8: bJ(b7).scrollTop())
            } else {
                b6[b9] = b8
            }
        },
        b4, b5, arguments.length, null)
    }
});
function bp(e) {
    return bJ.isWindow(e) ? e: e.nodeType === 9 ? e.defaultView || e.parentWindow: false
}
bJ.each({
    Height: "height",
    Width: "width"
},
function(e, b3) {
    bJ.each({
        padding: "inner" + e,
        content: b3,
        "": "outer" + e
    },
    function(b4, b5) {
        bJ.fn[b5] = function(b9, b8) {
            var b7 = arguments.length && (b4 || typeof b9 !== "boolean"),
            b6 = b4 || (b9 === true || b8 === true ? "margin": "border");
            return bJ.access(this,
            function(cb, ca, cc) {
                var cd;
                if (bJ.isWindow(cb)) {
                    return cb.document.documentElement["client" + e]
                }
                if (cb.nodeType === 9) {
                    cd = cb.documentElement;
                    return Math.max(cb.body["scroll" + e], cd["scroll" + e], cb.body["offset" + e], cd["offset" + e], cd["client" + e])
                }
                return cc === aG ? bJ.css(cb, ca, b6) : bJ.style(cb, ca, cc, b6)
            },
            b3, b7 ? b9: aG, b7, null)
        }
    })
});
a2.jQuery = a2.$ = bJ;
if (typeof define === "function" && define.amd && define.amd.jQuery) {
    define("jquery", [],
    function() {
        return bJ
    })
}
})(window);
var refreshImg = null;
var _top_;
var isDebug = false;
var two_isOpenClick = ["93", "95", "97", "99"];
var other_isOpenClick = ["93", "98", "99", "91", "95", "97"];isCanGP = function(c, b) {
    if ("1" == c) {
        var a = two_isOpenClick.length;
        for (var d = 0; d < a; d++) {
            if (b == two_isOpenClick[d]) {
                return true
            }
        }
        return false
    } else {
        var a = other_isOpenClick.length;
        for (var d = 0; d < a; d++) {
            if (b == other_isOpenClick[d]) {
                return true
            }
        }
        return false
    }
};
function isLogin() {
    if ("undefined" != typeof(sessionInit) && (sessionInit) && (null != sessionInit)) {
        $("#login_user").attr("href", ctx + "index/initMy12306");
        $("#login_user").prev("span").html("您好，");
        $("#login_user").html(sessionInit);
        $("#regist_out").attr("href", ctx + "login/loginOut");
        $("#regist_out").html("退出")
    } else {
        $("#login_user").attr("href", ctx + "login/init");
        $("#login_user").prev("span").html("您好，请&nbsp");
        $("#login_user").html("登录");
        $("#regist_out").attr("href", ctx + "regist/init");
        $("#regist_out").html("注册")
    }
}
function loginAsyn(a) {
    if (a != null) {
        $("#login_user").attr("href", ctx + "index/initMy12306");
        $("#login_user").prev("span").html("意见反馈:<a class='cursor colorA' href='mailto:12306yjfk@rails.com.cn'>12306yjfk@rails.com.cn</a> 您好，");
        $("#login_user").html(a);
        $("#regist_out").attr("href", ctx + "login/loginOut");
        $("#regist_out").html("退出")
    } else {
        $("#login_user").attr("href", ctx + "login/init");
        $("#login_user").prev("span").html("意见反馈:<a class='cursor colorA' href='mailto:12306yjfk@rails.com.cn'>12306yjfk@rails.com.cn</a> 您好，请&nbsp");
        $("#login_user").html("登录");
        $("#regist_out").attr("href", ctx + "regist/init");
        $("#regist_out").html("注册")
    }
}
function _initGuideShow(b) {
    var a = $(".nav-list a");
    a.removeClass("on");
    $("#js-xd").find(".nav-list").show();
    $("#js-xd").unbind("mouseout");
    $("#js-xd").unbind("mouseover");
    $.each(a,
    function(c) {
        if (c == b) {
            $(a[c]).addClass("on");
            return
        }
    })
}
function checkHover(b, a) {
    if (getEvent(b).type == "mouseover") {
        return ! contains(a, getEvent(b).relatedTarget || getEvent(b).fromElement) && !((getEvent(b).relatedTarget || getEvent(b).fromElement) === a)
    } else {
        return ! contains(a, getEvent(b).relatedTarget || getEvent(b).toElement) && !((getEvent(b).relatedTarget || getEvent(b).toElement) === a)
    }
}
function getEvent(a) {
    return a || window.event
}
function contains(a, b) {
    if (a.contains) {
        return a != b && a.contains(b)
    } else {
        return !! (a.compareDocumentPosition(b) & 16)
    }
}
function initPageTitle(b) {
    $(".nav ul li").not("#js-xd li").eq(b).children("a").addClass("current");
    var c = $(".nav ul li a").not(".nav-list a");
    for (var a = 0; a < c.length; a++) {
        if (b != a) {
            c.eq(a).on("mouseenter",
            function() {
                $(this).addClass("current")
            }).on("mouseleave",
            function() {
                $(this).removeClass("current")
            })
        }
    }
}
function initNameNotice() {
    $("#name_rule").mouseenter(function(c) {
        var a = c.pageY + 10;
        var b = c.pageX;
        $(".name-tips").eq(0).css({
            top: a,
            left: b
        });
        $(".name-tips").eq(0).show()
    });
    $("#name_rule").mouseleave(function() {
        $(".name-tips").hide()
    })
}
clickCheckBoxName = function() {
    $("input[class='check']").each(function() {
        var c = $(this);
        var a = c.next("label").attr("for");
        var b = c.attr("id");
        if (null == b || "" == b || "undefined" == b) {
            var b = "checkbox_" + generateMixed();
            c.attr("id", b)
        }
        c.next("label").attr("for", b).css("cursor", "pointer")
    })
};
function generateMixed() {
    var b = "";
    var c = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (var a = 0; a < 10; a++) {
        var d = Math.ceil(Math.random() * 61);
        b += c[d]
    }
    return b
}
function showHelpName() {
    $.ajax({
        url: "../login/existUser",
        type: "POST",
        success: function(a) {
            if (a.success) {
                sessionInit = a.name;
                if ("undefined" != typeof(sessionInit) && (sessionInit) && (null != sessionInit)) {
                    $("#login_user").attr("href", "../index/initMy12306");
                    $("#login_user").prev("span").html("意见反馈:<a class='cursor colorA' href='mailto:12306yjfk@rails.com.cn'>12306yjfk@rails.com.cn</a> 您好，");
                    $("#login_user").html(sessionInit);
                    $("#regist_out").attr("href", "../login/loginOut");
                    $("#regist_out").html("退出")
                } else {
                    $("#login_user").attr("href", "../login/init");
                    $("#login_user").prev("span").html("意见反馈:<a class='cursor colorA' href='mailto:12306yjfk@rails.com.cn'>12306yjfk@rails.com.cn</a> 您好，请&nbsp");
                    $("#login_user").html("登录");
                    $("#regist_out").attr("href", "../regist/init");
                    $("#regist_out").html("注册")
                }
            }
        }
    })
}
function controContentHeight() {
    var e = 0;
    var b = 0;
    if (window.attachEvent) {
        var a = navigator.appVersion;
        if (a.indexOf("MSIE 7.0") >= 0) {
            e = 53
        } else {
            e = 80;
            if (!document.getElementById("forget_password_id")) {
                b = 12
            }
        }
    } else {
        e = 78;
        if (!document.getElementById("forget_password_id")) {
            b = 15
        }
    }
    var c = 0;
    if (!$(".nav-list").is(":hidden")) {
        c = $(".nav-list").height()
    }
    var d = $(window).height() - $(".header").height() - $(".footer").height() - e + b - c;
    if (d > 400) {
        if ($("#scroll").css("display") == "block") {
            $(".content").css("min-height", d - 30)
        } else {
            $(".content").css("min-height", d)
        }
    }
}
jQuery.extend({
    showNotice: function() {
        if ("undefined" == typeof(isShowNotice) || "N" != isShowNotice) {
            $("#scroll").css("display", "block");
            var c = "<li><a >“网上购票”可购买预售期内不晚于开车前30分钟的列车车票；“网上订票”可预订4至20日列车车票。</a></li>";
            if (noticeContent && "undefined" != typeof(noticeContent)) {
                var b = noticeContent.length;
                if (b > 0) {
                    for (var a = 0; a < b; a++) {
                        c += "<li><a>" + noticeContent[a] + "</a></li>"
                    }
                }
            }
            $("#scroll .notice_in ul").html(c)
        } else {
            if ("N" == isShowNotice) {
                $("#scroll").hide();
                $("div.ban-area").hide()
            }
        }
    }
});$(function() {
    var d = 0;
    $(document).ready(function() {
        if ("undefined" == typeof(sessionInit)) {
            showHelpName()
        } else {}
        controContentHeight();
        $(".menu-list").on("mouseover",
        function(e) {
            if (checkHover(e, this)) {
                d = 1
            }
        }).on("mouseleave",
        function() {
            d = 0;
            $(".menu-list").hide()
        });
        $(".nav>ul>li>a").click(function() {
            $(".nav>ul>li").removeClass();
            $(this).parent().addClass("current")
        });
        $(".notice_in ul a").click(function() {
            otsRedirect("post", ctx + "index/showAnnouncement")
        });
        if ($(".phone-link").html() == undefined) {
            $(".login-info").prepend("<div class='phone-link'><a href='../appDownload/init'>手机版</a></div>")
        }
        b()
    });
    function b() {
        document.body.appendChild($('<a href="#" id="_return_top" class="return-top" title="返回顶部" style="display: block;"></a>')[0]);
        var e = !window.XMLHttpRequest;
        $("#_return_top").css({
            position: e ? "absolute": "fixed",
            bottom: "30px",
            right: "30px"
        }).goToTop(5);
        $(window).on("scroll resize",
        function() {
            $("#_return_top").goToTop(5)
        })
    }
    $("#js-my").on("mouseover",
    function() {
        if (a) {
            clearTimeout(a)
        }
        $(".menu-list").show()
    });
    var a = null;
    $("#js-my").on("mouseout",
    function() {
        a = setTimeout(function() {
            if (d != 1) {
                d = 0;
                $(".menu-list").hide()
            }
        },
        120)
    });
    $("#js-xd").on("mouseover",
    function() {
        if (c) {
            clearTimeout(c)
        }
        $("#js-xd").addClass("nav-guide");
        $(this).find(".nav-list").show()
    });
    var c = null;
    $("#js-xd").on("mouseout",
    function(e) {
        var f = $(this);
        c = setTimeout(function() {
            f.find(".nav-list").hide()
        },
        120)
    });
    $(".pos-rel input").focus(function() {
        $(this).next().show();
        $(this).css("border", "1px solid #2D8DCF")
    });
    $(".pos-rel input").blur(function() {
        $(this).next().hide();
        $(this).css("border", "1px solid #CFCDC7")
    });
    $("#scroll>a:last").click(function() {
        $.ajax({
            url: ctx + "Notice/showNotice",
            type: "POST",
            success: function(e) {
                if (e.status) {
                    $("#scroll").hide();
                    $("div.ban-area").hide()
                }
            }
        })
    });
    if (!window.debug) {
        window.debug = function(f) {
            try {
                if (!window.console) {
                    window.console = {};
                    window.console.log = function() {
                        return
                    }
                }
                if (isDebug) {
                    window.console.log(f + " ")
                }
            } catch(g) {}
        }
    }
}); (function(a) {
    a.fn.goToTop = function(d) {
        var e = a(window);
        var c = a(this);
        var b = (e.scrollTop() > d) ? true: false;
        if (b) {
            c.stop().show()
        } else {
            c.stop().hide()
        }
        return this
    };
    a.fn.headerFloat = function() {
        var b = function(c) {
            var d = false;
            a(window).on("scroll resize",
            function() {
                var e = a(this).scrollTop();
                if (!d) {
                    d = c.position().left - 1
                }
                _top_ = c.position().top;
                if (e > _top_ + 30) {
                    if (! (navigator.appVersion.indexOf("MSIE 6") > -1)) {
                        a("#floatTable")[0].style.position = "fixed";
                        a("#floatTable")[0].style.top = 0;
                        a("#floatTable").css("z-index", "1900");
                        a("#floatTable").css("left", d)
                    } else {
                        a("#floatTable").css({
                            position: "absolute",
                            top: e,
                            left: d
                        })
                    }
                    a("#floatTable").show()
                } else {
                    a("#floatTable").css({
                        top: _top_
                    });
                    a("#floatTable").hide()
                }
            })
        };
        return a(this).each(function() {
            b(a(this))
        })
    }
})(jQuery); (function(a) {
    var b = true;
    jQuery.extend({
        sidebar_init: function(c) {
            var d = a("dt,dd");
            d.hover(function() {
                a.removeAllClass();
                a(this).addClass("cur");
                a(".nav-label").css("top", a(this).position().top - 1).show();
                a(this).children("a").hover(function() {
                    a(this).addClass("cur-txt")
                },
                function() {
                    a(this).removeClass("cur-txt")
                });
                a(this).prev().addClass("prev");
                b = false
            },
            function() {
                a(this).removeClass("cur");
                a(this).prev().removeClass("prev");
                a(this).children("a").removeClass("cur-txt");
                a(".nav-label").hide();
                b = true
            });
            if (c >= 0) {
                a.setCur(d, c);
                a(".sidebar").mouseout(function() {
                    if (b) {
                        a.removeAllClass();
                        a.setCur(d, c)
                    }
                })
            }
        },
        setCur: function(g, e) {
            if (g && e && e < g.length) {
                var d = g[e];
                a(d).addClass("cur");
                a(d).children("a").addClass("cur-txt");
                if (e > 0) {
                    var f = e - 1;
                    var c = g[f];
                    a(c).addClass("prev")
                }
                a(".nav-label").css("top", a(d).position().top - 1).show()
            }
        },
        removeAllClass: function() {
            a("dl > .cur").removeClass("cur");
            a(".cur-txt").removeClass("cur-txt");
            a("dl > .prev").removeClass("prev");
            a(".nav-label").hide()
        }
    });
    a(document).ready(function() {
        a("#link_4_myTicket").on("click",
        function() {});
        a("#dd_4_comOrder").on("click",
        function() {
            otsRedirect("post", ctx + "queryOrder/init")
        });
        a("#dd_4_NonComOrder").on("click",
        function() {
            otsRedirect("post", ctx + "queryOrder/initNoComplete")
        });
        a("#dd_4_showMyInfor").on("click",
        function() {
            otsRedirect("post", ctx + "modifyUser/initQueryUserInfo")
        });
        a("#dd_4_showSafe").on("click",
        function() {
            otsRedirect("post", ctx + "userSecurity/init")
        });
        a("#dd_4_passengerIns").on("click",
        function() {
            otsRedirect("post", ctx + "passengers/init")
        });
        a("#link_4_passengerIns").on("click",
        function() {
            otsRedirect("post", ctx + "passengers/init")
        });
        a("#dd_4_lostitems").on("click",
        function() {
            otsRedirect("post", ctx + "icentre/lostInfo")
        });
        a("#dd_4_qxyy").on("click",
        function() {
            otsRedirect("post", ctx + "icentre/qxyyInfo")
        });
        a("#dd_4_sjhy").on("click",
        function() {
            otsRedirect("post", ctx + "userSecurity/bindTel")
        });
        a("#link_4_sjhy").on("click",
        function() {
            otsRedirect("post", ctx + "userSecurity/bindTel")
        });
        a("#link_4_assignees").on("click",
        function() {
            otsRedirect("post", ctx + "assignee/init")
        });
        a("#link_4_pointReward").on("click",
        function() {});
        a("#link_4_myPoint").on("click",
        function() {
            otsRedirect("post", ctx + "integration/init")
        });
        a("#link_4_editMember").on("click",
        function() {
            otsRedirect("post", ctx + "index/initEdit")
        });
        a("#link_4_rewardInfor").on("click",
        function() {
            otsRedirect("post", ctx + "integration/rewardInfor")
        });
        a("#dd_4_address").on("click",
        function() {
            otsRedirect("post", ctx + "address/init")
        });
        a("#link_4_ticketInfo").on("click",
        function() {
            otsRedirect("post", ctx + "insurance/init")
        })
    })
})(jQuery);
/*!
 * 对jquery的ajax的封装，支持请求本地数据和请求远程http服务 该js必须放在jquery.js后面 同时还负责初始化各种js变量
 * ots_global.calendarLang 初始化calendar组件的国际化信息。
 */
var alertWarningMsg;
var alertWarningMsgByHeader;
var alertWarningMsgByTit_header; (function() {
    var e = null;
    $(document).ready(function() {
        e = b()
    });
    var a = null;
    if (typeof globalRepeatSubmitToken != "undefined") {
        a = globalRepeatSubmitToken
    }
    var j = null;
    var l = "_json_att";
    var d = "_es_hiddenform";
    var k = "<form  method='post' id='" + d + "'><input type='hidden' name='" + l + "'></input></form>";
    var h = $.ajax;
    ots_global = {};
    $.ajax = function(o, n) {
        if (typeof o == "object") {
            n = o;
            o = undefined
        }
        n = n || {};
        var m = n.isAlert || true;
        if (n.success) {
            var p = n.success;
            n.success = function(y, s, x) {
                if (y && y.c_url) {
                    window[y.c_name] = y.c_url
                }
                if (y && y.validateMessagesShowId) {
                    var w = y.messages;
                    if (w && w.length > 0) {
                        var v = "";
                        for (var u = 0; u < w.length; u++) {
                            v += w[u] + "\n"
                        }
                        dhtmlx.alert({
                            title: w["message.info"],
                            ok: w["button.ok"],
                            text: v,
                            callback: function() {
                                if (y.url) {
                                    window.location = ctx + y.url
                                }
                            }
                        })
                    }
                    var z = y.validateMessages;
                    var v = "";
                    for (var t in z) {
                        v += t + " :" + z[t] + "</br>"
                    }
                    if (y.attributes) {
                        j = y.attributes
                    }
                    if (y.repeatSubmitToken && y.repeatSubmitToken != "") {
                        a = y.repeatSubmitToken
                    }
                    if (v) {
                        if (m) {
                            dhtmlx.alert({
                                title: w["message.info"],
                                ok: w["button.ok"],
                                text: v,
                                callback: function() {
                                    p.call(this, y, s, x)
                                }
                            })
                        } else {
                            $("#" + y.validateMessagesShowId).html(v).show();
                            p.call(this, y, s, x)
                        }
                    } else {
                        $("#" + y.validateMessagesShowId).html("").hide();
                        p.call(this, y, s, x)
                    }
                } else {
                    p.call(this, y, s, x)
                }
            }
        }
        var r = n.data || {};
        var q = true;
        if (n.isTakeParam == false) {
            q = false
        }
        if (q) {
            if (j) {
                r[l] = j
            } else {
                r[l] = $("input[name=_json_att]").val()
            }
        }
        if ("undefined" != typeof(a) && a != null) {
            r.REPEAT_SUBMIT_TOKEN = a
        }
        n.data = r;
        h.call(this, o, n)
    };
    if (typeof otsRedirect == "undefined") {
        otsRedirect = function(r, o, p, q) {
            p = p || {};
            if (r && r == "post") {
                if ($("#" + d).length == 0) {
                    $(document.body).append(k)
                }
                if (j) {
                    $("#" + d + " input[name='" + l + "']").val(j)
                }
                $("#" + d + " input[name='" + l + "'] ~ input").remove();
                if (a != null) {
                    $("#" + d).append("<input type='hidden' name='REPEAT_SUBMIT_TOKEN'></input>");
                    $("#" + d + " input[name='REPEAT_SUBMIT_TOKEN']").val(a)
                }
                if (p) {
                    for (var n in p) {
                        var m = "<input type='hidden' name='" + n + "'></input>";
                        $("#" + d).append(m);
                        $("#" + d + " input[name='" + n + "']").val(p[n])
                    }
                }
                if (q != null) {
                    $("#" + d).attr("target", q)
                } else {
                    $("#" + d).removeAttr("target")
                }
                $("#" + d).attr("action", o);
                $("#" + d).submit()
            } else {
                if (j) {
                    if (o.indexOf("?") > 0) {
                        o += "&" + l + "=" + j
                    } else {
                        o += "?" + l + "=" + j
                    }
                }
                if (p) {
                    for (var n in p) {
                        if (o.indexOf("?") > 0) {
                            o += "&" + n + "=" + p[n]
                        } else {
                            o += "?" + n + "=" + p[n]
                        }
                    }
                }
                switch (q) {
                    case "_blank":
                        window.open(o);
                        break;
                    default:
                        window.location.href = o
                }
            }
        }
    } (function() {
        var m = {
            dateformat: "%Y-%m-%d",
            monthesFNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            monthesSNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            daysFNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            daysSNames: ["日", "一", "二", "三", "四", "五", "六"],
            weekstart: 1
        };
        ots_global.calendarLang = ots_global.calendarLang || {};
        ots_global.calendarLang.zh_CN = m
    })();
    function b() {
        var m = new dhtmlXWindows();
        m.enableAutoViewport(true);
        m.setSkin("dhx_terrace");
        m.setImagePath(ctx + "resources/js/rich/windows/imgs/");
        return m
    }
    alertWarningMsgByHeader = function(m) {
        alertWarningMsg(messages["message.info"], m, "", messages["button.ok"])
    };
    alertWarningMsgByTit_header = function(m, n) {
        alertWarningMsg(m, n, "", messages["button.ok"])
    };
    alertWarningMsg = function(p, s, n) {
        i(p, s, n, messages["button.ok"]);
        $("#qd_closeDefaultWarningWindowDialog_id").click(function() {
            f()
        });
        $("#gb_closeDefaultWarningWindowDialog_id").click(function() {
            f()
        });
        var r = "defaultwarningAlert_id";
        var o = c(r);
        var m = $(window).width() / 2 - 300;
        var q = g() + ($(window).height() / 2 - 200);
        o.setDimension($("#content_" + r).width(), $("#content_" + r).height() + 10);
        $(".dhtmlx_window_active").height($("#content_" + r).height());
        $(".dhtmlx_window_active").css({
            left: m + "px",
            top: q + "px"
        })
    };
    function g() {
        if ("pageYOffset" in window) {
            return window.pageYOffset
        } else {
            if (document.compatMode == "BackCompat") {
                return document.body.scrollTop
            } else {
                return document.documentElement.scrollTop
            }
        }
    }
    function i(o, q, m, p) {
        var n = '<div id="defaultwarningAlert_id" style="display:none;" ><div class="mark"></div><div class="up-box w600" id="content_defaultwarningAlert_id"><div class="up-box-hd" ><span id="content_defaultwarningAlert_title">' + o + '</span><a href="#nogo"id="gb_closeDefaultWarningWindowDialog_id">关闭</a></div><div class="up-box-bd"><div class="up-con clearfix"><span class="icon i-warn"></span> <div class="r-txt"><div class="tit" id="content_defaultwarningAlert_hearder" >' + q + '</div><P  id="content_defaultwarningAlert_body">' + m + '</P></div></div> <div class="lay-btn"><a href="#nogo" id="qd_closeDefaultWarningWindowDialog_id" class="btn92s">' + p + "</a></div></div></div></div>";
        $("body").append(n)
    }
    function c(n) {
        var m = e.createWindow(n + "_", 50, 10, 660, 100);
        m.attachObject(n);
        m.clearIcon();
        m.denyResize();
        m.setModal(true);
        m.center();
        m.button("park").hide();
        m.button("minmax1").hide();
        m.hideHeader();
        return m
    }
    function f() {
        var m = "defaultwarningAlert_id";
        if (e.isWindow(m + "_")) {
            e.window(m + "_").close()
        }
    }
})();