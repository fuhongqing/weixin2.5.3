	$(function(){
		
	
/***************************************** 滚动上拉下拉加载 ************************************/
		var myScroll;
		function load(){
			myScroll = new IScroll("#wrapper",{
				//probeType:2,
				//preventDefault:false,
				scrollbars: false, 
				mouseWheel: true, 
				interactiveScrollbars: true,
				tap:true,
				click:true,
			});
		}
		setTimeout(load,200);
	    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		//iscroll默认阻止事件
		

		$(".reportBox").html("");
		var count = 0;
		getData(count,$(".report-add a").attr("value"),$("#search").val());

	$("#search").on("focus",function(){
		$(".searchBg").css("display","block");
		$(".searchBox").addClass("searchBoxActive");
		$(".searchOut").css("display","block");
		$("body").css("overflow","hidden");
	})

	$(".searchOut").on("touchend",function(){
		$("#search").blur();
		$(".searchBg").css("display","none");
		$(".searchBox").removeClass("searchBoxActive");
		$(this).css("display","none");
		$("body").css("overflow","auto");
		
		$("#search").val("")
		$(".reportBox").html("");
		count = 0;
		getData(count,$(".report-add a").attr("value"),$("#search").val());

	});
	$("#searchBtn").on("touchstart",function(){
		$(this).css("background","#ddd");
	});
	$("#searchBtn").on("touchend",function(){
		$(this).css("background","#fff");

	//$("#search").on("keyup",function(){
		count = 0;
		//$(".reportBox").html("");
		//getData(count,$(".report-add a").attr("value"),$("#search").val());
		var searchStr = "";
		$.ajax({
			type:"post",
			url:dataStr+"/customer/customerLFList",
			data:{
				memberId:217683,
//				memberId:thismemberID,
				searchStr:$("#search").val(),
				condition:$(".report-add a").attr("value"),
				pageNum:count,
				pageSize:20},
			success:function(data){
				//console.log(data);
				if(check(data.info.mapList).length){
					$(".reportBox dt,.reportBox dd").remove();
					$(".report-num").html("<span>"+data.info.size+"</span>人");
					$.each(check(data.info.mapList), function(i) {
						searchStr += "<a href='visit-detail.jsp?"+ check(data.info.mapList[i].CustomerID) +"&"+ check(data.info.mapList[i].ID) +"'><li><div><p>"
								+ check(data.info.mapList[i].Customername) +"</p><p>"
								+ check(data.info.mapList[i].PhoneNum) +"</p></div><div><p>"
								+ check(data.info.mapList[i].PropertyName) +"</p><p>"+ dateCut(check(data.info.mapList[i].createtime)) +"</p></div><div><p><span>"						  
								+ check(data.info.mapList[i].lookCount) +"访</span></p></div></li></a>";
					});	
					$(".reportBox").html(searchStr);
					myScroll.refresh();
					if($(".reportBox a").length % 20 == 0){
						$(".ball-pulse").css("display","block");
					}else{
						$(".ball-pulse").html("已经到底了！");
					}
					myScroll.refresh();
				}else{
					$(".report-num").html("");
					$(".reportBox").html("<dt></dt>"
						+"<dd>没有相关客户数据～</dd>");
					$(".ball-pulse").css("display","none");
				}
			}
		});
		function dateCut(Time){
			return Time = Time.substr(0,Time.indexOf(" "));
		}
	})
		
		
		$(".report-add a").on("touchstart",function(){
			if($(".report-add li").css("display") == "none"){
				$(".report-add").css("background","#fff");
				$(".report-add li").css("display","block");
				
			}else{
				$(".report-add").css("background","#EDF4F4");
				$(".report-add li").css("display","none");
				
			}
		})
		
		$(".report-add li").on("touchstart",function(){
			$(".report-add").css("background","#EDF4F4");
			$(".report-add a").html($(this).text());
			$(".report-add a").attr("value",$(this).val());
			count = 0;
			$(".reportBox").html("");
			getData(count,$(".report-add a").attr("value"));
			$(".report-add li").css("display","none");
		})

	
		$(document).on("touchend", function() {
		    if (myScroll.y < myScroll.maxScrollY - 50) {
			    //console.log("正在上拉加载");
				if($(".reportBox a").length % 20 == 0){
					$(".ball-pulse").css("display","block");
					count ++;
					$(".ball-pulse").html("<div></div><div></div><div></div>");
					getData(count,$(".report-add a").attr("value"),$("#search").val());
		        	myScroll.refresh();
					setTimeout(function(){
						$(".ball-pulse").html("加载更多");
					},800)
				}else{
					//$(".ball-pulse").css("display","none");
					$(".ball-pulse").html("已经到底了！");
				}
		    		
			}
		})
		
									  
		
			
		function getData(count,filter,search) {
			var reportStr = "";
			$.ajax({
				type:"post",
				url:dataStr+"/customer/customerLFList",
				data:{
					memberId:217683,
//					memberId:thismemberID,
					searchStr:search,
					condition:filter,
					pageNum:count,
					pageSize:20},
				success:function(data){
					console.log(data);
					if(check(data.info.mapList).length){
						$(".reportBox dt,.reportBox dd").remove();
						$(".report-num").html("<span>"+data.info.size+"</span>人");
						$.each(check(data.info.mapList), function(i) {
							reportStr += "<a href='visit-detail.jsp?"+ check(data.info.mapList[i].CustomerID) +"&"+ check(data.info.mapList[i].ID) +"'><li><div><p>"
									+ check(data.info.mapList[i].Customername) +"</p><p>"
									+ check(data.info.mapList[i].PhoneNum) +"</p></div><div><p>"
									+ check(data.info.mapList[i].PropertyName) +"</p><p>"+ dateCut(check(data.info.mapList[i].createtime)) +"</p></div><div><p><span>"						  
									+ check(data.info.mapList[i].lookCount) +"访</span></p></div></li></a>";
						});	
						$(".reportBox").append(reportStr);
						myScroll.refresh();
						if($(".reportBox a").length % 20 == 0){
							$(".ball-pulse").css("display","block");
						}else{
							$(".ball-pulse").html("已经到底了！");
						}
						myScroll.refresh();
					}else{
						$(".report-num").html("");
						$(".reportBox").html("<dt></dt>"
							+"<dd>没有相关客户数据～</dd>");
						$(".ball-pulse").css("display","none");
					}
				}
			});
			function dateCut(Time){
				return Time = Time.substr(0,Time.indexOf(" "));
			}
    	
	    }    
	})			
