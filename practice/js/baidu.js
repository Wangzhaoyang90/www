//记录当前操作的基表
var currentJb="";
$(document).ready(function () {
	//currentTbl ="jb_cplb";
	//初始化藏品类别列表
	//createTable('#'+currentJb,'/antiques/sysmanage.getTable.do','id',eval(tblname+'Columns'),param);
	//页签点击时加载对应的列表
	//$(".col-sm-2 li").click(function(){
		//获取基表维护表名
		//var tblname = $(this).children("a").attr("href").replace('#tab_','');
		//currentJb ="jb_"+tblname;
		//显示对应的tab-pane
		//$(".tab-pane").hide();
		//$("#tab_"+tblname).show();
		//生成对应的列表
		//var param = {'tableName':currentJb};
		//createTable('#'+currentJb,'/antiques/sysmanage.getTable.do','id',eval(tblname+'Columns'),param);
	//});	
	
	
	
	
	currentTbl="jb_cplb";
	$(".col-sm-2 li").click(function(){
		var tblname=$(this).children('a').attr('href').replace('#tab_','');
		//alert(tblname);
		currentJb='jb_'+tblname;
		$('.tab-pane').hide();
		$('#tab_'+tblname).show();
		var param={'tablename':currentJb};
		createTable('#'+currentJb,'/antiques/sysmanage.getTable.do','id',eval(tblname+'Columns'),param)
	})
	
	
	
	
	
	
	
	//增加/修改保管部门
	$("#btn_add_bgbm").click(function(){
		add_update_tbl("bgbm","保管部门");
	});
	
	//增加/修改藏品级别
	$("#btn_add_cpjb").click(function(){
		add_update_tbl("cpjb","藏品级别");
	});
	//增加/修改质量单位
	$("#btn_add_zldw").click(function(){
		add_update_tbl("zldw","质量单位");
	});
	//增加/修改质量范围
	$("#btn_add_zlfw").click(function(){
		add_update_tbl("zlfw","质量范围");
	});
	//增加/修改来源方式
	$("#btn_add_lyfs").click(function(){
		add_update_tbl("lyfs","来源方式");
	});
	//增加/修改完残程度
	$("#btn_add_wccd").click(function(){
		add_update_tbl("wccd","完残程度");
	});
	//增加/修改保存状态
	$("#btn_add_bczt").click(function(){
		add_update_tbl("bczt","保存状态");
	});
	//增加/修改入藏时间范围
	$("#btn_add_rcsjfw").click(function(){
		add_update_tbl("rcsjfw","入藏时间范围");
	});
	//增加/修改雌雄
	$("#btn_add_cx").click(function(){
		add_update_tbl("cx","雌雄");
	});
	//增加/修改甲骨材质
	$("#btn_add_jgcz").click(function(){
		add_update_tbl("jgcz","甲骨材质");
	});
	//增加/修改甲骨组类
	$("#btn_add_jgzl").click(function(){
		add_update_tbl("jgzl","甲骨组类");
	});
	//增加/修改甲骨五期
	$("#btn_add_jgwq").click(function(){
		add_update_tbl("jgwq","甲骨五期");
	});
	//增加/修改甲骨辞类
	$("#btn_add_jgcl").click(function(){
		add_update_tbl("jgcl","甲骨辞类");
	});
	//增加/修改甲骨内容
	$("#btn_add_jgnr").click(function(){
		add_update_tbl("jgnr","甲骨内容");
	});
	//增加/修改甲骨旧藏
	$("#btn_add_jgjc").click(function(){
		add_update_tbl("jgjc","甲骨旧藏");
	});
	//增加/修改岩矿分类
	$("#btn_add_ykfl").click(function(){
		add_update_tbl("ykfl","岩矿分类");
	});
	//增加/修改保护优先等级
	$("#btn_add_bhyxdj").click(function(){
		add_update_tbl("bhyxdj","保护优先等级");
	});
	//增加/修改拍摄方向
	$("#btn_add_psfx").click(function(){
		add_update_tbl("psfx","拍摄方向");
	});
	$(".del_btn").click(function(){		
		//delMultRecord('#jb_bgbm',"/sysmanage.deleteRowInTable.do",currentJb);	
	});
})

