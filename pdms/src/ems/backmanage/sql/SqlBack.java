package ems.backmanage.sql;

public class SqlBack {
	/**统计用户代金卷总额*/
	public  static final String getFromGlobals="select t.gv_name,t.gv_value from globals t where ( t.gv_name  =? or t.gv_name=?)";
}
