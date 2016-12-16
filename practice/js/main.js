//格式化星期
function fnWeek(date){
	var nWeek = date.getDay();
	var aWeek = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];

	return aWeek[nWeek];
}
//补位
function add0(num){
	if(num < 10){
		num = "0"+num;
	}
	return num;
}
//格式化时间
function fnTime(date, sMark){
	var nHours = add0(date.getHours());
	var nMinutes = add0(date.getMinutes());
	var nSeconds = add0(date.getSeconds());
	if(sMark){
		return nHours+sMark+nMinutes+sMark+nSeconds;
	}else{
		return nHours+"时"+nMinutes+"分"+nSeconds+"秒";
	}
}
//格式化年月日
function fnDate(dDate01, sMark){
	var dYear = dDate01.getFullYear();
	var dMonth = add0(dDate01.getMonth()+1);
	var dDay = add0(dDate01.getDate());
	var result = "";
	if(sMark){
		result = dYear+sMark+dMonth+sMark+dDay;
	}else{
		result = dYear+"年"+dMonth+"月"+dDay+"日";
	}
	return result;
}
//计算某月天数
function fnHaveDays(date){
	var nYear = date.getFullYear();
	var nMonth = date.getMonth();
	var dDate01 = new Date(nYear,nMonth,1);
	var dDate02 = new Date(nYear,nMonth+1,1);
	var nDays = (dDate02.getTime() - dDate01.getTime())/1000/60/60/24;
	return nDays;
}
//获取子元素
function getChilds(oBox){
	var aChildNode = oBox.childNodes;
	var aLi = [];
	for(var i=0; i<aChildNode.length; i++){
		if(aChildNode[i].nodeType == 1){
			aLi.push(aChildNode[i]);
		}
	}
	return aLi;
}
//DOM2级事件添加方法
function addEvent(oBox, sEvent, aFn){
	for(var i=0; i<aFn.length; i++){
		if(oBox.addEventListener){
			oBox.addEventListener(sEvent, aFn[i], false);
		}else{
			oBox.attachEvent("on"+sEvent, aFn[i])
		}
	}
}
//通过类名获取元素
function getByClass(oBox, sClass){
	var aTag = oBox.getElementsByTagName("*");
	var result = [];
	for(var i=0; i<aTag.length; i++){
		if(aTag[i].className == sClass){
			result.push(aTag[i]);
		}
	}
	return result;
}
//获取非行间样式
function getStyle(oDiv, direct){
	var result = "";
	if(window.getComputedStyle){
		result = window.getComputedStyle(oDiv, false)[direct];
	}else{
		result = oDiv.currentStyle[direct];
	}
	return result;
}
//匀速运动
function equlMove(oDiv, nTarget, nSpeed, direct){
	clearInterval(oDiv.timer);
	var offSet = parseInt(getStyle(oDiv, direct));
	if(nTarget<offSet){
		nSpeed *= -1;
	}
	oDiv.timer = setInterval(function(){
		offSet = parseInt(getStyle(oDiv, direct));
		if(Math.abs(nTarget-offSet) < Math.abs(nSpeed)){
			oDiv.style[direct] = nTarget + "px";
			clearInterval(oDiv.timer);	
		}else{
			oDiv.style[direct] = offSet + nSpeed + "px";
		}
	}, 10);
}
//运动框架
function fnMove(oDiv, oJson, fn){
	clearInterval(oDiv.timer);
	oDiv.timer = setInterval(function(){
		var bSwitch = true;
		for(var direct in oJson){
			var offset = parseInt(getStyle(oDiv, direct));
			if(direct == 'opacity'){
				offset = getStyle(oDiv, direct)*100;
			}
			var speed = (oJson[direct]-offset)/7;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(speed!=0){
				bSwitch = false;
			}
			if(direct == 'opacity'){
				oDiv.style[direct] = (offset + speed)/100;
				oDiv.style["filter"] = "alpha(opacity:"+(offset + speed)+")" ;
			}else{
				oDiv.style[direct] = offset + speed + "px";
			}
		}
		if(bSwitch){
			clearInterval(oDiv.timer);
			if(fn){
				fn();
			}
		}
	}, 30);
}