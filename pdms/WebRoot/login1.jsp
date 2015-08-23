<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>医到家管理系统——登录</title>
<link rel="stylesheet" type="text/css" href="${base}/css/loginstyle.css" />
<link rel="shortcut icon" href="${base}/images/favicon.ico"> 
<script type="text/javascript" src="${base}/js/jquery-1.11.0.js"></script>
<style>
	@import url(http://fonts.googleapis.com/css?family=Ubuntu:400,700);
	body {
		background: #563c55 url(images/blurred.jpg) no-repeat center top;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		background-size: cover;
	}
	.container > header h1,
	.container > header h2 {
		color: #fff;
		text-shadow: 0 1px 1px rgba(0,0,0,0.7);
	}
</style>
 <body>
        <div class="container">
			
			 <div style="height:160px;"></div>   
			<form class="form-3" id="login">
			    <p class="clearfix">
			        <label for="login">Username</label>
			        <input type="text" name="login" id="login" placeholder="请输入用户名">
			    </p>
			    <p class="clearfix">
			        <label for="password">Password</label>
			        <input type="password" name="password" id="password" placeholder="请输入密码"> 
			    </p>
			    <p class="clearfix">
			        <input type="checkbox" name="remember" id="remember">
			        <label for="remember">Remember me</label>
			    </p>
			    <p class="clearfix">
			        <input type="button" name="Sign" onclick="javascript:loginSys();" value="Sign in">
			    </p>       
			</form>
			
        </div>

    </body>
    <script>
    function loginSys() {
    	 $.ajax({
 	    	// 提交地址
 	    	url: "${base}/sysoper/getPropByColumn",   
 	    	// 提交的json数据
 	    	data: { name: "aaaa", pwd: "aaaa",column1:"phone",column2:"born"},
 	    	// 提交前事件
 	    	beforeSend: function () {
 	        },
 	    	// 提交方式
 	    	type: "POST",
 	    	//超时时间设置，单位毫秒
	        timeout : 100000,
 	    	// 提交的数据类型
	    	dataType: "json",
 	    	// 提交成功后事件
 	        success: function (data) {
 	        	//if(data.flag==false)
        		//{
        		//	alert(data.error);
        		//}
	        	//else{
	        	//	window.location.href = "${base}/user/main"
	        	//}
 	        	//获取返回字段值
 	        	//alert(data.flag)
 	        	//获取后台返回的list
 	        	 alert(data.result)
	             $.each(data.result, function(index, objVal) { 
	            	 alert(1)
	            	 //遍历对象数组，index是数组的索引号，objVal是遍历的一个对象。  
	                 //val["属性"]可取到对应的属性值。  
	                 alert(objVal["phone"]);  
	                 alert(objVal["born"]);  
	             });  
 	        },
 	    	// 提交错误时间
 	       error: function(XMLHttpRequest, textStatus, errorThrown) {
 	    	   if(textStatus=="error")
		   		   {
		   		     alert("服务器错误,请联系管理员！");
		   		   }
	 	       if(textStatus=="timeout")
	    		   {
	    		     alert("访问服务器超时，请稍后再试！");
	    		   }
		 	   if(textStatus=="parsererror")
		   		   {
		   		     alert("服务器未能正确返回数据格式或返回的数据为空，请稍后再试！");
		   		   }
		 	   if(textStatus=="notmodified")
		   		   {
		   		     alert("服务器那多次返回的数据相同，请稍后再试！");
		   		   }
           },
  	    });
	}
    </script>
</html>