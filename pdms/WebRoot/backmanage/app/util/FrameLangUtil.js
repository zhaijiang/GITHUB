//系统默认语言
FrameDefaultLanguage = 'zh-cn';
//固定一种语言
FrameGlobalLanguage = '';
//用户使用的语言
FrameUserSelectLanguage = '';
//系统支持的所有语言
FrameAllLanguage = [ 'en-us', 'zh-cn','en' ]
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
if (typeof frame == 'undefined') {
	frame = {};
};

if (typeof frame.util == 'undefined') {
	frame.util = {};
};

if (typeof frame.util.Lang == 'undefined') {
	frame.util.Lang = {};
};
//获取浏览器语言
frame.util.Lang.getLang = function() {

	var lang = FrameDefaultLanguage;
	try {
		var type = navigator.appName;
		if (type == "Netscape") {
			lang = navigator.language
		} else {
			lang = navigator.userLanguage
		}
		console.debug("获取的浏览器语言为:" + lang);
	} catch (e) {
		console.error(e);
	}
	lang = frame.util.Lang.formatLang(lang);
	//检查，根据浏览器取到的语言是否在系统支持的语言范围之内
	var supportLanguage = false;
	for (i in FrameAllLanguage) {
		if (lang == FrameAllLanguage[i]) {
			supportLanguage = true;
			break;
		}
	}
	if (!supportLanguage) {
		for (i in FrameAllLanguage) {
			if (FrameAllLanguage[i].toString().startWith(lang)
					|| lang.toString().startWith(FrameAllLanguage[i])) {
				lang = FrameAllLanguage[i];
				supportLanguage = true;
				break;
			}
		}
	}
	if (!supportLanguage) {
		alert('系统不支持当前浏览器的语言,无法自动匹配语言，请手动选择语言!当前选用默认语言：'
				+ FrameDefaultLanguage
				+ '\n'
				+ 'The system does not support the browser language, can not automatically matching system language. Please manually select the system language!Current select default language:'
				+ FrameDefaultLanguage);
		lang = FrameDefaultLanguage;
	}
	return lang;

};
frame.util.Lang.formatLang = function(lang) {
	if (lang.indexOf('_') != -1) {
		lang = lang.replace(/\_/g, '-')
	}
	return lang.toString().toLowerCase();
};
frame.util.Lang.getLocaleParam = function() {
	var searchParam = window.location.search;
	if (searchParam != null || searchParam == '') {
		if (searchParam.indexOf('?') == 0) {
			searchParam = searchParam.substring(1);
		}
	} else {
		return null;
	}

	if (searchParam == null || searchParam == '') {
		return null;
	} else {
		if (searchParam.indexOf('locale') != -1) {
			var localeParam = '';
			var localeParams = searchParam.substring(searchParam
					.indexOf('locale'))
			if (localeParams.indexOf('&') != -1) {
				localeParam = localeParams.substring(0, localeParams
						.indexOf('&'));
			} else {
				localeParam = localeParams;
			}

			return localeParam;
		} else {
			return null;

		}
	}
}
/**
 * 根据指定的语言,封装URL
 * pointLang 指定语言
 * return 返回封装好的URL
 */
frame.util.Lang.getLanguageUrlByPointLang = function(pointLang) {
	var pageUrlString;
	var searchParam = window.location.search;
	if (searchParam != null || searchParam == '') {
		if (searchParam.indexOf('?') == 0) {
			searchParam = searchParam.substring(1);
		}
	}

	if (searchParam == null || searchParam == '') {
		pageUrlString = window.location.href + "?locale=" + pointLang;
	} else {
		if (searchParam.indexOf('locale') != -1) {
			pageUrlString = window.location.href;
			var localeParam = frame.util.Lang.getLocaleParam()
			pageUrlString = pageUrlString.replace(localeParam,
					'locale=' + pointLang)
		} else {
			pageUrlString = window.location.href + "&locale=" + pointLang;

		}
	}
	return pageUrlString;
}
/**
 * 切换语言
 * @param {Object} lang
 */
