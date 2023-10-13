package com.hexaware.cms.interfaces;

import java.sql.SQLException;
import com.hexaware.cms.entities.OrderDetails;
import com.hexaware.cms.entities.Vendor;

public interface VendorProvider {
	public Vendor[] vendorProfile() throws ClassNotFoundException, SQLException;
	public Vendor validateVendor(int vID, String vPass) throws ClassNotFoundException, SQLException;
	public void menuList(Vendor ven, int vID) throws ClassNotFoundException, SQLException;
	public void viewVendorProfile(Vendor ven) throws ClassNotFoundException, SQLException;
	public OrderDetails[] vendorOrderHistory(int getvId) throws SQLException, ClassNotFoundException;
	public void updatePassword(int vID, String vCurrentPass, String vNewPass) throws ClassNotFoundException, SQLException;
	public void insertnewVendor(int vID, String vName, String vPhone, String vSpecs, String vPassword) throws ClassNotFoundException, SQLException;
	public void acceptOrRejectOrders(int vId, Vendor ven) throws ClassNotFoundException, SQLException;
}