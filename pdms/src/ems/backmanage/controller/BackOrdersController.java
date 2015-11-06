package ems.backmanage.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import ems.backmanage.BackConfig;
import ems.backmanage.frame.database.entity.QueryCondition;
import ems.backmanage.frame.util.FrameDatabaseUtil;
import ems.backmanage.frame.util.FrameJsonUtil;
import ems.backmanage.helper.IgnoreInterceptor;
import ems.backmanage.sql.SqlBack;
import ems.backmanage.sql.SqlBackDoctor;
import ems.backmanage.sql.SqlBackOrders;
import ems.controller.BaseController;

@IgnoreInterceptor
public class BackOrdersController extends BaseController {

	public void loadOrders() {

		try {
			String condition = getPara("condition");
			Integer start = getPara("start") == null ? null : Integer
					.parseInt(getPara("start"));
			Integer limit = getPara("limit") == null ? null : Integer
					.parseInt(getPara("limit"));
			QueryCondition[] conditions = {};
			if (condition != null) {
				conditions = FrameJsonUtil.getObjectMapper().readValue(
						condition, QueryCondition[].class);
			}
			QueryCondition queryCondition = new QueryCondition();

			queryCondition.setOperation("orderby");
			queryCondition.setFieldName("t.createtime");
			queryCondition.setValue("asc");
			// 创建时间
			List<QueryCondition> cons = new ArrayList<QueryCondition>(
					Arrays.asList(conditions));
			cons.add(queryCondition);
			Map<String, Object> result = FrameDatabaseUtil.queryByCondition(
					SqlBackOrders.loadOrders, cons, start, limit);
			setAttr("returnData", result.get("datas"));
			setAttr("total", result.get("total"));
			setAttr("success", true);
			renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		}

	}

	public void loadOrdersDetail() {

		try {
			String condition = getPara("condition");
			Integer start = getPara("start") == null ? null : Integer
					.parseInt(getPara("start"));
			Integer limit = getPara("limit") == null ? null : Integer
					.parseInt(getPara("limit"));
			QueryCondition[] conditions = {};
			if (condition != null) {
				conditions = FrameJsonUtil.getObjectMapper().readValue(
						condition, QueryCondition[].class);
			}
			QueryCondition queryCondition = new QueryCondition();

			queryCondition.setOperation("orderby");
			queryCondition.setFieldName("t.createtime");
			queryCondition.setValue("asc");
			// 创建时间
			List<QueryCondition> cons = new ArrayList<QueryCondition>(
					Arrays.asList(conditions));
			cons.add(queryCondition);
			Map<String, Object> result = FrameDatabaseUtil.queryByCondition(
					SqlBackOrders.loadOrders, cons, start, limit);
			Object datas = result.get("datas");
			if (datas != null) {
				List<Record> datali = (List<Record>) datas;
				if (datali.size() != 0) {
					int price = 0;
					StringBuffer sqls = new StringBuffer(" and t.did in (");
					for (Record data : datali) {
						sqls.append(data.get("did") + ",");
					}
					String sql=sqls.toString().substring(0,sqls.toString().length()-1);
					sql=sql+")";
					List<Record> docs = Db.find(SqlBackDoctor.loadDoctorByCondition+sql);
					Map<Long,Integer> docPrice=new HashMap<Long, Integer>();
					for(Record doc:docs)
					{
						docPrice.put(doc.getLong("did"), doc.getInt("price"));
					}
					for (Record data : datali) {
						Object priceo = data.get("price");
						if (priceo != null) {
							price = Integer.parseInt(priceo.toString());
							double scale = getDoctorRealScale();
							Integer dprice = docPrice.get(data.getLong("did"));
							double docin=0;
							if(dprice!=null)
							{
								 docin = dprice*scale;
							}
							double platin = price-docin;
							 data.set("platin", platin);
							 data.set("docin", docin);
						}
					}
				}
			}
			setAttr("returnData", result.get("datas"));
			setAttr("total", result.get("total"));
			setAttr("success", true);
			renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		}

	}

	public void loadOtrace() {

		String oid = getPara("oid");

		Integer start = getPara("start") == null ? null : Integer
				.parseInt(getPara("start").toString());
		Integer limit = getPara("limit") == null ? null : Integer
				.parseInt(getPara("limit").toString());
		Map<String, Object> result = FrameDatabaseUtil.queryByPage(
				SqlBackOrders.loadOtrace, start, limit, oid);

		setAttr("returnData", result.get("datas"));
		setAttr("total", result.get("total"));

		setAttr("success", true);
		renderJson();

	}

