Ext.define("com.module.common.user.UserStatisticPanel",{
	extend:'Ext.panel.Panel',
	layout:'vbox',
	border : true,
	autoScroll:true,
	initComponent:function(){
		var me=this;
		var usercount = Ext.create('Ext.grid.Panel', {
        	 title:'用户统计信息',
        	 autoScroll:true,
        	 width:'100%',
			 height:300,
        	store: Ext.create('Ext.data.Store', {
        	    fields : [ 'uid','name','phone','vouchercount','lct'],
			    pageSize : 10,
			    autoLoad : true,
			    sorters: [{
                    property: 'lct',
                    direction: 'asc'
                  }],
                proxy : {
				    type : 'ajax',
				    url : basePath + 'BackUserController/statisticUser',
				    extraParams : {
					//userId : me.record.data.uid
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
		     }),
  
        	columns : [  {
			xtype : 'rownumberer'
			}
        	, {
				header : "用户ID",
				dataIndex : 'uid',
				width : 100
			}, {
				header : "用户姓名",
				dataIndex : 'name',
				width : 100
			},
			{
				header : "用户电话",
				dataIndex : 'phone',
				width : 100
			},
			 {
				header : "使用代金劵总额",
				dataIndex : 'vouchercount',
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
     var  pageSizeCombousercount = Ext.create('Ext.form.ComboBox',{
          store: Ext.create('Ext.data.ArrayStore',{
              fields: ['text', 'value'],
              data: [['5', 5],['10', 10], ['20', 20],['30', 30], ['50', 50],  ['100', 100]]
          }),
          valueField: 'value',
          displayField: 'text',
          value:20,
          width: 70
      });
       pageSizeCombousercount.on("select", function (comboBox) {
		var nowPageSize= parseInt(comboBox.getValue());
		usercountbbar.pageSize =nowPageSize;
         usercount.store.pageSize =nowPageSize;//设置store的pageSize，可以将工具栏与搜索的数据同步。
         usercount.store.loadPage(1);//显示第一页
         
     });
     var usercountbbar= new Ext.PagingToolbar( {
			afterPageText : '/{0}页',
			dock:'bottom',
			beforePageText : '第',
			store : usercount.store,
			inputItemWidth:50,
			displayInfo : true,
			items: ['-', '每页显示',pageSizeCombousercount,'行'],
			displayMsg : '第{0}条 - 第{1}条，共{2}条记录',
			emptyMsg :'没有记录'

		});
		usercount.addDocked(usercountbbar);
		var chart=Ext.create('com.module.common.user.UserStatisticPanel_Chart',{
		 flex:1,
		 width:'100%'
		});
		me.items=[
		usercount
		,chart]
//		me.items=[
//	   {xtype:'panel',
//		title:'p1',
//		height:300,
//		width:'100%'},
//		{xtype:'panel',
//		title:'p2',
//		  flex:1,
//		width:'100%'}
//		];
		me.callParent();
	}
});



Ext.define("com.module.common.user.UserStatisticPanel_Chart",{
	extend:'Ext.panel.Panel',
	layout:'hbox',
	border : true,
	autoScroll:true,
	initComponent:function(){
		var me=this;	
		var addressTree=Ext.create('Ext.tree.Panel',{
	       width:250,
	       height:"100%",
	       rootVisible : true,
	       store: Ext.create('Ext.data.TreeStore', {
		   root : {
			 text : '根地址',
			 id:-1,
			 expanded: true
			
		  }}),
	       listeners:{
	       	itemclick:function(view,record)
	       	{
	       		 me.loadData(record.data.text);
	         	
	       	}
	       }
	    
		});
		var charttitle=Ext.create('Ext.form.field.Display');
		me.charttitle=charttitle;
		var chartpanel=Ext.create('Ext.panel.Panel',{
			flex:1,
	       height:"100%",
	       tbar:Ext.create("Ext.toolbar.Toolbar",{
	    	   items:[charttitle]
	       })
		});
		chartpanel.on('afterrender',function(){
			var alarmChart = new Highcharts.Chart({
				chart : {
					width:600,
					height:340,
					type : 'column',
					renderTo:chartpanel.id
				},
				title: { text: "统计报表" }, 
				xAxis: {
		            categories: [
		               "类型"
		            ]
	            }, 
				yAxis: { 
					min: 0, 
					allowDecimals:false,
					title: { 
						text:'总数'
						} 
					}, 
				tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y} </b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true
	       		 }, 
				plotOptions: { 
					column: { 
						pointWidth: 50,
						dataLabels:{
							enabled:true 
						},
						pointPadding: 0.18, 
						borderWidth: 0 } 
				},
                credits: {   
                	//去掉官网标示
                    enabled: false
                }
			});
			me.alarmChart = alarmChart;	
			var series1 = { 
				name: "用户数量",			
				color:'#990000',
				width:50
			};
		
			
			alarmChart.addSeries(series1);
			
		    me.loadAddressTree();
		});
	    me.items=[addressTree,chartpanel];
	    me.addressTree=addressTree;
	
		me.callParent();
	},
	loadAddressTree:function()
	{
		var me=this;
		Ext.Ajax.request( {
			url : basePath + 'BackUserController/groupUserAddr',
			success : function(response) {
				var result = Ext.decode(response.responseText);
		         var datas=result.returnData;
		         var rootNode = me.addressTree.getRootNode();
		          me.addresssinfo={};
		          if(!frame.util.isNull(datas)&&datas.length!=0)
		          {
				    for(var i=0;i<datas.length;i++)
				    {
				    	
					 var data=datas[i];
					 var node=Ext.data.NodeInterface({
							text: data.addrname,
							leaf:true}
							 );
					 rootNode.appendChild(node);
					 me.addresssinfo[data.addrname]=data.unum;
				   }
				   me.loadData(datas[0].addrname);
		         }


			},
			failure : function(response, options) {
				frame.util.QuickMsg.showMsg(frame.lang.global.netError);

			}
		});
		
	},
	loadData:function( addrname){
		var me = this;
		var chart = me.alarmChart;    //把me.alarmChart赋给charts
		if(addrname=="根地址")
		{
			var total=0;
			for(var key in me.addresssinfo)
			{
				total=total+me.addresssinfo[key];
			}
            me.charttitle.setValue("所有区域");
			chart.series[0].setData(  [total]);
		}
		else{
	        me.charttitle.setValue(addrname);
			chart.series[0].setData(  [me.addresssinfo[addrname]]);
		}

		
		
	}
});