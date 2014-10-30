
//搜索特定名字的style对象
function getstyle(sname) { 
    for (var i=0;i< document.styleSheets.length;i++) { 
        var rules; 
        if (document.styleSheets[i].cssRules) { 
            rules = document.styleSheets[i].cssRules; 
        } 
        else { 
            rules = document.styleSheets[i].rules; 
        } 
        for (var j=0;j< rules.length;j++) { 
            if (rules[j].selectorText == sname) { 
                return rules[j].style; 
            } 
        } 
    } 
}

//用户登录
//判断用户名和密码是否符合规则
//将用户名和密码发送到服务器
//接收服务器返回信息:0-用户名和密码错误;1-系统管理员;2-企业用户
//根据反馈信息，用户进入不同路径

//登录
document.onkeydown = function (e) {
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which;
    if (code == 13) {
        $("#login").click();
    }
} 

$(document).ready(function(){
    $("#login").click(function(){
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;
        var reg = /^([\u4E00-\u9FA5A-Za-z0-9])+$/;    //只允许汉字、字母和数字
        check_username=reg.test(username);
        check_password=reg.test(password);
        if (!check_username || !check_password){
            $(".error").css('display','inline');
            document.getElementById("error").innerHTML="用户名、密码错误。请确认后登录。";
        }
        else{
            $.post("/login",{username:username,password:password},function(data){
                if (data=="0") {
                    $(".error").css('display',"inline");
                    document.getElementById("error").innerHTML = "用户名或密码错误。";
                }
                else {
                    username = data['username']
                    user_role = data['user_role']
                    if (user_role == 'administrator'){
                        window.location.href = 'admin?username='+username;    //go to the administrator page
                    }
                    else if (user_role == 'customer'){
                        window.location.href = 'customer?username='+username;   //go to the customer page
                    }
                    else if(user_role=='Chinese'){
                        document.getElementById("error").innerHTML = "阁下不是本站会员，请阅读下文并注册。";
                    }
                    else{
                        window.location = '/';
                    }
                }
            });
        }
        
    })
})


//检验字符串是否在某数组中
function in_arry(string_search,arry_search){
    for (i=0;i<arry_search.length;i++){
        this_entry = arry_search[i].toString();
        if (this_entry == string_search){
            return true;
        }
    }
    return false;
}

//搜索公司名称
$(document).ready(function(){
    $("#searchcompany").click(function(){
        var companyname=document.getElementById("companyname").value.toLowerCase();
        var username=document.getElementById("username").value;
        var reg = /^([\u4E00-\u9FA5A-Za-z0-9])+$/;    //只允许汉字、字母和数字
        check_username=reg.test(companyname);
        
        var ban_word_list = new Array();
        ban_word_list[0] = "null";
        ban_word_list[1] = "None";
        ban_word_list[2] = "none";
        ban_word_list[3] = "empty";
        ban_word_list[4] = "EMPTY";

        if (!check_username){
            $("#error2").css('display','inline');
            document.getElementById("error2").innerHTML="公司名称有误，只能是数字、汉字、字母及其组合。";
        }
        else if (in_arry(companyname,ban_word_list)){
            $("#error2").css('display','inline');
            document.getElementById("error2").innerHTML="公司名称不合法。";
        }
        else{
            $.post("/search",{companyname:companyname,username:username},function(data){
                if (data=="0") {
                    $("#error2").css('display','inline');
                    document.getElementById("error2").innerHTML = "该公司不存在";
                }
                else {
                    window.location.href = 'search?username='+username+'&companyname='+companyname; 
                }
            });
        }
        
    })
})

//删除客户
//$(document).ready(function(){
//    $("#delete").click(function(){
//        var customer_name = document.getElementById("customername").value;
//        $.post("/detail",{customername:customer_name},function(data){
//            if (data=="0"){
//                alert("已经删除:"+customer_name);
//                window.location.href = 'manage?username=admin&page=1';
//            }
//            else{
//                alert("客户未能删除！");
//            }
//            });
//        });
//    })

//增加新客户
function check_input(word_input){
    var reg = /^([\u4E00-\u9FA5A-Za-z0-9])+$/;    //只允许汉字、字母和数字
    check_username=reg.test(word_input);
    if (check_username){return true;}
    else{return false;}
}

