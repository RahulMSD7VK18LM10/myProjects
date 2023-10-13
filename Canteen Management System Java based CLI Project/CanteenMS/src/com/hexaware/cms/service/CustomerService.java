package com.hexaware.cms.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

import com.hexaware.cms.entities.Customer;
import com.hexaware.cms.entities.FoodItems;
import com.hexaware.cms.entities.OrderDetails;
import com.hexaware.cms.interfaces.CustomerServiceProvider;
import com.hexaware.cms.main.Mainpro;
import com.hexaware.cms.util.DBConnector;
import com.hexaware.cms.util.Menupro;

public class CustomerService implements CustomerServiceProvider {

	Scanner sc = new Scanner(System.in);
	FoodItemService fis = new FoodItemService();
	Menupro mp = new Menupro(); 
	
	public void menuList(Customer cs) throws ClassNotFoundException, SQLException {
		FoodItems m[] = fis.showFoodMenu();
		System.out.format("%-10s%-25s%-11s%-11s%-11s\n", "Food Id", "Food Name", "Food Price", " VendorId","Calorie");
		System.out.println(" ");
		for (int i = 0; i < m.length; i++)
			System.out.format("%-10d%-25s%-15d%-11d%-11d\n", m[i].getFoodId(), m[i].getFoodName(), m[i].getFoodPrice(),
					m[i].getVendorId(),m[i].getCalorie());
		System.out.println(" ");
		// return to customer profile with the logged in customer and object
		mp.customerProfile(cs);
	}
	
	public void placeOrder(Customer cs) throws ClassNotFoundException, SQLException {
		OrderService os = new OrderService();
		FoodItems[] mArray = fis.showFoodMenu();
		System.out.format("%-10s%-25s%-11s%-11s%-11s\n", "Food Id", "Food Name", "Food Price", " VendorId","Calorie");
		System.out.println(" ");
		for (int i = 0; i < mArray.length; i++)
			System.out.format("%-10d%-25s%-15d%-11d%-11d\n", mArray[i].getFoodId(), mArray[i].getFoodName(),
					mArray[i].getFoodPrice(), mArray[i].getVendorId(),mArray[i].getCalorie());

		// display the wallet balance also
		int bal = cs.getcWalletBalance();
		System.out.println("Current wallet balance: " + bal);

		System.out.println(" ");
		boolean orderFlag = false;
		System.out.println("Enter Food ID to order: ");
		int foodID = sc.nextInt();

		FoodItems fi = null;
		for (FoodItems m : mArray) {
			if (m.getFoodId() == foodID) {
				orderFlag = true;
				fi = m;
				break;
			}
		}

		int venID = fi.getVendorId();
		if (orderFlag == false) {
			System.out.println(" Invalid Food ID. Menu item does not exist.");
			return;
		}

		System.out.println("Enter Quantity to order: ");
		int qty = sc.nextInt();
		
		int totalCalorie = qty*fi.getCalorie();
		
		int totalCost = qty * fi.getFoodPrice();
		int walletBalance = cs.getcWalletBalance();
		String custID = cs.getId();
		System.out.println("If it is your first order you might have been awarded with a Voucher");
		System.out.println("If yes press 1 | else press 2 to go ahead");
		int chc=sc.nextInt();
		if(chc==1) {
		System.out.println("Enter your Coupan code to avail the duscount: ");
		String cou=sc.next();
		double amtPaid = os.availDiscount(custID,cou,totalCost);
		System.out.println("Total Calorie Consumption : " + totalCalorie);
		System.out.println("To continue with order press 1 else press 2 to change order or press 3 to exit");
		int cho = sc.nextInt();
		if(cho==1) {
			System.out.println("Amount to  be paid : " + amtPaid);
			if (walletBalance > amtPaid) {
				System.out.println("Placing Order...");
				System.out.println("You have enough balance to place the order. Press 1 to confirm.");
				int confirm = sc.nextInt();
				if (confirm == 1) {
					os.placeOrder(venID, custID, foodID, qty, amtPaid, walletBalance,totalCalorie);
				} else {
					System.out.println("Order placement cancelled: Wrong input by User.");
				}
			} else {
				System.out.println("You've insufficient Wallet Balance. Please recharge your Wallet.");
				System.out.println("To recharge press 1 | To return to main menu order press 2");
				int ch = sc.nextInt();
				switch(ch) {
				case 1:
					rechargeWallet(cs, custID);
					break;
				case 2:
					Mainpro.main(null);
				default:
					System.out.println("Enter a valid choice");
				}
			}
		}else if(cho==2){
			placeOrder(cs);
		}else {
			Mainpro.main(null);
		}
	}else {
		System.out.println("Total Calorie Consumption : " + totalCalorie);
		System.out.println("To continue with order press 1 else press 2 to change order");
		int cho = sc.nextInt();
		if(cho==1) {
			System.out.println("Amount to  be paid : " + totalCost);
			if (walletBalance > totalCost) {
				System.out.println("Placing Order...");
				System.out.println("You have enough balance to place the order. Press 1 to confirm.");
				int confirm = sc.nextInt();
				if (confirm == 1) {
					os.placeOrder(venID, custID, foodID, qty, totalCost, walletBalance,totalCalorie);
				} else {
					System.out.println("Order placement cancelled: Wrong input by User.");
				}
			} else {
				System.out.println("You've insufficient Wallet Balance. Please recharge your Wallet.");
				System.out.println("To recharge press 1 | To return to main menu order press 2:");
				int ch = sc.nextInt();
				switch(ch) {
				case 1:
					rechargeWallet(cs, custID);
					break;
				case 2:
					Mainpro.main(null);
				}
				
			}
		}else {
			placeOrder(cs);
		}
	}
		
		// return to customer profile with the logged in customer and object
	mp.customerProfile(cs);
}
	
