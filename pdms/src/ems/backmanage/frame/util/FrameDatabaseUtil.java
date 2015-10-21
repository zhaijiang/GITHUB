package ems.backmanage.frame.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import ems.backmanage.frame.database.entity.QueryCondition;

public class FrameDatabaseUtil {

	public static List<?> queryByCondition(String hql,
			List<QueryCondition> conditions) {
		return (List<?>) queryByCondition(hql, conditions, null, null).get(
				"datas");
	}

	/**
	 * 获取in 查询字符串
	 * 
	 * @return
	 */
	public static String getInString(Object[] params) {
		if (params == null || params.length == 0) {
			return null;
		}
		String inString = null;
		if (params instanceof Integer[]) {
			StringBuffer sql = new StringBuffer();
			for (Object param : params) {

				sql.append(param + ",");
			}
			inString = sql.toString().substring(0,
					sql.toString().lastIndexOf(","));
			inString = "(" + inString + ")";
			

		} else if (params instanceof String[]) {
			StringBuffer sql = new StringBuffer();
			for (Object param : params) {

				sql.append("'" + param + "'" + ",");
			}
			inString = sql.toString().substring(0,
					sql.toString().lastIndexOf(","));
			inString = "(" + inString + ")";
				

		} else {
			
		}
         return inString;
	}

