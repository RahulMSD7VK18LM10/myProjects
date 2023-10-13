function validateData(event) {

    let Name = document.getElementById("Name").value;
    let Age = document.getElementById("Age").value;
	let Contact = document.getElementById("number").value;
    let DOJ = document.getElementById("Date").value;
	let Source = document.getElementById("Source").value;
    let Destination = document.getElementById("Destination").value;
	let NOS = document.getElementById("Number").value;
	
    
	let nameErr = document.querySelector("#nameErr");
    let ageErr = document.querySelector("#ageErr");
	let contactErr = document.querySelector("#contactErr");
	let dojErr = document.querySelector("#dojErr");
	let sourceErr = document.querySelector("#sourceErr");
	let destinationErr = document.querySelector("#destinationErr");
	let nosErr = document.querySelector("#nosErr");
	

    let validationFlag = true;
    if (Name == "" || Name == null) {
        validationFlag = false;
        nameErr.innerHTML = "Name should not be empty";
        nameErr.style.color = "red";
        event.preventDefault();
    } 
    else {
        nameErr.innerHTML = "";
        validationFlag = true;
    }
	if (Age == "" || Age == null) {
        validationFlag = false;
        ageErr.innerHTML = "Age should not be empty";
        ageErr.style.color = "red";
        event.preventDefault();
    } 
    else {
        ageErr.innerHTML = "";
        validationFlag = true;
    }
	if (Contact == "" || Contact == null) {
        validationFlag = false;
        contactErr.innerHTML = "Contact No. should not be empty";
        contactErr.style.color = "red";
        event.preventDefault();
    } 
    else {
        contactErr.innerHTML = "";
        validationFlag = true;
    }
	if (DOJ == "" || DOJ == null) {
        validationFlag = false;
        dojErr.innerHTML = "Date should not be empty";
        dojErr.style.color = "red";
        event.preventDefault();
    } 
    else {
        dojErr.innerHTML = "";
        validationFlag = true;
    }
	if (Source == "" || Source == null) {
        validationFlag = false;
        sourceErr.innerHTML = "Source should not be empty";
        sourceErr.style.color = "red";
        event.preventDefault();
    } 
    else {
        sourceErr.innerHTML = "";
        validationFlag = true;
    }
	if (Destination == "" || Destination == null) {
        validationFlag = false;
        destinationErr.innerHTML = "Destination should not be empty";
        destinationErr.style.color = "red";
        event.preventDefault();
    } 
    else {
        destinationErr.innerHTML = "";
        validationFlag = true;
    }
	if (NOS == "" || NOS == null) {
        validationFlag = false;
        nosErr.innerHTML = "Number of Seats should not be empty";
        nosErr.style.color = "red";
        event.preventDefault();
    } 
    else {
        nosErr.innerHTML = "";
        validationFlag = true;
    }
    return validationFlag;

}