frame.util.Lang.changeLang = function(lang) {
	if (FrameGlobalLanguage != '') {
		lang = FrameGlobalLanguage;
	}
	if (lang.indexOf('_') != -1) {
		lang = lang.replace(/\_/g, '-')
	}
	//修改后台系统 语言
	$.ajax( {
		type : 'post',
		url : basePath + "LoginController/changeSystemLanguage.do",
		async : false,
		data : {
			selectLanguage : lang
		},
		success : function(result) {
			console.debug("设置后台系统语言：", result);
		}
	});

	//console.debug('切换语言：'+pageUrlString);
	window.location.href = frame.util.Lang.getLanguageUrlByPointLang(lang);
};

frame.util.Lang.initFrameLangExt = function() {
	FrameLanguageUrl = {
		'zh-cn' : "com.frame.lang.Lang_CN",
		'en-us' : "com.frame.lang.Lang_EN",
		'en' : "com.frame.lang.Lang_EN"

	};
	ExtLanguageUrl = {
		'zh-cn' : jsBasePath+"extjs4.2/locale/ext-lang-zh_CN.js",
		'en-us' :  jsBasePath+"extjs4.2/locale/ext-lang-en_GB.js",
		'en' :  jsBasePath+"extjs4.2/locale/ext-lang-en_GB.js"

	};
	ExtMainNorthPicUrl = {
		'zh-cn' : jsBasePath+'css/images/main_north_cn.png',
		'en-us' : jsBasePath+'css/images/main_north_en.png',
		'en' :  jsBasePath+'css/images/main_north_en.png'

	};
	frameLanguage = frame.util.Lang.formatLang("zh-cn");
	FrameUserSelectLanguage = frameLanguage;
	USE_LANG_URL = FrameLanguageUrl[frameLanguage];
	EXT_LANG_URL=ExtLanguageUrl[frameLanguage];
	Ext.syncRequire(USE_LANG_URL);
	Ext.Loader.loadScript(EXT_LANG_URL)
	
	
};
frame.util.Lang.initFrameLangLogin = function() {
	FrameLanguageUrl = {
		'zh-cn' : "app/frame/lang/login/Lang_CN.js",
		'en-us' : "app/frame/lang/login/Lang_EN.js",
		'en' : "app/frame/lang/login/Lang_EN.js"
	};
	FrameLoginPicUrl={
		'zh-cn' :jsBasePath+'css/login/login_pic_cn.png',
		'en-us' : jsBasePath+'css/login/login_pic_en.png',
		'en' :jsBasePath+'css/login/login_pic_en.png'
	}
	var loginLanguage = 'zh-cn';
	
	loginLanguage = frame.util.Lang.formatLang(loginLanguage);
	FrameUserSelectLanguage = loginLanguage;
	
	USE_LANG_URL = FrameLanguageUrl[loginLanguage];
	if (USE_LANG_URL == null) {
		var msg = '根据系统后台、URL、浏览器语言未取到对应多语言配置。采用默认配置为：' + FrameDefaultLanguage;
		console.warn(msg);
		USE_LANG_URL = FrameLanguageUrl[FrameDefaultLanguage];
		FrameUserSelectLanguage = FrameDefaultLanguage;
	}
	console.debug("Login Lang:" + USE_LANG_URL);
	console.debug("Login Lang URL:" + USE_LANG_URL);

	$.getScript(jsBasePath + USE_LANG_URL, function() {
		/*$("#selectLanguageSpan").get(0).innerHTML = frame.lang.login.selectLang;*/
           document.title=frame.lang.login.userLogin;
       // $("#login_pic").get(0).style.backgroundImage='url('+FrameLoginPicUrl[FrameUserSelectLanguage]+')';
		$("#userNameLable").get(0).innerHTML = frame.lang.login.userName;
		$("#passwordLable").get(0).innerHTML = frame.lang.login.password;
		$("#btnLogin").get(0).value = frame.lang.login.Login;
	})



};
