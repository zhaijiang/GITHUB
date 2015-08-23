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

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.jfinal.aop.Before;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

import ems.config.EmsConfig;
import ems.util.ConstClass;
import ems.util.MD5;
import ems.util.RegexUtil;

/**
 * 功能描述：
 * 
 */
public class Orders extends Model<Orders> {
	private static final long serialVersionUID = 1L;

	public final static Orders dao = new Orders();
	
	/** 根据订单类型统计订单条数 */
	public final static String QUERY_GROUP_BYSTATUS= "select status,count(*) as cn from orders where did=? group by status";
	/** 根据医生ID统计好评率 */
	public final static String QUERY_GROUP_BYDID = "select did,"+
													 " sum(case when evaluate=0 then 1 else 0 end)*1.0/count(*) as haoping,"+
											         " sum(case when evaluate=1 then 1 else 0 end)*1.0/count(*) as zhongping,"+
											         " sum(case when evaluate=2 then 1 else 0 end)*1.0/count(*) as chaping"+
											         " from orders where did=? group by did";
	/** 根据医生ID统计订单数量和收入 */
	public final static String QUERY_COUNT_BYDID = "select count(*) as cn  from orders where did=? ";
	
	/** 根据订单状态获取订单 */
	public final static String QUERY_ORDER_BYSTATUS = "select oid,price,createtime,status from orders where status=? and did=? order by oid";
	
	/** 根据医生id获取订单 */
	public final static String QUERY_ORDER_BYDID = "select oid,price,createtime,status from orders where  did=? order by oid";
	
	/** 根据医生id获取订单所以信息 */
	public final static String QUERY_EVL_BYDID = "select * from orders where  did=? order by oid desc";
	
	/** 根据订单id获取订单所以信息 */
	public final static String QUERY_EVL_BYOID = "select * from orders where  oid=? order by oid desc";
	
	/** 根据医生id获取订单所以信息 */
	public final static String QUERY_BY_BYOID = "select a.createtime,a.distance,a.price,c.addr,b.sex,b.name as user,b.phone,a.status,a.uid, " +
												"a.espeed,a.eattitude,a.erecord,a.eeffect,a.esupport,a.evaluate,a.eval1,a.evaltime1,a.reeval1, " +
												"a.reevaltime1,a.eval2,a.evaltime2,a.reeval2,a.reevaltime2" +
												" from orders a left join user b  on b.uid=a.uid  left join useraddr c on c.uaid=a.uaid where a.did=? and a.oid=? order by oid desc";
	
	/** 根据医生id 订单oid获取订单所以信息 */
	public final static String QUERY_REVAL_BYOID = "select a.*,concat(c.addr,c.range) as addr,b.sex,b.name as user,b.phone from orders a left join user b  on b.uid=a.uid  left join useraddr c on c.uaid=a.uaid where a. did=? and a.oid=? order by oid desc";
	
	/** 根据订单oid获取订单状态轨迹 */
	public final static String QUERY_OTRACE_BYOID = "select * from otrace where oid=? order by time";
	
	/**
	 * 更新订单状态
	 * @param remark 
	 * 
	 * @return Order
	 */
	public Record getordereval(Long oid,Long did){
		Record result =  Db.findFirst(Orders.QUERY_REVAL_BYOID,did,oid);
		return result;
	}
	/**
	 * 修改订单状态 记录轨迹
	 * @param remark 
	 * 
	 * @return Order
	 */
	public void suspendorder(Long oid,Long status, String remark){
		Record rdorders = new Record();
		rdorders.set("oid", oid);
		rdorders.set("status", status);
		Db.update("orders", "oid", rdorders);
		rdorders.set("remark", remark);
		rdorders.set("time", new Date());
		Db.save("otrace", "oid", rdorders);
	}
	/**
	 * 更新订单状态和问诊记录
	 * @param remark 
	 * 
	 * @return Order
	 */
	public void submittreatrecord(Long oid,Long status, String record){
		Record rdorders = new Record();
		rdorders.set("oid", oid);
		rdorders.set("status", status);
		rdorders.set("record", record);
		Db.update("orders", "oid", rdorders);
		rdorders.set("time", new Date());
		Db.save("otrace", "oid", rdorders);
	}
	/**
	 * 根据订单id获取订单所有信息
	 * 
	 * @return Order
	 */
	public Record getInforByOid(Long oid) {
		Record result =  Db.findFirst(Orders.QUERY_EVL_BYOID,oid);
		return result;
	}
	/**
	 * 根据订单id获取订单所有信息
	 * 
	 * @return Order
	 */
	public Record getorderinfo(Long did,Long oid) {
		Record result =  Db.findFirst(Orders.QUERY_BY_BYOID,did,oid);
		return result;
	}
	/**
	 *  根据医生oid获取订单状态轨迹 
	 * 
	 * @return Order
	 */
	public List<Record> getotraceinfo(Long oid) {
		List<Record> result =  Db.find(Orders.QUERY_OTRACE_BYOID,oid);
		return result;
	}
	/**
	 * 根据医生id获取订单所有信息
	 * 
	 * @return Order
	 */
	public List<Record> getOrders(Long did) {
		List<Record> result =  Db.find(Orders.QUERY_EVL_BYDID,did);
		return result;
	}
	/**
	 * 根据订单类型统计订单条数
	 * 
	 * @return Order
	 */
	public List<Record> getCountByStatus(Long did) {
		List<Record> result =  Db.find(Orders.QUERY_GROUP_BYSTATUS,did);
		return result;
	}
	/**
	 * 根据医生ID统计好评率
	 * 
	 * @return Order
	 */
	public List<Record> getPraiseByDid(String did) {
		List<Record> result = Db.find(Orders.QUERY_GROUP_BYDID,did);
		return result;
	}
	/**
	 *  根据医生ID统计订单数量
	 * 
	 * @return Order
	 */
	public Long getCountByDid(int did) {
		Record rd = Db.findFirst(Orders.QUERY_COUNT_BYDID,did);
		return rd.getLong("cn");
	}
	/**
	 *  根据订单状态获取订单
	 * 
	 * @return Order
	 */
	public List<Record> getOrdersByStatus(Long did,String status) {
		List<Record> result;
		if(status.equals(ConstClass.ALL)){
			 result = Db.find(Orders.QUERY_ORDER_BYDID,did);
		}else{
			 result = Db.find(Orders.QUERY_ORDER_BYSTATUS,status,did);
		}
		return result;
	}
}
