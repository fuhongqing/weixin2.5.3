$(function () {
    var searchArr=location.search.slice(1).split('&');
    var paramStr=decodeURIComponent(searchArr[0].split('=')[1]);
    var paramArr=paramStr.split(',');
    var thisMemberId=paramArr[0];
    var thisName=paramArr[1];

    $('#inviteName').html(thisName+'邀请您加入易好房');
    //获取验证码
    $('#regCodeSpan').on('click',function () {
        var thisPhoneNum=$('#regPhoneInput').val();
        if(!(/^1[3456789]\d{9}$/.test(thisPhoneNum))){
            showTips("手机号无效");
            return;
        }
        $.ajax({//手机号判重
            url: initUrl + 'efapp2/login/isHaveMobilephone',
            type: 'post',
            async:false,
            data: {
                mobilephone: thisPhoneNum
            },
            success: function (data) {
                if (data.status == 'success' && data.data != 0) {
                    showTips('您已注册过易好房/被邀请过，无法再次被邀请哦！');
                    return;
                }else if(data.status == 'success' && data.data == 0){
                    $.ajax({
                        url:initUrl+'efapp2/login/newGetcode',
                        type:'post',
                        data:{
                            mobilephone:thisPhoneNum
                        },
                        success:function (data) {
                            if(data.status=='success'){
                                showTips('验证码已发送');
                                var self='#regCodeSpan';
                                var time=60;
                                var timeReg=setInterval(function () {
                                    time--;
                                    $(self).html(time+'s后可重发');
                                    if(time<=0){
                                        clearInterval(timeReg);
                                        timeReg=null;
                                        $(self).html('重新获取验证码');
                                    }
                                },1000);
                            }else{
                                showTips('获取验证码失败');
                            }
                        },
                        error:function (data) {
                            showTips('服务器内部错误');
                        }
                    });
                }
            },
            error: function () {
                showTips('服务器内部错误');
            }
        });
    });
    //提交认证
    $('#inviteRegBtn').on('click',function () {
        var thisPhone=$('#regPhoneInput').val();
        var thisCode=$('#regCodeInput').val();
        if(thisPhone==''){
            showTips('请输入手机号');
            return;
        }
        if(thisCode==''){
            showTips('请输入验证码');
            return;
        }
        $.ajax({//验证手机验证码
            url:initUrl+'efapp2/login/newClickcode',
            type:'post',
            data:{
                mobilephone:thisPhone,//	是	string	电话
                code:thisCode//	是	string	验证码
            },
            success:function (data) {
                if(data.status=='match'){
                    $.ajax({//提交
                        url:initUrl+'efapp2/login/v2.5.3/invitationMerber',
                        type:'post',
                        data:{
                            invitationMerberId:thisMemberId,//	是	string	邀请人id (经纪人id,案场id,市场id)
                            telephone:thisPhone,//	是	string	电话
                            type:0//	是	string	0经纪人提交1案场提交3市场提交
                        },
                        success:function (data) {
                            if(data.status=='success'){
                                showTips('提交成功');
                                $(location).attr('href','download.jsp?state=1');
                            }else{
                                showTips(data.info||'提交失败');
                                $(location).attr('href','download.jsp?state=0');
                            }
                        },
                        error:function () {
                            showTips('服务器内部错误');
                        }
                    });
                }else if(data.status=='nomatch'){
                    showTips('验证码错误');
                    return;
                }else if(data.status=='Invalid'){
                    showTips('验证码失效');
                    return;
                }else if(data.status=='timeout'){
                    showTips('验证码超时');
                    return;
                }else{
                    showTips('验证失败');
                    return;
                }
            },
            error:function (data) {
                showTips('服务器内部错误');
            }
        });
    });
});