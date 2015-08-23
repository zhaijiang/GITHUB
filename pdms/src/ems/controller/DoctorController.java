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



import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.aop.Before;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

import ems.model.Areadiv;
import ems.model.Certification;
import ems.model.Chnreg;
import ems.model.Ddmap;
import ems.model.Doctor;
import ems.model.Orders;
import ems.model.Otrace;
import ems.util.ConstClass;
import ems.util.TokenUtil;
/**
 * 
 * @author jintao
 *
 */
public class DoctorController extends BaseController  {
	public DoctorController() {
		 setClazz(Doctor.class);
		}
	/**
	 * 
	 * @Title loginapp
	 * @Description 处理APP客户端用户登录Action
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void login(){
		String pwd = getPara("ct");//登陆密码
		String phone = getPara("phone");//电话
		String code = getPara("code");//短信验证码
		String device = getPara("dt");//机器码
		Doctor doctor = new Doctor();
		doctor = Doctor.dao.getByDoctorPhone(phone);
		if (doctor == null) {
			setAttr("error", "用户名不存在！");
			setAttr("flag", false);
			renderJson();
			return;
		}
		if(doctor.get("pwd").equals(pwd))
		{
			
			String token = TokenUtil.getToken(device, phone, pwd, String.valueOf(Math.random()));
			//保存token到数据库
			Record record = new Record();
			record.set("did", doctor.get(ConstClass.DID));
			record.set("token", token);//注册时的token
			record.set("lct", new Date());//最后修改时间
			record.set("lastlogintime", new Date());//最后登录时间
			Db.update("Doctor", "did", record);
			//保存登陆信息到session
			doctor.set("token", token);
			getSession().setAttribute("doctor", doctor);
			//对返回前台的参数进行封装
			Record rd = new Record();
			rd.set("status", doctor.get("status"));//医生状态
			rd.set("did", doctor.get("did"));//医生唯一id
			rd.set("level", doctor.get("level"));//医生等级
			rd.set("photo", doctor.get("photo"));//医生照片路径
			rd.set("account", doctor.get("account"));//收款账户
			rd.set("score", doctor.getInt("score"));//医生积分
			rd.set("insbegin", doctor.get("insbegin"));//保单开始生效日期
			rd.set("insend", doctor.get("insend"));//保单结束生效日期
			rd.set("svc_num", ConstClass.GLOBALS_HASHMAP.get("svc_num"));//客服电话号码
			rd.set("price_limit", ConstClass.GLOBALS_HASHMAP.get("price_limit"));//平台收取的服务费，单位元
			rd.set("unlimited_level", ConstClass.GLOBALS_HASHMAP.get("unlimited_level"));//医生获得自主定价的等级
			if(((HashMap<String,String>) ConstClass.ENUM_REF_HASHMAP.get("ptcertify_level")).get(doctor.getInt("ptlvl").toString())!=null){
				rd.set("ptlvl",  ((HashMap<String,String>) ConstClass.ENUM_REF_HASHMAP.get("ptcertify_level")).get(doctor.getInt("ptlvl").toString()));//医生职称等级，取值参考enum_ref表相关数据
			}else{
				rd.set("ptlvl","");//医生职称等级
			}
			if(((HashMap<String,String>) ConstClass.ENUM_REF_HASHMAP.get("pqcertify_level")).get(doctor.getInt("ctflvl").toString())!=null){
				rd.set("ctflvl",  ((HashMap<String,String>) ConstClass.ENUM_REF_HASHMAP.get("pqcertify_level")).get(doctor.getInt("ctflvl").toString()));//医师资格等级，取值参考enum_ref表相关数据
			}else{
				rd.set("ctflvl","");//医师资格等级
			}
			if(((HashMap<String,String>) ConstClass.ENUM_REF_HASHMAP.get("pqcertify_type")).get(doctor.getInt("ctftype").toString())!=null){
				rd.set("ctftype", ((HashMap<String,String>) ConstClass.ENUM_REF_HASHMAP.get("pqcertify_type")).get(doctor.getInt("ctftype").toString()));////医师资格类型，取值参考enum_ref表相关数据
			}else{
				rd.set("ctftype","");//医师资格类型
			}
			if(ConstClass.ORG_REF_HASHMAP.get(Long.parseLong(String.valueOf(doctor.getInt("org"))))!=null){
				rd.set("org", ((Record) ConstClass.ORG_REF_HASHMAP.get(Long.parseLong(String.valueOf(doctor.getInt("org"))))).get("name"));//医生所服务的机构，取值参考org_ref表
			}else{
				rd.set("org","");//医生所服务的机构，取值参考org_ref表
			}
			String did = doctor.getLong(ConstClass.DID).toString();
			List<Record> lis = Doctor.dao.getCertificationByDid(did);
			rd.set("remark", doctor.get("remark"));//医生信息备注字段，存放审核失败结果原因等信息
			rd.set("certiList", lis);
			rd.set("token", token);
			setAttr("result", rd);
			renderJson();
		}
		else
		{
			setAttr("error", "输入的密码或验证码错误！");
			setAttr("flag", false);
			renderJson();
			return;
		}
	}
	/**
	 * 
	 * @Title resetpwd
	 * @Description 处理APP客户端用户重置密码Action
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void resetpwd(){
		String pwd = getPara("ct");//登陆密码
		String phone = getPara("phone");//电话
		String code = getPara("code");//短信验证码
		String device = getPara("dt");//机器码
		if(code==null||code.isEmpty()){
			setAttr("error", "短信验证码不能为空！");
			setAttr("flag", false);
			renderJson();
			return;
		}
		if(!code.equals(code)){
			setAttr("error", "短信验证码不正确！");
			setAttr("flag", false);
			renderJson();
			return;
		}
		Doctor doctor = new Doctor();
		doctor = Doctor.dao.getByDoctorPhone(phone);
		if (doctor == null) {
			setAttr("error", "此号尚未注册！");
			setAttr("flag", false);
			renderJson();
			return;
		}
		Record record = new Record();
		record.set("did", doctor.get("did"));
		record.set("pwd", pwd);//注册时的token
		Db.update("Doctor", "did", record);
	}
	/**
	 * 
	 * @Title getPhotoVersion
	 * @Description 从文件名字获取医生图片版本号
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:30:06
	 */
	public int getPhotoVersion(){
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		Long picid = Long.parseLong(getPara("picid"));
		String url = doctor.getStr("photo");
		Long did = Long.parseLong(getPara("did"));
		//版本号
		int version = 0;
		//不是医生头像标示
		if(picid!=ConstClass.PHOTO){
			Record rds = Db.findFirst("select pic4v from certification where did=? and ctid=?",did,picid);
			if(rds!=null){
				url = rds.getStr("pic4v");
				int num1 = url.lastIndexOf("_");
				int num2 = url.lastIndexOf(".");
				if(num1==-1||num2==-1){
					setAttr("error", "数据库文件名称格式错误！");
					setAttr("flag", false);
					renderJson();
					return 0;
				}
				//获取当前版本号
				version = Integer.parseInt(url.substring(num1+1, num2))+1;
			}else{
				version = version +1;
			}
		}
		else{
			if(url==null||url.isEmpty()){
				version = version +1;
			}else{
				int num1 = url.lastIndexOf("_");
				int num2 = url.lastIndexOf(".");
				if(num1==-1||num2==-1){
					setAttr("error", "数据库文件名称格式错误！");
					setAttr("flag", false);
					renderJson();
					return 0;
				}
				//获取当前版本号
				version = Integer.parseInt(url.substring(num1+1, num2))+1;
			}
		}
		return version;
	}
	/**
	 * 
	 * @Title getaccountinfo
	 * @Description 获取医生账户信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:30:06
	 */
	public void getaccountinfo(){
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		Record rd = new Record();
		rd.set("name", doctor.get("name"));           //医生姓名
		rd.set("level", doctor.get("level"));         //医生等级
		rd.set("idno", doctor.get("idno"));           //身份证号码
		rd.set("account", doctor.get("account"));     //医生支付宝账户
		rd.set("addr", doctor.get("addr"));     //医生详细地址
		rd.set("times", doctor.get("times"));         //出诊次数
		rd.set("score", doctor.get("score"));         //医生积分数
		setAttr("result", rd);
		renderJson();
	}
	/**
	 * 
	 * @Title setaccountinfo
	 * @Description 修改账户信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void setaccountinfo(){
		Doctor doctor = (Doctor)getSession().getAttribute("doctor");
		Record rd = new Record();
		rd.set("did", doctor.get("did"));//医生头像路径
		if(getPara("photo")!=null){
			rd.set("photo", getPara("photo"));//医生头像路径
		}
		if(getPara("account")!=null){
			rd.set("account", getPara("account"));//医生支付宝账户
		}
		if(getPara("phone")!=null){
			rd.set("phone", getPara("phone"));//手机号
		}
		if(getPara("pwd")!=null){
			rd.set("pwd", getPara("pwd"));//密码
		}
		Db.update("Doctor", "did", rd); 
		getSession().setAttribute("doctor", doctor);
		renderJson();
	}
	/**
	 * 
	 * @Title getattendoutinfo
	 * @Description 获取出诊信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	public void getattendoutinfo(){
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		Record rd = new Record();
		rd.set("svcrange", doctor.get("svcrange"));   //医生出诊最大范围，单位为公里
		rd.set("price", doctor.get("price"));         //医生出诊费
		rd.set("intro", doctor.get("intro"));
		rd.set("addr", doctor.get("addr"));     //医生详细地址
		List<Record> lis = Doctor.dao.getDpnameByDid(doctor.get(ConstClass.DID).toString());
		if(lis.size()!=0){
			rd.set("dpid", lis.get(0).get("dpid")); 
			rd.set("name", lis.get(0).get("name")); 
		}else{
		    rd.set("dpid", "");
		    rd.set("name", ""); 
		}
		setAttr("result", rd);
		renderJson();
	}
	/**
	 * 
	 * @Title setattendoutinfo
	 * @Description 修改出诊范围
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void setattendrange(){
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		Record rd = new Record();
		rd.set("did", doctor.getLong(ConstClass.DID));
		rd.set("svcrange", getPara("svcrange"));
		Db.update("Doctor", "did", rd); 
		getSession().setAttribute("doctor", doctor);
		renderJson();
	}
	/**
	 * 
	 * @Title setattendoutinfo
	 * @Description 修改出诊费
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void setattendprice(){
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		Record rd = new Record();
		rd.set("did", doctor.getLong(ConstClass.DID));
		rd.set("price", getPara("price"));
		Db.update("Doctor", "did", rd); 
		getSession().setAttribute("doctor", doctor);
		renderJson();
	}
	/**
	 * 
	 * @Title getaddress
	 * @Description 获取地址信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	public void getaddress(){
		String did = getPara(ConstClass.DID);
		Record record = Db.findFirst("select x,y,addr,detailaddr from doctor where did=?",did);
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title setaddress
	 * @Description 修改地址信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void setaddress(){
		Record record = new Record();
		record.set("did", getPara(ConstClass.DID));
		record.set("x", getPara("x"));
		record.set("y", getPara("y"));
		record.set("addr", getPara("addr"));
		Db.update("Doctor", "did", record);
		renderJson();
	}
	/**
	 * 
	 * @Title setintroduce
	 * @Description 修改擅长及个人介绍信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void setintroduce() {
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		Record rd = new Record();
		String did = doctor.getLong("did").toString();
		String intro = getPara("intro");
		rd.set("did", did);   
		if(intro!=null){
			rd.set("did", did);
			rd.set("intro", intro);
			Db.update("doctor","did",rd);
		}
		getSession().setAttribute("doctor",doctor);
		renderJson();
	}
	/**
	 * 
	 * @Title setintroduce
	 * @Description 修改擅长及个人介绍信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void setdepartment() {
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		Record rd = new Record();
		String did = doctor.getLong("did").toString();
		String dpid = getPara("dpid");
		rd.set("did", did);   
		rd.set("dpid", dpid);   
		Record rds = Db.findFirst("select count(*) as cn from ddmap where did=?",did);
		if(dpid!=null){
			if(rds.get("cn").toString().equals("0")){
				Db.save("ddmap", rd);
			}else{
				Db.update("update ddmap set dpid='"+dpid+"' where did=?",did); 
			}
		}
		renderJson();
	}
	/**
	 * 
	 * @Title getcertifyshowflag
	 * @Description  获取证书显示信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void getcertifyshowflag(){
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		String did = doctor.getLong(ConstClass.DID).toString();
		List<Record> record = Db.find("select a.did,a.ctid,b.name,a.bshow from certification a, ref_ctftype b where a.ctid=b.ctid and did=? order by a.ctid",did);
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title getcertifyshowinfo
	 * @Description  设置证书是否显示
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void setcertifyshowflag(){
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		String did = doctor.getLong(ConstClass.DID).toString();
		Map<String, String[]> map = getParaMap();
		//token 和 did 参数长度为2
		if(map.keySet().size()-2<=0){
			setAttr("flag", false);
			setAttr("error", "证书显示方式无修改！");
		}
		//定义数组封装参数，去掉token 和 did 参数长度
		Object[][] ob = new Object[(map.keySet().size()-2)/2][2] ;
		int i=0;
		int j=0;
		for (String key : map.keySet()) {  
			if(key.equals("did")||key.equals("token")){
				continue;
			}
			if(key.contains(String.valueOf(i))){
				ob[i][j] = map.get(key)[0];
				j++;
			}else{
				++i;
				j=0;
				ob[i][j] = map.get(key)[0];
				j++;
			}
		}  
		Db.batch("update certification set bshow=? where did='"+did+"' and ctid=?", ob, ob.length);
		renderJson();
	}
	/**
	 * 
	 * @Title getcertifyshowinfo
	 * @Description  获取证件展示设定信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	public void getcertifyshowinfo(){
		String did = getPara(ConstClass.DID);
		Record record = Db.findFirst("select pqcertify,ppcertify,professionaltitle,hospital from certification where did=?",did);
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title setcertifyshowinfo
	 * @Description  修改证件展示设定信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void setcertifyshowinfo(){
		Map<String, Object> certificationAttrs = new HashMap<String, Object>();
		certificationAttrs.put("did", getPara(ConstClass.DID));
		certificationAttrs.put("pqcertify", getPara("pqcertify"));
		certificationAttrs.put("ppcertify", getPara("ppcertify"));
		certificationAttrs.put("professionaltitle", getPara("professionaltitle"));
		certificationAttrs.put("hospital", getPara("hospital"));
		Certification.dao.setAttrs(certificationAttrs).update();
		setAttr("result", 0);
		renderJson();
	}
	/**
	 * 
	 * @Title getidcardinfo
	 * @Description  获取身份证信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	public void getidcardinfo(){
		String did = getPara(ConstClass.DID);
		Record record = Db.findFirst("select idcard,picpath from certification where did=?",did);
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title getpqcertifyinfo
	 * @Description  修改证件展示设定信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	public void getpqcertifyinfo(){
		String did = getPara(ConstClass.DID);
		Record record = Db.findFirst("select level,class,picpath from certification where did=?",did);
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title getppcertifyinfo
	 * @Description  获取医师执业证信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	public void getppcertifyinfo(){
		String did = getPara(ConstClass.DID);
		Record record = Db.findFirst("select picpath from certification where did=?",did);
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title setppcertifyinfo
	 * @Description  修改医师执业证信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void setppcertifyinfo(){
		Map<String, Object> certificationAttrs = new HashMap<String, Object>();
		certificationAttrs.put("did", getPara(ConstClass.DID));
		certificationAttrs.put("picpath", getPara("picpath"));
		Certification.dao.setAttrs(certificationAttrs).update();
		setAttr("result", 0);
		renderJson();
	}
	/**
	 * 
	 * @Title getprofessionaltitleinfo
	 * @Description 获取职称证信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	public void getprofessionaltitleinfo(){
		String did = getPara(ConstClass.DID);
		Record record = Db.findFirst("select level,picpath from certification where did=?",did);
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title setprofessionaltitleinfo
	 * @Description  修改职称证信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void setprofessionaltitleinfo(){
		Map<String, Object> certificationAttrs = new HashMap<String, Object>();
		certificationAttrs.put("did", getPara(ConstClass.DID));
		certificationAttrs.put("level", getPara("level"));
		certificationAttrs.put("picpath", getPara("picpath"));
		Certification.dao.setAttrs(certificationAttrs).update();
		setAttr("result", 0);
		renderJson();
	}
	/**
	 * 
	 * @Title sethospitalinfo
	 * @Description  修改所服务医疗机构证明证信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void sethospitalinfo(){
		Map<String, Object> certificationAttrs = new HashMap<String, Object>();
		certificationAttrs.put("did", getPara(ConstClass.DID));
		certificationAttrs.put("name", getPara("name"));
		certificationAttrs.put("picpath", getPara("picpath"));
		Certification.dao.setAttrs(certificationAttrs).update();
		setAttr("result", 0);
		renderJson();
	}
	/**
	 * 
	 * @Title getinsurancebillinfo
	 * @Description 获取医疗事故保险购买证明信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	public void getinsurancebillinfo(){
		String did = getPara(ConstClass.DID);
		Record record = Db.findFirst("select begindate,enddate,picpath from certification where did=?",did);
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title setinsurancebillinfo
	 * @Description  修改医疗事故保险购买证明信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	@Before({Tx.class})
	public void setinsurancebillinfo(){
		Map<String, Object> certificationAttrs = new HashMap<String, Object>();
		certificationAttrs.put("did", getPara(ConstClass.DID));
		certificationAttrs.put("begindate", getPara("begindate"));
		certificationAttrs.put("enddate", getPara("enddate"));
		certificationAttrs.put("picpath", getPara("picpath"));
		Certification.dao.setAttrs(certificationAttrs).update();
		setAttr("result", 0);
		renderJson();
	}
	/**
	 * 
	 * @Title gethospitalinfo
	 * @Description 获取所服务医疗机构证明信息
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:35:26
	 */
	public void gethospitalinfo(){
		String did = getPara(ConstClass.DID);
		Record record = Db.findFirst("select name,picpath from certification where did=?",did);
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title getonline
	 * @Description 验证医生在线状态 
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void getonline(){
		//前台传递的令牌和医生id
		String loginToken = getPara(ConstClass.LOGINTOKEN);
		String did = getPara(ConstClass.DID);
		//设定默认值为离线状态
		String value = ConstClass.DOCTOROFFLINE;
		//获取医生令牌进行令牌判断
		Record record = Db.findFirst("select token from doctor where did=?",did);
		if(loginToken.equals(record.get(ConstClass.TOKEN)))
		{
			value = ConstClass.DOCTORONLINE;
		}
		setAttr("result", value);
		renderJson();
	}
	/**
	 * 
	 * @Title getcode
	 * @Description 获取验证码
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void getcode(){
		//前台传递的手机号
		String phone = getPara(ConstClass.PHONE);
		//发送短信到手机
		String value = sendMessage(phone);
		setAttr("result", value);
		renderJson();
	}
	
	private String sendMessage(String phone) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 
	 * @Title logout
	 * @Description 登出
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void logout(){
		String did = getPara("did");//医生DID
		Record record = new Record();
		record.set("did", did);//医生DID
		record.set("token", "");//注册时的token
		Db.update("Doctor", "did", record);
	}
	/**
	 * 
	 * @Title register
	 * @Description 注册
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void register(){
		String phone =  getPara(ConstClass.PHONE);
		String code =  getPara("code");
		String pwd = getPara("ct");
		String device = getPara("device");
		Doctor doctor = Doctor.dao.getByDoctorPhone(phone);
		String token = TokenUtil.getToken(device, phone, pwd, String.valueOf(Math.random()));
		if(doctor!=null){
			//注册手机号已存在！
			setAttr("error", "注册手机号已存在！");
			setAttr("flag", false);
			renderJson();
			return;
		}
		//注册信息
		Record record = new Record();
		record.set("phone",phone);//前台传递的手机号
		record.set("pwd", pwd);//前台传递的密码
		record.set("status", 0);//注册时的医生状态
		record.set("level", 1);//注册时的医生等级
		record.set("token", token);//注册时的token
		record.set("regtime", new Date());//注册时的时间
		record.set("score", 0);//医生积分
		Db.save("Doctor", "did", record);
		//注册成功！
		doctor = Doctor.dao.getByDoctorPhone(phone);
		//保存注册信息到session
		getSession().setAttribute("doctor", doctor);
		//封装注册信息返回前台
		record = new Record();
		record.set("status", 0);
		record.set("did", doctor.get("did"));
		record.set("token", token);
		record.set("level", 1);
		record.set("score", 0);
		record.set("svc_num", ConstClass.GLOBALS_HASHMAP.get("svc_num"));
		record.set("price_limit", ConstClass.GLOBALS_HASHMAP.get("price_limit"));
		record.set("unlimited_level", ConstClass.GLOBALS_HASHMAP.get("unlimited_level"));
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title fullInfo
	 * @Description 注册之后完善信息
	 * @Author zhukecai
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void fullInfo(){
		Map<String, Object> doctorAttrs = new HashMap<String, Object>();
		Map<String, Object> certificationAttrs = new HashMap<String, Object>();
		Map<String, Object> ddmapAttrs = new HashMap<String, Object>();
		//手机号
		doctorAttrs.put("phone", getPara(ConstClass.PHONE));
		//医生姓名
		doctorAttrs.put("name", getPara("name"));
		//身份证号码,
		doctorAttrs.put("idno", getPara("idno"));
		//医生坐诊位置所在区域
		doctorAttrs.put("adid", getPara("adid"));
		//医生坐诊位置描述
		doctorAttrs.put("addr", getPara("addr"));
		//出诊费
		doctorAttrs.put("price", getPara("price"));
		//医生坐诊位置精度
		doctorAttrs.put("x", getPara("x"));
		//医生坐诊位置纬度
		doctorAttrs.put("y", getPara("y"));
		//医生自我介绍
		doctorAttrs.put("intro", getPara("intro"));
		//资格证书路径
		doctorAttrs.put("certification", getPara("certification"));
		
		ddmapAttrs.put("did", getPara("did"));
		//医生所属科室ID
		ddmapAttrs.put("dpid", getPara("dpid"));
		certificationAttrs.put("dpid", getPara("dpid"));
		certificationAttrs.put("dpid", getPara("dpid"));
		Doctor.dao.setAttrs(doctorAttrs).update();
		Ddmap.dao.setAttrs(ddmapAttrs).save();
		Certification.dao.setAttrs(ddmapAttrs).save();
	}
	/**
	 * 
	 * @Title review
	 * @Description 申请审核
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void review(){
		Doctor doctor = (Doctor)getSession().getAttribute("doctor");
		Record record = new Record();
		record.set("status", 1);
		record.set("did", doctor.get("did"));
		//更新医生表
		Db.update("Doctor", "did", record);
		setAttr("result", record);
	}
	/**
	 * 
	 * @Title setattendinfo
	 * @Description 设置出诊信息
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void setattendinfo(){
		Doctor doctor = (Doctor)getSession().getAttribute("doctor");
		Record record = new Record();
		record.set("addr", getPara("addr"));
		record.set("price", getPara("price"));
		record.set("svcrange", getPara("svcrange"));
		record.set("intro", getPara("intro"));
		record.set("x", getPara("x"));
		record.set("y", getPara("y"));
		record.set("status", 4);
		record.set("did", doctor.get("did"));
		//更新缓存中的医生信息
		doctor.set("addr", getPara("addr"));
		doctor.set("price", getPara("price"));
		doctor.set("svcrange", getPara("svcrange"));
		doctor.set("intro", getPara("intro"));
		doctor.set("x", getPara("x"));
		doctor.set("y", getPara("y"));
		doctor.set("status", 4);
		getSession().setAttribute("doctor",doctor);
		//增加医生分科表记录
		Ddmap ddmap = new Ddmap();
		ddmap.set("dpid", getPara("dpid"));
		ddmap.set("did", doctor.get("did"));
		Db.update("delete  from ddmap where did=?",doctor.get("did"));
		//更新科室表
		ddmap.save();
		//更新医生表
		Db.update("Doctor", "did", record);
		//封装参数返回前台
		record = new Record();
		record.set("status", 4);
		setAttr("result", record);
	}
	/**
	 * 
	 * @Title getdoctororders
	 * @Description 获取医生订单列表
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void getdoctororders(){
		  
		int fromNumber = Integer.parseInt(getPara("from"));
		int toNumber = Integer.parseInt(getPara("to"));;
		//获取医生令牌进行令牌判断
		Page<Record> orders = Db.paginate(fromNumber,toNumber, " select a.oid,a.uid,b.name,a.allcost,a.createtime,a.status ", 
				" from orders a LEFT JOIN USER b on a.uid=b.uid order by a.createtime desc " );
		setAttr("orders", orders);
		Record rd = Db.findFirst("select count(*) as allcount from orders where did=? group by did",getPara("did"));
		setAttr("allcount", rd.get("allcount"));
		renderJson();
	}
	/**
	 * 
	 * @Title getorderdetail
	 * @Description 获取订单详情
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void getorderdetail(){
		
		List<Record> lis = Db.find(" select a.oid,a.createtime,a.distance,a.price,a.roadcost,a.allcost,b.name as user,b.phone "+
								   " from  orders a "+
								   " LEFT JOIN USER b on a.uid=b.uid "+
								   " order by a.createtime desc");
		setAttr("result", lis);
		renderJson();
	}
	/**
	 * 
	 * @Title getorderhistory
	 * @Description 获取订单操作记录
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void getorderhistory(){
		
		List<Record> lis = Db.find(" select * from otrace where oid=?",getPara("oid"));
		setAttr("result", lis);
		renderJson();
	}
	/**
	 * 
	 * @Title reeval2
	 * @Description 评价回复2 
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void reeval2(){
		Map<String, Object> attrs = new HashMap<String, Object>();
		attrs.put("reeval2", getPara("reeval2"));
		//前台传递的备注
		attrs.put("oid", getPara("oid"));
		Orders.dao.setAttrs(attrs).save();
		setAttr("result", 1);
		renderJson();
	}
	/**
	 * 
	 * @Title modifyorder
	 * @Description 挂机恢复订单
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void modifyorder(){
		Map<String, Object> attrs = new HashMap<String, Object>();
		attrs.put("stauts", getPara("action"));
		//前台传递的备注
		attrs.put("oid", getPara("oid"));
		Orders.dao.setAttrs(attrs).update();
		Otrace.dao.setAttrs(attrs).update();
		setAttr("result", 1);
		renderJson();
		
	}
	/**
	 * 
	 * @Title uploadservicelog
	 * @Description 服务记录上传
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void uploadservicelog(){
		
	}
	/**
	 * 
	 * @Title getonline
	 * @Description 验证医生在线状态 
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void getmyinfo(){
		List<Record> lis = Db.find(" SELECT * from doctor x where x.did=?",getPara("did"));
		setAttr("result", lis);
		renderJson();
	}
	/**
	 * 
	 * @Title modifymyinfo
	 * @Description 获取我的基本资料 
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void modifymyinfo(){
		Record record = new Record();
		record.set("price", getPara("price"));
		//前台传递的备注
		record.set("photo", getPara("photo"));
		//前台传递的备注
		record.set("intro", getPara("intro"));
		//前台传递的备注
		record.set("did", getPara("did"));
		Db.update("Doctor", "did", record);
		
	}
	/**
	 * 
	 * @Title modifyuserphone
	 * @Description 修改电话
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void modifyuserphone(){
		Doctor dc = Doctor.dao.getByDoctorPhone(getPara("phone"));
		if(dc!=null){
			setAttr("flag", false);
			setAttr("error", "新手机号已被别人注册！");
			return;
		}
		Record record = new Record();
		record.set("did", getPara(ConstClass.DID));
		record.set("phone", getPara("phone"));
		Db.update("Doctor", "did", record);
	}
	/**
	 * 
	 * @Title modifyalipayaccount
	 * @Description 修改支护宝账户信息
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void modifyalipayaccount(){
		Record record = new Record();
		record.set("did", getPara(ConstClass.DID));
		record.set("account", getPara("account"));
		Db.update("Doctor", "did", record);
	}
	/**
	 * 
	 * @Title modifyaccountpwd
	 * @Description 修改密码
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void modifyaccountpwd(){
		Doctor doctor = (Doctor)getSession().getAttribute("doctor");
		Record record = new Record();
		record.set("did", getPara(ConstClass.DID));
		if(!getPara("oldpwd").equals(doctor.get("pwd"))){
			setAttr("error", "当前密码错误！");
			setAttr("flag", false);
		}
		record.set("pwd", getPara("newpwd"));
		Db.update("Doctor", "did", record);
	}
	/**
	 * 
	 * @Title getgoodat
	 * @Description 获取我的擅长
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void getgoodat(){
		List<Record> lis = Db.find("SELECT b.dpid,c.name from ddmap b LEFT JOIN ref_department c on b.dpid=c.dpid",getPara("did"));
		setAttr("result", lis);
		renderJson();
	}
	/**
	 * 
	 * @Title modifygoodat
	 * @Description 获取我的擅长 
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void modifygoodat(){
		Map<String, Object> chnregattrs = new HashMap<String, Object>();
		Map<String, Object> ddmapgattrs = new HashMap<String, Object>();
		chnregattrs.put("goodat", getPara("goodat"));
		//前台传递的备注
		chnregattrs.put("did", getPara("did"));
		ddmapgattrs.put("dpid", getPara("dpid"));
		//前台传递的备注
		ddmapgattrs.put("did", getPara("did"));
		Chnreg.dao.setAttrs(chnregattrs).update();
		Chnreg.dao.setAttrs(ddmapgattrs).update();
		setAttr("result", 0);
		renderJson();
	}
	/**
	 * 
	 * @Title getmyarea
	 * @Description 获取我的上门区域信息
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void getmyarea(){
		List<Record> lis = Db.find("SELECT a.addr,a.adid,b.x,b.y from doctor a LEFT JOIN areadiv b on a.adid=b.adid where a.did=?",getPara("did"));
		setAttr("result", lis);
		renderJson();
	}
	/**
	 * 
	 * @Title modifymyarea
	 * @Description 修改我的上门区域信息 
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void modifymyarea(){
		Map<String, Object> doctorgattrs = new HashMap<String, Object>();
		Map<String, Object> areadivgattrs = new HashMap<String, Object>();
		doctorgattrs.put("adid", getPara("adid"));
		doctorgattrs.put("addr", getPara("addr"));
		//前台传递的备注
		doctorgattrs.put("did", getPara("did"));
		
		areadivgattrs.put("adid", getPara("adid"));
		//前台传递的备注
		areadivgattrs.put("x", getPara("x"));
		//前台传递的备注
		areadivgattrs.put("y", getPara("y"));
		Doctor.dao.setAttrs(doctorgattrs).update();
		Areadiv.dao.setAttrs(areadivgattrs).update();
		setAttr("result", 0);
		renderJson();
	}
	/**
	 * 
	 * @Title getcertification
	 * @Description 获取我的资格证书
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void getcertification(){
		List<Record> lis = Db.find("SELECT a.did,b.desc,b.picpath from doctor a LEFT JOIN certification b on a.did=b.did where a.did=?",getPara("did"));
		setAttr("result", lis);
		renderJson();
	}
	/**
	 * 
	 * @Title getuploadpicpath
	 * @Description 获取图片地址
	 * @Author jintao
	 * @CreateDate 2015-8-11 下午5:18:56
	 */
	public void getuploadpicpath(){
		String picid = getPara("picid");
		String did = getPara("did");
		String oid = getPara("oid");
		String picpath = "";
		Record record = new Record();
		if(("7").equals(picid)){
		   record = Db.findFirst("select photo from doctor where did=?",did);
		   picpath = record.get("photo");
		}else if(("8").equals(picid)){
		   record = Db.findFirst("select record_pic from orders where oid=?",oid);
		   picpath = record.get("path");
		}else{
		   record = Db.findFirst("select picpath from certification where ctid=?",picid);
		   picpath = record.get("picpath");	
		}
		record = new Record();
		record.set("picpath", picpath);
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title modifycertification
	 * @Description 修改我的资格证书
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void modifycertification(){
		Map<String, Object> certification = new HashMap<String, Object>();
		certification.put("did", getPara("did"));
		certification.put("picpath", getPara("picpath"));
		certification.put("desc", getPara("desc"));
		Certification.dao.setAttrs(certification).update();
	}
	/**
	 * 
	 * @Title getmyscore
	 * @Description 我的得分 
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void getmyscore(){
		Record record = Db.findFirst("SELECT a.espeed,a.eattitude,a.erecord,a.eeffect,a.esupport from doctor a where a.did=?",getPara("did"));
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title getdownloadpicpath
	 * @Description 获取图片地址
	 * @Author jintao
	 * @CreateDate 2015-7-11 下午5:22:48
	 */
	public void getdownloadpicpath()
	{
		//String path = getRequest().getSession().getServletContext().getRealPath("/");
		String path="";
		Record record = new Record();
		if(getPara("picid").equals("7")){
			Doctor doctor = Doctor.dao.getByDoctorDid(getPara("did"));
			path = doctor.getStr("photo");
		}else if(getPara("picid").equals("8")){
			   record = Db.findFirst("select record_pic from orders where oid=?",getPara("oid"));
			   if(record!=null){
					path = record.getStr("record_pic");
				}
		}else{
			Record rd = Db.findFirst("select * from certification where did=? and ctid=?", getPara("did"),getPara("picid"));
			if(rd!=null){
				path = rd.getStr("picpath");
			}
		}
		record = new Record();
		if(path!=null&&!path.isEmpty()){
			record.set("picpath", path);
		}else{
			record.set("picpath", "");
			
		}
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title advise
	 * @Description  建议反馈
	 * @Author jintao
	 * @CreateDate 2015-7-11 下午5:22:48
	 */
	public void advise(){
		Record record = new Record();
		record.set("sender", 	getPara("did"));
		record.set("recver", 	getPara("recver"));
		record.set("sendtime", 	getPara("sendtime"));
		record.set("recvtime", 	0);
		record.set("status", 	0);
		record.set("content", 	getPara("content"));
		record.set("lct", 	new Date());
		Db.save("msg", record);
	}
}
