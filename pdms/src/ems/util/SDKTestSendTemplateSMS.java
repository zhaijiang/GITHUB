package ems.util;
import java.util.HashMap;
import java.util.Set;

import com.cloopen.rest.sdk.CCPRestSmsSDK;
public class SDKTestSendTemplateSMS {
 public static void main(String[] args) {
	 HashMap result = null; 
	 CCPRestSmsSDK restAPI = new CCPRestSmsSDK();
	 restAPI.init("sandboxapp.cloopen.com", "8883");
	 // 初始化服务器地址和端口，沙盒环境配置成sandboxapp.cloopen.com，生产环境配置成app.cloopen.com，端口都是8883. 
	 restAPI.setAccount("accountSid", "accountToken");
	 // 初始化主账号名称和主账号令牌，登陆云通讯网站后，可在"控制台-应用"中看到开发者主账号ACCOUNT SID和 
	 //主账号令牌AUTH TOKEN。
	 restAPI.setAppId("AppId");
	 // 初始化应用ID，如果是在沙盒环境开发，请配置"控制台-应用-测试DEMO"中的APPID。
	 //如切换到生产环境，请使用自己创建应用的APPID
	 result = restAPI.sendTemplateSMS("号码1,号码2等","模板Id" ,new String[]{"模板内容1","模板内容2"});
	 System.out.println("SDKTestGetSubAccounts result=" + result); 
	 if("000000".equals(result.get("statusCode"))){
		 //正常返回输出data包体信息（map）
		 HashMap data = (HashMap) result.get("data");
	     Set<String> keySet = data.keySet();
		 for(String key:keySet){ 
			 Object object = data.get(key); 
			 System.out.println(key +" = "+object); 
		 }
	 }else{
		 //异常返回输出错误码和错误信息
		 System.out.println("错误码=" + result.get("statusCode") +" 错误信息= "+result.get("statusMsg"));
	 	}
	 }
 }