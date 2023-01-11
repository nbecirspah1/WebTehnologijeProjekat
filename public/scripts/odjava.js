window.onload = function () {
    const form = document.getElementById('logoutButton');

    console.log("Usao u onload od logouta");
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        console.log("Usao u listener od logouta");
        PoziviAjax.postLogout(odjava);
  
        // console.log("Username", username);
    });

}

function odjava(xhr) {
    if (xhr.readyState == 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.response);

        if (response.success) {
            window.location.href = '/html/prijava.html';
            //window.location.replace("/predmet.html");
            

        } else {
            alert(response.message);

        }
    } 
}

