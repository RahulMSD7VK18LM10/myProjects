package com.hexaware.cms.entities;

import java.sql.Date;

public class OrderDetails {
	   private int orderNo;
	   private int venderId;
	   private String customerId;
	   private int foodId;
	   private int quantity;   
	   private Date localdatetime;
	   private int  orderValue;
	   private String orderStatus;
	   private int totalCalorie;
	   private int orderRating;
	public int getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(int orderNo) {
		this.orderNo = orderNo;
	}
	public int getVenderId() {
		return venderId;
	}
	public void setVenderId(int venderId) {
		this.venderId = venderId;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public int getFoodId() {
		return foodId;
	}
	public void setFoodId(int foodId) {
		this.foodId = foodId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Date getDatetime() {
		return localdatetime;
	}
	public void setDatetime(Date datetime) {
		this.localdatetime = datetime;
	}
	public int getOrderValue() {
		return orderValue;
	}
	public void setOrderValue(int orderValue) {
		this.orderValue = orderValue;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public int getTotalCalorie() {
		return totalCalorie;
	}
	public void setTotalCalorie(int totalCalorie) {
		this.totalCalorie = totalCalorie;
	}
	public int getOrderRating() {
		return orderRating;
	}
	public void setOrderRating(int orderRating) {
		this.orderRating = orderRating;
	}
	public OrderDetails(int orderNo, int venderId, String customerId, int foodId, int quantity, Date date,
			int orderValue, String orderStatus, int totalCalorie, int orderRating) {
		super();
		this.orderNo = orderNo;
		this.venderId = venderId;
		this.customerId = customerId;
		this.foodId = foodId;
		this.quantity = quantity;
		this.localdatetime = date;
		this.orderValue = orderValue;
		this.orderStatus = orderStatus;
		this.totalCalorie = totalCalorie;
		this.orderRating = orderRating;
	}
	public OrderDetails() {
		super();
	}
	@Override
	public String toString() {
		return "OrderDetails [orderNo=" + orderNo + ", venderId=" + venderId + ", customerId=" + customerId
				+ ", foodId=" + foodId + ", quantity=" + quantity + ", localdatetime=" + localdatetime + ", orderValue="
				+ orderValue + ", orderStatus=" + orderStatus + ", totalCalorie=" + totalCalorie + ", orderRating="
				+ orderRating + "]";
	}
}
