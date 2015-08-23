frame.registerModule({
	text : "统计报表",
	children : [ {
		text : "订单统计",
		children : [ {
			text : "订单统计总览",
			className : 'com.module.common.statistic.OrdersStatisticPanel'
		}, {
			text : "医生订单统计",
			className : 'com.module.common.statistic.DoctorOrdersStatisticPanel'
		}, {
			text : "用户订单统计",
			className : 'com.module.common.statistic.UserOrdersStatisticPanel'
		},
		 {
			text : "区域订单统计",
			className : 'com.module.common.statistic.AreaOrdersStatisticPanel'
		}


		]
	}

	]
});