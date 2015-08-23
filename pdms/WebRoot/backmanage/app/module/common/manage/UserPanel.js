Ext.define('com.module.common.manage.UserPanel_SearhForm', {
	extend : 'Ext.form.FormPanel',
	alias : 'widget.UserPanel_SearhForm',
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

		me.items =  [{
				fieldLabel : "患者姓名",
				name : 'logSource',
				xtype : 'textfield'
				
			},	{
				fieldLabel : "患者电话",
				name : 'logLevel',
				xtype : 'textfield'
				
			},
			{
				xtype:'fieldcontainer',
				layout:'hbox',
				items:[{
					xtype : 'datetimefield',
					fieldLabel : '注册时间',
					labelWidth : 70,
					name : 'happenTimeStart'
				},
				{
					xtype:'displayfield',
					value:'一'
				},
				{
					xtype : 'datetimefield',
					fieldLabel : '结束时间',
					 hideLabel: true,
					labelWidth : 15,
					name : 'happenTimeStart'
				} ]
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
			}
		} 
//		{
//			xtype : 'button',
//			text: frame.lang.global.exportCurrentPage,
//			width:130,
//			//iconCls : 'refresh',
//			handler : function() {
//			var grid=me.ownerCt.down('grid');
//			 var store=grid.getStore();
//			var mybbar= grid.mybbar;
//			var pageData=mybbar.getPageData();
//	        var start=pageData.fromRecord;
//	        var limit=pageData.toRecord-pageData.fromRecord+1;
//      		 var condition=me.getQueryCondition();
//		    var exportWindow=window.open('UserController/exportExcel.do?'+'condition='+Ext.encode(condition)+'&&start='+start+'&&limit='+limit);
//		    exportWindow.focus();
//			
//			}
//		},
//			{
//			xtype : 'button',
//			text: frame.lang.global.exportAllPage,
//				width:100,
//			//iconCls : 'refresh',
//			handler : function() {
//			var store=me.ownerCt.down('grid').getStore();
//      		 var condition=me.getQueryCondition();
//		    var exportWindow=window.open('UserController/exportExcel.do?'+'condition='+Ext.encode(condition));
//		    exportWindow.focus();
//			}
//		}
		
		];
		me.callParent();
	},
	getQueryCondition:function()
	{
			    var formPanel=this;
				var values= formPanel.getForm().getValues();
				var logLevel=values.logLevel;
				var logSource=values.logSource;
				var happenTimeStart= values.happenTimeStart;
				var happenTimeEnd= values.happenTimeEnd;
				var condition=[];
			   if(!frame.util.isNull(logLevel)&&logLevel!='ALL')
				{
				condition.push({
					fieldName:'logLevel',
					operation:'eq',
					value:logLevel
				});
				}
				if(!frame.util.isNull(logSource)&&logSource!='ALL')
				{
				condition.push({
					fieldName:'logSource',
					operation:'eq',
					value:logSource
				});
				}
	           if (!frame.util.isNull(happenTimeStart)&& frame.util.isNull(happenTimeEnd)) {
								condition.push({
											fieldName : 'happenTime',
											operation : 'ge',
											value : happenTimeStart
										});
							} 
	           else if (!frame.util.isNull(happenTimeEnd) && frame.util.isNull(happenTimeStart)) {
								condition.push({
											fieldName : 'happenTime',
											operation : 'le',
											value : happenTimeEnd
										});
							} 
	           else if (!frame.util.isNull(happenTimeEnd) && !frame.util.isNull(happenTimeStart)) {
								if (happenTimeStart > happenTimeEnd) {
										frame.util.QuickMsg.showMsg(frame.lang.global.startTimeLessThanEndTime);
								}
								condition.push({
											fieldName : 'happenTime',
											operation : 'between',
											value : [happenTimeStart, happenTimeEnd]
										});
			}
				condition.push({
					fieldName:'status',
					operation:'ge',
					value:0
				});
				return condition;
	}
	

});
Ext.define(
				"com.module.common.manage.UserPanel_Window",
				{
					extend : 'Ext.window.Window',
					alias : 'widget.User_Window',
					width : 1000,
					constrain : true,
					modal : true,
					height : 500,
					layout : 'fit',
					border : false,
					buttonAlign : 'center',
					initComponent : function() {
						var me = this;

						var _formPanel = Ext.create("Ext.form.FormPanel", {
							frame : true,
							border : true,
							width : 'auto',
							layout : 'column',
							defaults : {
								xtype : 'fieldset',
								anchor : '100%',
								labelAlign : 'right',
								columnWidth : 0.33,
								border : false,
								labelWidth : 120,
								align : 'stretch'
							},
							plugins : [],
							listeners : {
								'render' : function(formpanel) {
								}
							},
							items : [ {
								defaults : {
									anchor : '90%'
								},
								items : [ {
									xtype : 'textfield',
									fieldLabel : frame.lang.frame.systemlog.happenClass,
									name : 'happenClass'
								}, {
									xtype : 'textfield',
									fieldLabel : frame.lang.frame.systemlog.logLevel,
									name : 'logLevel'
								}, 
								{
				xtype : 'textfield',
				fieldLabel : frame.lang.frame.systemlog.logSource,
				name : 'logSource'
			},{
									xtype : 'textfield',
									hidden : true,
									fieldLabel : 'ID',
									name : 'id'
								}, {
									xtype : 'textfield',
									hidden : true,
									fieldLabel :frame.lang.global.status,
									name : 'status'
								} ]
							}, {
								defaults : {
									anchor : '90%'
								},
								items : [ {
									xtype : 'textfield',
									fieldLabel : frame.lang.frame.systemlog.happenMethod,
									name : 'happenMethod'
								}, {
									xtype : 'datetimefield',
									value : new Date(),
									format : 'Y-m-d H:i:s',
									fieldLabel :  frame.lang.frame.systemlog.happenTime,
									name : 'happenTime'

								} ]
							}, {
								defaults : {
									anchor : '90%'
								},
								items : [ {
									xtype : 'textfield',
									fieldLabel : frame.lang.frame.systemlog.happenLineNumber,
									name : 'happenLineNumber',
									labelWidth : 130
								}, {
									xtype : 'textfield',
									fieldLabel : frame.lang.frame.systemlog.threadInfo,
									name : 'threadInfo'
								} ]
							}, {
								xtype : 'textarea',
								columnWidth : 0.95,
								fieldLabel : frame.lang.frame.systemlog.detailedMsg,
								height : 400,
								name : 'detailedMsg',
								autoScroll : true
							} ]
						});

						var cfg = {
							items : [ _formPanel ]
						};
						var _cancelBtn = new Ext.Button( {
							xtype : 'button',
							text : frame.lang.global._cancel,
								width:100,
							//iconCls : 'close',
							handler : function() {
								me.closeUserWnd();
							}
						});
						if (me.showMode == 'save') {
							cfg.buttons = [ {
								xtype : 'button',
								text : frame.lang.global._save,
									width:100,
								//iconCls : 'save',
								handler : function() {
									me.saveRecord();

								}
							}, _cancelBtn ];
						} else if (me.showMode == 'copy') {
							cfg.buttons = [ {
								xtype : 'button',
								text : frame.lang.global._copy,
									width:100,
								//iconCls : 'save',
								handler : function() {
									me.saveRecord();

								}
							}, _cancelBtn ];
							_formPanel.getForm().loadRecord(me.record);
						} else if (me.showMode == 'modify') {
							cfg.buttons = [ {
								xtype : 'button',
								text : frame.lang.global._modify,
									width:100,
								//iconCls : 'save',

								handler : function() {
									me.modifyRecord();

								}
							}, _cancelBtn ];
							_formPanel.getForm().loadRecord(me.record);
						} else {
							cfg.buttons = [ _cancelBtn ];
							_formPanel.getForm().loadRecord(me.record);
							var formItems = Ext.ComponentQuery
									.query('#' + _formPanel.id + ' component');
							Ext.each(formItems, function(item) {
								item.readOnly = true;
							});
						}
						Ext.apply(me, cfg);
						me.formPanel = _formPanel;
						me.callParent();

					},
					//添加数据
					saveRecord : function() {
						var me = this;
						if (me.formPanel.getForm().isValid()) {
							var json = me.formPanel.getForm().getValues();
							/*var parentId = json.parentId;
							if (parentId == 'undefined' || parentId == null || parentId == '') {
								json.parentId = -1;
							}*/
							json.id = me.showMode == 'copy' ? null : json.id;
							Ext.Ajax
									.request( {
										url : basePath + 'UserController/addUser.do',
										params : {
											data : Ext.encode( [ json ])
										},
										success : function(response, options) {
											var success = Ext
													.decode(response.responseText).success;
											if (success == true) {
												frame.util.QuickMsg
														.operateSuccess(response);
												me.grid.getStore().load();
												me.close();
											} else {
												frame.util.QuickMsg
														.operateSuccess(response);
											}
										},
										failure : function(response, options) {
											frame.util.QuickMsg
													.showMsg(frame.lang.global.netError);
											;
										}
									});
						}
					},
					//修改数据
					modifyRecord : function() {
						var me = this;
						if (me.formPanel.getForm().isValid()) {
							var json = me.formPanel.getForm().getValues();
							json.id = me.record.data.id;
							Ext.Ajax
									.request( {
										url : basePath + 'UserController/updateUser.do',
										params : {

											data : Ext.encode( [ json ])
										},
										success : function(response, options) {
											var success = Ext
													.decode(response.responseText).success;
											if (success == true) {
												frame.util.QuickMsg
														.operateSuccess(response);
												me.grid.getStore().reload();
												me.close();
											} else {
												frame.util.QuickMsg
														.operateFailure(response);
											}
										},
										failure : function(response, options) {
											frame.util.QuickMsg
													.showMsg(frame.lang.global.netError);
											;
										}
									});
						}
					},
					//判断是否关闭WINDOW
					processCloseWnd : function(btnCode) {
						var me = this;
						if (btnCode == "yes" || btnCode == "ok") {
							me.close();
						}
					},
					//关闭WINDOW
					closeUserWnd : function() {
						var me = this;
						me.close();

					}

				});
