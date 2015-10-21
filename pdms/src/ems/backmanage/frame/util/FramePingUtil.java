package ems.backmanage.frame.util;

import java.net.InetAddress;

public class FramePingUtil {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		System.out.println(ping("192.168.226.22",3000));
	}
	public static  boolean ping(String  ip,int  timeout) {
		boolean status=false;
		try {
				 InetAddress net = InetAddress.getByName(ip);
				 status=net.isReachable(timeout);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return status;
	}

}
