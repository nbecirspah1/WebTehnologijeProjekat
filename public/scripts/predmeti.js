window.onload = function () {
    // const form = document.getElementById('logoutButton');

    let lista = document.getElementById('listaPredmeta');
    PoziviAjax.getPredmeti(getPredmeti1);

   
}
function odjava(xhr) {
    if (xhr.readyState == 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.response);

        if (response.success) {
            window.location.href = 'http://localhost:3000/prijava.html';
            //window.location.replace("/predmet.html");


        } else {
            alert(response.message);

        }
    }
}


function getPredmeti1(xhr) {
    if (xhr.readyState == 4 && xhr.status === 200) {
        const response = xhr.response;

        if (response.success) {
            let predmeti = response.predmeti;
            
                let lista = document.getElementById('listaPredmeta');
                for (let predmet of predmeti) {
                    let element = document.createElement('li')
                    lista.appendChild(element).innerHTML = predmet;
                    element.addEventListener('click', e => {
                        e.preventDefault();
                      //  window.location.href = 'http://localhost:3000/premdet.html';
                        
                        PoziviAjax.getPredmet(element.textContent, getPredmet1);
                    });
                
                }
                let button = document.createElement('button');
                lista.appendChild(button).innerHTML = 'Odjavite se';
                button.id = "logoutButton";
                button.addEventListener('click', e => {
                    e.preventDefault();
                    PoziviAjax.postLogout(odjava);
                    window.location.href = 'http://localhost:3000/prijava.html';
                   // window.location.href = 'http://localhost:3000/predmet.html';
                });
            
              
            
        }else{
        alert(response.greska);
        window.location.href = 'http://localhost:3000/prijava.html'
        }

    } 
}

function getPredmet1(xhr){
    if (xhr.readyState == 4 && xhr.status === 200) {
        const response = xhr.response;

        if (response.success) {
            new TabelaPrisustvo(document.getElementById("tabela"), response.prisustvo);
            window.sljedecaSedmica = prisustvo.sljedecaSedmica;
            window.prethodnaSedmica = prisustvo.prethodnaSedmica;
        }else{
            alert(response.poruka);
            }
    }
    
}