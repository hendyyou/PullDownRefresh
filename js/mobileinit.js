$(document).bind("mobileinit", function(){   
		$.mobile.defaultPageTransition = "slide";         
		// $.mobile.autoInitialize=false; //删除这行配置参数就会出现渲染错误 
		// $.mobile.page.prototype.options.addBackBtn= true ;
		// $.mobile.page.prototype.options.backBtnText = "后退";
		// $.mobile.hashListeningEnabled=false; //取消记录hash变化
		$.mobile.activeBtnClass="ui-btn-hover-a";
		// $.mobile.page.prototype.options.domCache = true; 

	});  