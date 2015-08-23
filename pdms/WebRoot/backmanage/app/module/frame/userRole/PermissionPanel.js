Ext.define('com.module.frame.userRole.PermissionPanel_Data_Tree', {
	extend : 'Ext.tree.Panel',
	rootVisible : false,
	title : frame.lang.frame.userRole.dataPermission,
	animate : false,
	root : {
		text : frame.lang.frame.userRole.dataPermission,
		id : '-2',
		expanded : true
	},
	initComponent : function() {
		var me = this
		var store = Ext.create('Ext.data.TreeStore', {
			autoLoad : true,
			fields : [ {
				name : 'id',
				mapping : 'permissionCode'
			}, {
				name : 'text',
				mapping : 'permissionName'
			}, 'permissionCode', 'permissionName', {
				name : 'checked',
				defaultValue : false
			} ],
			nodeParam : 'data',
			proxy : {
				type : 'ajax',
				url : basePath + 'PermissionController/getChildren.do',
				reader : {
					type : 'json',
					root : 'returnData'
				}
			},

			listeners : {
				'beforeexpand' : function(node, eOpts) {
				}
			}
		});
		me.store = store;
		me.on('afteritemexpand', function(node) {
			if (!node.hasChildNodes()) {
				node.set('leaf', true);
			} else {
				if (node.get('checked')) {
					me.setChildNode(node, true)
				}
				if (node.deep == null) {
					node
							.eachChild(function(child) {
								me.expandNode(child, node.deep == null ? 1
										: node.deep);
							});
				}
				if (node.deep == 0) {
					node.deep = null;
					//node.collapse();

			}
		}

	}	);
		me.on('afterrender', function() {
			me.expandAll();
		});
		me.on('checkchange', function(node, checked) {
			if(node.data.readOnly==true)
			{
				if(checked!=node.data.oldchecked)
				{
					node.set('checked', node.data.oldchecked);
				}
				return;
			}
			
			if (checked) {
				node.expand();
				me.setChildNode(node, true)
			}
			me.setParentNode(node, checked); //进行父级选中操作

			});
		me.on('itemclick', function(treeview,record) {
		  record.data.oldchecked=record.data.checked;
				

		});
	
		me.callParent();

	},
	//搜索当前节点的所有子节点，如果有一个子节点未选中 则返回false
	checkCurrentNodeChild : function(node) {
		var me = this;
		var bnode = true;
		Ext.Array.each(node.childNodes, function(v) {
			if (!v.data.checked) {
				bnode = false;
				return;
			}
		});
		return bnode;
	},
	/** 逐级向上遍历，修改上级节点选中状态 */
	setParentNode : function(node, checked) {
		var me = this;
		var parentNode = node.parentNode;
		if (parentNode == null) {
			return;
		}
		if (me.checkCurrentNodeChild(parentNode)) {
			parentNode.set('checked', true);
		} else {
			parentNode.set('checked', false);
		}
		me.setParentNode(parentNode);

	},

	setChildNode : function(node, checked) {
		var me = this;
		var childNodes = node.childNodes;
		if (childNodes == null || childNodes.length == 0) {
			return;
		}
		for ( var i = 0; i < childNodes.length; i++) {
			var node = childNodes[i];
			node.set('checked', checked);
		}
	},
	//只展开node这一次 ，node的子节点不展开
	expandNode : function(node, deep) {
		if (deep > 0) {
			deep--;
			node.deep = deep;
			if (node.isLoading() || node.isExpanded() || node.isLoaded()) {
				return;
			}
			node.expand();

		}
	},

	getAllNode : function() {
		var me = this;
		var node = me.getRootNode();
		var nodes = [];
		var getChildNode = function(node) {

			if (!node.hasChildNodes()) {
				return;
			} else {
				node.eachChild(function(child) {
					nodes.push(child);
					getChildNode(child);
				});
			}

		};
		getChildNode(node);
		return nodes;

	}
});
/**
 * 界面权限 树  同步
 * @memberOf {TypeName} 
 */
