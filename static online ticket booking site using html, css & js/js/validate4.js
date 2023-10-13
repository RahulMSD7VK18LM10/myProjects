function validateOtp(event) {
	
	let OTP = document.getElementById("OTP").value;
	
	let otpErr = document.querySelector("#otpErr");

	if (OTP == "" || OTP == null) {
		validationFlag = false;
		otpErr.innerHTML = "Please enter an otp then proceed";
		otpErr.style.color = "red";
		event.preventDefault();
	} 
	else {
		otpErr.innerHTML = "";
		validationFlag = true;
	}
	return validationFlag;	
}
