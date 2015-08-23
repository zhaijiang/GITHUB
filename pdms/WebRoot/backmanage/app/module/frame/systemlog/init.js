
frame.registerModule( {
	text : frame.lang.common.system.systemManage,
	permissionCode : 'common_system_systemManage',
	children : [ 
	{
		text : frame.lang.frame.systemlog.maintainerManage,
		permissionCode : 'frame.systemlog.maintainerManage',	
		children : [ {
			text : frame.lang.frame.systemlog.exceptionLog,
			permissionCode : 'frame.systemlog_FrameErrorLogPanel',
			classParam : {},
			className : 'com.module.frame.systemlog.FrameErrorLogPanel'
		},
		{
			text : frame.lang.frame.systemlog.warnInfoLog,
			permissionCode : 'frame.systemlog_FrameWarnInfoLogPanel',
			classParam : {},
			className : 'com.module.frame.systemlog.FrameWarnInfoLogPanel'
		}]
 
	} ]

});

