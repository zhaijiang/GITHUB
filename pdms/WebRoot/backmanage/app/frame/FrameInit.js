Ext.namespace("frame")
Ext.namespace("frame.mainPanel")
//设定全局的ajax超时时间，10秒
Ext.Ajax.timeout = 120 * 1000;

Ext.Msg.buttonText.yes = frame.lang.global.yes;  
Ext.Msg.buttonText.no = frame.lang.global.no;  
Ext.Msg.buttonText.cancel=frame.lang.global._cancel;
/**
 * 初始化pushlet
 */
Ext.syncRequire('com.util.FramePushletUtil',function()
	{
		if(frame.util.Pushlet)
		{
		//pushlet 初始化
	frame.util.Pushlet.init();
	// 开启一个session 只用开启一次
	frame.util.Pushlet.join();
		}
	}
	);

frame.permissions = [];
var westPanel;
/**
 * 注册模块
 * @param {Object} config 注册参数
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
frame.registerModule = function(config) {
	westPanel = Ext.getCmp("WestPanel");
	frame.handleUiPermission(config);
	//添加一级菜单
	var ones = Ext.ComponentQuery
			.query('#NorthPanel_21 > button[text=' + config.text + ']');
	var one;   
	if (ones == null || ones.length == 0) {
		var oneConfig={
			height : 35,
			scale:'large',
			textAlign:'right',
			enableToggle :true,
			style:{

			  marginLeft: '5px'

			},
			border:0,
			repeatClick:true

			};
     
       Ext.apply(oneConfig,config);
		one = Ext.create('Ext.button.Button', oneConfig);
	 
	} else {
		one = ones[0]
	}
	Ext.getCmp("NorthPanel_21").add(one);
	if (one.childs == null) {
		one.childs = [];
		one.on('click', function() {			
			westPanel.removeAll();		
			westPanel.expand(true); //展开
			var btnText = one.getText(); //alert(btnText);
			var first = Ext.ComponentQuery
			.query('#NorthPanel_21 > button');			
			Ext.Array.each(first,function(btn){				
				var temp = btn.getText(); 
				if(btnText==temp){
					btn.toggle(true);
				}else{
					btn.toggle(false);
				}
			});
			var twos = this.childs;
			if (twos == null || twos.length == 0) {
				return;
			}
			Ext.Array.each(twos, function(two) {
				frame.mainPanel.addTwo( two)
			});

		});
	}
	Ext.Array.each(config.children, function(child) {
		var childs = one.childs;
		var find = false;
		for (i in childs) {
			//添加的二级菜单已经存在，则将其子菜单添加到已经存在的二级菜单中
			if (child.text == childs[i].text) {
				find = true;
				var index = 1;
				//将arr2添加到arr1中
			var arr1 = childs[i].children;
			var arr2 = child.children;
			arr2.unshift(index, 0);
			Array.prototype.splice.apply(arr1, arr2);
			break;
		}
	}
	if (find == false)

	{
		one.childs.push(child)
	}

}	);
};
/**
 * 添加二级菜单
 * @param {Object} parent
 * @param {Object} twoConfig
 * @return {TypeName} 
 */
frame.mainPanel.addTwo = function(twoConfig) {
	if(twoConfig.className!=null)
	{
		if(twoConfig.requires!=null)
		{
			Ext.syncRequire(twoConfig.requires);
		}
		var two=Ext.create(twoConfig.className,{
			   title:twoConfig.text,
			   permissionCode : twoConfig.permissionCode
			}
			
		);
		two.title=twoConfig.text;
		westPanel.add(two);
		return;

	}
	//添加二级菜单
	var two = new Ext.tree.Panel( {
		title : twoConfig.text,
		permissionCode : twoConfig.permissionCode,
		rootVisible : false,
		root : {
			text : 'root'
		}
	});
	westPanel.add(two);
	//添加三级菜单
	var threes = twoConfig.children;
	if (threes == null || threes.length == 0) {
		return;
	}
	var threePanels = [];
	Ext.Array.each(threes, function(threeConfig) {
		//权限允许加载threeConfig才添加
			if (frame.util.checkPermission(threeConfig)) {
				var ch = Ext.data.NodeInterface( {
					text : threeConfig.text,
					permissionCode : threeConfig.permissionCode,
					leaf : true,
					classParam : threeConfig.classParam,
					className : threeConfig.className
				});

				threePanels.push(ch);
			}
		});
	if (threePanels.length != 0) {
		two.getRootNode().appendChild(threePanels);
	}
	two.on('itemclick', function(view, record) {
		var className = record.raw.className;		
		if (className != null) {
			frame.util.CenterTabPanel.addTab(className, record.raw.text,
					record.raw.classParam);

		}

	});


};
/**
 * 添加UI权限
 */
frame.handleUiPermission = function(config) {
	var one = config;
	var permissions = [];
	permissions.push( {
			permissionName : one.text,
			permissionCode : one.permissionCode,
			parentCode : '-1'

		});
	
	frame.handleUiPermission.parse(one, permissions);
	frame.addPermission(permissions);
	frame.addDefaultUserPermissions();

};
/**
 * 解析模块注册配置中的权限
 * @param {Object} parent 父菜单
 * @param {Object} permissions 权限数组
 * @return {TypeName} 
 */
frame.handleUiPermission.parse = function(parent, permissions) {
	var childs = parent.children;
	if (childs == null || childs.length == 0) {
		return;
	}
	for (i in childs) {
		var child = childs[i];
			permissions.push( {
				permissionName : child.text,
				permissionCode : child.permissionCode,
				parentCode : parent.permissionCode

			});
		frame.handleUiPermission.parse(child, permissions);

	}
	;
}
/**
 * 权限注册
 * @param {Object} buttons
 */
frame.registerPermission = function(registers) {
	frame.addPermission(registers);
	frame.addDefaultUserPermissions();
};
/**
 * 添加默认用户权限
 */
frame.addDefaultUserPermissions = function() {
	//给默认用户 添加权限
	if (frame.logonUser.userType != null
			&& frame.logonUser.userType == -1) {
		Ext.each(frame.permissions,
				function(permission) {
					var permissionCodes = frame.logonUser.permissionCodes;
					if (permissionCodes == null) {
						permissionCodes = [];
					}
					if (!Ext.Array.contains(permissionCodes,
							permission.permissionCode)) {
						permissionCodes.push(permission.permissionCode)
					}
				});
	}
}
/**
 * 将权限加入权限数组中，并去重
 * @param {Object} permissions
 */
frame.addPermission = function(permissions) {
	for (i in permissions) {
		var permission = permissions[i];
		if(permission.permissionCode==null||''==permission.permissionCode)
		{
			continue;
		}
		if (frame.findPermissionByCode(permission.permissionCode) == null) {
			frame.permissions.push(permission);
		}
	}

}
/**根据权限码 从权限数组中找权限码一致的权限 */
frame.findPermissionByCode = function(permissionCode) {
      if(permissionCode==null||''==permissionCode)
     {
    	  //如果权限码为空则返回空串，表示权限已经存在，不允许加入权限码为空 或为空串的权限
    	    return '';
      }
	for (i in frame.permissions) {
		var per = frame.permissions[i];
		if (per.permissionCode == permissionCode) {
			return per;
		}
	}
	return null;
}
