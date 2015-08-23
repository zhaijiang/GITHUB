Ext.namespace('frame.lang')
frame.lang.global={
	chinese:'中文',
	english:'英文',
	selectLang:'选择语言',
	currentUser:'当前用户',
	notice : '通知',
	failGet:'获取数据失败,请查看设备是否在线或服务器是否开启！',
	existIndex : 'vlan索引已存在，请重新输入',
	wrongValue:'vlan索引值不在输入范围之内（1-4094）',
	EditIp : '修改设备Ip成功',
	netError:'网络异常,请检查你的网络',
	operateSuccess:'操作成功',
	operateFailure:'操作失败',
	selectHandleData:'请选择要操作的数据',
   	deleteConfirm:'您确认删除勾选的数据吗?',
    browserLanguageNoSupport:'系统不支持当前浏览器的语言,无法自动匹配系统语言.请手动选择系统语言!当前浏览器语言为',
   	_save:'保存',
    _cancel :'取消',
    _refresh:'刷新',
    
    _open:'开启',
	_close:'关闭',
	pleaseSelect:'请选择',
	operationTime:'操作时间',
	createTime:'创建时间',
	creatorId:'创建者',
	status:'数据状态',
	afterPageText : '/{0}页',
	beforePageText : '第',
	displayMsg : "第{0}条 - 第{1}条，共{2}条记录",
	emptyMsg : '没有记录',
	everyPageShow:'每页显示',
	row:'行',
	loadDataFailure:'加载数据失败',
	notNull:'不能为空',
	exportCurrentPage:'导出当前页',
	exportAllPage:'导出所有页',
	startTimeLessThanEndTime:'开始时间应小于结束时间',
	formatError:'格式错误',
	enNum32:'英文数字,最大长度32',
	ok:'确定',
    error:'错误',
    confirmOrCancelModify:'确定或取消更改',
    home:'首页',
    copyright:'四川九州电子科技股份有限公司版权所有',
    monday:'周一',
    tuesday:'周二',
    wednesday:'周三',
    thursday:'周四',
    friday:'周五',
    saturday:'周六',
    sunday:'周日',
    date_mon:'一',
    date_tue:'二',
    date_web:'三',
    date_thu:'四',
    date_fri:'五',
    date_sat:'六',
    date_sun:'日',
  
    week:'周日_周一_周二_周三_周四_周五_周六',
    
    
    
    result:'结果',
	cause:'原因',

    _look : '查看',
    _add:'添加',
    _modify:'修改',
    _copy:'复制',
    _delete:'删除',
    _relation:'关联终端设备',
	pingFailure:'ping失败 连接超时',
    readOnly:'只读',
    selectAll:'全选',
    selectNull:'全不选',
    _empty:'清空',
    _set:'设置',
    _reset:'重置',
    _search:'搜索',
    _export:'导出',
    businessManage :'业务管理',
    noData:'没有数据',
    noDataChange:'没有数据改变',
    login:'登陆',
    logout:'退出',
    success:'成功',
    failure:'失败',
    yes:'是',
	no:'否',
    
    
	dimSearch:'支持模糊搜索，按照顺序逐渐匹配,如：“九州电子科技”，输入“九”、“九州”即可',
    addressSearch:'按照顺序逐渐匹配,如：绵阳高新区、绵阳科创区，输入“绵”或者“绵阳”即可',
    ipFormat:'ip格式类似192.168.17.100,支持模糊搜索',
    macFormat:'mac格式类似00:23:b8:12:69:74，支持模糊搜索',
    serverCodeFormat:'授权码由字母数字组成，支持模糊搜索',
	inputRightPort:'输入端口有误，格式为数字。例如：8080',
	inputRightNumber:'请输入非0开头的数字',
	tipNoInput_64:'64设备无须填写',
	tipInputLimit:'0~16384只能为64的倍数，0代表不限速',
	pvidInputLimit:'1~4095的整数',
	noMultiple:'不是64倍数',
	beyondLimit:'超出限制范围',
	selectAllAccordCondition:'全选符合条件的数据',
	multiple_64:'64的倍数',
	inputRightServer:'请先填写正确的FTP服务器配置',
	templateOverdue:'模板已过期，请更改模板开始下发时间！',
	subTemplateError:'关联的终端模板配置错误，请将关联模板的“终端默认模板”改为“是”',
	serverCodeIsNeeded:'如果没有数据，请先在授权管理中添加授权码',
	notDeleteInApplied:'*不能删除正在应用的模板!',
	deviceTypeNoDevelop:'该设备类型还未开发,敬请期待',
	defaultSnmpCommunityCannotModifyDelete:'private public为默认SNMP共同体,不允许编辑修改'

}



