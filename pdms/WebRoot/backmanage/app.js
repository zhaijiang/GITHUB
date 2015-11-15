Ext.onReady(function() {
	//sendUserHeartbeat();
	Ext.Loader.setConfig( {
		enable : true,
		paths : {
			//类名前缀:所在路径(相对于项目根路径)
		//设置目录映射'com'命名空间的类名将去app下寻找该类  
		'com' : jsBasePath+"app/"
	}
	});
	//解决 IE8 IE9 console未定义的BUG
		initConsole();
		//框架初始化
		
		loadJs();
		Ext.QuickTips.init();
		initFrame();
		console.debug("init frame complete");
		loadModule();
		console.debug("load module complete");
		

	});
/**
 * 心跳
 */
sendUserHeartbeat=function()
{
	setInterval(function() {
		Ext.Ajax.request( {
		url : basePath + 'LoginController/userHeartbeat.do',
		success : function(response) {
			var result = response.responseText;
			if(result.indexOf('logout')!=-1)
			{
				var url = basePath + 'index.jsp';
				if (FrameUserSelectLanguage != '') {
				url = url+ "?locale="+ FrameUserSelectLanguage;
				}
                window.location.href = url;
			}
		},
		failure : function() {
            
		}
	});
	}, frame.config.userHeartbeat * 1000);
};
	
/**
 * 加载第三方JS
 */
loadJs = function() {
	//Ext.Loader.loadScript(basePath + 'js/superMap/libs/SuperMap.Include.js');
	 // Ext.Loader.loadScript('http://api.map.baidu.com/api?v=2.0&ak=5dciyRjpyOcSjEsAe4wPH1zh');
};
/**
 * 解决IE无法使用console的BUG
 */
initConsole = function() {

	// window.console.debug('debug');window.console.info('info');window.console.warn('warn'); window.console.error('error'); window.console.log('log')

	var names = [ "log", "debug", "info", "warn", "error" ];
	if (!window.console) {
		window.console = {};
	}
	for ( var i = 0; i < names.length; i++) {
		if (!window.console[names[i]]) {
			window.console[names[i]] = function() {
			}
		}
	}

}
/**
 * 初始化框架
 */
initFrame = function() {
	 frame.logonUser={};
	frame.logonUser.userName='zj';
	frame.logonUser.userType=-1;
 frame.logonUser.permissionCodes=["common_system_systemManage",'frame_userRole_userManage','frame_userRole_NmsUserPanel',
                                  'frame_userRole_NmsRolePanel','frame_userRole_UiPermissionPanel'
                                  ,'frame_userRole_NmsRolePanel_NmsRolePanel_Grid_Add_BW','frame_userRole_NmsRolePanel_NmsRolePanel_Grid_Modify_BW','frame_userRole_NmsRolePanel_NmsRolePanel_Grid_Delete_BW'];
		//同步加载工具类
	Ext.syncRequire('com.util.FrameUtil');
	Ext.syncRequire('com.util.FrameLangUtil');
	frame.util.Lang.initFrameLangExt();
	//同步加载扩展组件
	Ext.syncRequire('com.frame.component.Ext-Plugin');
	Ext.require( [ 'com.frame.component.Form-Plugin',
			'com.frame.component.Frame-Plugin' ]);
	//同步加载中心面板类
	Ext.syncRequire( [ 'com.util.FrameCenterTabPanelUtil' ]);

	Ext.syncRequire('com.frame.component.Moment');

	Ext.syncRequire('com.frame.FrameInit');
	Ext.create("com.view.Viewport");

};

/**
 * 加载业务模块
 */
function loadModule() {

//	Ext.Ajax.request( {
//		//同步加载当前用户权限
//		async : false,
//		url : basePath + 'PermissionController/loadCurrentUserPermission.do',
//		params : {
//			data : Ext.encode(frame.logonUser.userName)
//		},
//		success : function(response) {
//			var result = Ext.decode(response.responseText);
//			if (result.success) {
//				console.debug("用户权限加载成功");
//				var permissionCodes = result.returnData;
//				if (permissionCodes != null && permissionCodes.length != 0) {
//					frame.logonUser.permissionCodes = permissionCodes;
//				} else {
//					console.debug("用户权限加载失败");
//
//				}
//
//			}
//		},
//		failure : function() {
//			console.debug("用户权限加载失败");
//
//		}
//	});
//	

    Ext.syncRequire("com.module.common.doctor.init");
	Ext.syncRequire("com.module.common.user.init");
	//Ext.syncRequire("com.module.common.monitor.init");
	//Ext.syncRequire("com.module.common.statistic.init");
	Ext.syncRequire("com.module.common.orders.init");
	Ext.syncRequire("com.module.frame.userRole.init");
	Ext.syncRequire("com.module.frame.systemlog.init");
//    // 初始化权限
//	Ext.Ajax.request( {
//		url : basePath + 'PermissionController/initPermission.do',
//		params : {
//			data : Ext.encode(frame.permissions)
//		},
//		success : function(response) {
//			var result = Ext.decode(response.responseText);
//			console.debug("init permission", result);
//
//			if (result.success) {
//				console.debug("初始化UI权限成功");
//				var permissionCodes = result.returnData;
//				if (permissionCodes != null && permissionCodes.length != 0) {
//					frame.logonUser.permissionCodes = permissionCodes;
//		
//	} else {
//		console.debug("初始化UI权限失败");
//
//	}
//	;
//}
//},
//failure : function() {
//console.debug("初始化UI权限失败");
//
//}
//});

};

