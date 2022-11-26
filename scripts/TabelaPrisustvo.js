let TabelaPrisustvo = function(divRef, podaci){

    divRef.innerHTML ="";
    let naslov = divRef.appendChild(document.createElement('h1'));
    naslov.innerHTML = podaci.predmet;
    let overflowDIV = divRef.appendChild(document.createElement('div'));
    overflowDIV.setAttribute("id", "overflow");

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
  for(let i = 0; i< podaci.prisustva.length; i++){//Nalazimo tekucu sedmicu
     if(podaci.prisustva[i].sedmica > tekucaSedmica) 
       tekucaSedmica = podaci.prisustva[i].sedmica;
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

   
  /////////PODACI SU UREDU, MOZEMO PRAVITI TABELU/////////
  let tabela = overflowDIV.appendChild(document.createElement('table'));
   let prviRed = tabela.appendChild(document.createElement('tr'));
   let kolonaIme = prviRed.appendChild(document.createElement('th'));
   kolonaIme.innerHTML = "Ime i prezime";
   let kolonaIndeks = prviRed.appendChild(document.createElement('th'));
   kolonaIndeks.innerHTML = "Index";


   for(let i =1; i<=tekucaSedmica; i++){
    let kolonaBrojSedmice = prviRed.appendChild(document.createElement('th'));
    kolonaBrojSedmice.innerHTML = i;
    if(i == tekucaSedmica){
      kolonaBrojSedmice.colSpan = podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno;
    }
   }

 
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
            if(sedmica != tekucaSedmica){  
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

            
        }    
        
    }
}