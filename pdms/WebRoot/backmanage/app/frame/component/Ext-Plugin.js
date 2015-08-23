/** 重写EXT BUTTON 组件  添加按钮权限 每一个button 在加载时都会进行权限判断*/
Ext.override(Ext.AbstractComponent, {
	initComponent : function() {

	var me=this;
	   if(me.$className.indexOf('Ext.form.field.')!=-1)
	   {
		   //如果组件可用
		    if(me.readOnly===true)
			{
			   //me.style='background:#EEEEEE';
			  me.fieldStyle=frame.config.formFieldReadOnlyCss;
			}
		 };
		  if(me.$className=='Ext.button.Button')
			 {
			  if('今天'===me.text||'Today'===me.text)
			   {
				  return;
			   }
			  //repeatClick是否能重复点击 true 表示可以 false 表示不行
			  if(me.repeatClick==null||me.repeatClick===false)
			  {
			    me.on('click',function()
			    	{
			    	if(me.isDisabled()==false)
			    	{
			    	  me.setDisabled(true);
			    	  setTimeout(function()
			    		  {
			    		   if(me)
			    			{
			    			   if(me.isDestroyed!=null&&me.isDestroyed===true)
			    			  {
			    				   //组件已经销毁
			    				   return;
			    			  }
			    		  	me.setDisabled(false);
			    		  	
			    		  	}
			    		  },frame.config.buttonRepeatClickInterval);
			    	 }
			    	
			    	});
			   }
			       
			 }
		me.callParent(arguments);
		if (!frame.util.checkPermission(me)) {
			me.hidden = true;
			console.debug(me.text);

			me.destroy();
		}
	

	}
});
Ext.data.NodeInterface.prototype.beforeinsert = function(e) {
	/** 
	  重写该方法，每双击一个节点树时弹出一个消息框 
	 */
	alert('Ext.tree.TreeNodeUI.prototype.onDblClick');

}
Ext.override(Ext.window.Window, {
	beforeshow : function(t) {

		alert(t);

	}
});

/** 
 * 处理Grid重新加载过后selectionModel中的记录不更新的问题 
 * me.selected中存放的是选中的记录的集合 
 */
Ext.override(Ext.selection.Model, {
	onStoreLoad : function(store, records, successful, eOpts) {
		var me = this, length = me.selected.getCount();

		//如果没有选中的记录，则不需要进行任何的操作  
		if (length === 0)
			return;

		//遍历selected并更新其中的记录  
		me.selected.eachKey(function(key, item) {
			var model = store.getById(key);

			//如果获取到了model就更新，否则从selected中移除  
				if (model) {
					me.selected.add(model);//add时会覆盖掉原来的值  
				} else {
					me.selected.removeAtKey(key);
				}
			})

	}
});


/** 校验两个field的值是否一致。用于确认密码与原密码是否一致*/
 
　Ext.form.Field.prototype.msgTarget='side';
  //提示的方式，枚举值为"qtip","title","under","side",id(元素id)
