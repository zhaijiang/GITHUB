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

import java.util.Calendar;

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
	
	public void loadCurrentTime() {
		Calendar a=Calendar.getInstance();
        Integer year=  a.get(Calendar.YEAR);
        Integer month=  a.get(Calendar.MONTH)+1;
		setAttr("year", year);
		setAttr("month", month);
		setAttr("success", true);
		renderJson();

	}

}
