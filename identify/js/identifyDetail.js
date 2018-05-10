$(function () {
    var searchArr=location.search.slice(1).split('&');
    var curAgencyName=decodeURIComponent(searchArr[0].split('=')[1]);//'地方';//	thisName   是	string	公司名searchArr[0].split('=')[1]
    var identifyState=searchArr[1].split('=')[1];//1;//thisState searchArr[1].split('=')[1]   0待审核 1驳回 2通过
    var memberId=searchArr[2].split('=')[1];//memberId
    localStorage.setItem('thisId',memberId);
    //点击图片，显示大图
    function showBigImg(imgSrc) {
        $('.imgModal').fadeIn();
        $('.imgToast').html(imgSrc);
    }
    //获取详情
    $.ajax({
        type:'get',
        url:initUrl+'efapp2/login/v2.5.3/companyDetails',
        data:{
            agencyName:curAgencyName//	是	string	公司名
        },
        success:function (data) {
            if(data.status=='success'){
               var detailData=data.info;
               var urlData=(detailData[0].yyzlUrl).split(',');
               var licenceHtml='',modifyCodeHtml='';
               //修改页面内容初始化
                $('#companyName').val(detailData[0].agencyName);
                $('#companyAttr').val(detailData[0].addressDetail);
                $('#userName').val(detailData[0].fullName);
                $('#userPhone').val(detailData[0].telephone);
               var detailHtml=`
                <li><span class="key">公司全称:</span><span>${detailData[0].agencyName}</span></li>
                <li><span class="key">公司办公地址:</span><span>${detailData[0].addressDetail}</span></li>
                <li><span class="key">公司负责人:</span><span>${detailData[0].fullName}</span></li>
                <li><span class="key">负责人电话:</span><span>${detailData[0].telephone}</span></li>
               `;
               $('#detailUl').html(detailHtml);
                localStorage.setItem('oldAgentName',detailData[0].agencyName);//代理公司名
                localStorage.setItem('cityName',detailData[0].cityName);//城市名
                localStorage.setItem('boroughName',detailData[0].BoroughName);//区域名
                localStorage.setItem('thisLongitude',detailData[0].longitude);//经度
                localStorage.setItem('thisLatitude',detailData[0].latitude);//维度
               //营业执照
                if(detailData[0].yyzlUrl!=''){
                    localStorage.setItem('urlData',urlData);
                    $.each(urlData,function (i) {
                        licenceHtml+=`
                    <div>
                        <img src="${imgUrl+urlData[i]}" alt="">
                        <div class="modalImg"></div>
                    </div>
                   `;
                        modifyCodeHtml+=`
                        <div>
                            <img src="${imgUrl+urlData[i]}" alt="">
                            <img class="closeImg scale" src="img/close.png" alt="">
                        </div>
                        `;
                    });
                    $('#licenceLi>span').after(licenceHtml);
                    $('#upLoad>span').after(modifyCodeHtml);
                }
                //审核流程展示
                $('#submitTime').html(detailData[0].submissionTime);
                if(identifyState==1){
                    var identifyHtml=`
                    <span>${detailData[0].examineTime}</span><span class="point"></span><span class="rejectSpan">驳回</span><img src="img/reject.png" alt="">
                    <div class="rejectModal">${detailData[0].remake}<span class="caret"></span><span class="caret caretOut"></span></div>        
                    `;
                    $('#detailPage>section>.rejectDiv').show().html(identifyHtml);
                    $('#detailPage>footer').show();
                    $('#detailPage>section>.waitSignImg').hide();
                    $('#detailPage>section>.rejectSignImg').show();
                    $('#detailPage>section>.line').show();
                }else if(identifyState==2){
                    var identifyHtml=`
                        <span>${detailData[0].examineTime}</span><span class="point"></span><span class="passSpan">通过</span><img src="img/pass.png" alt="">
                    `;
                    $('#detailPage>section>.rejectDiv').show().html(identifyHtml);
                    $('#detailPage>section>.waitSignImg').hide();
                    $('#detailPage>section>.passSignImg').show();
                    $('#detailPage>section>.line').show();
                }
            }
        },
        error:function () {
            showTips('服务器内部错误');
        }
    });
    //图片放大
    $('#licenceLi').on('click','.modalImg',function (e) {
        e.stopPropagation();
        var bigImgSrc=$(e.target).prev().attr('src');
        showBigImg(`<img src="${bigImgSrc}" />`);
    });
    //点击非目标区域，弹框隐藏
    $(document).click(function(e){
        var _con=$('.modalImg');//设置点击，展示目标区域
        if(!_con.is(e.target)&&_con.has(e.target).length==0){
            $('.imgModal').hide();
        }
    });
    //返回按钮
    $('#detailPage>header').on('click','.backImg',function () {
        history.back();
    });
    //修改按钮
    $('#modifyBtn').click(function () {
        $('#detailPage').hide();
        $('#modifyPage').show();
    });
    //修改页面返回按钮
    $('#modifyPage>header').on('click','.backImg',function () {
        $('#detailPage').show();
        $('#modifyPage').hide();
    });
    $('#getAttr').click(function () {
        $('#modifyPage').hide();
    });
    $('#mapPage>header').on('click','.backImg',function () {
        $('#modifyPage').show();
    });
    $('#mapSubmit').click(function () {
        $('#companyAttr').val($('#imgDiv>span').html()+$('#inputDiv>input').val());
        $('#modifyPage').show();
    });
});