　　//side方式用的较多，右边出现红色感叹号，鼠标上去出现错误提示，其他的我就不介绍了，可自行验证
　　//大家可以分别去掉这两行代码，看效果就会明白他们的作用，（放在onReady的function（）{}中）
     Ext.apply(Ext.form.VTypes, {  
         checkSame: function(val, field) {     //返回true，则验证通过，否则验证失败  
                 var cmp = Ext.getCmp(field.targetCmpId);   //通过targetCmpId的字段查找组件  
                 if (Ext.isEmpty(cmp)) {      //如果组件（表单）不存在，提示错误  
                     Ext.MessageBox.show({  
                         title: '错误',  
                         msg: '发生异常错误，指定的组件未找到',  
                         icon: Ext.Msg.ERROR,  
                         buttons: Ext.Msg.OK  
                     });  
                     return false;  
                 }  
                 if (val == cmp.getValue()) {  //取得目标组件（表单）的值，与宿主表单的值进行比较。  
                     return true;  
                 } else {  
                     return false;  
                 }  
         }, 
          isMultiple: function(val, field) {     //返回true，则验证通过，否则验证失败  
                 var targetNumber =field.targetNumber;
                 if(val==0)
                {
                	 return true;
                }
                 else{
                	  if(val%targetNumber==0)
                	{
                		  return true
                	}
                	else{
                		return false;
                	}
                 }
         },
          terminalVlanPoolCheck:function(val,field)
        {
        	 
             var vlanlistRe=/^(([0-9:]+)|([0-9-]+))$/;
        	 var vlanList=field.getValue();
        	 var checkResult=true;
        	 if(vlanlistRe.test(vlanList))
        	{
        	     return true;
        	 }
        	else{
        	 return false;
        	 }
        	 
        
        	  
        	
        	
        
        	
        },
        terminalVlanListCheck:function(val,field)
        {
        	 
             var vlanlistRe=/^[0-9:]+$/;
        	 var vlanList=field.getValue();
        	 if(!vlanlistRe.test(vlanList))
        	{
        	
        		return false;
        	 }
        
        	 if(vlanList.toString().endWith(":"))
        	{
        		vlanList= vlanList.toString().substring(0,vlanList.toString().length-1)
        	}
        	 var vlanArray=[];
        	   vlanArray=vlanList.toString().split(":");
        	   var vlanNum=0;
        	   for(var i=0;i<vlanArray.length;i++)
        		 {
        		   var vlan=vlanArray[i];
        		   if((/^[0-9]+$/).test(vlan))
        			{
        			   vlanNum++;
        			}
        		   else{
        			 return false
        		   }
        		   
        		 }
        	   if(vlanNum>8)
        	{
        		   return false;
        	}
        	  else{
        		   return true;
        	 }
        }
     });  


     
     /**
      * Plugin for adding a close context menu to tabs. Note that the menu respects
      * the closable configuration on the tab. As such, commands like remove others
      * and remove all will not remove items that are not closable.
      */
     Ext.define('Ext.ux.TabCloseMenu', {
         alias: 'plugin.tabclosemenu',

         mixins: {
             observable: 'Ext.util.Observable'
         },

         /**
          * @cfg {String} closeTabText
          * The text for closing the current tab.
          */
         closeTabText: 'Close Tab',

         /**
          * @cfg {Boolean} showCloseOthers
          * Indicates whether to show the 'Close Others' option.
          */
         showCloseOthers: true,

         /**
          * @cfg {String} closeOthersTabsText
          * The text for closing all tabs except the current one.
          */
         closeOthersTabsText: 'Close Other Tabs',

         /**
          * @cfg {Boolean} showCloseAll
          * Indicates whether to show the 'Close All' option.
          */
         showCloseAll: true,

         /**
          * @cfg {String} closeAllTabsText
          * <p>The text for closing all tabs.
          */
         closeAllTabsText: 'Close All Tabs',

         /**
          * @cfg {Array} extraItemsHead
          * An array of additional context menu items to add to the front of the context menu.
          */
         extraItemsHead: null,

         /**
          * @cfg {Array} extraItemsTail
          * An array of additional context menu items to add to the end of the context menu.
          */
         extraItemsTail: null,

         //public
         constructor: function (config) {
             this.addEvents(
                 'aftermenu',
                 'beforemenu');

             this.mixins.observable.constructor.call(this, config);
         },

         init : function(tabpanel){
             this.tabPanel = tabpanel;
             this.tabBar = tabpanel.down("tabbar");

             this.mon(this.tabPanel, {
                 scope: this,
                 afterlayout: this.onAfterLayout,
                 single: true
             });
         },

         onAfterLayout: function() {
             this.mon(this.tabBar.el, {
                 scope: this,
                 contextmenu: this.onContextMenu,
                 delegate: '.x-tab'
             });
         },

         onBeforeDestroy : function(){
             Ext.destroy(this.menu);
             this.callParent(arguments);
         },

         // private
         onContextMenu : function(event, target){
             var me = this,
                 menu = me.createMenu(),
                 disableAll = true,
                 disableOthers = true,
                 tab = me.tabBar.getChildByElement(target),
                 index = me.tabBar.items.indexOf(tab);

             this.item = me.tabPanel.getComponent(index);
             me.selectedTab = me.tabPanel.getComponent(index);
             menu.child('*[text="' + me.closeTabText + '"]').setDisabled(!me.item.closable);

             if (me.showCloseAll || me.showCloseOthers) {
                 me.tabPanel.items.each(function(item) {
                     if (item.closable) {
                         disableAll = false;
                         if (item != me.item) {
                             disableOthers = false;
                             return false;
                         }
                     }
                     return true;
                 });

                 if (me.showCloseAll) {
                     menu.child('*[text="' + me.closeAllTabsText + '"]').setDisabled(disableAll);
                 }

                 if (me.showCloseOthers) {
                     menu.child('*[text="' + me.closeOthersTabsText + '"]').setDisabled(disableOthers);
                 }
             }

             event.preventDefault();
             me.fireEvent('beforemenu', menu, me.item, me);

             menu.showAt(event.getXY());
         },

         createMenu : function() {
             var me = this;

             if (!me.menu) {
                 var items = [{
                     text: me.closeTabText,
                     scope: me,
                     handler: me.onClose
                 }];

                 if (me.showCloseAll || me.showCloseOthers) {
                     items.push('-');
                 }

                 if (me.showCloseOthers) {
                     items.push({
                         text: me.closeOthersTabsText,
                         scope: me,
                         handler: me.onCloseOthers
                     });
                 }

                 if (me.showCloseAll) {
                     items.push({
                         text: me.closeAllTabsText,
                         scope: me,
                         handler: me.onCloseAll
                     });
                 }

                 if (me.extraItemsHead) {
                     items = me.extraItemsHead.concat(items);
                 }

                 if (me.extraItemsTail) {
                     items = items.concat(me.extraItemsTail);
                 }

                 me.menu = Ext.create('Ext.menu.Menu', {
                     items: items,
                     listeners: {
                         hide: me.onHideMenu,
                         scope: me
                     }
                 });
             }

             return me.menu;
         },

         onHideMenu: function () {
             var me = this;

             me.item = null;
             me.fireEvent('aftermenu', me.menu, me);
         },

         onClose : function(){
             this.tabPanel.remove(this.selectedTab);
         },

         onCloseOthers : function(){
             this.doClose(true);
         },

         onCloseAll : function(){
             this.doClose(false);
         },

         doClose : function(excludeActive){
              var items = [];

              this.tabPanel.items.each(function(item){
                  if(item.closable){
                      if(!excludeActive || item != this.selectedTab){
                          items.push(item);
                      }
                  }
              }, this);

              Ext.each(items, function(item){
                  this.tabPanel.remove(item);
              }, this);
          }
     });


