package ems.backmanage.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import ems.backmanage.BackConfig;
import ems.backmanage.frame.database.entity.QueryCondition;
import ems.backmanage.frame.util.FrameDatabaseUtil;
import ems.backmanage.frame.util.FrameJsonUtil;
import ems.backmanage.helper.IgnoreInterceptor;
import ems.backmanage.sql.SqlBack;
import ems.backmanage.sql.SqlBackDoctor;
import ems.backmanage.sql.SqlBackOrders;
import ems.controller.BaseController;
import ems.model.Doctor;

@IgnoreInterceptor
public class BackOrdersController extends BaseController {

	public void loadOrders() {

		try {
			String condition = getPara("condition");
			Integer start = getPara("start") == null ? null : Integer
					.parseInt(getPara("start"));
			Integer limit = getPara("limit") == null ? null : Integer
					.parseInt(getPara("limit"));
			QueryCondition[] conditions = {};
			if (condition != null) {
				conditions = FrameJsonUtil.getObjectMapper().readValue(
						condition, QueryCondition[].class);
			}
			QueryCondition queryCondition = new QueryCondition();

			queryCondition.setOperation("orderby");
			queryCondition.setFieldName("t.createtime");
			queryCondition.setValue("asc");
			// 创建时间
			List<QueryCondition> cons = new ArrayList<QueryCondition>(
					Arrays.asList(conditions));
			cons.add(queryCondition);
			Map<String, Object> result = FrameDatabaseUtil.queryByCondition(
					SqlBackOrders.loadOrders, cons, start, limit);
			setAttr("returnData", result.get("datas"));
			setAttr("total", result.get("total"));
			setAttr("success", true);
			renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		}

	}

	public void loadOrdersDetail() {

		try {
			String condition = getPara("condition");
			Integer start = getPara("start") == null ? null : Integer
					.parseInt(getPara("start"));
			Integer limit = getPara("limit") == null ? null : Integer
					.parseInt(getPara("limit"));
			QueryCondition[] conditions = {};
			if (condition != null) {
				conditions = FrameJsonUtil.getObjectMapper().readValue(
						condition, QueryCondition[].class);
			}
			QueryCondition queryCondition = new QueryCondition();

			queryCondition.setOperation("orderby");
			queryCondition.setFieldName("t.createtime");
			queryCondition.setValue("asc");
			// 创建时间
			List<QueryCondition> cons = new ArrayList<QueryCondition>(
					Arrays.asList(conditions));
			cons.add(queryCondition);
			Map<String, Object> result = FrameDatabaseUtil.queryByCondition(
					SqlBackOrders.loadOrders, cons, start, limit);
			Object datas = result.get("datas");
			if (datas != null) {
				List<Record> datali = (List<Record>) datas;
				if (datali.size() != 0) {
					int price = 0;
					StringBuffer sqls = new StringBuffer(" and t.did in (");
					for (Record data : datali) {
						sqls.append(data.get("did") + ",");
					}
					String sql=sqls.toString().substring(0,sqls.toString().length()-1);
					sql=sql+")";
					List<Record> docs = Db.find(SqlBackDoctor.loadDoctorByCondition+sql);
					Map<Long,Integer> docPrice=new HashMap<Long, Integer>();
					for(Record doc:docs)
					{
						docPrice.put(doc.getLong("did"), doc.getInt("price"));
					}
					for (Record data : datali) {
						Object priceo = data.get("price");
						if (priceo != null) {
							price = Integer.parseInt(priceo.toString());
							double scale = getDoctorRealScale();
							Integer dprice = docPrice.get(data.getLong("did"));
							double docin=0;
							if(dprice!=null)
							{
								 docin = dprice*scale;
							}
							double platformin = price-docin;
							 data.set("platformin", platformin);
							 data.set("platformpay", docin);
						}
					}
				}
			}
			setAttr("returnData", result.get("datas"));
			setAttr("total", result.get("total"));
			setAttr("success", true);
			renderJson();
		} catch (Exception e) {

			e.printStackTrace();
		}

	}

	public void loadOtrace() {

		String oid = getPara("oid");

		Integer start = getPara("start") == null ? null : Integer
				.parseInt(getPara("start").toString());
		Integer limit = getPara("limit") == null ? null : Integer
				.parseInt(getPara("limit").toString());
		Map<String, Object> result = FrameDatabaseUtil.queryByPage(
				SqlBackOrders.loadOtrace, start, limit, oid);

		setAttr("returnData", result.get("datas"));
		setAttr("total", result.get("total"));

		setAttr("success", true);
		renderJson();

	}

