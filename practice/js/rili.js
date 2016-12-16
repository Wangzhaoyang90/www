$(document).ready(function(){
	var data1={
				"error_code": 0,
				"reason": "Success",
				"result": {
					"data":{
						"avoid":"开市.造庙.置产.掘井.",
						"animalsYear":"猴",
						"weekday":"星期一",
						"suit":"纳采.订盟.祭祀.祈福.开光.安香.出火.出行.会亲友.安机械.修造.动土.竖柱.上梁.造屋.起基.定磉.安床.安门.拆卸.移徙.造桥.造船.安葬.破土.入殓.",
						"lunarYear":"丙申年",
						"lunar":"十一月十四",
						"year-month":"2016-12",
						"date":"2016-12-12"
					}
				}
		}
//--------------加载默认的日历----------------------------------------------------	
	var dDate=new Date();//声明一个系统的当前时间。
	var nDay=fnHaveDays(dDate);//获取当月有多少天，调用封装的函数
	var nWeek=new Date(dDate.getFullYear(),dDate.getMonth(),1).getDay();//系统中当年当月的1号为周几。				
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
	$('#time').html(dDate.getFullYear()+'年'+(dDate.getMonth()+1)+'月'+'星期'+Week[(dDate.getDay())]);
	$('#riqi').html(dDate.getDate())
	//---------------默认日历状态下，点击日历中的日期--------------------		
		$('.day li').click(function(event){
			var nWeeks=new Date(dDate.getFullYear(),dDate.getMonth(),$(this).text()).getDay();
			$('#time').html(thisYear+'年'+(thisMonth)+'月'+'星期'+Week[nWeeks]);
			$('#riqi').html($(this).text());
			if($(this).text!=''){
				$(this).siblings('li').removeClass('active');
				$(this).addClass('active');
			}
			else{
				$(this).removeClass('active');
				$(this).text('')
			}
		})
	
//------------------------------点击上一个月------------------
	var thisMonth=dDate.getMonth()+1;
	var thisYear=dDate.getFullYear();
	var thisDay=$('.active').html();
	$(".lastMonth").click(function(){
		$('#days').html('');
	    thisMonth--;
	    if(thisMonth==0){
	    	thisMonth=12;
	    	thisYear--; 
	    }
	   $('.selectDate').val(thisYear+'年'+thisMonth+'月');
	   	var nweek=new Date(thisYear,(thisMonth-1),1).getDay();
	   	var dd=new Date(thisYear,(thisMonth-1),thisDay).getDay();//当前年、月显示的几日所对应的星期
		var nDay=fnHaveDays(dDate);
		var Week= ['日','一','二','三','四','五','六'];
		var nDays=0;
	   for(var i=0;i<42;i++){
			if(i>=nweek&&i<nDay+nweek){//因为此月1号是周三(3),所以i从3开始，对应的nDays值为1.
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
	   	if(nweek<=0){
	   		nweek=7
	   	}
	   	$('#time').html(thisYear+'年'+(thisMonth)+'月'+'星期'+Week[dd]);
		$('#riqi').html(dDate.getDate());
		//---------------以下为点击日历中的日期--------------------		
		$('.day li').click(function(){
			var nweek=new Date(thisYear,(thisMonth-1),$(this).text()).getDay();
			$('#time').html(thisYear+'年'+(thisMonth)+'月'+'星期'+Week[nweek]);
			$('#riqi').html($(this).text());
			if($(this).text!=''){
				$(this).siblings('li').removeClass('active');
				$(this).addClass('active');
			}
			else{
				$(this).removeClass('active');
				$(this).text('')
			}
			
		})
   });
//-----------------------------点击下一月--------------------  
   	$(".nextMonth").click(function(){
		$('#days').html('');
	    thisMonth++;
	    if(thisMonth==13){
	    	thisMonth=1;
	    	thisYear++;
	    }
	    $('.selectDate').val(thisYear+'年'+(thisMonth)+'月')
	    var nweek=new Date(thisYear,(thisMonth-1),1).getDay();
	    var dd=new Date(thisYear,(thisMonth-1),thisDay).getDay();//当前年、月显示的几日所对应的星期
		var nDay=fnHaveDays(dDate);
		var Week= ['日','一','二','三','四','五','六'];
		var nDays=0;
	   	for(var i=0;i<42;i++){
			if(i>=nweek&&i<nDay+nweek){//因为此月1号是周三(3),所以i从3开始，对应的nDays值为1.
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
	   	if(nweek<=0){
	   		nweek=7
	   	}
		$('#time').html(thisYear+'年'+(thisMonth)+'月'+'星期'+Week[dd]);
		$('#riqi').html(dDate.getDate());
		//---------------以下为点击日历中的日期--------------------
		$('.day li').click(function(event){
			var nweek=new Date(thisYear,(thisMonth-1),$(this).text()).getDay();
			$('#time').html(thisYear+'年'+(thisMonth)+'月'+'星期'+Week[nweek]);
			$('#riqi').html($(this).text());
			if($(this).text!=''){
				$(this).siblings('li').removeClass('active');
				$(this).addClass('active');
			}
			else{
				$(this).removeClass('active');
				$(this).text('')
			}
			
		})
	
   	});

//----------------以下为当天的老黄历数据-------------------------------------------------------------------
	//var dDate=new Date();
	//var data=dDate.getFullYear()+'-'+(dDate.getMonth()+1)+'-'+(dDate.getDate())
	//var pama={'key':'042543c4adea4fecd6cfea0b59677c47','date':data}
	//ajaxResult('get',false,'http://japi.juhe.cn/calendar/day',pama);
	//ajaxResult('get',false,'http://yun.rili.cn/wnl/js/lunarjson.js');中华万年历数据
	$('#yi').append("<li title="+data1['result']['data']['suit']+">"+"<i>宜：</i>"+data1['result']['data']['suit']+"</li>");
	$('#ji').append("<li title="+data1['result']['data']['avoid']+">"+"<p>忌：</p>"+data1['result']['data']['avoid']+"</li>");
//-------------------以下为该城市的天气---------------------------------------
	var locat=$('.names').text();
	var para={'city':locat}
	ajaxResult('get',false,'http://wthrcdn.etouch.cn/weather_mini',para);
	
//-------------------------点击切换按钮，切换城市-----------------------
	$('.change').click(function(){
		$('.names').text('');
		$(this).css({'display':'none'});
		var txt = $('.names').html(); 
		var input = $("<input class='txt' type='text' value='"+txt+"'/>"); 
		$('.names').html(input); 
	})
//-----------------------切换成功后重新加载天气数据-------------------
	$('.names').change(function(){
		$('.names').html($('.txt').val());
		$('.change').css({'display':'inline-block'});
		var locat=$('.names').html();
		var para={'city':locat}
		ajaxResult('get',false,'http://wthrcdn.etouch.cn/weather_mini',para);
	})
});

function ajaxResult(t_type,t_async,t_url,t_data){		
	//var result="";
	$.ajax({
		type:t_type,
		dataType: 'jsonp',
		//jsonp:'callback',
		//jsonpCallback:'success_jsonpCallback',
		async:t_async,
		url:t_url,
		data:t_data,
		success:function(data1){				
//					    result=data;	
//					    $('#yi').append("<li title="+data1['result']['data']['suit']+">"+"<i>宜：</i>"+data1['result']['data']['suit']+"</li>");
//						$('#ji').append("<li title="+data1['result']['data']['avoid']+">"+"<p>忌：</p>"+data1['result']['data']['avoid']+"</li>");
//			})
			var arr = data1['data']['yesterday']['low'].split(' ');//截取空格,过滤掉后台数据中的中文
			var newLow=arr[1];
			var arr = data1['data']['yesterday']['high'].split(' ');
			var newHigh=arr[1];
			//---------------------------昨天的天气图标----------------------------------
			var wd=data1['data']['yesterday']['type'];
			if(wd!='晴'){
				$('.zuo').find('.wendu').css({'background':'#fff'})
			}else{
				$('.zuo').find('.wendu').find('img').attr({'src':'../images/fine2.png'})
			}
			if(wd!='阵雨'){
				$('.zuo').find('.wendu').css({'background':'#fff'})
			}else{
				$('.zuo').find('.wendu').find('img').attr({'src':'../images/quick_rain2.png'})
			}
			if(wd!='小雨'){
				$('.zuo').find('.wendu').css({'background':'#fff'})
			}else{
				$('.zuo').find('.wendu').find('img').attr({'src':'../images/small_rain2.png'})
			}
			if(wd!='多云'){
				$('.zuo').find('.wendu').css({'background':'#fff'})
			}else{
				$('.zuo').find('.wendu').find('img').attr({'src':'../images/cloud2.png'})
			}
			if(wd!='阴'){
				$('.zuo').find('.wendu').css({'background':'#fff'})
			}else{
				$('.zuo').find('.wendu').find('img').attr({'src':'../images/overcast2.png'})
			}
			if(wd!='霾'){
				$('.zuo').find('.wendu').css({'background':'#fff'})
			}else{
				$('.zuo').find('.wendu').find('img').attr({'src':'../images/mai.png'})
			}
			for(var i=0;i<$(data1['data']['forecast']).length;i++){
				//---------------------------每天的天气图标--------------------------------------
				var dz=data1['data']['forecast'][i]['type'];
				if(dz!='晴'){
					$('.day_'+i).find('.wendu').css({'background':'#fff'})
				}else{
					$('.day_'+i).find('.wendu').find('img').attr({'src':'../images/fine2.png'})
				}
				if(dz!='霾'){
					$('.day_'+i).find('.wendu').css({'background':'#fff'})
				}else{
					$('.day_'+i).find('.wendu').find('img').attr({'src':'../images/mai.png'})
				}
				if(dz!='阵雨'){
					$('.day_'+i).find('.wendu').css({'background':'#fff'})
				}else{
					$('.day_'+i).find('.wendu').find('img').attr({'src':'../images/quick_rain2.png'})
				}
				if(dz!='小雨'){
					$('.day_'+i).find('.wendu').css({'background':'#fff'})
				}else{
					$('.day_'+i).find('.wendu').find('img').attr({'src':'../images/small_rain2.png'})
				}
				if(dz!='多云'){
					$('.day_'+i).find('.wendu').css({'background':'#fff'})
				}else{
					$('.day_'+i).find('.wendu').find('img').attr({'src':'../images/cloud2.png'})
				}
				if(dz!='阴'){
					$('.day_'+i).find('.wendu').css({'background':'#fff'})
				}else{
					$('.day_'+i).find('.wendu').find('img').attr({'src':'../images/overcast2.png'})
				}
				
				var arrs = data1['data']['forecast'][i]['low'].split(' ');//截取空格,过滤掉后台数据中的中文
				var newLows=arrs[1];
				var arrr = data1['data']['forecast'][i]['high'].split(' ');
				var newHighs=arrr[1];
				//-----昨天的数据填充到页面--------------------
				$('.zuo').find('.xingqi').html(data1['data']['yesterday']['date']);
				$('.zuo').find('.wendu').html(data1['data']['yesterday']['wendu']);
				$('.zuo').find('.tianqi').html(data1['data']['yesterday']['type']);
				$('.zuo').find('.diwen').html(newLow+'～');
				$('.zuo').find('.gaowen').html(newHigh);
				$('.zuo').find('.feng').html(data1['data']['yesterday']['fx']);
				$('.zuo').find('.jishu').html(data1['data']['yesterday']['fl']);
				//-------每天的数据填充到页面-----------------
				$('.day_'+i).find('.xingqi').html(data1['data']['forecast'][i]['date']);
				$('.day_0').find('.wendu').html(data1['data']['wendu']+'℃');//当天温度
				$('.day_'+i).find('.tianqi').html(data1['data']['forecast'][i]['type']);
				$('.day_'+i).find('.diwen').html(newLows+'～');
				$('.day_'+i).find('.gaowen').html(newHighs);
				$('.day_'+i).find('.feng').html(data1['data']['forecast'][i]['fengxiang']);
				$('.day_'+i).find('.jishu').html(data1['data']['forecast'][i]['fengli']);
				$('.zhuyi').html((data1['data']['ganmao']));
			}
			
		}
	});				
	//return result;
}

function fnHaveDays(date){
	var nYear=date.getFullYear();
	var nMonth=date.getMonth();
	var dDate01=new Date(nYear,nMonth,1);
	var dDate02=new Date(nYear,nMonth+1,1);
	var nDays=(dDate02.getTime()-dDate01.getTime())/1000/60/60/24;
	return nDays;
}