	/**
	 * 排序查询
	 */
	@SuppressWarnings("unchecked")
	public void loadDoctorByIncome() {

		try {
			Integer start = getPara("start") == null ? null : Integer
					.parseInt(getPara("start").toString());
			Integer limit = getPara("limit") == null ? null : Integer
					.parseInt(getPara("limit").toString());
			String condition = getPara("condition");
			QueryCondition[] conditions ={};
			if (condition != null) {

				 conditions = FrameJsonUtil.getObjectMapper()
						.readValue(condition, QueryCondition[].class);
			}
			List<QueryCondition> cons = new ArrayList<QueryCondition>(
					Arrays.asList(conditions));
             Iterator<QueryCondition>	it=cons.iterator();
         	StringBuffer querySql= new StringBuffer(SqlBackOrders.loadDoctorByIncome);
			String sql = "";
			List<Object> values = new ArrayList<Object>();
		    while(it.hasNext())
		    {
		    	    QueryCondition con=it.next();
				    if(con.getFieldName().equals("ot.time"))
				    {
						Map<String, Object> map = FrameDatabaseUtil.getSqlPart(con);
						Object sqlo = map.get("sql");
						if (sqlo != null) {
							sql = sqlo.toString();
						}
						Object valueso = map.get("values");
						if (valueso != null) {
							values .addAll((List<Object>) valueso);
						}
				    	  sql = "".equals(sql) ? "" : " 1=1 " + sql;
		                  sql= querySql.toString().replaceAll("{frameMark}", sql);
		                  querySql=new StringBuffer(sql);
		      	  
				   }
				   else{
					  FrameDatabaseUtil.getSqlPart(querySql,values,con);
				  }
			
			
			}
			// 通过 condition 得到sql
			 Map<String, Object> result = FrameDatabaseUtil.queryByPage(sql, start, limit, values.toArray());
			 List<Record> datalist = (List<Record>) result.get("datas");
			 double docin=0.0;
			 for(Record data:datalist)
			 {
			   double docrealscale = getDoctorRealScale();
			   Object	docino = data.get("docin");
			   if(docino!=null)
			   {
				  docin=Double.parseDouble(docino.toString());
				  docin= docin*docrealscale;
				  data.set("docin", docin);
				  
			    }
			 }
			
			setAttr("returnData", datalist);
			setAttr("total", result.get("total"));
			setAttr("success", true);

		} catch (Exception e) {

			e.printStackTrace();
			setAttr("success", false);

		}
		renderJson();

	}

	/**
	 * 统计
	 */
	public void statisticOrders() {

		try {

			String condition = getPara("condition");


			QueryCondition[] conditions ={};
			if (condition != null) {

				 conditions = FrameJsonUtil.getObjectMapper()
						.readValue(condition, QueryCondition[].class);
			}
		
         	StringBuffer querySql= new StringBuffer(SqlBackOrders.countOrder_Doc);
			 List<Object> values=new ArrayList<Object>();
			 FrameDatabaseUtil.getSqlPart(querySql, values, conditions);
			Record record = Db.findFirst(querySql.toString(),values.toArray());
			double docin = 0.0;
			double ordertotalprice = 0;
			double ordercomnum = 0;
			  double docrealscale = getDoctorRealScale();
			if (record != null) {
			
				Object docino = record.get("docin");
				if (docino != null) {
					docin = Double.parseDouble(docino.toString())*docrealscale;
				}
				Object ordertotalpriceo = record.get("ordertotalprice");
				if (ordertotalpriceo != null) {
					ordertotalprice = Double.parseDouble(ordertotalpriceo.toString());
				}
				Object ordertotalnumo = record.get("ordercomnum");
				if (ordertotalnumo != null) {
					ordercomnum = Double.parseDouble(ordertotalnumo.toString());
				}
			}

			int ordertotalnum = 0;
			values.clear();
			for( QueryCondition con:conditions)
			{
				if(con.getFieldName().contains("ot.time"))
				{
					con.setFieldName("t.createtime");
				}
			}
				
			String sql = FrameDatabaseUtil.getSql(SqlBackOrders.countOrders,
					Arrays.asList(conditions), values, "and");
			record = Db.findFirst(sql, values.toArray());
			if (record != null ) {
				Object ordertotalnumo = record.get("total");
				if (ordertotalnumo != null) {
					ordertotalnum = Integer.parseInt(ordertotalnumo.toString());
				}
			}
			double platin = ordertotalprice - docin;
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("ordertotalnum", ordertotalnum);
			result.put("ordercomnum", ordercomnum);
			result.put("orderstotalprice", ordertotalprice);
			result.put("docin", docin);
			result.put("platin", platin);
			setAttr("returnData", result);
			setAttr("success", true);

		} catch (Exception e) {

			e.printStackTrace();
			setAttr("success", false);
		}
		renderJson();

	}

