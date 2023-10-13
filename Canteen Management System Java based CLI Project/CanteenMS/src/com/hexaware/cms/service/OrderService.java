package com.hexaware.cms.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

import com.hexaware.cms.entities.OrderDetails;
import com.hexaware.cms.entities.Vendor;
import com.hexaware.cms.interfaces.OrderProvider;
import com.hexaware.cms.util.DBConnector;
import com.hexaware.cms.util.Menupro;

public class OrderService implements OrderProvider  {
	
	Menupro mp = new Menupro();
	Scanner sc = new Scanner(System.in);

	public OrderDetails[] validateOrders(int ordID, String custID) throws ClassNotFoundException, SQLException {
		OrderDetails[] ord = null;
		
		Connection con = DBConnector.getConnection();

		PreparedStatement validateCustOrder = con
				.prepareStatement("SELECT * FROM OrderDetails WHERE Order_No = ? AND Customer_id = ?");
		validateCustOrder.setInt(1, ordID);
		validateCustOrder.setString(2, custID);

		ResultSet rs = validateCustOrder.executeQuery();
		ArrayList<OrderDetails> list = new ArrayList<OrderDetails>();

		while (rs.next()) {
			OrderDetails od = new OrderDetails(rs.getInt("Order_No"), rs.getInt("Vendor_id"), rs.getString("Customer_id"),
					rs.getInt("Food_id"), rs.getInt("Quantity"), rs.getDate("DateandTime"),
					rs.getInt("Order_value"), rs.getString("Order_status"),rs.getInt("TotalCalorie"),rs.getInt("Order_Ratings"));
			list.add(od);
		}
		ord = new OrderDetails[list.size()];
		ord = list.toArray(ord);

		// close all open resources, statements and connections at end.
		rs.close();
		validateCustOrder.close();
		con.close();
		return ord;
	}

	public void placeOrder(int venID, String custID, int foodID, int qty, double totalCost, int walletBalance,int totalCalorie) throws SQLException, ClassNotFoundException {
		
			Connection con = DBConnector.getConnection();
			PreparedStatement placeFoodItem = con.prepareStatement(
					"INSERT INTO OrderDetails (Vendor_id, Customer_id, Food_id, Quantity, Order_value,TotalCalorie) VALUES (?,?,?,?,?,?)");
			placeFoodItem.setInt(1, venID);
			placeFoodItem.setString(2, custID);
			placeFoodItem.setInt(3, foodID);
			placeFoodItem.setInt(4, qty);
			placeFoodItem.setDouble(5, totalCost);
			placeFoodItem.setInt(6, totalCalorie);
			

			DBConnector.i = placeFoodItem.executeUpdate();
			if (DBConnector.i > 0) {
				System.out.println("Order placed successfully.");
				System.out.println("Your total Calorie intake from this order will be " + totalCalorie);
			} else {
				System.out.println("Please enter correct values or duplicate order.");
			}

			PreparedStatement updateBalance = con
					.prepareStatement("UPDATE Customer SET Customer_walletbal = ? WHERE Customer_id = ?");
			updateBalance.setDouble(1, walletBalance - totalCost);
			updateBalance.setString(2, custID);
			DBConnector.i = updateBalance.executeUpdate();
			if (DBConnector.i > 0) {
				System.out.println("Wallet Balance updated.");
			} else {
				System.out.println("Please enter correct values or duplicate order.");
			}

			// close all open resources, statements and connections at end.
			placeFoodItem.close();
			updateBalance.close();
			con.close();
		} 

	public void rejectOrder(String custID,int ordID, int vId) throws ClassNotFoundException, SQLException {
		
		Connection con = DBConnector.getConnection();
		PreparedStatement rejectOrder = con.prepareStatement(
				"UPDATE OrderDetails SET Order_status = ? WHERE Order_No = ? AND Order_status IS NULL");
		rejectOrder.setString(1, "Rejected");
		rejectOrder.setInt(2, ordID);
		DBConnector.i = rejectOrder.executeUpdate();
		if (DBConnector.i > 0) {
			System.out.println("Order: " + ordID + " is Rejected Successfully");
			System.out.println("Refund Initiated");
		} else {
			System.out.println("Order could not be rejected: Order such order found.");
		}

		PreparedStatement initiateRefund = con
				.prepareStatement("SELECT Order_value, Customer_id FROM OrderDetails WHERE Order_No = ?");
		initiateRefund.setInt(1, ordID);

		ResultSet rs = initiateRefund.executeQuery();
		while (rs.next()) {
			int oValue = rs.getInt("Order_value");
			String cID = rs.getString("Customer_id");
			PreparedStatement updateBalance = con.prepareStatement(
					"UPDATE Customer SET Customer_walletbal = Customer_walletbal + ? WHERE Customer_id = ?");
			updateBalance.setInt(1, oValue);
			updateBalance.setString(2, cID);
			updateBalance.executeUpdate();
		}
		System.out.println("Your refund is successful. Check your wallet.");
		PreparedStatement updateStatus = con.prepareStatement(
				"UPDATE Voucher SET Voucher_Status = ? WHERE Customer_id = ?");
		updateStatus.setString(1,"Active");
		updateStatus.setString(2, custID);
		updateStatus.executeUpdate();
		// close all open resources, statements and connections at end.
		updateStatus.close();
		rejectOrder.close();
		con.close();
	} 	

