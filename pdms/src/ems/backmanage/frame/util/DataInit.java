//package com.web.jz.bs.nms.module.util;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.FileNotFoundException;
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.Date;
//
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.ss.usermodel.Row;
//import org.apache.poi.ss.usermodel.Sheet;
//import org.apache.poi.ss.usermodel.Workbook;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//
//import com.web.jz.bs.nms.module.common.address.po.Address;
//import com.web.jz.bs.nms.module.common.device.po.DeviceParamOidMapping;
//
//
// public class DataInit {
////private static String url="D:/a.xlsx";
//private static String url="D:/BS文档/HFC/oidmapping.xls";
//	/**
//	 * @param args
//	 */
//	@SuppressWarnings("static-access")
//	public static void main(String[] args) {
//		// TODO 自动生成方法存根
//		File file = new File(url);
//		if(!file.exists()){
//			System.out.println("文件不存在");
//			return;
//		}
//		DataInit rf = new DataInit();
//		rf.initHfcOidMapping(file);
//	}
//	public static void handleInit() {
//		
//		File file = new File(url);
//		if(!file.exists()){
//			System.out.println("文件不存在");
//			return;
//		}
//		initHfcOidMapping(file);
//	}
//	/**
//	 * 初始化区域
//	 * @param file
//	 */
//	public static void initAddress(File file){
//		try {
//			InputStream inputStream = new FileInputStream(file);
//			String fileName = file.getName();
//			Workbook wb = null;
//			if(fileName.endsWith("xls")){
//				wb = new HSSFWorkbook(inputStream);//解析xls格式
//			}else if(fileName.endsWith("xlsx")){
//				wb = new XSSFWorkbook(inputStream);//解析xlsx格式
//			}
//			Sheet sheet = wb.getSheetAt(0);//第一个工作表
//			int firstRowIndex = sheet.getFirstRowNum();
//			int lastRowIndex = sheet.getLastRowNum();
//			for(int rIndex = firstRowIndex; rIndex <= lastRowIndex; rIndex ++){
//				Row row = sheet.getRow(rIndex);
//				if(row != null){
//					int firstCellIndex = row.getFirstCellNum();
//					int lastCellIndex = row.getLastCellNum();
//					Address address=new Address();
//					address.setOperateTime(new Date());
//					address.setCreateTime(new Date());
//					address.setStatus(0);
//					for(int cIndex = firstCellIndex; cIndex < lastCellIndex; cIndex ++){
//						Cell cell = row.getCell(cIndex);
//						if(cIndex==0)
//						{	
//							address.setId(Integer.parseInt(cell.toString().replace(".0", "")));
//						}
//						if(cIndex==1)
//						{								
//							address.setName(cell.toString());
//						}
//						if(cIndex==2)
//						{
//							address.setParentId(Integer.parseInt(cell.toString().replace(".0", "")));
//						}
//						if(cIndex==3)
//						{
//							address.setLayerCode(cell.toString()+".");
//						}
//						
//					}
//					System.out.println(FrameObjectUtil.convertBeanToMap(address));
//				   FrameDatabaseUtil.getBaseDaoImpl().saveOrUpdate(address);
//				}
//			}
//		} catch (FileNotFoundException e) {
//			// TODO 自动生成 catch 块
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO 自动生成 catch 块
//			e.printStackTrace();
//		}
//	}
//	
//	
//	/**
//	 * 初始化区域
//	 * @param file
//	 */
//	public static void initHfcOidMapping(File file){
//		try {
//			InputStream inputStream = new FileInputStream(file);
//			String fileName = file.getName();
//			Workbook wb = null;
//			if(fileName.endsWith("xls")){
//				wb = new HSSFWorkbook(inputStream);//解析xls格式
//			}else if(fileName.endsWith("xlsx")){
//				wb = new XSSFWorkbook(inputStream);//解析xlsx格式
//			}
//			Sheet sheet = wb.getSheetAt(0);//第一个工作表
//			int firstRowIndex = sheet.getFirstRowNum();
//			int lastRowIndex = sheet.getLastRowNum();
//			for(int rIndex = firstRowIndex; rIndex <= lastRowIndex; rIndex ++){
//				Row row = sheet.getRow(rIndex);
//				if(row != null){
//					int firstCellIndex = row.getFirstCellNum();
//					if(row.getCell(firstCellIndex)==null||"".equals(row.getCell(firstCellIndex).toString()))
//					{
//						break;
//					}
//					int lastCellIndex = row.getLastCellNum();
//					DeviceParamOidMapping oid=new DeviceParamOidMapping();
//					
//					for(int cIndex = firstCellIndex; cIndex < lastCellIndex; cIndex ++){
//						Cell cell = row.getCell(cIndex);
//						if(cIndex==0)
//						{	
//							 if(cell==null||cell.toString().equals(""))
//							 {
//								continue;
//							 }
//							oid.setId(Integer.parseInt(cell.toString().replace(".0", "")));
//						}
//						if(cIndex==1)
//						{		
//							 if(cell==null||cell.toString().equals(""))
//							 {
//								continue;
//							 }
//							oid.setParamCode(cell.toString());
//						}
//						if(cIndex==2)
//						{
//							 if(cell==null||cell.toString().equals(""))
//							 {
//								continue;
//							 }
//							oid.setNameCode(cell.toString());
//						}
//						if(cIndex==3)
//						{
//							 if(cell==null||cell.toString().equals(""))
//							 {
//								continue;
//							 }
//							oid.setOid(cell.toString());
//						}
//						if(cIndex==4)
//						{
//							 if(cell==null||cell.toString().equals(""))
//							 {
//								continue;
//							 }
//							oid.setDeviceModelId(Integer.parseInt(cell.toString().replace(".0", "")));
//						}
//						if(cIndex==5)
//						{
//							 if(cell==null||cell.toString().equals(""))
//							 {
//								continue;
//							 }
//							oid.setValueType(cell.toString());
//						}
//						if(cIndex==6)
//						{
//							 if(cell==null||cell.toString().equals(""))
//							 {
//								continue;
//							 }
//							
//							oid.setMultiple((Integer.parseInt(cell.toString().replace(".0", ""))+"").toString());
//						}
//						if(cIndex==7)
//						{
//							 if(cell==null||cell.toString().equals(""))
//							 {
//								continue;
//							 }
//							oid.setUnitName(cell.toString());
//						}
//						
//						if(cIndex==8)
//						{
//							 if(cell==null||cell.toString().equals(""))
//							 {
//								continue;
//							 }
//							oid.setRwMark(Integer.parseInt(cell.toString().replace(".0", "")));
//						}
//					
//						if(cIndex==9)
//						{
//							 if(cell==null||cell.toString().equals(""))
//							 {
//								continue;
//							 }
//							oid.setIndexLength(Integer.parseInt(cell.toString().replace(".0", "")));
//						}
//					
//						if(cIndex==10)
//						{
//					
//							oid.setCreateTime(new Date());
//						}
//						if(cIndex==11)
//						{
//				
//							oid.setOperateTime(new Date());
//						}
//						if(cIndex==12)
//						{
//					
//							oid.setExtend(null);
//						}
//						if(cIndex==13)
//						{
//				
//							oid.setCreatorId(null);
//						}
//						if(cIndex==14)
//						{
//						
//							oid.setStatus(0);
//						}
//						if(cIndex==15)
//						{
//							 if(cell==null||cell.toString().equals(""))
//							 {
//								continue;
//							 }
//							oid.setAlarm(Integer.parseInt(cell.toString().replace(".0", "")));
//						}
//						if(cIndex==16)
//						{
//							
//							oid.setRemark(null);
//						}
//					}
//					System.out.println(FrameObjectUtil.convertBeanToMap(oid));
//				   try {
//					  Object deviceOid = FrameDatabaseUtil.getBaseDaoImpl().getEntityById(DeviceParamOidMapping.class, oid.getId());
//					  if(deviceOid==null)
//					  {
//					FrameDatabaseUtil.getBaseDaoImpl().saveOrUpdate(oid);
//					  }
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
//				}
//			}
//		} catch (FileNotFoundException e) {
//			// TODO 自动生成 catch 块
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO 自动生成 catch 块
//			e.printStackTrace();
//		}
//	}
//}
