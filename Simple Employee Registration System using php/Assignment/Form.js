$.validator.addMethod("lowercheck", function(value) {
    return /^(?=.*[a-z])/.test(value)
});
$.validator.addMethod("uppercheck", function(value) {
    return /^(?=.*[A-Z])/.test(value)
});
$.validator.addMethod("numbercheck", function(value) {
    return /^(?=.*[0-9])/.test(value)
});
$.validator.addMethod("speccheck", function(value) {
    return /^(?=.*[!@#\$%\^&\*])/.test(value)
});

jQuery('#form').validate({
    rules: {
        name: "required",
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 8,
            lowercheck: true,
            uppercheck: true,
            numbercheck: true,
            speccheck: true
        },
    },
    messages: {
        name: "UserName is Required",
        email: {
            required: "Email  is Required",
            email: "Please enter valid email",
        },
        password: {
            required: "Password is Required",
            minlength: "Password must be 8 characters long",
            lowercheck: "Must Contain Lower case",
            uppercheck: "Must Contain Upper case",
            numbercheck: "Must contain a number",
            speccheck: "Must contain a special character"
        },
    },
    submitHandler: function(form) {
        form.submit();
    }
});