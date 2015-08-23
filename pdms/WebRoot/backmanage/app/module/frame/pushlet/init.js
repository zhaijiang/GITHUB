frame.registerModule({
	text : frame.lang.frame.pushlet.push,
	permissionCode:'frame_pushlet_pushManage',
	children : [{
		 text : frame.lang.frame.pushlet.moduleName1,
	     permissionCode:'frame_pushlet_pushMoudle',
		 children : [{
	        permissionCode:'frame_pushlet_TestPushlet',
		    text : frame.lang.frame.pushlet.testPushlet,
		    className : 'com.module.frame.pushlet.TestPushlet'
		 }]
	   
	
	}]
								
	
});