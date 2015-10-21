Ext.define("com.module.common.user.UserStatisticPanel",{
	extend:'Ext.panel.Panel',
	layout:'vbox',
	border : true,
	autoScroll:true,
	initComponent:function(){
		var me=this;
		var usercount = Ext.create('Ext.grid.Panel', {
        	 title:'usercount',
        	 autoScroll:true,
        	 width:'100%',
			 height:300,
        	store: Ext.create('Ext.data.Store', {
        	    fields : [ 'uname','moneycount','lct'],
			    pageSize : 10,
			    autoLoad : false,
			    sorters: [{
                    property: 'lct',
                    direction: 'asc'
                  }],
                proxy : {
				    type : 'ajax',
				    url : 'DBController/loadUser',
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
			}, {
				header : "uname",
				dataIndex : 'uname',
				width : 100
			},
			 {
				header : "moneycount",
				dataIndex : 'moneycount',
				width : 100
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
              data: [['10', 10], ['20', 20],['30', 30], ['50', 50],  ['100', 100]]
          }),
          valueField: 'value',
          displayField: 'text',
          value:20,
          width: 70
      });
       pageSizeCombousercount.on("select", function (comboBox) {
		var nowPageSize= parseInt(comboBox.getValue());
        bbar.pageSize =nowPageSize;
         usercount.store.pageSize =nowPageSize;//设置store的pageSize，可以将工具栏与搜索的数据同步。
         usercount.store.load();
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
		var chart=Ext.create('com.test.test1.test13_chart',{
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



Ext.define("com.test.test1.test13_chart",{
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
			 text : '根区域',
			 expanded: true
			
		  }}),
	       listeners:{
	       	itemclick:function(view,record)
	       	{
	       		 me.loadData(record.data.text);
	         	
	       	}
	       }
	    
		});
		var chartpanel=Ext.create('Ext.panel.Panel',{
			flex:1,
	       height:"100%"
		});
		chartpanel.on('afterrender',function(){
			var alarmChart = new Highcharts.Chart({
				chart : {
					width:1200,
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
				name: "total",			
				color:'#990000'
			};
			var series2 = { 
				name: "pass",		
				color:'#CC6633'
			};
			var series3 = { 
				name: "passing",		
				color:'#FF9900'
			};
			var series4 = { 
			    name: "price",		
				color:'#0066CC'
				 
			};
			var series5 = { 
			    name: "a",		
				color:'#1166CC'
				 
			};
			var series6 = { 
			    name: "b",		
				color:'#2266CC'
				 
			};
			var series7= { 
			    name: "c",		
				color:'#3366CC'
				 
			};
			var series8 = { 
			    name: "d",		
				color:'#4466CC'
				 
			};
			
			alarmChart.addSeries(series1);
			alarmChart.addSeries(series2);
			alarmChart.addSeries(series3);
			alarmChart.addSeries(series4);
			alarmChart.addSeries(series5);
			alarmChart.addSeries(series6);
			alarmChart.addSeries(series7);
			alarmChart.addSeries(series8);	
			me.loadData();
		});
	    me.items=[addressTree,chartpanel];
		me.callParent();
	},
	loadAddressTree:function()
	{
		Ext.Ajax.request( {
			url : basePath + 'PermissionController/getUserAddr',
			success : function(response) {
				var result = Ext.decode(response.responseText);
		         var data=result.returnData;
		         var rootNode = store.getRootNode();
				 for(i in data)
				 {
					 
					 var node=Ext.data.NodeInterface(data[i]);
					 rootNode.appendChild(node);
				 }


			},
			failure : function(response, options) {
				frame.util.QuickMsg.showMsg(frame.lang.global.netError);

			}
		});
		
	},
	loadData:function( addName){
		var me = this;
		var json=[100,20,10,5,15,98,78,99]
		var chart = me.alarmChart;    //把me.alarmChart赋给charts
		
		//给柱状图设值
		chart.series[0].setData([json[0]]);
		chart.series[1].setData([json[1]]);
		chart.series[2].setData([json[2]]);
		chart.series[3].setData([json[3]]);
	    chart.series[4].setData([json[4]]);
		chart.series[5].setData([json[5]]);
		chart.series[6].setData([json[6]]);
		chart.series[7].setData([json[7]]);
	}
});