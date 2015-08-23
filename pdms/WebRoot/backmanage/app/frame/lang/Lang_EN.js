Ext.namespace("frame.lang")
/** Lang_common  */
frame.lang.global={
	chinese:'Chinese',
	english:'English',
	selectLang:'Select Language',
	currentUser:'Current User',
	notice : 'Notice',
	existIndex : 'Vlan index is repeated',
	wrongValue : 'Vlan value scale is not right(1-4094)',
	failGet:'Fail to get data,confirm the device is online or the service is opened',
	EditIp : 'Modify device Ip success',
	netError:'Net error.Please check your net',
    operateSuccess:'Operate Success',
   	operateFailure:'Operate Failure',
   	selectHandleData:'The choice of data need to be processed',
   	deleteConfirm:'You confirm to delete the checked data?',
    browserLanguageNoSupport:'The system does not support the browser language, can not automatically matching system language. Please manually select the system language!current browser language',  	
    _save:'Save',
    _cancel :'Cancel',
    _refresh:'Refresh',
    _look : 'Look',
    _add:'Add',
    _modify:'Modify',
    _copy:'Copy',
    _delete:'Delete',    
    _relation:'RelationToCnu',
    _move:'Move',
    _deviceTransfer:'DeviceTransfer',
    _switchConfig:'SwitchConfig',
    macTip:'Input the mac of terminal,so load the headend device correlative',
    readOnly:'ReadOnly',
    selectAll:'SelectAll',
    selectNull:'SelectNull',
    _empty:'Empty',
    _set:'Set',
    _export:'Export',
    
	_open:'Open',
	_close:'Close',
	pleaseSelect:'Please Select',
	operationTime:'Operation Time',
	createTime:'Create Time',
	creatorId:'Creator',
	status:'Data Status',
	afterPageText : '/{0}Page',
	beforePageText : 'The',
	displayMsg : "The {0} -  {1}Row, Total {2}Row Record",
	emptyMsg : 'No Record',
	everyPageShow:'Every Page Show',
	row:'Row',
	loadDataFailure:'Load Data Fail',
	notNull:'Not Null',
	exportCurrentPage:'Export Current Page',
	exportAllPage:'Export All Page',
	startTimeLessThanEndTime:'Start time must be smaller than the end of time',
	formatError:'Format Error',
	enNum32:'In both Chinese and English characters,32 characters in length',
	ok:'OK',
    error:'Error',
    confirmOrCancelModify:'Confirm or cancel the changes',
    home:'Home',
    copyright:' Copyright©;Sichuan Jiuzhou Electronic Technology Co.,Ltd All Rights Reserved',
    monday:'Monday',
    tuesday:'Tuesday',
    wednesday:'Wednesday',
    thursday:'Thursday',
    friday:'Friday',
    saturday:'Saturday',
    sunday:'Sunday',
    
    date_mon:'M',
    date_tue:'T',
    date_web:'W',
    date_thu:'T',
    date_fri:'F',
    date_sat:'S',
    date_sun:'S',
    
    week:'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday',
   	result:'Result',
	cause:'Cause',

    _reset:'Reset',
    _search:'Search',
    businessManage :'Business Manage',
    noData:'No Data',
     noDataChange:'No Data Changed',
    login:'Login',
    logout:'Logout',
    success:'Success',
    failure:'Failure',
    yes:'Yes',
	no:'No',
    
	dimSearch:'Supporting fuzzy search,such as:"jiuzou electronic technology",only input"jiu"、"jiuzhou"',
    addressSearch:'Supporting fuzzy search,such as:"cheng du",only input"cheng"',
    ipFormat:'Ip\'s format similar to 192.168.17.100,Supporting fuzzy search',
    macFormat:'Mac\'s format similar to 00:23:b8:12:69:74,Supporting fuzzy search',
    serverCodeFormat:'English characters, Numbers,Supporting fuzzy search',
	inputRightIp:'Ip\'s format is error,Please input right Ip',
	inputRightPort:'Port error,the format is number。such as:8080',
	inputRightNumber:'Please input number not is begin with 0',
	tipNoInput_64:'The 64 do not need input',
	tipInputLimit:'Range:0~16384  it can bemultiples of 64,0 mean no limit',
	pvidInputLimit:'Range:1~4095',
	noMultiple:'Not multiples of 64',
	beyondLimit:'Beyond Limit',
	selectAllAccordCondition:'Select All Accord Condition',
	multiple_64:'In multiples of 64',
	inputRightServer:'Please input FtpServer\'s param before inputing fileName',
	templateOverdue:"The template overdue,Please change the template\'s apply start time!",
	subTemplateError:'The associated terminal template\'s configuration is error,please change \'Default Template Of Terminal\' to yes!',
	serverCodeIsNeeded:'If nothing showed,please add serverCode in ServerManegeCode first',
	notDeleteInApplied:'*Can\'t delete the template is in applied!',
	deviceTypeNoDevelop:"The device type is not development, please waiting",
	defaultSnmpCommunityCannotModifyDelete:'private public is default community,can not modify and delete'
	
};



