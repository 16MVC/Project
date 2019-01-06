
$(function () {

    //点击文本框，提示语消失
    var a = true;
    var b = null;
    $(document).ready(function () {
        $("#cd_codeText").on("focus",
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
    //点击查询 弹出消息框
    jQuery.extend({
        //正晚点查询
        _to_search: function () {
            $.ajax({
                url: "/Travelguide/getTrianarray",
                type: "get",
                dataType: "json",
                success: function (result) {
                    $.each(result, function (key, data) {
                        var n = '<div id="dialog_result" style="display: none;"><div class="mark"></div><div class="up-box"><div class="up-box-hd">正晚点查询结果<a id="dialog_result_close" href="javascript:" shape="rect">关闭</a></div><div class="up-box-bd"><div class="up-con clearfix"><span class="icon i-win"></span><div class="r-txt"><div class="tit" id="result_div"> ' + K604 + '次列车，正点' + 到达霍州站 + '的时间为<span class="colorA">' + 15;45+'</span>，列车正点到达 </div></div></div><div class="lay-btn"><a href="javascript:" id="dialog_result_ok" class="btn92s" shape="rect">确认</a></div> </div></div></div>';
                        $("body").append(n);
                    })
                }
            })
            $("#dialog_result").css("display", "block");
        }
    })

    //关闭消息框
    $("#dialog_result_ok").on("click",
        function () {
            $("#dialog_result").css("display", "none");
        })

    $("#dialog_result_close").on("click",
        function () {
            $("#dialog_result").css("display", "none");
        })


});



//刷新验证码
function getImage() {
    $("#img_rand_code").attr("src", "/Travelguide/Page_zwdch?time=" + Date());
}

//$(document).ready(function () {
   
//});

//(function ($) {
          
//})(jQuery);