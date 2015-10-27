
frame.registerModule( {
	text : frame.lang.common.system.systemManage,
	children : [ 
	{
		text : frame.lang.frame.systemlog.maintainerManage,
		children : [ {
			text : "测试",
			
			className : 'com.module.common.orders.OrdersPanel'
		},
		{
			text : "测试2",
			
			className : 'com.module.common.orders.OrdersStatisticPanel'
		}
		]
 
	} ]

});

