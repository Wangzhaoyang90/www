//function $(sel,parent,tagName){
//	parent=parent||document;
//	tagName=tagName||"*";
//	if(sel.charAt(0)=="#"){
//		return document.getElementById(sel.substring(1));
//	}else if(sel.charAt(0)=="."){
//		var allEls=parent.getElementsByTagName(tagName);
//		var arrAllEls=[];
//		for(var i=0;i<allEls.length;i++){
//			var arrClassNames=allEls[i].className.split(" ");
//			for(var j=0;j<arrClassNames.length;j++){
//				if(arrClassNames[j]==sel.slice(1)){
//					arrAllEls.push(allEls[i]);
//					break;
//				}
//			}
//		}
//		return arrAllEls;
//	}
//	else{
//		return parent.getElementsByTagName(sel);
//	}
//}	
//封装一个兼容的 获取最终计算后的样式的方法
function getStyle(obj,attr){
	return	obj.currentStyle ?obj.currentStyle[attr] :getComputedStyle(obj)[attr];
}

//这是一个查找数组的值得方法
	function arrIndexOf(arr,val,index){
		if(arguments.length!=0&&arguments.length!=1){
			index=index||0;
			for(var i=index;i<arr.length;i++){
				if(arr[i]===val){
					return i;
				}
			}
			
			return -1;
		}
		return "您写的参数不对";
	}
//封装一个添加class的函数	
function addClass(obj,className){
	if(obj.className==""){
		obj.className=className;
	}else{
		var arrClassNames=obj.className.split(" ");
			
		var Index=arrIndexOf(arrClassNames,className)
		if(Index==-1){
			obj.className+=" "+className;
		}
	}
}

//封装一个删除class的函数
function removeClass(obj,className){
	if(obj.className!==""){
		var arrClassNames=obj.className.split(" ");
		for(var j=0;j<arrClassNames.length;j++){
			
			if(arrClassNames[j]==className){
				
				arrClassNames.splice(j,1);
			}
		}
		obj.className=arrClassNames.join(" ");
	}
}
		
		
	//封装一个兼容性的一个getElementsByClassName函数
	function getClassName(myLei,parent,tagName){
		 parent=parent||document;
		 tagName=tagName||"*";
		 var aELs=parent.getElementsByTagName(tagName);
		 //建立一个空数组，用于存储所有符合要找的类的元素
		 var arrEls=[];
		 //遍历所有标签
		for(var i=0;i<aELs.length;i++){
			//每次循环将对应标签的class拿到，通过空格分割转化成数组
			var arrClassNames=aELs[i].className.split(" ")// ""[""]  "aa" ["aa"] "cc aa box" ["cc","aa","box"]
			//循环数组里面的所有类名
			for(var j=0;j<arrClassNames.length;j++){//["cc","aa","box"];
			//一旦有一个类名符合当前要找的类
				if(arrClassNames[j]==myLei){
					//就把当前的标签往数组里面放
					arrEls.push(aELs[i]);"aa"
					//不再往后看
					break;
				}
			};
			
		};
		//当整个循环结束之后，返回该数组 （数组里面会存下所有符合当前类的标签）
		return arrEls;// div li
		
	}





