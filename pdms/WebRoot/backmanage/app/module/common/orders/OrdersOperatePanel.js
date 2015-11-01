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
	title:'Orders Detail',
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
				fieldLabel: 'oid',
				name: 'oid'
			}, {
				xtype: 'textfield',
				fieldLabel: 'uid',
				hidden:true,
				name: 'uid'
			}, {
				xtype: 'textfield',
				fieldLabel: 'did',
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
				fieldLabel: 'dname',
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
				fieldLabel: 'dphone',
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
				fieldLabel: 'uname',
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
				fieldLabel: 'uphone',
				name: 'uphone'
			}, 
			 {
				xtype: 'textfield',
				fieldLabel: 'dlvl',
				hidden:true,
				name: 'dlvl'
			}, 
	         {
			xtype : 'combo',
			fieldLabel : 'status',
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
				fieldLabel: 'record',
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
			    title:'pic',
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
				fieldLabel: 'createtime',
				name: 'createtime'
			}, {
				xtype: 'datetimefield',
				fieldLabel: 'evaltime1',
				name: 'evaltime1'
			}, {
				xtype: 'datetimefield',
				fieldLabel: 'reevaltime1',
				name: 'reevaltime1'
			}, {
				xtype: 'datetimefield',
				fieldLabel: 'evaltime2',
				name: 'evaltime2'
			}, {
				xtype: 'datetimefield',
				fieldLabel: 'reevaltime2',
				name: 'reevaltime2'
			}, {
				xtype: 'textfield',
				fieldLabel: 'eval1',
				name: 'eval1'
			}, {
				xtype: 'textfield',
				fieldLabel: 'reeval1',
				name: 'reeval1'
			}, {
				xtype: 'textfield',
				fieldLabel: 'eval2',
				name: 'eval2'
			}, {
				xtype: 'textfield',
				fieldLabel: 'reeval2',
				name: 'reeval2'
			},{
				xtype: 'textfield',
				fieldLabel: 'espeed',
				name: 'espeed'
			}, {
				xtype: 'textfield',
				fieldLabel: 'eattitude',
				name: 'eattitude'
			}, {
				xtype: 'textfield',
				fieldLabel: 'erecord',
				name: 'erecord'
			}, {
				xtype: 'textfield',
				fieldLabel: 'eeffect',
				name: 'eeffect'
			}, {
				xtype: 'textfield',
				fieldLabel: 'esupport',
				name: 'esupport'
			}, {
				xtype: 'textfield',
				fieldLabel: 'evaluate',
				name: 'evaluate'
			}, {
				xtype: 'textfield',
				fieldLabel: 'uaid',
				hidden:true,
				name: 'uaid'
			},{
				xtype: 'textfield',
				fieldLabel: 'range',
				hidden:true,
				name: 'range'
			}, {
				xtype: 'textfield',
				fieldLabel: 'addr',
				hidden:true,
				name: 'addr'
			},
			{
				xtype: 'textfield',
				fieldLabel: 'totaladdr',
				name: 'totaladdr'
			},{
				xtype: 'textfield',
				fieldLabel: 'distance',
				name: 'distance'
			}, {
				xtype: 'textfield',
				fieldLabel: 'price',
				name: 'price'
			}, {
				xtype: 'textfield',
				fieldLabel: 'payid',
				name: 'payid'
			}, {
				xtype: 'datetimefield',
				fieldLabel: 'lct',
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
			title: 'otrace',
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
				header: "oid",
				dataIndex: 'oid',
				width: 100
			}, {
				header: "time",
				dataIndex: 'time',
				width: 150
			}, {
				header: "status",
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
				header: "remark",
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