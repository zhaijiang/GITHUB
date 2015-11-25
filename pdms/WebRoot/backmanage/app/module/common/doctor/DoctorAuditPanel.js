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
						var fieldReadOnly=true;
						if(me.frameMode==0)
						{
							fieldReadOnly=false;
						}
                    var ctflvlcombo=Ext.create('Ext.form.ComboBox',{
	 	                
	 	                   allowBlank: true,
	 	                   displayField:'name',
			               valueField:'id',
			           	width:350,
						labelWidth:90,
			               queryMode:'local',
			               fieldLabel : "资格等级",
			               name:'ctflvl',
			              
			               store:Ext.create('Ext.data.Store',{
				             model: 'NameIdModel'
			              })});
			           
			               var ctftypecombo=Ext.create('Ext.form.ComboBox',{
	 	                
	 	                   allowBlank: true,
	 	                   displayField:'name',
			               valueField:'id',
			               queryMode:'local',
			               fieldLabel : "资格类型",
			               name:'ctftype',
			           	width:350,
						labelWidth:90,
			               store:Ext.create('Ext.data.Store',{
				             model: 'NameIdModel'
			              })});
			              
			              var ptlvlcombo=Ext.create('Ext.form.ComboBox',{
	 	                
	 	                   allowBlank: true,
	 	                   displayField:'name',
			               valueField:'id',
			               queryMode:'local',
			               fieldLabel : "职称等级",
			               name:'ptlvl',
			           	width:350,
						labelWidth:90,
			               store:Ext.create('Ext.data.Store',{
				             model: 'NameIdModel'
			              })});
			              var orgcombo=Ext.create('Ext.form.ComboBox',{
			 	                
		 	                   allowBlank: true,
		 	                   displayField:'name',
				               valueField:'id',
				               queryMode:'local',
				               fieldLabel : "医疗机构",
				               name:'org',
				           	width:350,
							labelWidth:90,
				               store:Ext.create('Ext.data.Store',{
					             model: 'NameIdModel'
				              })});
			              
			              var insbegin=Ext.create('Frame.form.datetime.DateTime',{
			 	                
			            		width:350,
								labelWidth:150,
				               fieldLabel : "医疗事故险生效起始时间",
				               name:'insbegin'
				          });
			              
			              var insend=Ext.create('Frame.form.datetime.DateTime',{
			 	                
			            	  width:350,
								labelWidth:150,
				               fieldLabel : "医疗事故险生效结束时间",
				               name:'insend'
				          });
						var formpanel = Ext.create("Ext.form.FormPanel", {
							border : false,
							flex:1,
							layout : 'column',
							defaults : {
								xtype : 'textfield',
								hideTrigger:true,
								width:350,
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
							     		name : 'name',
							     		readOnly:fieldReadOnly
							     		
							     	},
					       	       {
					 					xtype : 'textfield',
					 					fieldLabel : '医生电话',
					 					name : 'phone'
					 					
					 				},
					 		       {
					 					xtype : 'datetimefield',
					 					fieldLabel : '出生年月日',
					 					name : 'born',
							     		readOnly:fieldReadOnly
					 					
					 				},
					 				{
					 					xtype : 'textfield',
					 					fieldLabel : '身份证号',
					 					name : 'idno',
							     		readOnly:fieldReadOnly
					 					
					 				},
					 				
					 				{
					 					xtype : 'combobox',
					 					fieldLabel : '医生性别',
					 					displayField:'name',
					 					valueField:'value',
					 					hideTrigger:false,
					 					name : 'sex',
					 					 queryMode: 'local',
							     		 readOnly:fieldReadOnly,
					 					  store: Ext.create('Ext.data.Store',{
					 						fields:['name','value'],
					 						 data:[
					 						       {"name":"女", "value":0},
					 						      {"name":"男", "value":1},
					 						     {"name":"未知", "value":2}
					 						       ]
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
					 				ctflvlcombo,
					 				ctftypecombo,
					 				ptlvlcombo,
					 				orgcombo,
					 				insbegin,
					 				insend,
					 				{
					 					xtype : 'textarea',
					 					fieldLabel : '医生备注',
					 					width:650,
					 					height:60,
					 					readOnly:false,
					 					name : 'remark'
					 					
					 				}
						   ]
						});
						me.ctflvlcombo=ctflvlcombo;
						me.ctftypecombo=ctftypecombo;
						me.ptlvlcombo=ptlvlcombo;
						me.orgcombo=orgcombo;
                      var photo=Ext.create('Ext.Img',{
							width:150,
							height:150
						 });
                      
                        var doctorinfo=Ext.create('Ext.panel.Panel',{
                        	width : '100%',
							height:250,
                        	layout:'hbox',
                        	items:[formpanel,photo]
                        	
                        });
						 
						 var imgP=Ext.create('Ext.Img',{
							 autoScroll:true,
							 flex:1
						 });
						 
					
						var picTree = Ext.create('Ext.tree.Panel', {
		                      title :'未审核的资质证书',
		                      width:210,
		                      height:'100%',
		                      border:false,
	                          rootVisible : false,
	                          root : {
			                         text : 'root'
			                    
		                    }
	                             });
					
						     var  picaudit=  Ext.create('Ext.button.Button',{
                  	        	
                	        	  width:100,
                	        	  hidden:true,
                	        	  margin:'100 0 0 10',
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
	                        		if(record.data.text.indexOf('已审核')==-1)
	                        			{
	                        		      picaudit.show();
	                        			}
	                        		else{
	                        			picaudit.hide();
	                        		}
	                        	
	                        	
	                        		
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
                        
                        var saveBtn = new Ext.Button( {
							xtype : 'button',
							text : '保存修改',
							width:100,
							handler : function() {
								var values=me.formpanel.getForm().getValues();
								var record={
										did:parseInt(me.record.data.did),
										ctftype:values.ctftype,
										ctflvl:values.ctflvl,
										ptlvl:values.ptlvl,
										org:values.org,
										insbegin:values.insbegin,
										insend:values.insend,
										remark:values.remark,
										
								}
								if(me.frameMode==0)
								{
									record.name=values.name;
									record.born=values.born;
									record.sex=values.sex;
									record.idno=values.idno;
								}
								me.updateDoctor(record);
							}
						});
                    	cfg.buttons.push(saveBtn);
                        if(me.frameMode===1)
                        {
                        	  me.title="审核资质证书";
                        	
                        }else{
                        me.title="医生审核";
                      	var suBtn = new Ext.Button( {
							xtype : 'button',
							text : '审核通过',
							width:100,
							handler : function() {
							
								var values=me.formpanel.getForm().getValues();
								var record={
										did:parseInt(me.record.data.did),
										ctftype:values.ctftype,
										ctflvl:values.ctflvl,
										ptlvl:values.ptlvl,
										org:values.org,
										insbegin:values.insbegin,
										insend:values.insend,
										remark:values.remark,
										name:values.name,
										born:values.born,
										sex:values.sex,
										idno:values.idno
									  
										
								}
								me.updateDoctor(record,true);
										
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
						   me.loadDoctorInfo(2);
						});

					},
					/**
					 * 审核资质证书
					 */
					updateDoctor:function(record,auto)
					{
						var me=this;
						if(frame.util.isNull(record))
						{
							
							if(!auto)
							{
							frame.util.QuickMsg.showMsg2("数据为空");
							}
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
									if(!auto)
									{
									frame.util.QuickMsg
											.operateSuccess(response);
									}
								  
									
								} else {
									if(!auto)
									{
									frame.util.QuickMsg
											.operateFailure(response);
									}
								}
							},
							failure : function(response, options) {
								if(!auto)
								{
								frame.util.QuickMsg
										.showMsg(frame.lang.global.netError);
								}
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
						if(pass==true)
						{
							var rootNode=me.picTree.getRootNode();
							var allaudit=true;
							rootNode.eachChild(function(child){
								
								if(child.data.text.indexOf('已审核')==-1)
									{
									allaudit=false;
									return false;
									}
								
							})
							if(!allaudit)
								{
							frame.util.QuickMsg.showMsg2("资质证书没有全部审核通过,无法将该医生至为审核通过状态");
							return
								}
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
					 * mode:1 只刷新图片 不刷新医生信息 2:初始化combo
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
												
												if(mode==2)
												{
												var combos=result.combos;
												var	ctflvl=combos.ctflvl;
												var	ctftype=combos.ctftype;
												var	ptlvl=combos.ptlvl;
												var	org=combos.org;
													
												if(!frame.util.isNull(ctflvl))
												{
													var comboss=[{id:0,name:"未知"}];
													for(key in ctflvl)
													{
														  var combo = Ext.create('NameIdModel', {
								                                name : ctflvl[key],
								                                id  : key
								  
								                            } );
														  comboss.push(combo);
														
													}
													me.ctflvlcombo.getStore().loadData(comboss);
														
												}
												if(!frame.util.isNull(ctftype))
												{
													var comboss=[{id:0,name:"未知"}];
													for(key in ctftype)
													{
														  var combo = Ext.create('NameIdModel', {
								                                name : ctftype[key],
								                                id  : key
								  
								                            } );
														  comboss.push(combo);
														
													}
													me.ctftypecombo.getStore().loadData(comboss);
														
												}
												
												if(!frame.util.isNull(ptlvl))
												{
													var comboss=[{id:0,name:"未知"}];
													for(key in ptlvl)
													{
														  var combo = Ext.create('NameIdModel', {
								                                name : ptlvl[key],
								                                id  : key
								  
								                            } );
														  comboss.push(combo);
														
													}
													me.ptlvlcombo.getStore().loadData(comboss);
														
												}
												
												
												if(!frame.util.isNull(org))
												{
													var comboss=[{id:0,name:"未知"}];
													for(key in org)
													{
														  var combo = Ext.create('NameIdModel', {
								                                name : org[key],
								                                id  : key
								  
								                            } );
														  comboss.push(combo);
														
													}
													me.orgcombo.getStore().loadData(comboss);
														
												}
												
												}
												
												me.doctorpic=result.doctorpic;
												var  pics=[];
												Ext.each(me.doctorpic,function(data)
				                        				{
				                        			         // if(!frame.util.isNull(data.pic4v)&&data.pic4v!=data.picpath)
													          var text=data.name;
													            if(data.status==2)
				                        			         {
				                        			        	 text=text+"(已审核)";
				                        			         }
													          pics.push({
				                        			        		  id:data.ctid,
				                        			        		  text:text,
				                        			        		  status:data.status
				                        			         }); 
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