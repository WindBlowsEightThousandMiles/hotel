package com.hotel.exception;

public enum ExceptionType
{
	DONE(0,"成功"),

	ROOM_FIND_BY_ROOMNO_ERROR(100,"未找到该房间号对应的房间信息"),
	STANDARD_FIND_BY_STDNO_ERROR(110,"未找到该标准编号对应的客房标准"),

	ORDERROOM_FIND_BY_ROOMIDNO_ERROR(200,"未找到该序号对应的订单-房间信息"),

	ROOMID_FIND_BY_ROOMIDNO_ERROR(300,"未找到该序号对应的房间-身份证信息"),

	GARAGE_FIND_BY_ID_ERROR(400,"未通过车库编号找到对应车库"),
	GARAGE_FIND_BY_BRAND_ERROR(401,"未通过车牌找到对应车库"),

	GARAGE_HISTORY_FIND_BY_ID_ERROR(500,"未通过车库编号找到对应历史纪录"),
	GARAGE_HISTORY_FIND_BY_BRAND_ERROR(501,"未通过车牌找到对应历史纪录"),
	GARAGE_HISTORY_FIND_BY_DAY_ERROR(503,"未找到该日对应的车库历史"),
	GARAGE_HISTORY_FIND_BY_MONTH_ERROR(504,"未找到该月份对应的车库历史"),
	GARAGE_HISTORY_FIND_BY_YEAR_ERROR(505,"未找到该年份对应的订单历史"),

	ORDER_FIND_BY_ID_ERROR(600,"未找到该订单号对应的订单"),
	ORDER_ISENTER_ERROR(601,"该订单未入住"),

	MEMBER_FIND_BY_PHONE_ERROR(700,"未找到该电话号码对应的会员"),
	MEMBER_FIND_BY_ID_ERROR(701,"未找到该身份证对应的会员"),

	ORDER_HISTORY_FIND_BY_DAY_ERROR(800,"未找到该日对应的订单历史"),
	ORDER_HISTORY_FIND_BY_MONTH_ERROR(801,"未找到该月份对应的订单历史"),
	ORDER_HISTORY_FIND_BY_YEAR_ERROR(802,"未找到该年份对应的订单历史"),
	ORDER_HISTORY_FIND_BY_ID_ERROR(803,"未找到该身份证对应的订单历史"),
	ORDER_HISTORY_FIND_BY_ORDERNO_ERROR(804,"未找到该订单号对应的订单历史"),

	FINANCE_FIND_BY_DAY_ERROR(900,"日财务报表获取失败"),
	FINANCE_FIND_BY_MONTH_ERROR(901,"月财务报表获取失败"),
	FINANCE_FIND_BY_YEAR_ERROR(902,"年财务报表获取失败"),
	FINANCE_INSERT_TYPE_ERROR(903,"收入类型错误"),

	UNKNOWN_ERROR(-1,"未知错误"),
	;

	private int code;
	private String msg;

	ExceptionType(int code,String msg)
	{
		this.code=code;
		this.msg=msg;
	}

	public int getCode()
	{
		return code;
	}

	public void setCode(int code)
	{
		this.code=code;
	}

	public String getMsg()
	{
		return msg;
	}

	public void setMsg(String msg)
	{
		this.msg=msg;
	}
}
