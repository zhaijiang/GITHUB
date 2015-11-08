
Ext.define('com.module.common.orders.OrdersStatisticPanel_SearhForm',
				{
					extend : 'Ext.form.Panel',
					alias : 'widget.OrdersStatisticPanel_SearhForm',
					height : 80,
					width : '100%',
					border : false,
					layout : 'column',
					buttonAlign : 'left',
					defaults : {
						labelAlign : 'left',
						border : false,
						margin : '8,0,0,20',
						labelWidth : 70,
						align : 'left'
					},
					initComponent : function() {
						var me = this;
					    var ymd=Ext.create('Ext.form.RadioGroup',{
					        columns: 4,
					        width:150, 
					        vertical: true,
					        defaults:{
					           width:60
					        },
					        items: [
					            { boxLabel: '年', name: 'yjm', inputValue: 'year' },
					            { boxLabel: '季度', name: 'yjm', inputValue: 'jidu'},
					            { boxLabel: '月', name: 'yjm', inputValue: 'month',checked: true }
					
					        ],
					        listeners:{
					        	change:function( field,  newValue,  oldValue)
					        	{
					        		alert("a");
					        		month.hide();
					        		jidu.hide();
					        		month.setDisabled(true);
					        		jidu.setDisabled(true);
					        		if(newValue.yjm=='month')
					        		{
					        			month.setDisabled(false);
					        			month.show();
					        		}
					        		if(newValue.yjm=='jidu')
					        		{
					        			jidu.setDisabled(false);
					        			jidu.show();
					        		}
					        	  
					        	}

					        }
					    })
		 var year = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel : "年",
			name : 'year',
			
			autoScroll:true,
			labelWidth:30,
			displayField : 'name',
			valueField : 'value',
			queryMode : 'local',
			editable : false,
			store : Ext.create('Ext.data.ArrayStore', {
				fields : [ 'name', 'value' ],
				data : [ [ '2015', 2015 ], [ '2016', 2016 ], [ '2017', 2017 ],[ '2018', 2018 ], [ '2019', 2019 ], [ '2020', 2020 ] ]

			}),
			listeners:{
				select:function(combo,records)
				{
					month.setDisabled(false);  
					jidu.setDisabled(false);  
				}
			}

		});
		var monthjidu={
		    '1':1,'2':1,'3':1,
			'4':2,'5':2,'6':2,
			'7':3,'8':3,'9':3,
			'10':4,'11':4,'12':4
		}
		var month = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel : "月",
			allowBlank:true,
			hidden:false,
			disabled:true,
			name : 'month',
			labelWidth:30,
			displayField : 'name',
			valueField : 'value',
			queryMode : 'local',
			editable : false,
			autoScroll:true,
			listeners:{
				
			},
			store : Ext.create('Ext.data.ArrayStore', {
				fields : [ 'name', 'value' ],
				data : [ [ '1', 1 ], [ '2', 2 ], [ '3', 3 ],[ '4', 4 ], [ '5', 5 ],[ '6', 6 ], [ '7', 7], [ '8',8 ],[ '9',9 ], [ '10',10 ],
				         [ '11', 11 ], [ '12', 12 ]
		
				]

			}),
			listeners:{
				select:function(combo,records)
				{
					var mon=records[0].data.value;
					jidu.setValue(monthjidu[mon+""]);
				}
			}					

		});
		var jidu = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel : "季度",
			allowBlank:true,
			name : 'jidu',
			disabled:true,
			disabled:true,
			labelWidth:40,
			displayField : 'name',
			valueField : 'value',
			queryMode : 'local',
			editable : false,
			store : Ext.create('Ext.data.ArrayStore', {
				fields : [ 'name', 'value' ],
				data : [ [ '第一季度', 1 ], [ '第二季度', 2 ], [ '第三季度', 3 ],[ '第四季度', 4 ]]
	
			}),
			listeners:{
				select:function(combo,records)
				{
					month.reset();
					
				}
			}
			
			});	
		    me.year=year;
		    me.jidu=jidu;
		    me.month=month;
			var num=Ext.create('Ext.form.FieldContainer',{
			 width:450,
			 layout:'hbox',
			 defaults:{
			 	width:135,
			 	margin:'0 0 1 5'
			 },
			 items:[year,jidu,month]
			})
						me.items = [num,
					
						{
							xtype : 'button',
							text : frame.lang.global._search,
							width : 70,
							handler : function() {
								    if(!me.isValid())
	                                {
	                                   frame.util.QuickMsg.showMsg2("请输入正确的查询条件");
	                                }
							   me.sresult.search();
							}
						},
						{
							xtype : 'button',
							text : frame.lang.global._reset,
							width : 70,
							// iconCls : 'refresh',
							handler : function() {

								me.getForm().reset();
								month.setDisabled(true);  
					            jidu.setDisabled(true);  
							}
						}

						 ];
						me.buttons = [
								
						];
						me.callParent();
					},
					getQueryCondition : function() {
						var formpanel = this;
						var condition = [];
						if(!formpanel.isValid())
	                      {
	                            return condition;
	                      }
						var values = formpanel.getForm().getValues();
						var happenTimeStart = null;
						var happenTimeEnd = null;
					
						var yearnum=formpanel.year.getValue();
						var jidunum=formpanel.jidu.getValue();
					     var monthnum=formpanel.month.getValue();
						if(!frame.util.isNull(monthnum))
						{
							// 按月
							 var yearnum=formpanel.year.getValue();
							 var monthnum=formpanel.month.getValue();
							 happenTimeStart=yearnum+"-"+monthnum+"-01 00:00:00"
							 happenTimeEnd=yearnum+"-"+monthnum+"-31 23:59:59"
							 
							
							
							
						}
						else if(!frame.util.isNull(jidunum))
						{
							 var yearnum=formpanel.year.getValue();
							 var jidunum=formpanel.jidu.getValue();
							 happenTimeStart=yearnum+"-"+((jidunum-1)*3+1)+"-01 00:00:00"
							 happenTimeEnd=yearnum+"-"+((jidunum-1)*3+1+2)+"-31 23:59:59"
						}
						else if(!frame.util.isNull(yearnum)){
							 var yearnum=formpanel.year.getValue();
							 happenTimeStart=yearnum+"-01-01 00:00:00"
							 happenTimeEnd=yearnum+"-12-31 23:59:59"
						}
						else{
							return condition;
						}
						
				
						
						if (!frame.util.isNull(happenTimeStart)
								&& frame.util.isNull(happenTimeEnd)) {
							condition.push({
								fieldName : 't.createtime',
								operation : 'ge',
								valueType:'Date',
								value : happenTimeStart
							});
						} else if (!frame.util.isNull(happenTimeEnd)
								&& frame.util.isNull(happenTimeStart)) {
							condition.push({
								fieldName : 't.createtime',
								operation : 'le',
								valueType:'Date',
								value : happenTimeEnd
							});
						} else if (!frame.util.isNull(happenTimeEnd)
								&& !frame.util.isNull(happenTimeStart)) {
							if (happenTimeStart > happenTimeEnd) {
								frame.util.QuickMsg
										.showMsg(frame.lang.global.startTimeLessThanEndTime);
							}
							condition.push({
								fieldName : 't.createtime',
								valueType:'[Date]',
								operation : 'between',
								value : [ happenTimeStart, happenTimeEnd ]
							});
						}
			
						return condition;
					}

});