//这是一个dom的节点兼容的函数封装 
	
			function first(eles){

				var first=eles.firstElementChild||eles.firstChild;
				if(!first||first.nodeType!==1){
					return null;
				}else{
					return first;
				}
			}
			
			function last(eles){
				var last=eles.lastElementChild||eles.lastChild;
				if(!last||last.nodeType!==1){
					return null;
				}else{
					return last;
				}
			}
			function next(eles){
				var next=eles.nextElementSibling||eles.nextSibling;
				if(!next||next.nodeType!==1){
					return null;
				}else{
					return next;
				}
			}
			function prev(eles){
				var prev=eles.previousElementSibling||eles.previousSibling;
				if(!prev||prev.nodeType!==1){
					return null;
				}else{
					return prev;
				}
			}
			
			
			
			
			
			
			
			
			
			function getPos(ele){
			var Pos={left:0,top:0}
			while(ele.offsetParent){
				Pos.left+=ele.offsetLeft;
				Pos.left+=(ele.offsetParent.offsetWidth-ele.offsetParent.clientWidth)/2;
				Pos.top+=ele.offsetTop;
				Pos.top+=(ele.offsetParent.offsetHeight-ele.offsetParent.clientHeight)/2;
				ele=ele.offsetParent;
			}
			return Pos;
		}
		
		
		
	//封装元素划出划入的速度	
		function Movejs(obj,attr,speed,target,callBack){
				if(obj.timer) return;
				var num = parseFloat(getStyle( obj,attr )); 
				speed = num > target ? -Math.abs(speed) : Math.abs(speed);
				obj.timer = setInterval(function (){
					num += speed;
					if( speed > 0 && num >= target || speed < 0 && num <= target  ){
						num = target;
			
						clearInterval(obj.timer);
						obj.timer = null; //设置保存定时器的的值为null
						obj.style[attr] = num + "px";
			
						(typeof callBack === "function") && callBack();
			
					}else{
						obj.style[attr] = num + "px";
					}
					
			
				},30)	
			}  
	//封装格式化日期
	function fnWeek(date){
		var nWeek=date.getDay();
		var aWeek=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
		return aWeek[nWeek];
	}
	//以下为封装年月日-------------------------------------
	function fnDate(dDate,smark){
		var nYear=dDate.getFullYear();
		var nMonth=Buling(dDate.getMonth()+1);
		var nDay=Buling(dDate.getDate());
		if(smark){
			return nYear+smark+nMonth+smark+nDay;
		}else{
			return nYear+'年'+nMonth+'月'+nDay+'日';
		}
				
	}
	//以下为封装时分秒-------------------------------------
	function fnTimes(dDate,smark){
		var nHours=Buling(dDate.getHours());
		var nMin=Buling(dDate.getMinutes());
		var nSen=Buling(dDate.getSeconds());
		if(smark){
			return nHours+smark+nMin+smark+nSen;
		}else{
			return nHours+'时'+nMin+'分'+nSen+'秒';
		}
	}
	
	//以下为封装月，日格补零-------------------------------------	
	function Buling(num){
		if(num<10){
			return num='0'+num;
		}else{
			return num=''+num;
		}
	}
	//以下为封装计算某月天数-------------------------------------
	function fnHaveDays(date){
		var nYear=date.getFullYear();
		var nMonth=date.getMonth();
		var dDate01=new Date(nYear,nMonth,1);
		var dDate02=new Date(nYear,nMonth+1,1);
		var nDays=(dDate02.getTime()-dDate01.getTime())/1000/60/60/24;
		return nDays;
	}
	//以下为封装设置cookie-------------------------------------
	function setCookie(sKey, sVlaue, passDay){//键，值， 过期天数
	//创建过期时间
	var dDate = new Date();
	dDate.setDate(dDate.getDate()+passDay);
	
	//设置cookie
	//存放cookie应该以名值对儿的形式，key=value;
	document.cookie = sKey+"="+sVlaue+"; expires="+dDate;
}
//以下为封装获取cookie-------------------------------------
function getCookie(sKey){
	var result = "";
	
	//将整条cookie分割为键值对儿的数组：["name=张三", "age=12"];
	var aCookie = document.cookie.split("; ");
	for(var i=0; i<aCookie.length; i++){
		
		//通过“=”将键值对儿拆分为数组：["name", "张三"];
		var aCook = aCookie[i].split("=");
		
		//匹配sKey，如果aCook[0] === sKey,则拿到这个值
		if(aCook[0] === sKey){
			result = aCook[1];
		}
	}
	
	return result;//返回取到的值
}

//以下为封装通过className获取元素-------------------------------------
function getByClass(oBox,sClass){
	var aTag=oBox.getElementsByTagName('*');
	var result=[];
	for(var i=0;i<aTag.length;i++){
		if(aTag[i].className==sClass){
			result.push(aTag[i])
		}
	}
	return result;
}

//以下可以封装在tool2.js中，是匀速运动的意思
function fnMove(oDiv,nTarget,speed,direct){
		clearInterval(oDiv.timer)
		var offset=parseInt(GetStyle(oDiv,direct))
		if(nTarget<offset){
			speed*=-1;
		}
	oDiv.timer=setInterval(function(){
		var offset=parseInt(GetStyle(oDiv,direct))
		if(Math.abs(nTarget-offset)<Math.abs(speed)){
			clearInterval(oDiv.timer);
			oDiv.style[direct]=nTarget+"px"
		}else{
			oDiv.style[direct]=offset+speed+"px";
		}
	},10)
	
}
//以下可以封装在tool2.js中，获取非行间样式的属性	
function GetStyle(oDiv,direct){
	var result=''
	if(window.getComputedStyle){
		result= window.getComputedStyle(oDiv,false)[direct]
	}else{
		result= oDiv.currentStyle[direct]
	}
	return result;
}

