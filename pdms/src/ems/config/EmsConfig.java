/**
* 文件名：EmsConfig.java
* 创建日期： 2014年5月7日
* 作者：     lipanpan
* Copyright (c) 2009-2011 无线开发室
* All rights reserved.
 
* 修改记录：
* 	1.修改时间：2014年5月7日
*   修改人：lipanpan
*   修改内容：
*/
package ems.config;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.ext.handler.ContextPathHandler;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;

import ems.backmanage.controller.BackDoctorController;
import ems.backmanage.controller.BackManageController;
import ems.backmanage.controller.BackOrdersController;
import ems.backmanage.controller.BackUserController;
import ems.comm.JFinalInitialization;
import ems.controller.DoctorController;
import ems.controller.FileController;
import ems.controller.OrdersController;
import ems.controller.UserController;
import ems.interceptor.EmsInterceptor;
import ems.interceptor.EmsLimitInterceptor;
import ems.interceptor.ExceptionAndLogInterceptor;
import ems.model.Ddmap;
import ems.model.Doctor;
import ems.model.Globals;
import ems.model.Monypaper;
import ems.model.Mpashcan;
import ems.model.Orders;
import ems.model.Otrace;
import ems.model.Sysoper;
import ems.model.User;
import ems.model.Useraddr;
/**
 * 功能描述：
 *
 */
public class EmsConfig extends JFinalConfig
{
	/**每页显示的记录条数*/
	public final static int pageSize = 15;
    @Override
    public void configConstant(Constants me)
    {
    	// 加载少量必要配置，随后可用getProperty(...)获取值
        loadPropertyFile("a_little_config.txt");    
        me.setDevMode(false);
        // 设置视图类型为Jsp，否则默认为FreeMarker
        me.setViewType(ViewType.JSP);      

    }

    @Override
    public void configRoute(Routes me)
    {
        //用户操作控制器
        me.add("user",UserController.class,"/");
        //管理员操作控制器
        me.add("doctor",DoctorController.class,"/");
        //管理员操作控制器
        me.add("orders",OrdersController.class,"/");
        //用户文件上传
        me.add("upload",FileController.class,"/");
        //用户文件上传
        me.add("BackManageController",BackManageController.class);
        //医生后台接口
        me.add("BackDoctorController",BackDoctorController.class);
        
        //用户后台接口
        me.add("BackUserController",BackUserController.class);
        
        
        //用户后台接口
        me.add("BackOrdersController",BackOrdersController.class);
    }

    /**
     *添加插件链:底层维护着一个列表List
     */
    @Override
    public void configPlugin(Plugins me)
    {
     // 配置C3p0数据库连接池插件
        C3p0Plugin c3p0Plugin = new C3p0Plugin(getProperty("jdbcUrl"), getProperty("user"), getProperty("password").trim());
        me.add(c3p0Plugin);
        
     // 配置ActiveRecord插件
        ActiveRecordPlugin arp = new ActiveRecordPlugin(c3p0Plugin);
        arp.setShowSql(true);
        me.add(arp);
        arp.addMapping("user",User.class);
        arp.addMapping("orders",Orders.class);
        arp.addMapping("doctor",Doctor.class);
        arp.addMapping("sysoper",Sysoper.class);
        arp.addMapping("globals",Globals.class);
        arp.addMapping("ddmap",Ddmap.class);
        arp.addMapping("useraddr",Useraddr.class);
        arp.addMapping("otrace",Otrace.class);
        arp.addMapping("monypaper",Monypaper.class);
        arp.addMapping("mpashcan",Mpashcan.class);
      
        
    }
   
    /**
     *添加拦截器链:底层维护着一个列表List
     *Jfinal中默认的ActionHandler无法实现拦截器对静态资源的访问请求进行拦截。
     *只能实现对Action具体动作的拦截和验证
     */
    @Override
    public void configInterceptor(Interceptors me)
    {
            //添加全局拦截器：判断用户是否已登录
          	me.add(new EmsInterceptor());
         	//添加全局拦截器：验证用户左侧菜单操作权限
        	me.add(new EmsLimitInterceptor());
        	 //添加全局拦截器：判断用户是否已登录
          	me.add(new ExceptionAndLogInterceptor());
    }
    
     /**
      * 添加处理器链
      * 链头部要么是自定义的Handler,否则就只能一个默认的ActionHandler(不存在链)
      * 因为只要添加自定义的Handler，ActionHandler就会失效。
      */
    @Override
    public void configHandler(Handlers me)
    {
    	 //这里是设置项目的根路径名为"base"。
    	 me.add(new ContextPathHandler("base"));
    }
    
    /**
     * 在系统停止时调用的方法
     */
    public void beforeJFinalStop() {
   
    };
    /**
     * /在系统启动时调用的方法
     */
    public void afterJFinalStart() {
    	JFinalInitialization.initialization();
     
    }
    public static void main(String[] args)
    {
        JFinal.start("WebRoot", 80, "/", 5);
    }
}
