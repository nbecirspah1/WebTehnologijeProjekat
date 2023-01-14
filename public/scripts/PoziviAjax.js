const PoziviAjax = (()=>{

    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){
      console.log("USAO U AJAX FJU GETPREDMET")
      const xhr = new XMLHttpRequest();
      xhr.open('GET',  `http://localhost:3000/predmet/${naziv}`, true);
      xhr.responseType = 'json';
      xhr.onreadystatechange = function(){fnCallback(xhr);}
      xhr.send();
    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
     function impl_getPredmeti(fnCallback){
      const xhr = new XMLHttpRequest();
      console.log("Usao u ajax get Predmeti");
      //xhr.overrideMimeType("application/json");

      xhr.open('GET', 'http://localhost:3000/predmeti', true);
      xhr.responseType = 'json';
      xhr.onreadystatechange = function(){fnCallback(xhr);}
      xhr.send();
    
     }
    function impl_postLogin(username,password,fnCallback){
  

  
    const data = { username, password };
  
    const xhr = new XMLHttpRequest();
    console.log("Usao u ajax");
   
    xhr.onreadystatechange = function(){fnCallback(xhr);}
    xhr.open('POST', 'http://localhost:3000/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({data: {username, password}}));
  
      }
    function impl_postLogout(fnCallback){
      const xhr = new XMLHttpRequest();
      console.log("Usao u impl_postLogout");
      xhr.onreadystatechange = function(){fnCallback(xhr);}
      xhr.open('POST', 'http://localhost:3000/logout', true);   
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
    }
    // //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
     // const data = { prisustvo };
      const xhr = new XMLHttpRequest();
      console.log("Usao u ajax impl_postPrisustvo");
     
      xhr.onreadystatechange = function(){fnCallback(xhr);}
      xhr.open('POST', `http://localhost:3000/prisustvo/predmet/${naziv}/student/${index}`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(prisustvo));
  
     }

    return{
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getPredmet: impl_getPredmet,
        getPredmeti: impl_getPredmeti,
        postPrisustvo: impl_postPrisustvo
    };
})();

// window.impl_postLogin = PoziviAjax.impl_postLogin;