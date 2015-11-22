


Ext.define("com.module.common.doctor.DoctorStatisticPanel",{
	extend:'Ext.panel.Panel',
	layout:'fit',
	modal:true,
	border : true,
	align:'stretch',
	autoScroll:true,
	height:'100%',

	initComponent:function(){
		var me=this;	
		 me.tbar = Ext.create('Ext.toolbar.Toolbar',
				{
					items : [
							

							{
								xtype : 'button',
								text : frame.lang.global._refresh,
								width:80,
			
								handler : function() {
									me.loadData();
								}
							}
							
							

					]

				});
		var panel= Ext.create('Ext.panel.Panel',
				
				{  layout:'fit',
				    margin:'10 0 0 0',
					autoScroll:true,
					listeners:{
						afterrender:function()
						{

							var alarmChart = new Highcharts.Chart({
								chart : {
									width:1200,
									height:450,
									type : 'column',
									renderTo:panel.id
								},
								title: { text: "医生统计报表" }, 
								xAxis: {
						            categories: [
						               "分类信息"
						            ]
					            }, 
								yAxis: { 
									min: 0, 
									allowDecimals:false,
									title: { 
										text:'总数'
										} 
									}, 
								tooltip: {
						            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						                '<td style="padding:0"><b>{point.y} </b></td></tr>',
						            footerFormat: '</table>',
						            shared: true,
						            useHTML: true
					       		 }, 
								plotOptions: { 
									column: { 
										dataLabels:{
											enabled:true 
										},
										pointPadding: 0.18, 
										borderWidth: 0 } 
								},
				                credits: {   
				                	//去掉官网标示
				                    enabled: false
				                }
							});
							me.alarmChart = alarmChart;	
							var series1 = { 
								name: "医生总数",			
								color:'#990000'
							};
							var series2 = { 
								name: "审核通过医生数",		
								color:'#CC6633'
							};
							var series3 = { 
								name: "正在审核医生数",		
								color:'#FF9900'
							};
							var series4 = { 
							    name: "主任医师",		
								color:'#0066CC'
								 
							};
							var series5 = { 
							    name: "副主任医师",		
								color:'#AAAACC'
								 
							};
							var series6 = { 
							    name: "主治医师",		
								color:'#BBBBCC'
								 
							};
							var series7= { 
							    name: "住院医师",		
								color:'#CCCCCC'
								 
							};
					
							alarmChart.addSeries(series1);
							alarmChart.addSeries(series2);
							alarmChart.addSeries(series3);
							alarmChart.addSeries(series4);
							alarmChart.addSeries(series5);
							alarmChart.addSeries(series6);
							alarmChart.addSeries(series7);

							me.loadData(true);
						
						}
					}
						
						
				}
		
		)
	    me.items=[panel];
		me.callParent();
	},	
	loadData:function(auto){
		var me = this;
		Ext.Ajax
		.request( {
			url : basePath + 'BackDoctorController/statisticDoctor',
			params : {
			
			},
			success : function(response, options) {
				var result = Ext
						.decode(response.responseText);
				if (result.success == true) {
					if(!auto)
				   {
					frame.util.QuickMsg
						.operateSuccess(response);
				   }
					
					var chart = me.alarmChart;  
					var statistic=result.returnData;
					//给柱状图设值
					chart.series[0].setData([statistic.total]);
					chart.series[1].setData([statistic.pass]);
					chart.series[2].setData([statistic.passing]);
					chart.series[3].setData([statistic.level1]);
				    chart.series[4].setData([statistic.level2]);
					chart.series[5].setData([statistic.level3]);
					chart.series[6].setData([statistic.level4]);

				} else {
					if(!auto)
					{
					frame.util.QuickMsg.operateFailure(response);
					 }
				}
			},
			failure : function(response, options) {
				frame.util.QuickMsg
						.showMsg(frame.lang.global.netError);
				;
			}
		});
		
	}
});