	public void rechargeWallet(Customer cs, String cID) throws ClassNotFoundException, SQLException {
		Connection con = DBConnector.getConnection();
		PreparedStatement viewWB = con.prepareStatement("SELECT Customer_walletbal FROM Customer WHERE Customer_id = ?");
		viewWB.setString(1, cID);
		ResultSet rs = viewWB.executeQuery();
		double wb = 0;
		while (rs.next()) {
			wb=rs.getInt("Customer_walletbal");
		}
		System.out.println("The current wallet balance is "+wb);
		System.out.println("Enter the amount to be added:");
		float amt = sc.nextFloat();
		PreparedStatement recharge = con.prepareStatement(
				"UPDATE Customer SET Customer_walletbal = Customer_walletbal + ? WHERE Customer_id = ?");
		recharge.setFloat(1, amt);
		recharge.setString(2, cID);
		recharge.executeUpdate();
		System.out.println("Your recharge is successful.");
		PreparedStatement viewUWB = con.prepareStatement("SELECT Customer_walletbal FROM Customer WHERE Customer_id = ?");
		viewUWB.setString(1, cID);
		ResultSet rss = viewUWB.executeQuery();
		double uwb = 0;
		while (rss.next()) {
			uwb=rss.getInt("Customer_walletbal");
		}
		System.out.println("The updated wallet balance is "+uwb);
		viewWB.close();
		viewUWB.close();
		recharge.close();
		con.close();
		mp.customerProfile(cs);
	}
	
	public void viewWalletBalance(Customer cs, String cid) throws ClassNotFoundException, SQLException {
		Connection con = DBConnector.getConnection();

		PreparedStatement viewWB = con.prepareStatement("SELECT Customer_walletbal FROM Customer WHERE Customer_id = ?");
		viewWB.setString(1, cid);
		ResultSet rs = viewWB.executeQuery();
		double wb = 0;
		while (rs.next()) {
			wb=rs.getInt("Customer_walletbal");
		}
		System.out.println("The wallet balance is "+wb);
		viewWB.close();
		con.close();
		mp.customerProfile(cs);
	}
	
	public void viewOrderHistory(Customer cs) throws ClassNotFoundException, SQLException {
		OrderDetails[] od = customerOrderHistory(cs.getId());

		System.out.format("%-20s%-20s%-20s%-20s%-20s%-20s%-20s%-20s%-20s\n", "Customer Id", "Date-Time", "Food ID", "Order No.",
				"Order Status", "Order Value", "Quantity", "Vender ID","Calorie");
		System.out.println(" ");
		for (OrderDetails o : od)
			System.out.format("%-20s%-20s%-20s%-20d%-20s%-20s%-20d%-20s%-20d\n", o.getCustomerId(), o.getDatetime(),
					o.getFoodId(), o.getOrderNo(), o.getOrderStatus(), o.getOrderValue(), o.getQuantity(),
					o.getVenderId(),o.getTotalCalorie());
		System.out.println(" ");
		mp.customerProfile(cs);
	}
	
