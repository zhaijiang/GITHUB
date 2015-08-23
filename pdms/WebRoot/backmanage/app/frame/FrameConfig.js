if (typeof frame == 'undefined') {
	frame = {};
};

if (typeof frame.config == 'undefined') {
	frame.config = {};
};
if (typeof frame.config.InputCheck == 'undefined') {
	frame.config.InputCheck = {};
};

if (typeof frame.config.DeviceModel== 'undefined') {
	frame.config.DeviceModel = {};
};

if (typeof frame.config.eoc== 'undefined') {
	frame.config.eoc = {};
};


frame.config.pushlet={
	newAlarm:"NEW_ALARM",
	refreshAlarm:"REFRESH_ALARM"

}
/**
 * 每一页数据条数
 */
frame.config.pageSize = 20;
/**
 * 用户心跳 单位秒
 */
frame.config.userHeartbeat=200
/**非负整数*/
frame.config.InputCheck.number=/^(0|[1-9]\d*)$/;
frame.config.InputCheck.integerCheck=/^-?[1-9]\d*$/;
/**输入限制*/
/** ip校验*/
frame.config.InputCheck.ipaddressCheck=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
/** 中文校验*/
frame.config.InputCheck.chinese = /^[\-\u9fa5]+$/;
/** mac*/
frame.config.InputCheck.mac = /[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;
/** 区域名称输入限制*/
frame.config.InputCheck.addressNameCheck=/^[\w\u4E00-\u9FFF\-\_]+$/;
/**最大管理设备数量[1-9]*/
frame.config.InputCheck.maxNumber=/^[1-9]\d*$/;
/**上行结束频率*/
frame.config.InputCheck.upEndFreq=/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;

/**输出功率范围*/
frame.config.InputCheck.inputNum=/^[1-9]\d*$/;
/** 英文数字*/
frame.config.InputCheck.inputEnNum=/^[A-Za-z0-9]+$/;
/**邮件*/
frame.config.InputCheck.email=/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

/**数字*/
frame.config.InputCheck._int=/^[0-9]+$/;

/**局端*/
frame.config.headend="headend";
/**终端*/
frame.config.terminal="terminal";
/** 设备未验证状态*/
frame.config.deviceStatus_UnCheck='DeviceStatus_UnCheck';
/** 设备验证失败*/
frame.config.deviceStatus_Failure='DeviceStatus_Failure';

/** 设备正在验证*/
frame.config.deviceStatus_Verifying='DeviceStatus_Verifying';
/** 只读样式*/
frame.config.formFieldReadOnlyCss='background:#FEEEEE';
/**正常样式*/
frame.config.formFieldNormalCss='background:#FFFFFF';
/**标红样式*/
frame.config.formFieldRed='background:red';

/** 根区域*/
frame.config.addressRoot=['root','根区域','根','九州网管','JZNMS','(',')'];
	/** 设备在线 编号*/
frame.config.deviceStatus_Online='DeviceStatus_Online';

/** 按钮重复点击间隔*/
frame.config.buttonRepeatClickInterval=1000
/** EOC类型*/
frame.config.DeviceModel.eoc='EOC';
/** vlanlist验证*/
frame.config.eoc.terminalListCheck=/^[0-9\:]+$/;






