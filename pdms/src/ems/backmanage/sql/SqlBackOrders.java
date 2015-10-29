package ems.backmanage.sql;

public class SqlBackOrders {

 public final static String loadOrders=
	 "SELECT d.name AS dname,d.phone as dphone,u.name as uname, u.phone AS uphone,ad.range,ad.addr, t.* from orders t  LEFT JOIN user  u ON t.uid=u.uid LEFT JOIN  doctor d ON t.did=d.did " +
	 "LEFT  JOIN useraddr ad ON u.uaid=ad.uaid where 1=1 ";
 public final static String countOrders=
	 "SELECT count(*) as total from orders t WHERE 1=1";
 public final static String loadOtrace=
	 "SELECT * from otrace t WHERE t.oid=? ORDER BY time desc";
 
 public final static String  loadDoctorByPart0=
	 "SELECT  income.totalincome,t.*  ";
 public final static String  loadDoctorByPart1=
"from doctor t  LEFT JOIN  (SELECT o.did,SUM(t2.price*?)  AS totalincome from orders o ,doctor t2,otrace ot WHERE  o.did=t2.did AND o.oid=ot.oid AND o.espeed>0 AND ot.status=11  ";
 
 public final static String  loadDoctorByPart2=
	 "  GROUP BY o.did) AS income  ON t.did=income.did  ORDER BY totalincome DESC";


 public final static String  countDoctorIncome0=
	 "SELECT  sum(income.totalincome) as totalincome ";
 
 //
 //SELECT COUNT(*) from orders  t WHERE 1=1 
 public final static String  countOrdersTotalPrice=
	"SELECT SUM(o.price) as totalprice from orders  o,otrace ot  WHERE  o.oid=ot.oid AND  ot.status=11";


}
