package ems.interceptor;

import org.apache.log4j.Logger;

import com.jfinal.aop.Interceptor;
import com.jfinal.core.ActionInvocation;
import com.jfinal.core.Controller;

import ems.backmanage.helper.IgnoreInterceptor;

/**
 *拦截器：验证用户是否已登录：AOP面向切面编程
 *无法拦截对静态资源访问的请求，原因：参考底层ActionHandler中handler()方法的实现.
 *只能实现对具体Action操作的拦截
 * @author lipanpan
 */
public class EmsInterceptor implements Interceptor{

	@Override
	public void intercept(ActionInvocation actioninvocation) {
		 Controller controller = actioninvocation.getController();
	    if (controller.getClass().getAnnotation(IgnoreInterceptor.class) !=null    || actioninvocation.getMethod().getAnnotation(IgnoreInterceptor.class) != null) {
	    	actioninvocation.invoke();
		        return;
		    }
//	HttpSession session = ai.getController().getSession();
//	String actionKey = ai.getActionKey();
	//如果当前操作是进入登录界面或登录操作时，则直接放行
//	if("/".equals(actionKey)||"/user/login".equals(actionKey)){
//		ai.invoke();
//	}else{
//		if(session!=null&&session.getAttribute("user")!=null){
//			ai.invoke();
//		}else{
//			ai.getController().redirect("/login.jsp");
//		}
//	}
    String result = null; // Action的返回值  
    try {  
        // 运行被拦截的Action,期间如果发生异常会被catch住  
       actioninvocation.invoke();  
    } catch (Exception e) {  
        /** 
         * 处理异常 
         */  
        String errorMsg = "未知错误！";  
        //通过instanceof判断到底是什么异常类型  
        if (e instanceof Exception) {  
            Exception be = (Exception) e;  
            be.printStackTrace(); //开发时打印异常信息，方便调试  
            if(be.getMessage()!=null){  
                //获得错误信息  
                errorMsg = be.getMessage().trim();  
            }  
        } else if(e instanceof RuntimeException){  
            //未知的运行时异常  
            RuntimeException re = (RuntimeException)e;  
            re.printStackTrace();  
        } else{  
            //未知的严重异常  
            e.printStackTrace();  
        }  
        //把自定义错误信息  
        /** 
         * 发送错误消息到页面 
         */  
        //request.setAttribute("errorMsg", errorMsg);  
      
        /** 
         * log4j记录日志 
         */  
        Logger log = Logger.getLogger(actioninvocation.getActionKey().getClass());  
        if (e.getCause() != null){  
            log.error(errorMsg, e);  
        }else{  
            log.error(errorMsg, e);  
        }  

    }// ...end of catch  
  }
}
