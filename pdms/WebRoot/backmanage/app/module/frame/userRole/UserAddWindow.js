Ext.define("com.module.frame.userRole.UserAddWindow", {
	extend : 'Ext.window.Window',
	width : 900,
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
			fieldLabel : '*'+frame.lang.frame.userRole.NmsUserPanel.userRole,
			store : roleStore,
			allowBlank : false,
			displayField : 'roleName',
			valueField : 'id',
			name : 'roleId'

		});
		
		   var userPassword1=Ext.create('Ext.form.field.Text',{
					allowBlank : false,
					fieldLabel : '*'+frame.lang.frame.userRole.NmsUserPanel.password,
					name : 'userPassword',
					inputType : 'password',
					id:'userPassword11',
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
		  
	   });

	   var userPassword2=Ext.create('Ext.form.field.Text',{
					
					allowBlank : false,
					fieldLabel : '*'+frame.lang.frame.userRole.NmsUserPanel.confirmPassword,
					name : 'userPassword2',
					labelWidth : 120,
					msgTarget:'under', 
					inputType : 'password',
				    blankText : frame.lang.global.notNull,
				    regex:frame.config.InputCheck.inputEnNum ,
                    vtype:"checkSame",//自定义的验证类型
                    vtypeText:frame.lang.frame.userRole.NmsUserPanel.passwordDiffer,
　　                                           targetCmpId:"userPassword11"//要比较的另外一个的组件的id
       
		  
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
				columnWidth : 0.33,
				border : false,
				labelWidth : 70,
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
					readOnly : false,
					fieldLabel : '*'+frame.lang.frame.userRole.NmsUserPanel.userName,
					maxLength: 16,
			        enforceMaxLength:true,
			        regex:frame.config.InputCheck.addressNameCheck, 
					name : 'userName',
					listeners:{
		         	render:function(field){
					Ext.create('Ext.tip.ToolTip',{
							target:field.el,
	    					html: frame.lang.common.address.addressNameLimit
					})
			          }}
				},
				roleCombox,
				 {
					xtype : 'textfield',
					fieldLabel : 'QQ',
					name : 'qq',
			        maxLength: 16,
			        regex:frame.config.InputCheck._int
				
				}
                ]
			}, {
				defaults : {
					anchor : '90%'
				},
				items : [ userPassword1,{
					xtype : 'textfield',
					fieldLabel : frame.lang.frame.userRole.NmsUserPanel.userRemark,
					maxLength: 256,
			      //  enforceMaxLength:true,
					name : 'userRemark'
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
				items : [
					userPassword2, {
					xtype : 'textfield',

					fieldLabel : frame.lang.frame.userRole.NmsUserPanel.userAlias,
					name : 'userAlias',
					maxLength: 50
				},  {
					xtype : 'textfield',
					fieldLabel : frame.lang.frame.userRole.NmsUserPanel.phoneNumber,
					name : 'phoneNumber',
				   
					maxLength: 16,
					regex:frame.config.InputCheck._int
				} ]
			} ]
		});

		var cfg = {
			items : [ formPanel ]
		};
		var _cancelBtn = new Ext.Button( {
			xtype : 'button',
			text : frame.lang.global._cancel,
			//iconCls : 'close',
			width:100,
			handler : function() {
				me.closeNmsUserWnd();
			}
		});
	
			cfg.buttons = [ {
				xtype : 'button',
				text : frame.lang.global._save,
				//iconCls : 'save',
				width:100,
				handler : function() {
					me.saveRecord();

				}
			}, _cancelBtn ];
		Ext.apply(me, cfg);
		formPanel.roleCombox = roleCombox;
		me.formPanel = formPanel;
		me.callParent();

	},
	saveRecord : function() {
		var me = this;
		if (me.formPanel.getForm().isValid()) {
			var json = me.formPanel.getForm().getValues();
			delete json.userPassword2;
			json.userPassword = $.md5(json.userPassword);
			json.id = me.showMode == 'copy' ? null : json.id;
			var roleId = json.roleId;
			if (roleId == 'undefined' || roleId == '') {
				json.roleId = null;
			}
			Ext.Ajax.request( {
				url : basePath+'NmsUserController/addNmsUser.do',
				params : {
					data : Ext.encode( [ json ])
				},
				success : function(response, options) {
					var result = Ext.decode(response.responseText);
					var success = result.success;
					if (success == true) {
						frame.util.QuickMsg.operateSuccess(response)
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
	/*	if (me.formPanel.getForm().isDirty()) {
			Ext.Msg.show( {
				title : me.title,
				msg : "【用户表】的数据已被修改,您是否放弃修改?",
				buttons : Ext.Msg.YESNO,
				fn : function(btnCode) {
					me.processCloseWnd(btnCode);
				},
				icon : Ext.MessageBox.QUESTION
			});
		} else {
			me.close();
		}*/
	}

});
