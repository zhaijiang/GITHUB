package ems.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.jfinal.upload.UploadFile;

import ems.comm.FileUpload;
import ems.model.Doctor;
import ems.util.ConstClass;
import ems.util.ExeptionName;

public class FileController extends Controller {
public FileController(){
	
}


/**
 * 
 * @throws Exception 
 * @Title imageUpload
 * @Description 上传文件
 * @Author jintao
 * @CreateDate 2015-7-11 下午5:23:11
 */
@Before({Tx.class})
public void imageUpload() throws Exception
{
//	getFile();
	
//	 UploadFile  upFile = getFile(getPara("jintao"),"d:/");;
	FileUpload upload = new FileUpload(getRequest());
	//目前只能单图片处理！所以直接取图片；
	FileItem file = upload.getFileItem("jintao");
	//获取图片相关信息
	//String type = file.getFieldName();
	String usertype = (String) upload.getValue("usertype");
	String did = (String) upload.getValue("did");
	String uid = (String) upload.getValue("uid");
	String token = (String) upload.getValue("token");
	String picid = (String) upload.getValue("picid");
	String fileextname = (String) upload.getValue("fileextname");
	String oid = (String) upload.getValue("oid");
//	//第一次切割拆分获取前台传入的map信息condition:数据操作条件；server：服务选择（资质，头像）;path:图片保存路径
//	String[] typeArr = type.split(";");
//	Map<String, Object> data = new HashMap<String, Object>();
//	for  ( int i = 0; i<typeArr.length;i++)
//	{
//		String[] minType = typeArr[i].split(":");
//		for(int j = 0;j<minType.length;j++)
//		{
//			data.put(minType[0], minType[1]);
//		}
//		System.out.println(typeArr[i]);
//	}
	//判断当前token是否过期
	String tokenDb = "";
//	Doctor doctor =(Doctor)getSession().getAttribute("doctor");
//	User user =(User)getSession().getAttribute("user");
	boolean typeflag = true;
//	if(usertype.contains("doctor")){
//		tokenDb = Db.queryStr("select token from doctor where did=?",did);
//    }else{
//    	 typeflag = false;
//    	 tokenDb = Db.queryStr("select token from user where uid=?",uid);
//    }
//	//token过期直接返回前台
//    if(tokenDb==null||!token.equals(tokenDb)){
//    	 setAttr("flag",false);
//    	 setAttr("error",ExeptionName.hashMap.get(ExeptionName.NoToken));  
//    	 renderJson(); 
//    	 return;
//    }
    //服务器路径
	String path = getRequest().getSession().getServletContext().getRealPath("/");
	//文件地址
	String filepath="";
	//文件目录
	String dirpath = "";
	//用户传递fileFlag区分是医生还是患者 true为医生
	if(typeflag==true){
		Record record = new Record();
		//文件地址
		if(picid.equals("8")){
			dirpath = "doctor" + "/" + did + "/" + "orders" + "/";
		}else{
			dirpath = "doctor" + "/" + uid + "/";
		}
			//文件目录
			filepath = dirpath + getPhotoName(picid,fileextname,oid,did);
			record.set("did", did);
			record.set("photo", filepath);
			File uploadFile = new File(path+dirpath); 
			if(!uploadFile.exists()){
				uploadFile.mkdirs();
			}
			uploadFile = new File(path+filepath); 
			uploadFile.createNewFile();
			uploadFile.setWritable(true);  
			//保存图片
			file.write(uploadFile);
			//为true表示是医生头像 false为其他证书图片
			if(picid.equals("7")){
				Db.update("doctor", "did",record);
			}else if(picid.equals("8")){
				record = new Record();
				record.set("oid", Integer.parseInt(oid));
				record.set("record_pic", filepath);
				Db.update("orders", "oid", record);
			}else{
				List<Record> lis = Db.find("select * from certification where did=? and ctid=?", did,picid);
				record = new Record();
				record.set("did", Integer.parseInt(did));
				record.set("ctid", picid);
				record.set("pic4v",filepath);
				String dsec = ConstClass.REF_CTFTYPE_HASHMAP.get(Long.parseLong(picid)).toString();
				record.set("dsec",dsec);
				record.set("bshow",0);
				record.set("status",0);
				record.set("lct",new Date());
				if(lis.size()!=0){
					Db.update("update certification set pic4v='"+filepath+"',dsec='"+dsec+"',status=0,bshow=0 where did=? and ctid=?", did,picid);
				}else{
					Db.save("certification", "did",record);
				}
			}
	}
	setAttr("aaa", "asdas");
}
	public String  getPhotoName(String picid,String extendName,String oid,String did){
		String uploadPicServeFileName = "";
		int id = Integer.parseInt(picid);
		int picVersion = 0;
		if(id!=8){
			picVersion = getPhotoVersion(did,id);
		}
		if(picid.trim().equals("1")){
	         uploadPicServeFileName = "idCard_" + picVersion + "." + extendName;
	    }else if(picid.trim().equals("2")){
	         uploadPicServeFileName = "pqCertify_" + picVersion + "." + extendName;
	    }else if(picid.trim().equals("3")){
	         uploadPicServeFileName = "ppCertify_" + picVersion + "." + extendName;
	    }else if(picid.trim().equals("4")){
	         uploadPicServeFileName = "ptCertify_" + picVersion + "." + extendName;
	    }else if(picid.trim().equals("5")){
	         uploadPicServeFileName = "hpCertify_" + picVersion + "." + extendName;
	    }else if(picid.trim().equals("6")){
	         uploadPicServeFileName = "ibCertify_" + picVersion + "." + extendName;
	    }else if(picid.trim().equals("7")){
	         uploadPicServeFileName = "headpic_" + picVersion + "." + extendName;
	    }else if(picid.trim().equals("8")){
	         uploadPicServeFileName = oid + "." + extendName;
	    }
		return uploadPicServeFileName;
	}
	/**
	 * 
	 * @param id 
	 * @Title getPhotoVersion
	 * @Description 从文件名字获取医生图片版本号
	 * @Author jintao
	 * @CreateDate 2015-6-8 下午1:30:06
	 */
	public int getPhotoVersion(String tdid, int id){
		Doctor doctor = (Doctor) Doctor.dao.getByDoctorDid(tdid);
		Long picid = (long) id;
		String url = doctor.getStr("photo");
		Long did = Long.parseLong(tdid);
		//版本号
		int version = 0;
		//不是医生头像标示
		if(picid!=ConstClass.PHOTO){
			Record rds = Db.findFirst("select pic4v from certification where did=? and ctid=?",did,picid);
			if(rds!=null){
				url = rds.getStr("pic4v");
				int num1 = url.lastIndexOf("_");
				int num2 = url.lastIndexOf(".");
				if(num1==-1||num2==-1){
					setAttr("error", "数据库文件名称格式错误！");
					setAttr("flag", false);
					renderJson();
					return 0;
				}
				//获取当前版本号
				version = Integer.parseInt(url.substring(num1+1, num2))+1;
			}else{
				version = version +1;
			}
		}
		else{
			if(url==null||url.isEmpty()){
				version = version +1;
			}else{
				int num1 = url.lastIndexOf("_");
				int num2 = url.lastIndexOf(".");
				if(num1==-1||num2==-1){
					setAttr("error", "数据库文件名称格式错误！");
					setAttr("flag", false);
					renderJson();
					return 0;
				}
				//获取当前版本号
				version = Integer.parseInt(url.substring(num1+1, num2))+1;
			}
		}
		return version;
	}
}
