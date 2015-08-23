<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper"%>
<%
	/** 禁止浏览器缓存页面。解决登出系统后,依然可以通过浏览器后退键进入系统的BUG*/
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Cache-Control", "no-store");
	response.setDateHeader("Expires", 0);
	response.setHeader("Pragma", "no-cache");
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
   String  jsBasePath= request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/backmanage/";
	Object logonUserO = session.getAttribute("logonUser");
	if (logonUserO == null) {
		/* String url = basePath + "index.jsp";
		String content = 0 + ";url=" + url;
		response.setHeader("refresh", content);
		//out.println("您未登录，3秒后将跳转到登录页面!");
		return; */

	}
	ObjectMapper om = new ObjectMapper();
	String logonUser = om.writeValueAsString(logonUserO);
	request.setCharacterEncoding("UTF-8");
%>
<html>
	<head>
		<script type="text/javascript">
//定义全局变量
basePath = '<%=basePath%>';
jsBasePath='<%=jsBasePath%>';
if (typeof frame == 'undefined') {
	frame = {};
};
frame.logonUser=<%=logonUser%>;
  superMap_imagePath =  "<%=jsBasePath%>js/superMap/examples/images/";
	    </script>
		<!-- Ext js -->
		<link rel="stylesheet" type="text/css"
			href="<%=jsBasePath%>extjs4.2/resources/css/ext-all.css"></link>
		<link rel="stylesheet" type="text/css"
			href="<%=jsBasePath%>css/frameExt.css"></link>
		<link rel="stylesheet" type="text/css"
			href="<%=jsBasePath%>css/main.css" />
	    <script type="text/javascript" src="<%=jsBasePath%>app/frame/FrameConfig.js"></script>
<script type="text/javascript">
//method：请求的类型；GET 或 POST
//url：文件在服务器上的位置
//async：true（异步）或 false（同步）    
var frameHttpAjax=function (method,url,async)
{
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
//open(method,url,async)
//async：true（异步）或 false（同步）
xmlhttp.open(method,url,async);
xmlhttp.send();
}

//添加用户心跳

var heartbeat = function() {
//先发一次心跳
frameHttpAjax("POST",basePath + 'LoginController/userHeartbeat.do',true);
//setInterval 第一次执行会延迟 

/*
var heartbeatInterval=setInterval(function() {
	frameHttpAjax("POST",basePath + 'LoginController/userHeartbeat.do',true);
	}, frame.config.userHeartbeat * 1000);
*/
};
//heartbeat();

</script>
		<!--Highcharts沿用jQuery,MooTool以及Prototype等Javascript框架来处理基本的Javascript任务,需要jQuery 1.8以上   -->
		<script type="text/javascript" src="<%=jsBasePath%>js/jquery/jquery.js"></script>
		<script type="text/javascript"
			src="<%=jsBasePath%>extjs4.2/ext-all.js">
</script>

		<script type="text/javascript"
			src="<%=jsBasePath%>extjs4.2/locale/ext-lang-zh_CN.js">
</script>
		<!-- SuperMap iClient包 -->
		<!--  
		<script type="text/javascript"
			src="<%=jsBasePath%>js/superMap/libs/SuperMap.Include.js">
      </script>
       -->
		<!-- 百度GIS -->
		<!--

		<script type="text/javascript"
			src="http://api.map.baidu.com/api?v=2.0&ak=5dciyRjpyOcSjEsAe4wPH1zh">
</script>


		-->
		<!-- 拓展鼠标移动到GRID单元格上浮动提示 -->
		<!--
		<script type="text/javascript" src="<%=jsBasePath%>js/expandJs/gridExpand.js"></script>
		-->

		<script type="text/javascript"
			src="<%=jsBasePath%>js/jquery/jquery.md5.js">
</script>



		<!-- 导入图表空间highchart  -->

		<script type="text/javascript"
			src="<%=jsBasePath%>js/highChart/js/highcharts.js">
</script>

		<!--publishlet -->
		<script type="text/javascript"
			src="<%=jsBasePath%>js/ajax-pushlet-client.js">
</script>

		<!-- 前台页面入口 -->
		<script type="text/javascript" src="<%=jsBasePath%>app.js">
</script>
	</head>
	<body>
	</body>
</html>