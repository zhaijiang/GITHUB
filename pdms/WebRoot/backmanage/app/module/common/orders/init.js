
frame.registerModule( {
	text : "订单管理",
	children : [ 
	{
		text : "订单管理",
		children : [ {
			text : "订单列表",
			
			className : 'com.module.common.orders.OrdersPanel'
		},
		{
			text : "订单支付",
			
			className : 'com.module.common.orders.OrdersPayPanel'
		},
		{
			text : "订单统计",
			
			className : 'com.module.common.orders.OrdersStatisticPanel'
		}
		
		
		]
 
	} ]

});

