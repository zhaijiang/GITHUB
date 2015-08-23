/**
 * save : 新增,modify : 修改,look : 查看,copy : 复制新增
 */
Ext.define("com.module.frame.userRole.NmsUserPanel_Window", {
	extend : 'Ext.window.Window',
	alias : 'widget.NmsUser_Window',
	width : 1000,
	constrain : true,
	modal : true,
	height : 300,
	layout : 'fit',
	border : false,
	buttonAlign : 'center',
	initComponent : function() {
		var me = this
		var roleStore = Ext.create("Ext.data.Store", {
			fields : [ 'id', 'roleName' ],
			//配置为自动加载数据 才能自动把roleId变成roleName
			autoLoad : true,
			proxy : {
				type : 'ajax',
				url : 'DBController/queryPo.do',
				extraParams : {
					tableName : 'NmsRole'
				},
				reader : {
					type : 'json',
					root : 'returnData'
				}

			},
			listeners : {
				beforeload : function(store, node) {
					var params = this.getProxy().extraParams;
					Ext.apply(params, {
						condition : Ext.encode( [ {
							fieldName : 'status',
							operation : 'eg',
							value : 0
						} ])
					});

				}
			}
		});

		var roleCombox = Ext.create('Ext.form.ComboBox', {
			fieldLabel : frame.lang.frame.userRole.NmsUserPanel.userRole,
			store : roleStore,
			displayField : 'roleName',
			valueField : 'id',
			name : 'roleId'

		});
		
	 var userStatusStore = Ext.create("Ext.data.Store", {
			fields : [ 'dataCode', 'dataNameCode' ],
			autoLoad : true,
			proxy : {
				type : 'ajax',
				url : 'DBController/getTreeChildNode.do',
				extraParams : {
					tableName : 'Glossary',
					glossaryField:Ext.encode(['dataNameCode'])
				},
				reader : {
					type : 'json',
					root : 'returnData'
				}

			},
			listeners : {
				beforeload : function(store, node) {
					var params = this.getProxy().extraParams;
						Ext.apply(params, {
							condition : Ext.encode( [ {
								fieldName : 'status',
								operation : 'eg',
								value : 0
							}, {
								fieldName : 'parentCode',
								operation : 'eq',
								value : 'UserStatus'
							} ])
						});

				}
			}
		});

		var userStatusCombo = Ext.create('Ext.form.ComboBox', {
			fieldLabel : frame.lang.frame.userRole.NmsUserPanel.userStatus,
			displayField : 'dataNameCode',
			valueField : 'dataCode',
			name : 'userStatus',
			store : userStatusStore,
			readOnly:true

		});

		var formPanel = new Ext.form.FormPanel( {
			frame : true,
			border : true,
			width : 'auto',
			layout : 'column',
			defaults : {
				xtype : 'fieldset',
				anchor : '100%',
				labelAlign : 'right',
				columnWidth : 0.3,
				border : false,
				labelWidth : 60,
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
					allowBlank : false,
					fieldLabel : frame.lang.frame.userRole.NmsUserPanel.userName,
					name : 'userName',
					readOnly:true
					
				}, {
					xtype : 'textfield',
					fieldLabel :frame.lang.frame.userRole.NmsUserPanel.userAlias,
					name : 'userAlias',
					maxLength: 50

					
				},
				 {
					xtype : 'textfield',
					fieldLabel : 'QQ',
					name : 'qq',
					maxLength: 16,
					  regex:frame.config.InputCheck._int

				},
				 {
					xtype : 'datetimefield',
					fieldLabel : frame.lang.global.operationTime,
					name : 'operateTime',
					readOnly : true
				},
                
				{
					xtype : 'textfield',
					hidden : true,
					fieldLabel : 'id',
					name : 'id'
				} ]
			}, {
				defaults : {
					anchor : '90%'
				},
				items : [ userStatusCombo, {
					xtype : 'textfield',
					
					allowBlank : false,
					fieldLabel : frame.lang.frame.userRole.NmsUserPanel.password,
					hidden : true,
					name : 'userPassword',
					inputType : 'password'
				}, {
					xtype : 'textfield',
					fieldLabel : frame.lang.frame.userRole.NmsUserPanel.userRemark,
					name : 'userRemark',
					maxLength: 256
				},
                 {
					xtype : 'textfield',
					fieldLabel : 'EMAIL',
					name : 'email',
					maxLength: 50,
					regex:frame.config.InputCheck.email
				} ]
			}, {
				defaults : {
					anchor : '90%'
				},
				items : [ roleCombox, , {
					xtype : 'textfield',
					fieldLabel : frame.lang.frame.userRole.NmsUserPanel.phoneNumber,
					name : 'phoneNumber',
					maxLength: 16,
					regex:frame.config.InputCheck._int

				}, 
				{
					xtype : 'datetimefield',
					fieldLabel : frame.lang.global.createTime,
					name : 'createTime',
					readOnly : true
				},{
					xtype : 'numberfield',
					fieldLabel : frame.lang.global.creatorId,
					name : 'creatorId',
					readOnly : true,
					hidden : true
				}, {
					xtype : 'textfield',
					hidden : true,
					fieldLabel : frame.lang.global.status,
					name : 'status',
					hidden : true
				},

				{
					xtype : 'numberfield',
					hidden : true,
					fieldLabel : frame.lang.frame.userRole.NmsUserPanel.userType,
					name : 'userType'
				} ]
			} ]
		});

		var cfg = {
			items : [ formPanel ]
		};
		var _cancelBtn = new Ext.Button( {
			xtype : 'button',
			text : frame.lang.global._cancel,
			width:100,
			//iconCls : 'close',
			handler : function() {
				me.closeNmsUserWnd();
			}
		});
		  if (me.showMode == 'modify') {
			cfg.buttons = [ {
				xtype : 'button',
				text : frame.lang.global._modify,
				width:100,
				//iconCls : 'save',

				handler : function() {
					me.modifyRecord();

				}
			}, _cancelBtn ];
			formPanel.getForm().loadRecord(me.record);
		} else {
			cfg.buttons = [ _cancelBtn ];
			//默认查看
			formPanel.getForm().loadRecord(me.record);
			var formItems = Ext.ComponentQuery
					.query('#' + formPanel.id + ' component');
			Ext.each(formItems, function(item) {
				item.readOnly = true;
			});

		}
		Ext.apply(me, cfg);
		formPanel.roleCombox = roleCombox;
		me.formPanel = formPanel;
		me.callParent();

	},
	modifyRecord : function() {
		var me = this;
		if (me.formPanel.getForm().isValid()) {
			var json = me.formPanel.getForm().getValues();
			json.id = me.record.data.id;
			Ext.Ajax.request( {
				url : basePath+'NmsUserController/updateNmsUser.do',
				params : {

					data : Ext.encode( [ json ])
				},
				success : function(response, options) {
					var success = Ext.decode(response.responseText).success;
					if (success == true) {
						frame.util.QuickMsg
								.showMsg(frame.lang.global.operateSuccess);
						me.grid.getStore().load();
						me.close();
					}

					else {
						frame.util.QuickMsg.operateFailure(response);
					}
				},
				failure : function(response, options) {
					frame.util.QuickMsg.showMsg(frame.lang.global.netError);
				}
			});
		}
	},
	processCloseWnd : function(btnCode) {
		var me = this;
		if (btnCode == "yes" || btnCode == "ok") {
			me.close();
		}
	},

	closeNmsUserWnd : function() {
		var me = this;
		me.close();
//		if (me.formPanel.getForm().isDirty()) {
//		/*	Ext.Msg.show( {
//				title : me.title,
//				msg : "【用户表】的数据已被修改,您是否放弃修改?",
//				buttons : Ext.Msg.YESNO,
//				fn : function(btnCode) {
//					me.processCloseWnd(btnCode);
//				},
//				icon : Ext.MessageBox.QUESTION
//			});*/
//		} else {
//			//me.close();
//		}
	}

});

