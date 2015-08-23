package ems.backmanage.test;

import ems.backmanage.controller.BackManageController;
import ems.backmanage.helper.IgnoreInterceptor;

public class test {

	public static void main(String[] args) {
		Class<BackManageController> A = BackManageController.class;
		IgnoreInterceptor C = A.getAnnotation(IgnoreInterceptor.class);
		System.out.println(C);

	}

}
