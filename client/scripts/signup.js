
$(document).ready(function () {
    $('#signup').click(function () {
        getsignupvalues();
    });
});

/* -------------------------------------- Element Selectors ------------------------------------- */

function getsignupvalues() {
    var email = $('#email').val();
    var password = $('#pwd').val();
    var confirmpwd = $('#cpwd').val();

    //Check:
    alert('email: ' + email + '  password: ' + password);
}
