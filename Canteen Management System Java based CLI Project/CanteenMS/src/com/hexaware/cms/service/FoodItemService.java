package com.hexaware.cms.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;
import java.sql.Statement;

import com.hexaware.cms.entities.FoodItems;
import com.hexaware.cms.entities.Vendor;
import com.hexaware.cms.interfaces.FoodItemsProvider;
import com.hexaware.cms.util.DBConnector;
import com.hexaware.cms.util.Menupro;


public class FoodItemService implements FoodItemsProvider {
	
	Scanner sc = new Scanner(System.in);
	Menupro mp = new Menupro();
	

	public FoodItems[] showFoodMenu() throws SQLException, ClassNotFoundException {
		FoodItems m[] = null;
		
		Connection con = DBConnector.getConnection();

		Statement sfm = con.createStatement();

		ResultSet rs = sfm.executeQuery("SELECT * FROM Menu");
		ArrayList<FoodItems> list = new ArrayList<FoodItems>();
		while (rs.next()) {
			FoodItems menu = new FoodItems(rs.getInt("Food_ID"), rs.getString("Food_Name"), rs.getInt("Food_Price"),
					rs.getInt("Vendor_id"),rs.getInt("Calorie"));
			list.add(menu);
		}
		m = new FoodItems[list.size()];
		m = list.toArray(m);

		// close all open resources, statements and connections at end.
		rs.close();
		sfm.close();
		con.close();
		return m;
	}

	public FoodItems[] showFoodMenu(int vID) throws ClassNotFoundException, SQLException {
		FoodItems m[] = null;
		
		Connection con = DBConnector.getConnection();

		PreparedStatement showFoodMenu = con.prepareStatement("SELECT * FROM Menu WHERE Vendor_id = ?");
		showFoodMenu.setInt(1, vID);

		ResultSet rs = showFoodMenu.executeQuery();

		ArrayList<FoodItems> list = new ArrayList<FoodItems>();
		while (rs.next()) {
			FoodItems venMenu = new FoodItems(rs.getInt("Food_ID"), rs.getString("Food_Name"), rs.getInt("Food_Price"),
					rs.getInt("Vendor_id"), rs.getInt("Calorie"));
			list.add(venMenu);
		}
		m = new FoodItems[list.size()];
		m = list.toArray(m);

		// close all open resources, statements and connections at end.
		rs.close();
		showFoodMenu.close();
		con.close();
		return m;
	}
	
	public void addNewItem(Vendor ven, int vID) throws ClassNotFoundException, SQLException {
		FoodItems m[] = null;
		
		Connection con = DBConnector.getConnection();

		PreparedStatement showFoodMenu = con.prepareStatement("SELECT * FROM Menu WHERE Vendor_id = ?");
		showFoodMenu.setInt(1, vID);

		ResultSet rs = showFoodMenu.executeQuery();

		ArrayList<FoodItems> list = new ArrayList<FoodItems>();
		while (rs.next()) {
			FoodItems venMenu = new FoodItems(rs.getInt("Food_ID"), rs.getString("Food_Name"), rs.getInt("Food_Price"),
					rs.getInt("Vendor_id"), rs.getInt("Calorie"));
			list.add(venMenu);
		}
		m = new FoodItems[list.size()];
		m = list.toArray(m);

		// close all open resources, statements and connections at end.
		rs.close();
		showFoodMenu.close();
		con.close();
		System.out.format("%-10s%-25s%-11s%-11s\n", "Food Id", "Food Name", "Food Price", " VendorId");
		System.out.println(" ");
		for (int i = 0; i < m.length; i++)
			System.out.format("%-10d%-25s%-15d%-11d\n", m[i].getFoodId(), m[i].getFoodName(), m[i].getFoodPrice(),
					m[i].getVendorId());
		System.out.println(" ");
		System.out.println("Enter Food Item Name: ");
		String fName = sc.next();
		fName+=sc.nextLine();
		System.out.println("Enter FoodID to add: ");
		int fID = sc.nextInt();
		System.out.println("Enter Food Item Price: ");
		int fPrice = sc.nextInt();
		System.out.println("Enter Food Item Calorie: ");
		int fCalorie=sc.nextInt();
		insertNewFoodItem(ven, fName, fID, fPrice, vID, fCalorie);
	}

