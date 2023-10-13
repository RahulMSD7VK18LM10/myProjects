package com.hexaware.cms.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class DBConnector {
	public static int i;
    public static String url = "jdbc:mysql://localhost:3306/CMSDB78072";
	public static String username = "root";
	public static String password = "Rahul@2812";
	public static Connection getConnection() throws SQLException, ClassNotFoundException {
		Connection con = null;
		con = DriverManager.getConnection(url,username,password);
		return con;
	}
} 
