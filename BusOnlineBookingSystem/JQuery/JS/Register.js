$(function () {
    $(document).ready(function () {
        //$.checkValidate();
        //var c = document.getElementById('#userName').value;
    })
    
    //获取二代身份证号码倒数第二位数判断性别
    //var str = document.getElementById("cardCode");
    //spstr = str.split("");
    //num = spstr[spstr.length - 2];
    //var sex = num % 2 ? "男" : "女";
    //switch (sex) {
    //    case "男":

    //        break;
    //    case "女":

    //        break; 
    //}
    
    //绑定证件类型
    $.ajax({
        url: "/Main/getcardType",
        type: "get",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, data) {
                $("#cardType").append("<option value=" + data.value + ">" + data.name + "</option>");
            })
        }
    })
    //绑定乘客类型
    $.ajax({
        url: "/Main/getpassengertype",
        type: "get",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, data) {
                $("#passengerType").append("<option value=" + data.value + ">" + data.name + "</option>");
            })
        }
    })
    //绑定国家
    $.ajax({
        url: "/Main/getCountry",
        type: "get",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, data) {
                $("#nation").append("<option value=" + data.value + ">" + data.name + "</option>");
            })
        }
    })
    //绑定省份
    $.ajax({
        url: "/Main/getProvince",
        type: "get",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, data) {
                $("#province_code").append("<option value=" + data.value + ">" + data.name + "</option>");
            })
        }
    })

    jQuery.extend({
        Save: function () {
            //var reUser = $('#userName').val;
            //var rePaw = $('#passWord').val;
            //alert(reUser);
        },
        Return: function () {

        },
        changeForm: function (val) {
            if (val != 1) {
                $('.cardLi').css('display', 'block');
                $('.gjLi').css('display', 'block');
            } else {
                $('.cardLi').css('display', 'none');
                $('.gjLi').css('display', 'none');
            }
        },
        changePassenger: function (val) {
            if (val == 3) {
                $('.studentType').css('display', 'block');
            } else {
                $('.studentType').css('display', 'none');
            }
        },
        onMousemove: function () {
            $('.name-tips').css('display', 'block');
        },
        onMouseout: function () {
            $('.name-tips').css('display', 'none');
        },
        //checkValidate: function () {
        //    $("#registForm").validate({
        //        onkeyup: false,
        //        rules: {
        //            "loginUserDTO.user_name": {
        //                required: true,
        //                minlength: 6,
        //                maxlength: 30,
        //                checkWriteSpace: true,
        //                validateUsersName: true
        //            }
        //        },
        //        messages: {
        //            "loginUserDTO.user_name": {
        //                required: "请输入用户名！",
        //                minlength: "用户名长度不能少于6个字符！",
        //                maxlength: "用户名长度不能多于30个字符！",
        //                checkWriteSpace: "输入的用户名不能包含空格",
        //                validateUsersName: "用户名只能由字母、数字和_组成,须以字母开头！"
        //            }
        //        },
        //    })
        //},
    })

    //验证用户名不能有空格符
    //jQuery.validator.addMethod("checkWriteSpace",
        
    //    function (c, b) {
    //        for (var a = 0; a < c.length; a++) {
    //            if (c.charCodeAt(a) == 32) {
    //                return false
    //            }
    //        }
    //        return true
    //    },
    //"contain writespace");

    //验证用户名
    //jQuery.validator.addMethod("validateUsersName",
    //function (b, a) {
    //    return this.optional(a) || /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/.test(b)
    //},
    //"用户名只能由字母、数字或_组成");

});