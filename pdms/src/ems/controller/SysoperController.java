/**
 * 文件名：UserController.java
 * 创建日期： 2014年5月7日
 * 作者：     Qigao
 * Copyright (c) 2009-2011 无线开发室
 * All rights reserved.
 
 * 修改记录：
 * 	1.修改时间：2014年5月7日
 *   修改人：lipanpan
 *   修改内容：
 */
package ems.controller;



import com.jfinal.aop.Before;

import ems.model.Sysoper;
/**
 * 
 * @author jintao
 *
 */
public class SysoperController extends BaseController {
	public SysoperController() {
	 setClazz(Sysoper.class);
	}
	/**
	 * @Title login
	 * @Description 处理后台管理系统用户登录Action
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:10:00
	 */
	public void login() throws Exception {
	}
}
