package ems.comm;



import ems.util.ConstClass;

/** 
 * @author 作者 jintao
 * @version 创建时间：2015-6-4 上午11:04:09 
 * 类说明 
 */
public  class JFinalInitialization {
	 /**
	  * 系统启动时初始化方法
	  */
	 public static void initialization() {
		 //初始化数据字典
		 ConstClass.getEnum_ref();
		 //初始化全局变量
		 ConstClass.getGlobal();
		 //初始化医生机构
		 ConstClass.getOrg_ref();
		 //初始化医生资质描述
		 ConstClass.getRef_ctftype();
	 }
}
