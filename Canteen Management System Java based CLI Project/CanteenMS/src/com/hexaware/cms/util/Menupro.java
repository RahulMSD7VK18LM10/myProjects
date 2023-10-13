package com.hexaware.cms.util;

import java.sql.SQLException;
import java.util.Scanner;

import com.hexaware.cms.entities.Customer;
import com.hexaware.cms.entities.Vendor;
import com.hexaware.cms.main.Mainpro;
import com.hexaware.cms.service.CustomerService;
import com.hexaware.cms.service.FoodItemService;
import com.hexaware.cms.service.OrderService;
import com.hexaware.cms.service.VendorService;

public class Menupro {
	Scanner sc = new Scanner(System.in);
	
	public void customerLogin() throws ClassNotFoundException, SQLException {
		
		CustomerService cus = new CustomerService();
		System.out.println("Please enter your customer Login ID:");
		String cLoginID = sc.next();
		System.out.println("Please enter your password:");
		String cPass = sc.next();

		Customer cs = cus.validateCustomerLogin(cLoginID, cPass);

		customerProfile(cs);
		
	}
	public void customerProfile(Customer cs) throws ClassNotFoundException, SQLException {
		CustomerService cus = new CustomerService();
		if (cs != null) {
			String cID = cs.getId();
			System.out.println("------------------------------------------------------");
			System.out.println("Canteen Management System || Customer ID: " + cID);
			System.out.println("-------------------------------------------------------");

			System.out.println("1. Show Food Menu");
			System.out.println("2. Place an Order");
			System.out.println("3. View Order History");
			System.out.println("4. Cancel Order");
			System.out.println("5. View Profile");
			System.out.println("6. Check Wallet Balance");
			System.out.println("7. Recharge Wallet.");
			System.out.println("8. Rate your Orders.");
			System.out.println("9. Logout.");
			System.out.println("\n");
			System.out.println("Please enter your choice");

			int choice = sc.nextInt();
			sc.nextLine();

			switch (choice) {
			case 1:
				cus.menuList(cs);
				break;
			case 2:
				cus.placeOrder(cs);
				break;
			case 3:
				cus.viewOrderHistory(cs);
				break;
			case 4:
				cus.cancelOrders(cs);
				break;
			case 5:
				cus.viewCustomerProfile(cs);
				break;
			case 6:
				cus.viewWalletBalance(cs,cID);
				break;
			case 7:
				cus.rechargeWallet(cs,cID);
			case 8:
				System.out.println("Press 1 to Rate an Order");
				System.out.println("Press 2 to view previous Orders Ratings");
				int cho= sc.nextInt();
				switch(cho) {
				case 1:
					cus.rateOrder(cs);
					break;
				case 2:
					cus.viewOrderRating(cs);
				}
			case 9:	
				System.out.println("Log out Succesfull....");
				Mainpro.main(null);
				break;
			default:
				System.out.println("Choose again: ");
			}
		} else {
			System.out.println("Invalid Credentials");
		}
		
	}
	
	public void newCustomer() throws ClassNotFoundException, SQLException {
		CustomerService cus = new CustomerService();
		System.out.println("Please enter Customer ID:");
		String cID = sc.next();
		System.out.println("Please enter Customer Name:");
		String cName = sc.next();
		cName+=sc.nextLine();
		System.out.println("Please enter Customer Phone:");
		String cPhone = sc.next();
		System.out.println("Please enter Customer Email:");
		String cEmail = sc.next();

		System.out.println("Please enter Wallent Balance Amount:");
		int walletBalance = sc.nextInt();
		if(walletBalance<0) {
			System.out.println("Please enter a valid wallet balance");
			System.out.println("Please try again");
			Mainpro.main(null);
		}
		System.out.println("Please select a LoginID:");
		String cLogin = sc.next();
		System.out.println("Please select a Password:");
		String cPassword = sc.next();

		// Sending inputs to database method
		cus.insertnewCustomer(cID, cName, cPhone, cEmail, walletBalance, cLogin, cPassword);
	}
	
