Ext.define('com.module.common.doctor.DoctorPanel_SearhForm', {
	extend : 'Ext.form.FormPanel',
	alias : 'widget.DoctorPanel_SearhForm',
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

//2
Ext
		.define(
				"com.module.common.doctor.DoctorPanel_Grid",
				{
					extend : 'Ext.grid.Panel',
					requires:['com.module.common.doctor.DoctorOperatePanel','com.module.common.doctor.DoctorAuditPanel'],
					alias : 'widget.DoctorPanel_Grid',
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
		},
		{
			header : '医生等级',
			dataIndex : 'level',
			width : 80,
			sortable : true
		},{
			header :  '医生状态',
			dataIndex : 'status',
			width : 80,
			sortable : true,
			renderer:function(value)
			{
				if(value==0)return "已注册，尚未提交审核信息";
				if(value==1)return "已提交审核信息，待审核";
				if(value==2)return "审核未通过";
				if(value==3)return "审核通过，未完善出诊信息";
				if(value==4)return "可出诊";
				if(value==5)return "等待出诊订单";
				if(value==6)return "出诊中";
				if(value==7)return "已冻结";
				
				
			}
		},{
			header : '最后上线时间',
			dataIndex : 'lastlogintime',
			width : 200,
			sortable : true
		}],
					initComponent : function() {
						var me = this;
						var store = Ext
								.create(
										'Ext.data.Store',
										{
											fields : ['did','phone','pwd','name','score','born','sex','photo','addr'
											          ,'x','y','level','price','espeed','eattitude','erecord','eeffect'
											          ,'esupport','intro','times','status','token','remark','lastlogintime'
											          ,'lct','regtime','account','idno','insend','insbegin','org','ctftype'
											          ,'ctflvl','svcrange','ptlvl','orgname','ctflvlname' ,'ctftypename','ptlvlname'],
											autoLoad : true,
											pageSize : frame.config.pageSize,
											proxy : {
												type : 'ajax',
												url : basePath + 'BackDoctorController/loadDoctor',
												reader : {
													type : 'json',
													root : 'datas'
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
												text : "审核",
												width:70,
												//iconCls : 'add.gif',
												handler : function() {
													me.auditDoctor();
												}
											},
											{
												xtype : 'button',
												text : "冻结",
												width:70,
												handler : function() {
													me.freezeDoctor();
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
					   freezeDoctor:function()
					    {
					    	var me=this;
					        var rec = me.selModel.getSelection();
					        if(rec.length==0)
					        {
					        	frame.util.QuickMsg.showMsg("请选择要操作的数据");
					        }
					         var ids = [];
							  Ext.each(rec, function(r) {
								ids.push(r.data.did);
							
							 });
						   Ext.Ajax.request( {
									url : basePath+'BackDoctorController/freezeDoctor',
									params : {

										ids : Ext.encode(ids)
									},
									success : function(response, options) {
										var result = Ext.decode(response.responseText);
										if (result.success == true) {
										
														
											frame.util.QuickMsg.operateSuccess(response);
											
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
						Ext.widget('DoctorOperatePanel', {
							record : rec,
							showMode : 'look'
						}).show();
					},
					auditDoctor : function() {
						var me = this;
						var rec = frame.util.Grid.getSelectedOne(me);
						if (Ext.isEmpty(rec)) {
							frame.util.QuickMsg.showMsg(frame.lang.global.selectHandleData);
							return;
						}
						Ext.widget('DoctorAuditPanel', {
							title : '资格审核',
							record : rec
						}).show();
					}
				

				});
//定义医生面板类
Ext.define("com.module.common.doctor.DoctorPanel", {
	extend : 'Ext.panel.Panel',
	layout : 'vbox',
	//初始化医生面板
	initComponent : function() {
		var me = this;
		me.callParent();
		var grid = Ext.widget('DoctorPanel_Grid');
		var searchFrom=Ext.widget('DoctorPanel_SearhForm');
		 me.add(searchFrom);
	     me.add(grid);

}

});