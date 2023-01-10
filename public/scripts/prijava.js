var username;
var password;


window.onload = function () {
    const form = document.getElementById('login-form');

    console.log("Usao u onload");
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        console.log("Usao u listener");
        username = form.elements.username.value;
        password = form.elements.password.value;
         PoziviAjax.postLogin(username, password, prijava);
  
        // console.log("Username", username);
    });

}

function prijava(xhr) {
    if (xhr.readyState == 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.response);

        if (response.success) {
            window.location.href = '/html/predmet.html';
            //window.location.replace("/predmet.html");
            

        } else {
            alert(response.message);

        }
    } 
}






