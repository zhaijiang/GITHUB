Ext.define("com.module.common.doctor.DoctorOperatePanel",
				{
					extend : 'Ext.window.Window',
					alias : 'widget.DoctorOperatePanel',
					width : 1000,
					constrain : true,
					modal : true,
					height : 600,
					layout : 'vbox',
					border : false,
					buttonAlign : 'center',
					initComponent : function() {
						var me = this;

						var formpanel = Ext.create("Ext.form.FormPanel", {
							border : false,
							flex:1,
							layout : 'column',
							defaults : {
								xtype : 'textfield',
								hideTrigger:true,
								width:240,
								labelWidth:90,
								margin:'5 10 0 10'
							},
							plugins : [],
							listeners : {
								'render' : function(formpanel) {
								}
							},
							items : [
					                 {
					 					xtype : 'textfield',
					 					fieldLabel : '医生ID',
					 					name : 'did'
					 					
					 				},
					       	       {
					 					xtype : 'textfield',
					 					fieldLabel : '医生电话',
					 					name : 'phone'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '医生姓名',
					 					name : 'name'
					 					
					 				},
					 				{
					 					xtype : 'datetimefield',
					 					fieldLabel : '出生年月',
					 					name : 'born'
					 					
					 				},
					 				{
					 					xtype : 'combo',
					 					fieldLabel : '医生性别',
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
					 					fieldLabel : '坐诊位置',
					 					name : 'addr'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '医生等级',
					 					name : 'level'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '医生价格',
					 					name : 'price'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '上门速度',
					 					name : 'espeed'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '医生态度',
					 					name : 'eattitude'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '问诊记录评分',
					 					name : 'erecord'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '疗效评分',
					 					name : 'eefect'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '后续支持力',
					 					name : 'esupport'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '医生积分',
					 					name : 'score'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '自我介绍',
					 					name : 'intro'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '出诊次数',
					 					name : 'times'
					 					
					 				},
					 				{
					 					xtype : 'combo',
					 					fieldLabel : '医生状态',
					 					displayField:'name',
					 					valueField:'value',
					 					name : 'status',
					 					store:Ext.create('Ext.data.ArrayStore',{
					 						fields:['name','value'],
					 						data:[['已注册，尚未提交审核信息',0],['已提交审核信息，待审核',1],['审核未通过',2],['审核通过，未完善出诊信息',3],['可出诊',4]
					 						,['等待出诊订单',5],['出诊中',6],['已冻结',7]]
					 					})
					 					
					 				},
					 				
					 				{
					 					xtype : 'datetimefield',
					 					fieldLabel : '注册时间',
					 					name : 'regtime'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '收款账户',
					 					name : 'account'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '身份证号',
					 					name : 'idno'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '上门范围',
					 					name : 'scvrange'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '资格等级',
					 					name : 'ctflvl'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '资格类型',
					 					name : 'ctftype'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '服务机构',
					 					name : 'org'
					 					
					 				},
					 				{
					 					xtype : 'datetimefield',
					 					fieldLabel : '保单开始日期',
					 					name : 'insbegin'
					 					
					 				},
					 				{
					 					xtype : 'datetimefield',
					 					fieldLabel : '保单结束日期',
					 					name : 'insend'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '职称等级',
					 					name : 'ptlvl'
					 					
					 				},
					 				{
					 					xtype : 'datetimefield',
					 					fieldLabel : '最后登录时间',
					 					name : 'lastlogintime'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '医生备注',
					 					name : 'remark'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '医生鉴权',
					 					name : 'token'
					 					
					 				},
					 				{
					 					xtype : 'datetimefield',
					 					fieldLabel : '最后修改时间',
					 					name : 'lct'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '坐诊经度',
					 					name : 'x'
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '坐诊纬度',
					 					name : 'y'
					 					
					 				}
						   ]
						});
                      var photo=Ext.create('Ext.Img',{
							width:150,
							height:150
						 });
                      
                        var doctorinfo=Ext.create('Ext.panel.Panel',{
                        	width : '100%',
							height:330,
                        	layout:'hbox',
                        	items:[formpanel,photo]
                        	
                        });
						 
						 var imgP=Ext.create('Ext.Img',{
							 
						 });
						 
					
						var picTree = Ext.create('Ext.tree.Panel', {
		                     title :'资质证书',
		                      width:180,
		                      height:'100%',
		                      border:false,
	                        	 rootVisible : false,
	                          root : {
			                         text : 'root',
			                         children:[
			                         {
			                          id:1,
			                          text:'身份证'
			                         },
			                          {
			                          id:2,
			                          text:'医师资格证'
			                         },
			                          {
			                          id:3,
			                          text:'医师执业证'
			                         },{
			                          id:4,
			                          text:'医生职称证'
			                         },
			                          {
			                          id:5,
			                          text:'所服务医疗机构证明'
			                         },
			                           {
			                          id:6,
			                          text:'医疗事故险购买证明'
			                         }
			                      ]
		                    }
	                             });
					
						
	                        	var imgPanel = Ext.create('Ext.panel.Panel', {
	                        	   height:'100%',
	                        	   layout:'fit',
	                        	   width:'100%',
	                        	   items:[
	                        	          imgP
	                        	          ]
	                        
	                        	
	                        	});
	                        	
	                        	picTree.on('itemclick', function(view, record) {
	    							
	                        		imgPanel.setTitle(record.data.text);
	                        		if(frame.util.isNull(me.doctorpic))
	                        		{
	                        			frame.util.QuickMsg.showMsg2("照片信息加载失败，请刷新 ");
	                        		}
	                        	
	                        		Ext.each(me.doctorpic,function(data)
	                        				{
	                        			          if(data.ctid==record.data.id)
	                        			        	{
	                        			        	
	                        			        	   imgP.setSrc(basePath+data.picpath);
	                        			        	 }
	                        				})
	                        	
	                        		
	    						}
	    						);
                          var picPanel=Ext.create('Ext.panel.Panel',
                          {
                           width : '100%',
                           layout:'hbox',
                          flex:1,
                            items:[
                            picTree,imgPanel
                            ]
                          })
						var cfg = {
							items : [ doctorinfo ,picPanel]
						};
						var _cancelBtn = new Ext.Button( {
							xtype : 'button',
							text : frame.lang.global._cancel,
							width:100,
							//iconCls : 'close',
							handler : function() {
								me.closeDoctorWnd();
							}
						});
						if (me.showMode == 'save') {
							cfg.buttons = [ {
								xtype : 'button',
								text : frame.lang.global._save,
								width:100,
								//iconCls : 'save',
								handler : function() {
									me.saveRecord();

								}
							}, _cancelBtn ];
						} else if (me.showMode == 'copy') {
							cfg.buttons = [ {
								xtype : 'button',
								text : frame.lang.global._copy,
									width:100,
								//iconCls : 'save',
								handler : function() {
									me.saveRecord();

								}
							}, _cancelBtn ];
							formpanel.getForm().loadRecord(me.record);
						} else if (me.showMode == 'modify') {
							cfg.buttons = [ {
								xtype : 'button',
								text : frame.lang.global._modify,
									width:100,
								//iconCls : 'save',

								handler : function() {
									me.modifyRecord();

								}
							}, _cancelBtn ];
							formpanel.getForm().loadRecord(me.record);
						} else {
							cfg.buttons = [ _cancelBtn ];
							formpanel.getForm().loadRecord(me.record);
							var formItems = Ext.ComponentQuery
									.query('#' + formpanel.id + ' component');
							Ext.each(formItems, function(item) {
								item.readOnly = true;
							});
						}
						  photo.setSrc(basePath+me.record.data.photo);
						Ext.apply(me, cfg);
						me.formpanel = formpanel;
						me.callParent();
						me.on('render',function()
						{
						   this.loadDoctorInfo();
						});

					},
					//判断是否关闭WINDOW
					processCloseWnd : function(btnCode) {
						var me = this;
						if (btnCode == "yes" || btnCode == "ok") {
							me.close();
						}
					},
					//关闭WINDOW
					closeDoctorWnd : function() {
						var me = this;
						me.close();

					},
				 loadDoctorInfo:function()
					{
					var me=this;
								Ext.Ajax
									.request( {
										url : basePath + 'BackDoctorController/loadDoctorInfo',
										params : {
											data : me.record.data.did
										},
										success : function(response, options) {
											var result = Ext
													.decode(response.responseText);
											if (result.success == true) {
												//frame.util.QuickMsg
														//.operateSuccess(response);
												
												me.doctorpic=result.doctorpic;
												me.formpanel.getForm().setValues(result.doctorinfo);
											} else {
												//frame.util.QuickMsg
														//.operateFailure(response);
											}
										},
										failure : function(response, options) {
											frame.util.QuickMsg
													.showMsg(frame.lang.global.netError);
											;
										}
									});
					
					}

		});