const charactersAPI = new APIHandler('http://localhost:8000');


function loadCharactersFromAPI() {

  charactersAPI

    .getFullList()
    .then(response => {
      let characters = ''

      //iteramos sobre cada elemento del array, accediendo a la key data donde el value son todos las propiedades del minion
      response.data.forEach(elm => characters +=

        `
      <div class="character-info">

        <div class="name">Character Name: ${elm.name}</div>
        <div class="occupation">Character Occupation: ${elm.occupation}</div>
        <div class="cartoon">Is a Cartoon? ${elm.cartoon}</div>
        <div class="weapon">Character Weapon: ${elm.weapon}</div>

      </div> `)
      //seleccionamos donde queremos desplegarlo
      document.querySelector('.characters-container').innerHTML = characters
    })
    .catch(err => console.log(err))

}

window.addEventListener('load', () => {


  document.getElementById('fetch-all').addEventListener('click', function (event) {
    //una vez clickado el boton fetch all se realiza la función para cargar todos los caracteres
    loadCharactersFromAPI()

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    let singleID = document.querySelector('.operation input').value
    //tomamos el valor del ID introducido

    charactersAPI
      //lo pasamos como parametro de la funcion desplegar uno y añadimos sus datos
      .displayOne(singleID)
      .then(elm => {console.log(response);

        let character = `<div class="character-info">

        <div class="name">Character Name: ${elm.name}</div>
        <div class="occupation">Character Occupation: ${elm.occupation}</div>
        <div class="cartoon">Is a Cartoon? ${elm.cartoon}</div>
        <div class="weapon">Character Weapon: ${elm.weapon}</div>

      </div> `

        document.querySelector('.characters-container').innerHTML = character

      })
      .catch(err => console.log(err))


  })
      //console.log(singleCharacter)

      ;

  document.getElementById('delete-one').addEventListener('click', function (event) {

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

  });
});
