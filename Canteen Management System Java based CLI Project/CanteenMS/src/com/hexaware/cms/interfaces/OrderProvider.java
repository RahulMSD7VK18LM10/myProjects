package com.hexaware.cms.interfaces;

import java.sql.SQLException;
import com.hexaware.cms.entities.OrderDetails;
import com.hexaware.cms.entities.Vendor;

public interface OrderProvider {
	public OrderDetails[] validateOrders(int ordID, String custID) throws ClassNotFoundException, SQLException;
	public void placeOrder(int venID, String custID, int foodID, int qty, double totalCost, int walletBalance,int totalCalorie) throws SQLException, ClassNotFoundException;
	public OrderDetails[] orderHistory(int vId) throws ClassNotFoundException, SQLException;
	public OrderDetails[] validateOrders(int ordID, int vId) throws ClassNotFoundException, SQLException;
	public void rejectOrder(String custID,int ordID, int vId) throws ClassNotFoundException, SQLException;
	public void acceptOrder(int ordID, int vId) throws ClassNotFoundException, SQLException;
	public  void viewOrderHistory(Vendor ven) throws ClassNotFoundException, SQLException;
	public void cancelOrders(int ordID, String custID) throws SQLException, ClassNotFoundException;
	public void rateOrderSer(int ordNo, int ordRat) throws SQLException, ClassNotFoundException;
	public double availDiscount(String custID, String cou, int totalCost) throws ClassNotFoundException, SQLException;
	public boolean verifyCoupan(String custID, String cou) throws ClassNotFoundException, SQLException;
}