package ems.backmanage.controller;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.quartz.impl.jdbcjobstore.DB2v6Delegate;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.jfinal.aop.Before;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.ICallback;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

import ems.backmanage.BackConfig;
import ems.backmanage.frame.database.entity.QueryCondition;
import ems.backmanage.frame.util.FrameDatabaseUtil;
import ems.backmanage.frame.util.FrameJsonUtil;
import ems.backmanage.helper.IgnoreInterceptor;
import ems.backmanage.sql.SqlBack;
import ems.backmanage.sql.SqlBackDoctor;
import ems.controller.BaseController;
import ems.model.Doctor;
import ems.model.Org_ref;
import ems.util.ConstClass;

/**
 * 后台医生处理类 
 * @author Administrator
 *
 */
@IgnoreInterceptor
public class BackDoctorController extends BaseController {

	/**
	 * 
	 */
	public void loadDoctor()
	{
		 try {
			String condition = getPara("condition");
			 int start=Integer.parseInt(  getPara("start"));
			 int limit= Integer.parseInt(  getPara("limit"));
			 QueryCondition[] conditions = {};
				if (condition != null) {
					conditions = FrameJsonUtil.getObjectMapper().readValue(
							condition, QueryCondition[].class);
				}
				
				QueryCondition queryCondition = new QueryCondition();

				queryCondition.setOperation("orderby");
				queryCondition.setFieldName("t.did");
				queryCondition.setValue("asc");
				// 创建时间
				List<QueryCondition> cons = new ArrayList<QueryCondition>(
						Arrays.asList(conditions));
				cons.add(queryCondition);
				Map<String, Object> result = FrameDatabaseUtil
						.queryByCondition(SqlBackDoctor.loadDoctorByCondition,
								cons, start, limit);
				setAttr("datas",result.get("datas"));
				setAttr("total",result.get("total"));
				setAttr("success",true);
				renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		} 
	}
	/**
	 * 查询医生详细信息
	 */
	public void loadDoctorInfo()
	{
		 try {
			    String did = getPara("data");
			     Map<String,String> certype= ConstClass.ENUM_REF_HASHMAP.get(BackConfig.PQCERTIFY_TYPE);
			     Map<String,String> cerlevel= ConstClass.ENUM_REF_HASHMAP.get(BackConfig.PQCERTIFY_LEVEL);
			     Map<String,String> level= ConstClass.ENUM_REF_HASHMAP.get(BackConfig.PTCERTIFY_LEVEL);

				Record doctor = Db.findFirst(SqlBackDoctor.loadDoctorByCondition+" and did=? ",did);
				List<Record> record = Doctor.dao.getCertificationByDid(did);
				
				if(doctor!=null)
				{
					doctor.set("ctflvlname", cerlevel.get(doctor.get("ctflvl").toString()));
					doctor.set("ctftypename", certype.get(doctor.get("ctftype").toString()));
					doctor.set("ptlvlname", level.get(doctor.get("ptlvl").toString()));
				}
				Map<String,Object> combos=new HashMap<String, Object>();
				combos.put("ctflvl", cerlevel);
				combos.put("ctftype", certype);
				combos.put("ptlvl", level);
				Map<String,Object> orgs=new HashMap<String, Object>();
				 List<Record> res = Db.find("select * from Org_ref order by orgid asc");
				 if(res!=null&&res.size()!=0)
				 {
					 for(Record re:res)
					 {
						 orgs.put(re.get("orgid").toString(), re.get("name"));
					 }
				 }
				 
				combos.put("org", orgs);
				setAttr("doctorinfo",doctor);
				setAttr("doctorpic",record);
				setAttr("combos",combos);
				setAttr("success",true);

				renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		} 
	}
	/**
	 * 冻结医生
	 */
	@Before({Tx.class})
	public void freezeDoctor()
	{
		 try {
			  String did = getPara("ids");
			    Integer[] dids = FrameJsonUtil.getObjectMapper().readValue(did, Integer[].class);
			     String ins=FrameDatabaseUtil.getInString(dids);
			    int result = Db.update(SqlBackDoctor.updateDotorStatus+ins, BackConfig.DOC_STATUS_FREEZE);
			    if(result>0)
			    {
			       setAttr("success",true);
			    }
			    else{
			        setAttr("success",false);
			    }
				renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		} 
	}
	
