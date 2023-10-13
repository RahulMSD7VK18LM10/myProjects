package com.hexaware.cms.entities;

public class FoodItems {
	private int foodId;
    private String foodName;
    private int foodPrice;
    private int vendorId;
    private int calorie;
	public int getFoodId() {
		return foodId;
	}
	public void setFoodId(int foodId) {
		this.foodId = foodId;
	}
	public String getFoodName() {
		return foodName;
	}
	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}
	public int getFoodPrice() {
		return foodPrice;
	}
	public void setFoodPrice(int foodPrice) {
		this.foodPrice = foodPrice;
	}
	public int getVendorId() {
		return vendorId;
	}
	public void setVendorId(int vendorId) {
		this.vendorId = vendorId;
	}
	public int getCalorie() {
		return calorie;
	}
	public void setCalorie(int calorie) {
		this.calorie = calorie;
	}
	public FoodItems(int foodId, String foodName, int foodPrice, int vendorId, int calorie) {
		super();
		this.foodId = foodId;
		this.foodName = foodName;
		this.foodPrice = foodPrice;
		this.vendorId = vendorId;
		this.calorie = calorie;
	}
	public FoodItems() {
		super();
	}
	@Override
	public String toString() {
		return "FoodItems [foodId=" + foodId + ", foodName=" + foodName + ", foodPrice=" + foodPrice + ", vendorId="
				+ vendorId + ", calorie=" + calorie + "]";
	}
}