	public void acceptOrder(int ordID, int vId) throws ClassNotFoundException, SQLException { // need help
	
		Connection con = DBConnector.getConnection();
		PreparedStatement acceptOrder = con.prepareStatement(
				"UPDATE OrderDetails SET Order_status = ? WHERE Order_No = ? AND Order_status IS NULL");
		acceptOrder.setString(1, "Accepted");
		acceptOrder.setInt(2, ordID);
		DBConnector.i = acceptOrder.executeUpdate();
		if (DBConnector.i > 0) {
			System.out.println("Order: " + ordID + " is Accepted Successfully");
		} else {
			System.out.println("Order could not be accepted: Order such order found.");
		}

		// close all open resources, statements and connections at end.
		acceptOrder.close();
		con.close();
	}
	
	public OrderDetails[] validateOrders(int ordID, int vId) throws ClassNotFoundException, SQLException {
		OrderDetails[] ord = null;
		Connection con = DBConnector.getConnection();

		PreparedStatement validateOrder = con.prepareStatement("SELECT * FROM OrderDetails WHERE Vendor_id = ?");
		validateOrder.setInt(1, vId);

		ResultSet rs = validateOrder.executeQuery();
		ArrayList<OrderDetails> list = new ArrayList<OrderDetails>();

		while (rs.next()) {
			OrderDetails od = new OrderDetails(rs.getInt("Order_No"), rs.getInt("Vendor_id"), rs.getString("Customer_id"),
					rs.getInt("Food_id"), rs.getInt("Quantity"), rs.getDate("DateandTime"),
					rs.getInt("Order_value"), rs.getString("Order_status"),rs.getInt("TotalCalorie"),rs.getInt("Order_Ratings"));
			list.add(od);
		}
		ord = new OrderDetails[list.size()];
		ord = list.toArray(ord);

		// close all open resources, statements and connections at end.
		rs.close();
		validateOrder.close();
		con.close(); 
		return ord;
	}


	public OrderDetails[] orderHistory(int vId) throws ClassNotFoundException, SQLException {
		OrderDetails[] ordArr = null;
		
		Connection con = DBConnector.getConnection();

		PreparedStatement ordHistory = con
				.prepareStatement("SELECT * FROM OrderDetails WHERE Vendor_id = ? AND Order_status is null");
		ordHistory.setInt(1, vId);
		ResultSet rs = ordHistory.executeQuery();
		ArrayList<OrderDetails> list = new ArrayList<OrderDetails>();
		while (rs.next()) {
			OrderDetails od = new OrderDetails(rs.getInt("Order_No"), rs.getInt("Vendor_id"), rs.getString("Customer_id"),
					rs.getInt("Food_id"), rs.getInt("Quantity"), rs.getDate("DateandTime"),
					rs.getInt("Order_value"), rs.getString("Order_status"),rs.getInt("TotalCalorie"),rs.getInt("Order_Ratings"));
			list.add(od);
		}
		ordArr = new OrderDetails[list.size()];
		ordArr = list.toArray(ordArr);

		// close all open resources, statements and connections at end.
		rs.close();
		ordHistory.close();
		con.close();
		return ordArr;
	}
	public  void viewOrderHistory(Vendor ven) throws ClassNotFoundException, SQLException {
		VendorService vs = new VendorService();
		OrderDetails[] od = vs.vendorOrderHistory(ven.getvId());

		System.out.format("%-20s%-20s%-20s%-20s%-20s%-20s%-20s%-20s\n", "ORDER NO", "VENDOR ID", "CUSTOMER ID",
				"FOOD ID", "ORDER QTY", "ORDER STA DATE TIME", "ORDER VALUE", "ORDER STATUS");
		System.out.println(" ");
		for (OrderDetails o : od)
			System.out.format("%-20d%-20d%-20s%-20d%-20d%-20s%-20d%-20s\n", o.getOrderNo(), o.getVenderId(),
					o.getCustomerId(), o.getFoodId(), o.getQuantity(), o.getDatetime(), o.getOrderValue(),
					o.getOrderStatus());
		System.out.println(" ");

		// return to customer profile with the logged in customer and object
		int vID = ven.getvId();
		mp.vendorProfile(ven, vID);
	}
	