	public void insertNewFoodItem(Vendor ven, String fName, int fID, int fPrice, int vID, int fCalorie) throws ClassNotFoundException, SQLException {

			Connection con = DBConnector.getConnection();
			PreparedStatement addFoodItem = con.prepareStatement("INSERT INTO Menu VALUES (?,?,?,?,?)");
			addFoodItem.setInt(1, fID);
			addFoodItem.setString(2, fName);
			addFoodItem.setInt(3, fPrice);
			addFoodItem.setInt(4, vID);
			addFoodItem.setInt(5, fCalorie);

			DBConnector.i = addFoodItem.executeUpdate();
			if (DBConnector.i > 0) {
				System.out.println("Food Item added Successfully.");
				System.out.println("To add more press 1 else press any key");
				int choi = sc.nextInt();
				if(choi==1) {
					addNewItem(ven, vID);
				}else {
					mp.vendorProfile(ven, vID);
				}
				
			} else {
				System.out.println("Please enter correct values or Item already exists.");
			}

			// close all open resources, statements and connections at end.
			addFoodItem.close();
			con.close();
	}

	public void updateItemPrice(Vendor ven, int vID) throws ClassNotFoundException, SQLException {
		FoodItems m[] = null;
		
		Connection con = DBConnector.getConnection();

		PreparedStatement showFoodMenu = con.prepareStatement("SELECT * FROM Menu WHERE Vendor_id = ?");
		showFoodMenu.setInt(1, vID);

		ResultSet rs = showFoodMenu.executeQuery();

		ArrayList<FoodItems> list = new ArrayList<FoodItems>();
		while (rs.next()) {
			FoodItems venMenu = new FoodItems(rs.getInt("Food_ID"), rs.getString("Food_Name"), rs.getInt("Food_Price"),
					rs.getInt("Vendor_id"), rs.getInt("Calorie"));
			list.add(venMenu);
		}
		m = new FoodItems[list.size()];
		m = list.toArray(m);

		// close all open resources, statements and connections at end.
		rs.close();
		showFoodMenu.close();
		con.close();
		System.out.format("%-10s%-25s%-11s%-11s\n", "Food Id", "Food Name", "Food Price", " VendorId");
		System.out.println(" ");
		for (int i = 0; i < m.length; i++)
			System.out.format("%-10d%-25s%-15d%-11d\n", m[i].getFoodId(), m[i].getFoodName(), m[i].getFoodPrice(),
					m[i].getVendorId());
		System.out.println(" ");
		System.out.println("Enter FoodID to update price: ");
		int fID = sc.nextInt();
		System.out.println("Enter new price of  Food Item: ");
		int fPrice = sc.nextInt();

		updatdeFoodItem(ven, fID, fPrice, vID);
	}

	public void updatdeFoodItem(Vendor ven, int fID, int fPrice, int vID) throws ClassNotFoundException, SQLException {
		Connection con = DBConnector.getConnection();
		PreparedStatement updateFoodItem = con.prepareStatement("UPDATE Menu SET Food_Price = ? WHERE" + " Vendor_id = ? and Food_id = ?");
		updateFoodItem.setInt(1, fPrice);
		updateFoodItem.setInt(2, vID);
		updateFoodItem.setInt(3, fID);

		DBConnector.i = updateFoodItem.executeUpdate();
		if (DBConnector.i > 0) {
			System.out.println("Food Price updated Successfully.");
			System.out.println("To update more press 1 else press any key");
			int choi = sc.nextInt();
			if(choi==1) {
				updateItemPrice(ven, vID);
			}else {
				mp.vendorProfile(ven, vID);
			}
			
		} else {
			System.out.println("Please enter correct values or Item already exists.");
		}

		// close all open resources, statements and connections at end.
		updateFoodItem.close();
		con.close();
	}

}
