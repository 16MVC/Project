
$(function () {
  
    if ((new Date).getHours() < 12) {
         user_regard = "先生,上午好！"
     } else {
         user_regard = "先生,下午好！"
     }
     user_name = "sa";
     $(".welcome-ft").hide();
     var c = "<h3><span>" + user_name + "</span>" + user_regard + "</h3>";
     c += "<p>欢迎您登录中国铁路客户服务中心网站。<br />";
     c += '<span style="color: red;">如果您的密码在其他网站也使用，建议您修改本网站密码。</span><br />';
     c += '<span style="color: red;">完成手机双向核验，即可使用手机号码直接登录的新服务，解除您遗忘用户名的烦恼。</span><br />';
     c += "</p>";
     $("#my12306page").html(c);

     
})


        
        