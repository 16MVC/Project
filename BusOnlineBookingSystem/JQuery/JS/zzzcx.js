$(function () {
    //点击文本框，提示语消失 
    $(document).ready(function () {
        $("#fromStationText").on("focus",
        function () {
            if ($(this).val() == "简拼/全拼/汉字") {
                $(this).val("");
                $(this).css("color", "#333")
            }
        }).on("blur",
        function () {
            if ($(this).val() == "") {
                $(this).val("简拼/全拼/汉字");
                $(this).css("color", "#999")
            }
        });
    });

    $(document).ready(function () {
        $("#toStationText").on("focus",
        function () {
            if ($(this).val() == "简拼/全拼/汉字") {
                $(this).val("");
                $(this).css("color", "#333")
            }
        }).on("blur",
        function () {
            if ($(this).val() == "") {
                $(this).val("简拼/全拼/汉字");
                $(this).css("color", "#999")
            }
        });
    });

    $(document).ready(function () {
        $("#fromStationText").on("focus",
        function () {
            if ($(this).val() == "简拼/全拼/汉字") {
                $(this).val("");
                $(this).css("color", "#333")
            }
        }).on("blur",
        function () {
            if ($(this).val() == "") {
                $(this).val("简拼/全拼/汉字");
                $(this).css("color", "#999")
            }
        });
    });

    $(document).ready(function () {
        $("#changeStationText").on("focus",
       function () {
           if ($(this).val() == "简拼/全拼/汉字") {
               $(this).val("");
               $(this).css("color", "#333")
           }
       }).on("blur",
       function () {
           if ($(this).val() == "") {
               $(this).val("简拼/全拼/汉字");
               $(this).css("color", "#999")
           }
       });

        var i = 0;
        var j = 0;
        //弹出出发地
        $("#from_station_imageB").click(function () {
            if (i == 0) {
                $("#form_cities2").css("display", "block");
                $("#form_cities2").css("top", "90px");
                $("#form_cities2").css("left", "500px");
                i = 1;
            } else {
                $("#form_cities2").css("display", "none");
                i = 0;
            }
        });
        //弹出目的地
        $("#to_station_imageB").click(function () {
            if (i == 0) {
                $("#form_cities2").css("display", "block");
                $("#form_cities2").css("top", "90px");
                $("#form_cities2").css("left", "750px");
                i = 1;
            } else {
                $("#form_cities2").css("display", "none");
                i = 0;
            }
        });
        //选择首字母
        $.stationFor12306 = {
            //选择首字母
            js: function (N) {
                var M;
                for (M = 1; M <= 7; M++) {
                    if (M == N) {
                        $("#ul_list" + M).css("display", "block");
                        $("#nav_list" + M).addClass("action");
                    }
                    else {
                        $("#ul_list" + M).css("display", "none");
                        $("#nav_list" + M).removeClass("action")
                    }
                }
            },
            pageDesigh: function () {
                alert("下一页");
            },
            //关闭选项
            closeShowCity: function () {
                $("#form_cities2").css("display", "none");
                i = 0;
            },
        }
        //自动搜索
        $("#radio_auto_search").on("click",
         function () {
             $("#li_no_change").addClass("no-change");
             $("#changeStationText").css("type", "hide");
             $("#other_changeStationText").css("type", "week");
         })
        //手工输入 
        $("#radio_input_search").on("click",
         function () {
             $("#li_no_change").removeClass("no-change");
             $("#changeStationText").css("type", "week");
             $("#other_changeStationText").css("type", "hide");
         })
        //查询
        $("#_a_search_btn").click(function () {
            $.ajax({
                url: "/Travelguide/getzzzcx",
                type: "get",
                dataType: "json",
                success: function (result) {
                    var s = 0;
                    //设置奇偶行样式
                    $.each(result, function (key, data) {
                        var sex = (key + 1) % 2 ? "偶" : "奇";
                        switch (sex) {
                            case "偶":
                                $("#_tableDatas").append("<tr><td>" + (key + 1) + "</td><td class='tl'>" + data.name + "</td><td class='tl'>" + data.address + "</td><td>" + data.businessHours + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td></tr>");
                                break;
                            case "奇":
                                $("#_tableDatas").append("<tr class='bgc'><td>" + (key + 1) + "</td><td class='tl'>" + data.name + "</td><td class='tl'>" + data.address + "</td><td>" + data.businessHours + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td><td>" + data.windownumber + "</td></tr>");
                                break;
                        }
                        s = key + 1;
                    })
                    if (result > 0) {
                        $("#_sear_tips").css("display","block");
                        var c = "";
                        c = '<p>搜索结果：<strong>' + $("#fromStationText").val() + '</strong>-&gt; <strong>' + $("#toStationText").val() + '</strong>共有' + s + '个中转站可供选择</p>';
                        $("#_sear_tips").append($(c)).show();
                    }
                }, error: function () {

                }
            })
        });


    });
    
    $.extend({

    })

});

//刷新验证码
function getImage() {
    $("#img_rand_code").attr("src", "/Travelguide/Page_zwdch?time=" + Date());
}