	public OrderDetails[] customerOrderHistory(String id) throws ClassNotFoundException, SQLException {
			OrderDetails[] ordArr = null;
			Connection con = DBConnector.getConnection();

			PreparedStatement custOrderHistory = con
					.prepareStatement("SELECT * FROM OrderDetails WHERE Customer_id = ?");
			custOrderHistory.setString(1, id);
			ResultSet rs = custOrderHistory.executeQuery();
			ArrayList<OrderDetails> list = new ArrayList<OrderDetails>();
			while (rs.next()) {
				OrderDetails od = new OrderDetails(rs.getInt("Order_No"), rs.getInt("Vendor_id"), rs.getString("Customer_id"),
						rs.getInt("Food_id"), rs.getInt("Quantity"), rs.getDate("DateandTime"),
						rs.getInt("Order_value"), rs.getString("Order_status"),rs.getInt("totalCalorie"),rs.getInt("Order_Ratings"));
				list.add(od);
			}
			ordArr = new OrderDetails[list.size()];
			ordArr = list.toArray(ordArr);

			// close all open resources, statements and connections at end.
			rs.close();
			custOrderHistory.close();
			con.close();
		    return ordArr;
	}
	
	public void viewCustomerProfile(Customer cs) throws ClassNotFoundException, SQLException {
		Customer[] cArray = customerProfile(cs.getcLoginId());

		System.out.format("%-20s%-20s%-20s%-20s%-20s\n", "Customer Id", "Customer Name", "Customer Email", "Wallet",
				"Customer Login Id");
		System.out.println(" ");
		for (Customer c : cArray)
			System.out.format("%-20s%-20s%-20s%-20d%-20s\n", c.getId(), c.getcName(),
					c.getcEmail(), c.getcWalletBalance(), c.getcLoginId());
		System.out.println(" ");
		mp.customerProfile(cs);
	}
	
	public Customer[] customerProfile() throws ClassNotFoundException, SQLException {
		Customer[] custArray = null;
		Connection con = DBConnector.getConnection();
		PreparedStatement viewCustProfile = con.prepareStatement("SELECT * FROM Customer");
		ResultSet rs = viewCustProfile.executeQuery();

		ArrayList<Customer> list = new ArrayList<Customer>();
		while (rs.next()) {
			Customer cs = new Customer(rs.getString("Customer_id"), rs.getString("Customer_name"),
					rs.getString("Customer_phone"), rs.getString("Customer_Email"), rs.getInt("Customer_walletbal"),
					rs.getString("Customer_Login_id"), rs.getString("Customer_Password"));
			list.add(cs);
		}
		custArray = new Customer[list.size()];
		custArray = list.toArray(custArray);

		// close all open resources, statements and connections at end.
		rs.close();
		viewCustProfile.close();
		con.close();
		return custArray;
	}
	
	public Customer[] customerProfile(String cLoginID) throws SQLException, ClassNotFoundException {
		Customer[] custArray = null;
		
		Connection con = DBConnector.getConnection();
		PreparedStatement custProfile = con.prepareStatement("SELECT * FROM Customer WHERE Customer_Login_id = ?");
		custProfile.setString(1, cLoginID);
		ResultSet rs = custProfile.executeQuery();

		ArrayList<Customer> list = new ArrayList<Customer>();
		while (rs.next()) {
			Customer cs = new Customer(rs.getString("Customer_id"), rs.getString("Customer_name"),
					rs.getString("Customer_phone"), rs.getString("Customer_Email"), rs.getInt("Customer_walletbal"),
					rs.getString("Customer_Login_id"), rs.getString("Customer_Password"));
			list.add(cs);
		}
		custArray = new Customer[list.size()];
		custArray = list.toArray(custArray);

		// close all open resources, statements and connections at end.
		rs.close();
		custProfile.close();
		con.close();
		return custArray;
	}

