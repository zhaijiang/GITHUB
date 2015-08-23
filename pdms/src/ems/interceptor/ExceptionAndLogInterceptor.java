package ems.interceptor;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;



import com.jfinal.aop.Interceptor;
import com.jfinal.config.JFinalConfig;
import com.jfinal.core.ActionInvocation;
import com.jfinal.core.Controller;
import com.jfinal.core.JFinal;
import com.jfinal.log.Logger;
import com.jfinal.plugin.activerecord.Db;

import ems.backmanage.helper.IgnoreInterceptor;
import ems.util.ExeptionName;
import ems.util.MD5;

/**
 * @title: ajax异常处理拦截器
 * @className: ActionLogInterceptor
 * @company: FOREVEROSS
 * @author: jintao
 * @createDate: 2015年5月21日
 * @version: 1.0
 */
public class ExceptionAndLogInterceptor implements Interceptor {

  private static final Logger log = Logger.getLogger(ExceptionAndLogInterceptor.class);
  @Override
  public void intercept(ActionInvocation ai) {
	
    Controller controller = (Controller)ai.getController();
    if (controller.getClass().getAnnotation(IgnoreInterceptor.class) !=null    || ai.getMethod().getAnnotation(IgnoreInterceptor.class) != null) {
	       ai.invoke();
	        return;
	   }
    
    HttpServletRequest request = controller.getRequest();
    String actionMethod = request.getServletPath();
    //获取登陆action名称
    int num = actionMethod.lastIndexOf("/");
    String action = actionMethod.substring(num+1);
    //获取登陆用户类型
    int useType = actionMethod.indexOf("/");
    String usedoctor = actionMethod.substring(useType+1,num);
    //判断是否是登陆
    if(!action.equals("login")
       &&!action.equals("register")
       &&!action.equals("resetpwd")
       &&!action.equals("imageUpload")
       &&!action.equals("imageDownload")
       )
    {
        String token = "token";
        if(usedoctor.equals("doctor")||usedoctor.equals("orders")){
        	 token = Db.queryStr("select token from doctor where did=?",controller.getPara("did"));
        }else{
        	 token = Db.queryStr("select token from user where uid=?",controller.getPara("uid"));
        }
	    if(controller.getPara("token")==null||!controller.getPara("token").equals(token)){
	    	 controller.setAttr("flag",false);
	    	 controller.setAttr("error",ExeptionName.hashMap.get(ExeptionName.NoToken));  
	    	 controller.renderJson(); 
	    	 return;
	    }
    }
    try {
      controller.setAttr("flag",true);
      ai.invoke();
    } catch (Exception e) {
    	 controller.setAttr("flag",false);
    	 if(ExeptionName.hashMap.get(e.getMessage())!=null){
    		 controller.setAttr("error",ExeptionName.hashMap.get(e.getMessage()));  
    	 }
    	 else{
    		 controller.setAttr("error",ExeptionName.hashMap.get(ExeptionName.ERROR));  
    	 }
		 controller.renderJson(); 
		 return;
    }
    controller.renderJson(); 
  }
}