//定义集合模块
define(function (require, exports, module) {
	//集合模块依赖模型
	var ImgModel = require('modules/model/imgModel');

	var ImgCollection = Backbone.Collection.extend({

		model: ImgModel,
		imgId: 0,//给每个图片定义一个id
		//为集合异步请求数据  数据格式不支持 fetch方法  自己配置
		fetchData: function (word,page) {
			var This = this;
			$.ajax({
				type: 'get',
				url: 'http://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&word='+word+'&pn='+page,
				dataType: 'jsonp',
				jsonp: 'callback',
			    error: function(XmlHttpRequest, textStatus, errorThrown) {
			        console.log(XmlHttpRequest, textStatus, errorThrown);
			    },
			    success: function(result) {
			    	
			        var res = result.data;
			        for(var i in res ){
			        	res[i].id = This.imgId++;
			        	This.add(res[i]);
			        }
					//console.log(result)
			    }
			});
		}

	});

	module.exports = ImgCollection;
})