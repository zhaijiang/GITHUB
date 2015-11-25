package ems.backmanage.basedata;

import java.util.List;
import java.util.Map;

import ems.model.Ref_ctftype;

/**
 * 角色服务类。
 *
 * @author zjiang
 *
 */


public class NmsRoleServiceImpl {

	public List<Ref_ctftype> loadNmsRole(String condition, Integer start, Integer limit)  {
		return null;
		
	}
   /**
    * 根据条件统计角色
    * @param condition 查询条件
    * @return 统计结果 
    */

	public int countNmsRole(String condition) {
		return 0;
		
	}

	/**
     * 添加角色
     * @param nmsRoles 角色对象
     * @return 添加结果
     */   
	public Map<String, Object> addNmsRole(List<Ref_ctftype> pos) {
		return null;
		 
	}
    /**
     * 更新角色
     * @param nmsRoles 角色对象
     * @return 更新结果
     */	
	public boolean updateNmsRole(List<Ref_ctftype> nmsRoles) {
		
		return true;
	}

		public boolean deleteNmsRole(List<Integer>  ids) {
			return false;
			
		}
	

}
