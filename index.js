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
const { Op } = require("sequelize");
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

db.sequelize.sync();

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


app.post('/login',  (req, res) => {
    const username = req.body.data.username;
    const password = req.body.data.password;
    db.nastavnici.findOne({
        where:{
             username: username
        }
    }).then(function(nastavnici){
        //console.log(nastavnici);
        //console.log("Predmeti nastavnika: ", nastavnici.getPredmetiNastavnika())
        console.log(nastavnici)
        if(nastavnici == null || nastavnici.password_hash == null){
            res.json({ poruka: 'Neuspješna prijava' });
            return;
        }

        bcrypt.compare(password, nastavnici.password_hash, function (err, success) {
            if (err) {
                console.log("Greska prilikom poredjenja hasha sa passwordom");
            } else {
                if (success) {
                    console.log("uspjesnaPrijava")
                    req.session.username = username;
                     db.predmeti.findAll({where:{nastavniciId: nastavnici.id}}).then(function(predmeti){
                        // console.log(predmeti.predmet);
                        if(predmeti.length == 0 ){
                            res.json({ poruka: 'Neuspješna prijava' });
                            return;
                        }
                        var naziviPredmeta = [];
                        for(const predmet of predmeti){
                            naziviPredmeta.push(predmet.predmet);
                        }
                        req.session.predmeti =naziviPredmeta;
                        console.log(naziviPredmeta)
                        res.json({ poruka: 'Uspješna prijava' });
                     })
                   // console.log("Predmeti nastavnika: ", nastavnici.getPredmetiNastavnika())
                    
                  //  return new Promise(function(resolve,reject){resolve(nastavnici);});
                    
                    //return;
                } else {
                    res.json({ poruka: 'Neuspješna prijava' });
                    return;
                }
            }
            

        })

    })
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
    var prisustvo = {};
    var indeksi = []
    db.predmeti.findOne({
        where:{
             predmet: nazivPredmeta
        }
    }).then(function(predmeti){
        prisustvo.predmet = predmeti.predmet;
        prisustvo.brojPredavanjaSedmicno = predmeti.brojPredavanjaSedmicno;
        prisustvo.brojVjezbiSedmicno = predmeti.brojVjezbiSedmicno;
        console.log("HEJ EVO ME P BRP BRV", prisustvo);
        db.prisustva.findAll({where: {predmetiId: predmeti.id}}).then(
            function(prisustva){
                if(prisustva.length == 0){
                    res.json({ poruka: 'Ovaj predmet ne postoji' });
                    return;
                }
                //prisustvo.prisustva = prisustva;
                var nizPrisustva = [];
                var i =0;
                var indeksi = []
                for(const pr of prisustva ){
                    nizPrisustva.push({ "sedmica": pr.sedmica,
                                        "predavanja": pr.predavanja,
                                        "vjezbe": pr.vjezbe,
                                        "index": pr.studentiIndeks});
                                        
                     
                     duzinaPrisustva=prisustva.length;   
                     indeksi.push(pr.studentiIndeks)
                //     db.studenti.findOne({where: {indeks: pr.studentiIndeks}}).then(
                        

                //         function(student){
                //             i++;
                //            let vecPostoji = false;
                //             for(const s of nizStudenata){
                //                 if(s.index===student.indeks){
                //                     vecPostoji = true;
                //                 }
                //             }
                //             if(!vecPostoji){
                //                 nizStudenata.push({"ime": student.ime, "index": student.indeks});
                //             }
                         
                    
                //            // prisustvo.studenti = nizStudenata;
                //             let sortiraniNizStudenata = [...nizStudenata].sort((a,b) => b.indeks - a.indeks);
                //             prisustvo.studenti = sortiraniNizStudenata;
                // console.log("EEEEVO ME OPET ISPISI PRISUSTVA ZA PREDMET", prisustvo);
                // console.log("Ispisi i", i);
                // console.log("Ispisi duzinsPr", duzinaPrisustva);
                //             if(i==duzinaPrisustva){console.log("USAO U RES.JSON");res.json({prisustvo: prisustvo});}

                //     })

                    
                    
                }
                var nizStudenata = [];
                db.studenti.findAll({where:{indeks:{[Op.or]:indeksi}}}).then(
                    function(studenti){
                //prisustvo.prisustva = nizPrisustva;
                        for(const s of studenti){
                            nizStudenata.push({ime: s.ime, index: s.indeks});
                        }
                prisustvo.prisustva = nizPrisustva;
                prisustvo.studenti = nizStudenata
                console.log("USAO U RES.JSON", prisustvo);res.json({prisustvo: prisustvo});
        
            }
        )
      
    })
});
});

