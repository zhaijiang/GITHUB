Ext.define('com.module.frame.pushlet.TestPushlet', {
	extend : 'Ext.panel.Panel',
	layout : 'fit',
	initComponent : function() {
		var me = this;
		me.callParent(arguments);
		var startPush = function() {
			Ext.Ajax.request( {
				url : basePath +'pushlet/startPush.do'
			});
		};
		var stopPush = function() {
			Ext.Ajax.request( {
				url : basePath +'pushlet/stopPush.do'
			});
		};
		var aaText = Ext.create("Ext.form.field.Text", {
			fieldLabel : 'aa'
		});

		var bbText = Ext.create("Ext.form.field.Text", {
			fieldLabel : 'bb'
		});

		var form = new Ext.form.Panel( {
			layout : 'column',
			defaults : {
				xtype : 'fieldset',
				anchor : '100%',
				labelAlign : 'right',
				columnWidth : 0.5,
				border : false,
				labelWidth : 60,
				align : 'right'
			},
			items : [ {
				defaults : {
					anchor : '90%'
				},
				items : [ aaText, bbText, {
					xtype : 'button',
					text : frame.lang.frame.pushlet.startPush,
					handler : startPush
				}, {
					xtype : 'button',
					text : frame.lang.frame.pushlet.stopPush,
					handler : stopPush
				} ]
			} ]

		});
		me.add(form);
     
		frame.util.Pushlet.listen(frame.config.pushlet.aa, function(event) {
			var data = event.get("data");
			aaText.setValue(data);

		});

		frame.util.Pushlet.listen(frame.config.pushlet.bb, function(event) {
			var data = event.get("data");
			bbText.setValue(data);
			
		});
	   

	}
});
