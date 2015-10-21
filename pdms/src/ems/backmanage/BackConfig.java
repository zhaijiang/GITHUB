package ems.backmanage;

public class BackConfig {
	/**
	 * ， 0：已注册，尚未提交审核信息；1：已提交审核信息，待审核；2：审核未通过；
	 * 3：审核通过，未完善出诊信息；4：可出诊；5：等待出诊订单；6：出诊中；7：已冻结
	 */
	/**
	 * 医生状态 已冻结
	 */
	public  static final int DOC_STATUS_FREEZE=7;
	/**
	 * 医生状态 审核通过 未完善出诊信息
	 */
	public  static final int DOC_STATUS_PASS_UNCOMPLETE=3;
	
	/**
	 * 医生状态 审核不通过
	 */
	public  static final int DOC_STATUS_UNPASS=2;
	/**
	 * 医生状态 正在审核 待审核
	 */
	public  static final int DOC_STATUS_PASSING=1;

}
