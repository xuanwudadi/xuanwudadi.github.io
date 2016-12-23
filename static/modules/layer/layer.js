define(function (require, exports, module) {

	require('modules/layer/layer.css');

	var Layer = Backbone.View.extend({
		tpl: _.template($('#tpl').text()),

		currentId: 0,

		events: {
			'swipeLeft .layerContainer img': 'showNext',
			'swipeRight .layerContainer img': 'showPrev',
			'click': 'reList'
		},
		showNext: function(){
			this.currentId++;
			var nextModel = this.collection.get(this.currentId);
			//改变当前模型的 title及url
			if (nextModel) {
				this.changeImg(nextModel);
			}else{
				alert('亲，最后一张了！')
			}
			
		},
		showPrev: function () {
			this.currentId--;
			var prevModel = this.collection.get(this.currentId);
			//改变当前模型的 title及url
			if (prevModel) {
				this.changeImg(prevModel);
			}else{
				alert('亲，最后一张了！')
			}

		},
		changeImg: function(model){
			var url = model.get('thumbURL');
			this.$el.find(".layer img").attr('src',url);
			var title = model.get('fromPageTitleEnc');
			this.$el.find("h2").html(title);
		},

		reList: function () {
			location.hash = "#";
		},

		initialize: function () {

		},

		render: function (id) {
			//his.$el.html('show layer');
			//获取对应id的模板实例化对象
			var data = this.collection.get(id);
			if (!data) {
				location.hash = "#";
				return;
			}
			//获取模板
			var tpl = this.tpl;
			//获取数据
			var layerData = {
				title: data.get('fromPageTitleEnc'),
				url: data.get('thumbURL')
			};
			//模板格式化数据
			var html = tpl(layerData);
			this.$el.find(".layer").html(html);
			
			this.currentId = id;
		}
	});
	//var layer = new Layer();
	module.exports = Layer
});