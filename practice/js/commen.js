/**
 * @author:ruimin
 * @date:2016年10月25日
 * @description:
 */
//项目名称
var ProjectName = "/antiques";
//访问入口页面地址
var homePage = "http://palace.sinosoft.com:8080/palace/";

//数据存储图像预览地址
var imageAddr="http://datamanage.sinosoft.com:8080/datamanage/LogicalObjectService.view.do?app_id=antiques&bucket_name=antiquesdata&object_key=";

//数据存储下载文件地址
var downloadAddr = "http://datamanage.sinosoft.com:8080/datamanage/LogicalObjectService.download.do?app_id=antiques&bucket_name=antiquesdata&object_key="
//保存当前用户信息
var userInfo;
//分页时每页显示记录数
var pageSize = 10;
//页面自适应
function pageResize(){
	var bodyHeight = $(document).height();
	var topHeight = 60;
	var containerHeight = bodyHeight - topHeight;
	$(".container").css("height",containerHeight);
}

//form表单中的数据转化为对象
$.fn.serializeObject = function(){
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		} 
	});
	return o;
};

//将json数据填写到form中
function loadData(formID,jsonStr){
	var obj =jsonStr;
	var key,value,tagName,type,arr;
	for(x in obj){
		key = x;
		value = obj[x];		
		//$(formID+" [name='"+key+"'],"+formID+" [name='"+key+"[]']").each(function(){
		$(formID+" [name='"+key+"'],"+formID+" [name='"+key+"[]']").each(function(){
			tagName = $(this)[0].tagName;
			type = $(this).attr('type');
			if(tagName=='INPUT'){
				if(type=='radio'){
					$(this).attr('checked',$(this).val()==value);
				}else if(type=='checkbox'){
					if((value+"").indexOf(',')>-1){
						arr = value.split(',');
					}else{
						arr = value;
					}
					for(var i =0;i<arr.length;i++){
						if($(this).val()==arr[i]){
							$(this).attr('checked',true);
							break;
						}
					}
				}else{
					$(this).val(value);
				}
			}else if(tagName=='SELECT' || tagName=='TEXTAREA'){
				$(this).val(value);
			}else if(tagName=='LABEL'){
				$(this).text(value);
			}else{
				$(this).val(value);
			}			
		});
	}
}

//ajax请求，带回调函数
function ajaxFunc(t_type,t_async,t_url,t_data,t_func,t_dom){
    $.ajax({
        type:t_type,
        dataType: 'json',
        async:t_async,
        url:t_url,
        data:t_data,
        success:function(data){
            t_func(data,t_dom);
        }
    });
}

//ajax请求，不带回调函数
function ajaxResult(t_type,t_async,t_url,t_data){		
	var result="";
	$.ajax({
		type:t_type,
		dataType: 'json',
		async:t_async,
		url:t_url,
		data:t_data,
		success:function(data){				
		    	result=data;		   
		}
	});	

	return result;
}

/*动态加载table
       参数说明：tableid:tableid,url：请求url,uniqueId：主键,columns：表头,formParams:可选参数,查询条件对象
 */
function createTable(tableid, url, uniqueId, columns,formParams) {	
	if(formParams == null ||formParams == undefined){
		 var formParams = new Object();
	 }	
	$(tableid).bootstrapTable({
		url: url, //请求后台的URL（*）
		method: 'get', //请求方式（*）
		dataType:'jsonp',
		toolbar: '#toolbar', //工具按钮用哪个容器
		striped: true, //是否显示行间隔色
		cache: true, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true, //是否显示分页（*）
		sortable: false, //是否启用排序
		//sortOrder: "asc", //排序方式		
		queryParams: queryParamsFunc, //传递参数（*）
		sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
		pageNumber: 1, //初始化加载第一页，默认第一页
		pageSize: pageSize, //每页的记录行数（*）
		pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
		// search: true,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		strictSearch: true,
		//showColumns: true, //是否显示所有的列
		//showRefresh: true, //是否显示刷新按钮
		minimumCountColumns: 2, //最少允许的列数
		clickToSelect: false, //是否启用点击选中行
		//height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId: uniqueId, //每一行的唯一标识，一般为主键列
		showToggle: false, //是否显示详细视图和列表视图的切换按钮
		cardView: false, //是否显示详细视图
		//detailView: true, //是否显示父子表	
		//showPaginationSwitch:true,
		columns: columns
		
	});	

	function queryParamsFunc(params) {
		formParams["limit"] =params.limit;
		formParams["offset"] =params.offset;
	    return formParams;
	}
}