	public Customer validateCustomerLogin(String cLoginID, String cPass) throws SQLException, ClassNotFoundException {
		Customer cs = null;
		
		Connection con = DBConnector.getConnection();// Get the Connection

		PreparedStatement validateCust = con
				.prepareStatement("SELECT * FROM Customer WHERE Customer_Login_id = ? and Customer_Password = ?");

		validateCust.setString(1, cLoginID);
		validateCust.setString(2, cPass);
		ResultSet rs = validateCust.executeQuery();
		if (rs.next()) {
			String custId = rs.getString("Customer_id");
			String custName = rs.getString("Customer_name");
			String custPhone = rs.getString("Customer_phone");
			String custEmail = rs.getString("Customer_Email");
			int custWalletBalance = rs.getInt("Customer_walletbal");
			String custLoginId2 = rs.getString("Customer_Login_id");
			String custPassword2 = rs.getString("Customer_Password");

			// Creating object from single row of data of customer
			cs = new Customer(custId, custName, custPhone, custEmail, custWalletBalance, custLoginId2,
					custPassword2);
			System.out.println("Login Successful...");
			// close all open resources, statements and connections at end.
			rs.close();
			validateCust.close();
			con.close();
		} 
		return cs;
	}

	public void insertnewCustomer(String cID, String cName, String cPhone, String cEmail, int walletBalance,
			String cLogin, String cPassword) throws SQLException, ClassNotFoundException {

		Connection con = DBConnector.getConnection();
		PreparedStatement addcustomer = con.prepareStatement("INSERT INTO Customer VALUES (?,?,?,?,?,?,?)");
		addcustomer.setString(1, cID);
		addcustomer.setString(2, cName);
		addcustomer.setString(3, cPhone);
		addcustomer.setString(4, cEmail);
		addcustomer.setInt(5, walletBalance);
		addcustomer.setString(6, cLogin);
		addcustomer.setString(7, cPassword);

		DBConnector.i = addcustomer.executeUpdate();
		if (DBConnector.i > 0) {
			System.out.println("Customer Created Successfully. You can Login.");
		} else {
			System.out.println("Please enter correct values or User already exists.");
		}

		// close all open resources, statements and connections at end.
		addcustomer.close();
		con.close();
		System.out.println("As you are our new user we give you a 50% discount coupan on your first order");
		voucher(cID);
	}

	public void voucher(String cID) throws ClassNotFoundException, SQLException {
	    String upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	    String lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
	    String numbers = "0123456789";

	    // combine all strings
	    String alphaNumeric = upperAlphabet + lowerAlphabet + numbers;

	    // create random string builder
	    StringBuilder sb = new StringBuilder();

	    // create an object of Random class
	    Random random = new Random();

	    // specify length of random string
	    int length = 7;

	    for(int i = 0; i < length; i++) {

	      // generate random index number
	      int index = random.nextInt(alphaNumeric.length());

	      // get character specified by index
	      // from the string
	      char randomChar = alphaNumeric.charAt(index);

	      // append the character to string builder
	      sb.append(randomChar);
	    }

	    String coupan = sb.toString();
	    randomDB(cID,coupan);
	}

	public void randomDB(String cID, String coupan) throws ClassNotFoundException, SQLException { 
		Connection con = DBConnector.getConnection();
		PreparedStatement voucherDet = con.prepareStatement("INSERT INTO Voucher (Customer_id, Coupan, Voucher_Status) VALUES (?,?,?)");
		voucherDet.setString(1, cID);
		voucherDet.setString(2, coupan);
		voucherDet.setString(3, "Active");

		DBConnector.i = voucherDet.executeUpdate();
		if (DBConnector.i > 0) {
			System.out.println("Your Coupan Code id "+coupan);
		} else {
			System.out.println("Error while doing so.");
		}
		voucherDet.close();
		con.close();
	}

	public void updatePassword(String cLoginID, String cCurrentPass, String cNewPass) throws ClassNotFoundException, SQLException {

			Connection con = DBConnector.getConnection();
			PreparedStatement updatePass = con.prepareStatement("UPDATE Customer SET Customer_Password = ? WHERE"
					+ " Customer_Login_id = ? and Customer_Password = ?");
			updatePass.setString(1, cNewPass);
			updatePass.setString(2, cLoginID);
			updatePass.setString(3, cCurrentPass);

			DBConnector.i = updatePass.executeUpdate();
			if (DBConnector.i > 0) {
				System.out.println("Password changed Successfully. Please Login again.");
			} else {
				System.out.println("Please enter correct Customer ID or User does not exists.");
			}

			// close all open resources, statements and connections at end.
			updatePass.close();
			con.close();
	}
	
