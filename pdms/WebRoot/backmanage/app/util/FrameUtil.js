Ext.namespace("frame.util");
Ext.namespace("frame.util.QuickMsg");
Ext.namespace("frame.util.Grid");
	/**
	 * 判断是否为空 或空串
	 */
frame.util.isNull=function(arg)
{
	if(arg==null||arg.toString().replace(/\ /g, '')==''||arg==''||arg==""||arg.toString()=='undefined'||typeof(arg)   ==   "undefined"||arg.toString()=='null'||arg.toString()=='NULL')
	{
		return true;
	}
	else{
		return false;
	}
};
frame.util.QuickMsg.showMsg = function(msg, title, keepTime) {
	Ext.create('Frame.ux.QuickMsg', {
		title : title,
		position : 'br',
		manager : 'demo1',
		iconCls : 'ux-notification-icon-information',
		autoCloseDelay : keepTime,
		spacing : 0,
		width : 200,
		height : 100,
		paddingX : 5,
		paddingY : 8,
		html : msg
	}).show();
};
frame.util.QuickMsg.showMsg2 = function(msg, title) {
	var titleMsg=frame.util.isNull(title)?(frame.lang.global.notice):title;
 	Ext.Msg.show( {
			        title : titleMsg,//'刷新确认',
			        msg : msg,
			        width:250,
			        buttons : Ext.Msg.CANCEL
			        });
};
frame.util.QuickMsg.operateSuccess = function(response, msg) {
	var result = Ext.decode(response.responseText);
	var info = frame.lang.global.operateSuccess;
	if (!frame.util.isNull(msg)) {
		info = info + " " + msg
	}
	frame.util.QuickMsg.showMsg(info);
}
/**
 * 失败提示
 * @param {Object} response 响应
 * @param {Object} msg  提示补充信息
 * @param {Object} title 提示头，用于替换frame.lang.global.operateFailure
 */
frame.util.QuickMsg.operateFailure = function(response, msg,title) {
	var result = Ext.decode(response.responseText);

	var info = (frame.util.isNull(title)?frame.lang.global.operateFailure:title)
			+ "!<br\>"
			+ (frame.util.isNull(result.returnMsg) ? "" : (frame.lang.global.cause+":"+result.returnMsg))
			+ (frame.util.isNull(result.exceptionCode) ? ""
					: ("!ErrorCode:" + result.exceptionCode));
	if (!frame.util.isNull(msg)) {
		info = info + " " + msg
	}
	
	frame.util.QuickMsg.showMsg(info);

};

/**
 *  双模式的失败提示
 * @param {Object} response 响应
 * @param {Object} msg  提示补充信息
 * @param {Object} title 提示头，用于替换frame.lang.global.operateFailure
 */
frame.util.QuickMsg.operateFailure2 = function(response, msg,title) {
	var result = Ext.decode(response.responseText);

	var info = (frame.util.isNull(title)?frame.lang.global.operateFailure:title)
			+ "!<br\>"
			+ (frame.util.isNull(result.returnMsg) ? "" : (frame.lang.global.cause+":"+result.returnMsg))
			+ (frame.util.isNull(result.exceptionCode) ? ""
					: ("!ErrorCode:" + result.exceptionCode));
	if (!frame.util.isNull(msg)) {
		info = info + " " + msg
	}
	
 	Ext.Msg.show( {
			        title : frame.lang.global.error,//'刷新确认',
			        msg : info,
			        width:250,
			        buttons : Ext.Msg.CANCEL
			        });
			   

};
/**
 * 检测对象是否被权限允许展现
 * @param {Object} object
 */
frame.util.checkPermission = function(object) {
	var permissionCode = object.permissionCode;
	if (permissionCode == null) {
		return true;
	}

	var permissionCodes = frame.logonUser.permissionCodes
	if (permissionCodes == null) {
		return false;
	} else {
		permissionCode = permissionCode.replace(/[ ]/g, "");
		if (Ext.Array.contains(permissionCodes, permissionCode)) {
			return true;
		} else {
			false;
		}
	}
};



