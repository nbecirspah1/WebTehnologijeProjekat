
const form = document.getElementById('login-form');
var username;
var password;

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log("Usao u listener");
    username = form.elements.username.value;
    password = form.elements.password.value;
    PoziviAjax.postLogin(username, password, prijava);

    // console.log("Username", username);
});



function prijava(xhr) {
    if (xhr.readyState == 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.response);

        if (response.success) {
            window.location.href='http://localhost:3000/predmeti.html';
           // window.location.replace("/predmeti");
           

        } else {
            alert(response.poruka);

        }
    }
}