/** frame大模块的中英文*/
frame.lang.frame={
	
}
frame.lang.frame.pushlet={
	pushManage: '推送管理',
	pushModule:'推送模块',
	testPushlet: '推送测试',
	startPush:'开始推送',
	stopPush:'停止推送'

}
/** Lang_userRole用户角色模块 */
frame.lang.frame.userRole={
	userManage:'管理员管理',
	userPanel : '管理员信息',
	rolePanel : '角色信息',
	permissionSet:'权限配置',
    uiPermission:'界面权限',
    dataPermission:'数据权限',
    savePermission:'保存权限',
    currentUser:'当前管理员'

}
frame.lang.frame.userRole.NmsUserPanel={
	userRole:'用户角色',
	userStatus :'用户状态',
	userName:'用户名',
	userAlias:'用户别名',
	password:'密码',
	confirmPassword:'确认密码',
	passwordDiffer:'两次密码不一致',
		
	userRemark:'用户备注',
	phoneNumber:'电话号码',
	userType:'用户类型',
	resetPassword:'重置密码'	,
	userData:'用户数据',
	defaultUserCannotDelete:'默认用户无法删除',
	defaultUserCannotUpdate:'默认用户，不允许更改!如要更改，请以该用户登录进行修改'	,
	resetPwdSuccess_currentPwdIs:"重置密码成功,当前密码是 " 
	
}

frame.lang.frame.userRole.NmsRolePanel={
	roleName:"角色名称",
	roleRemark:'角色备注',
	roleType:'角色类型',
	roleData:'角色数据',
	defaultRoleCannotDelete:'默认角色无法删除',
	defaultRoleCannotUpdate:'默认角色，不允许更改'	
}
frame.lang.frame.systemlog={
	exceptionLog:'异常日志',
	warnInfoLog:'WarnInfo等级日志',
	maintainerManage:'维护人员管理',
	logSource:'日志来源',
	logLevel:'日志等级',
	happenTimeStart:'发生时间起',
	happenTimeEnd:'发生时间止',
	defaultRoleCannotDelete:'默认角色无法删除',
	defaultRoleCannotUpdate:'默认角色，不允许更改',
	happenClass:'发生类名',
    happenMethod:'发生方法',
    happenTime:'发生时间',
    happenLineNumber:'发生行号',
    threadInfo:'线程信息',
    detailedMsg:'详细信息'
}
/** -----------------------------------*/
/**  common大模块的中英文*/
frame.lang.common={
	
};
/**Lang_common_log日志管理模块*/
frame.lang.common.log={
	logManage:'日志管理',
	
	loginLog:'登陆日志',
	userIp:'用户ip',
	loginAddress:'登陆地址',
	operationType:'操作类型',
	operationResult:'操作结果',
	
	operateLog:'操作日志',
	operateObject:'操作对象',
	operateData:'操作数据',
	
	userExceptionLog:'用户异常日志',
	exceptionCode:'异常编码',
	exceptionNameCode:'异常名称编码',
	sloveNameCode:'解决方案码',
	
	deviceStatusLog:'设备状态日志'
}

/** Lang_common 系统管理模块*/
frame.lang.common.system={
	systemManage: '系统管理',
	systemSetup:'系统设置',
	glossary: '数据字典',
	stopConfirm:'您确认停用该数据字典吗?',
	enableConfirm:'您确认启用该数据字典吗?',
    glossaryStop:'停用',
    glossaryEnable:'启用',
    languageSet:'语言设置',
    helpDoc:'帮助文档'

    
}
/**数据字典模块*/
frame.lang.common.glossaryPanel={
	parentGlossary : '父字典',
	rootGlossary :'根',
	glossaryCode :'字典编号',
	glossaryName :'字典名称',
	glossaryValue :'字典值',
	glossaryDes:'字典描述',
	operateTime :'操作时间',
	createTime :'创建时间',
	status :'状态',
	creater:'创建者',
	layerCode : '层次码'
	
}




