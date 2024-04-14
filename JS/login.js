const userList = JSON.parse(localStorage.getItem('userList')) || [];

console.log(userList);


function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function register() {
    
    const newUsername = document.getElementById('new_username').value;
    const newPassword = document.getElementById('new_password').value;

    if (userList.some(user => user.username === newUsername)) {
        alert("This username is taken. Try another.");
        return;
    }

    const user = {
        username: newUsername,
        password: newPassword
    }
    userList.push(user)
    localStorage.setItem('userList', JSON.stringify(userList))
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //correct_login@example.com
    //C0rr3Ct_P@55w0rd
    if (username && password) {
        fetch('https://recruitment-api.pyt1.stg.jmr.pl/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: username,
                password: password
            })
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(response => {
            if (response.status == "ok") {
                alert ("Success!!")
                redirectToNewPage();
            }
            
            else throw new Error ("Fail!!")
        })
        .catch (error => alert ("Fail!!"))
    }

}

function redirectToNewPage() {
    window.location.href = "./index.html";
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("open_register").addEventListener("click", register);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login_page").addEventListener("click", redirectToLogin);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("open_login").addEventListener("click", login);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("register_page").addEventListener("click", redirectToRegister);
});

function redirectToRegister() {

    document.getElementById("open_login").style.display = 'none';
    document.getElementById("open_register").style.display = 'flex';
    document.getElementById("login_area").style.display = 'none';
    document.getElementById("register_area").style.display = 'flex';

    document.getElementById("register_style").style.borderBottom = '2px solid #11698E'
    document.getElementById("login_style").style.borderBottom = 'none'
}

function redirectToLogin() {

    document.getElementById("open_login").style.display = 'flex';
    document.getElementById("open_register").style.display = 'none';
    document.getElementById("login_area").style.display = 'flex';
    document.getElementById("register_area").style.display = 'none';

    document.getElementById("register_style").style.borderBottom = 'none'
    document.getElementById("login_style").style.borderBottom = '2px solid #11698E'

}