Ext.define("com.module.common.orders.OrdersStatisticPanel_Result",{
	extend:'Ext.panel.Panel',
	alias : 'widget.OrdersStatisticPanel_Result',
	border : true,
	layout:'fit',
	autoScroll:true,
	initComponent:function(){
		var me=this;
		  me.callParent();
        var orders = Ext.create('Ext.grid.Panel', {
        	title:'orders',
        	height:'100%',
			width:'100%',
        	store: Ext.create('Ext.data.Store', {
           fields: ['oid','uid','did', 'dlvl', 'status', 'record', 'record_pic', 'createtime', 'evaltime1',
            'reevaltime1', 'evaltime2', 'reevaltime2', 'eval1', 'reeval1', 'eval2', 'reeval2', 
            'espeed', 'eattitude', 'erecord', 'eeffect', 'esupport', 
            'evaluate', 'uaid', 'distance', 'price', 'payid', 'lct','dname','dphone','uname','uphone','range','addr','totaladdr'],			pageSize : 10,
			autoLoad : false,
            listeners: {
                'beforeload': function(store) {
                    var formPanel = me.searchcon;
                    var condition = formPanel.getQueryCondition();
                    Ext.apply(store.proxy.extraParams, {
                        condition: Ext.encode(condition)
                    })
                }
            },
            proxy : {
				type : 'ajax',
				url : basePath+'BackOrdersController/loadOrders',
				//SELECT u.name as uname ,ua.* FROM useraddr ua LEFT JOIN  USER u ON  ua.uid=u.uid WHERE ua.uid=?
				extraParams : {
				},
				reader : {
					type : 'json',
					root : 'returnData'
				}
				
				

			}
		
		}),
		  listeners:{
		  	
                'itemdblclick':function(grid,record)
                {
                	     Ext.create('com.module.common.orders.OrdersOperatePanel', {
                              record: record
                          }).show()
                }
		  },
       		selModel: Ext.create('Ext.selection.CheckboxModel',
		   { 		
			  mode : "MULTI"
		     })		,
        	autoScroll:true,
        	columns : [ {
        xtype: 'rownumberer'
    },
    {
        header: 'OrderID',
        dataIndex: 'oid',
        width: 70,
        sortable: true
    },
    {
        header: 'dname',
        dataIndex: 'dname',
        width: 75,
        sortable: true
    },
      {
        header: 'dphone',
        dataIndex: 'dphone',
        width: 120,
        sortable: true
    },
     {
        header: 'uname',
        dataIndex: 'uname',
        width: 75,
        sortable: true
    },
    {
        header: 'uphone',
        dataIndex: 'uphone',
        width: 120,
        sortable: true
    },
    {
        header: 'status',
        dataIndex: 'status',
        width: 150,
        sortable: true,
				renderer:function(value)
				{
					if(value==0)return '新建';
					if(value==1)return '已支付';
					if(value==2)return 'dc_已出发';
					if(value==3)return '诊断中';
					if(value==4)return '待确认支付';
					if(value==5)return '待用户一次评价';
					if(value==6)return '待dc_一次评价';
					if(value==7)return '待用户二次评价';
		            if(value==8)return '待dc_二次评价';
					if(value==9)return '待确认取消';
					if(value==10)return '挂起';
					if(value==11)return '结束';
					return value;
				}        
    },
    {
        header: 'createtime',
        dataIndex: 'createtime',
        width: 150,
        sortable: true
    },
    {
        header: 'price',
        dataIndex: 'price',
        width: 80,
        sortable: true
    },
    {
        header: 'evaluate',
        dataIndex: 'evaluate',
        width: 200,
        sortable: true
    }
			]

        });			
		//分页的combobox下拉选择显示条数
     var  pageSizeComboorders = Ext.create('Ext.form.ComboBox',{
          store: Ext.create('Ext.data.ArrayStore',{
              fields: ['text', 'value'],
              data: [['10', 10], ['20', 20],['30', 30], ['50', 50],  ['100', 100]]
          }),
          valueField: 'value',
          displayField: 'text',
          value:20,
          width: 70
      });
       pageSizeComboorders.on("select", function (comboBox) {
		var nowPageSize= parseInt(comboBox.getValue());
        bbar.pageSize =nowPageSize;
         orders.store.pageSize =nowPageSize;//设置store的pageSize，可以将工具栏与搜索的数据同步。
         orders.store.load();
         orders.store.loadPage(1);//显示第一页
         
     });
     var ordersbbar= new Ext.PagingToolbar( {
			afterPageText : '/{0}页',
			dock:'bottom',
			beforePageText : '第',
			store : orders.store,
			inputItemWidth:50,
			displayInfo : true,
			items: ['-', '每页显示',pageSizeComboorders,'行'],
			displayMsg : '第{0}条 - 第{1}条，共{2}条记录',
			emptyMsg :'没有记录'

		});
		orders.addDocked(ordersbbar);
		var doctor = Ext.create('Ext.grid.Panel', {
        	title:'doctor',
        	hidden:true,
        	height:'100%',
			width:'100%',
        	store: Ext.create('Ext.data.Store', {
        	fields : [ "name","phone","sex","docin"],
			pageSize : 10,
			autoLoad : false,
			sorters: [{
                    property: 'lct',
                    direction: 'asc'
               }],
               listeners: {
                'beforeload': function(store) {
                    var formPanel = me.searchcon;
                    var condition = formPanel.getQueryCondition();
                    Ext.apply(store.proxy.extraParams, {
                        condition:Ext.encode(condition).replace('t.createtime','ot.time')
                    })
                }
            },
            proxy : {
				type : 'ajax',
				url :  basePath+'BackOrdersController/loadDoctorByIncome',
				extraParams : {
				},
				reader : {
					type : 'json',
					root : 'returnData'
				}
				

			}
		
		}),
       		selModel: Ext.create('Ext.selection.CheckboxModel',
		   { 		
			  mode : "MULTI"
		     })		,
        	autoScroll:true,
        	columns : [  {
			xtype : 'rownumberer'
			}, {
				header : "name",
				dataIndex : 'name',
				width : 100
			},
			 {
				header : "phone",
				dataIndex : 'dname',
				width : 100
			},
			 {
				header : "sex",
				dataIndex : 'sex',
				width : 80,
				renderer:function(value)
				{
					if(value==0)return '女'
					return '男';
				}
			},
			 {
				header : "docin",
				dataIndex : 'docin',
				width : 100
			}
			]

        });			
		//分页的combobox下拉选择显示条数
     var  pageSizeCombodoctor = Ext.create('Ext.form.ComboBox',{
          store: Ext.create('Ext.data.ArrayStore',{
              fields: ['text', 'value'],
              data: [['10', 10], ['20', 20],['30', 30], ['50', 50],  ['100', 100]]
          }),
          valueField: 'value',
          displayField: 'text',
          value:20,
          width: 70
      });
       pageSizeCombodoctor.on("select", function (comboBox) {
		var nowPageSize= parseInt(comboBox.getValue());
        bbar.pageSize =nowPageSize;
         doctor.store.pageSize =nowPageSize;//设置store的pageSize，可以将工具栏与搜索的数据同步。
         doctor.store.load();
         doctor.store.loadPage(1);//显示第一页
         
     });
     var doctorbbar= new Ext.PagingToolbar( {
			afterPageText : '/{0}页',
			dock:'bottom',
			beforePageText : '第',
			store : doctor.store,
			inputItemWidth:50,
			displayInfo : true,
			items: ['-', '每页显示',pageSizeCombodoctor,'行'],
			displayMsg : '第{0}条 - 第{1}条，共{2}条记录',
			emptyMsg :'没有记录'

		});
		doctor.addDocked(doctorbbar);
		var total=Ext.create('com.module.common.orders.OrdersStatisticPanel_Chart',
			{
			 resultpanel:me
			})
		var statistictable={
		 'total':total,
		 'doctor':doctor,
		 'orders':orders
	
		
		
		}
		
	   var detailtable=Ext.create('Ext.panel.Panel',{
	   	  flex:1,
	   	  height:"100%",
	      layout:'fit',
	      items:[total,doctor,orders]
	      
		    	
		  });
	    var detailInfo=Ext.create('Ext.panel.Panel',{
	    layout:'hbox',
	    flex:1,
	    width:'100%',
	    items:[{
	       xtype:'treepanel',
	       width:170,
	       height:"100%",
	       rootVisible : false,
	       store: Ext.create('Ext.data.TreeStore', {
		   root : {
			text : 'root',
			 expanded: true,
			children:[{
			  id:'total',
			  text:'total',
			  leaf:true
			},
		    {
			  id:'doctor',
			  text:'doctor',
			  leaf:true
			},{
			  id:'orders',
			  text:'orders',
			  leaf:true
			}]
		  }}),
	       listeners:{
	       	itemclick:function(view,record)
	       	{
	       		var id=record.data.id;
	       		for(key in statistictable)
	       		{
	       			statistictable[key].hide();
	       		}
	         	statistictable[id].show();
	         	if(frame.util.isNull(statistictable[id].store))
				{
					statistictable[id].load();
					
				}
				else{
					statistictable[id].store.load();
				}
	     
	         	
	       	}
	       }
	    },detailtable]
	    
	    })

	
	    me.add( detailInfo);
	    me.detailtable=detailtable;
	  
	    

	},
	search:function()
	{
	
	     var me=this;
		 var  condition=  me.searchcon.getQueryCondition();
		 
		 console.debug(condition);
		var items=me.detailtable.items.items;
		for(var i=0;i<items.length;i++)
		{
			//如果组件显示 则刷新
			if(!items[i].isHidden())
			{
				if(frame.util.isNull(items[i].store))
				{
					items[i].load();
					
				}
				else{
					items[i].store.load();
				}
			}
		}
	}
	
});

