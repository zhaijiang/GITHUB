

Ext.define("com.module.frame.userRole.Ref_ctftypePanel_Window", {
	extend : 'Ext.window.Window',
	alias : 'widget.Ref_ctftypepanel_Window',
	width : 1000,
	constrain : true,
	modal : true,
	height : 300,
	layout : 'fit',
	border : false,
	buttonAlign : 'center',
	initComponent : function() {
		var me = this;
		var createTime=Ext.create('Frame.form.datetime.DateTime',{
			fieldLabel : frame.lang.global.createTime,
			name : 'createTime',
			readOnly:true
		});
			var operateTime=Ext.create('Frame.form.datetime.DateTime',{
			fieldLabel : frame.lang.global.operationTime,
			name : 'operateTime',
			readOnly:true
		});

		var formpanel = Ext.create("Ext.form.formpanel", {
			border : false,
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
					fieldLabel : frame.lang.frame.userRole.Ref_ctftypePanel.roleName,
					name : 'roleName',
					maxLength: 16,
				    enforceMaxLength:true,
			        regex:frame.config.InputCheck.addressNameCheck, 
					listeners:{
		         	render:function(field){
				   	if (me.showMode == 'save' || me.showMode=='modify') {
					  Ext.create('Ext.tip.ToolTip',{
							target:field.el,
	    					html: frame.lang.common.address.addressNameLimit
					 })
			      }}
				}
				},
				operateTime,
			{
					xtype : 'textfield',
					fieldLabel : frame.lang.global.creatorId,
					name : 'creatorId',
					readOnly:true,
					hidden:true
					
				} ]
			}, {
				defaults : {
					anchor : '90%'
				},
				items : [{
					xtype : 'textfield',
					fieldLabel :frame.lang.frame.userRole.Ref_ctftypePanel.roleRemark,
					name : 'roleRemark',
					maxLength:256
				}]
			}, {
				defaults : {
					anchor : '90%'
				},
				items : [  {
					xtype : 'textfield',
					hidden : true,
					fieldLabel : 'id',
					name : 'id'
				} ,
				 {
					xtype : 'textfield',
					hidden : true,
					fieldLabel : frame.lang.frame.userRole.Ref_ctftypePanel.roleType,
					name : 'roleType'
				} ]
			}, {
				defaults : {
					anchor : '90%'
				},
				items : [ 
			
				createTime,
						{
					xtype : 'textfield',
					hidden : true,
					fieldLabel : frame.lang.global.status,
					value : 0,
					name : 'status'
				} 
			]
			} ]
		});

		var cfg = {
			items : [ formpanel ]
		};
		var cancelBtn = new Ext.Button( {
			xtype : 'button',
			width:100,
			text : frame.lang.global._cancel,
			handler : function() {
				me.closeNmsRoleWnd();
			}
		});
		if (me.showMode == 'save') {
			cfg.buttons = [ {
				xtype : 'button',
				text : frame.lang.global._save,
				width:100,
				handler : function() {
					me.saveRecord();

				}
			}, cancelBtn ];
			createTime.hide();
			operateTime.hide();
		} else if (me.showMode == 'copy') {
			cfg.buttons = [ {
				xtype : 'button',
				text : frame.lang.global._copy,
				width:100,
				handler : function() {
					me.saveRecord();

				}
			}, cancelBtn ];
			formpanel.getForm().loadRecord(me.record);
		} else if (me.showMode == 'modify') {
			cfg.buttons = [ {
				xtype : 'button',
				text : frame.lang.global._modify,
                 width:100,
				handler : function() {
					me.modifyRecord();

				}
			}, cancelBtn ];
			formpanel.getForm().loadRecord(me.record);
		} else {
			cfg.buttons = [ cancelBtn ];
              formpanel.getForm().loadRecord(me.record);
	          var formItems=Ext.ComponentQuery.query('#'+formpanel.id+' component');
	          Ext.each(formItems,function(item){
		       item.readOnly=true;
	          });
}
Ext.apply(me, cfg);
me.formpanel = formpanel;
me.callParent();
},
     /**
      * 添加角色
      * @memberOf {TypeName} 
      */
	saveRecord : function() {
		var me = this;
		if (me.formpanel.getForm().isValid()) {
			var json = me.formpanel.getForm().getValues();
			/*var parentId = json.parentId;
			if (parentId == 'undefined' || parentId == null || parentId == '') {
				json.parentId = -1;
			}*/
			json.id = me.showMode == 'copy' ? null : json.id;
			Ext.Ajax.request( {
				url : basePath+'NmsRoleController/addNmsRole.do',
				params : {
					data : Ext.encode( [ json ])
				},
				success : function(response, options) {
					var success = Ext.decode(response.responseText).success;
					if (success == true) {
						frame.util.QuickMsg.operateSuccess(response);
						me.grid.getStore().load();
						me.close();
					}
					else
					{
						frame.util.QuickMsg.operateFailure(response);
					}
				},
				failure : function(response, options) {
					frame.util.QuickMsg.showMsg(frame.lang.global.netError);
				}
			});
		}
	},
	/**
	 * 修改角色
	 * @memberOf {TypeName} 
	 */
	modifyRecord : function() {
		var me = this;
		if (me.formpanel.getForm().isValid()) {
			var json = me.formpanel.getForm().getValues();
			json.id = me.record.data.id;
			Ext.Ajax.request( {
				url : basePath+'NmsRoleController/updateNmsRole.do',
				params : {

					data : Ext.encode( [ json ])
				},
				success : function(response, options) {
					var success = Ext.decode(response.responseText).success;
					if (success == true) {
						frame.util.QuickMsg.operateSuccess(response);
						me.grid.getStore().load();
						me.close();
					}
					else{
						frame.util.QuickMsg.operateFailure(response);
					}
				},
				failure : function(response, options) {
					frame.util.QuickMsg.showMsg(frame.lang.global.netError);;
				}
			});
		}
	},
	/**
	 * 判断是否关闭窗口
	 * @param {Object} btnCode YES OR NO 按钮
	 * @memberOf {TypeName} 
	 */
	processCloseWnd : function(btnCode) {
		var me = this;
		if (btnCode == "yes" || btnCode == "ok") {
			me.close();
		}
	},
    /**
     * 关闭WINDOW
     * @memberOf {TypeName} 
     */
	closeNmsRoleWnd : function() {
		var me = this;
		
			me.close();
		
	}

});
/**
 * 角色GRID
 * @memberOf {TypeName} 
 */
