//定义图片模块
define(function (require, exports, module) {
	//获取页面的宽度
	var w = ($(window).width())/2;
	//定义模块
	var ImgModel = Backbone.Model.extend({

		initialize: function () {
			//每添加一个模型计算一下图片渲染的宽高
			this.on('add',function(model){

				var h = model.get('height')/model.get('width') * w;

				model.set({

					viewWidth: w,
					
					viewHeight: h
				})
			})
		}
	})

	//暴露模型接口
	module.exports = ImgModel;
});