Ext.define("com.module.common.orders.OrdersStatisticPanel_Chart",{
	extend:'Ext.panel.Panel',
	layout:'fit',
	border : true,
	autoScroll:true,
	initComponent:function(){
		var me=this;	
		var chartpanel=Ext.create('Ext.panel.Panel',{
			flex:1,
	       height:"100%"
		});
		chartpanel.on('afterrender',function(){
			var statisticChart = new Highcharts.Chart({
				chart : {
					width:1200,
					height:340,
					type : 'column',
					//margin: [0, 0, 0, 0],
					renderTo:chartpanel.id
				},
				title: { text: "统计报表" }, 
				xAxis: {
		            categories: [
		               "类型"
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
						pointWidth: 50,
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
			me.statisticChart = statisticChart;	
			var series1 = { 
				name: "dd总数",			
				color:'#990000'
			};
			var series5 = { 
				name: "comtotal",		
				color:'#ff6633'
			};
			var series2 = { 
				name: "totalMoney",		
				color:'#CC6633'
			};
			
			var series3 = { 
				name: "docTotal",		
				color:'#FF9900'
			};
			var series4 = { 
			    name: "allMoney",		
				color:'#0066CC'
				 
			};
		
			
			statisticChart.addSeries(series1);
			statisticChart.addSeries(series5);
			statisticChart.addSeries(series2);
			statisticChart.addSeries(series3);
			statisticChart.addSeries(series4);
		
	
			me.load();
		});
	    me.items=[chartpanel];
		me.callParent();
	},
	load:function()
	{
		var me=this;
		var condition=[];
		if(!frame.util.isNull(me.resultpanel.searchcon))
		{
			condition=me.resultpanel.searchcon.getQueryCondition();
		}
	
		Ext.Ajax.request( {
			url : basePath + 'BackOrdersController/statisticOrders',
			params:{
			  condition:Ext.encode(condition).replace('t.createtime','ot.time')
			},
			success : function(response) {
				 var result = Ext.decode(response.responseText);
				 if(result.success)
				 {
				 var datas=result.returnData;
				  if(frame.util.isNull(datas))
				  {
				  	return;
				  }
		         var ordertotalnum=datas.ordertotalnum;
		        var ordercomnum=datas.ordercomnum;
		         var orderstotalprice=datas.orderstotalprice;
		         var docin=datas.docin;
		          var platin=datas.platin;
		           var chart = me.statisticChart;    
		           chart.series[0].setData([frame.util.isNull(ordertotalnum)?0:ordertotalnum]);
		           chart.series[1].setData([frame.util.isNull(ordercomnum)?0:ordercomnum]);
		           chart.series[2].setData([frame.util.isNull(orderstotalprice)?0:orderstotalprice]);
		           chart.series[3].setData([frame.util.isNull(docin)?0:docin]);
		           chart.series[4].setData([frame.util.isNull(platin)?0:platin]);
				 }

			},
			failure : function(response, options) {
				frame.util.QuickMsg.showMsg(frame.lang.global.netError);

			}
		});
		
	},
	loadData:function( addName){
		var me = this;
		var json=[100,20,10,5,15,98,78,99]
		var chart = me.statisticChart;    
		chart.series[0].setData([json[0]]);
		chart.series[1].setData([json[1]]);
		chart.series[2].setData([json[2]]);
		chart.series[3].setData([json[3]]);


	}
});

// 定义医生面板类
Ext.define("com.module.common.orders.OrdersStatisticPanel", {
	extend : 'Ext.panel.Panel',
	layout : 'vbox',
	// 初始化医生面板
	initComponent : function() {
		var me = this;
		me.callParent();
		var sresult = Ext.widget('OrdersStatisticPanel_Result',{ 
		width:'100%',
		flex:1});
		var searchcon = Ext.widget('OrdersStatisticPanel_SearhForm',{
		    width:'100%',
			height:100,
		    sresult:sresult
		});
		sresult.searchcon=searchcon;
		me.add(searchcon);
		me.add(sresult);

	}});