Ext.define('com.module.frame.userRole.PermissionPanel_UiSync_Tree', {
	extend : 'Ext.tree.Panel',
	rootVisible : false,//是否显示根目录     ,
	animate : false,
	title : frame.lang.frame.userRole.uiPermission,

	initComponent : function() {
	  console.debug(Ext.getCmp('NorthPanel'));
		var me = this;
	
			var _tbar = new Ext.Toolbar( {
			items : [ 
			{
				xtype : 'button',
				frameMark:'uiPermissionButtonReadOly',
				text : frame.lang.global.readOnly,
					width:80,
				handler : function() {
					Ext.each(me.getAllNode(),function(node)
						{
						    if(node.id.toString().endWith("_BW"))
						    {
						    	node.set('checked',false);
						    }
						    else{
						    	node.set('checked',true);
						    }
						});
				}
			}, {
				xtype : 'button',
				text : frame.lang.global.selectAll,
				frameMark:'uiPermissionButtonSelectAll',
					width:80,
				handler : function() {
						Ext.each(me.getAllNode(),function(node)
						{
						    
						    	node.set('checked',true);
						 
						});
				}
			}, {
				xtype : 'button',
				text : frame.lang.global.selectNull,
				frameMark:'uiPermissionButtonSelectNull',
					width:80,
				handler : function() {
						Ext.each(me.getAllNode(),function(node)
						{
						    
						    	node.set('checked',false);
						 
						});
				}
			}

			]

		});
		var root = Ext.data.NodeInterface( {
					text :frame.lang.frame.userRole.uiPermission,
					id : '-1',
					expanded : true

				});
		var store = Ext.create('Ext.data.TreeStore', {
	           root:root
		});
		Ext.Ajax.request( {
			url : basePath + 'PermissionController/getUiPermisisonTree.do',
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
				;
			}
		});
		me.store = store;
		me.tbar=_tbar;
		me.on('afteritemexpand', function(node) {
			if (!node.hasChildNodes()) {
				node.set('leaf', true);
			} else {
				if (node.deep == null) {
					node
							.eachChild(function(child) {
								me.expandNode(child, node.deep == null ? 1
										: node.deep);
							});
				}
				if (node.deep == 0) {
					node.deep = null;
					node.collapse();

				}
			}

		});
		me.on('checkchange', function(node, checked, eOpts) {
			if(node.data.readOnly==true)
			{
				if(checked!=node.data.oldchecked)
				{
					node.set('checked', node.data.oldchecked);
				}
				return;
			}
			if (checked) {
				node.expand();
				if (node.parentNode != null) {
					this.setParentNode(node, checked);
				}
			}
			if (node.hasChildNodes()) {
				me.setChildNode(node, checked);
			}

		});
		me.on('itemclick', function(treeview,record) {
				record.data.oldchecked=record.data.checked;
				record.expand();
		});
			
		me.callParent();

	},
	//whbmemo:EXT4复选框树级联选择核心代码________________begin
	setChildNode : function(node, checked) {
		var me = this;
		var childNodes = node.childNodes;
		if (childNodes == null || childNodes.length == 0) {
			return;
		}
		for ( var i = 0; i < childNodes.length; i++) {
			var node = childNodes[i];
			node.set('checked', checked);
			//只允许选中子节点
			//if(!checked)
			//{
			 me.setChildNode(node, checked);
			//}
		}
	},
	setParentNode : function(node, checked) {
		var me = this;
		var parentNode = node.parentNode;
		if (parentNode == null) {
			return;
		}
		parentNode.set('checked', checked);
		me.setParentNode(parentNode, checked);

	},
	//只展开node这一次 ，node的子节点不展开
	expandNode : function(node, deep) {
		if (deep > 0) {
			deep--;
			node.deep = deep;
			if (node.isLoading() || node.isExpanded() || node.isLoaded()) {
				return;
			}
			node.expand();

		}
	},
	getAllNode : function() {
		var me = this;
		var node = me.getRootNode();
		var nodes = [];
		var getChildNode = function(node) {

			if (!node.hasChildNodes()) {
				return;
			} else {
				node.eachChild(function(child) {
					nodes.push(child);
					getChildNode(child);
				});
			}

		};
		getChildNode(node);
		return nodes;

	},
	//判断当前节点 是否被选中的角色拥有
	checkRoleHaveNode : function(node) {
		var me = this;
		if (me.rolePanel == null || me.rolePanel.down('grid') == null) {
			false;
		}
		var roleGrid = me.rolePanel.down('grid');
		var record = roleGrid.getSelectionModel().getSelection()[0];
		if (record == null || record.permissionCodes == null) {

			return false;
		}
		if (Ext.Array
				.contains(record.permissionCodes, node.data.id)) {
			return true;
		} else {
			return false;
		}
	}

});
Ext.define('com.module.frame.userRole.PermissionPanel_Ui_Tree', {
	extend : 'Ext.tree.Panel',
	rootVisible : false,//是否显示根目录     ,
	animate : false,
	title : frame.lang.frame.userRole.uiPermission,
	root : {
		text : frame.lang.frame.userRole.uiPermission,
		id : '-1',
		expanded : true
	},
	initComponent : function() {
		var me = this;
		var store = Ext.create('Ext.data.TreeStore', {
			autoLoad : true,
			fields : [ {
				name : 'id',
				mapping : 'permissionCode'
			}, {
				name : 'text',
				mapping : 'permissionName'
			}, 'permissionCode', 'permissionName', {
				name : 'checked',
				defaultValue : false
			} ],
			nodeParam : 'data',
			proxy : {
				type : 'ajax',
				url : basePath + 'PermissionController/getChildren.do',
				reader : {
					type : 'json',
					root : 'returnData'
				}
			},

			listeners : {
				'beforeexpand' : function(node, eOpts) {
				}
			}
		});
		me.store = store;
		me.on('afterrender', function() {
			me.expandAll();
			});
		me.on('afteritemexpand', function(node) {
			node.eachChild(function(child) {
			if (me.checkRoleHaveNode(child)) {
					child.set('checked', true);
			}
			});
			if (!node.hasChildNodes()) {
				node.set('leaf', true);
			} else {
				if (node.deep == null) {
					node
							.eachChild(function(child) {
								me.expandNode(child, node.deep == null ? 1
										: node.deep);
							});
				}
				if (node.deep == 0) {
					node.deep = null;
					//node.collapse();

				}
			}

		});
		me.on('checkchange', function(node, checked, eOpts) {
			if (checked) {
				node.expand();
				if (node.parentNode != null) {
					this.setParentNode(node, checked);
				}
			}
			if (node.hasChildNodes()) {
				me.setChildNode(node, checked);
			}

		});
		me.callParent();

	},
	//whbmemo:EXT4复选框树级联选择核心代码________________begin
	setChildNode : function(node, checked) {
		var me = this;
		var childNodes = node.childNodes;
		if (childNodes == null || childNodes.length == 0) {
			return;
		}
		for ( var i = 0; i < childNodes.length; i++) {
			var node = childNodes[i];
			node.set('checked', checked);
			me.setChildNode(node, checked);
		}
	},
	setParentNode : function(node, checked) {
		var me = this;
		var parentNode = node.parentNode;
		if (parentNode == null) {
			return;
		}
		parentNode.set('checked', checked);
		me.setParentNode(parentNode, checked);

	},
	//只展开node这一次 ，node的子节点不展开
	expandNode : function(node, deep) {
		if (deep > 0) {
			deep--;
			node.deep = deep;
			if (node.isLoading() || node.isExpanded() || node.isLoaded()) {
				return;
			}
			node.expand();

		}
	},
	getAllNode : function() {
		var me = this;
		var node = me.getRootNode();
		var nodes = [];
		var getChildNode = function(node) {

			if (!node.hasChildNodes()) {
				return;
			} else {
				node.eachChild(function(child) {
					nodes.push(child);
					getChildNode(child);
				});
			}

		};
		getChildNode(node);
		return nodes;

	},
	//判断当前节点 是否被选中的角色拥有
	checkRoleHaveNode : function(node) {
		var me = this;
		if (me.rolePanel == null || me.rolePanel.down('grid') == null) {
			false;
		}
		var roleGrid = me.rolePanel.down('grid');
		var record = roleGrid.getSelectionModel().getSelection()[0];
		if (record == null || record.permissionCodes == null) {

			return false;
		}
		if (Ext.Array
				.contains(record.permissionCodes, node.data.id)) {
			return true;
		} else {
			return false;
		}
	}

});