//刷新表格，带分页
function refreshTable(tableid,formid){
	 var params =$(formid).serializeObject();
	 for (var sProp in params) {
		 if(params[sProp]=="" || params[sProp]==null ){
				delete params[sProp];
			}
	 }
	 params["limit"] = pageSize;
	 params["offset"] = 0;
	 $(tableid).bootstrapTable('refresh',{query:params});
};

//父子表
function createTableSub(tableid, url, uniqueId, columns,formParams) {	
	if(formParams == null ||formParams == undefined){
		 var formParams = new Object();
	}	
	var tableID = tableid;
	$(tableid).bootstrapTable({
		url: url, //请求后台的URL（*）
		method: 'get', //请求方式（*）
		toolbar: '#toolbar', //工具按钮用哪个容器
		striped: true, //是否显示行间隔色
		cache: true, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true, //是否显示分页（*）
		sortable: false, //是否启用排序
		//sortOrder: "asc", //排序方式
		queryParams: queryParamsFunc, //传递参数（*）
		sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
		pageNumber: 1, //初始化加载第一页，默认第一页
		pageSize: pageSize, //每页的记录行数（*）
		pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
		// search: true,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		strictSearch: true,
		//showColumns: true, //是否显示所有的列
		//showRefresh: true, //是否显示刷新按钮
		minimumCountColumns: 2, //最少允许的列数
		clickToSelect: false, //是否启用点击选中行
		//height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId: uniqueId, //每一行的唯一标识，一般为主键列
		showToggle: false, //是否显示详细视图和列表视图的切换按钮
		cardView: false, //是否显示详细视图
		detailView: true, //是否显示父子表	
		//showPaginationSwitch:true,
		columns: columns,
		//注册加载子表的事件。注意下这里的三个参数！
		onExpandRow: function (index, row, $detail) {
			InitSubTable(index, row, $detail);
		},
		onLoadSuccess:function () {
			//初始化第一列的加号图标，当利用主体为藏品时，不显示该图标
			$(tableID+" tr").each(function(index,content){
	    		if($(this).children("td").eq(5).text() == "藏品"){
	    			$(this).children("td").eq(0).html("");
	    		}
	    	});
		}
	});	
		
	//初始化子表格(无线循环) 获取附属物
	InitSubTable = function (index, row, $detail) {
		var zdjhVal = row.zdjh;
		var djbhVal = djbh;
		var cur_table = $detail.html('<table></table>').find('table');
		var subData = ajaxResult("get",false,ProjectName+'/colmanage.getCtkCpfswList.do',{zdjh:zdjhVal,djbh:djbhVal});
		$(cur_table).bootstrapTable({
			data:subData.rows,		
			method: 'get',
			clickToSelect: true,
			detailView: false,//父子表
			uniqueId: "fswbh",
			pagination: false,
			columns: [{
				checkbox: true
			}, {
				field: 'fswbh',
				title: '附属物编号'
			}, {
				field: 'fswmc',
				title: '附属物名称'
			}, {
				field: 'sl',
				title: '数量'
			}, {
				field: 'cksl',
				title: '出库数量'
			} ]			
		});
	}

	function queryParamsFunc(params) {
		formParams["limit"] =params.limit;
		formParams["offset"] =params.offset;
	 return formParams;
	}
}

