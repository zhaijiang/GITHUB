/*
Navicat MySQL Data Transfer

Source Server         : pdms
Source Server Version : 50624
Source Host           : 10.3.2.209:3306
Source Database       : pdms

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2015-08-19 13:34:51
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `certification`
-- ----------------------------
DROP TABLE IF EXISTS `certification`;
CREATE TABLE `certification` (
  `did` int(10) unsigned NOT NULL COMMENT '医生id',
  `ctid` int(11) NOT NULL COMMENT '资质类型，参考ref_ctftype.ctid',
  `picpath` varchar(1024) NOT NULL DEFAULT '' COMMENT '图片路径',
  `pic4v` varchar(1024) NOT NULL COMMENT '用于审核的证件图片路径',
  `dsec` varchar(1024) NOT NULL COMMENT '图片描述',
  `checker` int(11) NOT NULL DEFAULT '0' COMMENT '审核人，对应sysoper.sid',
  `bshow` int(11) NOT NULL DEFAULT '0' COMMENT '是否展示给用户',
  `lct` datetime NOT NULL COMMENT '最后修改记录的时间',
  `status` int(11) NOT NULL COMMENT '审核状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of certification
-- ----------------------------
INSERT INTO `certification` VALUES ('1234567890', '1', 'doctor/1234567890/idCard_1.jpg', 'doctor/1/idCard_9.jpg', '身份证', '0', '0', '2015-07-31 11:40:39', '0'), ('1234567890', '2', 'doctor/1234567890/pqCertify_1.jpg', 'doctor/1234567890/pqCertify_1.jpg', '医师资格证', '0', '0', '2015-07-31 11:40:45', '2'), ('1234567890', '3', 'doctor/1234567890/ppCertify_1.jpg', 'doctor/1234567890/ppCertify_5.jpg', '医师执业证', '0', '0', '2015-07-31 11:40:50', '0'), ('1234567890', '4', 'doctor/1234567890/ptCertify_2.jpg', 'doctor/1234567890/ptCertify_2.jpg', '职称证书', '0', '0', '2015-07-31 11:40:56', '2'), ('1234567890', '5', 'doctor/1234567890/hpCertify_1.jpg', 'doctor/1234567890/hpCertify_1.jpg', '所服务医疗机构证明', '0', '0', '2015-07-31 11:41:01', '2'), ('1234567890', '6', 'doctor/1234567890/ibCertify_1.jpg', 'doctor/1234567890/ibCertify_1.jpg', '医疗事故险购买证明', '0', '0', '2015-07-31 11:41:06', '2');

-- ----------------------------
-- Table structure for `cityconfig`
-- ----------------------------
DROP TABLE IF EXISTS `cityconfig`;
CREATE TABLE `cityconfig` (
  `yunit` double NOT NULL COMMENT '某城市南北1公里距离对应的纬度跨度',
  `xunit` double NOT NULL COMMENT '某城市东西1公里距离对应的经度跨度',
  `lct` datetime NOT NULL COMMENT '最后修改记录的时间',
  `city` int(11) NOT NULL COMMENT '城市代码，与电话区号相同'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cityconfig
-- ----------------------------
INSERT INTO `cityconfig` VALUES ('1', '0', '0000-00-00 00:00:00', '0');

-- ----------------------------
-- Table structure for `ddmap`
-- ----------------------------
DROP TABLE IF EXISTS `ddmap`;
CREATE TABLE `ddmap` (
  `dpid` int(10) unsigned NOT NULL COMMENT '对应department.dpid',
  `did` int(10) unsigned NOT NULL COMMENT '对应doctor.did'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ddmap
-- ----------------------------
INSERT INTO `ddmap` VALUES ('3', '2'), ('1', '1'), ('3', '1234567924'), ('1', '1234567925'), ('1', '1234567890');

-- ----------------------------
-- Table structure for `doctor`
-- ----------------------------
DROP TABLE IF EXISTS `doctor`;
CREATE TABLE `doctor` (
  `did` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '医生唯一id，自增字段，唯一标识一个医生',
  `phone` varchar(16) NOT NULL COMMENT '医生手机号',
  `pwd` varchar(32) NOT NULL COMMENT '医生密码，加密存储',
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '医生姓名',
  `score` int(11) NOT NULL DEFAULT '0' COMMENT '医生积分',
  `born` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '医生出生年月日',
  `sex` int(11) NOT NULL DEFAULT '2' COMMENT '医生性别，0：女，1：男，2：未知',
  `photo` varchar(1024) NOT NULL DEFAULT '' COMMENT '医生照片路径',
  `addr` varchar(1024) NOT NULL DEFAULT '' COMMENT '医生坐诊位置描述',
  `x` double NOT NULL DEFAULT '0' COMMENT '医生坐诊位置精度',
  `y` double NOT NULL DEFAULT '0' COMMENT '医生坐诊位置纬度',
  `level` int(11) NOT NULL DEFAULT '1' COMMENT '医生等级',
  `price` int(11) NOT NULL DEFAULT '0' COMMENT '医生价格',
  `espeed` float NOT NULL DEFAULT '0' COMMENT '医生上门速度平均分数',
  `eattitude` float NOT NULL DEFAULT '0' COMMENT '医生态度平均分数',
  `erecord` float NOT NULL DEFAULT '0' COMMENT '医生问诊记录平均分数',
  `eeffect` float NOT NULL DEFAULT '0' COMMENT '医生疗效平均分数',
  `esupport` float NOT NULL DEFAULT '0' COMMENT '医生后续支持力度平均分数',
  `intro` varchar(1024) NOT NULL DEFAULT '' COMMENT '医生自我介绍',
  `times` int(11) NOT NULL DEFAULT '0' COMMENT '医生已出诊次数',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '医生状态。0：待审核，1：闲，2： 忙',
  `token` varchar(128) NOT NULL DEFAULT '' COMMENT '医生登录后生成的鉴权串，保证互斥登录',
  `remark` varchar(1024) NOT NULL DEFAULT '' COMMENT '医生信息备注字段',
  `lastlogintime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '医生最后登录时间',
  `lct` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最后修改记录的时间',
  `regtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '医生注册时间',
  `account` varchar(1024) NOT NULL DEFAULT '' COMMENT '收款账户，格式：{“alipay”:”zhangsan@163.com”}',
  `idno` varchar(32) NOT NULL DEFAULT '' COMMENT '身份证号',
  `insend` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '保单结束生效日期',
  `insbegin` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '保单开始生效日期',
  `org` int(11) NOT NULL DEFAULT '0' COMMENT '医生所服务的机构，取值参考org_ref表',
  `ctftype` int(11) NOT NULL DEFAULT '0' COMMENT '医师资格类型，取值参考enum_ref表相关数据',
  `ctflvl` int(11) NOT NULL DEFAULT '0' COMMENT '医师资格等级，取值参考enum_ref表相关数据',
  `svcrange` int(11) NOT NULL DEFAULT '0' COMMENT '医生上门服务支持的距离范围。此值界面上设为选项，让医生选择分区精度距离的整数倍。',
  `ptlvl` int(11) NOT NULL DEFAULT '0' COMMENT '职称等级,0表示无职称',
  PRIMARY KEY (`did`)
) ENGINE=InnoDB AUTO_INCREMENT=1234567928 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of doctor
-- ----------------------------
INSERT INTO `doctor` VALUES ('1', '13401045312', '123', 'jack', '0', '2015-05-23 00:00:00', '2', '/doctorPic/1234567890/HeadPic-1.jpg', '四川九州', '104.11228', '30.6408331', '1', '100', '3', '5', '5', '8', '5', '1111', '8', '4', '67d9e9f606c4dc98d200844751b0a5f0', '', '2015-07-31 10:06:44', '2015-07-31 10:06:44', '0000-00-00 00:00:00', 'jackalipay@126.com', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1', '2', '1', '6', '0'), ('2', '12345678912', '456', 'jane', '0', '2015-06-01 14:43:51', '0', '2', '华西一个大学研究院', '104.059963', '30.618551', '1', '500', '2', '3', '4', '5', '6', '天下第一神医', '500', '1', '1', '', '2015-06-01 14:57:45', '2015-06-01 14:57:41', '0000-00-00 00:00:00', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0', '0', '5', '0'), ('3', '18302859323', '123', 'zhou', '0', '0000-00-00 00:00:00', '2', '', 'dsds', '104', '30', '1', '50', '3', '1', '1', '1', '2', 'sdsadas', '0', '0', '', ' 即将开始审核，请你耐心等待，请留意400-001-8855的来电。', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0', '0', '5', '0'), ('4', '13699203360', '123', '', '0', '0000-00-00 00:00:00', '2', '', '', '0', '0', '1', '0', '0', '0', '0', '0', '0', '', '0', '0', '', ' 即将开始审核，请你耐心等待，请留意400-001-8855的来电。', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0', '0', '5', '0'), ('1234567890', '18683841949', '123456', '李时珍', '0', '1518-11-12 09:12:25', '1', 'doctor/1234567890/headpic_14.jpg', '四川省成都市青羊区蜀都大道+天府软件园', '104.072222', '30.663466', '12', '80', '4.5', '4.2', '4.8', '4.9', '4.6', '我是中国人', '147', '4', '07bc6e5fdfa792107c634b5fe30ac68a', '您的医师执业证与您本人名称不符', '2015-08-18 18:39:55', '2015-08-18 18:39:55', '2014-05-01 10:31:51', 'lishizhen@126.com', '510722123456789955', '2016-01-01 16:12:29', '2015-01-01 16:12:57', '1', '1', '1', '8', '1'), ('1234567904', '15302556363', '123', '', '0', '0000-00-00 00:00:00', '2', '', '', '0', '0', '1', '0', '0', '0', '0', '0', '0', '', '0', '0', '', '即将开始审核，请耐心等待,请留意400-001-8855的来电', '2015-08-04 13:48:01', '2015-08-04 13:48:01', '0000-00-00 00:00:00', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0', '0', '5', '0'), ('1234567905', '15202120212', '123', '', '0', '0000-00-00 00:00:00', '2', '', '', '0', '0', '1', '0', '0', '0', '0', '0', '0', '', '0', '0', '', '即将开始审核，请耐心等待,请留意400-001-8855的来电', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0', '0', '5', '0'), ('1234567910', '15202230223', '123', '', '0', '0000-00-00 00:00:00', '2', '', '', '0', '0', '1', '0', '0', '0', '0', '0', '0', '', '0', '0', '', '即将开始审核，请耐心等待,请留意400-001-8855的来电', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0', '0', '5', '0'), ('1234567923', '13658083123', '123', '', '0', '0000-00-00 00:00:00', '2', '', '', '0', '0', '1', '0', '0', '0', '0', '0', '0', '', '0', '0', 'c1a737f547ecef6cd8d7764bddaebb3f', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0', '0', '0', '0'), ('1234567925', '18782104959', '123456789', '扁鹊', '0', '0000-00-00 00:00:00', '1', '', '四川省成都市高新区天府大道中段+天府软件园A2栋306室', '104.076615', '30.55595', '1', '85', '0', '0', '0', '0', '0', '创造中医全面的诊断技术，包括望诊、闻诊、问诊和切诊，精于内、外、妇、儿、五官等科，应用砭刺、针灸、按摩、汤液、热熨等法治疗疾病，被尊为医祖。', '0', '4', 'a42fdb37e7a6c8f4f600e00419a5b357', '', '2015-07-15 15:51:52', '2015-07-15 15:51:52', '2015-07-15 12:55:10', 'bianque123@126.com', '120152940706250002', '2017-01-01 14:05:03', '2014-12-01 14:04:50', '1', '2', '1', '20', '0');

-- ----------------------------
-- Table structure for `enum_ref`
-- ----------------------------
DROP TABLE IF EXISTS `enum_ref`;
CREATE TABLE `enum_ref` (
  `enum_ref` varchar(64) NOT NULL COMMENT '变量名',
  `er_value` int(11) NOT NULL COMMENT '变量取值',
  `er_desc` varchar(255) NOT NULL COMMENT '变量取值的文字描述'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of enum_ref
-- ----------------------------
INSERT INTO `enum_ref` VALUES ('doctor_status', '3', '审核通过，未完善出诊信息'), ('doctor_status', '2', '审核未通过'), ('doctor_status', '1', '已提交审核信息，待审核'), ('doctor_status', '4', '可出诊'), ('order_status', '10', '挂起'), ('order_status', '1', '已支付'), ('order_status', '2', '医生已出发'), ('order_status', '3', '诊断中'), ('order_status', '4', '待确认支付'), ('order_status', '5', '待用户第一次评价'), ('order_status', '6', '待医生第一次评价'), ('order_status', '7', '待用户第二次评价'), ('order_status', '8', '待医生第二次评价'), ('order_status', '9', '待确认取消'), ('order_status', '0', '新建'), ('order_status', '11', '结束'), ('pqcertify_level', '1', '执业医师'), ('pqcertify_level', '2', '助理执业医师'), ('pqcertify_type', '1', '临床'), ('pqcertify_type', '2', '中医'), ('pqcertify_type', '3', '蒙医'), ('pqcertify_type', '4', '藏医'), ('pqcertify_type', '5', '维医'), ('pqcertify_type', '6', '中西医结合'), ('pqcertify_type', '7', '口腔'), ('pqcertify_type', '8', '公共卫生'), ('ptcertify_level', '1', '主任医师'), ('ptcertify_level', '2', '副主任医师'), ('ptcertify_level', '3', '主治医师'), ('ptcertify_level', '4', '住院医师'), ('doctor_status', '0', '已注册，未提交审核信息'), ('login_type', '0', '密码登陆'), ('login_type', '1', '短信验证码登陆'), ('doctor_status', '5', '等待出诊订单'), ('doctor_status', '6', '出诊中'), ('certifycheck_status', '0', '资质证明待审核'), ('certifycheck_status', '1', '资质证明审核未通过'), ('certifycheck_status', '2', '资质证明审核通过'), ('order_evaluate', '0', '差评'), ('order_evaluate', '1', '中评'), ('order_evaluate', '2', '好评');

-- ----------------------------
-- Table structure for `globals`
-- ----------------------------
DROP TABLE IF EXISTS `globals`;
CREATE TABLE `globals` (
  `gv_name` varchar(64) NOT NULL COMMENT '变量名称',
  `gv_value` varchar(256) NOT NULL COMMENT '变量取值',
  `gv_desc` varchar(64) NOT NULL COMMENT '变量描述',
  `lct` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最后修改记录的时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of globals
-- ----------------------------
INSERT INTO `globals` VALUES ('eval_score', '1', '好、差评所影响的打分分值', '2015-06-10 09:41:45'), ('pay_timeout', '30', '新建订单支付超时时间，单位为分钟', '0000-00-00 00:00:00'), ('cpay_timeout', '30', '确认支付超时时间，单位为分钟', '0000-00-00 00:00:00'), ('eval_timeout', '4320', '评价超时时间，单位为分钟', '0000-00-00 00:00:00'), ('svc_num', '13401045312', '客服电话号码', '2015-06-10 09:41:52'), ('price_limit', '120', '医生出诊最高费用为120元', '0000-00-00 00:00:00'), ('doctor_cut', '10', '平台从医生收入提成的百分比', '0000-00-00 00:00:00'), ('doctor_subsidy', '10', '平台对医生的补贴比例', '0000-00-00 00:00:00'), ('platform_svcprice', '50', '用户每单平台收取的服务费，单位元', '0000-00-00 00:00:00'), ('unlimited_level', '15', '医生获得自主定价的等级', '2015-07-11 11:14:20');

-- ----------------------------
-- Table structure for `msg`
-- ----------------------------
DROP TABLE IF EXISTS `msg`;
CREATE TABLE `msg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '表ID',
  `sender` varchar(64) NOT NULL COMMENT '发送者ID，如是系统发送消息的话，填写''system''',
  `recver` varchar(64) NOT NULL COMMENT '接收者ID',
  `sendtime` datetime NOT NULL COMMENT '发送时间',
  `recvtime` datetime NOT NULL COMMENT '接收时间！未接收填写0',
  `status` int(11) NOT NULL COMMENT '消息状态，0：新消息，1：已读消息',
  `content` varchar(1024) NOT NULL COMMENT '消息内容',
  `lct` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最后修改记录的时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of msg
-- ----------------------------
INSERT INTO `msg` VALUES ('1', '1', '1', '2015-06-01 15:03:39', '2015-06-01 15:03:41', '1', '阿达瓦大', '0000-00-00 00:00:00'), ('2', '1', '1', '2015-01-01 12:00:00', '2015-01-01 12:00:00', '0', '1', '2015-01-01 12:00:00'), ('3', '1', '2', '2015-06-01 15:03:39', '0000-00-00 00:00:00', '0', 'asdasds', '2015-07-15 15:21:17'), ('4', '1', '2', '2015-06-01 00:00:00', '0000-00-00 00:00:00', '0', 'asdasds', '2015-07-15 15:21:37');

-- ----------------------------
-- Table structure for `oplog`
-- ----------------------------
DROP TABLE IF EXISTS `oplog`;
CREATE TABLE `oplog` (
  `ol_date` datetime NOT NULL COMMENT '操作发生时间（后台用户手动获取添加）',
  `ol_oper` varchar(64) NOT NULL COMMENT '操作人ID，对应：sysoper.sid',
  `ol_type` int(11) NOT NULL COMMENT '操作类型：取值待定',
  `ol_remark` varchar(1024) NOT NULL COMMENT '备注，无备注为空',
  PRIMARY KEY (`ol_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of oplog
-- ----------------------------

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `payid` varchar(128) NOT NULL DEFAULT '0' COMMENT '订单的支付订单号，根据此值查询支付是否到账',
  `oid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `uid` int(10) unsigned NOT NULL COMMENT '用户id',
  `did` int(10) unsigned NOT NULL COMMENT '医生id',
  `dlvl` int(11) NOT NULL COMMENT '医生当时级别',
  `status` int(11) NOT NULL DEFAULT '0',
  `record_pic` varchar(4096) NOT NULL DEFAULT '' COMMENT '图片路径',
  `record` varchar(4096) NOT NULL DEFAULT '' COMMENT '问诊记录，可以是直接输入文字，也可以是图片路径',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '订单创建时间',
  `evaltime1` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '第一次评价时间',
  `reevaltime1` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '一次回复时间',
  `evaltime2` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '第二次评价时间',
  `reevaltime2` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '第二次回复时间',
  `eval1` varchar(1024) NOT NULL DEFAULT '' COMMENT '第一次评价内容',
  `reeval1` varchar(1024) NOT NULL DEFAULT '' COMMENT '第一次回复内容',
  `eval2` varchar(1024) NOT NULL DEFAULT '' COMMENT '第二次评价内容',
  `reeval2` varchar(1024) NOT NULL DEFAULT '' COMMENT '第二次回复内容',
  `espeed` int(11) NOT NULL DEFAULT '0' COMMENT '医生上门速度分数，取值1-5',
  `eattitude` int(11) NOT NULL DEFAULT '0' COMMENT '医生态度分数，取值1-5',
  `erecord` int(11) NOT NULL DEFAULT '0' COMMENT '医生问诊记录分数，取值1-5',
  `eeffect` int(11) NOT NULL DEFAULT '0' COMMENT '医生疗效分数，取值1-5',
  `esupport` int(11) NOT NULL DEFAULT '0' COMMENT '医生后续支持力度分数，取值1-5',
  `evaluate` int(11) NOT NULL DEFAULT '0' COMMENT '最终评价。0：差评，1：中评，2：好评',
  `uaid` int(11) NOT NULL COMMENT '上门位置',
  `distance` float NOT NULL COMMENT '距离',
  `price` int(11) NOT NULL COMMENT '诊费',
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB AUTO_INCREMENT=1234500001 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('2015061021001001600236668312', '1', '1', '1234567890', '12', '11', '', '疾病既往史：无。药物过敏史：无。病情描述：拉稀已经3天，每天平均拉8次，大便呈水状，畏寒，偶发低烧，四肢无力，无咳嗽症状。病情分析及诊断：脉搏虚弱，舌苔厚重，肺部听诊未听到杂音，且无咳嗽症状，初步诊断为食用不卫生食品导致的急性肠胃炎。病情处理：以药物治疗为主，治疗期间多喝开水，多卧躺休息，按时吃药，随时复诊。阿莫西林2盒，每日3次，每次3粒。蒙脱石散剂1盒，每日3次，每次一包。饮食以清淡为主，注意饮食卫生，忌吃油腻食物，忌吃牛奶、羊奶和大量的蔗糖，忌生吃大蒜。药物购买方式：自购。', '2015-07-01 18:27:56', '2015-07-01 21:28:18', '2015-07-02 18:29:07', '2015-07-03 12:30:01', '2015-07-04 18:30:26', '大夫态度非常好，非常耐心，记录写得也很详细。而且10分钟就上门了。赞一个。', '多谢，后续有问题可以打电话联系', '吃了7副药，感觉好多了。', '感谢您的支持', '5', '5', '5', '5', '5', '2', '1', '1.5', '65'), ('2015061021001001600236668522', '2', '1', '1234567890', '12', '11', '', '疾病既往史：无。药物过敏史：无。病情描述：拉稀已经3天，每天平均拉8次，大便呈水状，畏寒，偶发低烧，四肢无力，无咳嗽症状。病情分析及诊断：脉搏虚弱，舌苔厚重，肺部听诊未听到杂音，且无咳嗽症状，初步诊断为食用不卫生食品导致的急性肠胃炎。病情处理：以药物治疗为主，治疗期间多喝开水，多卧躺休息，按时吃药，随时复诊。阿莫西林2盒，每日3次，每次3粒。蒙脱石散剂1盒，每日3次，每次一包。饮食以清淡为主，注意饮食卫生，忌吃油腻食物，忌吃牛奶、羊奶和大量的蔗糖，忌生吃大蒜。药物购买方式：从医生处购买。', '2015-07-01 20:27:56', '2015-07-01 22:28:18', '2015-07-02 18:36:07', '2015-07-03 12:25:01', '2015-07-04 18:40:26', '医生上门比较快，服务态度也很好，体验很好。', '多谢，注意按时服药，有问题随时电话联系', '吃了三次药，基本上就好了，医术不错！', '感谢您的支持，我将竭诚为您服务！', '5', '5', '5', '5', '5', '2', '2', '2', '88'), ('2015061021001001600256667537', '3', '3', '1234567890', '12', '8', '', '疾病既往史：无。药物过敏史：无。病情描述：拉稀已经3天，每天平均拉8次，大便呈水状，畏寒，偶发低烧，四肢无力，无咳嗽症状。病情分析及诊断：脉搏虚弱，舌苔厚重，肺部听诊未听到杂音，且无咳嗽症状，初步诊断为食用不卫生食品导致的急性肠胃炎。病情处理：以药物治疗为主，治疗期间多喝开水，多卧躺休息，按时吃药，随时复诊。阿莫西林2盒，每日3次，每次3粒。蒙脱石散剂1盒，每日3次，每次一包。饮食以清淡为主，注意饮食卫生，忌吃油腻食物，忌吃牛奶、羊奶和大量的蔗糖，忌生吃大蒜。药物购买方式：自购。', '2015-07-30 18:27:56', '2015-08-01 20:28:18', '2015-08-01 21:36:07', '2015-08-03 21:36:07', '0000-00-00 00:00:00', '上门速度比较慢，等了15分钟，服务态度倒还不错', '实在抱歉，今天耽误您的时间，下次一定改进', '已经完全好，疗效不错！', '感谢您的支持，我将竭诚为您服务！', '3', '5', '5', '5', '5', '2', '3', '3', '75'), ('2015061021001001600126667554', '4', '4', '1234567890', '12', '7', '', '疾病既往史：无。药物过敏史：无。病情描述：拉稀已经3天，每天平均拉8次，大便呈水状，畏寒，偶发低烧，四肢无力，无咳嗽症状。病情分析及诊断：脉搏虚弱，舌苔厚重，肺部听诊未听到杂音，且无咳嗽症状，初步诊断为食用不卫生食品导致的急性肠胃炎。病情处理：以药物治疗为主，治疗期间多喝开水，多卧躺休息，按时吃药，随时复诊。阿莫西林2盒，每日3次，每次3粒。蒙脱石散剂1盒，每日3次，每次一包。饮食以清淡为主，注意饮食卫生，忌吃油腻食物，忌吃牛奶、羊奶和大量的蔗糖，忌生吃大蒜。药物购买方式：从医生处购买。', '2015-07-30 19:21:56', '2015-08-02 20:28:18', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '上门速度慢，服务态度也不行，敷衍了事', '由于出诊时堵车，耽误您的时间了，感谢您的支持和理解。', '', '', '2', '5', '4', '0', '0', '0', '4', '2.5', '60'), ('2015061021001001230126637528', '5', '5', '1234567890', '12', '4', 'doctor/1234567890/orders/5.jpg', '疾病既往史：无；药物过敏史：无；病情描述：拉稀已经3天，每天平均拉8次，大便呈水状，畏寒，偶发低烧，四肢无力，无咳嗽症状。；病情分析及诊断：脉搏虚弱，舌苔厚重，肺部听诊未听到杂音，且无咳嗽症状，初步诊断为食用不卫生食品导致的急性肠胃炎。；病情处理：以药物治疗为主，治疗期间多喝开水，多卧躺休息，按时吃药，随时复诊。阿莫西林2盒，每日3次，每次3粒。蒙脱石散剂1盒，每日3次，每次一包。饮食以清淡为主，注意饮食卫生，忌吃油腻食物，忌吃牛奶、羊奶和大量的蔗糖，忌生吃大蒜。；药物购买方式：从医生处购买。', '2015-08-02 14:21:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '0', '0', '0', '0', '0', '0', '5', '3.3', '72'), ('2015061021001001230126257543', '6', '6', '1234567890', '12', '1', '', '', '2015-08-04 14:21:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '0', '0', '0', '0', '0', '0', '6', '3.1', '56'), ('2015061021001001230126257539', '7', '7', '1234567890', '12', '9', '', '', '2015-08-04 18:21:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '0', '0', '0', '0', '0', '0', '7', '9.8', '42'), ('2015061021001001230126257551', '8', '8', '1234567890', '12', '10', '', '', '2015-08-04 18:25:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '0', '0', '0', '0', '0', '0', '8', '2.8', '58');

-- ----------------------------
-- Table structure for `org_ref`
-- ----------------------------
DROP TABLE IF EXISTS `org_ref`;
CREATE TABLE `org_ref` (
  `orgid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '机构id',
  `name` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '机构名称',
  `addr` varchar(1024) CHARACTER SET utf8 NOT NULL COMMENT '机构地址',
  `x` double NOT NULL COMMENT '机构位置经度',
  `y` double NOT NULL COMMENT '机构位置纬度',
  `desc` varchar(4096) CHARACTER SET utf8 NOT NULL COMMENT '机构简介、描述',
  `lct` datetime NOT NULL COMMENT '最够修改记录的时间',
  PRIMARY KEY (`orgid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of org_ref
-- ----------------------------
INSERT INTO `org_ref` VALUES ('1', '四川省人民医院', '四川省成都市青羊区一环路西二段32号', '104.046319', '30.669568', '四川省人民医院建于1941年，前身四川省公立医院是中央大学医学院附属医院。2002年，与四川省医学科学院合并，医院现已成为四川省医学科学研究及临床技术的指导中心。是国家三级甲等医院，国际紧急救援中心网络医院，卫生部数字化试点示范医院，国家和四川省的全科医师、专科医师培训基地，国家药物临床试验机构，省级博士后科研工作站，高等医学院校临床教学基地，四川省专科护士培训基地。也是中国西部规模最大的干部保健基地。', '2015-07-14 16:00:13');

-- ----------------------------
-- Table structure for `otrace`
-- ----------------------------
DROP TABLE IF EXISTS `otrace`;
CREATE TABLE `otrace` (
  `oid` int(11) NOT NULL COMMENT '订单ID',
  `time` datetime NOT NULL COMMENT '订单状态改变时间',
  `status` int(11) NOT NULL COMMENT '订单状态，取值同order.status',
  `remark` varchar(256) NOT NULL COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of otrace
-- ----------------------------
INSERT INTO `otrace` VALUES ('2', '2015-07-04 18:40:26', '11', '订单完成'), ('4', '2015-07-30 19:25:56', '1', '请耐心等待医生确认订单'), ('2', '2015-07-01 20:37:56', '2', '医生已开始出发，预计30分钟内到达，请耐心等待或主动联系医生'), ('2', '2015-07-01 21:05:56', '3', '医生已经到达，开始进行问诊服务'), ('2', '2015-07-01 21:45:56', '4', '问诊服务结束，等待用户确认支付'), ('2', '2015-07-01 21:55:56', '5', '用户已确认支付，等待用户对问诊服务进行评价'), ('2', '2015-07-01 22:28:18', '6', '用户已对问诊服务作出评价，等待医生回复'), ('2', '2015-07-02 18:36:07', '7', '医生已回复用户评价，等待用户对疗效和跟踪服务进行评价'), ('2', '2015-07-03 12:25:01', '8', '用户已对疗效和跟踪服务作出评价，等待医生回复'), ('5', '2015-08-02 14:30:56', '2', '医生已开始出发，预计30分钟内到达，请耐心等待或主动联系医生'), ('3', '2015-07-30 18:30:56', '1', '请耐心等待医生确认订单'), ('3', '2015-07-30 18:37:56', '2', '医生已开始出发，预计30分钟内到达，请耐心等待或主动联系医生'), ('3', '2015-07-30 19:00:56', '3', '医生已经到达，开始进行问诊服务'), ('3', '2015-07-30 19:40:56', '4', '问诊服务结束，等待用户确认支付'), ('4', '2015-07-30 19:55:56', '3', '医生已经到达，开始进行问诊服务'), ('3', '2015-08-01 20:28:18', '6', '用户已对问诊服务作出评价，等待医生回复'), ('3', '2015-08-01 21:36:07', '7', '医生已回复用户评价，等待用户对疗效和跟踪服务进行评价'), ('3', '2015-08-03 21:36:07', '8', '用户已对疗效和跟踪服务作出评价，等待医生回复'), ('1', '2015-07-04 18:30:26', '11', '订单完成'), ('4', '2015-07-30 19:30:56', '2', '医生已开始出发，预计30分钟内到达，请耐心等待或主动联系医生'), ('5', '2015-08-02 15:02:56', '3', '医生已经到达，开始进行问诊服务'), ('4', '2015-07-30 20:50:56', '4', '问诊服务结束，等待用户确认支付'), ('4', '2015-07-30 20:58:56', '5', '用户已确认支付，等待用户对问诊服务进行评价'), ('4', '2015-08-02 20:28:18', '6', '用户已对问诊服务作出评价，等待医生回复'), ('1', '2015-07-02 18:29:07', '7', '医生已回复用户评价，等待用户对疗效和跟踪服务进行评价'), ('1', '2015-07-03 12:30:01', '8', '用户已对疗效和跟踪服务作出评价，等待医生回复'), ('3', '2015-07-30 18:27:56', '0', '订单编号：3，请在提交订单后30分钟内完成支付'), ('2', '2015-07-01 20:27:56', '0', '订单编号：2，请在提交订单后30分钟内完成支付'), ('2', '2015-07-01 20:30:56', '1', '请耐心等待医生确认订单'), ('1', '2015-07-01 20:20:56', '5', '用户已确认支付，等待用户对问诊服务进行评价'), ('1', '2015-07-01 20:15:56', '4', '问诊服务结束，等待用户确认支付'), ('1', '2015-07-01 18:32:56', '2', '医生已开始出发，预计30分钟内到达，请耐心等待或主动联系医生'), ('1', '2015-07-01 21:28:18', '6', '用户已对问诊服务作出评价，等待医生回复'), ('5', '2015-08-02 14:25:56', '1', '请耐心等待医生确认订单'), ('5', '2015-08-02 14:21:56', '0', '订单编号：5，请在提交订单后30分钟内完成支付'), ('1', '2015-07-01 19:10:56', '3', '医生已经到达，开始进行问诊服务'), ('1', '2015-07-01 18:30:56', '1', '请耐心等待医生确认订单'), ('1', '2015-07-01 18:27:56', '0', '订单编号：1，请在提交订单后30分钟内完成支付'), ('4', '2015-07-30 19:21:56', '0', '订单编号：4，请在提交订单后30分钟内完成支付'), ('3', '2015-07-30 19:50:56', '5', '用户已确认支付，等待用户对问诊服务进行评价'), ('6', '2015-08-04 14:25:56', '1', '请耐心等待医生确认订单'), ('6', '2015-08-04 14:21:56', '0', '订单编号：6，请在提交订单后30分钟内完成支付'), ('7', '2015-08-04 18:21:56', '0', '订单编号：7，请在提交订单后30分钟内完成支付'), ('7', '2015-08-04 18:25:56', '1', '请耐心等待医生确认订单'), ('7', '2015-08-04 18:35:56', '9', '用户已取消订单，取消理由：病情严重，已转医院治疗，等待医生进行确认'), ('8', '2015-08-04 19:05:56', '3', '医生已经到达，开始进行问诊服务'), ('8', '2015-08-04 18:30:56', '1', '请耐心等待医生确认订单'), ('8', '2015-08-04 18:35:56', '2', '医生已开始出发，预计30分钟内到达，请耐心等待或主动联系医生'), ('8', '2015-08-04 19:35:56', '10', '医生已挂起订单，订单挂起原因：血常规化验，订单恢复预计时间：12小时内，请用户耐心等待或联系医生恢复订单'), ('8', '2015-08-04 18:25:56', '0', '订单编号：8，请在提交订单后30分钟内完成支付'), ('5', '2015-08-13 09:36:49', '10', '医生已挂起订单，订单挂起原因：病情比较严重，需要血常规化验，订单恢复预计时间：8小时内请用户耐心等待或联系医生恢复订单'), ('5', '2015-08-13 10:14:37', '3', '医生已经恢复订单，开始进行问诊服务'), ('5', '2015-08-13 16:49:18', '4', '问诊服务结束，等待用户确认支付'), ('5', '2015-08-13 16:53:54', '4', '问诊服务结束，等待用户确认支付');

-- ----------------------------
-- Table structure for `ref_ctftype`
-- ----------------------------
DROP TABLE IF EXISTS `ref_ctftype`;
CREATE TABLE `ref_ctftype` (
  `ctid` int(10) unsigned NOT NULL COMMENT '资质类型id，由程序分配，不可重复',
  `name` varchar(64) NOT NULL COMMENT '资质名称',
  `desc` varchar(1024) NOT NULL COMMENT '资质描述'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ref_ctftype
-- ----------------------------
INSERT INTO `ref_ctftype` VALUES ('1', '身份证', 'idCard'), ('2', '医师资格证', 'pqCertify'), ('3', '医师执业证', 'ppCertify'), ('4', '职称证书', 'ptCertify'), ('5', '所服务医疗机构证明', 'hpCertify'), ('6', '医疗事故险购买证明', '医生所购买的医疗事故险证明，一般为医疗事故险保单');

-- ----------------------------
-- Table structure for `ref_ctftype_copy`
-- ----------------------------
DROP TABLE IF EXISTS `ref_ctftype_copy`;
CREATE TABLE `ref_ctftype_copy` (
  `ctid` int(10) unsigned NOT NULL COMMENT '资质类型id，由程序分配，不可重复',
  `name` varchar(64) NOT NULL COMMENT '资质名称',
  `desc` varchar(1024) NOT NULL COMMENT '资质描述'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ref_ctftype_copy
-- ----------------------------
INSERT INTO `ref_ctftype_copy` VALUES ('1', '身份证', '中华人们共和国居民身份证'), ('2', '医师资格证', '医生通过国家医师资格考试获得的医师资格证书'), ('3', '医师执业证', '医生通过当地卫生部门获得的医师执业证书'), ('4', '职称证书', '医生当前获得最高职称的证书'), ('5', '所服务医疗机构证明', '医生所服务的医疗机构证明，可为医生所服务医疗机构执业许可证，也可为医院聘书或劳动合同等'), ('6', '医疗事故险购买证明', '医生所购买的医疗事故险证明，一般为医疗事故险保单');

-- ----------------------------
-- Table structure for `ref_department`
-- ----------------------------
DROP TABLE IF EXISTS `ref_department`;
CREATE TABLE `ref_department` (
  `dpid` int(10) unsigned NOT NULL COMMENT '科室id',
  `name` varchar(64) NOT NULL COMMENT '科室名称',
  PRIMARY KEY (`dpid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ref_department
-- ----------------------------
INSERT INTO `ref_department` VALUES ('1', '全科'), ('2', '呼吸科'), ('3', '消化科'), ('4', '感染科'), ('5', '内科'), ('6', '中医科'), ('7', '男科'), ('8', '骨伤科'), ('9', '外科'), ('10', '儿科'), ('11', '妇产科'), ('12', '眼科'), ('13', '精神心理科'), ('14', '皮肤性病科'), ('15', '耳鼻咽喉科'), ('16', '口腔颌面科'), ('17', '肿瘤及防治科'), ('18', '整形美容科');

-- ----------------------------
-- Table structure for `syslog`
-- ----------------------------
DROP TABLE IF EXISTS `syslog`;
CREATE TABLE `syslog` (
  `sl_date` datetime NOT NULL COMMENT '操作发生时间',
  `sl_type` int(11) NOT NULL COMMENT '操作类型！取值待定',
  `sl_remark` varchar(1024) NOT NULL COMMENT '备注，没有备注为空字符串',
  PRIMARY KEY (`sl_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of syslog
-- ----------------------------

-- ----------------------------
-- Table structure for `sysoper`
-- ----------------------------
DROP TABLE IF EXISTS `sysoper`;
CREATE TABLE `sysoper` (
  `sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `name` varchar(32) NOT NULL COMMENT '管理员姓名',
  `phone` varchar(16) NOT NULL DEFAULT '' COMMENT '管理员电话',
  `pwd` varchar(32) NOT NULL DEFAULT '' COMMENT '管理员登陆密码',
  `born` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '管理员出生日期',
  `sex` int(11) NOT NULL DEFAULT '2' COMMENT '性别',
  `idcard` varchar(32) NOT NULL DEFAULT '' COMMENT '身份证号码',
  `token` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sysoper
-- ----------------------------
INSERT INTO `sysoper` VALUES ('1', 'asd', '', 'asd', '0000-00-00 00:00:00', '2', '', ''), ('2', 'aaaa', '123456', 'aaaa', '2015-05-26 16:42:21', '0', 'bbbb', 'ccc');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(16) NOT NULL,
  `pwd` varchar(32) NOT NULL DEFAULT '',
  `name` varchar(20) NOT NULL DEFAULT '',
  `sex` int(11) NOT NULL DEFAULT '2',
  `born` date NOT NULL,
  `idcard` varchar(32) NOT NULL DEFAULT '',
  `uaid` int(11) NOT NULL DEFAULT '0',
  `token` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '15210649737', '123456', '黄南', '1', '1984-05-15', '430422198405159216', '1', ''), ('2', '15510385289', '123456', '李  玲', '0', '1986-07-15', '430422198607159542', '2', ''), ('3', '13810837437', '123456', '陈国良', '1', '1985-03-14', '430422198503149542', '3', ''), ('4', '18601193485', '123456', '蒋艳山', '1', '1982-03-25', '430422198203259658', '4', ''), ('5', '15001395075', '123456', '胡超凡', '1', '1984-10-13', '430422198410137563', '5', ''), ('6', '13031091691', '123456', '万人玮', '1', '1987-09-16', '430422198709164326', '6', ''), ('7', '15373292880', '123456', '陈文德', '1', '1983-02-09', '430422198302095214', '7', ''), ('8', '13910112016', '123456', '梁化骥', '1', '1979-08-23', '430422197908238796', '8', '');

-- ----------------------------
-- Table structure for `useraddr`
-- ----------------------------
DROP TABLE IF EXISTS `useraddr`;
CREATE TABLE `useraddr` (
  `uaid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '地址唯一id，自增字段，从1开始',
  `uid` int(11) NOT NULL,
  `index` int(11) NOT NULL COMMENT '此地址在同一用户的地址中的排序，从1开始取值',
  `range` varchar(1024) NOT NULL COMMENT '从地图选择位置，所得到的街道、小区、大厦名字。',
  `addr` varchar(1024) NOT NULL COMMENT '详细地址，精确的门牌号等，range和addr只用于查看和选择，不用于程序判断',
  `x` double NOT NULL COMMENT '地址的经度',
  `y` double NOT NULL COMMENT '地址的纬度',
  PRIMARY KEY (`uaid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of useraddr
-- ----------------------------
INSERT INTO `useraddr` VALUES ('1', '1', '1', '成都市高新区天府大道中段', '天府软件园A2栋306', '104.076624', '30.556028'), ('2', '2', '1', '成都市高新区天府大道中段', '成达大厦20楼305室', '104.076696', '30.558298'), ('3', '3', '1', '成都市高新区益州大道', '中海城南一号4栋2单元304室', '104.06372', '30.586037'), ('4', '4', '1', '成都市高新区天华路', '英郡20栋3单元201', '104.078919', '30.554446'), ('5', '5', '1', '成都市天府新区麓山大道310号', '洛森堡20栋1单元501', '104.087435', '30.490702'), ('6', '6', '1', '成都市天府新区麓山大道', '恒大名都5栋2单元1802', '104.086644', '30.492787'), ('7', '7', '1', '成都市天府新区华阳南湖路', '南湖国际社区6栋1单元504', '104.047658', '30.50318'), ('8', '8', '1', '成都市天府大道南延线', '心怡紫晶城18栋3单元805', '104.073673', '30.49148');

-- ----------------------------
-- Table structure for `usersave`
-- ----------------------------
DROP TABLE IF EXISTS `usersave`;
CREATE TABLE `usersave` (
  `uid` int(10) unsigned NOT NULL COMMENT '用户id',
  `did` int(10) unsigned NOT NULL COMMENT '医生id',
  PRIMARY KEY (`uid`,`did`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usersave
-- ----------------------------
INSERT INTO `usersave` VALUES ('1', '1'), ('2', '2');

-- ----------------------------
-- Table structure for `vcode`
-- ----------------------------
DROP TABLE IF EXISTS `vcode`;
CREATE TABLE `vcode` (
  `uid` int(11) NOT NULL COMMENT '逻辑对应用户的Uid,但不设外键关系',
  `code` int(11) NOT NULL COMMENT '生成的验证码',
  `ctime` datetime NOT NULL COMMENT '验证码生成时间，用于计算有效期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vcode
-- ----------------------------
INSERT INTO `vcode` VALUES ('1', '123', '2015-06-01 15:01:28'), ('2', '345', '2015-06-01 15:01:35');
