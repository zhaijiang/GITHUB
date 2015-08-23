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
import com.jfinal.core.Controller;

import ems.model.Doctor;
import ems.model.Msg;
import ems.model.Sysoper;
import ems.model.User;
/**
 * 
 * @author jintao
 *
 */
public class MsgController extends BaseController {
	public MsgController() {
		 setClazz(Msg.class);
		}
	
	/**
	 * 
	 * @Title loginapp
	 * @Description 处理APP客户端用户登录Action
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void loginapp(){
//		String name = getPara("name");
//		String pwd = getPara("pwd");
//		String loginflag = getPara("flag");
//		User user = new User();
//		Doctor doctor = new Doctor();
//		//根据标志位判断登陆用户类型0：用户，1：医生
//		if(Const.USERFALG.equals(loginflag))
//		{
//			user = User.dao.getUserByUserName(name);
//			if (user == null) {
//				setAttr("loginerror", "用户名不存在！");
//				setAttr("flag", false);
//				renderJson();
//				return;
//			}
//			if(user.get("pwd").equals(pwd))
//			{
//				getSession().setAttribute("user", user);
//				setAttr("flag", true);
//				renderJson();
//				return;
//			}
//			else
//			{
//				setAttr("loginerror", "登陆密码错误！");
//				setAttr("flag", false);
//				renderJson();
//				return;
//			}
//		}
//		else
//		{
//			doctor = Doctor.dao.getDoctorByUserName(name);
//			if (doctor == null) {
//				setAttr("loginerror", "用户名不存在！");
//				setAttr("flag", false);
//				renderJson();
//				return;
//			}
//			if(doctor.get("pwd").equals(pwd))
//			{
//				getSession().setAttribute("doctor", doctor);
//				setAttr("flag", true);
//				renderJson();
//				return;
//			}
//			else
//			{
//				setAttr("loginerror", "登陆密码错误！");
//				setAttr("flag", false);
//				renderJson();
//				return;
//			}
//		}
	}
	
}
