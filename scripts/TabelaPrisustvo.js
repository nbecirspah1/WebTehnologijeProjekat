let TabelaPrisustvo = function(divRef, podaci){

    divRef.innerHTML ="";

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
}