//定义角色面板类
Ext
		.define(
				"com.module.frame.userRole.PermissionPanel",
				{
					extend : 'Ext.panel.Panel',
					layout : 'border',
					//初始化角色面板
					initComponent : function() {
						var me = this;
						me.callParent();
						var rolePanel = Ext.create(
								'com.module.frame.userRole.NmsRolePanel', {
									region : 'west',
									width : '50%'
								});
						var dataPermissionPanel = Ext
								.create(
										'com.module.frame.userRole.PermissionPanel_Data_Tree',
										{
											region : 'center',
											width : '25%',
											rolePanel : rolePanel
										})

						var uiPermissionPanel = Ext
								.create(
										'com.module.frame.userRole.PermissionPanel_UiSync_Tree',
										{
											region : 'east',
											width : '25%',
											rolePanel : rolePanel
										})
						
						var roleGrid = rolePanel.down('grid');
						roleGrid.title = frame.lang.frame.userRole.rolePanel
						roleGrid.selModel.setSelectionMode('SINGLE');
						var dockedItems = roleGrid.getDockedItems();
						var roleGridTbar;
						Ext.each(dockedItems, function(item) {
							if ('Ext.toolbar.Toolbar' == item.$className) {
								roleGridTbar = item;
								return false;
							}
						});
						roleGridTbar.removeAll();
						var savePermission = function() {
							var rec = roleGrid.selModel.getSelection();
							if (Ext.isEmpty(rec)) {
								frame.util.QuickMsg
										.showMsg(frame.lang.global.selectHandleData);
								return;
							}
							var roleId = rec[0].data.id;
							var permissionCodes = [];

							Ext
									.each(
											dataPermissionPanel.getChecked(),
											function(node) {
												permissionCodes
														.push(node.data.id);
											});
							Ext.each(uiPermissionPanel.getChecked(), function(
									node) {
								permissionCodes.push(node.data.id);
							});
							var data = {};
							data.roleId = roleId;
							permissionCodes=Ext.Array.remove(permissionCodes,'-1');
                           permissionCodes=Ext.Array.remove(permissionCodes,'-2');
							data.permissionCodes = permissionCodes;
							Ext.Ajax
									.request( {
										url : basePath + 'PermissionController/saveRolePermission.do',
										params : {
											data : Ext.encode(data)
										},
										success : function(response) {
											var success = Ext
													.decode(response.responseText).success;
											if (success == true) {
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

						};
						var _tbar = new Ext.Toolbar(
								{
									items : [
											
											{
												xtype : 'button',
												text : frame.lang.global._refresh,
												//iconCls : 'refresh',
													width:70,
												handler : function() {
													roleGrid.refreshNmsRole();
												}
											},
											{
												xtype : 'button',
												text : frame.lang.global._look,

												//iconCls : 'look',
													width:70,
												handler : function() {
													roleGrid.lookNmsRole();
												}
											},
											{
												xtype : 'button',
												text : frame.lang.frame.userRole.savePermission,
												width:110,
									
												//iconCls : 'add',
												handler : function() {
													savePermission();
												}
											},
											{
												xtype:'displayfield',
												value:'*'+frame.lang.frame.userRole.NmsRolePanel.defaultRoleCannotUpdate
											}]

								});
						roleGrid.addDocked(_tbar);
						roleGrid
								.on(
										'itemclick',
										function(grid, record) {
											var me = this;
											var roleId = record.data.id;
		                                if(!frame.util.isNull(record))
		                                 {
		                                	var role=record.data;
			                                 if(role.roleType==-1)
		                                     {
			                                 var formItems=Ext.ComponentQuery.query('#'+uiPermissionPanel.getId()+' button');
	                    	Ext.each(formItems,function(formItem)
			{
			    if( formItem.frameMark.toString().startWith("uiPermissionButton"))
			    {
			    	formItem.setDisabled(true);
			    }
			});
			                                  }
			                                 else{
			                                	 
			              var formItems=Ext.ComponentQuery.query('#'+uiPermissionPanel.getId()+' button');
	                    	Ext.each(formItems,function(formItem)
			{
			    if( formItem.frameMark.toString().startWith("uiPermissionButton"))
			    {
			    	formItem.setDisabled(false);
			    }
			});
			                                	 
			                                 }
			                                }
											Ext.Ajax
													.request( {
														url : basePath + 'PermissionController/loadPermissionByRoleId.do',
														params : {
															data : roleId
														},
														success : function(
																response) {
															var result = Ext
																	.decode(response.responseText);
															var permissionCodes = result.returnData;
															record.permissionCodes = permissionCodes;
															var uiPermissionNodes = uiPermissionPanel
																	.getAllNode();
															var dataPermissionNodes = dataPermissionPanel
																	.getAllNode();
															for (i in uiPermissionNodes) {
																var uiPermissionNode = uiPermissionNodes[i];
																if (Ext.Array
																		.contains(
																				permissionCodes,
																				uiPermissionNode.data.id)) {
																	uiPermissionNode
																			.set(
																					'checked',
																					true);
																} else {
																	uiPermissionNode
																			.set(
																					'checked',
																					false);
																}
																
																    if(!frame.util.isNull(record))
		                                                             {
		                                	                          var role=record.data;
			                                                          if(role.roleType==-1)
		                                                           	  {
			                                                            uiPermissionNode.set(
																					'readOnly',
																					true);
			                                                          }
			                                                          else{
			                                                        	 uiPermissionNode.set(
																					'readOnly',
																					false);
			                                                          }
			
		                                                              }
															}

															for (i in dataPermissionNodes) {
																var dataPermissionNode = dataPermissionNodes[i];
																if (Ext.Array
																		.contains(
																				permissionCodes,
																				dataPermissionNode.data.id)) {
																	dataPermissionNode
																			.set(
																					'checked',
																					true);
																} else {
																	dataPermissionNode
																			.set(
																					'checked',
																					false);
																}
																	  if(!frame.util.isNull(record))
		                                                             {
		                                	                          var role=record.data;
			                                                          if(role.roleType==-1)
		                                                           	  {
			                                                             dataPermissionNode.set(
																					'readOnly',
																					true);
			                                                          }
			                                                          else{
			                                                        	   dataPermissionNode.set(
																					'readOnly',
																					false);
			                                                          }
			
		                                                              }
															}

														}

													});
										})
						/*在角色面板内部添加表格*/
						me.add(rolePanel);
						me.add(dataPermissionPanel);
						me.add(uiPermissionPanel);
				

					}

				});