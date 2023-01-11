

    

    console.log("Usao u  getPredmeti");


function getPredmeti1(xhr) {
    if (xhr.readyState == 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.response);

        if (response.success) {
            let predmeti = response.predmeti;
            let lista = document.getElementById('listaPredmeta');
            for (let predmet of predmeti) {
                lista.appendChild(document.createElement('li')).innerHTML = predmet;
       console.log("Predmeti: ", predmet);

            }

        } else {
            alert(response.greska);

        }
    }
}
PoziviAjax.getPredmeti(getPredmeti1);