//2
Ext
		.define(
				"com.module.common.manage.UserPanel_Grid",
				{
					extend : 'Ext.grid.Panel',
					alias : 'widget.UserPanel_Grid',
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
							//lookUser属于Grid对象 不属于gridView。gridView.lookUser()会有患者
							this.lookUser();
						}
					},
					columns : [ {
						xtype : 'rownumberer'
					}, {
						header : 'ID',
						dataIndex : 'id',
						hidden : true,
						width : 30,
						sortable : true
					},
			    {
			header : '患者电话',
			dataIndex : 'logSource',
			width : 120,
			sortable : true
		}, {
			header : '患者姓名',
			dataIndex : 'logLevel',
			width : 75,
			sortable : true
		}, {
			header :  '患者性别',
			dataIndex : 'happenTime',
			width : 150,

			sortable : true
		}, {
			header : '患者地址',
			dataIndex : 'happenClass',
			width : 300,
			sortable : true
		}, {
			header : '最后一次上线时间',
			dataIndex : 'happenMethod',
			width : 150,
			sortable : true
		},
		 {
			header : '注册时间',
			dataIndex : 'happenMethod',
			width : 150,
			sortable : true
		}],
					initComponent : function() {
						var me = this;
						var store = Ext
								.create(
										'Ext.data.Store',
										{
											fields : [ 'id', 'logSource','logLevel',
													'happenTime',
													'happenClass',
													'happenMethod',
													'happenLineNumber',
													'detailedMsg',
													'threadInfo', 'status' ],
											autoLoad : true,
											pageSize : frame.config.pageSize,
											proxy : {
												type : 'ajax',
												url : basePath + 'UserController/loadUser.do',
												reader : {
													type : 'json',
													root : 'returnData'
												}

											},
											listeners : {
												'beforeload' : function(store) {
												 var formPanel=me.ownerCt.down('form');
				                                    var condition=[];
				                                    condition=formPanel.getQueryCondition();

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
													me
															.refreshUser();
												}
											},
											{
												xtype : 'button',
												text : frame.lang.global._look,
													width:70,
												//iconCls : 'look',
												handler : function() {
													me.lookUser();
												}
											}
											,
											{
												xtype : 'button',
												text : "添加",
												width:70,
												handler : function() {
													me.addUser();
												}
											},
											{
												xtype : 'button',
												text : frame.lang.global._modify,
												width:70,
												handler : function() {
													me.updateUser();
												}

											},
											{
												xtype : 'button',
												text : frame.lang.global._delete,
												width:70,
												handler : function() {
													me.deleteUser();
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
//		var bbar =Ext.create( 'Ext.PagingToolbar',{
//			afterPageText : '/{0}页',
//			beforePageText : '第',
//			store : store,
//			inputItemWidth:50,
//			displayInfo : true,
//			items: ['-', '每页显示',pageSizeCombo,'条'],
//			displayMsg : "第{0}条 - 第{1}条，共{2}条记录",
//			emptyMsg : '没有记录'
//
//		});
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
         store.load();
        store.loadPage(1);//显示第一页
         
     });
						me.bbar = bbar;
						me.mybbar=bbar;
						me.tbar = _tbar;
						me.store = store;
						me.selModel = sm;
						this.callParent();
					},
					reload : function() {
						var me = this;
						me.getStore().reload();
					},
					addUser : function() {
						var me = this;
						Ext.widget('User_Window', {
							title : '新增患者表',
							grid : me,
							showMode : 'save'

						}).show();
					},
					updateUser : function() {
						var me = this;
						var rec = me.selModel.getLastSelected();
						if (Ext.isEmpty(rec)) {
							frame.util.QuickMsg
									.showMsg(frame.lang.global.selectHandleData);
							return;
						}
						Ext.widget('User_Window', {

							title : '修改患者表',
							grid : me,
							record : rec,
							showMode : 'modify'

						}).show();
					},
					deleteUser : function() {
						var me = this;
						var rec = me.selModel.getSelection();
						if (Ext.isEmpty(rec)) {
							frame.util.QuickMsg
									.showMsg(frame.lang.global.selectHandleData);
							return;
						}
						var json = [];
						Ext.each(rec, function(r) {
							json.push(r.data.id);
						});
						Ext.Msg.show( {
							title : '患者表',
							msg : frame.lang.global.deleteConfirm,
							buttons : Ext.Msg.YESNO,
							fn : function(btnCode) {
								me.confirmDelUser(btnCode, json)
							},
							icon : Ext.MessageBox.QUESTION
						});
					},

					confirmDelUser : function(btnCode, json) {
						var me = this;
						if (btnCode == 'yes' || btnCode == 'ok') {
							Ext.Ajax
									.request( {
										url : basePath + 'UserController/deleteUser.do',
										params : {

											data : Ext.encode(json)
										},
										success : function(response, options) {
											var success = Ext
													.decode(response.responseText).success;
											if (success == true) {
												frame.util.QuickMsg
														.operateSuccess(response);
												me.reload();
											} else {
												frame.util.QuickMsg
														.operateFailure(response);
											}
										},
										failure : function(response, options) {
											frame.util.QuickMsg
													.showMsg(frame.lang.global.netError);
											;
										}
									});
						}
					},
					refreshUser : function() {
						var me = this;
						me.store.load();
					},
					lookUser : function() {
						var me = this;
						var rec = me.selModel.getLastSelected();
						if (Ext.isEmpty(rec)) {
							frame.util.QuickMsg
									.showMsg(frame.lang.global.selectHandleData);
							return;
						}
						Ext.widget('User_Window', {
							title : frame.lang.global._look,
							record : rec,
							showMode : 'look'
						}).show();
					},
					copyUser : function() {
						var me = this;
						var rec = me.selModel.getLastSelected();
						if (rec == null) {
							frame.util.QuickMsg
									.showMsg(frame.lang.global.selectHandleData);
							return;
						}
						Ext.widget('User_Window', {
							title : '复制患者表',
							grid : me,
							record : rec,
							showMode : 'copy'
						}).show();
					}

				});
//定义医生面板类
Ext.define("com.module.common.manage.UserPanel", {
	extend : 'Ext.panel.Panel',
	layout : 'vbox',
	//初始化医生面板
	initComponent : function() {
		var me = this;
		me.callParent();
		var grid = Ext.widget('UserPanel_Grid');
		var searchFrom=Ext.widget('UserPanel_SearhForm');
		 me.add(searchFrom);
	     me.add(grid);

}

});