Ext.define("com.module.frame.userRole.NmsUserPanel_Grid", {
	extend : 'Ext.grid.Panel',
	alias : 'widget.NmsUser_Grid',
	frame : true,
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
			this.lookNmsUser();
		}
	},
	columns : [ {
		xtype : 'rownumberer'
	}, {
		header : 'id',
		dataIndex : 'id',
		width : 80,
		hidden:true,
		sortable : true
	}, {
		header : frame.lang.frame.userRole.NmsUserPanel.userName,
		dataIndex : 'userName',
		width : 80,
		sortable : true
	}, {
		header : frame.lang.frame.userRole.NmsUserPanel.password,
		dataIndex : 'userPassword',
		hidden : true,
		width : 80,
		sortable : true
	}, {
		dataIndex : 'roleId',
		width : 100,
		hidden : true,
		sortable : true
	}, {
		header : frame.lang.frame.userRole.NmsUserPanel.userRole,
		dataIndex : 'roleName',
		width : 90,
		sortable : true
	}, {
		dataIndex : 'userStatus',
		width : 100,
		hidden:true,
		sortable : true
	}, {
		header : frame.lang.frame.userRole.NmsUserPanel.userStatus,
		dataIndex : 'userStatusName',
		width : 90,
		sortable : true
	}, {
		header : frame.lang.frame.userRole.NmsUserPanel.userAlias,
		dataIndex : 'userAlias',
		width : 100,
		sortable : true
	}, {
		header : frame.lang.frame.userRole.NmsUserPanel.userRemark,
		dataIndex : 'userRemark',
		width : 150,
		sortable : true
	}, {
		header : frame.lang.frame.userRole.NmsUserPanel.phoneNumber,
		dataIndex : 'phoneNumber',
		width : 120,
		sortable : true
	}, {
		header : 'EMAIL',
		dataIndex : 'email',
		width : 150,
		sortable : true
	}, {
		header : 'QQ',
		dataIndex : 'qq',
		width : 100,
		sortable : true
	}, {
		header : frame.lang.global.status,
		dataIndex : 'status',
		width : 100,
		hidden : true,
		sortable : true
	}, {
		header : frame.lang.global.creatorId,
		dataIndex : 'createorId',
		width : 100,
		sortable : true,
		hidden:true
	}, {
		header : frame.lang.global.createTime,
		dataIndex : 'createTime',
		width : 150,
		sortable : true
	}, {
		header : frame.lang.global.operationTime,
		dataIndex : 'operateTime',
		width : 150,
		sortable : true,
		flex : 1
	}, {
		header : frame.lang.frame.userRole.NmsUserPanel.userType,
		dataIndex : 'userType',
		hidden : true,
		width : 30,
		sortable : true
	} ],

	initComponent : function() {
		var me = this;
		var store = Ext.create('Ext.data.Store', {
			fields : [ 'id', 'userName', 'userPassword', 'roleId', 'roleName',
					'userType', 'userStatus', 'userStatusName', 'userRemark',
					'phoneNumber', 'email', 'qq', 'status', 'creatorId',
					'userAlias', 'createTime', 'operateTime' ],
			autoLoad : true,
			pageSize : frame.config.pageSize,
			 sorters: [{
                    //排序字段。
                    property: 'id',
                    //排序类型，默认为 ASC 
                    direction: 'asc'
              }],
			proxy : {
				type : 'ajax',
				url : basePath+'NmsUserController/loadNmsUser.do',
				reader : {
					type : 'json',
					root : 'returnData'
				}
			},
			listeners : {
				'beforeload' : function(store) {
				}
			}
		});

		var sm = Ext.create('Ext.selection.CheckboxModel',

		{
			//选择模式. 有效值是SINGLE, SIMPLE, 和 MULTI.
				mode : "MULTI"
			});

		var tbar = new Ext.Toolbar( {
			items : [ 

			{
				xtype : 'button',
				text : frame.lang.global._refresh,
				//iconCls : 'refresh',
				width:100,
				handler : function() {
					me.refreshNmsUser();
				}
			}, {
				xtype : 'button',
				text : frame.lang.global._look,
				//iconCls : 'search',
					width:100,
				handler : function() {
					me.lookNmsUser();
				}
			}, {
				xtype : 'button',
				text : frame.lang.global._add,
				//iconCls : 'add',
					width:100,
				handler : function() {
					me.addNmsUser();
				}
			}, {
				xtype : 'button',
				text : frame.lang.global._modify,
				//iconCls : 'modify',
			    width:100,
				handler : function() {
					me.updateNmsUser();
				}

			}, {
				xtype : 'button',
				text : frame.lang.global._delete,
				//iconCls : 'delete',
				width:100,
				handler : function() {
					me.deleteNmsUser();
				}
			}, {
				xtype : 'button',
				text : frame.lang.frame.userRole.NmsUserPanel.resetPassword,
				width:120,
				handler : function() {
					me.resetUserPassword();
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
         store.load();
        store.loadPage(1);//显示第一页
         
     });
		me.bbar = bbar;
		me.tbar = tbar;
		me.store = store;
		me.selModel = sm;
		this.callParent(arguments);
	},
	search : function() {
		var me = this;
		me.store.load( {
			params : {
				start : 0
			}
		});
	},

	load : function() {
		var me = this;
		me.getStore().load();
	},
		/**
	 * 创建添加用户WINDOW
	 * @memberOf {TypeName} 
	 */
	addNmsUser : function() {
		var me = this;
		Ext.create('com.module.frame.userRole.UserAddWindow', {
			title : frame.lang.global._add,
			grid : me
		}).show();
	},
	/**
	 * 重置密码
	 * @memberOf {TypeName} 
	 * @return {TypeName} 
	 */
	resetUserPassword:function()
	{
		
	  	  var me = this;
		  var records = me.selModel.getSelection();
		  if(records==null||records.length==0)
			{
			  frame.util.QuickMsg.showMsg(frame.lang.global.selectHandleData);
			  return;
			}
		  var ids=[];
		    Ext.each(records ,function(record)
		    	{
		    	ids.push(record.data.id);
		    	});
			Ext.Ajax.request( {
				url : basePath+'NmsUserController/resetUserPassword.do',
				params : {

					data : Ext.encode(ids)
				},
				success : function(response, options) {
					var result = Ext.decode(response.responseText);
					if (result.success == true) {
						frame.util.QuickMsg
								.showMsg(frame.lang.frame.userRole.NmsUserPanel.resetPwdSuccess_currentPwdIs+result.returnData);
						me.getStore().load();
					}

					else {
						frame.util.QuickMsg.operateFailure(response);
					}
				},
				failure : function(response, options) {
					frame.util.QuickMsg.showMsg(frame.lang.global.netError);
				}
			});
		
	},
	updateNmsUser : function() {
		var me = this;
		var rec = frame.util.Grid.getSelectedOne(me);
		if (Ext.isEmpty(rec)) {
			frame.util.QuickMsg.showMsg(frame.lang.global.selectHandleData);
			return;
		}
		if(rec.data.userType==-1)
		{
			frame.util.QuickMsg.showMsg(rec.data.userName+' '+frame.lang.frame.userRole.NmsUserPanel.defaultUserCannotUpdate,null,7000);
			return;
		}

		Ext.widget('NmsUser_Window', {

			title : frame.lang.global._modify,
			grid : me,
			record : rec,
			showMode : 'modify'

		}).show();
	},
	deleteNmsUser : function() {
		var me = this;
		var rec = me.selModel.getSelection();
		
		if (Ext.isEmpty(rec)) {
			frame.util.QuickMsg.showMsg(frame.lang.global.selectHandleData);
			return;
		}
		
		Ext.Msg.show( {
			title :frame.lang.frame.userRole.NmsUserPanel.userData,
			msg : frame.lang.global.deleteConfirm,
			buttons : Ext.Msg.YESNO,
			fn : function(btnCode) {
				me.confirmDelNmsUser(btnCode)
			},
			icon : Ext.MessageBox.QUESTION
		});
	},

	confirmDelNmsUser : function(btnCode) {
		var me = this;
		if (btnCode == 'yes' || btnCode == 'ok') {
			var systemUser='';
			var rec=me.selModel.getSelection();
			var json = [];
		 Ext.each(rec, function(r) {
			if(r.data.userType==-1)
			{
				systemUser=systemUser+r.data.userName+','
			}
			else{
				json.push(r.data.id);
			}
		 });
		  if(json.length==0)
	      {
                   if(systemUser==='')
		            {
			            frame.util.QuickMsg
								.showMsg(frame.lang.global.selectHandleData);

		            }
		            else
		            {
                        frame.util.QuickMsg.showMsg(systemUser+' '+frame.lang.frame.userRole.NmsUserPanel.defaultUserCannotDelete,null,7000);
		            }
                   return;
						
	       }
			Ext.Ajax.request( {
				url : basePath+'NmsUserController/deleteNmsUser.do',
				params : {

					data : Ext.encode(json)
				},
				success : function(response, options) {
					var success = Ext.decode(response.responseText).success;
					if (success == true) {
				       if(systemUser==='')
		               {
			              frame.util.QuickMsg
								.showMsg(frame.lang.global.operateSuccess);

		               }
		              else
		              {
                        frame.util.QuickMsg.showMsg(frame.lang.global.operateSuccess+';'+systemUser+' '+frame.lang.frame.userRole.NmsUserPanel.defaultUserCannotDelete,null,7000);
		              }
						
						me.load();
				 }
				else{
					 if(systemUser==='')
		            {
			              frame.util.QuickMsg
								.showMsg(frame.lang.global.operateFailure);

		            }
		           else
		           {
                        frame.util.QuickMsg.showMsg(frame.lang.global.operateFailure+';'+systemUser+' '+frame.lang.frame.userRole.NmsUserPanel.defaultUserCannotDelete,null,8000);
		           }
			     	}
				},
				failure : function(response, options) {
					frame.util.QuickMsg.showMsg(frame.lang.global.netError);
				}
			});
		}
	},
	refreshNmsUser : function() {
		var me = this;
		me.store.load();
	},
	lookNmsUser : function() {
		var me = this;
		var rec = frame.util.Grid.getSelectedOne(me);
		if (Ext.isEmpty(rec)) {
			frame.util.QuickMsg.showMsg(frame.lang.global.selectHandleData);
			return;
		}
		Ext.widget('NmsUser_Window', {
			title : frame.lang.global._look,
			record : rec,
			showMode : 'look'
		}).show();
	}
});

Ext.define("com.module.frame.userRole.NmsUserPanel", {
	extend : 'Ext.panel.Panel',
	layout : 'fit',
	constructor : function() {
		this.callParent(arguments);
	},
	initComponent : function() {

		var me = this;
		me.callParent(arguments);
		var userGrid = Ext.create('widget.NmsUser_Grid');
		me.add(userGrid);

	}

});