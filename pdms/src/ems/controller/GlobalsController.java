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

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

import ems.model.Doctor;
import ems.model.Globals;
import ems.util.ConstClass;

/**
 * 
 * @author jintao
 *
 */
/**
 * @author Administrator
 *
 */
/**
 * @author Administrator
 *
 */
public class GlobalsController extends BaseController {
	public GlobalsController() {
		 setClazz(Globals.class);
		}
	
	/**
	 * 
	 * @Title getsysteminfo
	 * @Description 获取系统信息
	 * @Author jintao
	 * @CreateDate 2015-6-9 下午7:18:47
	 */
	public void getsysteminfo(){
		Enumeration<String> en = getParaNames();
		List<String> lis = new ArrayList<String>();
		  while(en.hasMoreElements())  
	      {  
			 lis.add(en.nextElement());
	      } 
		List<Globals> glob = Globals.dao.getGlobalsByNames(lis);
		for (int i = 0; i < glob.size(); i++) {
			setAttr(glob.get(i).getStr("gv_name"), glob.get(i).getStr("gv_value"));
		}
		renderJson();
	}
	/**
	 * 
	 * @Title advise
	 * @Description 建议反馈
	 * @Author jintao
	 * @CreateDate 2015-6-10 上午10:41:30
	 */
	public void advise(){
		String fmt = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat sdf = new SimpleDateFormat(fmt);
		Doctor doctor = (Doctor)getSession().getAttribute("doctor");
		Record rd = new Record();
		rd.set("sender", getPara("sender"));
		rd.set("recver", doctor.get("did"));
		rd.set("sendtime", sdf.format(Date.parse(getPara("sendtime").toString())));
		rd.set("recvtime", sdf.format(Date.parse(getPara("recvtime").toString())));
		rd.set("status", getPara("status"));
		rd.set("content", getPara("content"));
		rd.set("lct", sdf.format(Date.parse(getPara("lct").toString())));
		Db.save("Msg",rd);
	}
	
	/**
	 * @Title getenum_ref
	 * @deprecated 数据字典查询
	 * @author Hwj
	 * @CreateDate 2015年6月16日13:28:14
	 * 
	 */
	public void getenum_ref(){
		String param = getPara("code");
		List<Map<String, String>> result= new ArrayList<Map<String, String>>();
		HashMap<String, String> record = ConstClass.ENUM_REF_HASHMAP.get(param);
		Iterator<String> iterator = record.keySet().iterator();
		while(iterator.hasNext())
		{
			Map<String, String> node = new HashMap<String, String>();
			String code = iterator.next();
			node.put("name", record.get(code));
			node.put("value", code);
			result.add(node);
			}
		setAttr("result", result);
		renderJson();
	}
}
