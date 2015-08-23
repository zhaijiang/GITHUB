/**
 *调用模块注册方法，注册模块
 */

frame.registerModule( {
	//一级模块名称
	text : frame.lang.common.system.systemManage,
	//权限编码。固定以模块名+'ManageName' 定义
	permissionCode : 'common_system_systemManage',
	//一级子模块
	children : [ 
	{
	    //二级模块名称
		text : frame.lang.frame.userRole.userManage,
		//权限编码。固定以模块名+'ModuleName1'定义 .如果有多个 则以模块名+'ModuleName2'依次下去
		permissionCode : 'frame_userRole_userManage',	
		//二级模块子界面
		children : [ {
			//用户界面名称
			text : frame.lang.frame.userRole.userPanel,
			//权限编码。模块名+js文件名
			permissionCode : 'frame_userRole_NmsUserPanel',
			//类初始化参数
			classParam : {
				picselId:'userTabsel',
				picunselId:'userTabunsel'
			},
			//用户界面对应的类名
			className : 'com.module.frame.userRole.NmsUserPanel'
		}, 
		{
			//用户界面名称
			text :frame.lang.frame.userRole.currentUser,
			//类初始化参数
			classParam : {
				picselId:'userTabsel',
				picunselId:'userTabunsel'
			},
			//用户界面对应的类名
			className : 'com.module.frame.userRole.CurrentUserPanel'
		},{
			//角色界面名称
			text : frame.lang.frame.userRole.rolePanel,
			//权限编码。模块名+js文件名
			permissionCode : 'frame_userRole_NmsRolePanel',
			//类初始化参数
			classParam : {
				a : 'zzzzzzzzzzaaaaaaaaaaaaaaaa'
			},
			//角色界面对应的类名
			className : 'com.module.frame.userRole.NmsRolePanel'
		} ,
		{
			//用户界面名称
			text : frame.lang.frame.userRole.permissionSet,
			//权限编码。模块名+js文件名
			permissionCode : 'frame_userRole_UiPermissionPanel',
			//类初始化参数
			classParam : {},
			//用户界面对应的类名
			className : 'com.module.frame.userRole.PermissionPanel'
		}]
 
	} ]

});
/**
 *注册权限
 */

frame.registerPermission( [	
{
	permissionName : frame.lang.global._add,
	permissionCode : 'frame_userRole_NmsRolePanel_NmsRolePanel_Grid_Add_BW',
	parentCode : 'frame_userRole_NmsRolePanel'
}, {
	permissionName : frame.lang.global._modify,
	permissionCode : 'frame_userRole_NmsRolePanel_NmsRolePanel_Grid_Modify_BW',
	parentCode : 'frame_userRole_NmsRolePanel'
}, {
	permissionName : frame.lang.global._delete,
	permissionCode : 'frame_userRole_NmsRolePanel_NmsRolePanel_Grid_Delete_BW',
	parentCode : 'frame_userRole_NmsRolePanel'
}

]);