Ext.define("com.module.frame.userRole.Ref_ctftypePanel_Grid", {
	extend : 'Ext.grid.Panel',
	alias : 'widget.Ref_ctftypepanel_Grid',
	autoScroll : true,
	border : false,
	stripeRows : true,
	clicksToEdit : 2,
	collapseMode : 'mini',
	listeners : {
		'itemdblclick' : function(gridView, record) {
			this.getSelectionModel().select([record],true);
			this.lookNmsRole();
		}
	},
	columns : [ {
		xtype : 'rownumberer'
	}, {
		header : 'id',
		dataIndex : 'id',
		width : 100,
		hidden:true,
		sortable : true
	}, {
		header : frame.lang.frame.userRole.Ref_ctftypePanel.roleName,
		dataIndex : 'roleName',
		width : 100,
		sortable : true
	},
	{
		header : frame.lang.frame.userRole.Ref_ctftypePanel.roleRemark,
		dataIndex : 'roleRemark',
		width : 250,
		sortable : true
	},{
		header :  frame.lang.global.status,
		dataIndex : 'status',
		hidden : true,
		width : 100,
		sortable : true
	}, {
		header : frame.lang.global.operationTime,
		dataIndex : 'operateTime',
		width : 250,
		sortable : true
	}, {
		header : frame.lang.global.createTime,
		dataIndex : 'createTime',
		width : 250,
		sortable : true
	}, 
	 {
		header : frame.lang.frame.userRole.Ref_ctftypePanel.roleType,
		dataIndex : 'roleType',
		width : 100,
		hidden:true,
		sortable : true
	},{
		header : frame.lang.global.creatorId,
		dataIndex : 'creatorId',
		width : 100,
		hidden:true,
		sortable : true,
		flex:1
	}],

	initComponent : function() {
		var me = this;
		var store = Ext.create('Ext.data.Store', {
			fields : [ 'id', 'roleName', 'roleType', 'status',
					'operateTime', 'createTime', 'creatorId','roleMark'],
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
				url : basePath+'NmsRoleController/loadNmsRole.do',
				reader : {
					type : 'json',
					root : 'returnData'
				}
				
			},
			listeners : {
				'beforeload' : function(store) {
				var condition=[];
				condition.push({
					fieldName:'status',
					operation:'ge',
					value:0
				});
				
				Ext.apply(store.proxy.extraParams,
					{
					  condition:Ext.encode(condition)
					})
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
				width:100,
				handler : function() {
					me.refreshNmsRole();
				}
			}, {
				xtype : 'button',
				text : frame.lang.global._look,
				width:100,
				handler : function() {
					me.lookNmsRole();
				}
			}, {
				xtype : 'button',
				text : frame.lang.global._add,
				width:100,
				handler : function() {
					me.addNmsRole();
				}
			}
			, {
				xtype : 'button',
			    text : frame.lang.global._modify,
				width:100,
				handler : function() {
					me.updateNmsRole();
				}

			}, {
				xtype : 'button',
			    text : frame.lang.global._delete,
				width:100,
				handler : function() {
					me.deleteNmsRole();
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
         store.pageSize =nowPageSize;
         store.load();
        store.loadPage(1);
         
     });
		me.bbar = bbar;
		me.tbar = tbar;
		me.store = store;
		me.selModel = sm;
		this.callParent();
	},
	/**
	 * 创建添加角色WINDOW
	 * @memberOf {TypeName} 
	 */
	addNmsRole : function() {
		var me = this;
		Ext.widget('Ref_ctftypepanel_Window', {
			title : frame.lang.global._add,
			grid : me,
			showMode : 'save'

		}).show();
	},
	/**
	 * 创建更新角色WINDOW
	 */
	updateNmsRole : function() {
		var me = this;
		var rec =frame.util.Grid.getSelectedOne(me);
		if (Ext.isEmpty(rec)) {
			frame.util.QuickMsg.showMsg(frame.lang.global.selectHandleData);
			return;
		}
		Ext.widget('Ref_ctftypepanel_Window', {

			title : frame.lang.global._modify,
			grid : me,
			record : rec,
			showMode : 'modify'

		}).show();
	},
	/**
	 * 删除角色
	 * @memberOf {TypeName} 
	 * @return {TypeName} 
	 */
	deleteNmsRole : function() {
		var me = this;
		var rec = me.selModel.getSelection();
		if (frame.util.isNull(rec)||rec.length==0) {
			frame.util.QuickMsg.showMsg(frame.lang.global.selectHandleData);
			return;
		}
	
		Ext.Msg.show( {
			title : frame.lang.frame.userRole.Ref_ctftypePanel.roleData,
			msg : frame.lang.global.deleteConfirm,
			buttons : Ext.Msg.YESNO,
			fn : function(btnCode) {
				me.confirmDelNmsRole(btnCode)
			},
			icon : Ext.MessageBox.QUESTION
		});
	},
   /**
    * 确认是否删除角色
    * @param {Object} btnCode 判断按钮
    * @param {Object} json 角色ID 
    * @memberOf {TypeName} 
    */
	confirmDelNmsRole : function(btnCode, json) {
		var me = this;
		if (btnCode == 'yes' || btnCode == 'ok') {
		var rec=me.selModel.getSelection();
		var systemRole='';
		var json=[];
		 Ext.each(rec, function(r) {
		
				json.push(r.data.id);
			
		 });
	       if(json.length==0)
	       {
               frame.util.QuickMsg.showMsg(frame.lang.global.selectHandleData);		
	       }
			Ext.Ajax.request( {
				url : basePath+'NmsRoleController/deleteNmsRole.do',
				params : {

					data : Ext.encode(json)
				},
				success : function(response, options) {
					var success = Ext.decode(response.responseText).success;
					if (success == true) {
					
			            frame.util.QuickMsg.showMsg(frame.lang.global.operateSuccess);
						me.getStore().load();
					} else {
			       frame.util.QuickMsg.showMsg(frame.lang.global.operateFailure);
				   }
				},
				failure : function(response, options) {
					frame.util.QuickMsg.showMsg(frame.lang.global.netError);
				}
			});
		}
	},
	/**
	 * 刷新角色
	 * @memberOf {TypeName} 
	 */
	refreshNmsRole : function() {
		var me = this;
		me.store.load();
	},
    /**
     * 打开查看角色WINDOW
     * @memberOf {TypeName} 
     * @return {TypeName} 
     */
	lookNmsRole : function() {
		var me = this;
		var rec = frame.util.Grid.getSelectedOne(me);
		if (Ext.isEmpty(rec)) {
			frame.util.QuickMsg.showMsg(frame.lang.global.selectHandleData);
			return;
		}
		Ext.widget('Ref_ctftypepanel_Window', {
			title : frame.lang.global._look,
			record : rec,
			showMode : 'look'
		}).show();
	},
	/**
	 * 打开复制角色WINDOW
	 * @memberOf {TypeName} 
	 * @return {TypeName} 
	 */
	copyNmsRole : function() {
		var me = this;
		var rec = frame.util.Grid.getSelectedOne(me);
		if (rec == null) {
			frame.util.QuickMsg.showMsg(frame.lang.global.selectHandleData);
			return;
		}
		Ext.widget('Ref_ctftypepanel_Window', {
			title : frame.lang.global._copy,
			grid : me,
			record : rec,
			showMode : 'copy'
		}).show();
	}

});
/**
 * 角色面板类
 * @memberOf {TypeName} 
 */
Ext.define("com.module.frame.userRole.Ref_ctftypePanel", {
	extend : 'Ext.panel.Panel',
	layout : 'fit',
	//初始化角色面板
	initComponent : function() {
		var me = this;
		me.callParent();
		var roleGrid = Ext.create('widget.Ref_ctftypepanel_Grid');
		//在角色面板内部添加表格
	    me.add(roleGrid);

}

});