	/**
	 * 审核资质
	 */
	@Before({Tx.class})
	public void auditct()
	{
		 try {
			   String did = getPara("did");
			   String ctid= getPara("ctids");
			    Integer[] ctids = FrameJsonUtil.getObjectMapper().readValue(ctid, Integer[].class);
			     String ins=FrameDatabaseUtil.getInString(ctids);
			    int result = Db.update(SqlBackDoctor.updateCertification+ins,-1,new Date(),2,did);
			    if(result>0)
			    {
			       setAttr("success",true);
			    }
			    else{
			        setAttr("success",false);
			    }
				renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		} 
	}
	

	/**
	 * 审核医生
	 */
	@Before({Tx.class})
	public void auditDoctor()
	{
		 try {
			   String did = getPara("did");
			   String pass= getPara("pass");
			   String remark= getPara("remark");
			   int status=-1;
			   if("true".endsWith(pass))
			   {
				   status=BackConfig.DOC_STATUS_PASS_UNCOMPLETE  ;
			   }
			   else{
				   status=BackConfig.DOC_STATUS_UNPASS;
			   }
			   Record r=new Record();
			   r.set("status", status);
			   r.set("remark", remark);
			   r.set("did", did);
			  boolean result = Db.update("Doctor", "did", r);
			    if(result)
			    {
			       setAttr("success",true);
			    }
			    else{
			        setAttr("success",false);
			    }
				renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		} 
	}
	

	/**
	 * 统计医生
	 */
	public void statisticDoctor()
	{
		 try {
			  
			    
			    int total=0;
			    int pass=0;
			    int passing=0;    
			    List<Object> totals = Db.query(SqlBackDoctor.countDoctorByCondition);
			    if(totals!=null&&totals.size()!=0)
			    {
			    	total=Integer.parseInt(totals.get(0).toString());
			    }
			    List<Object> statuss = Db.query(SqlBackDoctor.statisticDoctorByStatus);
			    for(Object sta:statuss)
			    {
			    	Object[] status=(Object[]) sta;
			    	int statusint = Integer.parseInt(status[0].toString());
			    	if(statusint>=BackConfig.DOC_STATUS_PASS_UNCOMPLETE&&statusint!=BackConfig.DOC_STATUS_FREEZE)
			    	{
			    		pass+=Integer.parseInt(status[1].toString());
			    	}
			    	
			    	if(BackConfig.DOC_STATUS_PASSING==statusint)
			    	{
			    		passing=Integer.parseInt(status[1].toString());
			    	}
			    	
			    }
                Map<String,Object> statisticResult=new HashMap<String,Object>();
                statisticResult.put("total", total);
                statisticResult.put("pass", pass);
                statisticResult.put("passing", passing);
			    List<Object> levels = Db.query(SqlBackDoctor.statisticDoctorByPtlvl);
			    for(Object le:levels)
			    {
			    	Object[] level=(Object[]) le;
			    	 statisticResult.put("level"+level[0], level[1]);
			    
			    	
			    }
			    
			     setAttr("returnData",statisticResult);
			    
			   
			       setAttr("success",true);
			  
				renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		} 
	}
	
	
	/**
	 * 修改医生
	 */
	@Before({Tx.class})
	public void updateDoctor()
	{
		 try {
			   String doctorstr = getPara("doctor");
		        Map doctor = FrameJsonUtil.getObjectMapper().readValue(doctorstr, Map.class);
			 
			   Record r=new Record();
		        Iterator it = doctor.entrySet().iterator();
		        while(it.hasNext())
		        {
		        	Entry<String, Object> entry = (Entry<String, Object>) it.next();
		        	r.set(entry.getKey(), entry.getValue());
		        }
			  
			    boolean result = Db.update("Doctor", "did", r);
			    if(result)
			    {
			       setAttr("success",true);
			    }
			    else{
			        setAttr("success",false);
			    }
				renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		} 
	}
}