//不分页表格
function createTableWithOutPage(tableid, url, uniqueId, columns,formParams) {	
		$(tableid).bootstrapTable({
			url: url, //请求后台的URL（*）
			method: 'get', //请求方式（*）
			toolbar: '#toolbar', //工具按钮用哪个容器
			striped: true, //是否显示行间隔色
			cache: true, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination: false, //是否显示分页（*）
			sortable: false, //是否启用排序
			//sortOrder: "asc", //排序方式
			queryParams: queryParams, //传递参数（*）
			sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
			pageNumber: 1, //初始化加载第一页，默认第一页
			pageSize: pageSize, //每页的记录行数（*）
			pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
			// search: true,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch: true,
			//showColumns: true, //是否显示所有的列
			//showRefresh: true, //是否显示刷新按钮
			minimumCountColumns: 2, //最少允许的列数
			clickToSelect: false, //是否启用点击选中行
			//height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId: uniqueId, //每一行的唯一标识，一般为主键列
			showToggle: false, //是否显示详细视图和列表视图的切换按钮
			cardView: false, //是否显示详细视图
			detailView: false, //是否显示父子表				
			columns: columns
		});	
		
		function queryParams(params) {
		    return formParams;
		}
}

/*动态加载分页组件paginator
参数说明：url：请求url,type:请求类型（get,post）,t_func：回调函数，dom:页面加载分页组件的元素,currentPage:当前页，pageCount：总页数
*/
function createPaginator(dom,url,t_currentPage,t_pageCount,t_func) {
	$.ajax({
		url: url,
		datatype: 'json',
		type: 'get',
		success: function (data) {
			if (data != null) {		
				t_func(data);
				//var pageCount = eval("(" + data + ")").pageCount; //取到pageCount的值(把返回数据转成object类型)
				//var currentPage = eval("(" + data + ")").CurrentPage; //得到urrentPage		
				var pageCount = t_pageCount; //取到pageCount的值(把返回数据转成object类型)
				var currentPage = t_currentPage; //得到urrentPage		
				var options = {
					bootstrapMajorVersion: 2, //版本
					currentPage: currentPage, //当前页数
					totalPages: pageCount, //总页数
					itemTexts: function (type, page, current) {
						switch (type) {
							case "first":
								return "<<";
							case "prev":
								return "<";
							case "next":
								return ">";
							case "last":
								return ">>";
							case "page":
								return page;
						}
					},//点击事件，用于通过Ajax来刷新整个list列表
					onPageClicked: function (event, originalEvent, type, page) {
						$.ajax({
							url: url,
							type: 'get',
							data: "page=" + page,
							success: function (data1) {
								if (data1 != null) {
									t_func(data);
								}
							}
						});
					}
				};
				$(dom).bootstrapPaginator(options);
			}
		}
	});
}

// 日期格式化
function startDate(){
	var Nowdate = new Date();
	var vYear = Nowdate.getFullYear();
	var startDate =vYear+"-"+ "01" +"-"+ "01";	
	return startDate;
}

//当前日期格式
function nowDate(){	
	var Nowdate = new Date();
	var vYear = Nowdate.getFullYear();
	var vMon = Nowdate.getMonth() + 1;
	var vDay = Nowdate.getDate();
	if(vDay<10){
		vDay="0"+vDay;
	}
	if(vMon<10){
		vMon="0"+vMon;
	}
	var today =vYear+"-"+ vMon +"-"+vDay;	
	return today;
}

//根据记录数和每页显示数，计算总页数
function caclPageCount(recordCount,pageSize){
	if(recordCount % pageSize != 0){
		return parseInt(recordCount / pageSize)+1;
	}else{
		return parseInt(recordCount / pageSize);
	}
}

/**
 * 判断是否登录
 * @param funcName
 * @param param
 */

function checkLogin(){
	var result = false;
	$.ajax({
		  type: 'GET',
		  async:false,
		  dataType: 'json',
		  url: ProjectName+"/root.checkLogin.do",
		  error:function(){
			  result = false;
			  //redirect
			  window.parent.location.href = homePage;
		  },
		  success:function(data){
			  if(data["status"]== "ok"){					
					result = true;
				}else{
					result = false;
					window.parent.location.href = homePage;
				}
		  }
	});
	return result;
}

/**
 *获取登录用户信息
 * @param funcName
 * @param param
 */

