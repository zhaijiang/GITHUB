/**
 * 
 */
package ems.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.jfinal.aop.Interceptor;
import com.jfinal.core.ActionInvocation;

import ems.comm.UrlToLogInfo;
import ems.model.Log;
import ems.model.User;

/**
 * 添加系统操作日志拦截器:Aop面向切面编程
 * @author lipanpan
 */
public class LogInterceptor implements Interceptor {

	@Override
	public void intercept(ActionInvocation ai) {
		HttpSession session = ai.getController().getSession();
		HttpServletRequest request = ai.getController().getRequest();
		User user = (User) session.getAttribute("user");//退出系统时，session中的user为null
		ai.invoke();//action要先执行，防止未执行login操作时，session中的user为null。
		String actionKey = ai.getActionKey();
		String logContent = UrlToLogInfo.urlMap.getLogContent(actionKey);
		if (logContent != null) {
			if(user==null){
				user = (User) session.getAttribute("user");
			}
			if(user!=null){
				Log.dao.addLog(logContent, request.getRemoteAddr(),
						Integer.parseInt(user.get("id").toString()));
			}
		}
	}

}
