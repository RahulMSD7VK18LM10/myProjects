package com.hexaware.cms.main;

import java.sql.SQLException;
import java.util.Scanner;

import com.hexaware.cms.util.Menupro;

public class Mainpro {
	static Scanner sc = new Scanner(System.in);

	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		boolean inloop = true;
		Menupro mp = new Menupro();

		while (inloop) {

			System.out.println("======================================");
			System.out.println("Canteen Management System");
			System.out.println("=======================================");
			System.out.println("1. For User Login");
			System.out.println("2. For Vendor Login");
			System.out.println("3. For New Customer Registration");
			System.out.println("4. For New Vendor Registration");
			System.out.println("5. For Customer Password Change");
			System.out.println("6. For Vendor Password Change");
			System.out.println("7. Exit Program");
			System.out.println("\n");
			System.out.println("Please enter your choice");
			System.out.println(" ");

			int choice = sc.nextInt();
			sc.nextLine();
			switch (choice) {
			case 1:
				mp.customerLogin();
				break;
			case 2:
				mp.vendorLogin();
				break;
			case 3:
				mp.newCustomer();
				break;
			case 4:
				mp.newVendor();
				break;
			case 5:
				mp.newCustomerPassword();
				break;
			case 6:
				mp.newVendorPassword();
				break;
			case 7:
				System.out.println("Thank you for using the application.");
				System.out.println("We hope to see you soon.");
				inloop = false;
				Runtime.getRuntime().halt(0);
				break;
			default:
				System.out.println("Choose again: ");
			}
		}
	}
}

// 2065ines of code