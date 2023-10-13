function validatePayment(event) {
	
	let ANO = document.getElementById("acc").value;
	let IFSCODE = document.getElementById("IFSC").value;
	
	let anoErr = document.querySelector("#anoErr");
	let ifscodeErr = document.querySelector("#ifscodeErr");
	
	let validationFlag = true;
	if (ANO == "" || ANO == null) {
		validationFlag = false;
		anoErr.innerHTML = "Account Number cannot be empty";
		anoErr.style.color = "red";
		event.preventDefault();
		} 
	else {
		anoErr.innerHTML = "";
		validationFlag = true;
	}
	if (IFSCODE == "" || IFSCODE == null) {
		validationFlag = false;
		ifscodeErr.innerHTML = "IFSC code cannot be empty";
		ifscodeErr.style.color = "red";
		event.preventDefault();
	} 
	else {
		ifscodeErr.innerHTML = "";
		validationFlag = true;
	}
	return validationFlag;	
}