$(document).ready(function(){
    $("#addnewer").click(function(){
        var new_username = document.getElementById("username").value;
        var new_password = document.getElementById('password').value;
        var new_companyname = document.getElementById("companyname").value;
        var new_telphone = document.getElementById("telphone").value;
        var new_mobilephone = document.getElementById("mobilephone").value;
        var new_companyaddress = document.getElementById("companyaddress").value;
        
        var reg = /^([\u4E00-\u9FA5A-Za-z0-9])+$/;    //只允许汉字、字母和数字
        
        check_username = reg.test(new_username);
        check_password = reg.test(new_password);
        check_companyname = reg.test(new_companyname);
        check_telphone = reg.test(new_telphone);
        check_mobilephone = reg.test(new_mobilephone);
        check_companyaddress = reg.test(new_companyaddress);
        
        start_date = document.getElementById("datepicker_start").value;
        end_date = document.getElementById("datepicker_end").value;
        
        weixintype = $("input[name='weixintype']:checked").val();
        servertype = $("input[name='servertype']:checked").val();

        notes = document.getElementById("notes").value;
        
        weixin = document.getElementById("weixin").value;
        weixinpwd = document.getElementById("weixinpwd").value;
        token = document.getElementById("token").value;
        cus_url = document.getElementById("url").value;
        appid = document.getElementById("appid").value;
        appsecret = document.getElementById("appsecret").value;

        if (!check_username){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "账号·设置错误了。";}
        
        else if (!check_password){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "密码·设置错误了。";}
        
        else if (!check_companyname){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "公司名称-设置错误了。";}
        
        else if (!check_telphone){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "联系电话-设置错误了。";}
        
        else if (!check_mobilephone){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "联系手机-设置错误了。";}
        
        else if (!check_companyaddress){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "公司地址-设置错误了。";}
        
        else if (!start_date || !end_date){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "服务起止时间不能为空";}
        else if (start_date>end_date){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "结束时间不能早于开始时间。";}
        
        else if (!weixintype){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "微信类型-必须选择一种。";}
        else if (!servertype){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "服务类型-必须选择一种。";}

        else if (!weixin||!weixinpwd||!token||!cus_url||!appid||!appsecret){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "微信信息必须填写完整。";}
        
        else{
            var newer_info = {
                'username':new_username,
                'password':new_password,
                'telphone':new_telphone,
                'mobilephone':new_mobilephone,
                'companyname':new_companyname,
                'companyaddress':new_companyaddress,
                'startdate':start_date,
                'enddate':end_date,
                'weixintype':weixintype,
                'servertype':servertype,
                'notes':notes,
                'weixin':weixin,
                'weixinpwd':weixinpwd,
                'token':token,
                'cus_url':cus_url,
                'appid':appid,
                'appsecret':appsecret,
                }
            
            $.post("/new",{new_user:newer_info},function(data){
                if (data=="2"){
                    $("#error2").css("display","inline");
                    document.getElementById("error2").innerHTML = "此账号已经存在，请更换。";
                }
                else if (data=='0'){
                    alert('你已经成功添加了客户：'+new_username);
                    window.location = 'manage?username=admin&page=1'
                }
                else{
                    alert("运气很差了,没有添加成功。");
                }
            });
        }
    });
})
        

//显示日历
$(function(){
    $("#datepicker_start").prop("readOnly", true).datepicker();
    $("#datepicker_end").prop("readOnly",true).datepicker();
});

//更新客户信息-检查字符串
function check_null_character(string){
    reg = /^([\u4E00-\u9fa5aA-Za-z0-9])+$/;
    if (string ==""){return true;}
    else if(reg.test(string)){return true;}
    else{return false;}

}

