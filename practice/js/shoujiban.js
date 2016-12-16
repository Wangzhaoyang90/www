$(document).ready(function(){
	var dDate=new Date();
	var dYear=dDate.getFullYear();
	var dMonth=dDate.getMonth();
	var dDay=dDate.getDate();
	var dWeek=dDate.getDay();
	var dTime=dDate.getHours();
	var dMin=dDate.getMinutes();
	var nDay=fnHaveDays(dDate);//获取当月有多少天，调用封装的函数
	var nWeek=new Date(dDate.getFullYear(),dDate.getMonth(),1).getDay();//系统中当年当月的1号为周几。		
	var Week= ['日','一','二','三','四','五','六'];
	var nDays=0;
	//加载默认的日历列表
	for(var i=0;i<42;i++){
		if(i>=nWeek&&i<nDay+nWeek){//因为此月1号是周三(3),所以i从3开始，对应的nDays值为1.
			nDays++;
			if(nDays<dDate.getDate()){
				$('#days').append('<li class="passed">'+nDays+'</li>')
			}else if(nDays==dDate.getDate()){
				$('#days').append('<li class="active">'+nDays+'</li>')
			}else{
				$('#days').append('<li>'+nDays+'</li>')
			}
			
		}else{
			$('#days').append('<li></li>')
		}
	}
	
	setInterval(function(){//自动改变时间
		var dDate=new Date();
		$('.time').html(fnTimes(dDate,':'))//里面为调用tool2里面的函数
	},100)	
	$('.date').html((dMonth+1)+"."+dDay+'&nbsp;'+'星期'+Week[dWeek]+'&nbsp;·&nbsp;'+dYear)
	
	var para={'city':'北京'}
	ajaxResult('get',false,'http://wthrcdn.etouch.cn/weather_mini',para);
	
	//---------------以下为点击日历中的日期--------------------
	$('#days li').click(function(){
		var dDay=dDate.getDate(); 
		//console.log(dDay);
		var thisMonth=dDate.getMonth()+1;
		var thisDay=$(this).text();
		var thisYear=dDate.getFullYear();
		var nweek=new Date(thisYear,(thisMonth-1),$(this).text()).getDay();
		if($(this).html()!=''){
			$(this).siblings('li').removeClass('active');
			$(this).addClass('active');
			$('.date').html((thisMonth)+'.'+thisDay+'&nbsp;'+'星期'+Week[nweek]+'&nbsp;·&nbsp;'+thisYear);
		}
		else{
			$(this).removeClass('active');
			$(this).text('')
			$('.date').html((thisMonth)+'.'+dDay+'&nbsp;'+'星期'+Week[nweek]+'&nbsp;·&nbsp;'+thisYear);
		}
		
	})
	
	
		//-日期选择模态框--------------
	
	$(function () {
		var currYear = (new Date()).getFullYear(); 
		start=currYear - 20;
		end= currYear + 20 ;
		$("#chose").mobiscroll().date({  
		theme: 'android-ics light', //皮肤样式
		        display: 'modal', //显示方式
		        mode:'scroller',
		       	dateFormat: 'yy-mm-dd', // 日期格式
		        setText: '确定', //确认按钮名称
		        cancelText: '取消',//取消按钮名籍我
		        dateOrder: 'yymmdd', //面板中日期排列格式
		        dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
		        yearText: '年', monthText: '月',  dayText: '日',  //面板中年月日文字
		        startYear:start, //开始年份
		        endYear:end,//结束年份
		        headerText: function (valueText) {
		        	array = valueText.split('-'); 
		        	return array[0]+"年" + array[1] + "月"+array[2]+"日";
		        },  //自定义弹出框头部格式
		        onSelect:function(valueText,inst){
		       		//点击确定以后的结果
			       	var Y=valueText.split('-')[0]//选择的年份
			       	var M=valueText.split('-')[1]//选择的月份
			       	$('#days li').remove('');
			     	$('#chose').val(Y+'年'+M+'月');
			     	var nWeek=new Date(Y,(M-1),1).getDay();//当年当月的1号为周几。
			     	var dDate=new Date();
					var Week= ['日','一','二','三','四','五','六'];
					var nDays=0;
					for(var i=0;i<42;i++){
						if(i>=nWeek&&i<nDay+nWeek){//因为此月1号是周三(3),所以i从3开始，对应的nDays值为1.
							nDays++;
							if(nDays<dDate.getDate()){
								$('#days').append('<li class="passed">'+nDays+'</li>')
							}else if(nDays==dDate.getDate()){
								$('#days').append('<li class="active">'+nDays+'</li>')
							}else{
								$('#days').append('<li>'+nDays+'</li>')
							}
							
						}else{
							$('#days').append('<li></li>')
						}
					}
					//模态框按下确定后重新加载时间下面的日期
					var nweek=new Date(Y,(M-1),$('#days .active').text()).getDay();
					if($(this).html()!=''){
						$(this).siblings('li').removeClass('active');
						$(this).addClass('active');
						$('.date').html((M)+'.'+thisDay+'&nbsp;'+'星期'+Week[nweek]+'&nbsp;·&nbsp;'+Y);
					}
					else{
						$(this).removeClass('active');
						$(this).text('')
						$('.date').html((M)+'.'+dDay+'&nbsp;'+'星期'+Week[nweek]+'&nbsp;·&nbsp;'+Y);
					}
					//选择好后的年月，点击日历里面的li，时间下面的日期变化
					$('#days li').click(function(){
						var dDay=dDate.getDate(); 
						var Y=valueText.split('-')[0]//选择的年份
			       		var M=valueText.split('-')[1]//选择的月份
						var thisDay=$(this).text();
						var nweek=new Date(Y,(M-1),$(this).text()).getDay();
						if($(this).html()!=''){
							$(this).siblings('li').removeClass('active');
							$(this).addClass('active');
							$('.date').html((M)+'.'+thisDay+'&nbsp;'+'星期'+Week[nweek]+'&nbsp;·&nbsp;'+Y);
						}
						else{
							$(this).removeClass('active');
							$(this).text('')
							$('.date').html((M)+'.'+dDay+'&nbsp;'+'星期'+Week[nweek]+'&nbsp;·&nbsp;'+Y);
						}
					})
		    	}
    	});  		
	});
	
})



	
//以下为封装时分-------------------------------------
function fnTimes(dDate,smark){
	var nHours=Buling(dDate.getHours());
	var nMin=Buling(dDate.getMinutes());
	//var nSen=Buling(dDate.getSeconds());
	if(smark){
		return nHours+smark+nMin;
	}else{
		return nHours+'时'+nMin+'分';
	}
}
//补零函数
function Buling(num){
	if(num<10){
		return num='0'+num;
	}else{
		return num=''+num;
	}
}
//计算当月有多少天
function fnHaveDays(date){
	var nYear=date.getFullYear();
	var nMonth=date.getMonth();
	var dDate01=new Date(nYear,nMonth,1);
	var dDate02=new Date(nYear,nMonth+1,1);
	var nDays=(dDate02.getTime()-dDate01.getTime())/1000/60/60/24;
	return nDays;
}


