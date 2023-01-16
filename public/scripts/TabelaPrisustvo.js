
let tekucaSedmica;
let TabelaPrisustvo = function (divRef, podaci) {
  //let predavanja=0, vjezbe=0;

   
    
  var maxSedmica = 0;

  var dugmeDesno, dugmeLijevo, tabela;
  
  divRef.innerHTML = "";
  const att = document.createAttribute("class");
  att.value = "vertikalno";
  let naslovEl = document.createElement('h1');
  let naslov = divRef.appendChild(naslovEl);
  naslov.setAttribute("id", "nazivPredmeta");
  naslov.innerHTML = podaci.predmet;
  //divRef.appendChild(document.createElement('h2')).innerHTML = "BSc2";
  //divRef.appendChild(document.createElement('h3')).innerHTML = "Računarstvo i informatika";
  let overflowDIV = divRef.appendChild(document.createElement('div'));
  overflowDIV.setAttribute("id", "overflow");
  /////////VALIDACIJA PODATAKA/////////
  if (podaci.brojPredavanjaSedmicno < 0 || podaci.brojVjezbiSedmicno < 0) {//broj predavanja ili vjezbi < 0
    let tekst = overflowDIV.appendChild(document.createElement('p'));
    tekst.innerHTML = "Podaci o prisustvu nisu validni!"
    return 0;
  }
  for (let i = 0; i < podaci.prisustva.length; i++) {//broj vjezbi i predavanja za studenta veci od mogucih
    if (podaci.prisustva[i].predavanja > podaci.brojPredavanjaSedmicno
      || podaci.prisustva[i].vjezbe > podaci.brojVjezbiSedmicno) {
      let tekst = overflowDIV.appendChild(document.createElement('p'));
      tekst.innerHTML = "Podaci o prisustvu nisu validni!"
      return 0;
    }
    else if (podaci.prisustva[i].predavanja < 0 || podaci.prisustva[i].vjezbe < 0) {//vjezbe ili predavnja studenta < 0
      let tekst = overflowDIV.appendChild(document.createElement('p'));
      tekst.innerHTML = "Podaci o prisustvu nisu validni!"
      return 0;
    }
    for (let j = i + 1; j < podaci.prisustva.length; j++) {//Isti student ima dva ili više unosa prisustva za istu sedmicu
      if (podaci.prisustva[i].index == podaci.prisustva[j].index && podaci.prisustva[i].sedmica == podaci.prisustva[j].sedmica) {
        let tekst = overflowDIV.appendChild(document.createElement('p'));
        tekst.innerHTML = "Podaci o prisustvu nisu validni!"
        return 0;
      }
    }

    let postojiStudentUListiStudenata = false;//Postoji prisustvo za studenta koji nije u listi studenata
    for (let j = 0; j < podaci.studenti.length; j++) {
      if (podaci.prisustva[i].index == podaci.studenti[j].index) {
        postojiStudentUListiStudenata = true;
        break;
      }
    }
    if (!postojiStudentUListiStudenata) {
      let tekst = overflowDIV.appendChild(document.createElement('p'));
      tekst.innerHTML = "Podaci o prisustvu nisu validni!"
      return 0;
    }
  }
  if(tekucaSedmica == 0){
    for (let i = 0; i < podaci.prisustva.length; i++) {//Nalazimo tekucu sedmicu
      if (podaci.prisustva[i].sedmica > tekucaSedmica) {
        
          tekucaSedmica = podaci.prisustva[i].sedmica;
        
          maxSedmica = podaci.prisustva[i].sedmica;
      }
    }
  }
  for (let i = 0; i < podaci.prisustva.length; i++) {//Nalazimo tekucu sedmicu
    if (podaci.prisustva[i].sedmica > maxSedmica) {
      
        // tekucaSedmica = podaci.prisustva[i].sedmica;
      
        maxSedmica = podaci.prisustva[i].sedmica;
    }
  }

  let pronadjenaPrvasedmica = false;
  for (j = 1; j <= tekucaSedmica; j++) {
    let pronadjenaItasedmica = false;
    for (let i = 0; i < podaci.prisustva.length; i++) {
      if (podaci.prisustva[i].sedmica == j) {
        pronadjenaPrvasedmica = true;
        pronadjenaItasedmica = true;
        break;
      }
    }
    if (!pronadjenaItasedmica && pronadjenaPrvasedmica) {
      let tekst = overflowDIV.appendChild(document.createElement('p'));
      tekst.innerHTML = "Podaci o prisustvu nisu validni!"
      return 0;
    }
  }
  /////////FUNKCIJA ZA PRETVARANJE ARAPSKIH BROJEVA U RIMSKE/////////
  function toRimskiBrojevi(broj) {

    if (broj == 1) return "I";
    else if (broj == 2) return "II";
    else if (broj == 3) return "III";
    else if (broj == 4) return "IV";
    else if (broj == 5) return "V";
    else if (broj == 6) return "VI";
    else if (broj == 7) return "VII";
    else if (broj == 8) return "VIII";
    else if (broj == 9) return "IX";
    else if (broj == 10) return "X";
    else if (broj == 11) return "XI";
    else if (broj == 12) return "XII";
    else if (broj == 13) return "XIII";
    else if (broj == 14) return "XIV";
    else if (broj == 15) return "XV";
  }

  /////////FJE SLJEDECA SEDMICA I PRETHODNA SEDMICA/////////
  let sljedecaSedmica = function () {
    if (tekucaSedmica < maxSedmica) {
      tekucaSedmica = tekucaSedmica + 1;
    }

    new nacrtajTabelu(tekucaSedmica);

  }



  let prethodnaSedmica = function () {
    if (tekucaSedmica != 1) {
      tekucaSedmica = tekucaSedmica - 1;
    }
    new nacrtajTabelu(tekucaSedmica);

  }



  /////////PODACI SU UREDU, MOZEMO PRAVITI TABELU/////////
  let nacrtajTabelu = function (tekucaSedmica) {
    divRef.innerHTML = "";
    const att = document.createAttribute("class");
    att.value = "vertikalno";
    let naslov = divRef.appendChild(document.createElement('h1'));
    naslov.setAttribute("id", "nazivPredmeta");
    naslov.innerHTML = podaci.predmet;
   // divRef.appendChild(document.createElement('h2')).innerHTML = "BSc2";
   // divRef.appendChild(document.createElement('h3')).innerHTML = "Računarstvo i informatika";
    let overflowDIV = divRef.appendChild(document.createElement('div'));
    overflowDIV.setAttribute("id", "overflow");


    tabela = overflowDIV.appendChild(document.createElement('table'));
    let prviRed = tabela.appendChild(document.createElement('tr'));
    let kolonaIme = prviRed.appendChild(document.createElement('th'));
    kolonaIme.innerHTML = "Ime i prezime";
    let kolonaIndeks = prviRed.appendChild(document.createElement('th'));
    kolonaIndeks.innerHTML = "Index";


    for (let i = 1; i <= maxSedmica; i++) {
      let kolonaBrojSedmice = prviRed.appendChild(document.createElement('th'));
      kolonaBrojSedmice.innerHTML = toRimskiBrojevi(i);
      if (i == tekucaSedmica) {
        kolonaBrojSedmice.colSpan = podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno;
      }
    }
    if (maxSedmica != 15) {
      let zadnjaKolona = prviRed.appendChild(document.createElement('th'));
      zadnjaKolona.colSpan = 15 - maxSedmica + 1;
      if (maxSedmica != 14) {
        zadnjaKolona.innerHTML = toRimskiBrojevi(maxSedmica + 1) + "-" + toRimskiBrojevi(15);
      }
      else {
        zadnjaKolona.innerHTML = toRimskiBrojevi(15);
      }
    }
    for (let i = 0; i < podaci.studenti.length; i++) {//Ovom for petljom prolazimo kroz sve studente i
      //upisujemo njihova imena i indekse
      let red = tabela.appendChild(document.createElement('tr'));
      let red1 = tabela.appendChild(document.createElement('tr'));
      let kolona1 = red.appendChild(document.createElement('td'));
      kolona1.rowSpan = "2";
      kolona1.innerHTML = podaci.studenti[i].ime;
      let kolona2 = red.appendChild(document.createElement('td'));
      kolona2.rowSpan = "2";
      kolona2.innerHTML = podaci.studenti[i].index;

      let praznaCelija = true;
      let sedmica = 1;
      for (let j = 0; j < podaci.prisustva.length; j++) {//Prolazimo kroz prisustva i za tekuceg studenta sa
        //odredjenim brojem indeksa upisujemo prisustvo
        if (sedmica != tekucaSedmica && sedmica <= maxSedmica) {
          if (podaci.studenti[i].index == podaci.prisustva[j].index && podaci.prisustva[j].sedmica == sedmica) {
            let kolona = red.appendChild(document.createElement('td'));
            kolona.rowSpan = "2";
            if (podaci.prisustva[j].predavanja != null && podaci.prisustva[j].vjezbe != null) {
              kolona.innerHTML = (((podaci.prisustva[j].predavanja + podaci.prisustva[j].vjezbe) /
                (podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno)) * 100).toFixed(0) + '%';
            }
            sedmica = sedmica + 1;
            j = -1;
          }
          else if (j == podaci.prisustva.length - 1) {
            let kolona = red.appendChild(document.createElement('td'));
            kolona.rowSpan = "2";
            sedmica = sedmica + 1;
            j = -1;
          }

        }
        else if (sedmica == tekucaSedmica) {
          if (podaci.studenti[i].index == podaci.prisustva[j].index && podaci.prisustva[j].sedmica == tekucaSedmica) {
            praznaCelija = false;
            for (let k = 1; k <= podaci.brojPredavanjaSedmicno; k++) {
              let kol = red.appendChild(document.createElement('td'));
              kol.setAttribute("class", "vertikalno");
              kol.innerHTML = "P" + k;
              let kol1 = red1.appendChild(document.createElement('td'));
              kol1.classList.add("predavanja");
              if (k <= podaci.prisustva[j].predavanja) {
                //    kol1.setAttribute("class", "zelena");
                // kol1.classList.remove("nemaPrisustva");
                kol1.classList.add("zelena");

              }
              else if (podaci.prisustva[j].predavanja != null) {
                //     kol1.setAttribute("class", "crvena");
                //  kol1.classList.remove("nemaPrisustva");
                kol1.classList.add("crvena");

              }
              //   kol1.setAttribute("class", "predavanja");

            }
            for (let k = 1; k <= podaci.brojVjezbiSedmicno; k++) {
              let kol = red.appendChild(document.createElement('td'));
              kol.setAttribute("class", "vertikalno");
              kol.innerHTML = "V" + k;
              let kol1 = red1.appendChild(document.createElement('td'));
              kol1.classList.add("nemaPrisustva", "vjezbe");
              if (k <= podaci.prisustva[j].vjezbe) {
                // kol1.setAttribute("class", "zelena");
                kol1.classList.remove("nemaPrisustva");
                kol1.classList.add("zelena");
              }
              else if (podaci.prisustva[j].vjezbe != null) {
                //  kol1.setAttribute("class", "crvena");
                kol1.classList.remove("nemaPrisustva");
                kol1.classList.add("crvena");

              }
              //   kol1.setAttribute("class", "vjezbe");

            }
            sedmica = sedmica + 1;
            j = -1;
          }
          else if (j == podaci.prisustva.length - 1 && praznaCelija == true) {
            for (let k = 1; k <= podaci.brojPredavanjaSedmicno; k++) {
              let kol = red.appendChild(document.createElement('td'));
              kol.setAttribute("class", "vertikalno");
              kol.innerHTML = "P" + k;
              let kol1 = red1.appendChild(document.createElement('td'));
              kol1.classList.add("nemaPrisustva", "predavanja");

            }
            for (let k = 1; k <= podaci.brojVjezbiSedmicno; k++) {
              let kol = red.appendChild(document.createElement('td'));
              kol.setAttribute("class", "vertikalno");
              kol.innerHTML = "V" + k;
              let kol1 = red1.appendChild(document.createElement('td'));
              kol1.classList.add("nemaPrisustva", "vjezbe");

            }
            sedmica = sedmica + 1;
            j = -1;
          }

        }
      }
      for (let i = maxSedmica + 1; i <= 15; i++) {
        let kol = red.appendChild(document.createElement('td'));
        kol.setAttribute("class", "prazna");
        kol.rowSpan = 2;
        if (i == 15) {
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
    dugmeLijevo = div1.appendChild(document.createElement('button'));
    dugmeLijevo.setAttribute("id", "dugmeLijevo");
    let strelicaLijevo = dugmeLijevo.appendChild(document.createElement('i'));
    strelicaLijevo.setAttribute("class", "fa-solid fa-arrow-left fa-3x");
    dugmeDesno = div1.appendChild(document.createElement('button'));
    dugmeDesno.setAttribute("id", "dugmeDesno");
    let strelicaDesno = dugmeDesno.appendChild(document.createElement('i'));
    strelicaDesno.setAttribute("class", "fa-solid fa-arrow-right fa-3x");
    dugmeDesno.onclick = sljedecaSedmica;
    dugmeLijevo.onclick = prethodnaSedmica;

    let crveneCelije = document.getElementsByClassName("crvena");

    for (let i = 0; i < crveneCelije.length; i++) {
      crveneCelije[i].addEventListener("click", function () {
        console.log("USao u listenr od crv cel")
        let nazivPredmeta = document.getElementById("nazivPredmeta");
        let red = crveneCelije[i].closest('tr');
        let redChildren = red.children;
        let red1 = red.previousElementSibling;
        let index = red1.children[1];
        let j = 0;
        tdElements = red1.children;

        for (j = 2; j < tdElements.length; j++) {
          const td = tdElements[j];
          if (tdElements[j].innerHTML.startsWith("P")) {
            break;
          }
        }
        let brojPredavanja = 0;
        let brojVjezbi = 0;
        let ind = 0;

        for (let k = j; k < tdElements.length; k++) {
          if (tdElements[k].innerHTML.startsWith("V") && redChildren[ind].classList.contains("zelena")) {
            brojVjezbi++;


          }
          else if (tdElements[k].innerHTML.startsWith("P") && redChildren[ind].classList.contains("zelena")) {
            brojPredavanja++;


          }
          ind++;
        }
        console.log("Broj pred", brojPredavanja);
        console.log("Broj vj", brojVjezbi);

        if (crveneCelije[i].classList.contains("predavanja")) {
          brojPredavanja++;
        }
        else {
          brojVjezbi++;
        }
        console.log("Broj pred poslije", brojPredavanja);
        console.log("Broj vj poslije", brojVjezbi);
        tekucaSedmica = j - 1;
        PoziviAjax.postPrisustvo(nazivPredmeta.innerHTML, index.innerHTML, { sedmica: j - 1, predavanja: brojPredavanja, vjezbe: brojVjezbi }, postPrisustvo1)

        //crveneCelije[i].className = "zelena";
      });
    }

    let zeleneCelije = document.getElementsByClassName("zelena");

    for (let i = 0; i < zeleneCelije.length; i++) {
      zeleneCelije[i].addEventListener("click", function () {
        console.log("USao u listenr od crv cel")
        let nazivPredmeta = document.getElementById("nazivPredmeta");
        let red = zeleneCelije[i].closest('tr');
        let redChildren = red.children;
        let red1 = red.previousElementSibling;
        let index = red1.children[1];
        let j = 0;
        tdElements = red1.children;

        for (j = 2; j < tdElements.length; j++) {
          const td = tdElements[j];
          if (tdElements[j].innerHTML.startsWith("P")) {
            break;
          }
        }
        let brojPredavanja = 0;
        let brojVjezbi = 0;
        let ind = 0;

        for (let k = j; k < tdElements.length; k++) {
          if (tdElements[k].innerHTML.startsWith("V") && redChildren[ind].classList.contains("zelena")) {
            brojVjezbi++;


          }
          else if (tdElements[k].innerHTML.startsWith("P") && redChildren[ind].classList.contains("zelena")) {
            brojPredavanja++;


          }
          ind++;
        }
        console.log("Broj pred", brojPredavanja);
        console.log("Broj vj", brojVjezbi);

        if (zeleneCelije[i].classList.contains("predavanja")) {
          brojPredavanja--;
        }
        else {
          brojVjezbi--;
        }
        console.log("Broj pred poslije", brojPredavanja);
        console.log("Broj vj poslije", brojVjezbi);
        tekucaSedmica = j - 1;
        PoziviAjax.postPrisustvo(nazivPredmeta.innerHTML, index.innerHTML, { sedmica: j - 1, predavanja: brojPredavanja, vjezbe: brojVjezbi }, postPrisustvo1)

      });
    }


    let prazneCelije = document.getElementsByClassName("nemaPrisustva");
    console.log("Prazne celije", prazneCelije);
    console.log("Crvene celije", crveneCelije);

    for (let i = 0; i < prazneCelije.length; i++) {
      prazneCelije[i].addEventListener("click", function () {
        console.log("USao u listenr od PRAZNE cel")
        let nazivPredmeta = document.getElementById("nazivPredmeta");
        let red = prazneCelije[i].closest('tr');
        let redChildren = red.children;
        let red1 = red.previousElementSibling;
        let index = red1.children[1];
        let j = 0;
        tdElements = red1.children;

        for (j = 2; j < tdElements.length; j++) {
          const td = tdElements[j];
          if (tdElements[j].innerHTML.startsWith("P")) {
            break;
          }
        }
        let brojPredavanja = 0;
        let brojVjezbi = 0;
        let ind = 0;

        for (let k = j; k < tdElements.length; k++) {
          if (tdElements[k].innerHTML.startsWith("V") && redChildren[ind].classList.contains("zelena")) {
            brojVjezbi++;


          }
          else if (tdElements[k].innerHTML.startsWith("P") && redChildren[ind].classList.contains("zelena")) {
            brojPredavanja++;


          }
          ind++;
        }
        console.log("Broj pred", brojPredavanja);
        console.log("Broj vj", brojVjezbi);

        if (prazneCelije[i].classList.contains("predavanja")) {
          brojPredavanja++;
        }
        else {
          brojVjezbi++;
        }
        console.log("Broj pred poslije", brojPredavanja);
        console.log("Broj vj poslije", brojVjezbi);
        tekucaSedmica = j - 1;
        PoziviAjax.postPrisustvo(nazivPredmeta.innerHTML, index.innerHTML, { sedmica: j - 1, predavanja: brojPredavanja, vjezbe: brojVjezbi }, postPrisustvo1)

      });
    }

  }






  // function postPrisustvo1(xhr) {
  //   if (xhr.readyState == 4 && xhr.status === 200) {
  //     const response = JSON.parse(xhr.response);
  //     console.log("Evo me u postPrisustvo1", response.success);
  //     console.log("Proslijedjeni podaci", response.prisustvo);
  //     if (response.success) {
  //       new TabelaPrisustvo(document.getElementById("tabela"), response.prisustvo);
  //       // new nacrtajTabelu(tekucaSedmica, response.prisustvo);

  //       //    window.sljedecaSedmica = TabelaPrisustvo.sljedecaSedmica;
  //       //  window.prethodnaSedmica = TabelaPrisustvo.prethodnaSedmica;

  //     } else {
  //       alert(response.poruka);
  //     }
  //   }

  // }


  new nacrtajTabelu(tekucaSedmica);


  return {
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica
  }

};