//提交更新信息
$(document).ready(function(){
    $("#okredit").click(function(){
        var new_info = {}
        var new_password = document.getElementById('password').value;
        var new_telphone = document.getElementById("telphone").value;
        var new_mobilephone = document.getElementById("mobilephone").value;
        var new_companyaddress = document.getElementById("companyaddress").value;
        
        var reg = /^([\u4E00-\u9FA5A-Za-z0-9])+$/;    //只允许汉字、字母和数字
        
        check_password = check_null_character(new_password);
        check_telphone = check_null_character(new_telphone);
        check_mobilephone = check_null_character(new_mobilephone);
        check_companyaddress = check_null_character(new_companyaddress);
        
        start_date = document.getElementById("datepicker_start").value;
        end_date = document.getElementById("datepicker_end").value;
        
        weixintype = $("input[name='weixintype']:checked").val();
        servertype = $("input[name='servertype']:checked").val();

        notes = document.getElementById("notes").value;
        
        customer = document.getElementById("customername").value;

        weixin = document.getElementById("weixin").value;
        weixin_pwd = document.getElementById("weixin_pwd").value;
        weixin_token = document.getElementById("wx_token").value;
        weixin_url = document.getElementById("wx_url").value;
        weixin_appid = document.getElementById("wx_appid").value;
        weixin_secret = document.getElementById("wx_secret").value;

        if (!check_password){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "密码·设置错误了。";}
        
        else if (!check_telphone){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "联系电话-设置错误了。";}
        
        else if (!check_mobilephone){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "联系手机-设置错误了。";}
        
        else if (!check_companyaddress){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "公司地址-设置错误了。";}
        
        //else if (start_date>end_date){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "结束时间不能早于开始时间。";}
        
        else{
            var newer_info = {
                'customer':customer,
                }

            if (new_password){newer_info['password']=new_password;}
            if (new_telphone){newer_info['telphone']=new_telphone;}
            if (new_mobilephone){newer_info['mobilephone']=new_mobilephone;}
            if (new_companyaddress){newer_info['companyaddress']=new_companyaddress;}
            if (start_date){newer_info['start_time']=start_date;}
            if (end_date){newer_info['end_time']=end_date;}
            if (weixintype){newer_info['weixin_type']=weixintype;}
            if (servertype){newer_info['edit_type']=servertype;}
            if (notes){newer_info['note']=notes;}
            if (weixin){newer_info['weixin']=weixin;}
            if (weixin_pwd){newer_info['weixinpwd']=weixin_pwd;}
            if (weixin_token){newer_info['token']=weixin_token;}
            if (weixin_url){newer_info['cus_url']=weixin_url;}
            if (weixin_appid){newer_info['appid']=weixin_appid;}
            if (weixin_secret){newer_info['appsecret']=weixin_secret;}

            $.ajax({
                type:"POST",
                contentType:"application/x-www-form-urlencoded;charset=utf-8",
                url:"/redit",
                data:newer_info,
                dataType:'json',
                success:function(result){
                    if(result=='0'){
                        alert("你已经成功修改了此客户资料："+customer);
                        window.location = 'detail?username=admin&customer='+customer;
                    }else{
                    alert(result);
                    }
                }
            });
        }
    });
})

//提交图文信息
$(document).ready(function(){
    $("#postit").click(function(){
        var username = document.getElementById("username").value;
        var headline = document.getElementById("headline").value;
        var coverpicurl = document.getElementById('coverpicurl').value;
        var content = document.getElementById("editor_content").value;
        $.post("/picword",{username:username,headline:headline,coverpicurl:coverpicurl,content:content},function(data){
            if (data=='0'){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "此标题已经存在。为了便于用户检索，标题名称不能重复。";}
            else if (data=='false'){alert("由于网络原因，此文未能发布。");}
            else if (data=='1'){
                window.location = 'listarticles?username='+username+'&page=1';
            }
            else{
                window.location = 'article?username='+username+'&articleid='+data;
            }
        });
    });
})

//提交图文签名-客户用户编辑提交
$(document).ready(function(){
    $("#add_aboutme").click(function(){
        var username = document.getElementById("username").value;
        var content_signature = document.getElementById("signature").value;
        if (content_signature == ''){
            $("#error2").css('display','inline');document.getElementById("error2").innerHTML = "空白的，就别保存了。";
        }
        else{
        $.post("/customer",{username:username,content:content_signature},function(data){
            if (data=='0'){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "保存失败，或许是网络连接问题。";}
            else{
                window.location = 'customer?username='+username;
            }
        });
        }
    });
})