	public static Map<String, Object> queryByCondition(String hql,
			List<QueryCondition> conditions, Integer start, Integer limit) {

		List<Object> values =new ArrayList<Object>();
		Map<String, Object> result = new HashMap<String, Object>();

		hql = getHqlJdbc(hql, conditions, values, "and");
		if (limit != null && start != null) {
			int pageNumber = start / limit + 1;
			
			Page<Record> pg = Db.paginate(pageNumber, limit,
					hql.substring(0, hql.indexOf("from")),
					hql.substring(hql.indexOf("from")),values.toArray());
			result.put("total", pg.getTotalRow());
			result.put("datas", pg.getList());
		} else {
			List<Object> datas = Db.query(hql,values.toArray());
			result.put("datas", datas);

		}
		return result;
	}
	public static String getHqlJdbc(String hql, List<QueryCondition> conditions,
			List<Object> values, String connect) {
		if (!hql.toLowerCase().contains("where")) {
			hql = hql + " where ";
		} else {
			if (!hql.toLowerCase().trim().endsWith("and")) {
				hql = hql + " and ";
			}
		}

		hql = getHqlJdbc2(hql, conditions, values, connect).trim();
		if (hql.endsWith("and")) {
			hql = hql.substring(0, hql.lastIndexOf("and"));
		}
		if (hql.endsWith("or")) {
			hql = hql.substring(0, hql.lastIndexOf("or"));

		}
		return hql;
	}
	@SuppressWarnings("unchecked")
	private static String getHqlJdbc2(String hql, List<QueryCondition> conditions,
			List<Object>values, String connect) {
		if (conditions != null && conditions.size() != 0) {

			connect = " " + connect + " ";
			for (QueryCondition condition : conditions) {
				String operation = condition.getOperation();
				String fieldName = condition.getFieldName() == null ? ""
						: condition.getFieldName().replaceAll(" ", "");
				String paramName = fieldName.contains(".") ? fieldName
						.replaceAll("\\.", "_") : fieldName;
				Object value = getValueByValueType(condition);
				if (("eq".equalsIgnoreCase(operation))
						|| ("=".equalsIgnoreCase(operation))
						|| ("eqproperty".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " = " + "?" + connect;
					values.add(value);
				}
				if (("ne".equalsIgnoreCase(operation))
						|| ("!=".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " != " + "?" + connect;
					values.add(value);
				}
				if (("ge".equalsIgnoreCase(operation))
						|| (">=".equalsIgnoreCase(operation))
						|| ("geproperty".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " >= " + "?" + connect;
					values.add(value);
				}
				if (("gt".equalsIgnoreCase(operation))
						|| (">".equalsIgnoreCase(operation))
						|| ("gtproperty".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " > " + "?" + connect;
					values.add(value);
				}
				if (("le".equalsIgnoreCase(operation))
						|| ("<=".equalsIgnoreCase(operation))
						|| ("leproperty".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " <= " + "?" + connect;
					values.add(value);
				}
				if (("lt".equalsIgnoreCase(operation))
						|| ("<".equalsIgnoreCase(operation))
						|| ("ltproperty".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " < " + "?" + connect;
					values.add(value);
				}
				if ("like".equalsIgnoreCase(operation)) {
					hql = hql + fieldName + " like " + "?"
							+ connect;
					values.add(value);
				}
				if ("ilike".equalsIgnoreCase(operation)) {
					hql = hql + fieldName + " ilike " + "?"
							+ connect;
					values.add(value);
				}
				if ("between".equalsIgnoreCase(operation)) {
					{
						List<?> vals = (List<?>) value;
						hql = hql + fieldName + " between " + "?"
								+ "1" + "?" + "2";
						values.add(vals.get(0));
						values.add( vals.get(1));
					}
				}
				if (("in".equalsIgnoreCase(operation))
						|| ("exist".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " in " + "?" + connect;
					values.add(value);

				}

				if (("notin".equalsIgnoreCase(operation))
						|| ("notin".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " in " + "?" + connect;
					values.add(value);

				}
				if ("is".equalsIgnoreCase(operation)) {
					if ("null".equalsIgnoreCase(value.toString())) {
						hql = hql + fieldName + " is null " + connect;
					} else {
						hql = hql + fieldName + " is " + "?"
								+ connect;
						values.add(value);
					}

				}

				if ("or".equalsIgnoreCase(operation)) {

					List<Object> valueList = (List<Object>) value;
					List<QueryCondition> cons = new ArrayList<QueryCondition>();
					for (Object va : valueList) {
						QueryCondition con = null;
						if (va instanceof QueryCondition) {
							con = (QueryCondition) va;
						} else {
							con = (QueryCondition) FrameObjectUtil
									.convertMapToBean(QueryCondition.class,
											(Map<String, Object>) va);
						}

						cons.add(con);
					}
					hql = getHqlJdbc2(hql + " ( ", cons, values, "or");
					if (hql.endsWith("or ")) {
						hql = hql.substring(0, hql.lastIndexOf("or "))
								+ " ) and ";

					}

				}

			}
		}

		return hql;
	}

	public static String getHql(String hql, List<QueryCondition> conditions,
			Map<String, Object> values, String connect) {
		if (!hql.toLowerCase().contains("where")) {
			hql = hql + " where ";
		} else {
			if (!hql.toLowerCase().trim().endsWith("and")) {
				hql = hql + " and ";
			}
		}

		hql = getHql2(hql, conditions, values, connect).trim();
		if (hql.endsWith("and")) {
			hql = hql.substring(0, hql.lastIndexOf("and"));
		}
		if (hql.endsWith("or")) {
			hql = hql.substring(0, hql.lastIndexOf("or"));

		}
		return hql;
	}

	@SuppressWarnings("unchecked")
	private static String getHql2(String hql, List<QueryCondition> conditions,
			Map<String, Object> values, String connect) {
		if (conditions != null && conditions.size() != 0) {

			connect = " " + connect + " ";
			for (QueryCondition condition : conditions) {
				String operation = condition.getOperation();
				String fieldName = condition.getFieldName() == null ? ""
						: condition.getFieldName().replaceAll(" ", "");
				String paramName = fieldName.contains(".") ? fieldName
						.replaceAll("\\.", "_") : fieldName;
				Object value = getValueByValueType(condition);
				if (("eq".equalsIgnoreCase(operation))
						|| ("=".equalsIgnoreCase(operation))
						|| ("eqproperty".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " = " + ":" + paramName + connect;
					values.put(paramName, value);
				}
				if (("ne".equalsIgnoreCase(operation))
						|| ("!=".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " != " + ":" + paramName + connect;
					values.put(paramName, value);
				}
				if (("ge".equalsIgnoreCase(operation))
						|| (">=".equalsIgnoreCase(operation))
						|| ("geproperty".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " >= " + ":" + paramName + connect;
					values.put(paramName, value);
				}
				if (("gt".equalsIgnoreCase(operation))
						|| (">".equalsIgnoreCase(operation))
						|| ("gtproperty".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " > " + ":" + paramName + connect;
					values.put(paramName, value);
				}
				if (("le".equalsIgnoreCase(operation))
						|| ("<=".equalsIgnoreCase(operation))
						|| ("leproperty".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " <= " + ":" + paramName + connect;
					values.put(paramName, value);
				}
				if (("lt".equalsIgnoreCase(operation))
						|| ("<".equalsIgnoreCase(operation))
						|| ("ltproperty".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " < " + ":" + paramName + connect;
					values.put(paramName, value);
				}
				if ("like".equalsIgnoreCase(operation)) {
					hql = hql + fieldName + " like " + ":" + paramName
							+ connect;
					values.put(paramName, value);
				}
				if ("ilike".equalsIgnoreCase(operation)) {
					hql = hql + fieldName + " ilike " + ":" + paramName
							+ connect;
					values.put(paramName, value);
				}
				if ("between".equalsIgnoreCase(operation)) {
					{
						List<?> vals = (List<?>) value;
						hql = hql + fieldName + " between " + ":" + paramName
								+ "1" + ":" + paramName + "2";
						values.put(paramName + "1", vals.get(0));
						values.put(paramName + "2", vals.get(1));
					}
				}
				if (("in".equalsIgnoreCase(operation))
						|| ("exist".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " in " + ":" + paramName + connect;
					values.put(paramName, value);

				}

				if (("notin".equalsIgnoreCase(operation))
						|| ("notin".equalsIgnoreCase(operation))) {
					hql = hql + fieldName + " in " + ":" + paramName + connect;
					values.put(paramName, value);

				}
				if ("is".equalsIgnoreCase(operation)) {
					if ("null".equalsIgnoreCase(value.toString())) {
						hql = hql + fieldName + " is null " + connect;
					} else {
						hql = hql + fieldName + " is " + ":" + paramName
								+ connect;
						values.put(paramName, value);
					}

				}

				if ("or".equalsIgnoreCase(operation)) {

					List<Object> valueList = (List<Object>) value;
					List<QueryCondition> cons = new ArrayList<QueryCondition>();
					for (Object va : valueList) {
						QueryCondition con = null;
						if (va instanceof QueryCondition) {
							con = (QueryCondition) va;
						} else {
							con = (QueryCondition) FrameObjectUtil
									.convertMapToBean(QueryCondition.class,
											(Map<String, Object>) va);
						}

						cons.add(con);
					}
					hql = getHql2(hql + " ( ", cons, values, "or");
					if (hql.endsWith("or ")) {
						hql = hql.substring(0, hql.lastIndexOf("or "))
								+ " ) and ";

					}

				}

			}
		}

		return hql;
	}

	public static Object getValueByValueType(QueryCondition condition) {
		String valueType = condition.getValueType();
		Object value = condition.getValue();
		if ("or".equalsIgnoreCase(condition.getOperation())) {
			return value;
		}
		if (valueType.contains("[") || valueType.contains("]")) {
			if (valueType.toLowerCase().contains("Integer".toLowerCase())) {
				if (value instanceof Collection<?>) {
					List<Integer> newValue = new ArrayList<Integer>();
					Collection<?> val = (Collection<?>) value;
					for (Object v : val) {
						newValue.add(Integer.parseInt(v.toString()));

					}
					return newValue;
				}
			}
			if (valueType.toLowerCase().contains("String".toLowerCase())) {
				if (value instanceof Collection<?>) {
					List<String> newValue = new ArrayList<String>();
					Collection<?> val = (Collection<?>) value;
					for (Object v : val) {
						newValue.add(v.toString());

					}
					return newValue;
				}
			}
			if (valueType.toLowerCase().contains("Long".toLowerCase())) {
				if (value instanceof Collection<?>) {
					List<Long> newValue = new ArrayList<Long>();
					Collection<?> val = (Collection<?>) value;
					for (Object v : val) {
						newValue.add(Long.parseLong(v.toString()));

					}
					return newValue;
				}
			}
			if (valueType.toLowerCase().contains("Date".toLowerCase())) {
				if (value instanceof Collection<?>) {
					List<Date> newValue = new ArrayList<Date>();
					Collection<?> val = (Collection<?>) value;
					for (Object v : val) {
						newValue.add(FrameDateUtil.changeStringToDate(v
								.toString()));

					}
					return newValue;
				}
			}

		} else {
			if ("Integer".equalsIgnoreCase(valueType)) {
				return Integer.parseInt(condition.getValue().toString());
			}
			if ("String".equalsIgnoreCase(valueType)) {
				return condition.getValue().toString();
			}
			if ("Long".equalsIgnoreCase(valueType)) {
				return Long.parseLong(condition.getValue().toString());
			}
			if ("Date".equalsIgnoreCase(valueType)) {
				return FrameDateUtil.changeStringToDate(condition.getValue()
						.toString());
			}
			if ("Boolean".equalsIgnoreCase(valueType)) {
				return Boolean.parseBoolean(condition.getValue().toString());
			}
			if ("null".equalsIgnoreCase(valueType)) {
				return "null";
			}

		}
		return value;
	}

}
