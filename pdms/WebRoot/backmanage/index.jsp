<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
   String  jsBasePath= request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/backmanage/";
	String loginReturnWarnMsg = session
			.getAttribute("loginReturnWarnMsg") == null ? "" : session
			.getAttribute("loginReturnWarnMsg").toString();
	//移除  防止刷新时重复显示 
	session.removeAttribute("loginReturnWarnMsg");
%>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<base href="<%=basePath%>">
		<title></title>
		<link href="<%=jsBasePath%>/css/login.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=jsBasePath%>js/jquery/jquery.js"></script>
		<script type="text/javascript"
			src="<%=jsBasePath%>js/jquery/jquery.md5.js">
</script>
		<script type="text/javascript" src="<%=jsBasePath%>app/login.js">
</script>
		<script type="text/javascript"
			src="<%=jsBasePath%>app/util/FrameLangUtil.js">
</script>
<script type="text/javascript">
basePath = "<%=basePath%>";
jsBasePath='<%=jsBasePath%>';
$(document).ready(
		function() {
			if (!window.console) {
				var names = [ "log", "debug", "info", "warn", "error",
						"assert", "dir", "dirxml", "group", "groupEnd", "time",
						"timeEnd", "count", "trace", "profile", "profileEnd" ];
				window.console = {};
				for ( var i = 0; i < names.length; ++i)
					window.console[names[i]] = function() {
					}
			}

			if ('<%=loginReturnWarnMsg%>' != null
					&& '<%=loginReturnWarnMsg%>' != '') {
				//  $("#btnCancel").after("<br><p color='red' align='left'>"+loginReturnMsg+"</p>");
				$("#loginInfo").get(0).innerHTML = '<%=loginReturnWarnMsg%>';

			}
			frame.util.Lang.initFrameLangLogin();

		})
</script>
	</head>
	<body onbeforeunload="window.location='logout.jsp'">   
		<!--
		<div id="loginLanguage">
		<span id="selectLanguageSpan">Language:</span>
			<select id="selectLanguage">
					<option value="en" selected="selected">
						EN
					</option>
					<option value="zh_cn">
						CN
					</option>
				</select>

		</div>
		-->
		<div id="login">
			<form action="backmanage/login" method="post" id="loginForm">
				<!--<input name="loginLanguage" type="text" id="txtLoginLanguage"
					style="display: none;" />-->
			<div id='login_pic'></div>
			<div id='userNameTitle'><span id="userNameLable"></span>　<input name="userName" type="text" id="txtUserName"/></div>
			<div id='passwordTitle'><span id="passwordLable"></span>　<input name="password" type="password" id="txtPwd"/></div>
			<input type="button" id="btnLogin" value="登陆" />
			<!--<input type="button" id="btnCancel" value="取消"/>-->
			</form>
			<br>
			<p id="loginInfo" style="color:#000000;" ></p>
			<table align=center style="padding-top: 10px">
				<tr>
					<td style="text-align: center">
					</td>
				</tr>
			</table>
		</div>
	</body>     
</html>