package ems.controller;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import ems.util.ConstClass;

/** 
 * @author 作者 jintao
 * @version 创建时间：2015-5-26 下午2:07:54 
 * 类说明 
 */
public class BaseController extends Controller  {
	private Class<?> clazz; // 对应的实体
	 public Class<?> getClazz() {
	  return clazz;
	 }
	 public void setClazz(Class<?> clazz) {
	  this.clazz = clazz;
	 }
	 /**
	  * 通用分页查找
	  */
	 public void getPage() {
	  Enumeration<String> en = getParaNames();
	  int count = 0;
	  String sqlCondition="";
	  List<Object> valueList = new ArrayList<Object>();
	  while(en.hasMoreElements())  
      {  
		 String name = en.nextElement();
		 valueList.add(getPara(name));
		 if(count!=0)
		 {
			 sqlCondition = sqlCondition + " and ";
		 }
		 else
		 {
			 sqlCondition="where";
		 }
		 sqlCondition = sqlCondition + " " + name + "=" + "?";
		 count++;
      }  
	  Page<Record> result = Db.paginate(getParaToInt("pageNumber"),
			  getParaToInt("pageSize"), "select *", "from "
	      + getClazz().getSimpleName() + " " + sqlCondition ,valueList.toArray());
	  renderJson("result", result);
	 }
	 /**
	  * 通用查找全部属性
	  */
	 public void getAll() {
	  List<Record> result = Db.find("select * from " + getClazz().getSimpleName() + ";");
	  renderJson("result", result);
	 }
	 /**
	  * 通用根据属性查找指定列
	  */
	 public void getPropByColumn() {
		 Enumeration<String> en = getParaNames();
		  int count = 0;
		  int couColumn=0;
		  String sqlCondition="";
		  String queryColumn="";
		  List<Object> valueList = new ArrayList<Object>();
		  //循环获取json中的属性
		  while(en.hasMoreElements())  
	      {  
			 String name = en.nextElement();
			 //拼接查询字段
			 if(name.contains(ConstClass.COLUMN))
			 {
				 if(couColumn!=0)
				 {
					 queryColumn = queryColumn + "," + getPara(name);
				 }
				 else
				 {
					 queryColumn = getPara(name);
				 }
				 couColumn++;
			 }
			 //拼接查询字段所需要的条件
			 else
			 {
				 valueList.add(getPara(name));
				 if(count!=0)
				 {
					 sqlCondition = sqlCondition + " and ";
				 }
				 else
				 {
					 sqlCondition="where";
				 }
				 sqlCondition = sqlCondition + " " + name + "=" + "?";
				 count++;
			 }
	      } 	
		  List<Record> result = Db.find("select " + queryColumn +" from "+ getClazz().getSimpleName()+ " " + sqlCondition ,valueList.toArray());
		  renderJson("result", result);
	 }
	 /**
	  * 通用根据属性查找全部属性
	  */
	 public void getByProperties() {
	  Enumeration<String> en = getParaNames();
	  int count = 0;
	  String sqlCondition="";
	  List<Object> valueList = new ArrayList<Object>();
	  while(en.hasMoreElements())  
      {  
		 String name = en.nextElement();
		 valueList.add(getPara(name));
		 if(count!=0)
		 {
			 sqlCondition = sqlCondition + " and ";
		 }
		 else
		 {
			 sqlCondition="where";
		 }
		 sqlCondition = sqlCondition + " " + name + "=" + "?";
		 count++;
      } 
	  List<Record> result = Db.find("select * from " + getClazz().getSimpleName()+ " " + sqlCondition ,valueList.toArray());
	  renderJson("result", result);
	 }
	 /**
	  * 
	  * @Title get
	  * @Description 通用按照一个或多个属性分组统计
	  * @Author jintao
	  * @CreateDate 2015-6-2 下午3:17:22
	  */
	 public List<Record> getCountByProperty(HashMap<String,String> map) throws Exception {
		  if(map.isEmpty())
		  {
			  return new ArrayList<Record>();
		  }
		  String sqlCondition = "";
		  Iterator iter = map.entrySet().iterator();
	      while (iter.hasNext()) {
			  Map.Entry<String,String> entry = (Map.Entry<String,String>) iter.next();
			  String key = entry.getKey();
			  String val = entry.getValue();
			  if(val.equals(ConstClass.COLUMNGROP)){
				  sqlCondition = sqlCondition + key + ",";
			  }
			  if(val.equals(ConstClass.SUM)){
				  sqlCondition = sqlCondition + " sum( " + key + " ),";
			  }
			  if(val.equals(ConstClass.AVG)){
				  sqlCondition = sqlCondition + " avg( " + key + " ),";
			  }
		  }
		  List<Record> result = Db.find("select " + sqlCondition + " count(*) as cn " + " from " + getClazz().getSimpleName() + " group by " + sqlCondition);
		  return result;
	 }
	 /**
	  * 通用新增
	  * 
	  * @throws Exception
	  */
	 public void save() throws Exception {
		 Model<?> model = (Model<?>) Class.forName(clazz.getName()).newInstance();
		 Enumeration<String> en = getParaNames();
		 while(en.hasMoreElements())  
	      {  
			 String name = en.nextElement();
			 model.set(name, getPara(name));
	      } 	 
		 renderText(getModel(model.getClass()).save()+ "");
	 }
	 /**
	  * 通用修改
	  * 
	  * @throws Exception
	  */
	 public void update() throws Exception {
		 Model<?> model = (Model<?>) Class.forName(clazz.getName()).newInstance();
		 Enumeration<String> en = getParaNames();
		 while(en.hasMoreElements())  
	      {  
			 String name = en.nextElement();
			 model.set(name, getPara(name));
	      } 	 
		 renderText(getModel(model.getClass()).update()+ "");
	 }
	 /**
	  * 通用删除
	  * 
	  * @throws Exception
	  */
	 public void delete() throws Exception {
		 Model<?> model = (Model<?>) Class.forName(clazz.getName()).newInstance();
		 Enumeration<String> en = getParaNames();
		 while(en.hasMoreElements())  
	      {  
			 String name = en.nextElement();
			 model.set(name, getPara(name));
	      } 	 
		 renderText(getModel(model.getClass()).delete()+ "");
	 }
}