function getUserRight(){
	var result = false;
	$.ajax({
		  type: 'GET',
		  async:false,
		  dataType: 'json',
		  url: ProjectName+"/root.getUserInfo.do",
		  error:function(){
			  result = false;
			  //redirect
			  window.parent.location.href = homePage;
		  },
		  success:function(data){
			  if(data != null){
					if(data["status"]== "ok"){
						result = true;
						userInfo =data["data"]; 						
					}else{
						result = false;
						alertFunc(result["error"]);
						window.parent.location.href = homePage;
					}
				}
		  }
	});	
	return result;
}

/**
 * 获取url中的参数
 */
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

//删除表中记录
function delRecord(tableid,url,params){	
	bootbox.setLocale("zh_CN");
	bootbox.confirm("删除记录后不能恢复，确认删除当前记录吗？",function(r){
		if(r){
			result = ajaxResult("post",false,ProjectName+url,params);
		   if(result["status"] == 'ok'){
			   alertFunc("记录删除成功！");			
			   $(tableid).bootstrapTable('refresh');
		   }else{
			   alertFunc(result["error"]);
		   }
		}
	});
}

//获取表格中选中的id
function selDataIds(tableid){
	var selectData = $(tableid).bootstrapTable('getSelections');
	var ids = new Array();
	$.each(selectData,function(index,value){
		ids.push(value["id"]);
	});	
	return ids;
} 


//批量删除表中记录
function delMultRecord(tableid,url,datatblid,ids){	
	if(ids.length == 0){
		alertFunc("请选择要删除的记录！");
		return false;
	}
	bootbox.setLocale("zh_CN");
	bootbox.confirm("删除记录后不能恢复，确认删除选中记录吗？",function(r){
		if(r){
		   result = ajaxResult('post',false,ProjectName+url,{'tableName':datatblid,'ids':ids});
		   if(result["status"] == 'ok'){
			   alertFunc("记录删除成功！");			
			   $(tableid).bootstrapTable('refresh');
		   }else{
			   alertFunc(result["error"]);
		   }
		}
	});
}

//alert提醒
function alertFunc(notice,callbackCode){
	bootbox.alert(notice,callbackCode);
}

function loadSelect(dom,data,value,name){
	var result="<option value=''>==请选择==</option>";
	if(data!=null || data!=""){
		$.each(data,function(index,content){
			result +="<option value="+content[value]+">"+content[name]+"</option>";
		})
	}
	$(dom).html(result);
}

function chekform(formid){
	var isCheck= true;
	//验证必输项
	$(formid+" [required='true']").each(function(){
		if($(this).val()==null || $(this).val().trim()==""){
			errorMsg = $(this).attr("errorMsg")==undefined?"该项为必填项":$(this).attr("errorMsg");
			//$(this).attr("placeholder",errorMsg);
			$(this).next("span").remove();
			$(this).after("<span class='apendhtml' style='color: red;margin-left: 5px;'>"+errorMsg+"</span>");
			isCheck = false;
		}
	})
	return isCheck;
}

/**
 * 解析JSON数据到select下拉列表中
 * @param data:JSON数据
 * @param domId:select元素id
 */
function getSelectOptions(data,domId){
	var selectDom = document.getElementById(domId);
	selectDom.options.add(new Option('==请选择==',''));
	if(data.status == "ok"){
		$.each(data.rows,function(i,row){
			selectDom.options.add(new Option(row.name,row.id));
		})
	}
	else
		alertFunc("数据加载失败");
}

/**
 * 解析JSON数据到select下拉列表中
 * @param data:JSON数据
 * @param domId:select元素id
 */
function getSelectOptionsKF(data,domId){
	if(data.status == "ok"){
		$.each(data.rows,function(i,row){
			var selectDom = document.getElementById(domId);
			selectDom.options.add(new Option(row.kfmc,row.kfid));
		})
	}
	else
		alertFunc("数据加载失败");
}

//将日期时间格式化为日期
function dataFormat(value){
	var arr = value.split(" ");
	return arr[0];
}