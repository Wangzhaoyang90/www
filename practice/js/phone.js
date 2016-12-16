$(document).ready(function(){
	var oBtn=$('#btn');
	var oTxt = $("#txt");
	var oList = $('#list');
	$('#btn').click(function(){
		$('li').remove()
		var keys=oTxt.val();
		var param={'tel':keys,'key':'0ce9bd71b3576d4bb74b8d46055a58c1'};
		ajaxFunc('get',false,'http://op.juhe.cn/onebox/phone/query',param);
	})
	//-------------------------
	$(function(){//按回车键搜索 
		$(document).keydown(function(event){ 
			if(event.keyCode==13){ 
				$("#btn").click(); 
			}
		});
	});
})
function ajaxFunc(t_type,t_async,t_url,t_data){
    $.ajax({
        type:t_type,
        dataType: 'jsonp',
        async:t_async,
        url:t_url,
        data:t_data,
        success:function(data){
			$('#list').html("<li class='num'>"+data['result']['province']+data['result']['city']+data['result']['sp']+"</li>");
        }
    });
}   