window.onload = function () {
    // const form = document.getElementById('logoutButton');

    let lista = document.getElementById('listaPredmeta');
    PoziviAjax.getPredmeti(getPredmeti1);


}
function odjava(err, data) {
        
        if(err){
            const err = JSON.parse(err);
            alert(err.poruka);
            return;
        }
        const response = JSON.parse(data);
        if (response.poruka == "Uspješna odjava") {
            window.location.href = 'http://localhost:3000/prijava.html';
            //window.location.replace("/predmet.html");


        } else {
            alert(response.poruka);

        }
}


function getPredmeti1(err, data) {
    if(err){
        const err = JSON.parse(err);
        alert(err.poruka);
        return;
    }

    const response = data;

        if (response.greska == null) {
            let predmeti = response.predmeti;

            let lista = document.getElementById('listaPredmeta');
            for (let predmet of predmeti) {
                let element = document.createElement('li');
                lista.appendChild(element).innerHTML = predmet;
                element.addEventListener('click', e => {
                    e.preventDefault();
                    //  window.location.href = 'http://localhost:3000/premdet.html';

                    PoziviAjax.getPredmet(element.textContent, getPredmet1);
                });

            }
            let button = document.createElement('button');
            lista.appendChild(button).innerHTML = 'Odjavite se';
            let logoutIkona = button.appendChild(document.createElement('i'));
            logoutIkona.setAttribute("class", "fa-solid fa-right-from-bracket");
            logoutIkona.setAttribute("id", "logoutIkona");
            button.id = "logoutButton";
            button.addEventListener('click', e => {
                e.preventDefault();
                PoziviAjax.postLogout(odjava);
               // window.location.href = 'http://localhost:3000/prijava.html';
                // window.location.href = 'http://localhost:3000/predmet.html';
            });



        } else {
            alert(response.greska);
            window.location.href = 'http://localhost:3000/prijava.html'
        }

    
}

function getPredmet1(err, data) {
    if(err){
        const err = JSON.parse(err);
        alert(err.poruka);
        return;
    }
        const response = data;

        if (response.poruka == null) {
            tekucaSedmica = 0;
            body = document.getElementById('body');
            tabela = document.createElement('table');
            tabela.setAttribute("id", "tabela")
            body.appendChild(tabela);
            // let link = document.createElement("link");
            // link.rel = "stylesheet";
            // link.type = "text/css";
            // link.href = "../css/predmeti.css";
            // let stariLink = document.getElementById("stariLink");
            // document.head.replaceChild(link, stariLink);
            new TabelaPrisustvo(document.getElementById("tabela"), response.prisustvo);      
        } else {
            alert(response.poruka);
        }
    }

