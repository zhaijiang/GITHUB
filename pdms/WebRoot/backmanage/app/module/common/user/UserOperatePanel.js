
Ext.define("com.module.common.user.UserOperatePanel",{
	extend:'Ext.window.Window',
	title:'User Detail',
	constrain : true,
	border : true,
	modal : true,
	height:600,
	width:1000,
	layout:'vbox',
	buttonAlign : 'center',
	buttons:[{
     text:'取消',
     handler:function()
     {
     	this.ownerCt.ownerCt.close();
     }
	}],
	autoScroll:true,
	initComponent:function(){
		var me=this;
        var address = Ext.create('Ext.grid.Panel', {
        	title:'用户地址',
        	height:'100%',
			width:'100%',
        	store: Ext.create('Ext.data.Store', {
        	fields : [ 'uname','uaid','uid',{name:'index',type:'int'},'range','addr','x','y','lct'],
			pageSize : 10,
			autoLoad : true,
			sorters: [{
                    property: 'index',
                    direction: 'asc'
               }],
            proxy : {
				type : 'ajax',
				url : basePath+'BackUserController/loadUserAddr',
				//SELECT u.name as uname ,ua.* FROM useraddr ua LEFT JOIN  USER u ON  ua.uid=u.uid WHERE ua.uid=?
				extraParams : {
					condition:Ext.encode([{
							fieldName:'t.uid',
							operation:'eq',
							valueType:'Integer',
							value:me.record.data.uid
						}])
						
				
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
				header : "用户名",
				dataIndex : 'uname',
				width : 90
			},
			 {
				header : "地址ID",
				dataIndex : 'uaid',
				hidden:true,
				width : 80
			},
			 {
				header : "用户ID",
				dataIndex : 'uid',
				hidden:true,
				width : 60
			},
			 {
				header : "地址排序",
				dataIndex : 'index',
				width : 80,
				hidden:true
			},
		   {
				header : "地图位置",
				dataIndex : 'range',
				width : 250
			},
			{
				header : "详细地址",
				dataIndex : 'addr',
				width : 200
			},
			{
				header : "经度",
				dataIndex : 'x',
				width : 85
			},
				{
				header : "纬度",
				dataIndex : 'y',
				width : 85
			},
			{
				header : "最后修改记录的时间",
				dataIndex : 'lct',
				width : 160
			}
			]

        });			
		//分页的combobox下拉选择显示条数
     var  pageSizeComboaddress = Ext.create('Ext.form.ComboBox',{
          store: Ext.create('Ext.data.ArrayStore',{
              fields: ['text', 'value'],
              data: [['10', 10], ['20', 20],['30', 30], ['50', 50],  ['100', 100]]
          }),
          valueField: 'value',
          displayField: 'text',
          value:20,
          width: 70
      });
       pageSizeComboaddress.on("select", function (comboBox) {
		var nowPageSize= parseInt(comboBox.getValue());
		addressbbar.pageSize =nowPageSize;
         address.store.pageSize =nowPageSize;//设置store的pageSize，可以将工具栏与搜索的数据同步。
         address.store.loadPage(1);//显示第一页
         
     });
     var addressbbar= new Ext.PagingToolbar( {
			afterPageText : '/{0}页',
			dock:'bottom',
			beforePageText : '第',
			store : address.store,
			inputItemWidth:50,
			displayInfo : true,
			items: ['-', '每页显示',pageSizeComboaddress,'行'],
			displayMsg : '第{0}条 - 第{1}条，共{2}条记录',
			emptyMsg :'没有记录'

		});
		address.addDocked(addressbbar);
		
		var saves = Ext.create('Ext.grid.Panel', {
        	title:'用户收藏',
        	hidden:true,
        	height:'100%',
			width:'100%',
        	store: Ext.create('Ext.data.Store', {
        	fields : [ 'uname','dname','uid',{name:'did',type:'int'},'lct'],
			pageSize : 10,
			autoLoad : false,
			sorters: [{
                    property: 'lct',
                    direction: 'asc'
               }],
            proxy : {
				type : 'ajax',
				url : basePath+'BackUserController/loadUserSave',
		      //SELECT u.name AS uname ,d.name AS dname ,us.* FROM usersave us INNER JOIN  USER u ON  us.uid=u.uid LEFT JOIN  doctor d ON  us.did=d.did  WHERE us.uid=?
				extraParams : {
					condition:Ext.encode([{
							fieldName:'t.uid',
							operation:'eq',
							valueType:'Integer',
							value:me.record.data.uid
						}])
						
				
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
				header : "用户姓名",
				dataIndex : 'uname',
				width : 100
			},
			 {
				header : "医生姓名",
				dataIndex : 'dname',
				width : 100
			},
			 {
				header : "用户ID",
				dataIndex : 'uid',
				width : 80
			},
			 {
				header : "医生ID",
				dataIndex : 'did',
				width : 80
			},
			{
				header : "最后修改记录的时间",
				dataIndex : 'lct',
				width : 160
			}
			]

        });			
		//分页的combobox下拉选择显示条数
     var  pageSizeCombosaves = Ext.create('Ext.form.ComboBox',{
          store: Ext.create('Ext.data.ArrayStore',{
              fields: ['text', 'value'],
              data: [['10', 10], ['20', 20],['30', 30], ['50', 50],  ['100', 100]]
          }),
          valueField: 'value',
          displayField: 'text',
          value:20,
          width: 70
      });
       pageSizeCombosaves.on("select", function (comboBox) {
		var nowPageSize= parseInt(comboBox.getValue());
		savesbbar.pageSize =nowPageSize;
         saves.store.pageSize =nowPageSize;//设置store的pageSize，可以将工具栏与搜索的数据同步。
         saves.store.loadPage(1);//显示第一页
         
     });
     var savesbbar= new Ext.PagingToolbar( {
			afterPageText : '/{0}页',
			dock:'bottom',
			beforePageText : '第',
			store : saves.store,
			inputItemWidth:50,
			displayInfo : true,
			items: ['-', '每页显示',pageSizeCombosaves,'行'],
			displayMsg : '第{0}条 - 第{1}条，共{2}条记录',
			emptyMsg :'没有记录'

		});
		saves.addDocked(savesbbar);
		
		  var money = Ext.create('Ext.grid.Panel', {
        	title:'用户代金劵',
        	hidden:true,
        	height:'100%',
			width:'100%',
        	store: Ext.create('Ext.data.Store', {
        	fields : [ 'uname',{name:'mpid' ,type:'int'},'uid','money','getdate','limitdate','lct'],
			pageSize : 10,
			autoLoad : false,
           sorters: [{
                    property: 'lct',
                    direction: 'asc'
               }],
            proxy : {
				type : 'ajax',
				url : basePath+'BackUserController/loadUserVoucher',
				//SELECT  u.name AS uname,mp.* FROM monypaper mp,USER u WHERE mp.uid=u.uid  AND mp.uid=?
				extraParams : {
					condition:Ext.encode([{
							fieldName:'t.uid',
							operation:'eq',
							valueType:'Integer',
							value:me.record.data.uid
						}])
						
				
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
			},  {
				header : "用户姓名",
				dataIndex : 'uname',
				width : 100
			},
			 {
				header : "代金劵ID",
				dataIndex : 'mpid',
				width : 70
			},
			 {
				header : "用户ID",
				dataIndex : 'uid',
				hidden:true,
				width : 70
			},
			 {
				header : "代金券金额",
				dataIndex : 'money',
				width : 85
			},
			{
				header : "获取时间",
				dataIndex : 'getdate',
				width : 150
			},
			{
				header : "过期时间",
				dataIndex : 'limitdate',
				width : 150
			},
			{
				header : "最后修改记录的时间",
				dataIndex : 'lct',
				width : 160
			}
			]

        });			
		//分页的combobox下拉选择显示条数
     var  pageSizeCombomoney = Ext.create('Ext.form.ComboBox',{
          store: Ext.create('Ext.data.ArrayStore',{
              fields: ['text', 'value'],
              data: [['10', 10], ['20', 20],['30', 30], ['50', 50],  ['100', 100]]
          }),
          valueField: 'value',
          displayField: 'text',
          value:20,
          width: 70
      });
       pageSizeCombomoney.on("select", function (comboBox) {
		var nowPageSize= parseInt(comboBox.getValue());
		moneybbar.pageSize =nowPageSize;
         money.store.pageSize =nowPageSize;//设置store的pageSize，可以将工具栏与搜索的数据同步。
         money.store.loadPage(1);//显示第一页
         
     });
     var moneybbar= new Ext.PagingToolbar( {
			afterPageText : '/{0}页',
			dock:'bottom',
			beforePageText : '第',
			store : money.store,
			inputItemWidth:50,
			displayInfo : true,
			items: ['-', '每页显示',pageSizeCombomoney,'行'],
			displayMsg : '第{0}条 - 第{1}条，共{2}条记录',
			emptyMsg :'没有记录'

		});
		money.addDocked(moneybbar);
		
		 var unMoney = Ext.create('Ext.grid.Panel', {
        	title:'无效代金券',
        	hidden:true,
        	hidden:true,
        	height:'100%',
			width:'100%',
        	store: Ext.create('Ext.data.Store', {
        	fields :  [ 'uname',{name:'mpid' ,type:'int'},'uid','money','getdate','limitdate','status','lct'],
			pageSize : 10,
			autoLoad : false,
			sorters: [{
                    property: 'mpid',
                    direction: 'asc'
             }],
            proxy : {
				type : 'ajax',
				url : basePath+'BackUserController/loadUserUnVoucher',
				//SELECT  u.name AS uname,mp.* FROM mpashcan mp,USER u WHERE mp.uid=u.uid  AND mp.uid=?
				extraParams : {
					condition:Ext.encode([{
							fieldName:'t.uid',
							operation:'eq',
							valueType:'Integer',
							value:me.record.data.uid
						}])
						
				
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
			},  {
				header : "用户姓名",
				dataIndex : 'uname',
				width : 100
			},
			 {
				header : "代金券ID",
				dataIndex : 'mpid',
				width : 80
			},
			 {
				header : "用户ID",
				dataIndex : 'uid',
				hidden:true,
				width : 70
			},
			 {
				header : "代金券金额",
				dataIndex : 'money',
				width : 85
			},
			{
				header : "代金券状态",
				dataIndex : 'status',
				width : 85,
				renderer:function(value)
				{
					if(value==0)
					{
						return '已使用';
					}else{
						return '已过期';
					}
					
				}
			},
			{
				header : "获取时间",
				dataIndex : 'getdate',
				width : 150
			},
			{
				header : "过期时间",
				dataIndex : 'limitdate',
				width : 150
			},
			{
				header : "最后修改记录的时间",
				dataIndex : 'lct',
				width : 160
			}
			]

        });			
		//分页的combobox下拉选择显示条数
     var  pageSizeCombounMoney = Ext.create('Ext.form.ComboBox',{
          store: Ext.create('Ext.data.ArrayStore',{
              fields: ['text', 'value'],
              data: [['10', 10], ['20', 20],['30', 30], ['50', 50],  ['100', 100]]
          }),
          valueField: 'value',
          displayField: 'text',
          value:20,
          width: 70
      });
       pageSizeCombounMoney.on("select", function (comboBox) {
		var nowPageSize= parseInt(comboBox.getValue());
		 unMoneybbar.pageSize =nowPageSize;
         unMoney.store.pageSize =nowPageSize;//设置store的pageSize，可以将工具栏与搜索的数据同步。
         unMoney.store.loadPage(1);//显示第一页
         
     });
     var unMoneybbar= new Ext.PagingToolbar( {
			afterPageText : '/{0}页',
			dock:'bottom',
			beforePageText : '第',
			store : unMoney.store,
			inputItemWidth:50,
			displayInfo : true,
			items: ['-', '每页显示',pageSizeCombounMoney,'行'],
			displayMsg : '第{0}条 - 第{1}条，共{2}条记录',
			emptyMsg :'没有记录'

		});
		unMoney.addDocked(unMoneybbar);
		var usertable={
		 'address':address,
		 'saves':saves,
		 'money':money,
		 'unMoney':unMoney
		
		}
		
	   var detailtable=Ext.create('Ext.panel.Panel',{
	   	  flex:1,
	   	  height:"100%",
	      layout:'fit',
	      items:[address,saves,money,unMoney]
	      
		    	
		  });
	    var detailInfo=Ext.create('Ext.panel.Panel',{
	    layout:'hbox',
	    flex:1,
	    width:'100%',
	    items:[{
	       xtype:'treepanel',
	       width:170,
	       height:"100%",
	       rootVisible : false,
	       store: Ext.create('Ext.data.TreeStore', {
		   root : {
			text : 'root',
			 expanded: true,
			children:[{
			  id:'address',
			  text:'用户地址',
			  leaf:true
			},{
			  id:'saves',
			  text:'用户收藏',
			  leaf:true
			},{
			  id:'money',
			  text:'用户代金卷',
			  leaf:true
			},
			{
			  id:'unMoney',
			  text:'无效代金卷',
			  leaf:true
			}]
		  }}),
	       listeners:{
	       	itemclick:function(view,record)
	       	{
	       		var id=record.data.id;
	       		for(key in usertable)
	       		{
	       			usertable[key].hide();
	       		}
	         	usertable[id].show();
	         	usertable[id].store.load();
	         	
	       	}
	       }
	    },detailtable]
	    
	    })
	    var formpanel=Ext.create('Ext.form.Panel',{
	         flex:1,
	         height:'100%',
	        layout:'column',
	        defaults:{
	    	  width:250,
	       	  labelWidth:110,
	       	  margin:'10 0 0 10'
	        },
	        items:[{
					xtype : 'textfield',
					fieldLabel : '用户ID',
					name : 'uid'
					
				},
    	      {
					xtype : 'textfield',
					fieldLabel : '用户电话',
					name : 'phone'
					
				},
				{
					xtype : 'textfield',
					fieldLabel : '用户姓名',
					name : 'name'
					
				},
				{
					xtype : 'datetimefield',
					fieldLabel : '出生年月',
					name : 'born'
					
				},
				
 				{
 					xtype : 'combo',
 					fieldLabel : '用户性别',
 					displayField:'name',
 					valueField:'value',
 					name : 'sex',
 					store:Ext.create('Ext.data.ArrayStore',{
 						fields:['name','value'],
 						data:[['女',0],['男',1],['未知',2]]
 					})
 					
 				},
				{
					xtype : 'textfield',
					fieldLabel : '身份证号',
					name : 'indo'
					
				},
				{
					xtype : 'textfield',
					fieldLabel : 'uaid',
					hidden:true,
					name : 'uaid'
					
				},
				{
					xtype : 'textfield',
					fieldLabel : '地图位置',
					name : 'range'
					
				},
				{
					xtype : 'textfield',
					fieldLabel : '详细地址',
					name : 'addr'
					
				},
				{
					xtype : 'datetimefield',
					fieldLabel : '注册时间',
					name : 'regtime'	
				},
				{
					xtype : 'datetimefield',
					fieldLabel : '最后登录时间',
					name : 'lastlogintime'
					
				},
				{
					xtype : 'textfield',
					fieldLabel : '鉴权串',
					name : 'token'
					
				},
				{
					xtype : 'datetimefield',
					fieldLabel : '最后修改记录时间',
					name : 'lct'
					
				}
				]
	    });
	    var userpic=Ext.create('Ext.Img',{
	    	 height:150,
	         width:150,
	         src:basePath+'user/user_default_pic.png'
	    
	    });
	   // formpanel.getForm().loadRecord(me.record);
		var formItems = Ext.ComponentQuery
		.query('#' + formpanel.id + ' component');
Ext.each(formItems, function(item) {
	item.readOnly = true;
});
	    me.items=[
	    {
	    xtype:'panel',
	    height:160,
	    width:'100%',
	    layout:'hbox',
	    items:[formpanel,userpic]
       },detailInfo
	    ];
	    if(!frame.util.isNull(me.record.data.pic))
	    {
	    	userpic.setSrc(me.record.data.pic);
	    }
	    me.formpanel=formpanel;
	    me.callParent();
	    me.on('render',function(){
	    	
	    	me.loadUser();
	    	
	    })
	    

	},
	loadUser:function()
	{
		var me=this;

	
	
		Ext.Ajax.request( {
			url :  basePath + 'BackUserController/loadUserInfo',
            params:{
            	data:me.record.data.uid
            },
			success : function(response) {
				var result = Ext.decode(response.responseText);
		         var data=result.returnData;
		         if(!frame.util.isNull(data))
		         {
		        	 me.formpanel.getForm().setValues(data);
		        }


			},
			failure : function(response, options) {
				frame.util.QuickMsg.showMsg(frame.lang.global.netError);

			}
		});
	}
	
});