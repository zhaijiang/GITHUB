Ext.namespace("frame.util")
frame.util.Pushlet = {
	singleton : true,
	mixins : {
		observable : 'Ext.util.Observable'
	},
	inited : false,
	registry : {},
	constructor : function(config) {
		this.mixins.observable.constructor.call(this, config);
	},
	/**
	 * 初始化pushlet
	 * @memberOf {TypeName} 
	 * @return {TypeName} 
	 */
	init : function() {
		var me = this;
		if (me.inited) {
			return;
		}
		window.onData = function(event) {
			var subject = event.getSubject(), listeners = me
					.getListeners(subject);
			for ( var i = 0; i < listeners.length; i++) {
				var listener = listeners[i];
				var scope = listener.scope || me;
				listener.call(scope, event);
			}
		};
		PL._init();
		me.inited = true;
	},
	/**
	 * 开启session
	 */
	join : function()
	{
		PL.join();
	}
	,
	/**
	 * 添加pushlet事件监听
	 * @param {Object} subject
	 * @param {Object} listener
	 * @param {Object} scope
	 * @memberOf {TypeName} 
	 * @return {TypeName} 
	 */
	listen : function(subject, listener, scope) {
		var me = this, listeners = me.getListeners(subject);
		if (Ext.Array.contains(listeners, listener)) {
			return this;
		}
		listener.scope = scope;
		listeners.push(listener);
		if (listeners.length == 1) {
			PL.listen(subject);
		}
	},
	
/*
 * joinListen : function(subject, listener, scope) {
		var me = this, listeners = me.getListeners(subject);
		if (Ext.Array.contains(listeners, listener)) {
			return this;
		}
		listener.scope = scope;
		listeners.push(listener);
		if (listeners.length == 1) {
			PL.joinListen(subject);
		}
	},
	*/
	getListeners : function(subject) {
		var registry = this.registry, listeners = registry
				.hasOwnProperty(subject) ? registry[subject] : [];
		registry[subject] = listeners;
		return listeners;
	}
};