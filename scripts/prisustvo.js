new TabelaPrisustvo(document.getElementById("tabela"), {
	"studenti": [{
			"ime": "Neko Nekic",
			"index": 12345
		},
		{
			"ime": "Drugi Neko",
			"index": 12346
		},
		/*{
			"ime": "Neko Nekic1",
			"index": 12347
		},
		{
			"ime": "Drugi Neko2",
			"index": 12348
		}*/
	],
	"prisustva": [
			{
			"sedmica": 3,
			"predavanja": 2,
			"vjezbe": 0,
			"index": 12346
		},
			{
			"sedmica": 2,
			"predavanja": 2,
			"vjezbe": 0,
			"index": 12346
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
			"vjezbe": 0,
			"index": 12345
		}
		,{
			"sedmica": 2,
			"predavanja": 2,
			"vjezbe": 1,
			"index": 12345
		},
		{
			"sedmica": 3,
			"predavanja": 2,
			"vjezbe": 0,
			"index": 12345
		},
        {
			"sedmica": 4,
			"predavanja": 2,
			"vjezbe": 0,
			"index": 12346
		},
        
		{
			"sedmica": 4,
			"predavanja": 2,
			"vjezbe": 0,
			"index": 12345
		}
	],
	"predmet": "Razvoj mobilnih aplikacija",
	"brojPredavanjaSedmicno": 2,
	"brojVjezbiSedmicno": 2
}
);

window.sljedecaSedmica = prisustvo.sljedecaSedmica;
window.prethodnaSedmica = prisustvo.prethodnaSedmica;