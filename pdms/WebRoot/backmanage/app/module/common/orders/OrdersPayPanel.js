Ext.define('com.module.common.doctor.OrdersPayPanel_SearhForm', {
	extend : 'Ext.form.FormPanel',
	alias : 'widget.OrdersPayPanel_SearhForm',
	height : 80,
	width : '100%',
	border : false,
	layout : 'column',
	buttonAlign:'left',
	defaults : {
		labelAlign : 'left',
		border : false,
		margin : '8,0,0,20',
		labelWidth:70,
		align : 'left'
	},
	initComponent : function() {
		var me = this;
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
				}
			}

		});
	
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
				
				}
			}					

		});
		
		    me.year=year;

		    me.month=month;
		me.items =  [year,month,{
				fieldLabel : "医生姓名",
				name : 'name',
				xtype : 'textfield'
				
			},	{
				fieldLabel : "医生电话",
				name : 'phone',
				xtype : 'textfield'
				
			
			}
		];
		me.buttons = [ {
			xtype : 'button',
			text : frame.lang.global._search,
				width:100,
			//iconCls : 'search',
			handler : function() {
				me.ownerCt.down('grid').getStore().load();
			}
		}, {
			xtype : 'button',
			text: frame.lang.global._reset,
			
				width:100,
			//iconCls : 'refresh',
			handler : function() {

				me.getForm().reset();
				month.setDisabled(true);  
			}
		} ,
		{
			xtype : 'button',
			//text: "导出当前页",
			text: frame.lang.global.exportCurrentPage,
			width:130,
			//iconCls : 'refresh',
			handler : function() {
			var grid=me.ownerCt.down('grid');
			 var store=grid.getStore();
			var mybbar= grid.mybbar;
			var pageData=mybbar.getPageData();
	        var start=pageData.fromRecord;
	        var limit=store.pageSize;
	     
      		 var condition=me.getQueryCondition();
		    var exportWindow=window.open(basePath+'BackOrdersController/exportExcel?'+'condition='+Ext.encode(condition)+'&&start='+start+'&&limit='+limit
		    	);
		    exportWindow.focus();
			
			}
		},
			{
			xtype : 'button',
			text: frame.lang.global.exportAllPage,
				width:100,
			//iconCls : 'refresh',
			handler : function() {
	
		
      		 var condition=me.getQueryCondition();
		    var exportWindow=window.open(basePath+'BackOrdersController/exportExcel?'+'condition='+Ext.encode(condition) 
		    	);
		    exportWindow.focus();
			}
		}

		];
        me.loadCurrentTime();
        
		me.callParent();
	
	},
	getQueryCondition:function()
	{
			    var formpanel=this;
				var values= formpanel.getForm().getValues();
		
				
				var condition=[];
			
				var happenTimeStart = null;
				var happenTimeEnd = null;
			
				var yearnum=formpanel.year.getValue();
			     var monthnum=formpanel.month.getValue();
				if(!frame.util.isNull(monthnum))
				{
					// 按月
					 var yearnum=formpanel.year.getValue();
					 var monthnum=formpanel.month.getValue();
					 happenTimeStart=yearnum+"-"+monthnum+"-01 00:00:00"
					 happenTimeEnd=yearnum+"-"+monthnum+"-31 23:59:59"
					 
					
					
					
				}
				
				else if(!frame.util.isNull(yearnum)){
					 var yearnum=formpanel.year.getValue();
					 happenTimeStart=yearnum+"-01-01 00:00:00"
					 happenTimeEnd=yearnum+"-12-31 23:59:59"
				}
				else{
					
				}
				
		
				
				if (!frame.util.isNull(happenTimeStart)
						&& frame.util.isNull(happenTimeEnd)) {
					condition.push({
						fieldName : 'ot.time',
						operation : 'ge',
						valueType:'Date',
						value : happenTimeStart
					});
				} else if (!frame.util.isNull(happenTimeEnd)
						&& frame.util.isNull(happenTimeStart)) {
					condition.push({
						fieldName : 'ot.time',
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
						fieldName : 'ot.time',
						valueType:'[Date]',
						operation : 'between',
						value : [ happenTimeStart, happenTimeEnd ]
					});
				}
				
				var name=values.name;
				var phone=values.phone;
			   if(!frame.util.isNull(name))
				{
				condition.push({
					fieldName:'t.name',
					operation:'like',
					valueType:'String',
					value:'%'+name+'%'
				});
				}
				if(!frame.util.isNull(phone))
				{
				condition.push({
					fieldName:'t.phone',
					operation:'like',
					valueType:'String',
					value:'%'+phone+'%'
				});
				}
	      
				return condition;
	},
	
	
	getQueryCondition2:function()
	{
			    var formpanel=this;
				var values= formpanel.getForm().getValues();
		
				
				var condition=[];
			
				var happenTimeStart = null;
				var happenTimeEnd = null;
			
				var yearnum=formpanel.year.getValue();
			     var monthnum=formpanel.month.getValue();
				if(!frame.util.isNull(monthnum))
				{
					// 按月
					 var yearnum=formpanel.year.getValue();
					 var monthnum=formpanel.month.getValue();
					 happenTimeStart=yearnum+"-"+monthnum+"-01 00:00:00"
					 happenTimeEnd=yearnum+"-"+monthnum+"-31 23:59:59"
					 
					
					
					
				}
				
				else if(!frame.util.isNull(yearnum)){
					 var yearnum=formpanel.year.getValue();
					 happenTimeStart=yearnum+"-01-01 00:00:00"
					 happenTimeEnd=yearnum+"-12-31 23:59:59"
				}
				else{
					
				}
				
				if (!frame.util.isNull(happenTimeStart)
						&& frame.util.isNull(happenTimeEnd)) {
					condition.push({
						fieldName : 'ot.time',
						operation : 'ge',
						valueType:'Date',
						value : happenTimeStart
					});
				} else if (!frame.util.isNull(happenTimeEnd)
						&& frame.util.isNull(happenTimeStart)) {
					condition.push({
						fieldName : 'ot.time',
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
						fieldName : 'ot.time',
						valueType:'[Date]',
						operation : 'between',
						value : [ happenTimeStart, happenTimeEnd ]
					});
				}
		
	      
				return condition;
	},
	loadCurrentTime:function()
	{
		var me=this;
		var condition=[];
	
		Ext.Ajax.request( {
			url : basePath + 'BackManageController/loadCurrentTime',
			params:{
			 
			},
			success : function(response) {
				 var result = Ext.decode(response.responseText);
				 if(result.success)
				 {
				 var year=result.year;
				 var month=result.month;
		         if(frame.util.isNull(me.year.getValue()))
		        {
		        	  me.year.setValue(year);
		        	 
		        }
		         if(frame.util.isNull(me.month.getValue()))
			        {
		        	  me.month.setValue(month);
		        	  me.month.setDisabled(false);  
			        }
				 }

			},
			failure : function(response, options) {
				frame.util.QuickMsg.showMsg(frame.lang.global.netError);

			}
		});
		
	}
	

});

