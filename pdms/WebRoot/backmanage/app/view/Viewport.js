/**
 * 主界面
 * @memberOf {TypeName} 
 */

Ext.define('com.view.Viewport', {
	extend : 'Ext.container.Viewport',
    layout: 'auto',
    autoScroll:true,
	id : 'MainView',
	
	//创建监听，渲染后即启动新告警监听()
	listeners:{
		afterrender: function()
		{
			this.startPushletListen();			
		}
	},
	initComponent : function() {
		this.callParent(arguments);
		var me = this;
		var NorthPanel_10=Ext.create("Ext.container.Container",{
				width:500,
				height:43,
			   	layout:'column',
			   	items:[{
			   	   xtype: 'container',  
                   region: 'center', 
                   border:0,
                   layout: {  
                        type: 'absolute'  
                   }, 
                   width:500,
                   height:30
                   
                 
                   //设置背景图片   
                   //baseCls:'toplogo',
//                   bodyStyle: {  
//                	   background:'url('+ExtMainNorthPicUrl[FrameUserSelectLanguage]+')'
//                	   //backgroundRepeat: 'no-repeat'
//                    },  

			   		}
			   		]
		})

	        var NorthPanel_12=Ext.create(
		   "Ext.container.Container",{
			     flex:1
		   });
	         var NorthPanel_13_1=Ext.create(
		   "Ext.container.Container",{
			    layout:'hbox',
			    //width:280,
			   //width:'100%',
			   	style:'margin : 0px 0px 0px 1px',
				layout:'hbox',
				items : [
									            {
											           value : frame.lang.global.currentUser
																+ ' : '
																+ frame.logonUser.userName,
														xtype : 'displayfield',
														//fieldStyle : 'background : transparent;border:0;background-image:none;',
														border : 0,
														//readOnly : true,
														flex:1
														

													},
													{
														xtype : 'button',
														text:'<font color="black">'+frame.lang.global.logout+'</font>',
														width:90,
														style: {
														       'text-decoration' : 'underline',
																border : 0,
																background:'transparent'
																//color:'black'
																
															},
														width : 100,
														handler : function() {
															Ext.Ajax
																	.request( {
																		url : 'LoginController/logout.do',
																		success : function(
																				response) {
																			var result = Ext
																					.decode(response.responseText);
																			if (result.success == true) {
																		/*		frame.util.QuickMsg
																						.showMsg(
																								"登出操作成功!稍后秒后跳转到登录页面!",
																								null,
																								2000);
																				*/
																				setTimeout(
																						function() {
																							var url = basePath + 'index.jsp';
																							if (FrameUserSelectLanguage != '') {
																								url = url
																										+ "?locale="
																										+ FrameUserSelectLanguage;
																							}
																							window.location.href = url;
																						},
																						1000)
																			} else {
																				frame.util.QuickMsg
																						.operateFailure(response);
																			}
																		},
																		failure : function() {
																			frame.util.QuickMsg
																					.showMsg(frame.lang.global.netError);

																		}
																	});
														}
													} ]
		   });
	        var NorthPanel_13_2=Ext.create(
		    "Ext.container.Container",{
				style:'margin : 0px 10px 0px 0px',
				// width:190,
	            layout:'hbox',
				items:[{
										  value:moment().format('YYYY-MM-DD dddd HH:mm:ss'),
										  xtype : 'displayfield',
										  id:'currentDate',
										 // fieldStyle : ' background  : transparent;border:0;background-image:none;',
										  border : 0
										// readOnly : true,
										
				 }]
		   });
	      window.setInterval(function()
		 {
			
		    Ext.getCmp('currentDate').setValue(moment().format('YYYY-MM-DD dddd HH:mm:ss')) ;
						    	  
		  },1000);
	       var NorthPanel_13=Ext.create(
		   "Ext.container.Container",{
			    layout:'hbox',
			   //width:500,
			   	items:[NorthPanel_13_2,NorthPanel_13_1]
		   });
	        
	       var NorthPanel_1=Ext.create(
		   "Ext.container.Container",{
			     layout: 'hbox',
			     height:30,
			     style: {                    
                      margin: '10px 30px 0px 20px'
                  
                    },  
			     items:[NorthPanel_10,NorthPanel_12,NorthPanel_13]

		   });
	        var NorthPanel_21=Ext.create(
		   "Ext.container.Container",{
			    id :'NorthPanel_21',
			   	width:900,
			   	height:38
			    
		   });
	        var NorthPanel_22=Ext.create(
		   "Ext.container.Container",{
			     flex:2
		   });
	    var searchStore = Ext.create('Ext.data.Store', {
							fields : [ 'code', 'name' ],
							data : [ {
								"code" : "ip",
								"name" : "医生"
							}, {
								"code" : "ip",
								"name" : "患者"
							}, {
								"code" : "deviceAlias",
								"name" : "订单"
							}
							]
						});
	  var	searchCombox=Ext.create('Ext.form.ComboBox', {
							store : searchStore,
							queryMode : 'local',
							displayField : 'name',
							valueField : 'code',
							width : 80,
						 	style:'margin : 0px 0px 0px 12px'


							
						});
	       
	        var NorthPanel_23=Ext.create(
		   "Ext.container.Container",{
			    layout:'hbox',
			   //	width:300,
				items:[searchCombox,
				{
					xtype:'textfield',
					flex:1
					
				},
				{
					xtype : 'button',
					text:'搜索一下',
					width : 70
				}]
		   });
	        
	       var NorthPanel_2=Ext.create(
		   "Ext.container.Container",{
			     layout: 'hbox',
			     height:40,
			     style: {                    
                      margin: '0px 30px 0px 20px'
                  
                    }, 
			     items:[NorthPanel_21,NorthPanel_22,NorthPanel_23]

		   });
		var NorthPanel = Ext.create('Ext.panel.Panel', {
			id : "NorthPanel",
			region : 'north',
			height:75,
			border : 1,
		    layout:'auto',
		    baseCls :'topbg',
			items : [NorthPanel_1,NorthPanel_2]
		});
				var WestPanel = Ext.create('Ext.panel.Panel', {
							id : 'WestPanel',
							region : 'west',
							width : 220,
							height : '75%',
							split: true,
                            collapsible: true,
							autoScroll:true,
                           layout: {
                              type: 'accordion',
				              collapseFirst : true,
				              titleCollapse: true,
				             //true' 表示将会调整展开的子项的高度来填充容器的可用空间. 
				               //'false'则使用子项自身的当前高度, 或无指定高度时使用自动高度.
				              fill : false,
				             //设为'true'时, 表示允许同时显示多个子面板.
				              multi:false,
			                   animate: false
			           },				
			              collapsed:true, //默认收缩
						    resizable:true	

						});
						
					
						var CenterTabPanel = Ext.create('Ext.tab.Panel', {
							border : false,
							region : 'center',
							id : 'CenterTabPanel',
						      plugins :[ Ext.create('Ext.ux.TabCloseMenu', {  
		                            closeTabText : '关闭当前页',  
		                            closeOthersTabsText : '关闭其他页',  
		                            closeAllTabsText : '关闭所有页'  
		                        })],  
						//	设置背景图片   加载其他页有上移情况，先屏蔽
                   		//	baseCls:'centerbg'
//							items:[{
//								title:frame.lang.global.home,
//								baseCls:'centerbg'
//							}]
//							tbar:Ext.create('Ext.toolbar.Toolbar',{
//								items:[
//									'->',
//									{
//										xtype:'button',
//										frame:true,
//										text:'关闭所有',
//										handler:function()
//										{
//										
//										  CenterTabPanel.removeAll();
//										}
//										
//									}
//									]
//							})
						});
						var SouthPanel = Ext.create('Ext.container.Container', {
							id : "SouthPanel",
							region : 'south',
							frame:true,
							layout:'absolute',
							border : false,
							items : [ {
								xtype : 'container',
								html:frame.lang.global.copyright,
								x:'35%',
				              	y:0

							} ]
							
						});
           /** 设置界面宽度 */
			//frame.util.getScreen();
			var screenWidth=screen.width;
			var screenHeight=screen.height;
			var vaiW=document.body.scrollWidth;
			var vaiH=document.body.scrollHeight;
		  //  alert('屏幕宽'+screenWidth+"屏幕高"+screenHeight);
		    if((screenHeight-vaiH)<200)
		     {
		    	// 说明高度为全屏		    	 
		    	 screenHeight=vaiH;
		     }
		     
		     if((screenWidth-vaiW)<50)
		     {
		    	// 说明宽度为全屏		    	 
		    	 screenWidth=vaiW;
		     }
		     // alert('屏幕宽:'+screenWidth+"屏幕高:"+screenHeight);
		     if(screenWidth<1024)
			{
		 
		      
				screenWidth=1024;
			}
			if(screenHeight<450)
			{
				screenHeight=450;
			}
            me.setHeight(screenHeight);
		    me.setWidth(screenWidth);
			var MainPanel = Ext.create('Ext.panel.Panel', {
				layout:'border',
				width:screenWidth-1,
				autoScroll:false,
				height:screenHeight-1,
				items:[
				NorthPanel,
		        WestPanel,
		        CenterTabPanel,
		       SouthPanel]
			
			});
		this.add(MainPanel);

	},
	
	/**
	 * 有新告警，则刷新当前告警页面   和   告警显示按钮
	 */
	startPushletListen:function()
	{
	
		
				
		//当有告警进来时，同样触发统计告警方法		 
		frame.util.Pushlet.listen(frame.config.pushlet.newAlarm,function(event)
		{		
	
		
	 });		
	}
});