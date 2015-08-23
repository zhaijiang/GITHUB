package ems.util;


/**
 *生成token字符串
 * @author jintao
 */
public class TokenUtil {

	  public static String getToken(String device,String phone,String pwd,String random)
	    {
		  String token = device + phone + pwd + Math.random()*10;
		  return MD5.getMD5(token);
	    }
}
