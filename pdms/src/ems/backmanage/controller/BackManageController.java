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
package ems.backmanage.controller;

import ems.backmanage.helper.IgnoreInterceptor;
import ems.controller.BaseController;

/**
 * 
 * @author jintao
 *
 */

@IgnoreInterceptor
public class BackManageController  extends BaseController{

	public void login() {
		String username = this.getPara("userName");
		this.setSessionAttr("user", username);
		this.render("/backmanage/main.jsp");
		System.out.println("--login success--");

	}

}