frame.util.getScreen=function(){
	
var s = "";
s += " 网页可见区域宽："+ document.body.clientWidth;
s += " 网页可见区域高："+ document.body.clientHeight;
s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)";
s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)";
s += " 网页正文全文宽："+ document.body.scrollWidth;
s += " 网页正文全文高："+ document.body.scrollHeight;
s += " 网页被卷去的高(ff)："+ document.body.scrollTop;
s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop;
s += " 网页被卷去的左："+ document.body.scrollLeft;
s += " 网页正文部分上："+ window.screenTop;
s += " 网页正文部分左："+ window.screenLeft;
s += " 屏幕分辨率的高："+ window.screen.height;
s += " 屏幕分辨率的宽："+ window.screen.width;
s += " 屏幕可用工作区高度："+ window.screen.availHeight;
s += " 屏幕可用工作区宽度："+ window.screen.availWidth;
s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色";
s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸";
alert (s); 
	
	
};
/**
 * 对String 类型进行拓展
 * @param {Object} str
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
String.prototype.endWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length) {
		return false;
	}
	if (this.substring(this.length - str.length) == str) {
		return true;
	} else {
		return false;

	}
};
String.prototype.startWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length) {
		return false;
	}
	if (this.substr(0, str.length) == str) {
		return true;
	} else {
		return false;
	}
};

/**
 *  比较两个对象，如果新对象的属性值不等与旧对象，则返回改属性及其值。
 * 如果arg2 中的属性在arg1中不存在也返回该属性和值
 * arg1 ：旧对象
 * arg2：新对象
 */
frame.util.getChangedParam=function(arg1,arg2)
{
	var result={};
	if(frame.util.isNull(arg1))
	{
		return arg2;
	}
	for(key in arg2)
	{
			var newvalue=arg2[key];
			var oldvalue=arg1[key]
		if(frame.util.isNull(oldvalue))
		{
			if(!frame.util.isNull(newvalue))
			{
			   result[key]=newvalue;
			}
		}
		else{
		  if(!frame.util.isNull(newvalue))
		 {
		  if(newvalue.toString()!=oldvalue.toString())
		  {
			  result[key]=newvalue;
		  }
		 }
		}
	}
	return result;

};
/**
 * 判断JS对象属性的个数
 * @param {Object} args
 * @return {TypeName} 
 */
frame.util.getJsObjectSize=function(args)
{
	var size=0;
	if(frame.util.isNull(args))
	{
		return size;
	}
	for(key in args)
	{
		size=size+1;
	}
	return size;
   
}
/**
 * 获取GRID 一列数据
 * @param {Object} grid  
 * @param {Object} columnDataIndex
 * @param {Object}  排除的行
 * @return {TypeName} 
 */
frame.util.Grid.getColumnAllData=function(grid,columnDataIndex,excludeRows)
{
	   if(grid==null||columnDataIndex==null)
		   {
		     return null;
		   }
	     var columnValues=[];
	     
		  var rowNum=grid.getStore().getCount();
		 Ext.each(grid.columns,function(column)
		 {
			 var dataIndex=column.dataIndex;
			 if(dataIndex==columnDataIndex)
			{
			   for(var i=0;i<rowNum;i++)
			   {
				   if(!frame.util.isNull(excludeRows)&&Ext.Array.contains(excludeRows,i))
					 {
					   //该行数据被排除
					     continue;
					  }
				  var columnValue =grid.getStore().getAt(i).get(dataIndex);
				   if(!frame.util.isNull(columnValue))
				   {
				     columnValues.push(columnValue.toString());
				     }
		       }
			     return false;
			  
			 }
			 
	       });
		 return columnValues;
	
};
/** 获取grid中用户选择的记录 */
frame.util.Grid.getSelectedOne=function(grid)
{
	
	   if(frame.util.isNull(grid))
		 {
		    return null;
		 }
		var selects=[];
		 selects=grid.getSelectionModel( ).getSelection();
		if(selects==null||selects.length==0)
		{
			return null;
		}
		if(selects.length==1)
		{
			return selects[0];
		}
		if(selects.length>1)
		{
		var last = grid.getSelectionModel( ).getLastSelected();
		 if(Ext.Array.contains(selects,last))
		{
		  return last;
		}
		 else{
		
			return selects[0];
	
		 }
	  }
};


