package ems.backmanage.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.jfinal.aop.Before;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

import ems.backmanage.BackConfig;
import ems.backmanage.frame.database.entity.QueryCondition;
import ems.backmanage.frame.util.FrameDatabaseUtil;
import ems.backmanage.frame.util.FrameJsonUtil;
import ems.backmanage.frame.util.FrameObjectUtil;
import ems.backmanage.helper.IgnoreInterceptor;
import ems.backmanage.sql.SqlBackUser;
import ems.controller.BaseController;
import ems.model.User;
import ems.model.Useraddr;

/**
 * 后台用户处理类 
 * @author Administrator
 *
 */
@IgnoreInterceptor
public class BackUserController extends BaseController {

	/**
	 * 查询用户
	 */
	public void loadUser()
	{
		 try {
			String condition = getPara("condition");
			 Integer start=getPara("start")==null?null:Integer.parseInt(  getPara("start"));
			Integer limit= getPara("limit")==null?null:Integer.parseInt(  getPara("limit"));
			 QueryCondition[] conditions = {};
				if (condition != null) {
					conditions = FrameJsonUtil.getObjectMapper().readValue(
							condition, QueryCondition[].class);
				}
				Map<String, Object> result = FrameDatabaseUtil
						.queryByCondition(SqlBackUser.loadUserByCondition,
								Arrays.asList(conditions), start, limit);
				setAttr("returnData",result.get("datas"));
				setAttr("total",result.get("total"));
				setAttr("success",true);
				renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		} 
	}
	/**
	 * 查询用户详细信息
	 */
	public void loadUserInfo()
	{
		 try {
			  String id = getPara("data");
			
				User user = User.dao.findFirst(SqlBackUser.getUserByUid,id);
 
				
 				 Useraddr useraddr= Useraddr.dao.findFirst(SqlBackUser.getUserAddrByUaid,user.get("uaid"));
 				Map<String, Object> usermap = FrameJsonUtil.getObjectMapper().readValue(user.toJson(), Map.class);
			   if(useraddr!=null)
			   {
				   usermap.put("range", useraddr.get("range"));
				   usermap.put("addr",  useraddr.get("addr"));
				
			   }
				setAttr("returnData",usermap);
				
				setAttr("success",true);

				renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		} 
	}
	
	
	

	/**
	 * 统计用户
	 */
	public void statisticUser()
	{
		 try {
			  
		
			    
			   
			    setAttr("success",true);
			  
				renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		} 
	}
	
	
	/**
	 * 修改用户
	 */
	@Before({Tx.class})
	public void updateUser()
	{
		 try {
			   String Userstr = getPara("user");
		        Map User = FrameJsonUtil.getObjectMapper().readValue(Userstr, Map.class);
			 
			    Record r=new Record();
		        Iterator it = User.entrySet().iterator();
		        while(it.hasNext())
		        {
		        	Entry<String, Object> entry = (Entry<String, Object>) it.next();
		        	r.set(entry.getKey(), entry.getValue());
		        }
			  
			    boolean result = Db.update("User", "uid", r);
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
