Ext
		.define(
				'Frame.ux.QuickMsg',
				{
					extend : 'Ext.window.Window',
					alias : 'widget.quickMsg',

					cls : 'ux-notification-window',
					autoClose : true,
					autoHeight : true,
					plain : false,
					draggable : false,
					shadow : false,
					focus : Ext.emptyFn,

					// For alignment and to store array of rendered notifications. Defaults to document if not set.
					manager : null,

					useXAxis : false,

					// Options: br, bl, tr, tl, t, l, b, r
					position : 'br',

					// Pixels between each notification
					spacing : 6,

					// Pixels from the managers borders to start the first notification
					paddingX : 30,//右边距
					paddingY : 10,

					slideInAnimation : 'easeIn',
					slideBackAnimation : 'bounceOut',
					slideInDuration : 1500,
					slideBackDuration : 1000,
					hideDuration : 500,
					autoCloseDelay : 7000,
					stickOnClick : true,
					stickWhileHover : true,

					// Private. Do not override!
					isHiding : false,
					readyToHide : false,
					destroyAfterHide : false,
					closeOnMouseOut : false,

					// Caching coordinates to be able to align to final position of siblings being animated
					xPos : 0,
					yPos : 0,

					statics : {
						defaultManager : {
							el : null
						}
					},

					initComponent : function() {
						var me = this;
						if (me.autoCloseDelay == null
								|| me.autoCloseDelay == '') {
							me.autoCloseDelay = 3000;
						}
						if (me.title == null || me.title == '') {
							me.title = frame.lang.global.notice;
						}
						// Backwards compatibility
						if (Ext.isDefined(me.corner)) {
							me.position = me.corner;
						}
						if (Ext.isDefined(me.slideDownAnimation)) {
							me.slideBackAnimation = me.slideDownAnimation;
						}
						if (Ext.isDefined(me.autoDestroyDelay)) {
							me.autoCloseDelay = me.autoDestroyDelay;
						}
						if (Ext.isDefined(me.autoHideDelay)) {
							me.autoCloseDelay = me.autoHideDelay;
						}
						if (Ext.isDefined(me.autoHide)) {
							me.autoClose = me.autoHide;
						}
						if (Ext.isDefined(me.slideInDelay)) {
							me.slideInDuration = me.slideInDelay;
						}
						if (Ext.isDefined(me.slideDownDelay)) {
							me.slideBackDuration = me.slideDownDelay;
						}
						if (Ext.isDefined(me.fadeDelay)) {
							me.hideDuration = me.fadeDelay;
						}

						// 'bc', lc', 'rc', 'tc' compatibility
						me.position = me.position.replace(/c/, '');

						me.updateAlignment(me.position);

						me.setManager(me.manager);

						me.callParent(arguments);
					},

					onRender : function() {
						var me = this;

						me.el.hover(function() {
							me.mouseIsOver = true;
						}, function() {
							me.mouseIsOver = false;
							if (me.closeOnMouseOut) {
								me.closeOnMouseOut = false;
								me.close();
							}
						}, me);

						this.callParent(arguments);

					},

					updateAlignment : function(position) {
						var me = this;

						switch (position) {
						case 'br':
							me.paddingFactorX = -1;
							me.paddingFactorY = -1;
							me.siblingAlignment = "br-br";
							if (me.useXAxis) {
								me.managerAlignment = "bl-br";
							} else {
								me.managerAlignment = "tr-br";
							}
							break;
						case 'bl':
							me.paddingFactorX = 1;
							me.paddingFactorY = -1;
							me.siblingAlignment = "bl-bl";
							if (me.useXAxis) {
								me.managerAlignment = "br-bl";
							} else {
								me.managerAlignment = "tl-bl";
							}
							break;
						case 'tr':
							me.paddingFactorX = -1;
							me.paddingFactorY = 1;
							me.siblingAlignment = "tr-tr";
							if (me.useXAxis) {
								me.managerAlignment = "tl-tr";
							} else {
								me.managerAlignment = "br-tr";
							}
							break;
						case 'tl':
							me.paddingFactorX = 1;
							me.paddingFactorY = 1;
							me.siblingAlignment = "tl-tl";
							if (me.useXAxis) {
								me.managerAlignment = "tr-tl";
							} else {
								me.managerAlignment = "bl-tl";
							}
							break;
						case 'b':
							me.paddingFactorX = 0;
							me.paddingFactorY = -1;
							me.siblingAlignment = "b-b";
							me.useXAxis = 0;
							me.managerAlignment = "t-b";
							break;
						case 't':
							me.paddingFactorX = 0;
							me.paddingFactorY = 1;
							me.siblingAlignment = "t-t";
							me.useXAxis = 0;
							me.managerAlignment = "b-t";
							break;
						case 'l':
							me.paddingFactorX = 1;
							me.paddingFactorY = 0;
							me.siblingAlignment = "l-l";
							me.useXAxis = 1;
							me.managerAlignment = "r-l";
							break;
						case 'r':
							me.paddingFactorX = -1;
							me.paddingFactorY = 0;
							me.siblingAlignment = "r-r";
							me.useXAxis = 1;
							me.managerAlignment = "l-r";
							break;
						}
					},

					getXposAlignedToManager : function() {
						var me = this;

						var xPos = 0;

						// Avoid error messages if the manager does not have a dom element
						if (me.manager && me.manager.el && me.manager.el.dom) {
							if (!me.useXAxis) {
								// Element should already be aligned verticaly
								return me.el.getLeft();
							} else {
								// Using getAnchorXY instead of getTop/getBottom should give a correct placement when document is used
								// as the manager but is still 0 px high. Before rendering the viewport.
								if (me.position == 'br' || me.position == 'tr'
										|| me.position == 'r') {
									xPos += me.manager.el.getAnchorXY('r')[0];
									xPos -= (me.el.getWidth() + me.paddingX);
								} else {
									xPos += me.manager.el.getAnchorXY('l')[0];
									xPos += me.paddingX;
								}
							}
						}

						return xPos;
					},

					getYposAlignedToManager : function() {
						var me = this;

						var yPos = 0;

						// Avoid error messages if the manager does not have a dom element
						if (me.manager && me.manager.el && me.manager.el.dom) {
							if (me.useXAxis) {
								// Element should already be aligned horizontaly
								return me.el.getTop();
							} else {
								// Using getAnchorXY instead of getTop/getBottom should give a correct placement when document is used
								// as the manager but is still 0 px high. Before rendering the viewport.
								if (me.position == 'br' || me.position == 'bl'
										|| me.position == 'b') {
									yPos += me.manager.el.getAnchorXY('b')[1];
									yPos -= (me.el.getHeight() + me.paddingY);
								} else {
									yPos += me.manager.el.getAnchorXY('t')[1];
									yPos += me.paddingY;
								}
							}
						}

						return yPos;
					},

					getXposAlignedToSibling : function(sibling) {
						var me = this;

						if (me.useXAxis) {
							if (me.position == 'tl' || me.position == 'bl'
									|| me.position == 'l') {
								// Using sibling's width when adding
								return (sibling.xPos + sibling.el.getWidth() + sibling.spacing);
							} else {
								// Using own width when subtracting
								return (sibling.xPos - me.el.getWidth() - me.spacing);
							}
						} else {
							return me.el.getLeft();
						}

					},

					getYposAlignedToSibling : function(sibling) {
						var me = this;

						if (me.useXAxis) {
							return me.el.getTop();
						} else {
							if (me.position == 'tr' || me.position == 'tl'
									|| me.position == 't') {
								// Using sibling's width when adding
								return (sibling.yPos + sibling.el.getHeight() + sibling.spacing);
							} else {
								// Using own width when subtracting
								return (sibling.yPos - me.el.getHeight() - sibling.spacing);
							}
						}
					},

					getNotifications : function(alignment) {
						var me = this;

						if (!me.manager.notifications[alignment]) {
							me.manager.notifications[alignment] = [];
						}

						return me.manager.notifications[alignment];
					},

					setManager : function(manager) {
						var me = this;

						me.manager = manager;

						if (typeof me.manager == 'string') {
							me.manager = Ext.getCmp(me.manager);
						}

						// If no manager is provided or found, then the static object is used and the el property pointed to the body document.
						if (!me.manager) {
							me.manager = me.statics().defaultManager;

							if (!me.manager.el) {
								me.manager.el = Ext.getBody();
							}
						}

						if (typeof me.manager.notifications == 'undefined') {
							me.manager.notifications = {};
						}
					},

					beforeShow : function() {
						var me = this;

						if (me.stickOnClick) {
							if (me.body && me.body.dom) {
								Ext.fly(me.body.dom).on('click', function() {
									me.cancelAutoClose();
									me.addCls('notification-fixed');
								}, me);
							}
						}

						if (me.autoClose) {
							me.task = new Ext.util.DelayedTask(me.doAutoClose,
									me);
							me.task.delay(me.autoCloseDelay);
						}

						// Shunting offscreen to avoid flicker
						me.el.setX(-10000);
						me.el.setOpacity(1);

					},

					afterShow : function() {
						var me = this;

						var notifications = me
								.getNotifications(me.managerAlignment);

						if (notifications.length) {
							me.el.alignTo(
									notifications[notifications.length - 1].el,
									me.siblingAlignment, [ 0, 0 ]);
							me.xPos = me
									.getXposAlignedToSibling(notifications[notifications.length - 1]);
							me.yPos = me
									.getYposAlignedToSibling(notifications[notifications.length - 1]);
						} else {
							me.el.alignTo(me.manager.el, me.managerAlignment, [
									(me.paddingX * me.paddingFactorX),
									(me.paddingY * me.paddingFactorY) ], false);
							me.xPos = me.getXposAlignedToManager();
							me.yPos = me.getYposAlignedToManager();
						}

						Ext.Array.include(notifications, me);

						me.el.animate( {
							to : {
								x : me.xPos,
								y : me.yPos,
								opacity : 1
							},
							easing : me.slideInAnimation,
							duration : me.slideInDuration,
							dynamic : true
						});

						this.callParent(arguments);
					},

					slideBack : function() {
						var me = this;

						var notifications = me
								.getNotifications(me.managerAlignment);
						var index = Ext.Array.indexOf(notifications, me)

						// Not animating the element if it already started to hide itself or if the manager is not present in the dom
						if (!me.isHiding && me.el && me.manager
								&& me.manager.el && me.manager.el.dom
								&& me.manager.el.isVisible()) {

							if (index) {
								me.xPos = me
										.getXposAlignedToSibling(notifications[index - 1]);
								me.yPos = me
										.getYposAlignedToSibling(notifications[index - 1]);
							} else {
								me.xPos = me.getXposAlignedToManager();
								me.yPos = me.getYposAlignedToManager();
							}

							me.stopAnimation();

							me.el.animate( {
								to : {
									x : me.xPos,
									y : me.yPos
								},
								easing : me.slideBackAnimation,
								duration : me.slideBackDuration,
								dynamic : true
							});
						}
					},

					cancelAutoClose : function() {
						var me = this;

						if (me.autoClose) {
							me.task.cancel();
						}
					},

					doAutoClose : function() {
						var me = this;

						if (!(me.stickWhileHover && me.mouseIsOver)) {
							// Close immediately
							me.close();
						} else {
							// Delayed closing when mouse leaves the component.
							me.closeOnMouseOut = true;
						}
					},

					removeFromManager : function() {
						var me = this;

						if (me.manager) {
							var notifications = me
									.getNotifications(me.managerAlignment);
							var index = Ext.Array.indexOf(notifications, me);
							if (index != -1) {
								Ext.Array.erase(notifications, index, 1);

								// Slide "down" all notifications "above" the hidden one
								for (; index < notifications.length; index++) {
									notifications[index].slideBack();
								}
							}
						}
					},

					hide : function() {
						var me = this;

						// Avoids restarting the last animation on an element already underway with its hide animation
					if (!me.isHiding && me.el) {

						me.isHiding = true;

						me.cancelAutoClose();
						me.stopAnimation();

						me.el.animate( {
							to : {
								opacity : 0
							},
							easing : 'easeIn',
							duration : me.hideDuration,
							dynamic : false,
							listeners : {
								afteranimate : function() {
									me.removeFromManager();
									me.readyToHide = true;
									me.hide(me.animateTarget, me.doClose, me);
								}
							}
						});
					}

					// Calling parent's hide function to complete hiding
					if (me.readyToHide) {
						me.isHiding = false;
						me.readyToHide = false;
						me.removeCls('notification-fixed');
						me.callParent(arguments);
						if (me.destroyAfterHide) {
							me.destroy();
						}
					}
				},

				destroy : function() {
					var me = this;

					if (!me.hidden) {
						me.destroyAfterHide = true;
						me.hide(me.animateTarget, me.doClose, me);
					} else {
						me.callParent(arguments);
					}
				}

				});

