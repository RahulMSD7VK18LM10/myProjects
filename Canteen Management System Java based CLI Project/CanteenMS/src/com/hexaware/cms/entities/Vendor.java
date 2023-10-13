package com.hexaware.cms.entities;

public class Vendor {
	  private int vId;
	  private String vName;
	  private String vPhone;
	  private String vSpecs;
	public int getvId() {
		return vId;
	}
	public void setvId(int vId) {
		this.vId = vId;
	}
	public String getvName() {
		return vName;
	}
	public void setvName(String vName) {
		this.vName = vName;
	}
	public String getvPhone() {
		return vPhone;
	}
	public void setvPhone(String vPhone) {
		this.vPhone = vPhone;
	}
	public String getvSpecs() {
		return vSpecs;
	}
	public void setvSpecs(String vSpecs) {
		this.vSpecs = vSpecs;
	}
	public Vendor(int vId, String vName, String vPhone, String vSpecs) {
		super();
		this.vId = vId;
		this.vName = vName;
		this.vPhone = vPhone;
		this.vSpecs = vSpecs;
	}
	public Vendor() {
		super();
	}
	@Override
	public String toString() {
		return "Vendor [vId=" + vId + ", vName=" + vName + ", vPhone=" + vPhone + ", vSpecs=" + vSpecs + "]";
	}
}