function ajaxResult(t_type,t_async,t_url,t_data){
	$.ajax({
		type:t_type,
		dataType: 'jsonp',
		async:t_async,
		url:t_url,
		data:t_data,
		success:function(data){	
			$('.locate').html(data['data']['city']);
			$('.wendu').html(data['data']['wendu']+"℃")
			//---------------------------每天的天气图标--------------------------------------
			var dz=data['data']['forecast'][0]['type'];
			if(dz!='晴'){
				$('.tubiao').css({'background':'#fff'})
			}else{
				$('.tubiao').find('img').attr({'src':'../images/sun.rays.medium.png'})
			}
			if(dz!='霾'){
				$('.tubiao').css({'background':'#fff'})
			}else{
				$('.tubiao').find('img').attr({'src':'../images/cloud.dark.fog.png'})
			}
			if(dz!='阵雨'){
				$('.tubiao').css({'background':'#fff'})
			}else{
				$('.tubiao').find('img').attr({'src':'../images/cloud.dark.lightning.rain.png'})
			}
			if(dz!='小雨'){
				$('.tubiao').css({'background':'#fff'})
			}else{
				$('.tubiao').find('img').attr({'src':'../images/sun.big.cloud.drizzle.png'})
			}
			if(dz!='多云'){
				$('.tubiao').css({'background':'#fff'})
			}else{
				$('.tubiao').find('img').attr({'src':'../images/sun.rays.cloud.png'})
			}
			if(dz!='阴'){
				$('.tubiao').css({'background':'#fff'})
			}else{
				$('.tubiao').find('img').attr({'src':'../images/sun.small.cloud.dark.png'})
			}
			if(dz!='大雨'){
				$('.tubiao').css({'background':'#fff'})
			}else{
				$('.tubiao').find('img').attr({'src':'../images/cloud.dark.rain.png'})
			}
			if(dz!='雪'){
				$('.tubiao').css({'background':'#fff'})
			}else{
				$('.tubiao').find('img').attr({'src':'../images/cloud.dark.snow.png'})
			}
		}
	});	

	
}