/**      
 * 对Date的扩展，将 Date 转化为指定格式的String      
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
 * eg:      
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */
Date.prototype.pattern = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, //月份         
		"d+" : this.getDate(), //日         
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
		"H+" : this.getHours(), //小时         
		"m+" : this.getMinutes(), //分         
		"s+" : this.getSeconds(), //秒         
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度         
		"S" : this.getMilliseconds()
	//毫秒         
	};
	var week = {
	
//		"0" : "周日",
//		"1" : "周一",
//		"2" : "周二",
//		"3" : "周三",
//		"4" : "周四",
//		"5" : "周五",
//		"6" : "周六"
	

	    "0" : frame.lang.global.date_sun,
		"1" : frame.lang.global.date_mon,
		"2" : frame.lang.global.date_tue,
		"3" : frame.lang.global.date_web,
		"4" : frame.lang.global.date_thu,
		"5" : frame.lang.global.date_fri,
		"6" : frame.lang.global.date_sat
	};
	       
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;     
};




/**
 * 带时分秒的时间控件选择器
 * @author
 */
Ext.define('Frame.form.datetime.DateTimePicker', {
    extend: 'Ext.picker.Date',
    alias: 'widget.datetimepicker',
    alternateClassName: 'Ext.DateTimePicker',
    renderTpl: [
        '<div id="{id}-innerEl" role="grid">',
            '<div role="presentation" class="{baseCls}-header">',
                 // the href attribute is required for the :hover selector to work in IE6/7/quirks
                '<a id="{id}-prevEl" class="{baseCls}-prev {baseCls}-arrow" href="#" role="button" title="{prevText}" hidefocus="on" ></a>',
                '<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
                 // the href attribute is required for the :hover selector to work in IE6/7/quirks
                '<a id="{id}-nextEl" class="{baseCls}-next {baseCls}-arrow" href="#" role="button" title="{nextText}" hidefocus="on" ></a>',
            '</div>',
            '<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="grid">',
                '<thead role="presentation"><tr role="row">',
                    '<tpl for="dayNames">',
                        '<th role="columnheader" class="{parent.baseCls}-column-header" title="{.}">',
                            '<div class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
                        '</th>',
                    '</tpl>',
                '</tr></thead>',
                '<tbody role="presentation"><tr role="row">',
                    '<tpl for="days">',
                        '{#:this.isEndOfWeek}',
                        '<td role="gridcell" id="{[Ext.id()]}">',
                            // the href attribute is required for the :hover selector to work in IE6/7/quirks
                            '<a role="button" hidefocus="on" class="{parent.baseCls}-date" href="#"></a>',
                        '</td>',
                    '</tpl>',
                '</tr></tbody>',
            '</table>',
            '<tpl if="showToday">',
                '<div id="{id}-footerEl" role="presentation" style="background-color:#D9E5F3;border-top:1px solid #99BCE8;">',
                	'<table class="{baseCls}-inner" cellspacing="0" role="grid">',
                		'<tr role="row">',
                			'<td colspan="1">',
                				'{%this.renderHour(values, out)%}',
                			'</td>',
                			'<td colspan="1">',
                				'{%this.renderMinute(values, out)%}',
                			'</td>',
                			'<td colspan="1">',
                				'{%this.renderSecond(values, out)%}',
                			'</td>',
                		'</tr>',
                		'<tr role="row"><td colspan="3"><center>{%this.renderTodayBtn(values, out)%}</center></td></tr>',
                	'</table>',
                '</div>',
            '</tpl>',
        '</div>',
        {
            firstInitial: function(value) {
                return value.substr(0,1);
            },
            isEndOfWeek: function(value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            longDay: function(value){
                return Ext.Date.format(value, this.longDayFormat);
            },
            renderHour: function(values, out) {
            	//out.push('<font style="float:left;">&nbsp</font>');
                Ext.DomHelper.generateMarkup(values.$comp.hour.getRenderTree(), out);
            },
            renderMinute: function(values, out) {
            	//out.push('<font  style="float : left;font-weight:bold;">&nbsp:&nbsp&nbsp</font>');
                Ext.DomHelper.generateMarkup(values.$comp.minute.getRenderTree(), out);
            },
            renderSecond: function(values, out) {
            	//out.push('<font style="float : left;font-weight:bold;">&nbsp:&nbsp&nbsp</font>');
                Ext.DomHelper.generateMarkup(values.$comp.second.getRenderTree(), out);
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],
    /**
     * 创建时分秒控件
     */
    beforeRender: function () {
        /**---------------------*/
        var me = this;
        me.hour = Ext.create('Ext.form.field.Number', {
            scope: me,
            ownerCt: me,
            editable : false,
            ownerLayout: me.getComponentLayout(),
           	minValue: 0,
           	maxValue: 23,
           	width: 65,
           	hideTrigger	: false ,			//隐藏微调按钮
           	style : {
           		margin:'0 0 0 5'
           	}
           	/*
           	enableKeyEvents: true,
           	listeners: {
                 keyup: function(field, e){
                     if (field.getValue() > 23){
                         e.stopEvent();
                         field.setValue(23);
                     }
                 }
             }*/
        });
        
        me.minute = Ext.create('Ext.form.field.Number', {
            scope: me,
            ownerCt: me,
           	style : {
           		margin:'0 0 0 3'
           	},
            ownerLayout: me.getComponentLayout(),
        	minValue: 0,
        	maxValue: 59,
            editable : false,
            hideTrigger	: false ,			//隐藏微调按钮
        	width: 65
        	/*
        	enableKeyEvents: true,
        	listeners: {
                keyup: function(field, e){
                    if (field.getValue() > 59){
                        e.stopEvent();
                        field.setValue(59);
                    }
                }
            }*/
        });
        
      me.second = Ext.create('Ext.form.field.Number', {
            scope: me,
            ownerCt: me,
            editable : false,
           	style : {
           		margin:'0 0 0 3'
           	},
            ownerLayout: me.getComponentLayout(),
        	minValue: 0,
        	maxValue: 59,
        	hideTrigger	: false ,			//隐藏微调按钮
        	width: 65
        	/*
        	enableKeyEvents: true,
        	listeners: {
                keyup: function(field, e){
                    if (field.getValue() > 59){
                        e.stopEvent();
                        field.setValue(59);
                    }
                }
            }*/
        });
        
        me.callParent();
    },

    /**
     * 渲染时分秒控件
     */
    finishRenderChildren: function () {
        this.callParent();
        /**--------------------------------------*/
        this.hour.finishRender();
        this.minute.finishRender();
        this.second.finishRender();
        /**--------------------------------------*/
    },
    /**
     * Update the contents of the picker
     * @private
     * @param {Date} date The new date
     * @param {Boolean} forceRefresh True to force a full refresh
     */
    update : function(date, forceRefresh){
        var me = this;
		/**-----------设置时分秒----------------*/
        date.setHours(me.hour.getValue());
    	date.setMinutes(me.minute.getValue());
    	date.setSeconds(me.second.getValue());
		/**-----------设置时分秒----------------*/
    	
        me.callParent(arguments);
    }
}, 
function(){
	var proto = this.prototype;
    Ext.Date.dayNames = [
     /*          
           * "0",
           "1",
           "2",
           "3",
           "4",
           "5",
           "6"
    	*/
    	frame.lang.global.date_sun,
		frame.lang.global.date_mon,
	    frame.lang.global.date_tue,
		frame.lang.global.date_web,
		frame.lang.global.date_thu,
	    frame.lang.global.date_fri,
		frame.lang.global.date_sat
    ];
    proto.dayNames = Ext.Date.dayNames;

    proto.format = Ext.Date.defaultFormat;
}
);


/**
 * 带时分秒的日期控件
 * @author
 */
Ext.define('Frame.form.datetime.DateTime', {
    extend:'Ext.form.field.Date',
    alias: 'widget.datetimefield',
    requires: ['Frame.form.datetime.DateTimePicker'],
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'form-date-trigger',
    editable : false,
    format : 'Y-m-d H:i:s',
    hideTrigger1:true,
    /**
     * 添加清除按钮
     */
    initComponent: function() {  	
    	var me = this;
		me.onTrigger2Click = Ext.clone(me.onTrigger1Click);
		me.onTrigger1Click = function(){
			me.reset();
		};
		
		me.callParent(arguments);
    },
    /**
     * 创建时间选择器
     * @return {}
     */
    createPicker: function() {
        var me = this,
         format = Ext.String.format;
        return new Frame.form.datetime.DateTimePicker({
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                scope: me,
                select: me.onSelect
            },
            keyNavConfig: {
                esc: function() {
                    me.collapse();
                }
            }
        });
    },
    /**
     * 控制按钮的显隐
     */
    afterRender: function(){
        this.callParent();
        if(this.hideTrigger1){//隐藏清除按钮
        	this.triggerCell.item(0).setDisplayed(false);
        }
        if(this.hideTrigger2){//隐藏选择按钮
        	this.triggerCell.item(1).setDisplayed(false);
        }
    },

    /**
     * @private
     * 设置选择器的值
     */
    onExpand: function() {
        var me = this,
            value = me.getValue() instanceof Date ? me.getValue() : new Date();
        me.picker.setValue(value);
        
        me.picker.hour.setValue(value.getHours());
        me.picker.minute.setValue(value.getMinutes());
        me.picker.second.setValue(value.getSeconds());
    }
});


Ext.define("Frame.ux.DateYMD",{
	extend:'Ext.container.Container',
    layout:'hbox',	
    alias:'widget.DateYMD',
	initComponent:function()
	{
		var me=this;
		var year = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel : "年",
			name : 'logSource',
			width:100,
			labelWidth:20,
			displayField : 'name',
			valueField : 'value',
			queryMode : 'local',
			editable : false,
			store : Ext.create('Ext.data.ArrayStore', {
				fields : [ 'name', 'value' ],
				data : [ [ '2015', 2015 ], [ '2016', 2016 ], [ '2017', 2017 ],[ '2018', 2018 ], [ '2019', 2020 ] ]

			})					

		});
		var month = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel : "月",
			name : 'logSource',
			labelWidth:20,
			width:100,
			displayField : 'name',
			valueField : 'value',
			queryMode : 'local',
			editable : false,
			store : Ext.create('Ext.data.ArrayStore', {
				fields : [ 'name', 'value' ],
				data : [ [ '1', 1 ], [ '2', 2 ], [ '3', 3 ],[ '4', 4 ], [ '5', 5 ],[ '6', 6 ], [ '7', 7], [ '8',8 ],[ '9',9 ], [ '10',10 ],
				         [ '11', 11 ], [ '12', 12 ]
		
				]

			})					

		});
		var day = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel : "日",
			name : 'logSource',
			labelWidth:20,
			width:100,
			displayField : 'name',
			valueField : 'value',
			queryMode : 'local',
			editable : false,
			store : Ext.create('Ext.data.ArrayStore', {
				fields : [ 'name', 'value' ],
				data : [ [ '1', 1 ], [ '2', 2 ], [ '3', 3 ],[ '4', 4 ], [ '5', 5 ],[ '6', 6 ], [ '7', 7], [ '8',8 ],[ '9',9 ], [ '10',10 ],
				         [ '11', 11 ], [ '12', 12 ], [ '13', 13 ],[ '14', 14 ], [ '15', 15 ],[ '16', 16 ], [ '17', 17], [ '18',18 ],[ '19',19 ], [ '20',20 ],
				         [ '21', 21 ], [ '22', 12 ], [ '23', 13 ],[ '24', 14 ], [ '25', 15 ],[ '26', 16 ], [ '27', 17], [ '28',18 ],[ '29',19 ], [ '30',30 ], [ '31',31 ]
				]


			})					

		});
		
		me.items=[year,month,day];
		me.year=year;
		me.month=month;
		me.day=day;
		me.callParent();
	}
})