	public void cancelOrders(Customer cs) throws ClassNotFoundException, SQLException {
		OrderService os = new OrderService();
		String custID = cs.getId();
		OrderDetails[] ods = customerOrderHistory(cs.getId());

		System.out.format("%-20s%-20s%-20s%-20s%-20s%-20s%-20s%-20s\n", "ORDER NO", "VENDOR ID", "CUSTOMER ID",
				"FOOD ID", "ORDER QTY", "ORDER STA DATE TIME", "ORDER VALUE", "ORDER STATUS");
		System.out.println(" ");
		for (OrderDetails o : ods)
			System.out.format("%-20d%-20d%-20s%-20d%-20d%-20s%-20d%-20s\n", o.getOrderNo(), o.getVenderId(),
					o.getCustomerId(), o.getFoodId(), o.getQuantity(), o.getDatetime(), o.getOrderValue(),
					o.getOrderStatus());
		System.out.println(" ");

		System.out.println("Please enter the Order ID to cancel the Order");
		int ordID = sc.nextInt();

		OrderDetails[] ordseek = os.validateOrders(ordID, custID);
		if (ordseek != null) {
			System.out.println("To cancel order press: 1 | To enter another OrderID press: 2 | To go back press: 3");
			int state = sc.nextInt();

			switch (state) {
			case 1:
				os.cancelOrders(ordID, custID);
				break;
			case 2:
				cancelOrders(cs);
				break;
			case 3:
				mp.customerProfile(cs);
				break;
			default:
				System.out.println("Invalid choice.");
			}
		}

		// return to customer profile with the logged in customer and object
		mp.customerProfile(cs);
	}
	
	public void rateOrder(Customer cs) throws ClassNotFoundException, SQLException {   // work in progress
		
		OrderService os = new OrderService();
		System.out.println("Please select a order to rate from below list");
		 
		OrderDetails[] od = customerOrderHistory(cs.getId());

		System.out.format("%-20s%-20s%-20s%-20s%-20s%-20s%-20s%-20s%-20s\n", "Customer Id", "Date-Time", "Food ID", "Order No.",
				"Order Status", "Order Value", "Quantity", "Vender ID","Order Rating");
		System.out.println(" ");
		for (OrderDetails o : od)
			System.out.format("%-20s%-20s%-20s%-20d%-20s%-20s%-20d%-20s%-20d\n", o.getCustomerId(), o.getDatetime(),
					o.getFoodId(), o.getOrderNo(), o.getOrderStatus(), o.getOrderValue(), o.getQuantity(),
					o.getVenderId(),o.getOrderRating());
		System.out.println(" ");
		System.out.println("Please enter order no: ");
		int ordNo = sc.nextInt();
		System.out.println("Please enter ratings out of 5 for our services: ");
		int ordRat = sc.nextInt();
		
		os.rateOrderSer(ordNo,ordRat);
		mp.customerProfile(cs);
	}

	public void viewOrderRating(Customer cs) throws ClassNotFoundException, SQLException {
		System.out.println("Please select a order to rate from below list");
		 
		OrderDetails[] od = customerOrderHistory(cs.getId());

		System.out.format("%-20s%-20s%-20s%-20s%-20s%-20s%-20s%-20s%-20s\n", "Customer Id", "Date-Time", "Food ID", "Order No.",
				"Order Status", "Order Value", "Quantity", "Vender ID","Order Rating");
		System.out.println(" ");
		for (OrderDetails o : od)
			System.out.format("%-20s%-20s%-20s%-20d%-20s%-20s%-20d%-20s%-20d\n", o.getCustomerId(), o.getDatetime(),
					o.getFoodId(), o.getOrderNo(), o.getOrderStatus(), o.getOrderValue(), o.getQuantity(),
					o.getVenderId(),o.getOrderRating());
		System.out.println(" ");
		mp.customerProfile(cs);	
	}
}