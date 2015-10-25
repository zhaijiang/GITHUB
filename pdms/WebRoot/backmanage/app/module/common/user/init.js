frame.registerModule({
	text :"用户管理",
	children : [
	 {
		 text : "用户管理",
		 children : [{
		    text : "用户信息",
		    className : 'com.module.common.user.UserPanel'
		 },
		 {
			    text : "用户统计",
			    className : 'com.module.common.user.UserStatisticPanel'
			 }]}
		
	]							
});