app.post('/prisustvo/predmet/:naziv/student/:index', (req, res) => {
    var nazivPredmeta = req.params.naziv;
    var index = req.params.index;
    var reqPrisustvo = req.body;
    //  console.log("Sedmica koja se salje u req.body", req.body.sedmica);
    //console.log("Vjezbe u req", req.body.predavanja);
    //console.log("Predavanja u req", req.body.vjezbe);
        let promise1 = db.predmeti.findOne({where: {predmet: nazivPredmeta}});

        promise1.then(
            function(predmet){
                var prisustvoPredmeta= {};

                console.log("PRIKAZI MI SVE PARAMETRE ZA POST", nazivPredmeta, index, reqPrisustvo)
                db.prisustva.update({predavanja: reqPrisustvo.predavanja,
                                     vjezbe: reqPrisustvo.vjezbe},
                                     {where:{[Op.and] :[ {studentiIndeks : index},
                                                         {sedmica: reqPrisustvo.sedmica},
                                                         {predmetiId: predmet.id}]}}).then(
                        function(updatePrisustva){
                           // console.log("Update ovh prisustva je ", updatePrisustva);
                          //  res.json({ success: true, prisustvo: prisustvoPredmeta });
                          if(updatePrisustva==0){console.log("Greska pri unosu prisustva")}
                            db.prisustva.findAll({where:{[Op.and] :[ 
                        //    {sedmica: reqPrisustvo.sedmica},
                            {predmetiId: predmet.id}]}}).then(
                                function(prisustva){
                                    var indeksi = [];
                                    for(const pris of prisustva){
                                        indeksi.push(pris.studentiIndeks)
                                    }
                                    db.studenti.findAll({where:{indeks:{[Op.or]:indeksi}}}).then(
                                        function(studenti){

                                            prisustvoPredmeta.predmet = predmet.predmet;
                                            prisustvoPredmeta.brojPredavanjaSedmicno=predmet.brojPredavanjaSedmicno;
                                            prisustvoPredmeta.brojVjezbiSedmicno= predmet.brojVjezbiSedmicno;
                                            var nizStudenata = []
                                            for(const s of studenti){
                                                nizStudenata.push({ime:s.ime, index:s.indeks})
                                            }
                                            prisustvoPredmeta.studenti= nizStudenata;
                                            //prisustvoPredmeta.prisustvo=prisustva;
                                            var nizPrisustva = [];
                                            console.log("  EVO PRISUSTVA", prisustva)
                                            for(const p of prisustva){
                                                nizPrisustva.push({sedmica: p.sedmica, 
                                                                predavanja: p.predavanja,
                                                                vjezbe: p.vjezbe,
                                                                index: p.studentiIndeks})
                                            }
                                            prisustvoPredmeta.prisustva=nizPrisustva;

                                            console.log("ZZDRAVO PRISUSTVO PREDMETA", prisustvoPredmeta)
                                            res.json({success: true,prisustvo: prisustvoPredmeta})
                                        }
                                    )
                            })
                        }
                    ).catch(function(err){console.log("ERROR ZA POSTAVLJANJE PRISUSTTVA", err)})
            }
        )
});


app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>');
})

app.listen(3000);