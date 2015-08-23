/**
 * 
 */
package ems.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author lipanpan
 */
public class ExeptionName {
	
	/**运行时出现未知错误*/
	public static final String RuntimeException = "java.lang.RuntimeException";
	public static final String RuntimeExceptionValue = "系统操作错误";
	/**空指针异常*/
	public static final String NullPointerException = "java.lang.NullPointerException";
	public static final String NullPointerExceptionValue = "没有您请求的数据!";
	/**空指针异常*/
	public static final String NoUrl = "NoUrl";
	public static final String NoUrlValue = "请求路径不存在！请检查路径是否正确!";
	/**空指针异常*/
	public static final String NoToken = "notoken";
	public static final String NOTOKENERROR = "登陆信息缺失或已过期，请重新登陆！";
	/**未标明异常*/
	public static final String ERROR = "error";
	public static final String ERRORINFO = "操作数据库失败!";

	/**默认的格式化方式*/
	public static final Map<String, String> hashMap = new HashMap<String, String>()
    {  
	  {  
	        put(RuntimeException, RuntimeExceptionValue);  
	        put(NullPointerException, NullPointerExceptionValue);  
	        put(NoUrl, NoUrlValue);  
	        put(NoToken, NOTOKENERROR); 
	  }              
   };  
}
