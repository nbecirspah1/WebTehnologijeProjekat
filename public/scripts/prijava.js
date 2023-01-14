
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

document.getElementById('username').addEventListener('click', e => {
    e.preventDefault();
    if(document.getElementById('alertPoruka') != null){
        document.getElementById('alertPoruka').remove();
    }
 
    // console.log("Username", username);
})

document.getElementById('password').addEventListener('click', e => {
    e.preventDefault();
    if(document.getElementById('alertPoruka') != null){
        document.getElementById('alertPoruka').remove();
    }
 
    // console.log("Username", username);
})

document.getElementById('username').addEventListener('select', e => {
    e.preventDefault();
    if(document.getElementById('alertPoruka') != null){
        document.getElementById('alertPoruka').remove();
    }
 
    // console.log("Username", username);
})

document.getElementById('password').addEventListener('select', e => {
    e.preventDefault();
    if(document.getElementById('alertPoruka') != null){
        document.getElementById('alertPoruka').remove();
    }
 
    // console.log("Username", username);
})

function prijava(err, data) {
    if(err){
        const err1 = JSON.parse(err);
       
        alert(err1.poruka);
        return;
    }
        const podaci = JSON.parse(data);
        if(podaci.poruka == "Neuspješna prijava"){
            if(document.getElementById('alertPoruka') == null){
                let div = document.createElement('div')
                form.appendChild(div)
                div.appendChild(document.createElement('p')).innerHTML = podaci.poruka;
                div.setAttribute("id", "alertPoruka");
                //alert(podaci.poruka);
                }
    
        }else{
         window.location.href='http://localhost:3000/predmeti.html';
        }
           // window.location.replace("/predmeti");
}






