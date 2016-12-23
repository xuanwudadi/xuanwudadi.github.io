define(function (require,exports,module) {
	//依赖集合模块
	var ImgCollection = require('modules/collection/imgCollection');

	var Layer = require('modules/layer/layer');

	var List = require('modules/list/list');

	var imgCollection =  new ImgCollection();

	var layer = new Layer({
		el: $('#app'),
		collection: imgCollection
	});

	var list = new List({
		el: $('#app'),
		collection: imgCollection
	});
	//创建路由
	var Router = Backbone.Router.extend({
		routes: {
			'layer/:id': 'showLayer',
			'*other': 'showList'
		},
		showLayer: function (id) {
			//先隐藏List
			$("#app .list").hide();
			$("#app .layer").show();
			layer.render(id);
		},
		showList: function () {
			$("#app .list").show();
			$("#app .layer").hide();
		}
	});
	var router = new Router();
	//启动路由
	module.exports = function(){
		Backbone.history.start();
	}
});