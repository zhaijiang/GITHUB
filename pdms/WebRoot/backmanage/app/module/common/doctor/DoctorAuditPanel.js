Ext.define("com.module.common.doctor.DoctorAuditPanel",
				{
					extend : 'Ext.window.Window',
					alias : 'widget.DoctorAuditPanel',
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
								width:300,
								labelWidth:90,
								margin:'5 10 0 10',
								readOnly:true
							
							},
							plugins : [],
							listeners : {
								'render' : function(formpanel) {
								}
							},
							items : [
							         {
							     		xtype : 'textfield',
							     		fieldLabel : '医生姓名',
							     		name : 'name'
							     		
							     	},
					       	       {
					 					xtype : 'textfield',
					 					fieldLabel : '医生电话',
					 					name : 'phone'
					 					
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
					 					xtype : 'textarea',
					 					fieldLabel : '医生备注',
					 					width:650,
					 					readOnly:false,
					 					name : 'remark'
					 					
					 				}
						   ]
						});
                      var photo=Ext.create('Ext.Img',{
							width:150,
							height:150
						 });
                      
                        var doctorinfo=Ext.create('Ext.panel.Panel',{
                        	width : '100%',
							height:151,
                        	layout:'hbox',
                        	items:[formpanel,photo]
                        	
                        });
						 
						 var imgP=Ext.create('Ext.Img',{
							 flex:1
						 });
						 
					
						var picTree = Ext.create('Ext.tree.Panel', {
		                      title :'未审核的资质证书',
		                      width:180,
		                      height:'100%',
		                      border:false,
	                          rootVisible : false,
	                          root : {
			                         text : 'root',
			                    
		                    }
	                             });
					
						     var  picaudit=  Ext.create('Ext.button.Button',{
                  	        	
                	        	  width:100,
                	        	  hidden:true,
                	        	  margin:'150 0 0 10',
                	        	  text:'审核通过',
                	        	  handler:function()
                	        	  {
                                           me.auditct();
                	        	  }
                	          })
	                        	var imgPanel = Ext.create('Ext.panel.Panel', {
	                        	   height:'100%',
	                        	   layout:'hbox',
	                        	   picaudit:picaudit,
	                        	   imgP:imgP,
	                        	    flex:1,
	                        	   items:[
	                        	          imgP,picaudit
	                        	          ]
	                        
	                        	
	                        	});
	                        	
	                        	picTree.on('itemclick', function(view, record) {
	    							
	                        		imgPanel.setTitle(record.data.text);
	                        		imgPanel.picinfo=record.data;
	                        		if(frame.util.isNull(me.doctorpic))
	                        		{
	                        			frame.util.QuickMsg.showMsg2("照片信息加载失败，请刷新 ");
	                        		}
	                        	
	                        		Ext.each(me.doctorpic,function(data)
	                        				{
	                        			          if(data.ctid==record.data.id)
	                        			        	{
	                        			        	
	                        			        	   imgP.setSrc(basePath+data.pic4v);
	                        			        	 }
	                        				});
	                        		imgP.show();
	                        		picaudit.show();
	                        	
	                        	
	                        		
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
                          var cancelBtn = new Ext.Button( {
  							xtype : 'button',
  							text : frame.lang.global._cancel,
  							width:100,
  							handler : function() {
  								me.closeDoctorWnd();
  							}
  						});
                          cfg.buttons=[];
                        var status=me.record.data.status;
                        
                        if(status>=3)
                        {
                        	  me.title="审核资质证书";
                        	var saveBtn = new Ext.Button( {
    							xtype : 'button',
    							text : '保存备注',
    							width:100,
    							handler : function() {
    								var record={
    										did:parseInt(me.record.data.did),
    										remark:me.formpanel.getForm().getValues().remark
    								}
    								me.updateDoctor(record);
    							}
    						});
                        	cfg.buttons.push(saveBtn);
                        }else{
                        me.title="医生审核";
                      	var suBtn = new Ext.Button( {
							xtype : 'button',
							text : '审核通过',
							width:100,
							handler : function() {
								me.auditDoctor(true);
							}
						});
                  
                    	var faBtn = new Ext.Button( {
							xtype : 'button',
							text : '审核不通过',
							width:100,
							handler : function() {
								me.auditDoctor(false);
							}
						});
                    	  cfg.buttons.push(suBtn);
                    	  cfg.buttons.push(faBtn);
                        }
                        cfg.buttons.push(cancelBtn);
					   
						  photo.setSrc(basePath+me.record.data.photo);
						  me.picTree=picTree;
						  me.imgPanel=imgPanel;
						Ext.apply(me, cfg);
						me.formpanel = formpanel;
						me.callParent();
						me.on('render',function()
						{
						   this.loadDoctorInfo();
						});

					},
					/**
					 * 审核资质证书
					 */
					updateDoctor:function(record)
					{
						var me=this;
						if(frame.util.isNull(record))
						{
							
							frame.util.QuickMsg.showMsg2("数据为空");
							return
						}
						Ext.Ajax
						.request( {
							url : basePath + 'BackDoctorController/updateDoctor',
							params : {
								doctor:Ext.encode(record)
							},
							success : function(response, options) {
								var result = Ext
										.decode(response.responseText);
								if (result.success == true) {
									frame.util.QuickMsg
											.operateSuccess(response);
								  
									
								} else {
									frame.util.QuickMsg
											.operateFailure(response);
								}
							},
							failure : function(response, options) {
								frame.util.QuickMsg
										.showMsg(frame.lang.global.netError);
								;
							}
						});
						
					},
					/**
					 * 审核资质证书
					 */
					auditct:function()
					{
						
						var me=this;
						var picinfo=me.imgPanel.picinfo;
						if(frame.util.isNull(picinfo))
						{
							
							frame.util.QuickMsg.showMsg2("请选择一条资质");
							return
						}
						
						var ctids=[];
						ctids.push(picinfo.id);
						var did=me.record.data.did;
						Ext.Ajax
						.request( {
							url : basePath + 'BackDoctorController/auditct',
							params : {
								ctids : Ext.encode(ctids),
								did:did
							},
							success : function(response, options) {
								var result = Ext
										.decode(response.responseText);
								if (result.success == true) {
									frame.util.QuickMsg
											.operateSuccess(response);
								    
									me.imgPanel.picaudit.hide();
									me.imgPanel.imgP.hide();
									me.loadDoctorInfo(1);
									
								} else {
									frame.util.QuickMsg
											.operateFailure(response);
								}
							},
							failure : function(response, options) {
								frame.util.QuickMsg
										.showMsg(frame.lang.global.netError);
								;
							}
						});
						
					},
					/**
					 * 审核资质证书
					 */
					auditDoctor:function(pass)
					{
						
						var me=this;
						if(pass==true&&me.picTree.getRootNode().hasChildNodes())
						{
							
							frame.util.QuickMsg.showMsg2("资质证书没有全部审核通过,无法将该医生至为审核通过状态");
							return
						}
						if(me.formpanel.getForm().getValues().status>=3)
						{
							
							frame.util.QuickMsg.showMsg2("该医生已经审核通过,不能对其再进行审核操作了!");
							return
						}
						var did=me.record.data.did;
						
						var remark= me.formpanel.getForm().getValues().remark;
						Ext.Ajax
						.request( {
							url : basePath + 'BackDoctorController/auditDoctor',
							params : {
								pass : pass,
								remark:remark,
								did:did
							},
							success : function(response, options) {
								var result = Ext
										.decode(response.responseText);
								if (result.success == true) {
									frame.util.QuickMsg
											.operateSuccess(response);
								    
								
									me.loadDoctorInfo();
									
								} else {
									frame.util.QuickMsg
											.operateFailure(response);
								}
							},
							failure : function(response, options) {
								frame.util.QuickMsg
										.showMsg(frame.lang.global.netError);
								;
							}
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
					/**
					 * mode:1 只刷新图片 不刷新医生信息
					 */
				 loadDoctorInfo:function(mode)
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
												var  pics=[];
												Ext.each(me.doctorpic,function(data)
				                        				{
				                        			          if(!frame.util.isNull(data.pic4v)&&data.pic4v!=data.picpath)
				                        			         {
				                        			        	  pics.push({
				                        			        		  id:data.ctid,
				                        			        		  text:data.name
				                        			        	  });  
				                        			         }
				                        			        	
				                        				});
												me.picTree.getRootNode().removeAll();
												if(pics.length!=0)
													{
												me.picTree.getRootNode().appendChild(pics);
													}
												if(1!=mode)
												{
												me.formpanel.getForm().setValues(result.doctorinfo);
												}
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