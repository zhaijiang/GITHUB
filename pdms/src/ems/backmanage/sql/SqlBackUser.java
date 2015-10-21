package ems.backmanage.sql;

public class SqlBackUser {

	public  static final String loadUserByCondition=" select t.* ,ua.range,ua.addr from User t left join useraddr ua on t.uid=ua.uid where 1=1";
	
	public  static final String getUserByUid=" select * from user where uid=?";
	public  static final String getUserAddrByUaid=" select * from useraddr where uaid=?";


}
