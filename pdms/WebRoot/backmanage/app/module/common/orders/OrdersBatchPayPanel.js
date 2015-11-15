
Ext.define("com.module.common.orders.OrdersBatchPayPanel", {
	extend: 'Ext.window.Window',
	width: 1000,
	constrain: true,
	title:'医生支付',
	modal: true,
	height: 600,
	layout: 'vbox',
	border: true,
	buttonAlign: 'center',
	initComponent: function() {
		var me = this;
		
		   var  moneyEdit=Ext.create('Ext.form.field.Number',{
			   allowDecimals: true
		   })   
		   var pay = Ext.create('Ext.grid.Panel', {
	        	    flex: 1,
	        	    width: '100%',
	        	    autoScroll: true,
	        	    border: false,
	        	    stripeRows: true,
	        	    split: true,
	        	    clicksToEdit: 2,
	        	    collapseMode: 'mini',
	        	    listeners: {
	        	        'itemdblclick': function(gridView, record) {
	        	            this.getSelectionModel().select([record], true);
	        	            this.lookOrder()
	        	        }
	        	    },
	        		columns : [ {
						xtype : 'rownumberer'
					}, {
						header : '医生ID',
						dataIndex : 'did',
						width : 70,
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
		}, {
			header: '本月已完成订单总数',
			dataIndex : 'ordertotalnum',
			width : 140,
			sortable : true
		},{
			header: '本月订单交易总金额',
			dataIndex : 'ordertotalprice',
			width : 140,
			sortable : true
		},
		{
			header: '本月平台提取总金额',
			dataIndex : 'platin',
			width : 140,
			sortable : true
		},
		{
			header : '本月支付总金额',
			dataIndex : 'docin',
			width : 120,
			sortable : true,
			editor:moneyEdit
		}],
		store:Ext.create('Ext.data.Store', {
	    	fields : ['did','phone','name','sex','ordertotalnum','ordertotalprice','platin','docin' ],
	            autoLoad: false,
	            pageSize: 99999
	          
	        }),
//	        selModel:Ext.create('Ext.selection.CheckboxModel', {
// 	            mode: "SIMPLE"
// 	        }),
 	       plugins: [
 	                Ext.create('Ext.grid.plugin.CellEditing', {
 	                    clicksToEdit: 1
 	                })
 	       ]
	    
	        	    
		   
		   });
		  
 	      pay.store.loadRecords(me.records);
 	        me.buttons=[{
 	        	text:'支付',
 	        	handler:function()
 	        	{
 	        	}
 	        },
 	         {
 	        	text:'取消',
 	        	handler:function()
 	        	{
 	        		me.close();
 	        	}}]
	        me.items=[pay,
	         {
	        xtype:'form',
	        height:50,
	        border: false,
	        width:'100%',
	        layout:'column',
	        defaults:{
	        	columnWidth:1
	        },
	        items:[{
	        	xtype:'displayfield',
	        	value:'双击支付金额进行修改'
	        	
	        }]
	        }];
		    me.callParent();
		 
	}
});