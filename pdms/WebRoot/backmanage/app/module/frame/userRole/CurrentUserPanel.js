
Ext.define("com.module.frame.userRole.CurrentUserPanel", {
	extend : 'Ext.panel.Panel',
	layout : 'auto',
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
			readOnly:true,
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
			border : false,
			width : 'auto',
			height:300,
			buttonAlign : 'center',
			width:'100%',
			layout : 'column',
			defaults : {
				xtype : 'fieldset',
				anchor : '100%',
				labelAlign : 'right',
				columnWidth : 0.32,
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
					readOnly : true,
					fieldLabel : frame.lang.frame.userRole.NmsUserPanel.userName,
					name : 'userName'
					
				}, {
					xtype : 'textfield',

					fieldLabel : frame.lang.frame.userRole.NmsUserPanel.userAlias,
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
				items : [  {
					xtype : 'textfield',
					
					allowBlank : false,
					fieldLabel : frame.lang.frame.userRole.NmsUserPanel.password,
					name : 'userPassword',
					inputType : 'password',
					regex:frame.config.InputCheck.inputEnNum ,
					maxLength:32,
					 enforceMaxLength:true,
					listeners:{
		         	render:function(field){
					Ext.create('Ext.tip.ToolTip',{
							target:field.el,
	    					html: frame.lang.global.enNum32
					})
			          }}
				},
				userStatusCombo,{
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
			} ],
			buttons:[{
				xtype : 'button',
				text : frame.lang.global._save,
				//iconCls : 'save',
				width:100,
				handler : function() {
					me.modifyRecord();

				}
			}]
		});

		var cfg = {
			items : [ formPanel ]
		};

		Ext.apply(me, cfg);
		formPanel.roleCombox = roleCombox;
		me.formPanel = formPanel;
		me.callParent();
		me.on('afterrender',function()
			{
			 me.loadCurrentUser();
			});

	},
	modifyRecord : function() {
		var me = this;
		if (me.formPanel.getForm().isValid()) {
			var json = me.formPanel.getForm().getValues();
			if(json.userPassword.length<30)
			{
			  json.userPassword = $.md5(json.userPassword);
			}
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
						 me.loadCurrentUser();
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
	loadCurrentUser :function()
	{
	      	var me=this;
	     var condition=[];
		 condition.push({
			fieldName:'nu.id',
			operation:'eq',
			value:frame.logonUser.id,
			valueType:'Integer'
	  	});
				Ext.Ajax.request( {
				url :  basePath+'NmsUserController/loadNmsUser.do',
				params : {

					condition:Ext.encode(condition),
					start:0,
					limit:1
				},
				success : function(response, options) {
					var result = Ext.decode(response.responseText);
					if (result.success == true) {
						me.down('form').getForm().setValues((result.returnData)[0]);
					}

					else {
						frame.util.QuickMsg.showMsg(frame.lang.global.loadDataFailure);
					}
				},
				failure : function(response, options) {
					frame.util.QuickMsg.showMsg(frame.lang.global.netError);
				}
			});
	}
	

});