	public void cancelOrders(int ordID, String custID) throws SQLException, ClassNotFoundException {
		
			Connection con = DBConnector.getConnection();

			PreparedStatement cancelOrder = con
					.prepareStatement("UPDATE OrderDetails SET Order_status = ? WHERE Order_No = ?");
			cancelOrder.setString(1, "Canceled by Customer");
			cancelOrder.setInt(2, ordID);
			DBConnector.i = cancelOrder.executeUpdate();
			if (DBConnector.i > 0) {
				System.out.println("Order: " + ordID + " is Cancelled Successfully");
			} else {
				System.out.println("Order cancellation failed: No such order found.");
			}

			PreparedStatement initiateRefund = con
					.prepareStatement("SELECT Order_value, Customer_id FROM OrderDetails WHERE Order_No = ?");
			initiateRefund.setInt(1, ordID);

			ResultSet rs = initiateRefund.executeQuery();
			while (rs.next()) {
				int oValue = rs.getInt("Order_value");
				String cID = rs.getString("Customer_id");
				PreparedStatement updateBalance = con.prepareStatement(
						"UPDATE Customer SET Customer_walletbal = Customer_walletbal + ? WHERE Customer_id = ?");
				updateBalance.setInt(1, oValue);
				updateBalance.setString(2, cID);
				updateBalance.executeUpdate();
			}
			System.out.println("Your refund is successful. Check your wallet.");
			PreparedStatement updateStatus = con.prepareStatement(
					"UPDATE Voucher SET Voucher_Status = ? WHERE Customer_id = ?");
			updateStatus.setString(1,"Active");
			updateStatus.setString(2, custID);
			updateStatus.executeUpdate();

			// close all open resources, statements and connections at end.
			updateStatus.close();
			cancelOrder.close();
			con.close();
		}

	public void rateOrderSer(int ordNo, int ordRat) throws SQLException, ClassNotFoundException {  // work in progress
			
		Connection con = DBConnector.getConnection();

		PreparedStatement rateOrder = con
				.prepareStatement("INSERT INTO Ratings (Order_No,Order_Rating) VALUES (?,?)");
		rateOrder.setInt(1,ordNo);
		rateOrder.setInt(2,ordRat);
		
		DBConnector.i = rateOrder.executeUpdate();
		if (DBConnector.i > 0) {
			System.out.println("Rating is done successfully");
		} else {
			System.out.println("There was some error");
		}
		
		PreparedStatement orderRate = con.prepareStatement("UPDATE OrderDetails SET Order_Ratings = ? WHERE Order_No = ?");
		orderRate.setInt(1, ordRat);
		orderRate.setInt(2, ordNo);
		orderRate.executeUpdate();
		
		rateOrder.close();
		orderRate.close();
		con.close();
		
	}

	public double availDiscount(String custID, String cou, int totalCost) throws ClassNotFoundException, SQLException {
		boolean sat = verifyCoupan(custID,cou);
		if(sat==true) {
			double dis=totalCost*0.5;
			double amtPaid=(totalCost-dis);
			Connection con = DBConnector.getConnection();
			PreparedStatement updateStatus = con.prepareStatement(
					"UPDATE Voucher SET Voucher_Status = ? WHERE Customer_id = ?");
			updateStatus.setString(1,"Used");
			updateStatus.setString(2, custID);
			updateStatus.executeUpdate();
			updateStatus.close();
			con.close();
			return amtPaid;
		}else {
			System.out.println("The code you entered is either wrong or already used");
			return totalCost;
		}
	}

	public boolean verifyCoupan(String custID, String cou) throws ClassNotFoundException, SQLException {

		Connection con = DBConnector.getConnection();

		PreparedStatement verVou = con
				.prepareStatement("SELECT Coupan, Voucher_Status FROM Voucher WHERE Customer_id = ?");
		verVou.setString(1, custID);
		ResultSet rs = verVou.executeQuery();
		while(rs.next()) {
			if(rs.getString("Voucher_Status").equals("Active")) {
				if(rs.getString("Coupan").equals(cou)) {
					return true;
				}
				else {
					return false;
				}
			}else {
				return false;
			}
			
		}
		rs.close();
		verVou.close();
		con.close();
		return false;
	}
}
	