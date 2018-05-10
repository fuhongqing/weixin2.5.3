$(function () {
    var searchArr=location.search.slice(1).split('&');
    var thisId=searchArr[0].split('=')[1];//14;//searchArr[0].split('=')[1]	memberId  是	string	Id （经纪人app为经纪人id，案场app为案场id，市场app为市场id）
    var isInvitePage=searchArr[1].split('=')[1];//0;//searchArr[1].split('=')[1];//type  0不是1是
    var thisType=searchArr[2].split('=')[1];//0;//searchArr[2].split('=')[1]  state   0经纪人提交1案场提交3市场提交
    var userName=decodeURIComponent(searchArr[3].split('=')[1]);//userName
    var paramsStr=encodeURIComponent(thisId+','+userName);
    function weixin(data) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的
            //参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId:wxAppId,//  必填，企业号的唯一标识，此处填写企业号corpid  wx9cbe0adb2edc523f
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1W
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: '海量新房，24小时结佣，我在易好房等你！', // 分享标题 楼盘名称和均价
                link: `http://weixin.ehaofang.com/efangnet/pages/house/mod/broker/identify/invitereg.jsp?paramStr=${paramsStr}`,
                //imgUrl: imgUrl+midImgList[0], // 分享图标  当前轮播图第一张图
                desc:'卖房更容易，易好房是业内领先的新房整合营销服务平台',
                success: function () {
                    console.log("分享成功");
                },
                cancel: function () {
                    console.log('分享失败');// 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: '海量新房，24小时结佣，我在易好房等你！', // 分享标题 楼盘名称和均价
                link: `http://weixin.ehaofang.com/efangnet/pages/house/mod/broker/identify/invitereg.jsp?paramStr=${paramsStr}`,
                //imgUrl: imgUrl+midImgList[0], // 分享图标  当前轮播图第一张图
                desc:'卖房更容易，易好房是业内领先的新房整合营销服务平台',
                success: function () {
                    console.log("分享成功");
                },
                cancel: function () {
                    console.log('分享失败');// 用户取消分享后执行的回调函数
                }
            });
        });
        wx.error(function (res) {
            console.log(res);
        });
    }
    function PostData(url, data, callback) {
        $.ajax({
            type:'post',
            url:url,
            data:data,
            success:function (data) {
                callback(data);
            },
            error:function () {
                showTips('请求失败');
            }
        });
    }
    //分享
    PostData(weixinUrl+"weixin/member/demo.html", {url:window.location.href}, weixin);
    //邀请经纪人列表
    $.ajax({
        type:'get',
        url:initUrl+'efapp2/login/v2.5.3/invitationMerberList',
        data:{
            Id:thisId//	是	string	Id （经纪人app为经纪人id，案场app为案场id，市场app为市场id）
        },
        async:false,
        success:function (data) {
            if(data.status=='success'){
                var resultData=data.info;
                var listHtml='';
                $('#myInvite').html('我的邀请（'+resultData.length+'）');
                if(resultData.length>0){
                    $.each(resultData,function (i) {
                        listHtml+=`
                         <li class="phoneLi"><span>${resultData[i].firstTel}****${resultData[i].endTel}</span></li>
                         `;
                    });
                    $('#myInvite').after(listHtml);
                }
            }else{
                showTips('获取邀请失败');
            }
        },
        error:function () {
            showTips('服务器内部错误');
        }
    });
    //立即邀请
    $('#inviteBtn').click(function () {
        showTips('请点击右上角菜单栏分享');
    });

});