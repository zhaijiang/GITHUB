package ems.backmanage.test;

import java.util.HashMap;
import java.util.Map;

import com.alipay.config.AlipayConfig;
import com.alipay.util.AlipaySubmit;
/**
 * https://mapi.alipay.com/gateway.do?service=batch_trans_notify&partner=2088002464631181&_input_charset=utf-8&notify_url=http%3A%2F%2Fwww.test.com%2Fnotify%2Falipay%2Finterface.htm&sign_type=DSA&sign=_p_w_l_h_j0b_gd_aejia7n_ko4_m%252Fu_w_jd3_nx_s_k_mxus9_hoxg_y_r_lunli_pmma29_t_q%3D%3D&email=biz_932%40alitest.com&pay_date=20080107&batch_no=20080107001&batch_num=1000&account_name=%C3%AB%C3%AB&batch_fee=20000&detail_data=0315006%5Etestture0002%40126.com%5E%E5%B8%B8%E7%82%9C%E4%B9%B0%E5%AE%B6%E4%BA%8C%5E20.00%5Ehello%7C0315001%5Etestture0002%40126.com%5E%E5%B8%B8%E7%82%9C%E4%B9%B0%E5%AE%B6%E4%BA%8C%5E20.00%5Ehello&buyer_account_name=maomao%40alipay.com&extend_param=agent^123456
 * @author zj
 *
 */
public class AlipayTest{

	/**
	 * @param args
	 * @throws Exception 
	 */
	public static void main(String[] args) throws Exception {

		    Map<String,String> hm = new HashMap<String,String>();
		    hm.put("service", "batch_trans_notify");
		    hm.put("partner",  AlipayConfig.partner);// partnerId(合作伙伴ID)
		    hm.put("_input_charset",  AlipayConfig.input_charset);// 采用相同的编码方式
		    //可不填写
		   // hm.put("notify_url", "http://127.0.0.1:8888/mypenguin/orders.do?method=AlipayNotify");// 客户付款后,支付宝调用的页面
		    /**
		     * 付款的详细数据，最多支持1000笔。
		     *  格式为：流水号1^收款方账号1^收款账号姓名1^付款金额1^备注说明1|流水号2^收款方账号2^收款账号姓名2^付款金额2^备注说明2。
		     *  每条记录以“|”间隔。
		     *  
		     *  0315006^testture0002@126.com^常炜买家^20.00^hello
		     *  */
		    hm.put("account_name", "zj");// 付款方的支付宝账户名。
		    hm.put("detail_data", "0315006^testture0002@126.com^常炜买家^20.00^hello");// 付款详细数据
		    /**批量付款批次号。11～32位的数字或字母或数字与字母的组合，且区分大小写。
		    *注意：批量付款批次号用作业务幂等性控制的依据，一旦提交受理，请勿直接更改批次号再次上传。
		    */
		    hm.put("batch_no", "20080107001");//批量付款批次号
		    hm.put("batch_num", "1000");// 批量付款笔数（最多1000笔）。
		    //款文件中的总金额。 格式：10.01，精确到分。
		    hm.put("batch_fee", "10.01");// 付款详细数据
		    hm.put("Email", "5@qq.com");// 付款方的支付宝账号。
		    //hm.put("pay_date", "20080107");// 支付时间（必须为当前日期）。 格式：YYYYMMDD。
		
	         String response = AlipaySubmit.buildRequest(hm,"post","支付");
	     
	         System.out.println(response);

	}
	
	/*//  官方例子
	public void  test(Requst  request)
	{

		//服务器异步通知页面路径
		String notify_url = "http://商户网关地址/batch_trans_notify-JAVA-UTF-8/notify_url.jsp";
		//需http://格式的完整路径，不允许加?id=123这类自定义参数

		//付款账号
		String email = new String(request.getParameter("WIDemail").getBytes("ISO-8859-1"),"UTF-8");
		//必填

		//付款账户名
		String account_name = new String(request.getParameter("WIDaccount_name").getBytes("ISO-8859-1"),"UTF-8");
		//必填，个人支付宝账号是真实姓名公司支付宝账号是公司名称

		//付款当天日期
		String pay_date = new String(request.getParameter("WIDpay_date").getBytes("ISO-8859-1"),"UTF-8");
		//必填，格式：年[4位]月[2位]日[2位]，如：20100801

		//批次号
		String batch_no = new String(request.getParameter("WIDbatch_no").getBytes("ISO-8859-1"),"UTF-8");
		//必填，格式：当天日期[8位]+序列号[3至16位]，如：201008010000001

		//付款总金额
		String batch_fee = new String(request.getParameter("WIDbatch_fee").getBytes("ISO-8859-1"),"UTF-8");
		//必填，即参数detail_data的值中所有金额的总和

		//付款笔数
		String batch_num = new String(request.getParameter("WIDbatch_num").getBytes("ISO-8859-1"),"UTF-8");
		//必填，即参数detail_data的值中，“|”字符出现的数量加1，最大支持1000笔（即“|”字符出现的数量999个）

		//付款详细数据
		String detail_data = new String(request.getParameter("WIDdetail_data").getBytes("ISO-8859-1"),"UTF-8");
		//必填，格式：流水号1^收款方帐号1^真实姓名^付款金额1^备注说明1|流水号2^收款方帐号2^真实姓名^付款金额2^备注说明2....
		
		
		//////////////////////////////////////////////////////////////////////////////////
		
		//把请求参数打包成数组
		Map<String, String> sParaTemp = new HashMap<String, String>();
		sParaTemp.put("service", "batch_trans_notify");
        sParaTemp.put("partner", AlipayConfig.partner);
        sParaTemp.put("_input_charset", AlipayConfig.input_charset);
		sParaTemp.put("notify_url", notify_url);
		sParaTemp.put("email", email);
		sParaTemp.put("account_name", account_name);
		sParaTemp.put("pay_date", pay_date);
		sParaTemp.put("batch_no", batch_no);
		sParaTemp.put("batch_fee", batch_fee);
		sParaTemp.put("batch_num", batch_num);
		sParaTemp.put("detail_data", detail_data);
		
		//建立请求
		String sHtmlText = AlipaySubmit.buildRequest(sParaTemp,"get","确认");
		//out.println(sHtmlText);
	}*/

}
