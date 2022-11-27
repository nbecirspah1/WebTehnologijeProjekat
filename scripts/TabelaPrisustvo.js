let TabelaPrisustvo = function(divRef, podaci){

   

  /////////VALIDACIJA PODATAKA/////////
  if(podaci.brojPredavanjaSedmicno < 0 || podaci.brojVjezbiSedmicno < 0){//broj predavanja ili vjezbi < 0
    let tekst =overflowDIV.appendChild(document.createElement('p')); 
    tekst.innerHTML ="Podaci o prisustvu nisu validni!"
    return 0;
  }
  for(let i = 0; i<podaci.prisustva.length; i++){//broj vjezbi i predavanja za studenta veci od mogucih
    if(podaci.prisustva[i].predavanja > podaci.brojPredavanjaSedmicno
      || podaci.prisustva[i].vjezbe > podaci.brojVjezbiSedmicno){
      let tekst =overflowDIV.appendChild(document.createElement('p')); 
      tekst.innerHTML ="Podaci o prisustvu nisu validni!"
      return 0;
    }
    else if(podaci.prisustva[i].predavanja<0 || podaci.prisustva[i].vjezbe<0){//vjezbe ili predavnja studenta < 0
      let tekst =overflowDIV.appendChild(document.createElement('p')); 
      tekst.innerHTML ="Podaci o prisustvu nisu validni!"
      return 0;
    }
    for(let j = i+1; j<podaci.prisustva.length; j++){//Isti student ima dva ili više unosa prisustva za istu sedmicu
      if(podaci.prisustva[i].index == podaci.prisustva[j].index && podaci.prisustva[i].sedmica == podaci.prisustva[j].sedmica){
        let tekst =overflowDIV.appendChild(document.createElement('p')); 
        tekst.innerHTML ="Podaci o prisustvu nisu validni!"
        return 0;
      }
    }

    let postojiStudentUListiStudenata = false;//Postoji prisustvo za studenta koji nije u listi studenata
    for(let j =0; j<podaci.studenti.length; j++){
      if(podaci.prisustva[i].index == podaci.studenti[j].index){
        postojiStudentUListiStudenata = true;
        break;
      }
    }
    if(!postojiStudentUListiStudenata){
      let tekst =overflowDIV.appendChild(document.createElement('p')); 
      tekst.innerHTML ="Podaci o prisustvu nisu validni!"
      return 0;
    }
  }

   let tekucaSedmica = 0;
   let maxSedmica = 0;
  for(let i = 0; i< podaci.prisustva.length; i++){//Nalazimo tekucu sedmicu
     if(podaci.prisustva[i].sedmica > tekucaSedmica) {
       tekucaSedmica = podaci.prisustva[i].sedmica;
       maxSedmica = podaci.prisustva[i].sedmica;
     }
  }
  for(j=1; j<=tekucaSedmica; j++){
   let pronadjenaItasedmica=false;
    for(let i =0; i<podaci.prisustva.length; i++){
      if(podaci.prisustva[i].sedmica == j){
        pronadjenaItasedmica = true;
        break;
      }
    }
    if(!pronadjenaItasedmica){
      let tekst =overflowDIV.appendChild(document.createElement('p')); 
      tekst.innerHTML ="Podaci o prisustvu nisu validni!"
      return 0;
    }
  }
  /////////FUNKCIJA ZA PRETVARANJE ARAPSKIH BROJEVA U RIMSKE/////////
  function toRimskiBrojevi(broj) {
    
    if(broj == 1) return "I";
    else if(broj == 2) return "II";
    else if(broj == 3) return "III";
    else if(broj == 4) return "IV";
    else if(broj == 5) return "V";
    else if(broj == 6) return "VI";
    else if(broj == 7) return "VII";
    else if(broj == 8) return "VIII";
    else if(broj == 9) return "IX";
    else if(broj == 10) return "X";
    else if(broj == 11) return "XI";
    else if(broj == 12) return "XII";
    else if(broj == 13) return "XIII";
    else if(broj == 14) return "XIV";
    else if(broj == 15) return "XV";
  }
  /////////FJE SLJEDECA SEDMICA I PRETHODNASEMICA/////////
  let sljedecaSedmica = function () {
    if(tekucaSedmica < maxSedmica){
        tekucaSedmica = tekucaSedmica + 1; 
    }

new nacrtajTabelu(tekucaSedmica);

}



let prethodnaSedmica = function () {
if(tekucaSedmica != 1){
    tekucaSedmica = tekucaSedmica - 1; 
}
new nacrtajTabelu(tekucaSedmica);

}

  
  /////////PODACI SU UREDU, MOZEMO PRAVITI TABELU/////////
  let nacrtajTabelu = function (tekucaSedmica) {
    divRef.innerHTML ="";
    const att = document.createAttribute("class");
    att.value="vertikalno";
   let naslov = divRef.appendChild(document.createElement('h1'));
   naslov.innerHTML = podaci.predmet;
   let overflowDIV = divRef.appendChild(document.createElement('div'));
   overflowDIV.setAttribute("id", "overflow");
  let tabela = overflowDIV.appendChild(document.createElement('table'));
   let prviRed = tabela.appendChild(document.createElement('tr'));
   let kolonaIme = prviRed.appendChild(document.createElement('th'));
   kolonaIme.innerHTML = "Ime i prezime";
   let kolonaIndeks = prviRed.appendChild(document.createElement('th'));
   kolonaIndeks.innerHTML = "Index";


   for(let i =1; i<=maxSedmica; i++){
    let kolonaBrojSedmice = prviRed.appendChild(document.createElement('th'));
    kolonaBrojSedmice.innerHTML = toRimskiBrojevi(i);
    if(i == tekucaSedmica){
      kolonaBrojSedmice.colSpan = podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno;
    }
   }

   let zadnjaKolona = prviRed.appendChild(document.createElement('th'));
   zadnjaKolona.colSpan = 15 - maxSedmica + 1;
   zadnjaKolona.innerHTML = toRimskiBrojevi(maxSedmica+1) + "-" + toRimskiBrojevi(15);
 
    for(let i = 0; i < podaci.studenti.length; i++){//Ovom for petljom prolazimo kroz sve studente i
                                                    //upisujemo njihova imena i indekse
        let red = tabela.appendChild(document.createElement('tr'));
        let red1 = tabela.appendChild(document.createElement('tr'));
        let kolona1 =red.appendChild(document.createElement('td'));
        kolona1.rowSpan = "2";
        kolona1.innerHTML = podaci.studenti[i].ime;
        let kolona2 = red.appendChild(document.createElement('td'));
        kolona2.rowSpan = "2";
        kolona2.innerHTML =  podaci.studenti[i].index;  
        
        let praznaCelija=true;
        let sedmica = 1;
        for(let j = 0; j < podaci.prisustva.length; j++){//Prolazimo kroz prisustva i za tekuceg studenta sa
                                                       //odredjenim brojem indeksa upisujemo prisustvo
          if(sedmica != tekucaSedmica && sedmica<=maxSedmica){  
            if(podaci.studenti[i].index == podaci.prisustva[j].index && podaci.prisustva[j].sedmica == sedmica){
             let kolona = red.appendChild(document.createElement('td'));
             kolona.rowSpan = "2";
              kolona.innerHTML = ((podaci.prisustva[j].predavanja + podaci.prisustva[j].vjezbe)/
              (podaci.brojPredavanjaSedmicno +  podaci.brojVjezbiSedmicno))*100 + '%';
              sedmica = sedmica + 1;
              j=-1;
          }
          else if(j == podaci.prisustva.length -1){
            let kolona = red.appendChild(document.createElement('td'));
            kolona.rowSpan = "2";
            sedmica = sedmica + 1;
            j=-1;
          }
          
        }
        else if(sedmica==tekucaSedmica){
          if(podaci.studenti[i].index == podaci.prisustva[j].index && podaci.prisustva[j].sedmica == tekucaSedmica){
            praznaCelija=false;
            for(let k = 1; k <= podaci.brojPredavanjaSedmicno; k++){
              let kol = red.appendChild(document.createElement('td'));
              kol.setAttribute("class", "vertikalno");
              kol.innerHTML = "P" + k;
              let kol1 = red1.appendChild(document.createElement('td'));
              if( k <= podaci.prisustva[j].predavanja){
                kol1.setAttribute("class", "zelena");
              }
              else{
                kol1.setAttribute("class", "crvena");
              }
            }
            for(let k = 1; k <= podaci.brojVjezbiSedmicno; k++){
              let kol = red.appendChild(document.createElement('td'));
              kol.setAttribute("class", "vertikalno");
              kol.innerHTML = "V" + k;
              let kol1 = red1.appendChild(document.createElement('td'));
              if( k <= podaci.prisustva[j].vjezbe){
                kol1.setAttribute("class", "zelena");
              }
              else{
                kol1.setAttribute("class", "crvena");
              }
            
           }
           sedmica = sedmica + 1;
           j=-1;
            }
            else if(j == podaci.prisustva.length -1 && praznaCelija==true){
              for(let k = 1; k <= podaci.brojPredavanjaSedmicno; k++){
                let kol = red.appendChild(document.createElement('td'));
                kol.setAttribute("class", "vertikalno");
                kol.innerHTML = "P" + k;
                let kol1 = red1.appendChild(document.createElement('td'));
                }
              for(let k = 1; k <= podaci.brojVjezbiSedmicno; k++){
                let kol = red.appendChild(document.createElement('td'));
                kol.setAttribute("class", "vertikalno");
                kol.innerHTML = "V" + k;
                let kol1 = red1.appendChild(document.createElement('td'));
              
             }
             sedmica = sedmica + 1;
             j=-1;
            }
            
        }
      }
      for(let i = maxSedmica +1; i<=15; i++){
        let kol = red.appendChild(document.createElement('td'));
        kol.setAttribute("class", "prazna");
        kol.rowSpan = 2;
        if(i==15){
        kol.setAttribute("class", "zadnja");
        }
      }
      
    }



      /////////KREIRANJE BUTTON-A/////////
      let skripta = divRef.appendChild(document.createElement('script'));
      skripta.setAttribute("src", "https://kit.fontawesome.com/04a4ec8674.js");
      skripta.setAttribute("crossorigin", "anonymous");
      let div1 = divRef.appendChild(document.createElement('div'));
      div1.setAttribute("id", "dugmici");
      let dugmeLijevo = div1.appendChild(document.createElement('button'));
      dugmeLijevo.setAttribute("id", "dugmeLijevo");
      let strelicaLijevo = dugmeLijevo.appendChild(document.createElement('i'));
      strelicaLijevo.setAttribute("class", "fa-solid fa-arrow-left fa-2x");
      let dugmeDesno = div1.appendChild(document.createElement('button'));
      dugmeDesno.setAttribute("id", "dugmeDesno");
      let strelicaDesno = dugmeDesno.appendChild(document.createElement('i'));
      strelicaDesno.setAttribute("class", "fa-solid fa-arrow-right fa-2x");
      dugmeDesno.onclick =  sljedecaSedmica;
      dugmeLijevo.onclick =  prethodnaSedmica;
  } 


    
     
  new nacrtajTabelu(tekucaSedmica);


    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }

};