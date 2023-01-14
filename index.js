const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(express.static("public/html"));
app.use(express.static("public/css"));
app.use(express.static("public/scripts"));
//app.use(express.static("html"));
app.use(bodyParser.json());

app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/predmeti', (req, res) => {
    if (req.session.username == null || req.session.predmeti == null) {
        res.json({ success: false, greska: 'Nastavnik nije loginovan' });
        return;
    }
    res.json({ success: true, predmeti: req.session.predmeti })
    // res.sendFile(path.join(__dirname, 'public/html/predmeti'));

})


app.post('/login', (req, res) => {
    fs.readFile('data/nastavnici.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.json({ success: false, poruka: 'An error occurred' });

            return;
        }

        //const {username, password} = req.body.data;
        const username = req.body.data.username;
        const password = req.body.data.password;
        const nastavnici = JSON.parse(data);
        var nastavnik = null;
        // nastavnik=nastavnici.find(u => u.nastavnik.username === username 
        //      && u.nastavnik.password_hash === password);

        for (const nastavnik of nastavnici) {
            // console.log(nastavnik);
            //  console.log("Ispisi usn", username);
            if (nastavnik.nastavnik.username === username &&
                nastavnik.nastavnik.password_hash === password) {
                req.session.username = username;
                req.session.predmeti = nastavnik.predmeti;
                res.json({ success: true, poruka: 'Uspješna prijava' });
                return;
            }
        }
        res.json({ success: false, poruka: 'Neuspješna prijava' });


    });
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.json({ success: false, message: 'Neuspješna odjava' });
            return;
        }
        res.json({ success: true, message: 'Uspješna odjava' });

    })
})

app.get('/predmet/:naziv', (req, res) => {
    const nazivPredmeta = req.params.naziv;
    fs.readFile('data/prisustva.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.json({ success: false, poruka: 'Predmet se ne moze ucitati' });

            return;
        }
        const prisustva = JSON.parse(data);
        for (const prisustvo of prisustva) {
            if (prisustvo.predmet === nazivPredmeta) {
                res.json({ success: true, prisustvo: prisustvo });
                return;
            }
        }
        res.json({ success: false, poruka: 'Ovaj predmet ne postoji' });

    });
});

app.post('/prisustvo/predmet/:naziv/student/:index', (req, res) => {
    const nazivPredmeta = req.params.naziv;
    const index = req.params.index;
    const reqPrisustvo = req.body;
    //  console.log("Sedmica koja se salje u req.body", req.body.sedmica);
    //console.log("Vjezbe u req", req.body.predavanja);
    //console.log("Predavanja u req", req.body.vjezbe);
    fs.readFile('data/prisustva.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.json({ success: false, poruka: 'Prisustvo se ne moze azurirati' });

            return;
        }
        var prisustva = JSON.parse(data);
        for (let podaci of prisustva) {

            if (podaci.predmet === nazivPredmeta) {

                let postojiSedmicaSaPrisustvomZaIndeks = false;

                for (let prisustvo of podaci.prisustva) {
                    //{sedmica:N,predavanja:P,vjezbe:V}
                    if (reqPrisustvo.sedmica == prisustvo.sedmica && index == prisustvo.index) {

                        postojiSedmicaSaPrisustvomZaIndeks = true;
                        console.log("Prisustvo na pred prije azuriranja: ", prisustvo.predavanja);
                        prisustvo.predavanja = reqPrisustvo.predavanja;
                        console.log("Prisustvo na pred poslije azuriranja: ", prisustvo.predavanja);
                        prisustvo.vjezbe = reqPrisustvo.vjezbe;
                    }
                }
                if(!postojiSedmicaSaPrisustvomZaIndeks){
                    podaci.prisustva.push({"sedmica":reqPrisustvo.sedmica,"predavanja": reqPrisustvo.predavanja,
                                            "vjezbe": reqPrisustvo.vjezbe,"index":index})
                }
            }
        }
        fs.writeFile('data/prisustva.json', JSON.stringify(prisustva), (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Upisani podaci");
                for (prisustvoPredmeta of prisustva) {
                    if (prisustvoPredmeta.predmet === nazivPredmeta) {
                        res.json({ success: true, prisustvo: prisustvoPredmeta });
                        console.log(prisustvoPredmeta);
                    }
                }
            }
        });

    });



});


app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>');
})

app.listen(3000);