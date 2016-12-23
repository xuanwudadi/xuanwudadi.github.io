define(function (require, exports, module) {

	require('modules/list/list.css');

	var List = Backbone.View.extend({

		tpl: _.template('<a href="#layer/<%=id%>"><img src="<%=url%>"></a>'),

		leftHeight: 0,//记录左侧列高度实现瀑布流

		rightHeight: 0,//记录右侧列高度实现瀑布流
		
		page: 1,//获取数据页数
		word: '全部',//图片搜索词

		initialize: function(){
			//创建页面，需初始化一些数据
			//获取数据
			this.getData(this.word,this.random());
			
			//获取图片容器元素
			this.initDom();
			//监听集合add事件，每添加一个集合模型 就将该模型对象渲染到页面中
			this.listenTo(this.collection,'add',function(model,collection){

				this.render(model);
				// console.log(model)
			});
			var $li = $(".nav li");
			//点击实现搜索功能
			var This = this;
			this.$el.find("#btn").click(function(){
				$li.removeClass('on');
				This.showSearchView();

			});
			//瀑布流懒加载效果
			this.showMove(This.word);
			//图片分类
			$li.click(function () {
				$(this).addClass('on').siblings().removeClass('on');
				$(".nav h4").removeClass("on");
				//console.log(This.collection)
				var type = $(this).attr("data-type");
				//清空模板
				This.collection.remove(This.collection.models);
				//清除搜索框内容
				$(".search input").get(0).value = '';

				This.showTypeView(type);
				//瀑布流加载
				$(window).unbind();
				This.showMove(type);
				//console.log(This.collection)
			});
			//显示全部
			$(".nav h4").click(function(){
				// console.log(This.collection.models)
				This.clearHtml();
				// //重新渲染
				// This.collection.models.forEach(function(obj){
				// 	This.render(obj);
				// });
				$li.removeClass('on');
				$(this).addClass("on");
				This.collection.remove(This.collection.models);
				This.page = 1;
				This.getData("全部", This.page)
				$(window).unbind();
				This.showMove("全部");
			});
			//返回顶部
			$(".returnTop").click(function(){
				document.body.scrollTop = 0;
			});
		},
		random: function(){
			return Math.floor(Math.random()*50)
		},
		//瀑布流加载特效
		showMove: function(word){
			var This = this;
			var time = new Date();
			$(window).on("scroll",function(){

				var h = $(window).height()+$(window).scrollTop() - $(document).height()+100;
				//console.log(h)
				if (h>0) {
					if (new Date() - time > 500) {
						This.page += 10;
						time = new Date();
						//console.log(This.page)
						This.getData(word,This.page);
					}
						
				};
				if ($(window).scrollTop()>120) {
					$(".nav").addClass("fixed");
				}else {
					$(".nav").removeClass("fixed");
				}
			});
		},

		getData: function(word,page){
				this.collection.fetchData(word,page);
		},
		initDom: function(){

			this.leftContainer = this.$el.find('.left');

			this.rightContainer = this.$el.find('.right');
		},
		render: function (model) {
			//获取数据
			var data = {
				id: model.get('id'),
				url: model.get('thumbURL'),
				// style: 'width:' + model.get('viewWidth') + 'px;height:' + model.get('viewHeight') + 'px'
			}
			
			//获取模板
			var tpl = this.tpl;
			//用模板格式化数据
			var html = tpl(data);
			// console.log(html)
			//页面渲染数据
			if (this.leftHeight <= this.rightHeight) {
				this.leftContainer.append(html);
				this.leftHeight = this.leftContainer.height() + 6;
			}else {
				this.rightContainer.append(html);
				this.rightHeight = this.rightContainer.height() + 6;
			}
		},
		//获取搜索框的值
		getSearchValue: function () {
			return this.$el.find('.search input').val();
		},
		//检测值是否合法
		checkValue: function(value){
			//当数据为空的时候 不合法
			if (/^\s$/.test(value)) {
				alert('请输入搜索词');
				return false
			}
			return true;
		},
		
		//清空左右两侧内容重新添加搜索到的内容
		clearHtml: function () {
			this.$el.find('.left').html('');
			this.$el.find('.right').html('');
			this.leftHeight = 0;
			this.rightHeight = 0;
		},
		//根据搜索的内容渲染页面
		showSearchView: function(){
			//获取搜索内容
			var value = this.getSearchValue();
			//console.log(value)
			//判断值是否合法
			if (!this.checkValue(value)) {
				return
			}
			//过滤字符的首位空白符
			value = value.replace(/^\s+|\s+$/g, '');
			//console.log('|'+value+'|')
			//先清空页面
			this.clearHtml();
			this.collection.remove(this.collection.models);
			//重新获取数据
			this.page = 1;
			this.getData(value,this.page);
			//瀑布流加载
			$(window).unbind();
			this.showMove(value);
		},
		//根据图片分类渲染
		showTypeView: function (type) {
			this.clearHtml();
			//重新获取数据
			this.page = 1;
			this.getData(type,this.page);
		}
	});
	//var list = new List();
	module.exports = List
});