//         //    window.sljedecaSedmica = prisustvo.sljedecaSedmica;
//         //     window.prethodnaSedmica = prisustvo.prethodnaSedmica;

//     console.log("Ucitana stranica!");
//     let crveneCelije = document.getElementsByClassName("crvena");

//     for (let i = 0; i < crveneCelije.length; i++) {
//       crveneCelije[i].addEventListener("click", function () {
//         console.log("USao u listenr od crv cel")
//         let nazivPredmeta = document.getElementById("nazivPredmeta");
//         let red = crveneCelije[i].closest('tr');
//         let redChildren = red.children;
//         let red1 = red.previousElementSibling;
//         let index = red1.children[1];
//         let j = 0;
//         tdElements = red1.children;

//         for (j = 2; j < tdElements.length; j++) {
//           const td = tdElements[j];
//           if (tdElements[j].innerHTML.startsWith("P")) {
//             break;
//           }
//         }
//         let brojPredavanja = 0;
//         let brojVjezbi = 0;
//         let ind = 0;

//         for (let k = j; k < tdElements.length; k++) {
//           if (tdElements[k].innerHTML.startsWith("V") && redChildren[ind].classList.contains("zelena")) {
//             brojVjezbi++;


//           }
//           else if (tdElements[k].innerHTML.startsWith("P") && redChildren[ind].classList.contains("zelena")) {
//             brojPredavanja++;


//           }
//           ind++;
//         }
//         console.log("Broj pred", brojPredavanja);
//         console.log("Broj vj", brojVjezbi);

//         if (crveneCelije[i].classList.contains("predavanja")) {
//           brojPredavanja++;
//         }
//         else {
//           brojVjezbi++;
//         }
//         console.log("Broj pred poslije", brojPredavanja);
//         console.log("Broj vj poslije", brojVjezbi);
//         tekucaSedmica = j - 1;
//         PoziviAjax.postPrisustvo(nazivPredmeta.innerHTML, index.innerHTML, { sedmica: j - 1, predavanja: brojPredavanja, vjezbe: brojVjezbi }, postPrisustvo1)

//         //crveneCelije[i].className = "zelena";
//       });
//     }

//     let zeleneCelije = document.getElementsByClassName("zelena");

//     for (let i = 0; i < zeleneCelije.length; i++) {
//       zeleneCelije[i].addEventListener("click", function () {
//         console.log("USao u listenr od crv cel")
//         let nazivPredmeta = document.getElementById("nazivPredmeta");
//         let red = zeleneCelije[i].closest('tr');
//         let redChildren = red.children;
//         let red1 = red.previousElementSibling;
//         let index = red1.children[1];
//         let j = 0;
//         tdElements = red1.children;

//         for (j = 2; j < tdElements.length; j++) {
//           const td = tdElements[j];
//           if (tdElements[j].innerHTML.startsWith("P")) {
//             break;
//           }
//         }
//         let brojPredavanja = 0;
//         let brojVjezbi = 0;
//         let ind = 0;

//         for (let k = j; k < tdElements.length; k++) {
//           if (tdElements[k].innerHTML.startsWith("V") && redChildren[ind].classList.contains("zelena")) {
//             brojVjezbi++;


//           }
//           else if (tdElements[k].innerHTML.startsWith("P") && redChildren[ind].classList.contains("zelena")) {
//             brojPredavanja++;


//           }
//           ind++;
//         }
//         console.log("Broj pred", brojPredavanja);
//         console.log("Broj vj", brojVjezbi);

//         if (zeleneCelije[i].classList.contains("predavanja")) {
//           brojPredavanja--;
//         }
//         else {
//           brojVjezbi--;
//         }
//         console.log("Broj pred poslije", brojPredavanja);
//         console.log("Broj vj poslije", brojVjezbi);
//         tekucaSedmica = j - 1;
//         PoziviAjax.postPrisustvo(nazivPredmeta.innerHTML, index.innerHTML, { sedmica: j - 1, predavanja: brojPredavanja, vjezbe: brojVjezbi }, postPrisustvo1)

//       });
//     }


//     let prazneCelije = document.getElementsByClassName("nemaPrisustva");
//     console.log("Prazne celije", prazneCelije);
//     console.log("Crvene celije", crveneCelije);

//     for (let i = 0; i < prazneCelije.length; i++) {
//       prazneCelije[i].addEventListener("click", function () {
//         console.log("USao u listenr od PRAZNE cel")
//         let nazivPredmeta = document.getElementById("nazivPredmeta");
//         let red = prazneCelije[i].closest('tr');
//         let redChildren = red.children;
//         let red1 = red.previousElementSibling;
//         let index = red1.children[1];
//         let j = 0;
//         tdElements = red1.children;

