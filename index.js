const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');


app.use(express.static("public"));
app.use(express.static("html"));
app.use(bodyParser.json());
app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
 })); 
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/predmet.html', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/html/predmet.html'));
})

app.get('/prisustvo.html', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/html/prisustvo.html'));
})

app.get('/prijava.html', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/html/prijava.html'));
})

app.post('/prijava.html', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    fs.readFile('data/nastavnici.json', 'utf-8', (err, data) =>{
        if(err){
            console.error(err);
            res.json({ success: false, message: 'An error occurred' });
            return;
        }
        const users = JSON.parse(data);
        const user = users.find(u => u.nastavnik.username === username && u.nastavnik.password_hash === password);
        if (user) {
            req.session.username = username;
            req.session.predmeti = user.predmeti;
            res.json({ success: true, message: 'Uspješna prijava' });
            
          } else {
            res.json({ success: false, message: 'Neuspješna prijava' });
          }
    });
});
app.all('*', (req,res) => {
    res.status(404).send('<h1>Resource not found</h1>');
})

app.listen(3000);