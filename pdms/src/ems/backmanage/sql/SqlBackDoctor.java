package ems.backmanage.sql;

public class SqlBackDoctor {

	public  static final String loadDoctorByCondition=" select t.*,o.name as orgname from Doctor t  left join org_ref o on t.org=o.orgid  where  1=1";
	public  static final String countDoctorByCondition=" select count(*) from Doctor t where 1=1";
	public  static final String updateDotorStatus=" update Doctor set status = ?  where did in ";
	public  static final String updateCertification=" update Certification set picpath=pic4v,checker=?,lct=?  where did = ? and ctid in  ";
	public  static final String statisticDoctorByStatus="select status,count(*) from Doctor group by status";
	public  static final String statisticDoctorByPtlvl="select ptlvl,count(*) from Doctor group by ptlvl  order by ptlvl asc";

}