/** ----------------------------------*/
/** frame大模块的中英文*/
frame.lang.frame={
	
};

/** Lang_userRole用户角色模块 */
frame.lang.frame.userRole={
	userManage:'User Manage',
	userPanel : 'User Info',
	rolePanel : 'Role Info',
	permissionSet:'Permission Set',
	uiPermission:'Panel Permission',
    dataPermission:'Data Permission',
    savePermission:'Save Permission',
    currentUser:'Current User'
};
frame.lang.frame.userRole.NmsUserPanel={
	userRole:'User Role',
	userStatus :'User Status',
	userName:'Username',
	userAlias:'User Alias',
	password:'Password',
	confirmPassword:'Confirm Password',
	passwordDiffer:'Password Differ',
		
	userRemark:'User Remark',
	phoneNumber:'PhoneNumber',
	userType:'User Type',
	resetPassword:'Reset  Password'	,
	userData:'User Data',
	defaultUserCannotDelete:'The default user cannot be deleted',
	defaultUserCannotUpdate:'The default user, are not allowed to change!If you want to change, please to revise the user login',
	resetPwdSuccess_currentPwdIs:"Reset Password Success!Current Password is " 


}
frame.lang.frame.userRole.NmsRolePanel={
	roleName:"Role Name",
	roleRemark:'Role Remark',
	roleType:'Role Type',
	roleData:'Role Data',
	defaultRoleCannotDelete:'The default role cannot be deleted',
	defaultRoleCannotUpdate:'The default role, are not allowed to change'	

};

frame.lang.frame.systemlog={
	exceptionLog:'Exception Log',
	warnInfoLog:'WarnInfo Log',
	maintainerManage:'Maintainer Manage',
	logSource:'Log Source',
	logLevel:'Log Level',
	happenTimeStart:'HappenTime Start',
	happenTimeEnd:'HappenTime End',
	happenClass:'Happen Class',
    happenMethod:'Happen Method',
    happenTime:'Happen Time',
    happenLineNumber:'Happen Line Number',
    threadInfo:'Thread Info',
    detailedMsg:'Detailed Info'
}
/** -----------------------------------*/
/**  common大模块的中英文*/
frame.lang.common={
	
};

/**Lang_common_log日志管理模块*/
frame.lang.common.log={
	logManage:'Log Manage',
	
	loginLog:'Logon Log',
	userIp:'UserIp',
	loginAddress:'LoginAddress',
	operationType:'OperationType',
	operationResult:'OperationResult',
	
	operateLog:'Operate Log',
	operateObject:'OperateObject',
	operateData:'OperateData',
	
	userExceptionLog:'UserException Log',
	exceptionCode:'ExceptionCode',
	exceptionNameCode:'ExceptionNameCode',
	sloveNameCode:'EloveNameCode',
	
	deviceStatusLog:'DeviceStatus Log'
};


/** Lang_common 系统管理模块*/
frame.lang.common.system={
	systemManage: 'System Manage',
    systemSetup:'System Settings',
    glossary: 'Glossary',
    stopConfirm:'You to confirm the stop check data?',
    enableConfirm:'You to confirm the enable check data?',
    glossaryStop:'stop',
    glossaryEnable:'enable',
    languageSet:'Language Set',
    helpDoc:'Help'

};

/**数据字典模块*/
frame.lang.common.glossaryPanel={
	parentGlossary : 'parent glossary',
	rootGlossary :'root',
	glossaryCode :'data code',
	glossaryName :'data name',
	glossaryValue :'value',
	glossaryDes:'description',
	operateTime :'operate time',
	createTime :'create time',
	status :'status',
	creater:'creater',
	layerCode : 'layer code'
}


