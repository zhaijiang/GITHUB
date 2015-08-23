package ems.config;

import java.io.File;
import java.io.IOException;

/** 
 * @author 作者 jintao
 * @version 创建时间：2015-6-11 下午5:51:54 
 * 类说明 
 */
public class aaa {
	  public static void main(String[] args) throws IOException {  
	     int[][] a = new int[7][];
	     for (int i = 0; i < 7; i++) {
	    		a[i]=new int[i+1];
	    		a[i][0]=1;
	    		a[i][i]=1;
	    	 for (int j = 1; j < i; j++) {
	    		 a[i][j] = a[i-1][j-1] + a[i-1][j];
			}
		}
	     for (int i = 0; i < a.length; i++) {
	    	 for (int j = 0; j < a.length-i; j++) {
	    			System.out.print(" ");
			}
			for (int j = 0; j <=i; j++) {
				System.out.print(" "+a[i][j]);
			}
			System.out.println();
		}
	    }  
}
