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
public class Globals extends Model<Globals> {
	private static final long serialVersionUID = 1L;

	public final static Globals dao = new Globals();
	/** 查询全局变量 */ 
	public final static String QUERY_GLOBALS = "select gv_name,gv_value,gv_desc,lct from globals";
	/**
	 *  查询全局变量 
	 * 
	 * @return List<Globals>
	 */
	public List<Globals> getGlobalsByNames(List<String> lis) {
	    String condition = " where gv_name in(";
		for (int i = 0; i < lis.size(); i++) {
			if(i!=lis.size()-1){
				condition = condition + "?" +",";
			}
			else{
				condition = condition + "?";
			}
		}
		condition = condition + ")";
		List<Globals> lisGlobals = find(Globals.QUERY_GLOBALS + condition, lis.toArray());
		return lisGlobals;
	}
}
