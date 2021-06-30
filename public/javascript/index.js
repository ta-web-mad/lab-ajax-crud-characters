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

    function loadCharactersFromAPI() {

      charactersAPI
        //lo pasamos como parametro de la funcion desplegar uno y añadimos sus datos
        .displayOne(singleID)
        .then(elm => {
          console.log(elm);


          //IMPORTANTE PONER ELM.DATA porque data es una key del objeto elm que  asu vez es otro objeto  y accedemos a su valor .name


          let character = `<div class="character-info">

          
        <div class="name">Character Name: ${elm.data.name}</div>
        <div class="occupation">Character Occupation: ${elm.data.occupation}</div>
        <div class="cartoon">Is a Cartoon? ${elm.data.cartoon}</div>
        <div class="weapon">Character Weapon: ${elm.data.weapon}</div>

      </div> `

          document.querySelector('.characters-container').innerHTML = character


        })
        .catch(err => console.log(err))
    }





    loadCharactersFromAPI(singleID)

  })


    //console.log(singleCharacter)

    ;

  document.getElementById('delete-one').addEventListener('click', function (event) {

    let singleID = document.querySelector('.operation.delete input').value
    //tomamos el valor del ID introducido

    function removeCharactersFromAPI() {

      charactersAPI
        //lo pasamos como parametro de la funcion remove 
        .deleteOneRegister(singleID,)//no metemos info porque queremos eliminar, en el caso de editar aquí si habrá que pasarle datos
        .then(() => {
          //METER EL COLOR DEK BOTON A VERDE

        })
        .catch(err => console.log(err))//PONER EL BOTON EN ROJO SI ALGO HA FALLADO
    }

    removeCharactersFromAPI(singleID)

  })









  document.getElementById('edit-character-form').addEventListener('submit', function (event) {




    //   document.querySelector('#getCharacterInfoForm').onsubmit = e => {

    //   e.preventDefault()

    //     Let singleID = document.querySelector('#edit-character-form input').value

    //   apiHandler

    //     .displayOne(singleID)
    //     .then(response => {
    //       fillCharacterEditForm(response.data)
    //       document.querySelector('#edit-character-form').reset()
    //     })
    //     .catch(err => console.log(err))
    // }


  });

  document.querySelector('#new-character-form #send-data').addEventListener('submit', function (event) {



    let campo = document.querySelectorAll('#new-character-form input')

 let character = campo.forEach(elm=> elm.value)
  

    



    charactersAPI

      .createOneRegister(character)
      //método con el que añadimos un registro nuevo pasándole el argumento del nuevo character
      //genera un request de tipo post que lke envia los datos a la api mediante axios
      .then(() => {
        loadCharactersFromAPI()
        document.querySelector('#new-character-form').reset()
      })
      .catch(err => console.log(err))
  })




});
