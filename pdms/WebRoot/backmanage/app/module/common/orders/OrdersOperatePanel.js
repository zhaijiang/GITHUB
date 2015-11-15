//SELECT d.name AS dname, u.phone AS uphone,ad.range,ad.addr, t.* FROM orders t  LEFT JOIN user  u ON t.uid=u.uid LEFT JOIN  doctor d ON t.did=d.did 
//LEFT  JOIN useraddr ad ON u.uaid=ad.uaid  ORDER BY t.oid ASC
//-----
//SELECT * FROM otrace t WHERE t.oid=? ORDER BY TIME desc

//查看
Ext.define("com.module.common.orders.OrdersOperatePanel", {
	extend: 'Ext.window.Window',
	alias: 'widget.OrdersOperatePanel',
	width: 1000,
	constrain: true,
	title:'订单详细信息',
	modal: true,
	height: 600,
	layout: 'vbox',
	border: false,
	buttonAlign: 'center',
	initComponent: function() {
		var me = this;
		me.record.data.totaladdr=me.record.data.range+"/"+me.record.data.addr
		var formpanel = Ext.create("Ext.form.Panel", {
			border: false,
			flex: 1,
			width:'100%',
			layout: 'column',
			defaults: {
				xtype: 'textfield',
				hideTrigger: true,
				width: 320,
				labelWidth: 110,
				margin: '5 0 0 10'
			},
			plugins: [],
			listeners: {
				'render': function(formpanel) {}
			},
			items: [{
				xtype: 'textfield',
				fieldLabel: '订单ID',
				name: 'oid'
			}, {
				xtype: 'textfield',
				fieldLabel: '用户ID',
				hidden:true,
				name: 'uid'
			}, {
				xtype: 'textfield',
				fieldLabel: '医生ID',
				hidden:true,
				name: 'did'
			}, 
		  {
			xtype:'fieldcontainer',
			layout:'hbox',
			items:[
			{
				xtype: 'textfield',
				labelWidth: 110,
				width:290,
				fieldLabel: '医生姓名',
				name: 'dname'
			},{
			  xtype:'button',
			  width:30,
			  text:'!',
			  handler:function()
			  {
			  		var record={
		 	     data:{did:me.record.data.did},
			  	  getData:function()
			  	  {
			  	  	return this.data;
			  	  }
			  	}
			  	
			  	Ext.create('com.module.common.doctor.DoctorOperatePanel',{
			      record:record
			  	
			  	}
			  	).show();
			  }
			}]
			},
			{
				xtype: 'textfield',
				fieldLabel: '医生电话',
				name: 'dphone'
			}, 
				{
			xtype:'fieldcontainer',
			layout:'hbox',
			items:[
			{
				xtype: 'textfield',
				labelWidth: 110,
				width:290,
				fieldLabel: '用户姓名',
				name: 'uname'
			},{
			  xtype:'button',
			  width:30,
			  text:'!',
			   handler:function()
			  {
			  	var record={
			  	data:{uid:me.record.data.uid},
			  	
			  	  getData:function()
			  	  {
			  	   return this.data;
			  	  }
			  	}
			  	
			  	Ext.create('com.module.common.user.UserOperatePanel',{
			      record:record
			  	
			  	}
			  	).show();
			  }
			}]
			},
			{
				xtype: 'textfield',
				fieldLabel: '用户电话',
				name: 'uphone'
			}, 
			 {
				xtype: 'textfield',
				fieldLabel: '医生当时级别',
				hidden:true,
				name: 'dlvl'
			}, 
	         {
			xtype : 'combo',
			fieldLabel : '订单状态',
			displayField:'name',
			valueField:'value',
			name : 'status',
			store:Ext.create('Ext.data.ArrayStore',{
			fields:['name','value'],
			data:[
			['新建',0],['已支付',1],['dc_已出发',2],['诊断中',3],['待确认支付',4],['待用户一次评价',5],['待dc_一次评价',6],['待用户二次评价',7],
			['待dc_二次评价',8],['待确认取消',9],['挂起',10],['结束',11]
			]
			})
					 					
			},
			{
			xtype:'fieldcontainer',
			layout:'hbox',
			items:[
			{
				xtype: 'textfield',
				fieldLabel: '问诊记录',
				labelWidth: 110,
				width:290,
				name: 'record'
			},{
			  xtype:'button',
			  width:30,
			  text:'!',
			  
			  handler:function()
			  {
			  	Ext.create('Ext.window.Window',{
			    title:'问诊记录',
			  	width:500,
			  	autoScroll:true,
			  	height:500,
			  	items:[{
			  	 xtype:'image',
			  	 src:basePath+me.record.data.record_pic
			  	}]
			  	
			  	}
			  	).show();
			  }
			}]
			},{
				xtype: 'textfield',
				fieldLabel: 'record_pic',
				hidden:true,
				name: 'record_pic'
			}, {
				xtype: 'datetimefield',
				fieldLabel: '创建时间',
				name: 'createtime'
			}, {
				xtype: 'textfield',
				fieldLabel: '第一次评价内容',
				name: 'eval1'
			},
			 {
				xtype: 'datetimefield',
				fieldLabel: '第一次评价时间',
				name: 'evaltime1'
			},{
				xtype: 'textfield',
				fieldLabel: '第一次回复内容',
				name: 'reeval1'
			},
			{
				xtype: 'datetimefield',
				fieldLabel: '第一次回复时间',
				name: 'reevaltime1'
			},{
				xtype: 'textfield',
				fieldLabel: '第二次评价内容',
				name: 'eval2'
			},  {
				xtype: 'datetimefield',
				fieldLabel: '第二次评价时间',
				name: 'evaltime2'
			}, {
				xtype: 'textfield',
				fieldLabel: '第二次回复内容',
				name: 'reeval2'
			},
			{
				xtype: 'datetimefield',
				fieldLabel: '第二次回复时间',
				name: 'reevaltime2'
			}, {
				xtype: 'textfield',
				fieldLabel: '上门速度分数',
				name: 'espeed'
			}, {
				xtype: 'textfield',
				fieldLabel: '医生态度分数',
				name: 'eattitude'
			}, {
				xtype: 'textfield',
				fieldLabel: '问诊记录分',
				name: 'erecord'
			}, {
				xtype: 'textfield',
				fieldLabel: '疗效分数',
				name: 'eeffect'
			}, {
				xtype: 'textfield',
				fieldLabel: '支持力度分数',
				name: 'esupport'
			}, {
				xtype: 'textfield',
				fieldLabel: '最终评价',
				name: 'evaluate'
			}, {
				xtype: 'textfield',
				fieldLabel: '上门位置',
				hidden:true,
				name: 'uaid'
			},{
				xtype: 'textfield',
				fieldLabel: '上门地图位置',
				hidden:true,
				name: 'range'
			}, {
				xtype: 'textfield',
				fieldLabel: '上门详细地址',
				hidden:true,
				name: 'addr'
			},
			{
				xtype: 'textfield',
				fieldLabel: '上门位置',
				name: 'totaladdr'
			},{
				xtype: 'textfield',
				fieldLabel: '距离',
				name: 'distance'
			}, {
				xtype: 'textfield',
				fieldLabel: '诊费',
				name: 'price'
			}, {
				xtype: 'textfield',
				fieldLabel: '支付订单号',
				name: 'payid'
			}, {
				xtype: 'datetimefield',
				fieldLabel: '最后修改记录时间',
				name: 'lct'
			}]
		});
		var condition = [];
		condition.push({
			fieldName: 't.oid',
			operation: 'eq',
			valueType: 'Integer',
			value: me.record.data.oid
		}) 
		var otrace = Ext.create('Ext.grid.Panel', {
			title: '订单跟踪信息',
			height: 250,
			width: '100%',
			store: Ext.create('Ext.data.Store', {
				fields: ['oid', 'time', 'status','remark','lct'],
				pageSize: 20,
				autoLoad: true,
				proxy: {
					type: 'ajax',
					url: basePath + 'BackOrdersController/loadOtrace',
					extraParams: {
						condition: Ext.encode(condition),
						oid:me.record.data.oid
					},
					reader: {
						type: 'json',
						root: 'returnData'
					}
				}
			}),
			selModel: Ext.create('Ext.selection.CheckboxModel', {
				mode: "MULTI"
			}),
			autoScroll: true,
			columns: [{
				xtype: 'rownumberer'
			}, {
				header: "订单ID",
				dataIndex: 'oid',
				width: 100
			}, {
				header: "时间",
				dataIndex: 'time',
				width: 150
			}, {
				header: "订单状态",
				dataIndex: 'status',
				width: 150,
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
			}, {
				header: "订单备注",
				dataIndex: 'remark',
				width: 350,
				renderer : function(value, p, record) {
                  return '<div style="white-space:normal;">' + value.toString() + '</div>';
                }
			}, {
				header: "最后修改记录的时间",
				dataIndex: 'lct',
				width: 150
			}]
		});
		var pageSizeCombootrace = Ext.create('Ext.form.ComboBox', {
			store: Ext.create('Ext.data.ArrayStore', {
				fields: ['text', 'value'],
				data: [
					['5', 5],
					['10', 10],
					['20', 20],
					['30', 30]
				]
			}),
			valueField: 'value',
			displayField: 'text',
			value: 20,
			width: 70
		});
		pageSizeCombootrace.on("select", function(comboBox) {
			var nowPageSize = parseInt(comboBox.getValue());
			otracebbar.pageSize = nowPageSize;
			otrace.store.pageSize = nowPageSize;
			otrace.store.load();
			otrace.store.loadPage(1)
		});
		var otracebbar = new Ext.PagingToolbar({
			afterPageText: '/{0}页',
			dock: 'bottom',
			beforePageText: '第',
			store: otrace.store,
			inputItemWidth: 50,
			displayInfo: true,
			items: ['-', '每页显示', pageSizeCombootrace, '行'],
			displayMsg: '第{0}条 - 第{1}条，共{2}条记录',
			emptyMsg: '没有记录'
		});
		otrace.addDocked(otracebbar);
		var cfg = {
			items: [formpanel, otrace]
		};
		var _cancelBtn = new Ext.Button({
			xtype: 'button',
			text: frame.lang.global._cancel,
			width: 100,
			handler: function() {
				me.close()
			}
		});
		cfg.buttons = [_cancelBtn];
		//formpanel.getForm().loadRecord(me.record);
		formpanel.getForm().setValues(me.record.data);
		var formItems = Ext.ComponentQuery.query('#' + formpanel.id + ' component');
		Ext.each(formItems, function(item) {
			item.readOnly = true;
			if(item.setFieldStyle)
			{
			item.setFieldStyle(frame.config.formFieldReadOnlyTrueCss);
			}
		});
		Ext.apply(me, cfg);
		me.formpanel = formpanel;
		me.callParent()
	}
});