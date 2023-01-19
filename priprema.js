const db = require('./db.js')
db.sequelize.sync({force:true}).then(function(){
    inicijalizacija().then(function(){
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});


function inicijalizacija(){
    var nastavniciListaPromisea=[];
    var predmetiListaPromisea=[];
    var prisustvaListaPromisea=[];
    var studentiListaPromisea=[];
    
    return new Promise(function(resolve, reject){
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 1, predavanja: 2, vjezbe:2}))//PREDMET1
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 1, predavanja: 0, vjezbe:0}))//PREDMET1
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 2, predavanja: 2, vjezbe:2}))//PREDMET1
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 2, predavanja: 2, vjezbe:2}))//PREDMET1

        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 1, predavanja: 2, vjezbe:2}))//PREDMET2
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 1, predavanja: 0, vjezbe:0}))//PREDMET2
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 2, predavanja: 2, vjezbe:2}))//PREDMET2
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 2, predavanja: 2, vjezbe:2}))//PREDMET2

        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 1, predavanja: 2, vjezbe:2}))//PREDMET3
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 1, predavanja: 0, vjezbe:0}))//PREDMET3
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 2, predavanja: 2, vjezbe:2}))//PREDMET3
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 2, predavanja: 2, vjezbe:2}))//PREDMET3

        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 1, predavanja: 2, vjezbe:2}))//PREDMET4
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 1, predavanja: 0, vjezbe:0}))//PREDMET4
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 2, predavanja: 2, vjezbe:2}))//PREDMET4
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 2, predavanja: 2, vjezbe:2}))//PREDMET4

        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 1, predavanja: 2, vjezbe:2}))//PREDMET5
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 1, predavanja: 0, vjezbe:0}))//PREDMET5
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 2, predavanja: 2, vjezbe:2}))//PREDMET5
        prisustvaListaPromisea.push(db.prisustva.create({sedmica: 2, predavanja: 2, vjezbe:2}))//PREDMET5

        Promise.all(prisustvaListaPromisea).then(function(prisustva){
            var prisustvoZaP1 = [prisustva.filter(function(p){return p.id===1})[0],
                                 prisustva.filter(function(p){return p.id===2})[0],
                                 prisustva.filter(function(p){return p.id===3})[0],
                                 prisustva.filter(function(p){return p.id===4})[0]];
            var prisustvoZaP2 = [prisustva.filter(function(p){return p.id===5})[0],
                                 prisustva.filter(function(p){return p.id===6})[0],
                                 prisustva.filter(function(p){return p.id===7})[0],
                                 prisustva.filter(function(p){return p.id===8})[0]];
            var prisustvoZaP3 = [prisustva.filter(function(p){return p.id===9})[0],
                                 prisustva.filter(function(p){return p.id===10})[0],
                                 prisustva.filter(function(p){return p.id===11})[0],
                                 prisustva.filter(function(p){return p.id===12})[0]];                         
            var prisustvoZaP4 = [prisustva.filter(function(p){return p.id===13})[0],
                                 prisustva.filter(function(p){return p.id===14})[0],
                                 prisustva.filter(function(p){return p.id===15})[0],
                                 prisustva.filter(function(p){return p.id===16})[0]];
            var prisustvoZaP5 = [prisustva.filter(function(p){return p.id===17})[0],
                                 prisustva.filter(function(p){return p.id===18})[0],
                                 prisustva.filter(function(p){return p.id===19})[0],
                                 prisustva.filter(function(p){return p.id===20})[0]];


        predmetiListaPromisea.push(
            db.predmeti.create({predmet:'PREDMET1',brojPredavanjaSedmicno:2, brojVjezbiSedmicno:3}).then(function(n){
            n.setPrisustvoNaPredmetu(prisustvoZaP1);

            return new Promise(function(resolve,reject){resolve(n);});
        }))
    
        predmetiListaPromisea.push(
            db.predmeti.create({predmet:'PREDMET2',brojPredavanjaSedmicno:3, brojVjezbiSedmicno:3}).then(function(n){
                n.setPrisustvoNaPredmetu(prisustvoZaP2);
    
                return new Promise(function(resolve,reject){resolve(n);});
            }))
        predmetiListaPromisea.push(db.predmeti.create({predmet:'PREDMET3',brojPredavanjaSedmicno:2, brojVjezbiSedmicno:3}).then(function(n){
            n.setPrisustvoNaPredmetu(prisustvoZaP3);

            return new Promise(function(resolve,reject){resolve(n);});
        }))
        predmetiListaPromisea.push(db.predmeti.create({predmet:'PREDMET4',brojPredavanjaSedmicno:2, brojVjezbiSedmicno:3}).then(function(n){
            n.setPrisustvoNaPredmetu(prisustvoZaP4);

            return new Promise(function(resolve,reject){resolve(n);});
        }))
        predmetiListaPromisea.push(db.predmeti.create({predmet:'PREDMET5',brojPredavanjaSedmicno:2, brojVjezbiSedmicno:3}).then(function(n){
            n.setPrisustvoNaPredmetu(prisustvoZaP5);

            return new Promise(function(resolve,reject){resolve(n);});
        }))
        //predmetiListaPromisea.push(db.nastavnici.create({username:'USERNAME2', password_hash:'$2b$10$2DChEJym7lrvUC74zB/CwOocg/6v/ufPr4WkzX1lvWpo.J7hRbRXm'}));
        Promise.all(predmetiListaPromisea).then(function(predmeti){
            var P1=predmeti.filter(function(p){return p.predmet==='PREDMET1'})[0];
            var P2=predmeti.filter(function(p){return p.predmet==='PREDMET2'})[0];
            var P3=predmeti.filter(function(p){return p.predmet==='PREDMET3'})[0];
            var P4=predmeti.filter(function(p){return p.predmet==='PREDMET4'})[0];
            var P5=predmeti.filter(function(p){return p.predmet==='PREDMET5'})[0];
            console.log("STA ISPISE P1:", P1);
          //  var U2=nastavnici.filter(function(a){return a.ime==='USERNAME2'})[0];

            nastavniciListaPromisea.push(
                
                db.nastavnici.create({username:'USERNAME2', password_hash:'$2b$10$2DChEJym7lrvUC74zB/CwOocg/6v/ufPr4WkzX1lvWpo.J7hRbRXm'}).then(function(n){
                    n.setPredmetiNastavnika([P1, P2, P3]);

                    return new Promise(function(resolve,reject){resolve(n);});
                })
            )

            nastavniciListaPromisea.push(
                
                db.nastavnici.create({username:'USERNAME', password_hash:'$2b$10$bZJS1Fj0fponG1xskEjpVePY90PIl1hejq0TQhgfhWIbgr02NQFsW'}).then(function(n){
                    n.setPredmetiNastavnika([P4, P5]);

                    return new Promise(function(resolve,reject){resolve(n);});
                })
            )

        }).catch(function(err){console.log("Predmeti greska "+err);});   
        studentiListaPromisea.push(
            db.studenti.create({ime:'Nejla Becirspahic', indeks: 18835}).then(function(n){
                n.setPrisustvoStudenta([prisustvoZaP1[0], prisustvoZaP1[2],
                                        prisustvoZaP2[0], prisustvoZaP2[2],
                                        prisustvoZaP3[0], prisustvoZaP3[2],
                                        prisustvoZaP4[0], prisustvoZaP4[2],
                                        prisustvoZaP5[0], prisustvoZaP5[2]],)
                return new Promise(function(resolve,reject){resolve(n);});
                
            })
        )    
        studentiListaPromisea.push(
            db.studenti.create({ime:'Neko Nekic', indeks: 12345}).then(function(n){
                n.setPrisustvoStudenta([prisustvoZaP1[1], prisustvoZaP1[3],
                                        prisustvoZaP2[1], prisustvoZaP2[3],
                                        prisustvoZaP3[1], prisustvoZaP3[3],
                                        prisustvoZaP4[1], prisustvoZaP4[3],
                                        prisustvoZaP5[1], prisustvoZaP5[3]])
                return new Promise(function(resolve,reject){resolve(n);});
                
            })
        )    
        // studentiListaPromisea.push(
        //     db.studenti.create({ime:'Neko Nekic4', indeks: 12348}).then(function(n){
        //         n.setPrisustvoStudenta([prisustvoZaP1[4], prisustvoZaP2[4], prisustvoZaP3[4], prisustvoZaP4[4]])
        //         return new Promise(function(resolve,reject){resolve(n);});
                
        //     })
        // )    

   })

   
    })
}