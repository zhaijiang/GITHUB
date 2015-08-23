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
import java.util.Enumeration;
import java.util.List;

import com.jfinal.aop.Before;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

import ems.model.Doctor;
import ems.model.Orders;
import ems.util.ConstClass;
/**
 * 
 * @author jintao
 *
 */
public class OrdersController extends BaseController {
	public OrdersController() {
		 setClazz(Orders.class);
		}
	/**
	 * 
	 * @Title getdoctororders
	 * @Description 获取医生订单列表
	 * @Author jintao
	 * @CreateDate 2015-8-3 下午2:11:27
	 */
	@Before({Tx.class})
	public void getdoctororders(){
		int fromNum = getParaToInt("from");
		int toNum = getParaToInt("to");
		int did = getParaToInt("did");
		Enumeration<String> en = getParaNames();
		int count = 0;
		String sqlCondition="";
		String cz="";
		  while(en.hasMoreElements())  
	      {  
			 String name = en.nextElement();
			 if(!name.contains("condition")){
				 continue;
			 }
			 if(!name.contains(String.valueOf(count))){
				 sqlCondition = sqlCondition + " or " + getPara(name);
				 count++;
			 }else{
				 if(name.contains("fieldName")){
					 sqlCondition = sqlCondition + " " + getPara(name);
				 }else if(name.contains("operation")){
					 sqlCondition = sqlCondition + " " + getPara(name);
					 cz = getPara(name);
				 }else{
					 if(cz.equals("like")){
						 sqlCondition = sqlCondition + " " + "'%"+getPara(name)+"%'";
					 }else{
						 sqlCondition = sqlCondition  + " " + getPara(name);
					 }
				 }
			 }
	      } 
		  if(sqlCondition.isEmpty()){
			  sqlCondition = "where did=" + did;
		  }else{
			  sqlCondition = "where did=" + did + " and " + sqlCondition; 
		  }
		  sqlCondition = sqlCondition + " limit " + fromNum + "," + toNum;
		  List<Record> orders = Db.find("select a.oid,a.price,a.createtime,a.status,b.name as user from orders a left join user b on a.uid=b.uid " + sqlCondition );
		  Record rd = new Record();
		  rd.set("orders", orders);
		  rd.set("allcount", orders.size());
		  setAttr("result", rd);
		  renderJson();
	}
	/**
	 * 
	 * @Title getuserrecords
	 * @Description 获取用户病历列表
	 * @Author jintao
	 * @CreateDate 2015-8-3 下午2:11:27
	 */
	@Before({Tx.class})
	public void getuserrecords(){
		int fromNum = getParaToInt("from");
		int toNum = getParaToInt("to");
		int uid = getParaToInt("uid");
		Enumeration<String> en = getParaNames();
		int count = 0;
		String sqlCondition="";
		String cz="";
		  while(en.hasMoreElements())  
	      {  
			 String name = en.nextElement();
			 if(!name.contains("condition")){
				 continue;
			 }
			 if(!name.contains(String.valueOf(count))){
				 sqlCondition = sqlCondition + " or " + "a." + getPara(name);
				 count++;
			 }else{
				 if(name.contains("fieldName")){
					 sqlCondition = sqlCondition + " " + "a." + getPara(name);
				 }else if(name.contains("operation")){
					 sqlCondition = sqlCondition + " " + getPara(name);
					 cz = getPara(name);
				 }else{
					 if(cz.equals("like")){
						 sqlCondition = sqlCondition + " " + "'%"+getPara(name)+"%'";
					 }else{
						 sqlCondition = sqlCondition  + " " + getPara(name);
					 }
				 }
			 }
	      } 
		  if(sqlCondition.isEmpty()){
			  sqlCondition = "where a.uid=" + uid;
		  }else{
			  sqlCondition = "where a.uid=" + uid + " and " + sqlCondition; 
		  }
		  sqlCondition = sqlCondition + " limit " + fromNum + "," + toNum;
		  List<Record> orders = Db.find("select a.oid,a.record,b.time as treattime from orders a left join otrace b on a.oid=b.oid and b.status=3 " + sqlCondition );
		  Record rd = new Record();
		  rd.set("records", orders);
		  rd.set("allcount", orders.size());
		  setAttr("result", rd);
		  renderJson();
	}
	/**
	 * 
	 * @Title setOrderReeval
	 * @Description 医生的评价
	 * @Author jintao
	 * @CreateDate 2015-5-29 上午11:55:45
	 */
	@Before({Tx.class})
	public void setOrderReeval(){
		String reeval = getPara("reeval").toString();
		Long oid = Long.parseLong(getPara("oid").toString());
		Record rd = Orders.dao.getInforByOid(oid);
		if(rd.getInt("status")==6){
			rd.set("reeval1", reeval);
			rd.set("reevaltime1", new Date());
		}
		if(rd.getInt("status")==8){
			rd.set("reeval2", reeval);
			rd.set("reevaltime2", new Date());
		}
		Db.update("orders", "oid", rd);
	}
	/**
	 * 
	 * @Title reeval
	 * @Description 评价回复
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	@Before({Tx.class})
	public void reeval(){
		String reeval = getPara("reeval");
		String oid = getPara("oid");
		Record record = new Record();
		Record rd = Orders.dao.getInforByOid(Long.parseLong(oid));
		//为空为第一次医生回复
		if(rd.get("reeval1")==null||rd.get("reeval1").toString().isEmpty()){
			record.set("status", 7L);
		}else{
			record.set("status", 11L);
		}
		record.set("reeval1", reeval);
		record.set("oid", Long.parseLong(oid));
		Db.update("orders", "oid", record);
		rd = new Record();
		rd.set("status", record.get("status"));
		setAttr("result", rd);
		renderJson();
		
	}
	/**
	 * 
	 * @Title modifyorderstatus
	 * @Description 修改订单状态
	 * @Author jintao
	 * @CreateDate 2015-8-12 下午2:22:58
	 */
	@Before({Tx.class})
	public void modifyorderstatus(){
		int status = getParaToInt("status");
		int oid = getParaToInt("oid");
		Record record = new Record();
		record.set("status", status);
		record.set("oid", oid);
		Db.update("orders", "oid", record);
		record.set("time", new Date());
		record.set("remark", "医生已经恢复订单，开始进行问诊服务");
		Db.save("otrace", record);
		setAttr("result", record);
		renderJson();
	}
	public String statusRemark(int status,String parameter){
		String statusRemark = "";
		switch (status) {
		case 0:
			statusRemark =  "订单编号："+parameter+"，请在提交订单后"+parameter+"分钟内完成支付。";
			break;
		case 1:
			statusRemark =  "请耐心等待医生确认订单";
			break;
		case 2:
			statusRemark =  "医生已开始出发，预计"+parameter+"分钟内到达，请耐心等待或主动联系医生";
			break;
		case 3:
			statusRemark =  "医生已经到达，开始进行问诊服务";
			break;
		case 4:
			statusRemark =  "问诊服务结束，等待用户确认支付";
			break;
		case 5:
			statusRemark =  "用户已确认支付，等待用户对问诊服务进行评价";
			break;
		case 6:
			statusRemark =  "用户已对问诊服务作出评价，等待医生回复";
			break;
		case 7:
			statusRemark =  "医生已回复用户评价，等待用户对疗效和跟踪服务进行评价";
			break;
		case 8:
			statusRemark =  "用户已对疗效和跟踪服务作出评价，等待医生回复";
			break;
		case 9:
			statusRemark =  "用户已取消订单，取消理由：”+cancelReason+“，等待医生进行确认";
			break;
		case 10:
			statusRemark =  "医生已挂起订单，"+parameter+"请用户耐心等待或联系医生恢复订单";
			break;
		case 11:
			statusRemark =  "订单完成";
			break;
		default:
			statusRemark =  "描述缺失,请联系管理员！";
			break;
		}
		return statusRemark;
	}
	/**
	 * 
	 * @Title getCountByType
	 * @Description 根据订单ID查询订单详情
	 * @Author jintao
	 * @CreateDate 2015-5-29 上午11:55:45
	 */
	public void getorderinfo(){
		Long did = getParaToLong("did");
		Long oid = getParaToLong("oid");
		Record rd = Orders.dao.getorderinfo(did,oid);
		List<Record> lis = Orders.dao.getotraceinfo(oid);
		rd.set("statuslist", lis);
		setAttr("result", rd);
		renderJson();
	}
	/**
	 * 
	 * @Title getordereval
	 * @Description 获取订单评价信息
	 * @Author jintao
	 * @CreateDate 2015-5-22 下午3:11:12
	 */
	public void getordereval(){
		Long oid =  getParaToLong("oid");
		Long did =  getParaToLong("did");
		Record rd = Orders.dao.getordereval(oid,did);
		setAttr("result", rd);
		renderJson();
	}
	/**
	 * 
	 * @Title getdoctorreevals
	 * @Description 获取医生回复列表
	 * @Author jintao
	 * @CreateDate 2015-8-14 下午2:02:50
	 */
	public void getdoctorreevals(){
		int fromNum = getParaToInt("from");
		int toNum = getParaToInt("to");
		int did = getParaToInt("did");
		Enumeration<String> en = getParaNames();
		int count = 0;
		String sqlCondition="";
		String cz="";
		  while(en.hasMoreElements())  
	      {  
			 String name = en.nextElement();
			 if(!name.contains("condition")){
				 continue;
			 }
			 if(!name.contains(String.valueOf(count))){
				 sqlCondition = sqlCondition + " or " + getPara(name);
				 count++;
			 }else{
				 if(name.contains("fieldName")){
					 sqlCondition = sqlCondition + " " + getPara(name);
				 }else if(name.contains("operation")){
					 sqlCondition = sqlCondition + " " + getPara(name);
					 cz = getPara(name);
				 }else{
					 if(cz.equals("like")){
						 sqlCondition = sqlCondition + " " + "'%"+getPara(name)+"%'";
					 }else{
						 sqlCondition = sqlCondition  + " " + getPara(name);
					 }
				 }
			 }
	      } 
		  if(sqlCondition.isEmpty()){
			  sqlCondition = "where did=" + did;
		  }else{
			  sqlCondition = "where did=" + did + " and " + sqlCondition; 
		  }
		  sqlCondition = sqlCondition + " limit " + fromNum + "," + toNum;
		  List<Record> orders = Db.find("select a.oid,a.status,a.price,a.createtime,a.status,a.espeed," +
				  						"a.eattitude,a.erecord,a.eeffect,a.esupport,a.evaluate,a.eval1," +
				  						"a.evaltime1,a.reeval1,a.reevaltime1,a.eval2,a.evaltime2,a.reeval2,a.reevaltime2," +
		  								"b.name as user from orders a left join user b on a.uid=b.uid " + sqlCondition );
		  Record rd = new Record();
		  rd.set("orders", orders);
		  rd.set("allcount", orders.size());
		  setAttr("result", rd);
		  renderJson();
	}
	/**
	 * 
	 * @Title getCountByType
	 * @Description 根据订单类型统计订单条数
	 * @Author jintao
	 * @CreateDate 2015-5-29 上午11:55:45
	 */
	public void getCountByOrderType(){
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		Long did = doctor.getLong("did");
		List<Record> lis = Orders.dao.getCountByStatus(did);
		lis = stringToJson(lis);
		setAttr("result", lis);
		renderJson();
	}
	/**
	 * 
	 * @Title stingToJson
	 * @Description String和list拼接成json数据
	 * @Author jintao
	 * @CreateDate 2015-6-4 下午4:30:26
	 */
	public  List<Record> stringToJson(List<Record> lis){
		String statusName = "";
		for (int i = 0; i < lis.size(); i++) {
			statusName = ConstClass.ENUM_REF_HASHMAP.get("order_status").get(lis.get(i).get("status").toString());
			lis.get(i).set("name", statusName);
		}
        return lis;
	}
	/**
	 * 
	 * @Title suspendorder
	 * @Description 挂起订单
	 * @Author jintao
	 * @CreateDate 2015-8-12 上午9:56:21
	 */
	@Before({Tx.class})
	public void suspendorder(){
		String oid = getPara("oid").toString();
		String remark = getPara("remark").toString();
		String statusname = statusRemark(10,remark);
		//10为挂起状态
		Orders.dao.suspendorder(Long.parseLong(oid),10L,statusname);
		Record rd = new Record();
		rd.set("status", 10);
		setAttr("result", rd);
		renderJson();
	}
	/**
	 * 
	 * @Title submittreatrecord
	 * @Description 提交问诊记录
	 * @Author jintao
	 * @CreateDate 2015-8-12 上午10:56:36
	 */
	@Before({Tx.class})
	public void submittreatrecord(){
		String oid = getPara("oid").toString();
		String rd = getPara("record").toString();
		Record record = new Record();
		record.set("status", 4);
		record.set("oid", Long.parseLong(oid));
		record.set("record", rd);
		Db.update("orders", "oid", record);
		record = new Record();
		record.set("status", 4);
		record.set("oid", Long.parseLong(oid));
		record.set("time", new Date());
		record.set("remark", statusRemark(4,""));
		Db.save("otrace", record);
		record = new Record();
		record.set("status", 4);
		setAttr("result", record);
		renderJson();
	}
	/**
	 * 
	 * @Title getOrders
	 * @Description 获取订单和相关的回复与评论信息
	 * @Author jintao
	 * @CreateDate 2015-6-9 下午3:00:12
	 */
	public  void getOrders(){
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		Long did = doctor.getLong("did");
		List<Record> rd = Orders.dao.getOrders(did);
		for (int i = 0; i < rd.size(); i++) {
			rd.get(i).set("statusname", ConstClass.ENUM_REF_HASHMAP.get("order_status").get(rd.get(i).get("status").toString()));
		}
		setAttr("result", rd);
		renderJson();
	}
	/**
	 * 
	 * @Title getOrderInfoByStatus
	 * @Description 根据订单状态类型查询对应订单
	 * @Author jintao
	 * @CreateDate 2015-6-9 下午3:00:12
	 */
	public  void getOrdersByStatus(){
		Doctor doctor = (Doctor) getSession().getAttribute("doctor");
		Long did = doctor.getLong("did");
		String status = getPara("status").toString();
		List<Record> rd = Orders.dao.getOrdersByStatus(did, status);
		setAttr("result", rd);
		renderJson();
	}
	/**
	 * 
	 * @Title getDoctorInfo
	 * @Description 根据医生ID统计好评率,根据医生级别,ID号进行排名
	 * @Author jintao
	 * @CreateDate 2015-5-29 上午11:55:45
	 */
	public void getDoctorInfo(){
		String did = getPara("did");
		//根据医生级别,ID号进行排名
		List<Record> lisDoctor = Doctor.dao.getRankByDid(did);
		for (int i = 0; i < lisDoctor.size(); i++) {
			if(lisDoctor.get(i).get("did").toString().equals(did))
			{
				setAttr("num", lisDoctor.get(i).get("num"));
				break;
			}
			
		}
		//根据医生ID统计好评率
		List<Record> lis = Orders.dao.getPraiseByDid(did);
		for (int i = 0; i < lis.size(); i++) {
			if(lis.get(i).get("did").toString().equals(did))
			{
				setAttr("priase", lisDoctor.get(i).get("haoping"));
				break;
			}
			
		}
//		//根据医生ID统计订单数量和收入
//		List<Record> lisCount = Orders.dao.getCountByDid(did);
//		for (int i = 0; i < lisCount.size(); i++) {
//			if(lisCount.get(i).get("did").toString().equals(did))
//			{
//				setAttr("allcost", lisDoctor.get(i).get("allcost"));
//				setAttr("cn", lisDoctor.get(i).get("cn"));
//				break;
//			}
//			
//		}
		renderJson();
	}
}
