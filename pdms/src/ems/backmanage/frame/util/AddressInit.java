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
//
//
// public class AddressInit {
////private static String url="D:/a.xlsx";
//private static String url="C:/Users/LJun/Desktop/111.xlsx";
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
//		AddressInit rf = new AddressInit();
//		rf.readExcel(file);
//	}
//	public static void handleInit() {
//		
//		File file = new File(url);
//		if(!file.exists()){
//			System.out.println("文件不存在");
//			return;
//		}
//		readExcel(file);
//	}
//	/**
//	 * 读取Excel数据
//	 * @param file
//	 */
//	public static void readExcel(File file){
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
//}
