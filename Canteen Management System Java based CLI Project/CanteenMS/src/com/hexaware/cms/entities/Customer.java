package com.hexaware.cms.entities;

public class Customer {
	  private String Id;
	  private String cName;
	  private String cPhone;
	  private String cEmail;
	  private int cWalletBalance;
	  private String cLoginId;
	  private String cPassword;
	public String getId() {
		return Id;
	}
	public void setId(String id) {
		Id = id;
	}
	public String getcName() {
		return cName;
	}
	public void setcName(String cName) {
		this.cName = cName;
	}
	public String getcPhone() {
		return cPhone;
	}
	public void setcPhone(String cPhone) {
		this.cPhone = cPhone;
	}
	public String getcEmail() {
		return cEmail;
	}
	public void setcEmail(String cEmail) {
		this.cEmail = cEmail;
	}
	public int getcWalletBalance() {
		return cWalletBalance;
	}
	public void setcWalletBalance(int cWalletBalance) {
		this.cWalletBalance = cWalletBalance;
	}
	public String getcLoginId() {
		return cLoginId;
	}
	public void setcLoginId(String cLoginId) {
		this.cLoginId = cLoginId;
	}
	public String getcPassword() {
		return cPassword;
	}
	public void setcPassword(String cPassword) {
		this.cPassword = cPassword;
	}
	public Customer(String id, String cName, String cPhone, String cEmail, int cWalletBalance, String cLoginId,
			String cPassword) {
		super();
		Id = id;
		this.cName = cName;
		this.cPhone = cPhone;
		this.cEmail = cEmail;
		this.cWalletBalance = cWalletBalance;
		this.cLoginId = cLoginId;
		this.cPassword = cPassword;
	}
	public Customer() {
		super();
	}
	@Override
	public String toString() {
		return "Customer [Id=" + Id + ", cName=" + cName + ", cPhone=" + cPhone + ", cEmail=" + cEmail
				+ ", cWalletBalance=" + cWalletBalance + ", cLoginId=" + cLoginId + ", cPassword=" + cPassword + "]";
	}
}
