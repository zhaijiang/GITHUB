/**
 * 
 */
package ems.interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.core.ActionInvocation;
import com.jfinal.core.Controller;

import ems.backmanage.helper.IgnoreInterceptor;
import ems.limit.LimitSystem;
import ems.model.User;

/**
 *验证用户左侧菜单操作权限：AOP面向切面编程
 *无法拦截对静态资源访问的请求，原因：参考底层ActionHandler中handler()方法的实现.
 *只能实现对具体Action操作的拦截
 * @author lipanpan
 */
public class EmsLimitInterceptor implements Interceptor {
	
	@Override
	public void intercept(ActionInvocation ai) {
		
	    Controller controller = ai.getController();
	    // 如果有清除登录拦截器的注解，跳过
	    if (controller.getClass().getAnnotation(IgnoreInterceptor.class) !=null    || ai.getMethod().getAnnotation(IgnoreInterceptor.class) != null) {
	       ai.invoke();
	        return;
	    }
		User user = ai.getController().getSessionAttr("user");
		String url =ai.getActionKey();
		if(user!=null){
			if(LimitSystem.limitSystem.ishaveLimit(user.getInt("userType"), url)){
				ai.invoke();
			}else{
				ai.getController().redirect("/nolimit.html");
			}
		}else{
		   ai.invoke();
		}
	}

}
