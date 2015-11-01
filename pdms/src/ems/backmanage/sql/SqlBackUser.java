package ems.backmanage.sql;

public class SqlBackUser {
     /** 通过条件查询用户*/
	public  static final String loadUserByCondition=" select t.* ,ua.range,ua.addr from User t left join useraddr ua on t.uid=ua.uid where 1=1";
	 /**通过用户ID 查询用户*/
	public  static final String getUserByUid=" select * from user where uid=?";
	/**通过用户ID 查询用户地址*/
	public  static final String getUserAddrByUaid=" select * from useraddr where uaid=?";
	/**通过条件查询用户地址*/
	public  static final String loadUserAddrByCondition="select u.name as uname ,t.* from useraddr t LEFT JOIN  USER u ON  t.uid=u.uid where 1=1 ";	
	/**通过条件查询用户收藏*/
	public  static final String loadUserSaveByCondition="select u.name AS uname ,d.name AS dname ,t.* from usersave t INNER JOIN  USER u ON  t.uid=u.uid LEFT JOIN  doctor d ON  t.did=d.did  WHERE 1=1";	
	/**通过条件查询用户代金卷*/
	public  static final String loadUserVoucherByCondition="select  u.name AS uname,t.* from monypaper t,USER u where t.uid=u.uid  ";	
	/**通过条件查询用户过期代金卷*/
	public  static final String loadUserUnVoucherByCondition="select  u.name AS uname,t.* from mpashcan t,USER u where t.uid=u.uid  ";	
	/**用户地址分组*/
	public  static final String groupUserAddr="select t.range as addrname,count(*) as unum from  useraddr t group by t.range  order by t.range";
	
	/**统计用户代金卷总额*/
	public  static final String statisticUserVoucher="select  sum(mp.money) as vouchercount,t.*  from user t left join mpashcan mp on t.uid=mp.uid and  mp.status=0  group  by  t.uid  order by t.uid asc";
	

}
