const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const fs = require('fs');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const db = require('./db.js');
const nastavnici = require('./models/nastavnici.js');
const predmeti = require('./models/predmeti.js');
const prisustva = require('./models/prisustva.js');
const studenti = require('./models/studenti.js');
//db.sequelize.sync({force:true});
//sequelize.sync({force:true})
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

bcrypt.hash("sifra1", 10, function (err, hash) {
    // hash šifre imate ovdje
    console.log("Hash za ovu sifru1 je ", hash);
    //$2b$10$bZJS1Fj0fponG1xskEjpVePY90PIl1hejq0TQhgfhWIbgr02NQFsW
});
bcrypt.hash("sifra2", 10, function (err, hash) {
    // hash šifre imate ovdje
    console.log("Hash za ovu sifru2 je ", hash);
    //$2b$10$2DChEJym7lrvUC74zB/CwOocg/6v/ufPr4WkzX1lvWpo.J7hRbRXm
});


app.get('/predmeti', (req, res) => {
    if (req.session.username == null || req.session.predmeti == null) {
        res.json({ greska: 'Nastavnik nije loginovan' });
        return;
    }
    res.json({ predmeti: req.session.predmeti })
    // res.sendFile(path.join(__dirname, 'public/html/predmeti'));

})


app.post('/login', (req, res) => {
    fs.readFile('data/nastavnici.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.json({ poruka: 'An error occurred' });

            return;
        }

        //const {username, password} = req.body.data;
        const username = req.body.data.username;
        const password = req.body.data.password;
        const nastavnici = JSON.parse(data);
        var nastavnik = null;
        // nastavnik=nastavnici.find(u => u.nastavnik.username === username 
        //      && u.nastavnik.password_hash === password);
        let postojiUsername = false;
        for (const nastavnik of nastavnici) {
            // console.log(nastavnik);
            //  console.log("Ispisi usn", username);
            let hash = nastavnik.nastavnik.password_hash;
            if (nastavnik.nastavnik.username === username) {
                postojiUsername = true;
                bcrypt.compare(password, hash, function (err, success) {
                    if (err) {
                        console.log("Greska prilikom poredjenja hasha sa passwordom");
                    } else {
                        if (success) {
                            console.log("uspjesnaPrijava")
                            req.session.username = username;
                            req.session.predmeti = nastavnik.predmeti;
                            res.json({ poruka: 'Uspješna prijava' });
                            return;
                        } else {
                            res.json({ poruka: 'Neuspješna prijava' });
                            return;
                        }
                    }
                })



            }
        }
        if (!postojiUsername) {
            res.json({ poruka: 'Neuspješna prijava' });
        }
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.json({ poruka: 'Neuspješna odjava' });
            return;
        }
        res.json({ poruka: 'Uspješna odjava' });

    })
})

app.get('/predmet/:naziv', (req, res) => {
    const nazivPredmeta = req.params.naziv;
    fs.readFile('data/prisustva.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.json({ poruka: 'Predmet se ne moze ucitati' });

            return;
        }
        const prisustva = JSON.parse(data);
        for (const prisustvo of prisustva) {
            if (prisustvo.predmet === nazivPredmeta) {
                res.json({ prisustvo: prisustvo });
                return;
            }
        }
        res.json({ poruka: 'Ovaj predmet ne postoji' });

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
                if (!postojiSedmicaSaPrisustvomZaIndeks) {
                    podaci.prisustva.push({
                        "sedmica": reqPrisustvo.sedmica, "predavanja": reqPrisustvo.predavanja,
                        "vjezbe": reqPrisustvo.vjezbe, "index": index
                    })
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