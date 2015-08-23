Ext.namespace("frame.file");
Ext.namespace("frame.xchat");
Ext.namespace("Ext.ux");
function FloatAdd(a, b, c) {
	var a = a == null ? "0" : a, b = b == null ? "0" : b, d = 0, e = 0, f = 1;
	if (a.toString().indexOf(".") != -1)
		d = a.toString().split(".")[1].length;
	if (b.toString().indexOf(".") != -1)
		e = b.toString().split(".")[1].length;
	f = Math.pow(10, Math.max(d, e));
	a = (a * f + b * f) / f;
	return c != null ? a.toFixed(c) : a
}
function FloatSub(a, b, c) {
	var a = a == null ? "0" : a, b = b == null ? "0" : b, d = 0, e = 0, f = 1;
	if (a.toString().indexOf(".") != -1)
		d = a.toString().split(".")[1].length;
	if (b.toString().indexOf(".") != -1)
		e = b.toString().split(".")[1].length;
	f = Math.pow(10, Math.max(d, e));
	a = (a * f - b * f) / f;
	return c != null ? a.toFixed(c) : a
}
function FloatMul(a, b, c) {
	if (a == null || b == null)
		return 0;
	var d = 0, a = a.toString(), b = b.toString();
	a.indexOf(".") != -1 && (d += a.split(".")[1].length);
	b.indexOf(".") != -1 && (d += b.split(".")[1].length);
	d = Number(a.replace(".", "")) * Number(b.replace(".", ""))
			/ Math.pow(10, d);
	return c != null ? d.toFixed(c) : d
}
function FloatDiv(a, b, c) {
	var a = a == null ? "0" : a, b = b == null ? "1" : b, d = 0, e = 0;
	if (a.toString().indexOf(".") != -1)
		d = a.toString().split(".")[1].length;
	if (b.toString().indexOf(".") != -1)
		e = b.toString().split(".")[1].length;
	with (Math)
		return a = Number(a.toString().replace(".", "")), b = Number(b
				.toString().replace(".", "")), d = a / b * pow(10, e - d),
				c != null ? d.toFixed(c) : d
}
frame.util.ShowLoadMask = function(a) {
	if (a == null || a == "")
		a = "\u6570\u636e\u63d0\u4ea4\u4e2d,\u8bf7\u7a0d\u5019......";
	Ext.MessageBox.show( {
		msg : a,
		progressText : "\u64cd\u4f5c\u4e2d...",
		width : 300,
		wait : !0,
		waitConfig : {
			interval : 200
		},
		icon : "download_ani"
	})
};
frame.util.HideLoadMask = function() {
	Ext.MessageBox.hide()
};
frame.xchat.DisposalFunction = [];
frame.xchat.RegisterMessage = function(a, b) {
	frame.xchat.DisposalFunction[a] == null
			&& (frame.xchat.DisposalFunction[a] = []);
	for ( var c = 0; c < frame.xchat.DisposalFunction[a].length; c++)
		if (frame.xchat.DisposalFunction[a][c] == b)
			return !0;
	frame.xchat.DisposalFunction[a].push(b)
};
function DisposalMessage(a, b, c, d, e, f, h, g, m) {
	a = frame.xchat.DisposalFunction[a];
	if (a != null && a.length > 0)
		for ( var i = 0; i < a.length; i++)
			a[i](b, c, d, e, f, h, g, m)
}
frame.file.DATABASE = 1;
frame.file.LOCAL = 3;
frame.util.FileUploadWnd = function(a, b, c, d) {
	return frame.util.FileUploadWindow( {
		url : a,
		param : b,
		filter : c,
		callback : d,
		extraParam : "extraParam",
		extraForm : null
	})
};
frame.util.FileUploadWindow = function(a) {
	a.param = a.param == null ? {} : a.param;
	a.extraParam = a.extraParam == null ? "extraParam" : a.extraParam;
	var b = "\u60a8\u53ef\u4ee5\u4e0a\u4f20\u4efb\u610f\u6587\u4ef6\u683c\u5f0f";
	a.filter != null
			&& (b = "\u60a8\u53ea\u80fd\u4e0a\u4f20\u4ee5\u4e0b\u683c\u5f0f\u6587\u4ef6:"
					+ a.filter.join(","));
	var c = [];
a.extraForm != null && (c.push(a.extraForm), a.extraForm.on("beforedestroy",
	function() {
		return ! 1
	}));
	c.push({
		fieldLabel: "\u6587\u4ef6\u8def\u5f84",
		name: "uploadFile",
		id: "uploadFileId",
		qtip: b,
		anchor: "100%",
		inputType: "file"
	});
	var d = new Ext.Window({
		title: "\u6587\u4ef6\u4e0a\u4f20",
		width: 380,
		iconCls: "upload",
		height: "auto",
		modal: !0,
		border: !1,
		resizable: !1,
		items: [new Ext.FormPanel({
			id: "FileUploadWndFormId",
			labelWidth: 60,
			frame: !0,
			fileUpload: !0,
			bodyStyle: "padding: 10 0 0 5;",
			defaultType: "textfield",
			defaults: {
				anchor: "100%",
				labelWidth: 60
			},
			items: c,
			buttons: [{
				text: "\u4e0a\u4f20\u6587\u4ef6",
				handler: function() {
					var b = Ext.getCmp("uploadFileId").getValue();
					if (b == null || b == "") frame.util.ShowAutoPopoMsg("\u8bf7\u6307\u5b9a\u60a8\u8981\u4e0a\u4f20\u7684\u6587\u4ef6\u8def\u5f84");
					else {
						if (a.filter != null && a.filter.length > 0) {
							var c = ";" + a.filter.join(";") + ";",
							b = b.split(".");
							if (c.indexOf(";" + b[b.length - 1] + ";") == -1) {
								frame.util.ShowAutoPopoMsg("\u5bf9\u4e0d\u8d77,\u8bf7\u4e0a\u4f20\u6b63\u786e\u683c\u5f0f\u7684\u6587\u4ef6:" + c);
								return
							}
						}
						c = Ext.getCmp("FileUploadWndFormId").getForm();
						c.isValid() && (a.extraForm != null && (a.param[a.extraParam] = Ext.encode(c.getValues())), c.submit({
							url: a.url,
							method: "POST",
							fileUpload: !0,
							params: a.param,
							timeout: 18E5,
							waitMsg: "\u6587\u4ef6\u4e0a\u4f20\u4e2d,\u8bf7\u7a0d\u5019...",
							failure: function() {
								frame.util.ShowAutoPopoMsg("\u6587\u4ef6\u4e0a\u4f20\u5931\u8d25,\u8bf7\u68c0\u6d4b\u7f51\u7edc\u8fde\u901a\u6027...");
								d.close()
							},
							success: function(b, c) {
								var e = Ext.decode(c.response.responseText);
								a.callback != null && a.callback(e);
								d.close()
							}
						}))
					}
				}
			}]
		})]
	});
	return d
};
frame.util.ImportSerializeExcel = function(a, b) { (new frame.util.FileUploadWnd("FileAction!importSerializeExcel.action", {
		beanName: a
	},
	["xls"], b)).show()
};
frame.util.UploadFile = function(a, b, c) { (new frame.util.FileUploadWnd("FileAction!uploadFile.action", {
		locationType: a
	},
	b, c)).show()
};
frame.util.DownloadFile = function(a) {
	frame.util.DownLoadFile4Action("FileAction!downloadFile.action", {
		fileKey: a
	})
};
frame.util.OpenOnlineFile = function(a) {
	frame.util.DownLoadFile4Action("FileAction!downloadFile.action", {
		fileKey: a,
		openMode: "inline"
	})
};
frame.util.ExportExcel = function(a, b, c) {
	frame.util.DownLoadFile4Action("FileAction!exportExcel.action", {
		actionExport: Ext.encode(a),
		excel: b,
		fileName: c
	})
};
HttpFile = function() {
	this.xmlHttp = this.createXMLHttp()
};
HttpFile.prototype.createXMLHttp = function() {
	if (window.ActiveXObject) for (var a = ["MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"], b = 0; b < a.length; b++) try {
		return new ActiveXObject(a[b])
	} catch(c) {} else frame.util.ShowAutoPopoMsg("XML HTTP \u6587\u4ef6\u4e0b\u8f7d\u5931\u8d25,\u8bf7\u8bbe\u7f6e\u672c\u7ad9\u70b9\u53ca\u5fae\u8f6fXMLHttp\u63a7\u4ef6\u4e3a\u53d7\u4fe1\u4efb\u72b6\u6001");
	return null
};
HttpFile.prototype.downloadFile = function(a) {
	if (this.xmlHttp != null) this.xmlHttp.onreadystatechange = this.downloadStatusChange,
	this.xmlHttp.open("GET", a, !0),
	this.xmlHttp.send()
};
HttpFile.prototype.saveFile = function(a, b) {
	var c;
	c = new ActiveXObject("ADODB.Stream");
	c.Type = 1;
	c.open();
	c.write(a);
	c.SaveToFile(b)
};
HttpFile.prototype.downloadStatusChange = function() {
	if (this.xmlHttp.readyState == 4) if (this.xmlHttp.status == 0) frame.util.ShowAutoPopoMsg("\u6587\u4ef6\u4e0b\u8f7d\u5f02\u5e38,\u6216\u76ee\u6807\u6587\u4ef6\u8fc7\u5927,\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u901a\u6027");
	else if (this.xmlHttp.status == 200 && this.xmlHttp.statusText == "OK") this.onComplete(this.xmlHttp.responseText, this.xmlHttp.responseXML);
	else frame.util.ShowAutoPopoMsg("status = " + this.xmlHttp.status + ";statusText = " + this.xmlHttp.statusText + ";responseText = " + this.xmlHttp.responseText)
};
frame.util.HttpFile = HttpFile;
frame.util.DownLoadFile4Action = function(a, b) {
	if (b != null) {
		var c = !0,
		d;
		for (d in b) if (typeof b[d] != "function" && !(b[d] == null || b[d] == "")) c == !0 ? (c = !1, a += "?") : a += "&",
		a += d + "=" + encodeURIComponent(b[d])
	}
	window.open(a)
};
frame.util.MultiUploadFileDownload = function(a) {
	var b = {};
	Ext.apply(b, {
		showModel: "view",
		keys: a
	}); (new Ext.Window({
		title: "\u9644\u4ef6\u4e0b\u8f7d",
		modal: !0,
		border: !1,
		items: frame.util.MultiUploadFile(b),
		height: 200,
		width: 600,
		layout: "fit"
	})).show()
};
frame.util.MultiUploadFile = function(a) {
	function b() {
		a.showModel && a.showModel == "view" || (j.getSelectionModel().getSelections().length == 0 ? Ext.Msg.show({
			title: "\u63d0\u793a",
			msg: "\u8bf7\u9009\u62e9\u9700\u8981\u4fee\u6539\u7684\u9644\u4ef6\u3002",
			buttons: Ext.Msg.OK,
			icon: Ext.MessageBox.INFO
		}) : n(j))
	}
	function c(a, b) {
		if (!Ext.isEmpty(a)) {
			var c = [{
				fieldName: "ID",
				operation: "in",
				value: a
			}];
			Ext.isEmpty(b) || c.push({
				fieldName: "fileType",
				operation: "eq",
				value: b
			});
			Ext.Ajax.request({
				url: "FileAction!loadFile.action",
				params: {
					condition: Ext.encode(c)
				},
				success: function(a) {
					d.removeAll();
					try {
						d.loadData(Ext.decode(a.responseText))
					} catch(b) {}
				},
				failure: function() {},
				scope: this
			})
		}
	}
	var d = new Ext.data.Store({
		reader: new Ext.data.JsonReader({
			root: "retList",
			sortInfo: {
				field: "createTime",
				direction: "desc"
			},
			fields: ["ID", "fileName", "createTime", "fileType", "authorName", "remark"]
		})
	}),
	e = new Ext.ux.UploadDialog.Dialog({
		url: "FileAction!uploadFile.action",
		autoCreate: !0,
		closable: !0,
		modal: !0,
		base_params: {
			locationType: a.locationType || frame.file.DATABASE,
			fileType: a.fileType ? a.fileType: ""
		},
		collapsible: !1
	});
	e.on("uploadsuccess",
	function(a, b, c) {
		a = new Ext.data.Record;
		a.id = c.fileKey;
		a.set("ID", c.fileKey);
		a.set("fileName", c.fileName);
		a.set("createTime", c.createTime);
		a.set("fileType", c.fileType);
		a.set("authorName", c.authorName);
		a.set("remark", c.remark);
		j.getStore().add(a)
	});
	var f = new Ext.Button({
		text: "\u6dfb\u52a0",
		handler: function() {
			e.show()
		},
		iconCls: "add",
		scope: this
	}),
	h = new Ext.Button({
		text: "\u5220\u9664",
		iconCls: "delete",
		handler: function() {
			var a = j.getSelectionModel().getSelections();
			a.length == 0 ? Ext.Msg.show({
				title: "\u63d0\u793a",
				msg: "\u8bf7\u9009\u62e9\u9700\u8981\u5220\u9664\u7684\u9644\u4ef6\u3002",
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.INFO
			}) : Ext.MessageBox.confirm("\u786e\u8ba4", "\u786e\u5b9a\u8981\u5220\u9664\u5417\uff1f",
			function(b) {
				if (b == "yes") for (var b = j.getStore(), c = 0; c < a.length; c++) b.remove(a[c])
			})
		},
		scope: this
	}),
	g = new Ext.Button({
		text: "\u4fee\u6539",
		iconCls: "modify",
		handler: b,
		scope: this
	}),
	m = new Ext.grid.CheckboxSelectionModel,
	i = new Ext.grid.ColumnModel([m, {
		header: "\u6587\u4ef6",
		dataIndex: "fileName",
		width: 180,
		sortable: !0,
		renderer: function(a, b, c) {
			return "<a href='javascript:frame.util.OpenOnlineFile(" + c.get("ID") + ")'>" + c.get("fileName") + "</a>"
		},
		id: "fileName"
	},
	{
		header: "\u4e0a\u4f20\u4eba",
		dataIndex: "authorName",
		width: 80,
		sortable: !0
	},
	{
		header: "\u4e0a\u4f20\u65f6\u95f4",
		dataIndex: "createTime",
		align: "center",
		width: 130,
		sortable: !0
	},
	{
		header: "\u5907\u6ce8",
		dataIndex: "remark",
		sortable: !0,
		id: "REMARK"
	}]),
	j = new Ext.grid.GridPanel({
		autoScroll: !0,
		frame: !1,
		store: d,
		border: !0,
		region: "center",
		autoExpandColumn: "REMARK",
		loadMask: {
			msg: "\u6b63\u5728\u8f7d\u5165\u6570\u636e,\u8bf7\u7a0d\u7b49..."
		},
		sm: m,
		cm: i,
		listeners: {
			rowdblclick: function() {
				b()
			}
		}
	}),
	k = a.showModel && a.showModel == "view" ? null: new Ext.Toolbar(["->", f, h, g]),
	f = {
		frame: !1,
		border: !1,
		height: 120,
		width: "auto",
		labelAlign: "left",
		hideLable: !0,
		layout: "border",
		bbar: k,
		items: [j]
	};
	Ext.apply(f, a);
	var l = new Ext.Panel(f),
	n = function(a) {
		var b = new Ext.form.FormPanel({
			frame: !0,
			border: !1,
			labelAlign: "left",
			labelWidth: 55,
			height: 10,
			layout: "form",
			items: [{
				xtype: "textfield",
				name: "txtFileName",
				fieldLabel: "\u6587\u4ef6\u540d",
				anchor: "95%",
				readOnly: !0
			},
			{
				xtype: "textarea",
				name: "txtRemark",
				labelSeparator: "\uff1a",
				fieldLabel: "\u5907\u6ce8",
				allowBlank: !0,
				anchor: "95%",
				height: 90
			}]
		}),
		c = new Ext.Window({
			title: "\u9644\u4ef6\u5907\u6ce8\u4fee\u6539",
			frame: !0,
			border: !1,
			layout: "fit",
			closeAction: "close",
			resizable: !1,
			modal: !0,
			closable: !0,
			width: 300,
			height: 200,
			margins: "5 5 5 5",
			items: [b],
			buttons: [{
				text: "\u786e\u5b9a",
				handler: function() {
					if (b.getForm().isValid()) {
						var d = a.getSelectionModel().getSelected(),
						e = b.getForm().findField("txtRemark").getValue();
						d.set("remark", e);
						a.getStore().commitChanges();
						Ext.Ajax.request({
							url: "FileAction!updateFileRemark.action",
							params: {
								fileKey: d.data.ID,
								condition: e
							},
							success: function(a) {
								Ext.decode(a.responseText).success == !0 && (frame.util.ShowAutoPopoMsg("\u64cd\u4f5c\u6210\u529f"), c.close())
							},
							failure: function() {
								frame.util.ShowAutoPopoMsg("\u7f51\u7edc\u5f02\u5e38,\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u901a\u6027...")
							}
						})
					}
				}
			},
			{
				text: "\u53d6\u6d88",
				handler: function() {
					c.close()
				}
			}],
			listeners: {
				show: function() {
					var c = a.getSelectionModel().getSelected();
					b.getForm().findField("txtFileName").setValue(c.get("fileName"));
					b.getForm().findField("txtRemark").setValue(c.get("remark"))
				}
			}
		});
		c.show()
	};
	Ext.isEmpty(a.fileKey) || c(a.fileKey, a.fileType ? a.fileType: "");
	Ext.apply(l, {
		getFileAttribute: function() {
			var a = [];
			d.each(function(b) {
				a.push(b.data)
			});
			return a
		},
		getFileKey: function() {
			var a = [];
			d.each(function(b) {
				a.push(b.get("ID"))
			});
			return a
		},
		showFile: c,
		setViewModal: function(a) {
			k.setVisible(a == "view" ? !1 : !0);
			l.doLayout()
		}
	});
	return l
};
frame.util.UpdateTheme = function(a) {
	Ext.util.CSS.swapStyleSheet("frameskin-theme", frame.util.basePath + "static/ext/resources/css/" + a);
	Ext.util.CSS.swapStyleSheet("frameskin-ux", frame.util.basePath + "static/plugin/ux/css/ux-all.css");
	Ext.util.CSS.swapStyleSheet("frameskin-frame", frame.util.basePath + "css/frame.css")
};
frame.util.SystemConfig = function() {
	var a = new Ext.Button({
		text: "\u4fdd\u5b58",
		iconCls: "save",
		handler: function() {
			if (c.getForm().isValid()) {
				var a = c.getForm().getValues();
				a.scriptCache = c.getForm().findField("scriptCache").getValue();
				a.autoLoadClass = c.getForm().findField("autoLoadClass").getValue();
				frame.Cookie.set("FrameParam", a);
				frame.util.ShowAutoPopoMsg("\u7cfb\u7edf\u53c2\u6570\u4fdd\u5b58\u6210\u529f");
				e.close()
			} else frame.util.ShowAutoPopoMsg("\u8868\u5355\u9a8c\u8bc1\u4e0d\u901a\u8fc7\uff0c\u8bf7\u91cd\u65b0\u586b\u5199")
		}
	}),
	b = new Ext.Button({
		text: "\u53d6\u6d88",
		iconCls: "close",
		handler: function() {
			e.close()
		}
	}),
	c = new Ext.form.FormPanel({
		frame: !0,
		border: !1,
		style: "padding:0 2 2 2",
		labelSeparator: "\uff1a",
		layout: "column",
		defaults: {
			anchor: "100%",
			labelAlign: "right",
			columnWidth: 0.5,
			border: !1,
			labelWidth: 80
		},
		items: [{
			layout: "form",
			defaults: {
				anchor: "90%"
			},
			items: [{
				xtype: "checkbox",
				fieldLabel: "\u7f13\u5b58\u52a0\u901f",
				name: "scriptCache",
				checked: !0
			},
			{
				xtype: "combo",
				fieldLabel: "\u83dc\u5355\u663e\u793a\u65b9\u5f0f",
				name: "menuMode",
				triggerAction: "all",
				store: new Ext.data.ArrayStore({
					data: [["TOP-MENU", "TOP-MENU"], ["LEFT-TAB", "LEFT-TAB"], ["TOP-MENU-LEFT-TAB", "TOP-MENU-LEFT-TAB"], ["TOP-MENU-LEFT-PANEL", "TOP-MENU-LEFT-PANEL"], ["TOP-TAB-LEFT-PANEL", "TOP-TAB-LEFT-PANEL"]],
					fields: ["menuMode", "dec"]
				}),
				anchor: "75%",
				displayField: "dec",
				valueField: "menuMode",
				editable: !1,
				value: "TOP-MENU-LEFT-PANEL",
				curValue: null,
				allowBlank: !1,
				mode: "local"
			}]
		},
		{
			layout: "form",
			defaults: {
				anchor: "90%"
			},
			items: [{
				xtype: "checkbox",
				fieldLabel: "\u754c\u9762\u52a0\u901f",
				name: "autoLoadClass",
				checked: !0
			},
			{
				xtype: "spinnerfield",
				fieldLabel: "\u5206\u9875\u5927\u5c0f",
				name: "pageSize",
				decimalPrecision: 0,
				minValue: 0,
				maxValue: 100,
				anchor: "60%",
				value: 15
			}]
		}]
	}),
	d = new(Ext.data.Record.create([{
		name: "scriptCache"
	},
	{
		name: "autoLoadClass"
	},
	{
		name: "menuMode"
	},
	{
		name: "pageSize"
	}]))({
		scriptCache: frame.param.scriptCache,
		autoLoadClass: frame.param.autoLoadClass,
		menuMode: frame.param.menuMode,
		pageSize: frame.param.pageSize
	});
	c.getForm().loadRecord(d);
	var e = new Ext.Window({
		width: 700,
		height: 300,
		modal: !0,
		border: !1,
		title: "\u7cfb\u7edf\u53c2\u6570\u8bbe\u7f6e",
		style: "padding:10 5 5 5",
		layout: "fit",
		items: [c],
		buttonAlign: "center",
		buttons: [a, b]
	});
	e.show()
};
frame.util.SetTheme = function() {
	var a = frame.Cookie.get("theme"),
	b = new Ext.form.ComboBox({
		store: new Ext.data.ArrayStore({
			data: [["xtheme-blue.css", "\u6de1\u84dd\u6674\u5929"], ["xtheme-gray.css", "\u6734\u7d20\u4f4e\u8c03"], ["xtheme-olive.css", "\u7eff\u7af9\u5c0f\u61a9"], ["xtheme-orange.css", "\u7ea2\u6a59\u6eda\u6eda"], ["xtheme-purple.css", "\u6e05\u65b0\u6de1\u7d2b"], ["xtheme-red5.css", "\u707f\u70c2\u671d\u971e"], ["xtheme-silverCherry.css", "\u65ed\u65e5\u7ea2\u5149"], ["xtheme-slate.css", "\u6d77\u5e95\u4e16\u754c"]],
			fields: ["id", "name"]
		}),
		displayField: "name",
		valueField: "id",
		editable: !1,
		typeAhead: !0,
		fieldLabel: "\u76ae\u80a4",
		mode: "local",
		value: Ext.isEmpty(a) ? "": a,
		forceSelection: !0,
		triggerAction: "all",
		selectOnFocus: !0,
		listeners: {
			select: function() {
				var a = this.getValue();
				frame.util.UpdateTheme(a)
			}
		}
	}),
	a = new Ext.form.FormPanel({
		labelWidth: 50,
		labelAlign: "right",
		frame: !0,
		border: !0,
		items: [b]
	}),
	c = new Ext.Window({
		width: 280,
		height: 115,
		border: !1,
		title: "\u66f4\u6362\u76ae\u80a4",
		style: "padding:10 5 5 5",
		layout: "fit",
		items: [a],
		buttons: [{
			text: frame.language.getProperty("ok_text", "\u786e\u5b9a"),
			handler: function() {
				var a = b.getValue();
				Ext.isEmpty(a) && (a = "xtheme-blue.css");
				frame.Cookie.set("theme", a);
				c.close()
			}
		},
		{
			text: frame.language.getProperty("cancel_text", "\u53d6\u6d88"),
			handler: function() {
				var a = frame.Cookie.get("theme");
				frame.util.UpdateTheme(a);
				c.close()
			}
		}]
	});
	c.show()
};
frame.util.CreateSQLCompositeItem = function(a) {
	var b = new Ext.form.TextField({
		name: a.name,
		operator: "=",
		columnWidth: 1,
		listeners: {
			specialkey: function(b, c) {
				c.getKey() == Ext.EventObject.ENTER && a.callback && a.callback()
			}
		}
	}),
	c = new Ext.Button({
		text: "=",
		minWidth: 45,
		getMenuClass: function() {
			return ""
		},
		columnWidth: 0,
		menu: new Ext.menu.Menu({
			minWidth: 45,
			showSeparator: !1,
			width: 45,
			defaults: {
				style: "text-align : center; padding:3px 3px 3px 3px",
				handler: function(a) {
					c.setText(a.text);
					b.operator = a.text
				}
			},
			menuDisabled: !0,
			items: [{
				text: "="
			},
			{
				text: ">"
			},
			{
				text: ">="
			},
			{
				text: "<"
			},
			{
				text: "<="
			},
			{
				text: "!="
			},
			{
				text: "IN"
			},
			{
				text: "LIKE"
			}]
		})
	});
	return [c, b]
};
Ext.ux.NotificationMgr = {
	positions: new Ext.util.MixedCollection
};
Ext.ux.Notification = Ext.extend(Ext.Window, {
	initComponent: function() {
		Ext.apply(this, {
			iconCls: this.iconCls || "x-icon-information",
			cls: "x-notification",
			width: 200,
			height: 100,
			autoHeight: !0,
			plain: !1,
			draggable: !1,
			autoHide: this.autoHide && !0,
			hideDelay: this.hideDelay || 3E3,
			minimizable: !0,
			bodyStyle: "text-align:left"
		});
		if (this.autoHide) this.task = new Ext.util.DelayedTask(this.hideWin, this);
		Ext.ux.Notification.superclass.initComponent.call(this)
	},
	hideWin: function() {
		this.hide();
		this.close()
	},
	setMessage: function(a) {
		this.body.update(a)
	},
	setTitle: function(a, b) {
		Ext.ux.Notification.superclass.setTitle.call(this, a, b || this.iconCls)
	},
	onRender: function(a, b) {
		Ext.ux.Notification.superclass.onRender.call(this, a, b)
	},
	minimize: function() {
		this.minimizable && this.hideWin()
	},
	onDestroy: function() {
		var a = Ext.ux.NotificationMgr.positions.get(this.xpos);
		a != null && a.remove(this.ypos);
		Ext.ux.Notification.superclass.onDestroy.call(this)
	},
	cancelHiding: function() {
		this.addClass("fixed");
		this.autoHide && this.task.cancel()
	},
	afterShow: function() {
		Ext.ux.Notification.superclass.afterShow.call(this);
		Ext.fly(this.body.dom).on("click", this.cancelHiding, this);
		this.autoHide && this.task.delay(this.hideDelay || 3E3)
	},
	animShow: function(a, b) {
		this.ypos = a || 0;
		this.xpos = b || 0;
		do {
			for (Ext.ux.NotificationMgr.positions.get(this.xpos) == null && Ext.ux.NotificationMgr.positions.add(this.xpos, []); Ext.ux.NotificationMgr.positions.get(this.xpos).indexOf(this.ypos) > -1;) this.ypos++;
			this.totalHeight = -20 - (this.getSize().height + 10) * this.ypos;
			if (this.ypos == 0 || Ext.getBody().getHeight() - this.height + this.totalHeight > 0) {
				this.totalWidth = -20 - (this.getSize().width + 10) * this.xpos;
				Ext.ux.NotificationMgr.positions.get(this.xpos).push(this.ypos);
				this.el.alignTo(document, "br-br", [this.totalWidth, this.totalHeight]);
				this.el.slideIn("b", {
					duration: 1,
					callback: this.afterShow,
					scope: this
				});
				break
			} else this.xpos++, this.ypos = 0
		} while ( 1 )
	},
	animHide: function() {
		typeof Ext.ux.NotificationMgr.positions.get(this.xpos) != "undefined" && (Ext.ux.NotificationMgr.positions.get(this.xpos).remove(this.ypos), Ext.ux.NotificationMgr.positions.get(this.xpos).length == 0 && Ext.ux.NotificationMgr.positions.removeKey(this.xpos));
		this.el.ghost("b", {
			duration: 1,
			remove: !0
		})
	},
	showSuccess: function(a, b) {
		this.iconCls = "x-icon-information";
		this.title = a || "success";
		this.html = b || "process successfully!";
		this.show(document)
	},
	showFailure: function(a, b) {
		this.iconCls = "x-icon-error";
		this.title = a || "success";
		this.html = b || "process successfully!";
		this.show(document)
	},
	showMessage: function(a, b, c) {
		c ? (this.iconCls = "x-icon-information", this.autoHide = !0, this.task = new Ext.util.DelayedTask(this.hideWin, this)) : this.iconCls = "x-icon-error";
		this.title = a;
		this.html = b;
		this.show(document)
	},
	focus: Ext.emptyFn
});
Ext.reg("notification", Ext.ux.Notification);
Ext.EventManager.onWindowResize(function() {
	Ext.ux.NotificationMgr.positions.clear()
});
frame.util.ShowAutoPopoMsg = function(a) { (new Ext.ux.Notification({
		autoHide: !0,
		timeDelay: 3E3
	})).showFailure("\u7cfb\u7edf\u63d0\u793a", "<h1>" + a + "</h1>")
};
frame.util.ShowFixedPopoMsg = function(a) { (new Ext.ux.Notification({
		autoHide: !1
	})).showFailure("\u7cfb\u7edf\u63d0\u793a", "<h1>" + a + "</h1>")
};
frame.util.ToggleFullScreen = function() { ! document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement ? document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen ? document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : frame.util.ShowAutoPopoMsg("\u5bf9\u4e0d\u8d77\uff0c\u6d4f\u89c8\u5668\u53ea\u652f\u6301 F11 \u5feb\u6377\u952e\u5168\u5c4f\uff01") : document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
};
frame.util.PreviewImportExcel = function(a) {
	function b() {
		f.getStore().reload();
		g.getStore().removeAll()
	}
	var c = [];
	Ext.apply(c, a.master.store.fields.keys);
	c.push("PREVIEW_ID");
	var d = [];
	for (Ext.apply(d, a.master.colModel.config); Ext.isEmpty(d[0].dataIndex);) d.shift();
	var e = new Ext.grid.CheckboxSelectionModel({
		moveEditorOnEnter: !1,
		sortable: 1,
		singleSelect: 1
	});
	d.unshift(new Ext.grid.RowNumberer, e, {
		dataIndex: "PREVIEW_ID",
		hidden: !0,
		header: "\u9884\u89c8\u5e8f\u53f7"
	});
	var f = new Ext.grid.GridPanel({
		viewConfig: {
			forceFit: !1
		},
		region: "north",
		height: 260,
		frame: !1,
		autoScroll: !0,
		closable: !0,
		border: !1,
		split: !0,
		collapseMode: "mini",
		plugins: a.masterPlugin,
		loadMask: !0,
		tbar: ["->", "-", {
			text: "\u63d0\u4ea4",
			iconCls: "submit",
			handler: function() {
				var c = e.getSelections();
				if (Ext.isEmpty(c)) frame.util.ShowAutoPopoMsg("\u8bf7\u9009\u62e9\u60a8\u8981\u63d0\u4ea4\u7684\u6570\u636e");
				else {
					var d = [];
					Ext.each(c,
					function(a) {
						d.push(a.data.PREVIEW_ID)
					});
					frame.util.ShowLoadMask();
					Ext.Ajax.request({
						url: "DBAction!submitPreview2Database.action",
						params: {
							tableName: a.masterTableName,
							slaveTableName: a.slaveTableName,
							methodName: a.masterMethodName,
							slaveMethodName: a.slaveMethodName,
							data: Ext.encode(d)
						},
						success: function(c) {
							frame.util.HideLoadMask();
							Ext.decode(c.responseText).success == !0 && (frame.util.ShowAutoPopoMsg("\u64cd\u4f5c\u6210\u529f"), b(), a.master.getStore().reload())
						},
						failure: function() {
							frame.util.ShowAutoPopoMsg("\u7f51\u7edc\u5f02\u5e38,\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u901a\u6027...");
							frame.util.HideLoadMask()
						}
					})
				}
			}
		},
		"-", {
			text: "\u5220\u9664",
			iconCls: "delete",
			handler: function() {
				var c = e.getSelections();
				if (Ext.isEmpty(c)) frame.util.ShowAutoPopoMsg("\u8bf7\u9009\u62e9\u60a8\u8981\u5220\u9664\u7684\u6570\u636e");
				else {
					var d = [];
					Ext.each(c,
					function(a) {
						d.push(a.data.PREVIEW_ID)
					});
					Ext.Ajax.request({
						url: "DBAction!deleteIMDBPreview.action",
						params: {
							tableName: a.masterTableName,
							slaveTableName: a.slaveTableName,
							data: Ext.encode(d)
						},
						success: function(a) {
							Ext.decode(a.responseText).success == !0 && (frame.util.ShowAutoPopoMsg("\u64cd\u4f5c\u6210\u529f"), b())
						},
						failure: function() {
							frame.util.ShowAutoPopoMsg("\u7f51\u7edc\u5f02\u5e38,\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u901a\u6027...")
						}
					})
				}
			}
		},
		"-", {
			text: "\u4e0a\u4f20",
			iconCls: "upload",
			handler: function() { (new frame.util.FileUploadWindow({
					url: "FileAction!importPreviewExcel.action",
					param: {
						beanName: a.masterTableName + "DAO",
						detailBeanName: a.slaveTableName + "DAO",
						methodName: a.importMethodName
					},
					filter: ["xls", "xlsx"],
					callback: b,
					extraParam: "actionParam",
					extraForm: a.extraForm
				})).show()
			}
		},
		"-", {
			text: "\u6a21\u677f",
			iconCls: "download",
			handler: function() {
				frame.util.DownLoadFile4Action("FileAction!downloadURLFile.action", {
					fileName: a.template
				})
			}
		},
		"-"],
		listeners: {
			rowclick: function() {
				g.getStore().load()
			}
		},
		store: new Ext.data.JsonStore({
			url: "DBAction!loadIMDBPreview.action",
			fields: c,
			root: "retList",
			autoLoad: !0,
			listeners: {
				beforeload: function(b) {
					b.removeAll();
					Ext.apply(this.baseParams, {
						tableName: a.masterTableName,
						data: Ext.encode(["PREVIEW_ID"])
					})
				}
			}
		}),
		sm: e,
		columns: d
	}),
	c = [];
	Ext.apply(c, a.slave.store.fields.keys);
	c.push("PREVIEW_ID", "PREVIEW_HKEY");
	d = [];
	for (Ext.apply(d, a.slave.colModel.config); Ext.isEmpty(d[0].dataIndex);) d.shift();
	d.unshift(new Ext.grid.RowNumberer, {
		dataIndex: "PREVIEW_ID",
		hidden: !0,
		header: "\u9884\u89c8\u5e8f\u53f7"
	},
	{
		dataIndex: "PREVIEW_HKEY",
		hidden: !0,
		header: "\u9884\u89c8\u8868\u5934"
	});
	var h = new Ext.data.JsonStore({
		url: "DBAction!loadIMDBPreview.action",
		fields: c,
		root: "retList",
		listeners: {
			beforeload: function(b) {
				b.removeAll();
				b = f.getSelectionModel().getSelected();
				Ext.apply(this.baseParams, {
					limit: g.getBottomToolbar() == null ? -1 : g.getBottomToolbar().pageSize,
					tableName: a.slaveTableName,
					data: Ext.encode(["PREVIEW_ID", "PREVIEW_HKEY"]),
					condition: Ext.encode([{
						fieldName: "PREVIEW_HKEY",
						operation: "eq",
						value: b == null ? -1 : b.get("PREVIEW_ID")
					}])
				})
			}
		}
	});
	a.slavePlugin && Ext.apply(a.slavePlugin, {
		getCondition: function() {
			return h.baseParams.condition
		}
	});
	var g = new Ext.grid.GridPanel({
		viewConfig: {
			forceFit: !1
		},
		region: "center",
		frame: !1,
		autoScroll: !0,
		closable: !0,
		border: !1,
		split: !0,
		collapseMode: "mini",
		loadMask: !0,
		plugins: a.slavePlugin,
		store: h,
		tbar: ["->", {
			text: "\u5220\u9664",
			iconCls: "delete",
			handler: function() {
				var b = g.getSelectionModel().getSelections();
				Ext.isEmpty(b) && frame.util.ShowAutoPopoMsg("\u8bf7\u9009\u62e9\u4e00\u6761\u60a8\u8981\u5220\u9664\u7684\u6570\u636e");
				var c = [];
				Ext.each(b,
				function(a) {
					c.push(a.data.PREVIEW_ID)
				});
				Ext.Ajax.request({
					url: "DBAction!deleteIMDBPreviewDetail.action",
					params: {
						tableName: a.masterTableName,
						slaveTableName: a.slaveTableName,
						data: Ext.encode(c)
					},
					success: function(a) {
						Ext.decode(a.responseText).success == !0 && (frame.util.ShowAutoPopoMsg("\u64cd\u4f5c\u6210\u529f"), g.getStore().reload())
					},
					failure: function() {
						frame.util.ShowAutoPopoMsg("\u7f51\u7edc\u5f02\u5e38,\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u901a\u6027...")
					}
				})
			}
		}],
		columns: d,
		bbar: new Ext.PagingToolbar({
			pageSize: frame.pageSize,
			afterPageText: "/{0}\u9875",
			beforePageText: "\u7b2c",
			store: h,
			displayInfo: !0,
			displayMsg: "\u7b2c{0}\u6761 - \u7b2c{1}\u6761\uff0c\u5171{2}\u6761\u8bb0\u5f55",
			emptyMsg: "\u6ca1\u6709\u8bb0\u5f55",
			plugins: [new Ext.ux.plugins.PageComboResizer, new Ext.ux.ProgressBarPager]
		})
	}); (new Ext.Window({
		title: "\u6570\u636e\u5bfc\u5165\u9884\u89c8",
		height: 600,
		width: 950,
		constrain: !0,
		maximizable: !0,
		modal: !0,
		border: !1,
		buttonAlign: "center",
		layout: "border",
		items: [f, g]
	})).show()
};
frame.CustomMenuWindow = function(a) {
	frame.CustomMenuWindow.superclass.constructor.call(this, a)
};
Ext.extend(frame.CustomMenuWindow, Object, {
	height: 156,
	width: 500,
	buttonWidth: 30,
	panelWidth: 470,
	oldX: -999,
	oldY: -999,
	zIndex: 6,
	handleFlag: !0,
	showFrameTool: function() {
		var a = Ext.get("my_frame_tools").getX();
		Ext.get("my_frame_tools").getY();
		this.oldX < a ? Ext.get("my_frame_tools").setX(a - (this.width - this.buttonWidth), !0) : Ext.get("my_frame_tools").setX(a + (this.width - this.buttonWidth), !0);
		this.oldX = a
	},
	show: function() {
		var a = new Ext.data.JsonStore({
			fields: ["ID", "clazzName", "icon", "clickNum", "menuName"],
			data: frameUser.customMenu || [],
			sortInfo: {
				field: "clickNum",
				direction: "DESC"
			}
		}),
		a = new Ext.DataView({
			store: a,
			tpl: new Ext.XTemplate('<div class="phones"><ul >', '<tpl for=".">', '<li class="phone" title="{menuName}" onclick="frame.right.OpenClazzPanel(\'{clazzName}\');">', '<img width="35" height="35" class="{icon}"/>', "<strong>{menuName}</strong>", "</li>", "</tpl>", "</ul></div>"),
			plugins: [new Ext.ux.DataViewTransition({
				duration: 550,
				idProperty: "ID"
			})],
			itemSelector: "li.phone",
			overClass: "phone-hover",
			singleSelect: !0,
			multiSelect: !1,
			autoScroll: !0
		}),
		b = document.documentElement.clientWidth,
		c = document.documentElement.clientHeight,
		b = '<div id="my_frame_tools" class=" x-window" style="position: absolute; z-index: 9003; visibility: visible; left:' + (b < this.width ? 0 : b - this.buttonWidth) + "px; top:" + (c < this.height ? 0 : (c - this.height) / 2) + 'px; border:none;display: block;"><div class="x-window-bwrap"><div class="x-window-ml" style="background-image: none;padding-left:0px"><div class="x-window-mr" style="background-image: none;padding-right:0px"><div class="x-window-mc" style="background-color:white;"><div class="x-window-body" style="width:' + this.width + "px; height:" + this.height + 'px"><div id="my_frame_tools_btn" style="float: left;width:28px;padding-top:10px;height:156px;cursor: pointer;background-image: url(\'css/images/searchBtnRight.jpg\');text-align: center;"><a style="color:white;border:none;letter-spacing: 2px;line-height: 120%;width: 28px;font-size:20px">\u4fbf\u6377\u5de5\u5177\u7bb1</a></div><div id="accerlate_grid_item" style="height:156px;padding-left: 28px;"></div></div></div></div></div></div></div>';
		Ext.getBody().insertHtml("beforeEnd", b, !0);
		new Ext.Panel({
			layout: "fit",
			items: a,
			renderTo: "accerlate_grid_item",
			height: this.height,
			width: this.panelWidth
		});
		this.drag("my_frame_tools")
	},
	getId: function(a) {
		return document.getElementById(a)
	},
	drag: function(a) {
		var b = this,
		c = document.getElementById(a);
		dixY = 0;
		document.getElementById("my_frame_tools_btn").onmousedown = function(a) {
			a = a || window.event;
			disY = a.clientY - c.offsetTop;
			var e = c.cloneNode(!0);
			document.body.appendChild(e);
			document.onmousemove = function(a) {
				var a = a || window.event,
				a = a.clientY - disY,
				b = document.documentElement.clientHeight - c.offsetHeight;
				a <= 0 && (a = 0);
				a >= b && (a = b);
				e.style.zIndex = this.zIndex++;
				e.style.opacity = "0.5";
				e.style.filter = "alpha(opacity=50)";
				e.style.top = a + "px";
				return ! 1
			};
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
				c.style.opacity = "1";
				var a = {
					top: e.offsetTop
				};
				c.style.zIndex = e.style.zIndex;
				b.onAnimate(c, a, 300,
				function() {
					document.body.removeChild(e);
					b.showFrameTool()
				});
				c.releaseCapture && c.releaseCapture()
			};
			this.setCapture && this.setCapture();
			return ! 1
		}
	},
	onAnimate: function(a, b, c, d) {
		var e = typeof a == "string" ? getId(a) : a,
		f = e.currentStyle ? e.currentStyle: window.getComputedStyle(e, null),
		h = !0,
		g;
		for (g in b)(function() {
			var a = g;
			if (a == "left" || a == "top") {
				var i = parseInt(f[a]),
				j = parseInt(b[a]);
				if (!isNaN(i)) {
					var k = i,
					l = (i <= j ? j - i: i - j) / c * 10;
					if (l != 0) var n = 0,
					o = setInterval(function() {
						e.style[a] = k + "px";
						k = i <= j ? k + l: k - l;
						n += 10;
						n >= c && (e.style[a] = j + "px", clearInterval(o), h && d && (d(), h = !1))
					},
					10);
					else h && d && (d(), h = !1)
				}
			}
		})()
	}
});