//提交首页公告信息(admin用户专用)
$(document).ready(function(){
    $("#postannounce").click(function(){
        var username = document.getElementById("username").value;
        var content = document.getElementById("editor_announce").value;
        $.post("/announce",{username:username,content:content},function(data){
            if (data=='false'){alert("由于网络原因，此文未能保存。");}
            else if (data=='1'){
                alert("已经保存好了。");
                window.location = 'admin?username=admin';
            }
            else{alert("当你看到这个提示的时候，说明保存没有成功。");}
        });
    });
})
//从新编辑图文信息之后提交
$(document).ready(function(){
    $("#repostit").click(function(){
        var username = document.getElementById("username").value;
        var headline = document.getElementById("headline").value;
        var coverpicurl = document.getElementById('edit_coverpicurl').value;
        var content = document.getElementById("editor_content").value;
        var articleid = document.getElementById("articleid").value;
        $.post("/editarticle",{username:username,headline:headline,coverpicurl:coverpicurl,content:content,articleid:articleid},function(data){
            if (data=='0'){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "网络传输有误，未能保存。";}
            else{
                window.location = 'article?username='+username+'&articleid='+data;
            }
        });
    });
})

//提交将某页设为欢迎页面
$(document).ready(function(){
    $("#subscrible").click(function(){
        var username = document.getElementById("username").value;
        var articleid = document.getElementById("articleid").value;
        $.post("/subscrible",{username:username,articleid:articleid},function(data){
            if (data == '1'){
                alert("本文已设置为订阅欢迎页");
                window.location = "listarticles?username="+username+"&page=1";
            }
            else{alert("运气不佳，操作失败");}
        });
    })    
})

//搜索图文信息的标题
$(document).ready(function(){
    $("#searchtitle").click(function(){
        var title=document.getElementById("titleword").value.toLowerCase();
        var username=document.getElementById("username").value;
        var reg = /^([\u4E00-\u9FA5A-Za-z0-9])+$/;    //只允许汉字、字母和数字
        check_title=reg.test(title);
        
        var ban_word_list = new Array();
        ban_word_list[0] = "null";
        ban_word_list[1] = "None";
        ban_word_list[2] = "none";
        ban_word_list[3] = "empty";
        ban_word_list[4] = "EMPTY";

        if (!check_title){
            $("#error2").css('display','inline');
            document.getElementById("error2").innerHTML="标题中只能是数字、汉字、字母及其组合。";
        }
        else if (in_arry(title,ban_word_list)){
            $("#error2").css('display','inline');
            document.getElementById("error2").innerHTML="搜索内容不合法。";
        }
        else{
            $.post("/searcharticle",{title:title,username:username},function(data){
                if (data=="0") {
                    $("#error2").css('display','inline');
                    document.getElementById("error2").innerHTML = "不存在搜索内容";
                }
                else {
                    window.location.href = 'searcharticle?username='+username+'&articleid='+data; 
                }
            });
        }
        
    })
})

//修改密码
$(document).ready(function(){
    $("#changepwd").click(function(){
        var password1=document.getElementById("password1").value;
        var password2=document.getElementById("password2").value;
        var username=document.getElementById('username').value;
        var reg = /^([\u4E00-\u9FA5A-Za-z0-9])+$/;    //只允许汉字、字母和数字
        check_password1=reg.test(password1);
        check_password2=reg.test(password2);
        if (password1.length > 20){$(".error").css('display','inline');document.getElementById('error').innerHTML="密码长度不能超过20个字符。";}
        else if (password1!=password2){$(".error").css("display","inline");document.getElementById("error").innerHTML="两次密码不一致。";}
        else if (!check_password1 || !check_password2){
            $(".error").css('display','inline');
            document.getElementById("error").innerHTML="密码应该是汉字、字母和数字及其组合，";
        }
        else{
            $.post("/password",{username:username,password:password1},function(data){
                if (data=="0") {
                    $(".error").css('display',"inline");
                    document.getElementById("error").innerHTML = "密码修改失败。";
                }
                else {
                    alert("密码修改成功");
                    username = data['username']
                    user_role = data['user_role']
                    if (user_role == 'administrator'){
                        window.location.href = 'admin?username='+username;    //go to the administrator page
                    }
                    else if (user_role == 'customer'){
                        window.location.href = 'customer?username='+username;   //go to the customer page
                    }
                    else if(user_role=='Chinese'){
                        document.getElementById("error").innerHTML = "阁下不是本站会员，请阅读下文并注册。";
                    }
                    else{
                        window.location = '/';
                    }
                }
            });
        }
        
    })
})