//2
Ext
		.define(
				"com.module.common.doctor.OrdersPayPanel_Grid",
				{
					extend : 'Ext.grid.Panel',
					alias : 'widget.OrdersPayPanel_Grid',
					 frame : true,
	//forceFit:true,//自动填充panel空白处
	flex:1,
	width:'100%',
	autoScroll : true,
	border : false,
	stripeRows : true,
	split : true,
	clicksToEdit : 2,
	collapseMode : 'mini',
					listeners : {
						'itemdblclick' : function(gridView, record) {
							//true：不会清除其他选中行，false：会清除其他行，默认false
							this.getSelectionModel().select( [ record ], true);
							//lookDoctor属于Grid对象 不属于gridView。gridView.lookDoctor()会有医生
							this.lookDoctor();
						}
					},
					columns : [ {
						xtype : 'rownumberer'
					}, {
						header : '医生ID',
						dataIndex : 'did',
						width : 100,
						sortable : true
					},
					 {
						header : '医生姓名',
						dataIndex : 'name',
						width : 75,
						sortable : true
					}, 
			    {
			header : '医生电话',
			dataIndex : 'phone',
			width : 120,
			sortable : true
		},
		{
			header :  '医生性别',
			dataIndex : 'sex',
			width : 80,
			sortable : true,
			renderer:function(value)
			{
				if(value==0)return "女";
				if(value==1)return "男";
				if(value==2)return "未知";
				
			}
		}, {
			header: '本月已完成订单总数',
			dataIndex : 'ordertotalnum',
			width : 140,
			sortable : true
		},{
			header: '本月订单交易总金额',
			dataIndex : 'ordertotalprice',
			width : 140,
			sortable : true
		},
		{
			header: '本月平台提取总金额',
			dataIndex : 'platin',
			width : 140,
			sortable : true
		},
		{
			header : '本月支付总金额',
			dataIndex : 'docin',
			width : 120,
			sortable : true
		}],
					initComponent : function() {
						var me = this;
						var store = Ext
								.create(
										'Ext.data.Store',
										{
											fields : ['did','phone','name','sex','ordertotalnum','ordertotalprice','platin','docin'
											        ],
											autoLoad : true,
											pageSize : frame.config.pageSize,
											proxy : {
												type : 'ajax',
												url : basePath + 'BackOrdersController/loadOrderPay',
												reader : {
													type : 'json',
													root : 'returnData'
												}

											},
											listeners : {
												'beforeload' : function(store) {
												 var formpanel=me.ownerCt.down('form');
				                                    var condition=[];
				                                    condition=formpanel.getQueryCondition();

													Ext
															.apply(
																	store.proxy.extraParams,
																	{
																		condition : Ext
																				.encode(condition)
																	})
												}
											}
										});

						var sm = Ext.create('Ext.selection.CheckboxModel',

						{
							//选择模式. 有效值是SINGLE, SIMPLE, 和 MULTI.
								mode : "MULTI"
							});

						var _tbar = new Ext.Toolbar(
								{
									items : [
											

											{
												xtype : 'button',
												text : frame.lang.global._refresh,
												width:70,
												//iconCls : 'refresh',
												handler : function() {
													me.refreshDoctor();
												}
											},
											{
												xtype : 'button',
												text : frame.lang.global._look,
												width:70,
												//iconCls : 'look',
												handler : function() {
													me.lookDoctor();
												}
											},
											
											{
												xtype : 'button',
												text : "支付",
												width:70,
												handler : function() {
													me.payDoctor();
												}
											}
										
											

									]

								});
							//分页的combobox下拉选择显示条数
     var  pageSizeCombo = Ext.create('Ext.form.ComboBox',{
          store: Ext.create('Ext.data.ArrayStore',{
              fields: ['text', 'value'],
              data: [['10', 10], ['20', 20],['30', 30], ['50', 50],  ['100', 100]]
          }),
          valueField: 'value',
          displayField: 'text',
          value:frame.config.pageSize,
          width: 70
      });

     		var bbar = new Ext.PagingToolbar( {
			afterPageText :frame.lang.global.afterPageText,
			beforePageText : frame.lang.global.beforePageText,
			store : store,
			inputItemWidth:50,
			displayInfo : true,
			items: ['-', frame.lang.global.everyPageShow,pageSizeCombo,frame.lang.global.row],
			displayMsg : frame.lang.global.displayMsg,
			emptyMsg : frame.lang.global.emptyMsg

		});
	 pageSizeCombo.on("select", function (comboBox) {
		var nowPageSize= parseInt(comboBox.getValue());
        bbar.pageSize =nowPageSize;
         store.pageSize =nowPageSize;//设置store的pageSize，可以将工具栏与搜索的数据同步。
        store.loadPage(1);//显示第一页
         
     });
						me.bbar = bbar;
						me.mybbar=bbar;
						me.tbar = _tbar;
						me.store = store;
						me.selModel = sm;
						this.callParent();
					},
					 
					refreshDoctor : function() {
						var me = this;
						me.store.load();
					},
					lookDoctor : function() {
						var me = this;
						var rec = frame.util.Grid.getSelectedOne(me);
						if (Ext.isEmpty(rec)) {
							frame.util.QuickMsg
									.showMsg(frame.lang.global.selectHandleData);
							return;
						}
						Ext.create('com.module.common.orders.OrdersPayLookPanel', {
							record : rec,
							showMode : 'look',
							searchForm: me.ownerCt.down('form')
						}).show();
					},
					payDoctor: function() {
						var me = this;
						var recs = me.selModel.getSelection();
						if (Ext.isEmpty(recs)) {
							frame.util.QuickMsg
									.showMsg(frame.lang.global.selectHandleData);
							return;
						}
						Ext.create('com.module.common.orders.OrdersBatchPayPanel', {
							records : recs
						}).show();
					}
				

				});
//定义医生面板类
Ext.define("com.module.common.orders.OrdersPayPanel", {
	extend : 'Ext.panel.Panel',
	layout : 'vbox',
	//初始化医生面板
	initComponent : function() {
		var me = this;
		me.callParent();
		var grid = Ext.widget('OrdersPayPanel_Grid');
		var searchFrom=Ext.widget('OrdersPayPanel_SearhForm');
		 me.add(searchFrom);
	     me.add(grid);

}

});