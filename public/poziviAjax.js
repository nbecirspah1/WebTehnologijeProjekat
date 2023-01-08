const PoziviAjax = (()=>{

    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){

    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){

    }
    function impl_postLogin(username,password,fnCallback){
        // Listen for the form submission
    document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
  
    // Get the values of the form fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Create a JSON object with the form data
    const data = { username, password };
  
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
  
    // Set the callback function for when the request completes
    xhr.onload = () => {
      if (xhr.status === 200) {
        // If the request was successful, parse the JSON response
        const response = JSON.parse(xhr.response);
  
        if (response.success) {
          // If the login was successful, redirect the user to the dashboard
          window.location.href = '/html/predmet.html';
          //window.location.replace("/predmet.html");
        } else {
          // If the login was unsuccessful, display an error message
          alert(response.message);
        }
      } else {
        // If the request was unsuccessful, display an error message
        alert('An error occurred');
      }
    };
  
    // Open the request and send it
    xhr.open('POST', '/prijava.html');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  });
      }
    function impl_postLogout(fnCallback){

    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){

    }

    return{
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getPredmet: impl_getPredmet,
        getPredmeti: impl_getPredmeti,
        postPrisustvo: impl_postPrisustvo
    };
})();

