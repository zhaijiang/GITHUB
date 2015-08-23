Ext
		.define(
				'Frame.ux.ComboxTree',
				{
					extend : 'Ext.form.field.Picker',
					xtype : 'comboxtree',
					triggerCls : Ext.baseCSSPrefix + 'form-arrow-trigger',
					config : {
						displayField : null,
						columns : null,
						rootVisible : false,
						selectOnTab : true,
						firstSelected : false,
						maxPickerWidth : 300,
						maxPickerHeight : 350,
						minPickerHeight : 80
					},
					//是否全部展开
					expandAll:false,
					//是否为checkbox 树
					checkbox:false,
					autoScroll : true,
					editable : false,
					initComponent : function() {
						var me = this;
						me.callParent(arguments);
						me.addEvents('select');
						//修改时，主动根据真实值 ，查询出表现值
						me.on('afterrender', me.loadRawValue, me)

					},
					createPicker : function() {
						var me = this;
						var picker = Ext.create('Ext.tree.Panel', {
							store : me.store,
							floating : true,
							hidden : true,
							width : me.maxPickerWidth,
							displayField : me.displayField,
							columns : me.columns,
							maxHeight : me.maxTreeHeight,
							shadow : false,
							rootVisible : me.rootVisible,
							manageHeight : false,
							listeners : {
								itemclick : Ext.bind(me.onItemClick, me)
					
							},
							viewConfig : {
								listeners : {
									render : function(view) {
										view.getEl().on('keypress',
												me.onPickerKeypress, me);
									}
								}
							}
						}), 
						view = picker.getView();

						view.on('render', me.setPickerViewStyles, me);
						if (Ext.isIE9 && Ext.isStrict) {
							view.on('highlightitem', me.repaintPickerView, me);
							view
									.on('unhighlightitem',
											me.repaintPickerView, me);
							view
									.on('afteritemexpand',
											me.repaintPickerView, me);
							view.on('afteritemcollapse', me.repaintPickerView,
									me);
						}
						me.store.on('load', me.onLoad, me);
						if(me.checkbox)
						{
							picker.on('checkchange', function(node, checked) {
								var nodes=picker.getChecked( ) 
								var value='';
								var rawValue='';
								Ext.each(nodes,function(node)
								{
									if(value=='')
									{
									   value=node.get(me.valueField);
   							           rawValue=node.get(me.displayField);
   							         } 
									else{
									   value=value+"/"+node.get(me.valueField);
   							           rawValue=rawValue+"/"+node.get(me.displayField);
									}
   							         
								});
								me.setMeValue(value);
								me.setMeRawValue(rawValue);
							});
						
						}
						if (me.expandAll) {
							picker.expandAll(function() {

							});
						}
						return picker;
					},
					loadRawValue : function() {
						var me = this;
						if (me.value == null || me.value == "") {
							return;
						}
						var root=me.store.getRootNode();
						if(me.store.getRootNode!=null)
							
							{
							   var rootValue=root.data[me.valueField]
							   if(me.value==rootValue)
								 {
								  var rawValue= root.data[me.displayField];
								  if(rawValue!=null&&rawValue!=''&&rawValue!='undefined')
									 {
								       me.setRawValue(rawValue);
								       return;
								   }
								 }
							}
						if(me.store.proxy.extraParams==null||me.store.proxy.extraParams.tableName==null)
						{
							return;
						}
						Ext.Ajax
								.request( {
									url : 'DBController/queryPo.do',
									params : {
										tableName : me.store.proxy.extraParams.tableName,
										condition : Ext.encode( [ {
											fieldName : me.valueField,
											operation : 'eq',
											value : me.value
										} ])
									},

									success : function(response) {
										var result = Ext
												.decode(response.responseText);
										try {
											var returnData = result.returnData[0];

											if (returnData[me.displayField]) {
												me.setRawValue(returnData[me.displayField]);
											}
										} catch (e) {
											console.error(e);
											me.setRawValue(me.value);
										}

									},
									failure : function() {

									}

								});

					},

					setPickerViewStyles : function(view) {
						view.getEl().setStyle( {
							'min-height' : this.minPickerHeight + 'px',
							'max-height' : this.maxPickerHeight + 'px'
						});
					},
					repaintPickerView : function() {
						var style = this.picker.getView().getEl().dom.style;
						style.display = style.display;
					},
					alignPicker : function() {
						var me = this, picker;

						if (me.isExpanded) {
							picker = me.getPicker();
							if (me.matchFieldWidth) {
								picker.setWidth(this.picker.getWidth());
							}
							if (picker.isFloating()) {
								me.doAlign();
							}
						}
					},
					onItemClick : function(view, record, node, rowIndex, e) {
						this.selectItem(record);
					},
					onPickerKeypress : function(e, el) {
						var key = e.getKey();

						if (key === e.ENTER
								|| (key === e.TAB && this.selectOnTab)) {
							this.selectItem(this.picker.getSelectionModel()
									.getSelection()[0]);
						}
					},
					selectItem : function(record) {

						var me = this;
						if(!me.checkbox)
						{
							
							
						   me.setMeValue(record.get(me.valueField ));
						   me.setMeRawValue(record.get(me.displayField));
						   me.picker.hide();
						   me.inputEl.focus();
						   me.fireEvent('select', me, record)
						}
						
					
					},
					onExpand : function() {
						var me = this, picker = me.picker, store = picker.store, value = me.value;
						if (value) {
							var node = store.getNodeById(value);
							if (node)
								picker.selectPath(node.getPath());
						} else {
							var hasOwnProp = me.store
									.hasOwnProperty('getRootNode');
							if (hasOwnProp)
								picker.getSelectionModel().select(
										store.getRootNode());
						}

						Ext.defer(function() {
							picker.getView().focus();
						}, 1);
					},
					setMeValue : function(value) {
						var me = this;
						me.value = value;
						return me;
					},
					setMeRawValue : function(rawValue) {
						var me = this;
						//加载设置表现值
			           me.setRawValue(rawValue);
					return me;

				},
				getValue : function() {
					return this.value;
				},
				onLoad : function(store, node, records) {
				},
				getSubmitData : function() {
					var me = this, data = null;
					if (!me.disabled && me.submitValue) {
						data = {};
						data[me.getName()] = '' + me.getValue();
					}
					return data;
				},
				onTriggerClick : function() {
					var me = this;
					if (!me.readOnly && !me.disabled) {
						if (me.isExpanded) {
							me.collapse();
						} else {
							me.expand();
						}
						me.inputEl.focus();
					}
				}
				});