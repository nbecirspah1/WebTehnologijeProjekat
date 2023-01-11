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
    if(req.session.username == null || req.session.predmeti == null){
        res.json({ success: false, greska: 'Nastavnik nije loginovan' });
        return;
    }
    res.json({predmeti: req.session.predmeti})
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
        if(err){
            console.error(err);
            res.json({success: false, message: 'Neuspješna odjava'});
            return;   
        }
        res.json({success: false, message: 'Uspješna odjava'});

    })
})


app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>');
})

app.listen(3000);