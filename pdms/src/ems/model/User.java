/**
 * 文件名：User.java
 * 创建日期： 2014年5月7日
 * 作者：     lipanpan
 * Copyright (c) 2009-2011 无线开发室
 * All rights reserved.
 
 * 修改记录：
 * 	1.修改时间：2014年5月7日
 *   修改人：lipanpan
 *   修改内容：
 */
package ems.model;


import com.jfinal.plugin.activerecord.Model;


/**
 * 功能描述：
 * 
 */
public class User extends Model<User> {
	private static final long serialVersionUID = 1L;

	public final static User dao = new User();

	/** 根据用户名username查询用户User */
	public final static String QUERY_USER_BYNAME = "select * from user where name=?";

	/**
	 * 根据用户名查询用户信息
	 * 
	 * @return User
	 */
	public User getUserByUserName(String username) {
		User user = findFirst(User.QUERY_USER_BYNAME, username);
		return user;
	}


}
