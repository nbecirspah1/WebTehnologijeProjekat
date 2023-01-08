new TabelaPrisustvo(document.getElementById("tabela"), {
    "studenti": [{
        "ime": "Neko Nekić",
        "index": 12345
    },
    {
        "ime": "Neko Nekić",
        "index": 12346
    },
    {
    "ime": "Neko Nekić",
    "index": 12347
    },
    {
    "ime": "Nejla Becirspahic",
    "index": 18835
    }
],
"prisustva": [{
        "sedmica": 1,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12345
    },
    {
        "sedmica": 1,
        "predavanja": 1,
        "vjezbe": 2,
        "index": 18835
    },
    {
        "sedmica": 1,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12346
    },
    {
        "sedmica": 1,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12347
    },
    {
        "sedmica": 2,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12345
    },
    {
        "sedmica": 2,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12346
    },
    {
        "sedmica": 2,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12347
    },
    {
        "sedmica": 3,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12345
    },
    {
        "sedmica": 3,
        "predavanja": 2,
        "vjezbe": 0,
        "index": 12346
    },
    {
        "sedmica": 3,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12347
    },
    {
        "sedmica": 4,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12345
    },
    {
        "sedmica": 4,
        "predavanja": 1,
        "vjezbe": 1,
        "index": 12346
    },
    {
        "sedmica": 4,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12347
    }
],
"predmet": "Razvoj mobilnih aplikacija",
"brojPredavanjaSedmicno": 2,
"brojVjezbiSedmicno": 2

}
);

window.sljedecaSedmica = prisustvo.sljedecaSedmica;
window.prethodnaSedmica = prisustvo.prethodnaSedmica;