/*
$(document).ready(function() {
	alert("jquery loaded");
}); */
$(document).ready(function() {
	getloginvalues();
	getsignupvalues(); 
}); 
//element selectors
function getloginvalues() {
	var username = $("#username").val();
	var password = $("#pwd").val();
	
	//Check:
	alert(
	"username: " + username + "  password: " + password
	); 
	
}

function getsignupvalues() {
	var email = $("#email").val();
	var password = $("#pwd").val();
	var confirmpwd = $("#cpwd").val();
	
	//Check:
	alert(
	"username: " + email + 
	"\npassword: " + password +
	"\nconfirmed password: " + confirmpwd

	); 
	
}
