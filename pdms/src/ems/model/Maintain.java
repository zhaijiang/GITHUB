/**
* 文件名：Maintain.java
* 创建日期： 2014年5月8日
* 作者：     lipanpan
* Copyright (c) 2009-2011 无线开发室
* All rights reserved.
 
* 修改记录：
* 	1.修改时间：2014年5月8日
*   修改人：lipanpan
*   修改内容：
*/
package ems.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import ems.config.EmsConfig;

/**
 * 功能描述：维修记录Model
 */
public class Maintain extends Model<Maintain>
{
    private static final long serialVersionUID = 1L;
    public final static Maintain  dao = new Maintain();
    public final static String QUERY_ALL_MAINTAIN = "select * from maintain_table";
    
    /**
     * 获取指定设备id的维修记录
     * @param offset
     * @param deviceId
     * @return  List<Maintain>
     */
    public List<Maintain> findPageMaintainList(int offset,int deviceId){
        List<Maintain> maintainlist = null;
        Page<Maintain> pageList = paginate((offset/EmsConfig.pageSize)+1, EmsConfig.pageSize, "select *",
            "from maintain_table where  equipId ="+deviceId);
        maintainlist = pageList.getList();
        return maintainlist;
    }
    
    /**
     * 获取表记录总数
     * @return
     */
    public int getTableCount(){
        List<Maintain> maintainAllList = find(Maintain.QUERY_ALL_MAINTAIN);
        int num = 0;
        if (maintainAllList != null)
        {
            num = maintainAllList.size();
        }
        return num;
    }
}
