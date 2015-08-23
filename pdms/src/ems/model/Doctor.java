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

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import ems.config.EmsConfig;
import ems.util.MD5;
import ems.util.RegexUtil;

/**
 * 功能描述：
 * 
 */
public class Doctor extends Model<Doctor> {
	private static final long serialVersionUID = 1L;

	public final static Doctor dao = new Doctor();
	
	/** 启动服务时初始化数据字典 */ 
	public final static String QUERY_ENUM_REF = "select enum_ref,er_value,er_desc from enum_ref order by  enum_ref";
	/** 启动服务时初始化全局变量表 */ 
	public final static String QUERY_GLOBALS = "select gv_name,gv_value,gv_desc from globals order by gv_name";
	/** 启动服务时初始化医生机构表 */ 
	public final static String QUERY_ORG_REF= "select * from org_ref order by orgid";
	/** 启动服务时初始化证书描述表 */ 
	public final static String QUERY_REF_CTFTYPE= "select * from ref_ctftype order by ctid";
	/** 根据用户名phone查询Doctor */
	public final static String QUERY_DOCTOR_BYPHONE = "select * from doctor where phone=?";
	/** 根据用户名did查询Doctor */
	public final static String QUERY_DOCTOR_BYDID = "select * from doctor where did=?";
	/** 根据医生级别,ID号进行排名 */
	public final static String QUERY_RANK_BYLEVEL = "SELECT (@rownum := @rownum + 1)as num,did  FROM doctor a ,(SELECT @rownum :=0) r  ORDER BY  level desc,did;";
	/** 查询Doctor科室信息 */
	public final static String QUERY_DOCTOR_DPNAME = "SELECT a.dpid,b.name from ddmap a,ref_department b where a.dpid=b.dpid and a.did=?";
	/** 查询Doctor资质信息 */
	public final static String QUERY_DOCTOR_CERTIFICATION = "select * from certification a, ref_ctftype b where a.ctid=b.ctid and did=? order by a.ctid";
	
	/**
	 * 根据用户名查询用户信息
	 * 
	 * @return Doctor
	 */
	public List<Record> getCertificationByDid(String did) {
		List<Record> rd = Db.find(Doctor.QUERY_DOCTOR_CERTIFICATION, did);
		return rd;
	}
	/**
	 * 根据用户名查询用户信息
	 * 
	 * @return Doctor
	 */
	public Doctor getByDoctorDid(String did) {
		Doctor doctor = findFirst(Doctor.QUERY_DOCTOR_BYDID, did);
		return doctor;
	}
	/**
	 * 根据用户名查询用户信息
	 * 
	 * @return Doctor
	 */
	public Doctor getByDoctorPhone(String phone) {
		Doctor doctor = findFirst(Doctor.QUERY_DOCTOR_BYPHONE, phone);
		return doctor;
	}
	/**
	 * 根据医生级别,ID号进行排名
	 * 
	 * @return List<Record>
	 */
	public List<Record> getRankByDid(String did) {
		List<Record> result =Db.find(Doctor.QUERY_RANK_BYLEVEL);
		return result;
	}
	/**
	 * 根据用户名查询用户信息
	 * 
	 * @return List<Record>
	 */
	public List<Record> getDpnameByDid(String did) {
		List<Record> result = Db.find(Doctor.QUERY_DOCTOR_DPNAME, did);
		return result;
	}
}
