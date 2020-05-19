
$(document).ready(function() {
	$('#login').click(function () {
        getloginvalues();
    });
}); 

/* -------------------------------------- Element Selectors ------------------------------------- */

function getloginvalues() {
	var username = $("#username").val();
	var password = $("#pwd").val();
	
	
	//Check:
	alert(
	"username: " + username + "  password: " + password
	); 
}

