package com.hexaware.cms.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Scanner;

import com.hexaware.cms.entities.FoodItems;
import com.hexaware.cms.entities.OrderDetails;
import com.hexaware.cms.entities.Vendor;
import com.hexaware.cms.interfaces.VendorProvider;
import com.hexaware.cms.util.DBConnector;
import com.hexaware.cms.util.Menupro;


public class VendorService implements VendorProvider {

	Scanner sc = new Scanner(System.in);
	//OrderService os = new OrderService();
	Menupro mp = new Menupro();
	


	public void viewVendorProfile(Vendor ven) throws ClassNotFoundException, SQLException {
		Vendor[] venArray = vendorProfile();
		System.out.format("%-20s%-20s%-20s%-20s\n", "Vendor Id", "Vendor Name", "Vendor Phone", "Vendor Specs");
		System.out.println(" ");
		for (Vendor v : venArray)
			System.out.format("%-20d%-20s%-20s%-20s\n", v.getvId(), v.getvName(), v.getvPhone(),
					v.getvSpecs());
		System.out.println(" ");
	}

	public void menuList(Vendor ven, int vID) throws ClassNotFoundException, SQLException {
		FoodItemService fis = new FoodItemService();
		FoodItems m[] = fis.showFoodMenu(vID);
		System.out.format("%-10s%-25s%-11s%-11s\n", "Food Id", "Food Name", "Food Price", " VendorId");
		System.out.println(" ");
		for (int i = 0; i < m.length; i++)
			System.out.format("%-10d%-25s%-15d%-11d\n", m[i].getFoodId(), m[i].getFoodName(), m[i].getFoodPrice(),
					m[i].getVendorId());
		System.out.println(" ");
		// return to customer profile with the logged in customer and object
		mp.vendorProfile(ven, vID);
	}


	public Vendor validateVendor(int vID, String vPass) throws ClassNotFoundException, SQLException {
		Vendor ven = null;
		Connection con = DBConnector.getConnection();

		PreparedStatement validateVen = con
				.prepareStatement("SELECT * FROM Vendor WHERE Vendor_id = ? AND Vendor_Password = ?");
		validateVen.setInt(1, vID);
		validateVen.setString(2, vPass);

		ResultSet rs = validateVen.executeQuery();

		if (rs.next()) {
			ven = new Vendor(rs.getInt("Vendor_id"), rs.getString("Vendor_Name"), rs.getString("Vendor_Phone"),
					rs.getString("Vendor_Specs"));
		}
		if (ven != null) {
			System.out.println("Login Successful...");
		} else {
			System.out.println("Please enter correct Vendor ID, Password or Vendor does not exists.");
		}
		// close all open resources, statements and connections at end.
		rs.close();
		validateVen.close();
		con.close();
		return ven;
	}

	public Vendor[] vendorProfile() throws ClassNotFoundException, SQLException {
		Vendor[] venArray = null;
		Connection con = DBConnector.getConnection();
		Statement venProfile = con.createStatement();

		ResultSet rs = venProfile.executeQuery("SELECT * FROM Vendor");
		ArrayList<Vendor> list = new ArrayList<Vendor>();
		while (rs.next()) {
			Vendor v = new Vendor(rs.getInt("Vendor_id"), rs.getString("Vendor_Name"), rs.getString("Vendor_Phone"),
					rs.getString("Vendor_Specs"));
			list.add(v);
		}
		venArray = new Vendor[list.size()];
		venArray = list.toArray(venArray);

		// close all open resources, statements and connections at end.
		rs.close();
		venProfile.close();
		con.close();
		return venArray;
	}

	public OrderDetails[] vendorOrderHistory(int getvId) throws SQLException, ClassNotFoundException {
		OrderDetails[] ordArr = null;
		Connection con = DBConnector.getConnection();

		PreparedStatement venOrderHistory = con.prepareStatement("SELECT * FROM OrderDetails WHERE Vendor_id = ?");
		venOrderHistory.setInt(1, getvId);
		ResultSet rs = venOrderHistory.executeQuery();
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
		venOrderHistory.close();
		con.close();
		return ordArr;
	}

	public void updatePassword(int vID, String vCurrentPass, String vNewPass) throws ClassNotFoundException, SQLException {

			Connection con = DBConnector.getConnection();
			PreparedStatement updatePass = con.prepareStatement(
					"UPDATE Vendor SET Vendor_Password = ? WHERE" + " Vendor_id = ? and Vendor_Password = ?");
			updatePass.setString(1, vNewPass);
			updatePass.setInt(2, vID);
			updatePass.setString(3, vCurrentPass);

			DBConnector.i = updatePass.executeUpdate();
			if (DBConnector.i > 0) {
				System.out.println("Password changed Successfully. Please Login again.");
			} else {
				System.out.println("Please enter correct Vendor ID, Password or Vendor does not exists.");
			}

			// close all open resources, statements and connections at end.
			updatePass.close();
			con.close();
	}

	public void insertnewVendor(int vID, String vName, String vPhone, String vSpecs, String vPassword) throws ClassNotFoundException, SQLException {
		Connection con = DBConnector.getConnection();
		PreparedStatement addcustomer = con.prepareStatement("INSERT INTO Vendor VALUES (?,?,?,?,?)");
		addcustomer.setInt(1, vID);
		addcustomer.setString(2, vName);
		addcustomer.setString(3, vPhone);
		addcustomer.setString(4, vSpecs);
		addcustomer.setString(5, vPassword);
		DBConnector.i = addcustomer.executeUpdate();
		if (DBConnector.i > 0) {
			System.out.println("Vendor Created Successfully. You can Login.");
		} else {
			System.out.println("Please enter correct values or User already exists.");
		}
		addcustomer.close();
		con.close();
	}
	
	public void acceptOrRejectOrders(int vId, Vendor ven) throws ClassNotFoundException, SQLException {
		OrderService os = new OrderService();
		
		OrderDetails[] ods = os.orderHistory(vId);
		String custId = null;
		System.out.format("%-20s%-20s%-20s%-20s%-20s%-20s%-20s%-20s\n", "ORDER NO", "VENDOR ID", "CUSTOMER ID",
				"FOOD ID", "ORDER QTY", "ORDER ETA DATE TIME", "ORDER VALUE", "ORDER STATUS");
		System.out.println(" ");
		for (OrderDetails o : ods)
			System.out.format("%-20d%-20d%-20s%-20d%-20d%-20s%-20d%-20s\n", o.getOrderNo(), o.getVenderId(),
					o.getCustomerId(), o.getFoodId(), o.getQuantity(), o.getDatetime(), o.getOrderValue(),
					o.getOrderStatus());
		System.out.println(" ");
		for(OrderDetails o : ods) {
			custId = o.getCustomerId();
		}
		int ordID = 0;
		if (ods != null) {
			System.out.println("Please enter the Order ID to accept or reject Order");
			ordID = sc.nextInt();
		} else {
			System.out.println("No unattended orders Found. Redirecting to Vendor Profile");
			mp.vendorProfile(ven, vId);
		}

		OrderDetails[] ordseek = os.validateOrders(ordID, vId);
		if (ordseek != null) {
			System.out.println("To accepct press 1 | to reject press 2: ");
			int state = sc.nextInt();
			if (state == 1) {
				os.acceptOrder(ordID, vId);
			} else if (state == 2) {
				os.rejectOrder(custId,ordID, vId);
			} else {
				System.out.println("Please enter correct values");
			}
		} else {
			System.out.println("Order ID does not exists.");
		}
		// return to vendor profile with the logged in vendor and object
		mp.vendorProfile(ven, vId);
	}
}
