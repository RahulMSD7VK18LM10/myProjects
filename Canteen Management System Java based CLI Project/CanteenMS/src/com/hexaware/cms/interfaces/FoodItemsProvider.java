package com.hexaware.cms.interfaces;

import java.sql.SQLException;
import com.hexaware.cms.entities.FoodItems;
import com.hexaware.cms.entities.Vendor;

public interface FoodItemsProvider {
	public FoodItems[] showFoodMenu() throws SQLException, ClassNotFoundException;
	public FoodItems[] showFoodMenu(int vID) throws ClassNotFoundException, SQLException;
	public void addNewItem(Vendor ven, int vID) throws ClassNotFoundException, SQLException;
	public void insertNewFoodItem(Vendor Ven, String fName, int fID, int fPrice, int vID, int fCalorie) throws ClassNotFoundException, SQLException;
	public void updateItemPrice(Vendor ven, int vID) throws ClassNotFoundException, SQLException;
	public void updatdeFoodItem(Vendor Ven, int fID, int fPrice, int vID) throws ClassNotFoundException, SQLException;
}