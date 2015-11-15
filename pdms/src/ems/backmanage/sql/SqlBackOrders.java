package ems.backmanage.sql;

public class SqlBackOrders {

 public final static String loadOrders=
	 "select d.name AS dname,d.phone as dphone,u.name as uname, u.phone AS uphone,ad.range,ad.addr, t.* from orders t  left join user  u ON t.uid=u.uid left join  doctor d ON t.did=d.did " +
	 " LEFT  JOIN useraddr ad ON u.uaid=ad.uaid where 1=1 ";
 public final static String countOrders=
	 "select count(*) as total from orders t where 1=1";
 public final static String loadOtrace=
	 "select * from otrace t where t.oid=? order by time desc";
 

 public final static String  loadDoctorByIncome=
	 "select  countdata.docin,t.* "+
	 " from doctor t  left join  " +
	 " (select o.did,SUM(t2.price)  AS docin from orders o ,doctor t2,otrace ot where  o.did=t2.did and o.oid=ot.oid and o.espeed>0 and ot.status=11  "+
	 " and frameMark group by o.did) AS countdata  ON t.did=countdata.did  order by  countdata.docin DESC"
    ;
 



 public final static String  countOrder_Doc=
"select SUM(t2.price) as docin,SUM(o.price) AS  ordertotalprice ,count(o.oid) as ordercomnum  from orders o ,doctor t2,otrace ot where  o.did=t2.did and o.oid=ot.oid and o.espeed>0 and ot.status=11  "    ;
 
 



 public final static String loadOrdersDetatil=
 "select t.* from orders  t left join otrace ot on t.oid=ot.oid where 1=1 ";
 
 
 public final static String  loadOderPay=
	 "select countdata.ordertotalnum,countdata.ordertotalprice,countdata.docin,t.*  from doctor t  left join  (select o.did ,COUNT(*) AS ordertotalnum,SUM(o.price)  AS ordertotalprice,SUM(t2.price)  AS docin from orders o ,doctor t2,otrace ot where  o.did=t2.did and o.oid=ot.oid and o.espeed>0 and ot.status=11"+ 
 " and frameMark group by o.did) AS countdata  ON t.did=countdata.did  where countdata.docin!=0   ";
}
