function validateForm(event) {

    let userName = document.getElementById("userName").value;
    let password = document.querySelector("#password").value;
    
	let usernameErr = document.querySelector("#userNameErr");
    let passwordErr = document.querySelector("#passwordErr");

    let validationFlag = true;
    if (userName == "" || userName == null) {
        validationFlag = false;
        usernameErr.innerHTML = "UserName should not be empty";
        usernameErr.style.color = "red";
        event.preventDefault();
    } else if (userName != "Rahul") {
        validationFlag = false;
        usernameErr.innerHTML = "Invalid credentials";
        usernameErr.style.color = "red";
        event.preventDefault();
    } else {
        usernameErr.innerHTML = "";
        validationFlag = true;
    }


    if (password == "" || password == null) {
        validationFlag = false;
        passwordErr.innerHTML = "Password should not be empty";
        passwordErr.style.color = "red";
        event.preventDefault();
    } else if (password != "28122000"){
        validationFlag = false;
        passwordErr.innerHTML = "Invalid credentials";
        passwordErr.style.color = "red";
        event.preventDefault();
    } else {
        passwordErr.innerHTML = "";
        validationFlag = true;
    }

    return validationFlag

}