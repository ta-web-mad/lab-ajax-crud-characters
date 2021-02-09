const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(response => {
      let charactersArray = response.data, container = '' ///lo trato como un array y utilizo los <div>
      charactersArray.forEach(elm => container += `<div class="character-info"> 
      <div class="name">${elm.name}</div>
      <div class="name">${elm.ocupation}</div>
      <div class="name">${elm.cartoon}</div>
      <div class="name">${elm.weapon}</div>
      </div>`)
      document.querySelector('.characters-container').innerHTML = container // me sale el error TypeError: Cannot set property 'innerHTML' of null
      //vale Teo tenia me faltaba una s en characters...me he tirado un ratito con eso....me voy a tatuar la S...siempre tengo un error por que me falta una s o me sobra....

    })
      .catch(err => console.log(err))
  });



  document.getElementById('fetch-one').addEventListener('click', function (event) {




  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

  });
});