	/**
	 * 排序查询
	 */
	public void loadDoctorByIncome() {

		try {
			Integer start = getPara("start") == null ? null : Integer
					.parseInt(getPara("start").toString());
			Integer limit = getPara("limit") == null ? null : Integer
					.parseInt(getPara("limit").toString());
			String condition = getPara("condition");
			String sql = "";
			List<Object> values = new ArrayList<Object>();
			if (condition != null) {

				QueryCondition[] conditions = FrameJsonUtil.getObjectMapper()
						.readValue(condition, QueryCondition[].class);

				Map<String, Object> map = FrameDatabaseUtil.getSqlPart(Arrays
						.asList(conditions));
				Object sqlo = map.get("sql");
				if (sqlo != null) {
					sql = sqlo.toString();
				}
				Object valueso = map.get("values");
				if (valueso != null) {
					values = (List<Object>) valueso;
				}
			}
			// 完成时间
			sql = sql.replace("t.createtime", "ot.time");
			sql = "".equals(sql) ? "" : " and " + sql;

			values.add(0, getDoctorRealScale());
			int pageNum = start / limit + 1;
			// 通过 condition 得到sql
			Page<Record> datalist = Db
					.paginate(pageNum, limit, SqlBackOrders.loadDoctorByPart0,
							SqlBackOrders.loadDoctorByPart1 + sql
									+ SqlBackOrders.loadDoctorByPart2,
							values.toArray());
			List<Record> datas = datalist.getList();
			setAttr("returnData", datas);
			setAttr("success", true);

		} catch (Exception e) {

			e.printStackTrace();
			setAttr("success", false);

		}
		renderJson();

	}

	/**
	 * 统计
	 */
	public void statisticOrders() {

		try {

			String condition = getPara("condition");
			String sql = "";
			List<Object> values = new ArrayList<Object>();
			QueryCondition[] conditions = {};
			if (condition != null) {

				conditions = FrameJsonUtil.getObjectMapper().readValue(
						condition, QueryCondition[].class);
			}

			Map<String, Object> map = FrameDatabaseUtil.getSqlPart(Arrays
					.asList(conditions));
			Object sqlo = map.get("sql");
			if (sqlo != null) {
				sql = sqlo.toString();
			}
			Object valueso = map.get("values");
			if (valueso != null) {
				values = (List<Object>) valueso;
			}
			// 完成时间
			sql = sql.replace("t.createtime", "ot.time");
			sql = "".equals(sql) ? "" : " and " + sql;
			values.add(0, getDoctorRealScale());

			List<Record> datalist = Db.find(SqlBackOrders.countDoctorIncome0
					+ SqlBackOrders.loadDoctorByPart1 + sql
					+ SqlBackOrders.loadDoctorByPart2, values.toArray());
			double doctotalincome = 0.0;
			if (datalist != null && datalist.size() != 0) {
				Record datas = datalist.get(0);
				Object totalincomeo = datas.get("totalincome");
				if (totalincomeo != null) {
					doctotalincome = Double
							.parseDouble(totalincomeo.toString());
				}
			}

			int totalorders = 0;
			values.clear();
			sql = FrameDatabaseUtil.getSql(SqlBackOrders.countOrders,
					Arrays.asList(conditions), values, "and");
			datalist = Db.find(sql, values.toArray());
			if (datalist != null && datalist.size() != 0) {
				Object totalo = datalist.get(0).get("total");
				if (totalo != null) {
					totalorders = Integer.parseInt(totalo.toString());
				}
			}

			double orderstotalprice = 0;
			values.clear();
			// 完成时间
			sql = FrameDatabaseUtil.getSql(SqlBackOrders.countOrdersTotalPrice,
					Arrays.asList(conditions), values, "and");
			sql = sql.replace("t.createtime", "ot.time");
			datalist = Db.find(sql, values.toArray());
			if (datalist != null && datalist.size() != 0) {
				Object totalo = datalist.get(0).get("totalprice");
				if (totalo != null) {
					orderstotalprice = Integer.parseInt(totalo.toString());
				}
			}
			double systotalincome = orderstotalprice - doctotalincome;
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("totalorders", totalorders);
			result.put("orderstotalprice", orderstotalprice);
			result.put("doctotalincome", doctotalincome);
			result.put("systotalincome", systotalincome);
			setAttr("returnData", result);
			setAttr("success", true);

		} catch (Exception e) {

			e.printStackTrace();
			setAttr("success", false);
		}
		renderJson();

	}

	public double getDoctorRealScale() {

		List<Record> docs = Db.find(SqlBack.getFromGlobals,
				BackConfig.DOCTOR_CUT, BackConfig.DOCTOR_SUBSIDY);
		int cut = 0;
		int subsidy = 0;
		if (docs != null && docs.size() != 0) {
			for (Record doc : docs) {
				Object name = doc.get("gv_name");
				Object value = doc.get("gv_value");
				if (BackConfig.DOCTOR_CUT.equalsIgnoreCase(name + "")) {
					cut = Integer.parseInt(value.toString());

				}
				if (BackConfig.DOCTOR_SUBSIDY.equalsIgnoreCase(name + "")) {
					subsidy = Integer.parseInt(value.toString());

				}
			}
		}

		return (100 + subsidy - cut) / 100.0;

	}
}