//增加/修改内容提交
function add_update_tbl(tabname,alertInfo){
	var recordID="";
	var recordID = $('#form_'+tabname+' input[name=id]').val();
	if(recordID == undefined ||recordID == null || recordID== ""){
	   var params =$('#form_'+tabname).serializeObject();
	   params["tableName"] = "jb_"+tabname;
	   var result="";
	   result = ajaxResult("post",false,ProjectName+"/sysmanage.addRowInTable.do",params);
	   if(result["status"] == 'ok'){
		   alertFunc("增加"+alertInfo+"信息成功！");		
		   $('#'+tabname+'Modal').modal('hide');
		   $('#jb_'+tabname).bootstrapTable('refresh');
	   }else{
		   alertFunc(result["message"]);
	   }	
	}
	else{
	   var updateID = $('#form_'+tabname+' input[name=id]').val();
	   var params =$('#form_'+tabname).serializeObject();
	   params["tableName"] = "jb_"+tabname;
	   var result="";
	   if(updateID == undefined ||updateID != null || updateID != ""){
		   result = ajaxResult("post",false,ProjectName+"/sysmanage.UpdateTable.do",params);
		   if(result["status"] == 'ok'){
			   alertFunc("修改"+alertInfo+"信息成功！");		
			   $('#'+tabname+'Modal').modal('hide');
			   $('#jb_'+tabname).bootstrapTable('refresh');
		   }else{
			   alertFunc(result["message"]);
		   }
	   }
	}
}

//点击增加按钮，改变模态框中保存按钮的值
function modal_add(tabname){
	$('#form_'+tabname)[0].reset();
	$("#btn_add_"+tabname).text("增加");
}

//点击修改按钮，填充修改表单
function modal_modi(data){
	var tabname = currentJb.replace("jb_","");
	loadData("#form_"+tabname,data);	
	$("#btn_add_"+tabname).text("修改");
	$('#'+tabname+'Modal').modal('show');
}

//删除记录
function del_jb(id){		
	var params = new Object();
	params["id"] = id;
	params["tableName"] = currentJb;	
	delRecord("#"+currentJb,"/sysmanage.deleteRowInTable.do",params);	
}

/* 保管部门表头开始  */
var bgbmColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '保管部门名称'
    },{
     field: 'sorted',
	 title: '排序编号'
    },{
     field: 'operate',
     title: '操作',
     formatter : operateFormat
    }];

/* 藏品级别表头开始  */
var cpjbColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '藏品级别名称'
    },{
     field: 'sorted',
	 title: '排序编号'
    },{
     field: 'operate',
     title: '操作',
     formatter : operateFormat
    }];

/* 质量单位表头开始  */
var zldwColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '质量单位名称'
    },{
     field: 'sorted',
	 title: '排序编号'
    },{
     field: 'operate',
     title: '操作',
     formatter : operateFormat
    }];

/* 质量范围表头开始  */
var zlfwColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '质量范围名称'
    },{
     field: 'sorted',
	 title: '排序编号'
    },{
     field: 'operate',
     title: '操作',
     formatter : operateFormat
    }];

/* 来源方式表头开始  */
var lyfsColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '来源方式名称'
    },{
     field: 'sorted',
	 title: '排序编号'
    },{
     field: 'operate',
     title: '操作',
     formatter : operateFormat
    }];

/*完残程度表头开始 */
var wccdColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '完残程度名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

/* 保存状态表头开始  */
var bcztColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '保存状态名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

/* 入藏时间范围表头开始  */
var rcsjfwColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '保入藏时间范围名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

/* 雌雄表头开始  */
var cxColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '雌雄名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

/* 甲骨材质表头开始  */
var jgczColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '甲骨材质名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

/* 甲骨组类表头开始  */
var jgzlColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '甲骨组类名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

/* 甲骨五期表头开始  */
var jgwqColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '甲骨五期名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];


/* 甲骨辞类表头开始  */
var jgclColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '甲骨辞类名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

/* 甲骨内容表头开始  */
var jgnrColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '甲骨内容名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

/* 甲骨旧藏表头开始  */
var jgjcColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '甲骨旧藏名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

/* 岩矿分类表头开始  */
var ykflColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '岩矿分类名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

/* 保护优先等级表头开始  */
var bhyxdjColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '保护优先等级名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

/* 拍摄方向表头开始  */
var psfxColumns=[{
	 field: 'check',
	 checkbox: true
    },{
	 field: 'id',
	 visible:false
    },{
	 field: 'name',
	 title: '拍摄方向名称'
   },{
    field: 'sorted',
	 title: '排序编号'
   },{
    field: 'operate',
    title: '操作',
    formatter : operateFormat
   }];

