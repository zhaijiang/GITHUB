//SELECT d.name AS dname, u.phone AS uphone,ad.range,ad.addr, t.* FROM orders t  LEFT JOIN user  u ON t.uid=u.uid LEFT JOIN  doctor d ON t.did=d.did 
//LEFT  JOIN useraddr ad ON u.uaid=ad.uaid  ORDER BY t.oid ASC
//-----
//SELECT * FROM otrace t WHERE t.oid=? ORDER BY TIME desc

//查看
Ext.define("com.module.common.orders.OrdersPayLookPanel", {
	extend: 'Ext.window.Window',
	alias: 'widget.OrdersPayLookPanel',
	width: 1000,
	constrain: true,
	title:'Orders Detail',
	modal: true,
	height: 600,
	layout: 'fit',
	border: false,
	buttonAlign: 'center',
	initComponent: function() {
		var me = this;
		
		   var orders = Ext.create('Ext.grid.Panel', {
	        	title:'orders',
	        	height:'100%',
				width:'100%',
	        	store: Ext.create('Ext.data.Store', {
	           fields: ['oid','uid','did', 'dlvl', 'status', 'record', 'record_pic', 'createtime', 'evaltime1',
	            'reevaltime1', 'evaltime2', 'reevaltime2', 'eval1', 'reeval1', 'eval2', 'reeval2', 
	            'espeed', 'eattitude', 'erecord', 'eeffect', 'esupport', 
	            'evaluate', 'uaid', 'distance', 'price', 'payid', 'lct','dname','dphone','uname','uphone','range','addr','totaladdr','platformin','platformpay'],		
	            pageSize : 10,
				autoLoad : true,
	            listeners: {
	                'beforeload': function(store) {
	                    var condition = [];
	                    condition.push({
							fieldName : 't.did',
							operation : 'eq',
							valueType:'Integer',
							value : me.record.data.did
						});
	                    var date=new Date();
	                  var  year=date.getFullYear();
	                  var month=date.getMonth();
	                    Ext.apply(store.proxy.extraParams, {
	                        condition: Ext.encode(condition)
	                    })
	                }
	            },
	            proxy : {
					type : 'ajax',
					url : basePath+'BackOrdersController/loadOrdersDetail',
					//SELECT u.name as uname ,ua.* FROM useraddr ua LEFT JOIN  USER u ON  ua.uid=u.uid WHERE ua.uid=?
					extraParams : {
					},
					reader : {
						type : 'json',
						root : 'returnData'
					}
					
					

				}
			
			}),
			  listeners:{
			  	
	                'itemdblclick':function(grid,record)
	                {
	                	     Ext.create('com.module.common.orders.OrdersOperatePanel', {
	                              record: record
	                          }).show()
	                }
			  },
	       		selModel: Ext.create('Ext.selection.CheckboxModel',
			   { 		
				  mode : "MULTI"
			     })		,
	        	autoScroll:true,
	        	columns : [ {
	        xtype: 'rownumberer'
	    },
	    {
	        header: 'OrderID',
	        dataIndex: 'oid',
	        width: 70,
	        sortable: true
	    },
	    {
	        header: 'status',
	        dataIndex: 'status',
	        width: 150,
	        sortable: true,
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
	    },
	    {
	        header: 'createtime',
	        dataIndex: 'createtime',
	        width: 150,
	        sortable: true
	    },
	    {
	        header: 'price',
	        dataIndex: 'price',
	        width: 80,
	        sortable: true
	    },
	    {
	        header: 'platformin',
	        dataIndex: 'platformin',
	        width: 80,
	        sortable: true
	    },
	    {
	        header: 'platformpay',
	        dataIndex: 'platformpay',
	        width: 80,
	        sortable: true
	    }
				]

	        });			
			//分页的combobox下拉选择显示条数
	     var  pageSizeComboorders = Ext.create('Ext.form.ComboBox',{
	          store: Ext.create('Ext.data.ArrayStore',{
	              fields: ['text', 'value'],
	              data: [['10', 10], ['20', 20],['30', 30], ['50', 50],  ['100', 100]]
	          }),
	          valueField: 'value',
	          displayField: 'text',
	          value:20,
	          width: 70
	      });
	       pageSizeComboorders.on("select", function (comboBox) {
			var nowPageSize= parseInt(comboBox.getValue());
	        bbar.pageSize =nowPageSize;
	         orders.store.pageSize =nowPageSize;//设置store的pageSize，可以将工具栏与搜索的数据同步。
	         orders.store.load();
	         orders.store.loadPage(1);//显示第一页
	         
	     });
	     var ordersbbar= new Ext.PagingToolbar( {
				afterPageText : '/{0}页',
				dock:'bottom',
				beforePageText : '第',
				store : orders.store,
				inputItemWidth:50,
				displayInfo : true,
				items: ['-', '每页显示',pageSizeComboorders,'行'],
				displayMsg : '第{0}条 - 第{1}条，共{2}条记录',
				emptyMsg :'没有记录'

			});
			orders.addDocked(ordersbbar);
			var doctor = Ext.create('Ext.grid.Panel', {
	        	title:'doctor',
	        	hidden:true,
	        	height:'100%',
				width:'100%',
	        	store: Ext.create('Ext.data.Store', {
	        	fields : [ "name","phone","sex","totalincome"],
				pageSize : 10,
				autoLoad : false,
				sorters: [{
	                    property: 'lct',
	                    direction: 'asc'
	               }],
	               listeners: {
	                'beforeload': function(store) {
	                    var formPanel = me.searchcon;
	                    var condition = formPanel.getQueryCondition();
	                    Ext.apply(store.proxy.extraParams, {
	                        condition: Ext.encode(condition)
	                    })
	                }
	            },
	            proxy : {
					type : 'ajax',
					url :  basePath+'BackOrdersController/loadDoctorByIncome',
					extraParams : {
					},
					reader : {
						type : 'json',
						root : 'returnData'
					}
					

				}
			
			}),
	       		selModel: Ext.create('Ext.selection.CheckboxModel',
			   { 		
				  mode : "MULTI"
			     })		,
	        	autoScroll:true,
	        	columns : [  {
				xtype : 'rownumberer'
				}, {
					header : "name",
					dataIndex : 'name',
					width : 100
				},
				 {
					header : "phone",
					dataIndex : 'dname',
					width : 100
				},
				 {
					header : "sex",
					dataIndex : 'sex',
					width : 80,
					renderer:function(value)
					{
						if(value==0)return '女'
						return '男';
					}
				},
				 {
					header : "totalincome",
					dataIndex : 'totalincome',
					width : 100
				}
				]

	        });			
			//分页的combobox下拉选择显示条数
	     var  pageSizeCombodoctor = Ext.create('Ext.form.ComboBox',{
	          store: Ext.create('Ext.data.ArrayStore',{
	              fields: ['text', 'value'],
	              data: [['10', 10], ['20', 20],['30', 30], ['50', 50],  ['100', 100]]
	          }),
	          valueField: 'value',
	          displayField: 'text',
	          value:20,
	          width: 70
	      });
	       pageSizeCombodoctor.on("select", function (comboBox) {
			var nowPageSize= parseInt(comboBox.getValue());
	        bbar.pageSize =nowPageSize;
	         doctor.store.pageSize =nowPageSize;//设置store的pageSize，可以将工具栏与搜索的数据同步。
	         doctor.store.load();
	         doctor.store.loadPage(1);//显示第一页
	         
	     });
	     me.items=[orders];
		me.callParent()
	}
});