package com.hexaware.cms.interfaces;

import java.sql.SQLException;
import com.hexaware.cms.entities.Customer;
import com.hexaware.cms.entities.OrderDetails;

public interface CustomerServiceProvider {
	public void viewCustomerProfile(Customer cs) throws ClassNotFoundException, SQLException;
	public void viewOrderHistory(Customer cs) throws ClassNotFoundException, SQLException;
	public void placeOrder(Customer cs) throws ClassNotFoundException, SQLException;
	public void menuList(Customer cs) throws ClassNotFoundException, SQLException;
	public Customer validateCustomerLogin(String cLoginID, String cPass) throws SQLException, ClassNotFoundException;
	public Customer[] customerProfile() throws ClassNotFoundException, SQLException;
	public Customer[] customerProfile(String cLoginID) throws SQLException, ClassNotFoundException;
	public OrderDetails[] customerOrderHistory(String id) throws ClassNotFoundException, SQLException;
	public void insertnewCustomer(String cID, String cName, String cPhone, String cEmail, int walletBalance,
			String cLogin, String cPassword) throws SQLException, ClassNotFoundException;
	public void updatePassword(String cLoginID, String cCurrentPass, String cNewPass) throws ClassNotFoundException, SQLException;
	public void rechargeWallet(Customer cs, String cID) throws ClassNotFoundException, SQLException;
	public void viewWalletBalance(Customer cs, String cid) throws ClassNotFoundException, SQLException;
	public void cancelOrders(Customer cs) throws ClassNotFoundException, SQLException;
	public void rateOrder(Customer cs) throws ClassNotFoundException, SQLException;
	public void viewOrderRating(Customer cs) throws ClassNotFoundException, SQLException;
	public void voucher(String cID) throws ClassNotFoundException, SQLException;
	public void randomDB(String cID, String coupan) throws ClassNotFoundException, SQLException;
}