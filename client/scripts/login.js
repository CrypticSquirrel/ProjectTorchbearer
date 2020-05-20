const LOGIN_URL = 'http://localhost:3000/auth/login';

$(document).ready(function () {
    $('#login').click(function (event) {
        event.preventDefault();
        login();
    });
});

/* ---------------------------------------- Handles Login --------------------------------------- */

function login() {
    var username = $('#username').val();
    var password = $('#pwd').val();

    const body = {
        username,
        password,
    };

	/**
	 * Makes a POST request to server @localhost:3000/auth/login with login info. 
	 * Returns a token to store in local memory. This will be their identifier in our site.
	 * @todo redirect user when successful login
	 */
    fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((error) => {
                throw new Error(error.message);
            });
        })
        .then((result) => {
            console.log(`token: ${result.token}`);
            localStorage.token = result.token;
            // window.location.href = "url/to/homepage";
        })
        .catch((error) => {
            console.log(`error: ${error}`);
            alert(error.message);
        });
}
