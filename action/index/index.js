//var getJson = require('../getJson.js');
var http = require('http');
var request = require('../../widget/request/request.js');
var tool = require('../../widget/tool/tool.js');
var domain = require('../domain.js');
var requestList = [
	{
		id: 'data', 
		url: domain + '/api/data.json',
	}			
];


module.exports = function(req, res, next){
	var datas = {}
		arr = [];   
	// arr[arr.length] = new Promise(function (resolve) {  
	//     request(domain+'/car/brand?type=0', req.headers, function(data){
	// 	    datas['hotBrand'] = JSON.parse(data.data);
	// 	    resolve();		    	
	//     });
	// });  
	// arr[arr.length] = new Promise(function (resolve) {  
	//     request(domain+'/activity/newList', req.headers, function(data){
	// 	    datas['banner'] = data.data.listFirst;
	// 	    datas['ads'] = data.data.listNext;
	// 	    resolve();		    	
	//     });
	// });  	    		
	requestList.forEach(function(item){ 
		arr[arr.length] = new Promise(function (resolve) { 
			request(item.url, req.headers,function(json, err){
				datas['list'] = json.data.list
				resolve();
			})
		}); 		
	});

	Promise.all(arr).then(function (result) {  
		res.render('index/index.html', datas);
	});  
}