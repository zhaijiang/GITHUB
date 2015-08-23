frame.registerModule({
	text :"日常管理",
	children : [
	 {
		 text : "医生管理",
		 children : [{
		    text : "医生信息",
		    className : 'com.module.common.manage.DoctorPanel'
		 }]},
		 {
			 text : "患者管理",
			 children : [{
			    text : "患者信息",
			    className : 'com.module.common.manage.UserPanel'
			 }]}
	]							
});