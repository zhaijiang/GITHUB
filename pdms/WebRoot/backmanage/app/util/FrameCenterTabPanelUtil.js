/**
 * 向系统center面板添加组件类，请谨慎使用

 */
Ext.namespace("frame.util");
frame.util.CenterTabPanel = {
	centerPanels : [],
	init : function() {
		var me = this;
		if (!me.initFinish) {
			me.centerTabPanel = Ext.getCmp('CenterTabPanel');
			me.initFinish = true;
		}

	},
	/**
	 * 添加一个面板到CenterPanel
	 * @param {Object} className  要加入的面板的类名
	 * @param {Object} panelTitle 面板titile
	 * @param {Object} classParam  面板参数
	 * @memberOf {TypeName} 
	 */
	addTab : function(className, panelTitle, classParam) {
		//containerId=类路径+".Container" 。view 为要加到中间区域的面板组件

	var me = this;
	me.init();
	me.centerPanels.push(className);
	var have = this.checkHave(me.centerTabPanel, className);
	
	if (!have) {
		var panel = Ext.create(className, {
			id : className,
			title : panelTitle,
			classParam : classParam,
			closable : true
		});
		me.centerTabPanel.add(panel);
	    //panel.setIconCls(classParam.picselId);
		panel.show();		
		me.centerTabPanel.setActiveTab(panel);
		panel.addListener("activate",function(){
			frame.util.CenterTabPanel.tableChange(me);
		});
	} else {
		have.setTitle(panelTitle);
		have.show();
		me.centerTabPanel.setActiveTab(have);
	}	
		frame.util.CenterTabPanel.tableChange(me);

},
/**
 * 检测CenterPanel 中是否含有要加入的面板
 * @param {Object} parent
 * @param {Object} childId
 * @return {TypeName} 
 */
checkHave : function(parent, childId) {
	var c = parent.getComponent(childId);

	return c;
},
addObject : function(panel) {
	var me = this;
	me.init();
	var have = this.checkHave(me.centerTabPanel, panel.id);
	if (!have) {
		me.centerTabPanel.add(panel);
		panel.show();
		panel.addListener("activate",function(){
			frame.util.CenterTabPanel.tableChange(me);
		});
	} else {
		have.setTitle(panel.title);
		have.show();
		panel.destroy();
	}
	frame.util.CenterTabPanel.tableChange(me);
},
tableChange : function(me){
		   var activeId = me.centerTabPanel.activeTab.id;
			me.centerTabPanel.items.each(function(tabItem){
			 var tabPanel =  me.centerTabPanel.getComponent(tabItem.id);
			 if(tabPanel.id== activeId){
				 if(tabPanel.classParam){
					var selicon = tabPanel.classParam.picselId; 
				 	tabPanel.setIconCls(selicon);	
				 };
				
			 }else{
				 if(tabPanel.classParam){
					 var unselicon = tabPanel.classParam.picunselId; 
					 tabPanel.setIconCls(unselicon);
				 }
			 }
			 	
		  });
}


}
