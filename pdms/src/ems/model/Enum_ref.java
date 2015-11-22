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

import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import ems.config.EmsConfig;
import ems.util.MD5;
import ems.util.RegexUtil;

/**
 * 功能描述：
 * 
 */
public class Enum_ref extends Model<Enum_ref> {
	private static final long serialVersionUID = 1L;

	public final static Enum_ref dao = new Enum_ref();
}
