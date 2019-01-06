$(function () {

    //绑定省份
    $.ajax({
        url: "/Travelguide/getProvince",
        type: "get",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, data) {
                $("#province").append("<option value=" + data.value + ">" + data.name + "</option>");
            })
        }
    })


    jQuery.extend({
        //查询
        _to_search: function () {
            if ($("#province").val() == "") {
                alert("请选择省份！");
                return
            }
            var g = $("#city").val();
            var f = $("#county").val();
            var e = $("#agencyName").val();
            if (g == "请选择市") {
                g = ""
            }
            if (f == "请选择区/县") {
                f = ""
            }
            if (e == "输入代售点名称") {
                e = ""
            }
            $("#_tableDatas").empty();
            $("#_sear_tips").empty();
            $.ajax({
                url: "/Travelguide/getTravelguide?ProvinceID=" + $("#province").val() + "&"
                        + "CityID=" + ($("#city").val() == "" ? "0" : $("#city").val()) + "&"
                        + "TownID=" + ($("#county").val() == "" ? "0" : $("#county").val()),
                type: "get",
                dataType: "json",
                success: function (result) {
                    var s = 0;
                    //设置奇偶行样式
                    $.each(result, function (key, data) {
                        var sex = (key+1) % 2 ? "偶" : "奇";
                        switch (sex) {
                            case "偶":
                                $("#_tableDatas").append("<tr><td>" + (key + 1) + "</td><td class='tl'>" + data.name + "</td><td class='tl'>" + data.address + "</td><td>" + data.businessHours + "</td><td>" + data.windownumber + "</td></tr>");
                                    break;
                            case "奇":
                                $("#_tableDatas").append("<tr class='bgc'><td>" + (key + 1) + "</td><td class='tl'>" + data.name + "</td><td class='tl'>" + data.address + "</td><td>" + data.businessHours + "</td><td>" + data.windownumber + "</td></tr>");
                                    break; 
                        }
                        s = key + 1;
                    })
                    if (result > 0) {
                        //显示查询代售点个数
                        var c = "";
                        if ($("#province").val() == $("#city").val()) {
                            c = $("#city").val() + "市" + $("#county").val()
                        } else {
                            c = $("#province").val();
                            if ($("#city").val() != "") {
                                c += $("#city").val() + "市"
                            }
                            c += $("#county").val();
                        }
                        var r = '<p><strong class="colorA">' + c;

                        r += '</strong>&nbsp;共有&nbsp;<strong class="colorA">' + s + "</strong>&nbsp;个代售点</p>";
                        $("#_sear_tips").append($(r)).show();
                    } 
                }
            })
        },
        //省份选项改变
        _change_province: function (val) {
            $("#city").empty();
            $("#county").empty();
            $.ajax({
                url: "/Travelguide/getCity?ProvinceID="+val,
                type: "get",
                dataType: "json",
                success: function (result) {
                    $("#city").append("<option value=''>请选择市</option>");
                    $("#county").append("<option value=''>请选择区/县</option>");
                    $.each(result, function (key, data) {
                        $("#city").append("<option value=" + data.value + ">" + data.name + "</option>");
                    })
                }, error: function () {
                    $("#city").append("<option value=''>请选择市</option>");
                    $("#county").append("<option value=''>请选择区/县</option>");
                }
            })
        },
        //城市选项改变
        _change_city: function (val) {
            $("#county").empty();
            $.ajax({
                url: "/Travelguide/getTown?CityID="+val,
                type: "get",
                dataType: "json",
                success: function (result) {
                    $("#county").append("<option value=''>请选择区/县</option>");
                    $.each(result, function (key, data) {
                        $("#county").append("<option value=" + data.value + ">" + data.name + "</option>");
                    })
                }, error: function () {
                    $("#county").append("<option value=''>请选择区/县</option>");
                }
            })
        },
        
    })


    //点击文本框，提示语消失
    var a = true;
    var b = null;
    $(document).ready(function () {
        $("#_submitBtn").css("cursor", "pointer");
        $("#_submitBtn").on("click",
        function () {
            if (a) {
                if (b) {
                    b.addFilter("agency_name", null, $("#agencyName").val(), false, "like")
                }
            }
        });
        $("#agencyName").on("focus",
        function () {
            if ($(this).val() == "输入代售点名称") {
                $(this).val("");
                $(this).css("color", "#333")
            }
        }).on("blur",
        function () {
            if ($(this).val() == "") {
                $(this).val("输入代售点名称");
                $(this).css("color", "#999")
            }
        }).on("keyup",
        function (d) {
            d = d || window.event;
            if (a) {
                if (b) {
                    b.addFilter("agency_name", null, $("#agencyName").val(), false, "like")
                }
            }
        });
    });

});