	public void newCustomerPassword() throws ClassNotFoundException, SQLException {
		CustomerService cus = new CustomerService();
		System.out.println("Please enter your customer LoginID:");
		String cLoginID = sc.next();
		System.out.println("Please enter current password:");
		String cCurrentPass = sc.next();
		System.out.println("Please enter new password:");
		String cNewPass = sc.next();

		cus.updatePassword(cLoginID, cCurrentPass, cNewPass);

		System.out.println("Logging out...");

		Mainpro.main(null);
	}
	/*===============================================================================*/
	
	public void vendorLogin() throws ClassNotFoundException, SQLException {
		
		VendorService vs = new VendorService();
		Vendor[] venArray = vs.vendorProfile();

		System.out.format("%-20s%-20s\n", "Vendor Id", "Vendor Name");
		System.out.println(" ");
		for (Vendor v : venArray)
			System.out.format("%-20d%-20s\n", v.getvId(), v.getvName());
		System.out.println(" ");

		System.out.println("Please enter your Vendor ID:");
		int vID = sc.nextInt();
		System.out.println("Please enter Vendor password:");
		String vPass = sc.next();

		Vendor ven = vs.validateVendor(vID, vPass);
		vendorProfile(ven, vID);
	}
	public void vendorProfile(Vendor ven, int vID) throws ClassNotFoundException, SQLException {
		VendorService vs = new VendorService();
		OrderService os = new OrderService();
		FoodItemService fis = new FoodItemService();
		if (ven != null) {

			System.out.println("-----------------------------------------------");
			System.out.println("Canteen Management System || Vendor ID: " + vID);
			System.out.println("-----------------------------------------------");

			System.out.println("1. Show Food Menu");
			System.out.println("2. Accept or Reject an Order");
			System.out.println("3. View Order History");
			System.out.println("4. Edit Food in Menu");
			System.out.println("5. View Profile");
			System.out.println("6. Logout.");
			System.out.println("\n");
			System.out.println("Please enter your choice");

			int choice = sc.nextInt();
			sc.nextLine();

			switch (choice) {
			case 1:
				vs.menuList(ven, vID);
				break;
			case 2:
				vs.acceptOrRejectOrders(ven.getvId(), ven);
				break;
			case 3:
				os.viewOrderHistory(ven);
				break;
			case 4:
				System.out.println("To add new item press 1:");
				System.out.println("To update price of any item in menu press 2:");
				int c = sc.nextInt();
				if(c==1) {
					fis.addNewItem(ven, vID);
				}else if(c==2){
					fis.updateItemPrice(ven, vID);
				}
				break;
			case 5:
				vs.viewVendorProfile(ven);
				break;
			case 6:
				Mainpro.main(null);
				break;
			default:
				System.out.println(" Invalid choice. ");
			}
		} else {
			System.out.println(" Invalid Vendor id");
		}
	}
	
	public void newVendorPassword() throws ClassNotFoundException, SQLException {
		VendorService vs = new VendorService();
		System.out.println("Please enter your Vendor ID:");
		int vID = sc.nextInt();
		System.out.println("Please enter current password:");
		String vCurrentPass = sc.next();
		System.out.println("Please enter new password:");
		String vNewPass = sc.next();

		vs.updatePassword(vID, vCurrentPass, vNewPass);

		System.out.println("Logging out...");

		Mainpro.main(null);
	}
	public void newVendor() throws ClassNotFoundException, SQLException {
		VendorService vs = new VendorService();
		FoodItemService fis = new FoodItemService(); 
		Vendor ven = new Vendor();
		System.out.println("Please enter Vendor ID:");
		int vID = sc.nextInt();
		
		System.out.println("Please enter Vendor Name:");
		String vName= sc.nextLine();
        vName+=sc.nextLine();
        
		System.out.println("Please enter Vendor Phone:");
		String vPhone = sc.next();
		
		System.out.println("Please enter Vendor Specializations:");
		String vSpecs = sc.next();
		
		System.out.println("Please select a Password:");
		String vPassword = sc.next();

		// Sending inputs to database method
		vs.insertnewVendor(vID, vName, vPhone, vSpecs, vPassword);
		System.out.println("To proceed to add food items press 1 else press any key to exit");
		int choice = sc.nextInt();
		if(choice==1) {
			fis.addNewItem(ven, vID);
		}else {
			Mainpro.main(null);
		}
	}
		
}
