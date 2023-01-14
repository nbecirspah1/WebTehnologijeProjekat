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
            new TabelaPrisustvo(document.getElementById("tabela"), response.prisustvo);
            window.sljedecaSedmica = TabelaPrisustvo.sljedecaSedmica;
            window.prethodnaSedmica = TabelaPrisustvo.prethodnaSedmica;
           // let crveneCelije = document.getElementsByClassName("crvena");
            // for (let i = 0; i < crveneCelije.length; i++) {
            //     crveneCelije[i].addEventListener("click", function() {
            //         console.log("USao u listenr od crv cel")
            //         let nazivPredmeta = document.getElementById("nazivPredmeta");
            //         let red = crveneCelije[i].closest('tr');
            //         let red1 = red.previousElementSibling;
            //         let index = red1.children[1];
            //         //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
            //         PoziviAjax.postPrisustvo(nazivPredmeta, index, )
            //         console.log(red1);
            //         let j = 0;
            //         tdElements = red1.children;
            //         for(j = 2; j<tdElements.length; j++){
            //             const td = tdElements[j];
            //             console.log(tdElements[j]);
            //             if(tdElements[j].innerHTML.startsWith("P")) {
            //               break;
            //             }
            //         }
            //         console.log("Tekuca sedmica je ",  j-1);
            //         //crveneCelije[i].className = "zelena";
            //     });
            // }
        } else {
            alert(response.poruka);
        }
    }