//表格操作列
function operateFormat(value, row, index) {  	
  	return "<a onclick='modal_modi("+JSON.stringify(row)+")' href='javascript:void(0)'>修改</a>&nbsp;&nbsp;&nbsp;<a onclick='del_jb("+row.id+")' href='javascript:void(0)'>删除</a>";
} 
//-------------------------------------------------------------------------------------------------------------

/**
 * @author:ruimin
 * @date:2016年10月25日
 * @description:
 */

var ProjectName = "/antiques";

var userInfo;

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
       参数说明：tableid:tableid,url：请求url,uniqueId：主键,columns：表头,formParams:查询条件对象
 */
function createTable(tableid, url, uniqueId, columns,formParams) {	
			$(tableid).bootstrapTable({
				striped: true, 
				url: url, //请求后台的URL（*）
				method: 'get', //请求方式（*）
				toolbar: '#toolbar', //工具按钮用哪个容器
				striped: true, //是否显示行间隔色
				cache: true, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
				pagination: true, //是否显示分页（*）
				sortable: false, //是否启用排序
				sortOrder: "asc", //排序方式
				queryParams: queryParams, //传递参数（*）
				sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
				pageNumber: 1, //初始化加载第一页，默认第一页
				pageSize: 10, //每页的记录行数（*）
				pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
				// search: true,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
				strictSearch: true,
				//showColumns: true, //是否显示所有的列
				//showRefresh: true, //是否显示刷新按钮
				minimumCountColumns: 2, //最少允许的列数
				clickToSelect: true, //是否启用点击选中行
				//height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
				uniqueId: uniqueId, //每一行的唯一标识，一般为主键列
				showToggle: false, //是否显示详细视图和列表视图的切换按钮
				cardView: false, //是否显示详细视图
				detailView: false, //是否显示父子表				
				columns: columns
			});	
			
			function queryParams(params) {
				formParams["limit"] =params.limit;
				formParams["offset"] =params.offset;
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
/*
//加载日期时间控件
function setDatetimepicker(t_dom){
	var datetimeOption={
			language: 'zh-CN',
			format: "yyyy-mm-dd",
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			endDate: new Date(),
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
	};
	$(t_dom).datetimepicker(datetimeOption).on('changeDate', function(e) {
		var startTime = e.date;
	});	
}*/

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
	$.ajax({
		  type: 'GET',
		  url: ProjectName+"/root.checkLogin.do",
		  error:function(){
			  //redirect
			  window.parent.location.href = ProjectName;
		  },
		  success:function(result){
				  //funcName(param);
		  }
	});
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

/**
 * 判断用户是否有权限访问该页面
 * @param funcName
 * @param param
 */

function checkUserRight(){
	
	$.ajax({
		  type: 'GET',
		  url: ProjectName+"/root.getUserInfo.do",
		  error:function(){
			  //redirect
			  window.parent.location.href = ProjectName;
		  },
		  success:function(result){
			  if(result != null){
					if(result["status"]== "OK"){
						userInfo =result["data"]; 
					}else{
						alertFunc(result["error"]);
					}
				}
		  }
	});	
}

//删除表中记录
function delRecord(tableid,url,params){	
	result = ajaxResult("post",false,ProjectName+url,params);
	   if(result["status"] == 'ok'){
		   alertFunc("记录删除成功！");			
		   $(tableid).bootstrapTable('refresh');
	   }else{
		   alertFunc(result["error"]);
	   }
}

//批量删除表中记录
function delMultRecord(tableid,url,datatblid){
	var selectData = $(tableid).bootstrapTable('getSelections');
	var ids = new Array();
	$.each(selectData,function(index,value){
		ids.push(value["id"]);
	});	
	if(ids.length == 0){
		alertFunc("请选择要删除的记录！");
		return false;
	}
	result = ajaxResult('post',false,ProjectName+url,{'tableName':datatblid,'ids':ids});
	   if(result["status"] == 'ok'){
		   alertFunc("记录删除成功！");			
		   $(tableid).bootstrapTable('refresh');
	   }else{
		   alertFunc(result["error"]);
	   }
}

//alert提醒
function alertFunc(notice,callbackCode){
	bootbox.alert(notice,callbackCode);
}

//日期函数
//$('.dateInput').datetimepicker({
//      forceParse: 0,
//      todayBtn:  1,
//      autoclose: 1,
//      todayHighlight: 1,
//      minView: 2,
//      bootcssVer:3
//});