	public double getDoctorRealScale() {

		List<Record> docs = Db.find(SqlBack.getFromGlobals,
				BackConfig.DOCTOR_CUT, BackConfig.DOCTOR_SUBSIDY);
		int cut = 0;
		int subsidy = 0;
		if (docs != null && docs.size() != 0) {
			for (Record doc : docs) {
				Object name = doc.get("gv_name");
				Object value = doc.get("gv_value");
				if (BackConfig.DOCTOR_CUT.equalsIgnoreCase(name + "")) {
					cut = Integer.parseInt(value.toString());

				}
				if (BackConfig.DOCTOR_SUBSIDY.equalsIgnoreCase(name + "")) {
					subsidy = Integer.parseInt(value.toString());

				}
			}
		}

		return (100 + subsidy - cut) / 100.0;

	}
	
	
	/**
	 * Order Pay every doc
	 */
	public void loadOrderPay() {

		try {
			Integer start = getPara("start") == null ? null : Integer
					.parseInt(getPara("start").toString());
			Integer limit = getPara("limit") == null ? null : Integer
					.parseInt(getPara("limit").toString());
			String condition = getPara("condition");
			QueryCondition[] conditions={}; ;
			
			if (condition != null) {

				conditions= FrameJsonUtil.getObjectMapper()
						.readValue(condition, QueryCondition[].class);
				
			}
			List<QueryCondition> cons = new ArrayList<QueryCondition>(
					Arrays.asList(conditions));
			Calendar a=Calendar.getInstance();
            Integer year=  a.get(Calendar.YEAR);
            Integer month=  a.get(Calendar.MONTH)+1;
			//如果没有指定时间 则按当前月处理
			if(condition==null||!condition.contains("ot.time"))
			{
		
				String startTime=year+"-"+month+"-"+"01 00:00:00";
				String endTime=year+"-"+month+"-"+"31 23:59:59";
				QueryCondition q=new QueryCondition();
				q.setOperation("between");
				q.setFieldName("ot.time");
				q.setValue("["+startTime+","+endTime+"]");
				
			    cons.add(0,q);
			}
		    Iterator<QueryCondition>	it=cons.iterator();
         	StringBuffer querySql= new StringBuffer(SqlBackOrders.loadOderPay);
			String sql = "";
			List<Object> values = new ArrayList<Object>();
		    while(it.hasNext())
		    {
		    	    QueryCondition con=it.next();
				    if(con.getFieldName().equals("ot.time"))
				    {
						Map<String, Object> map = FrameDatabaseUtil.getSqlPart(con);
						Object sqlo = map.get("sql");
						if (sqlo != null) {
							sql = sqlo.toString();
						}
						Object valueso = map.get("values");
						if (valueso != null) {
							values .addAll((List<Object>) valueso);
						}
				    	  sql = "".equals(sql) ? "" : " 1=1 " + sql;
		                  sql= querySql.toString().replaceAll("{frameMark}", sql);
		                  querySql=new StringBuffer(sql);
		      	  
				   }
				   else{
					  FrameDatabaseUtil.getSqlPart(querySql,values,con);
				  }
			
			
			}
			// 通过 condition 得到sql
			 Map<String, Object> result = FrameDatabaseUtil.queryByPage(sql, start, limit, values.toArray());
			 List<Record> datalist = (List<Record>) result.get("datas");
		
			 double ordertotalprice=0.0;
			 double docin=0.0;
			 for(Record data:datalist)
			 {
			  Object	ordertotalpriceo = data.get("ordertotalprice");
			   if(ordertotalpriceo!=null)
			   {
				   ordertotalprice =Double.parseDouble(ordertotalpriceo.toString());
			   }
			   double docrealscale = getDoctorRealScale();
			  Object	docino = data.get("docin");
			  if(docino!=null)
			  {
				  docin=Double.parseDouble(docino.toString());
				  docin= docin*docrealscale;
				  data.set("docin", docin);
				  
			  }
			  data.set("platin", ordertotalprice-docin);
			
			 }
			
			setAttr("returnData", datalist);
			setAttr("total", result.get("total"));
			setAttr("success", true);
			renderJson();

		} catch (Exception e) {

			e.printStackTrace();
			setAttr("success", false);

		}
		renderJson();

	}
}
