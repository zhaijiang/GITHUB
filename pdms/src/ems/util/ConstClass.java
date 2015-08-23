/**
 * 
 */
package ems.util;

import java.util.HashMap;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

import ems.model.Doctor;


/**
 * @author jintao
 */
public class ConstClass {
	
	/**app客户端登陆用户类型0:患者用户，1：医生*/
	public static final String USERFALG = "0";
	public static final String DOCTORFLAG = "1";
	/**前台查询指定列存放变量*/
	public static final String COLUMN = "column";
	/**controll查询统计时指定分组列*/
	public static final String COLUMNGROP = "columngrop";
	/**controll查询统计时指定列的统计方式*/
	public static final String SUM = "sum";
	public static final String AVG = "avg";
	
	/**ENUM_REF数据字典存放hashmap*/
	public static final HashMap<String,HashMap<String,String>> ENUM_REF_HASHMAP = new HashMap<String, HashMap<String,String>>();
	/**GLOBALS数据字典存放hashmap*/
	public static final HashMap<String,String> GLOBALS_HASHMAP = new HashMap<String, String>();
	/**Org_ref数据字典存放hashmap*/
	public static final HashMap<Long,Record> ORG_REF_HASHMAP = new HashMap<Long, Record>();
	/**REF_CTFTYPE数据字典存放hashmap*/
	public static final HashMap<Long,String> REF_CTFTYPE_HASHMAP = new HashMap<Long, String>();
	/**数据字典*/
	public static final String ENUM_REF = "enum_ref";
	/**登陆存放令牌变量名*/
	public static final String LOGINTOKEN = "logintoken";
	/**医生did*/
	public static final String DID = "did";
	/**医生did*/
	public static final String CTID = "ctid";
	/**数据库令牌存放字段*/
	public static final String TOKEN = "token";
	/**医生在线状态*/
	public static final String DOCTORONLINE = "0";
	/**医生离线状态*/
	public static final String DOCTOROFFLINE = "1";
	/**医生离线状态*/
	public static final String PHONE = "phone";
	/**查询医生所有订单*/
	public static final String ALL = "all";
	/**医生头像标示*/
	public static final Long PHOTO = 7L;
	
	/**
	 * 根据证书ID查询证书描述信息
	 * 
	 * @return Doctor
	 */
	public static void  getRef_ctftype() {
		List<Record> lis = Db.find(Doctor.QUERY_REF_CTFTYPE);
		for (int i = 0; i < lis.size(); i++) {
			REF_CTFTYPE_HASHMAP.put(lis.get(i).getLong("ctid"),lis.get(i).get("name").toString());
		}
	}
	  /**
     * 
     * @Title getOrg_ref
     * @Description 获取医生机构表
     * @Author jintao
     * @CreateDate 2015-6-4 上午11:26:07
     */
	public static void getOrg_ref()
	{
		List<Record> lis =Db.find(Doctor.QUERY_ORG_REF);
		for (int i = 0; i < lis.size(); i++) {
			ORG_REF_HASHMAP.put(lis.get(i).getLong("orgid"),lis.get(i));
		}
	}
	  /**
     * 
     * @Title getGlobals
     * @Description 获取Global全局表
     * @Author jintao
     * @CreateDate 2015-6-4 上午11:26:07
     */
	public static void getGlobal()
	{
		List<Record> lis =Db.find(Doctor.QUERY_GLOBALS);
		for (int i = 0; i < lis.size(); i++) {
			GLOBALS_HASHMAP.put(lis.get(i).getStr("gv_name"),lis.get(i).getStr("gv_value"));
		}
	}
    /**
     * 
     * @Title getEnum_ref
     * @Description 获取数据字典表
     * @Author jintao
     * @CreateDate 2015-6-4 上午11:26:07
     */
	public static void getEnum_ref()
	{
		List<Record> lis =Db.find(Doctor.QUERY_ENUM_REF);
		HashMap<String,String> hash  = new HashMap<String,String>();
		String old_enum_ref = "";
		String enum_ref = "";
		for (int i = 0; i < lis.size(); i++) {
			if(i==0){
				enum_ref = lis.get(i).getStr("enum_ref");
				hash.put(lis.get(i).getInt("er_value").toString(), lis.get(i).getStr("er_desc"));
			}
			else if(enum_ref.equals(lis.get(i).getStr("enum_ref"))){
				old_enum_ref = lis.get(i).getStr("enum_ref");
				hash.put(lis.get(i).getInt("er_value").toString(), lis.get(i).getStr("er_desc"));
				if(i==lis.size()-1){
					ENUM_REF_HASHMAP.put(old_enum_ref,hash);
					hash  = new HashMap<String,String>();
				}
			}
			else{
				ENUM_REF_HASHMAP.put(old_enum_ref,hash);
				hash  = new HashMap<String,String>();
				hash.put(lis.get(i).getInt("er_value").toString(), lis.get(i).getStr("er_desc"));
				enum_ref = lis.get(i).getStr("enum_ref");
			}
		}
	}
}
