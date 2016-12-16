$(document).ready(function(){
	createTable('#kf','http://antiques.sinosoft.com:8080/antiques/zversion/pages/query/antiques/kfquery.getKuFangList.do','id',tblColTitle);
	
})

var tblColTitle = [{
	        field: 'bgbmmc',
	        title: '部门'
	    }, {
	        field: 'kfmc',
	        title: '库房'
	    }, {
	        field: 'qbbzk',
	        title: '藏品数'
	    }, {
	        field: 'qbzs',
	        title: '全部在库藏品数'
	    }, {
	        field: 'cpls',
	        title: '全部不在库藏品数'
	    }, {
	        field: 'bfzk',
	        title: '部分在库藏品数'
	    }]