//提交一级菜单
$(document).ready(function(){
    $("#postmenu_1").click(function(){
        var username = document.getElementById("username").value;
        var menu1 = document.getElementById("menu_1_1").value;
        var style1 = $("#selectStyle").val();
        var keyandurl1 = document.getElementById("keyandurl_1").value;
        var reg_menu = /^[\u4E00-\u9FA5A-Za-z0-9]{1,4}$/;    //最多允许4个汉字、字母和数字
        check_menu1=reg_menu.test(menu1);
        //check_menu1=true;
        if (check_menu1 && keyandurl1!=''){
            var post_info = {};
            post_info['menu']=menu1;
            post_info['style']=style1;
            post_info['keyandurl']=keyandurl1;
            post_info['username']=username;
            post_info['level']=1

            $.post("/editmenu",post_info,function(data){
            if (data=="1"){
                window.location.href = 'editmenu?username='+username;
                }
            else{
                alert("sorry，出错了.");
                }
            });
        }
        else{
            document.getElementById("error").innerHTML = "请注意：菜单名称的长度大于0且不超过4；值keyandurl不能为空。";
        }
    });
})

//提交二级菜单
$(document).ready(function(){
    $("#postmenu_2").click(function(){
        var username = document.getElementById("username").value;
        var menu2 = document.getElementById("menu_2").value;
        var style2 = $("#selectStyle2").val();
        var parentname = $("#selectParent").val();
        var keyandurl2 = document.getElementById("keyandurl_2").value;
        var reg_menu = /^[\u4E00-\u9FA5A-Za-z0-9]{1,7}$/;    //最多允许7个汉字、字母和数字
        check_menu2=reg_menu.test(menu2);
        //check_menu1=true;
        if (check_menu2 && keyandurl2!=''){
            var post_info = {};
            post_info['menu']=menu2;
            post_info['style']=style2;
            post_info['keyandurl']=keyandurl2;
            post_info['username']=username;
            post_info['level']=2;
            post_info['parentname']=parentname;

            $.post("/editmenu",post_info,function(data){
            if (data=="1"){
                window.location.href = 'editmenu?username='+username;
                }
            else{
                alert("sorry，出错了.");
                }
            });
        }
        else{
            document.getElementById("error").innerHTML = "请注意：菜单名称的长度大于0且不超过7；'值'不能为空。";
        }
    });
})

//删除一级菜单
function delmenu(menuname,username,level)
{
    $.post("/delmenu",{menu:menuname,username:username,level:level},function(data){
        if(data=='1'){
            window.location.href = 'editmenu?username='+username;
        }
        else if(data=="0"){
            alert("不能删除，因为它有子菜单。必须先删除其子菜单。")
        }
        else{
            alert("can't delete it.Because it is strong.");
        }
    });
}


//新增菜品后提交

$(document).ready(function(){
    $("#postfood").click(function(){
        var username = document.getElementById("username").value;
        var foodtitle = document.getElementById("foodtitle").value;
        var foodcoverpicurl = document.getElementById('foodcoverpicurl').value;
        var foodcontent = document.getElementById("food_content").value;
        var foodprice = document.getElementById("foodprice").value;
        $.post("/addfood",{username:username,foodtitle:foodtitle,foodcoverpicurl:foodcoverpicurl,foodcontent:foodcontent,foodprice:foodprice},function(data){
            if (data=='0'){$("#error2").css('display','inline');document.getElementById("error2").innerHTML = "此菜品名称已经存在。为了便于用户检索，名称不能重复。";}
            else if (data=='false'){alert("由于网络原因，此文未能发布。");}
            //else if (data=='1'){
            //    window.location = 'listarticles?username='+username+'&page=1';
            //}
            else{
                window.location = 'article?username='+username+'&articleid='+data;
            }
        });
    });
})

