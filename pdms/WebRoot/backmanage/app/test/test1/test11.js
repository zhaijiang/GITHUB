alert('test11');
Ext.define('com.test.test1.test11', {
	extend : 'Ext.panel.Panel',
	constructor : function(config) {
	console.debug("con-" + this.content);//null
	this.callParent(arguments);
	console.debug("con-" + this.content);//aa
},
initComponent : function() {
	//该方法没有参数，所以 arguments 省略
	console.debug("init-" + this.content);//aa
	this.callParent();
	console.debug("init-" + this.content);//aa
	

},
 show : function()
 {
	alert('mypanel show');
 }
});

Ext.define('com.test.test1.test12', {
	extend : 'Ext.panel.Panel',
	constructor : function(config) {
	console.debug("con-" + this.content);//null
	this.callParent(arguments);
	console.debug("con-" + this.content);//aa
},
initComponent : function() {
	//该方法没有参数，所以 arguments 省略
	console.debug("init-" + this.content);//aa
	this.callParent();
	console.debug("init-" + this.content);//aa

},
 show : function()
 {
	alert('mypanel show');
 }
});