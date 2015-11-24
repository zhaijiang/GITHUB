

frame.registerModule({
	text :"医生管理",
	children : [
	 {
		 text : "医生管理",
		 children : [{
		    text : "医生信息",
		    className : 'com.module.common.doctor.DoctorPanel'
		 },
		 {
			    text : "医生统计",
			    className : 'com.module.common.doctor.DoctorStatisticPanel'
			 }]}
		
	]							
});