//         for (j = 2; j < tdElements.length; j++) {
//           const td = tdElements[j];
//           if (tdElements[j].innerHTML.startsWith("P")) {
//             break;
//           }
//         }
//         let brojPredavanja = 0;
//         let brojVjezbi = 0;
//         let ind = 0;

//         for (let k = j; k < tdElements.length; k++) {
//           if (tdElements[k].innerHTML.startsWith("V") && redChildren[ind].classList.contains("zelena")) {
//             brojVjezbi++;


//           }
//           else if (tdElements[k].innerHTML.startsWith("P") && redChildren[ind].classList.contains("zelena")) {
//             brojPredavanja++;


//           }
//           ind++;
//         }
//         console.log("Broj pred", brojPredavanja);
//         console.log("Broj vj", brojVjezbi);

//         if (prazneCelije[i].classList.contains("predavanja")) {
//           brojPredavanja++;
//         }
//         else {
//           brojVjezbi++;
//         }
//         console.log("Broj pred poslije", brojPredavanja);
//         console.log("Broj vj poslije", brojVjezbi);
//         tekucaSedmica = j - 1;
//         PoziviAjax.postPrisustvo(nazivPredmeta.innerHTML, index.innerHTML, { sedmica: j - 1, predavanja: brojPredavanja, vjezbe: brojVjezbi }, postPrisustvo1)

//       });
//     }



// function postPrisustvo1(xhr) {
//     if (xhr.readyState == 4 && xhr.status === 200) {
//       const response = JSON.parse(xhr.response);
//       console.log("Evo me u postPrisustvo1", response.success);
//       console.log("Proslijedjeni podaci", response.prisustvo);
//       if (response.success) {
//         new TabelaPrisustvo(document.getElementById("tabela"), response.prisustvo);
//         // new nacrtajTabelu(tekucaSedmica, response.prisustvo);

//         //    window.sljedecaSedmica = TabelaPrisustvo.sljedecaSedmica;
//         //  window.prethodnaSedmica = TabelaPrisustvo.prethodnaSedmica;

//       } else {
//         alert(response.poruka);
//       }
//     }

//   }


// // new TabelaPrisustvo(document.getElementById("tabela"), {
// //     "studenti": [{
// //         "ime": "Neko Nekić",
// //         "index": 12345
// //     },
// //     {
// //         "ime": "Neko Nekić",
// //         "index": 12346
// //     },
// //     {
// //     "ime": "Neko Nekić",
// //     "index": 12347
// //     },
// //     {
// //     "ime": "Nejla Becirspahic",
// //     "index": 18835
// //     }
// // ],
// // "prisustva": [{
// //         "sedmica": 1,
// //         "predavanja": 2,
// //         "vjezbe": 2,
// //         "index": 12345
// //     },
// //     {
// //         "sedmica": 1,
// //         "predavanja": 1,
// //         "vjezbe": 2,
// //         "index": 18835
// //     },
// //     {
// //         "sedmica": 1,
// //         "predavanja": 2,
// //         "vjezbe": 2,
// //         "index": 12346
// //     },
// //     {
// //         "sedmica": 1,
// //         "predavanja": 2,
// //         "vjezbe": 2,
// //         "index": 12347
// //     },
// //     {
// //         "sedmica": 2,
// //         "predavanja": 2,
// //         "vjezbe": 2,
// //         "index": 12345
// //     },
// //     {
// //         "sedmica": 2,
// //         "predavanja": 2,
// //         "vjezbe": 2,
// //         "index": 12346
// //     },
// //     {
// //         "sedmica": 2,
// //         "predavanja": 2,
// //         "vjezbe": 2,
// //         "index": 12347
// //     },
// //     {
// //         "sedmica": 3,
// //         "predavanja": 2,
// //         "vjezbe": 2,
// //         "index": 12345
// //     },
// //     {
// //         "sedmica": 3,
// //         "predavanja": 2,
// //         "vjezbe": 0,
// //         "index": 12346
// //     },
// //     {
// //         "sedmica": 3,
// //         "predavanja": 2,
// //         "vjezbe": 2,
// //         "index": 12347
// //     },
// //     {
// //         "sedmica": 4,
// //         "predavanja": 2,
// //         "vjezbe": 2,
// //         "index": 12345
// //     },
// //     {
// //         "sedmica": 4,
// //         "predavanja": 1,
// //         "vjezbe": 1,
// //         "index": 12346
// //     },
// //     {
// //         "sedmica": 4,
// //         "predavanja": 2,
// //         "vjezbe": 2,
// //         "index": 12347
// //     }
// // ],
// // "predmet": "Razvoj mobilnih aplikacija",
// // "brojPredavanjaSedmicno": 2,
// // "brojVjezbiSedmicno": 2

// // }
// // );

// // // window.sljedecaSedmica = prisustvo.sljedecaSedmica;
// // // window.prethodnaSedmica = prisustvo.prethodnaSedmica;