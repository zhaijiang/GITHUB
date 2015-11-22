Ext.define('com.module.common.user.UserPanel_SearhForm', {
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
				fieldLabel : "用户姓名",
				name : 'name',
				xtype : 'textfield'
				
			},	{
				fieldLabel : "用户电话",
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
			}
		} 

		
		];
		me.callParent();
	},
	getQueryCondition:function()
	{

	    var formPanel=this;
		var values= formPanel.getForm().getValues();
		var name=values.name;
		var phone=values.phone;
		
		var condition=[];
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
	}
	

});

Ext
		.define(
				"com.module.common.user.UserPanel_Grid",
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
							//lookUser属于Grid对象 不属于gridView。gridView.lookUser()会有用户
							this.lookUser();
						}
					},
					columns :   [
					             {
					 	     	    xtype : 'rownumberer'
					 	         },
					 	         {
					 	             header : '用户ID',
					 	    	     dataIndex : 'uid',
					 	             width : 80,
					 		         sortable : true
					 	         }, 
					 	          {
					 	             header : '用户电话',
					 	    	     dataIndex : 'phone',
					 	             width : 110,
					 		         sortable : true
					 	         }, 
					 	          
					 	          {
					 	             header : '用户姓名',
					 	    	     dataIndex : 'name',
					 	             width : 110,
					 		         sortable : true
					 	         }, 
					 	          {
					 	             header : '出生年月',
					 	    	     dataIndex : 'born',
					 	             width : 150,
					 		         sortable : true
					 	         }, 
					 	          {
					 	             header : '用户性别',
					 	    	     dataIndex : 'sex',
					 	             width : 80,
					 		         sortable : true,
					 		         renderer:function(value)
					 		         {
					 		        	if(value==0)return "女";
					 					if(value==1)return "男";
					 					if(value==2)return "未知";
					 		         }
					 	         }, 
					 	          {
					 	             header : '身份证号',
					 	    	     dataIndex : 'idcard',
					 	             width : 200,
					 		         sortable : true
					 	         }, 
					 	          {
					 	             header : '用户默认地址',
					 	    	     dataIndex : 'uaid',
					 	             width : 80,
					 	             hidden:true,
					 		         sortable : true
					 	         },
					 	         
					 	          {
					 	             header : '地图位置',
					 	    	     dataIndex : 'range',
					 	             width : 150,
					 		         sortable : true
					 	         },
					 	        {
					 	             header : '详细地址',
					 	    	     dataIndex : 'addr',
					 	             width : 150,
					 		         sortable : true
					 	         },
					 	         {
					 	             header : '注册时间',
					 	    	     dataIndex : 'regtime',
					 	             width : 150,
					 		         sortable : true
					 	         }, 
					 	         {
					 	             header : '最后登录时间',
					 	    	     dataIndex : 'lastlogintime',
					 	             width : 150,
					 		         sortable : true
					 	         },
					 	         {
					 	             header : '鉴权串',
					 	    	     dataIndex : 'token',
					 	             width : 80,
					 		         sortable : true
					 	         },
					 	         {
					 	             header : '最后修改记录的时间',
					 	    	     dataIndex : 'lct',
					 	             width : 150,
					 		         sortable : true
					 	         }
					 			  ],
					initComponent : function() {
						var me = this;
						var store = Ext
								.create(
										'Ext.data.Store',
										{
											fields : ['uid','phone','pwd','name','born','sex','idcard','pic',
											          'uaid','regtime','lastlogintime','token','lct','addr','range'],
											autoLoad : true,
											pageSize : frame.config.pageSize,
											proxy : {
												type : 'ajax',
												url : basePath + 'BackUserController/loadUser',
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
											/*,
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
											}*/

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
						Ext.create('com.module.common.user.UserOperatePanel', {
		
							record : rec,
							showMode : 'look'
						}).show();
					}
					

				});
//定义医生面板类
Ext.define("com.module.common.user.UserPanel", {
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