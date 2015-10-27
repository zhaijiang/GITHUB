
package ems.backmanage.controller;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import ems.backmanage.frame.database.entity.QueryCondition;
import ems.backmanage.frame.util.FrameDatabaseUtil;
import ems.backmanage.frame.util.FrameJsonUtil;
import ems.backmanage.helper.IgnoreInterceptor;
import ems.backmanage.sql.SqlBackOrders;
import ems.controller.BaseController;



@IgnoreInterceptor
public class BackOrdersController  extends BaseController{

	public void loadOrders() {
	
		try {
			String condition = getPara("condition");
			 Integer start=getPara("start")==null?null:Integer.parseInt(  getPara("start"));
			Integer limit= getPara("limit")==null?null:Integer.parseInt(  getPara("limit"));
			 QueryCondition[] conditions = {};
				if (condition != null) {
					conditions = FrameJsonUtil.getObjectMapper().readValue(
							condition, QueryCondition[].class);
				}
				QueryCondition queryCondition=new QueryCondition();
			
				queryCondition.setOperation("orderby");
				queryCondition.setFieldName("t.oid");
				queryCondition.setValue("asc");
				
				List<QueryCondition> cons=new ArrayList<QueryCondition>(Arrays.asList(conditions));
				cons.add(queryCondition);
				Map<String, Object> result = FrameDatabaseUtil
						.queryByCondition(SqlBackOrders.loadOrders,
								cons, start, limit);
				setAttr("returnData",result.get("datas"));
				setAttr("total",result.get("total"));
				setAttr("success",true);
				renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		} 

	}
	
	public void loadOtrace() {
		
		     String oid=getPara("oid");

		    Integer start=getPara("start")==null?null:Integer.parseInt(getPara("start").toString());
		    Integer limit=getPara("limit")==null?null:Integer.parseInt(getPara("limit").toString());
			Map<String, Object> result= FrameDatabaseUtil.queryByPage(SqlBackOrders.loadOtrace,start,limit,oid);
		   
			setAttr("returnData",result.get("datas"));
			setAttr("total",result.get("total"));
	
		   setAttr("success", true);
		   renderJson();

	}
	/**
	 * 排序查询
	 */
	public void loadDoctorByIncome() {
		
		   try {
			   Integer start=getPara("start")==null?null:Integer.parseInt(getPara("start").toString());
			   Integer limit=getPara("limit")==null?null:Integer.parseInt(getPara("limit").toString());
			   String condition=getPara("condition");
			   String sql="";
			   List<Object> values=new ArrayList<Object>();
			   if(condition!=null)
			   {
				  
				   QueryCondition[] conditions = FrameJsonUtil.getObjectMapper().readValue(
								condition, QueryCondition[].class);
				
				   Map<String, Object> map = FrameDatabaseUtil.getSqlPart(Arrays.asList(conditions));
				  Object sqlo = map.get("sql");
				  if(sqlo!=null)
				  {
					  sql=sqlo.toString(); 
				  }
				  Object valueso = map.get("values");
				  if(valueso!=null)
				  {
					  values=(List<Object>) valueso; 
				  }
			   }
			   sql= sql.replace("t.", "ot.");
			    sql="".equals(sql)?"":" and "+sql;
			   values.add(0, 0.8);
			   int pageNum=start/limit+1;
			   //通过 condition 得到sql 
			   Page<Record> datalist = Db.paginate(pageNum, limit, SqlBackOrders.loadDoctorByPart0, SqlBackOrders.loadDoctorByPart1+sql+SqlBackOrders.loadDoctorByPart2,values.toArray());
			   List<Record> datas = datalist.getList();
			   setAttr("returnData", datas);
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
		
		   String oid=getPara("oid");

		   Integer start=getPara("start")==null?null:Integer.parseInt(getPara("start").toString());
		   Integer limit=getPara("limit")==null?null:Integer.parseInt(getPara("limit").toString());
		   String condition=getPara("condition")==null?null:getPara("condition");
		   String sql="ot.time between ? and ?";
	       List<Record> datalist = Db.find( SqlBackOrders.countDoctorIncome0+SqlBackOrders.loadDoctorByPart1+sql+SqlBackOrders.loadDoctorByPart2,0.8,"2010-10-10 0:0:0","2020-10-10 0:0:0");
           double doctotalincome=0.0;
           if(datalist!=null&&datalist.size()!=0)
           {
		     Record datas = datalist.get(0);
		     Object totalincomeo = datas.get("totalincome");
		     if(totalincomeo!=null)
		     {
		    	 doctotalincome=Double.parseDouble(totalincomeo.toString()) ;
		     }
            }
		
	       int totalorders=0;
		    datalist = Db.find(SqlBackOrders.countOrders);
		   if(datalist!=null&&datalist.size()!=0)
		   {
			    Object totalo = datalist.get(0).get("total");
			     if(totalo!=null)
			     {
			    	 totalorders=Integer.parseInt(totalo.toString()) ;
			     }
		   }
		   
		        double orderstotalprice=0;
			    datalist = Db.find(SqlBackOrders.countOrdersTotalPrice);
			   if(datalist!=null&&datalist.size()!=0)
			   {
				    Object totalo = datalist.get(0).get("totalprice");
				     if(totalo!=null)
				     {
				    	 orderstotalprice=Integer.parseInt(totalo.toString()) ;
				     }
			   }
		    double systotalincome=orderstotalprice-doctotalincome;
		    Map<String,Object> result=new HashMap<String, Object>();
		    result.put("totalorders", totalorders);
		    result.put("orderstotalprice", orderstotalprice);
		    result.put("doctotalincome", doctotalincome);
		    result.put("systotalincome", systotalincome);
		    setAttr("success", true);
		   renderJson();

	}
}
