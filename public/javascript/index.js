const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(response => {
        let charactersArray = response.data, container = '' ///lo trato como un array y utilizo los <div>
        charactersArray.forEach(elm => container +=
          `<div class="character-info"> 
          <div class="name">${elm.name}</div>
          <div class="occupation">${elm.ocupation}</div>
          <div class="cartoon">${elm.cartoon}</div>
          <div class="weapon">${elm.weapon}</div>
          </div>`
        )
        document.querySelector('.characters-container').innerHTML = container 
        //vale Teo tenia me faltaba una s en characters...me he tirado un ratito con eso....me voy a tatuar la S...siempre tengo un error por que me falta una s o me sobra....

      })
      .catch(err => console.log(err))
  });



  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const characterId = document.querySelector('.operation input').value
    charactersAPI
        .getOneRegister(characterId)
        .then(response => {
      document.querySelector('.characters-container').innerHTML =
          `<div class="character-info"> 
          <div class="name">${response.data.name}</div>
          <div class="occupation">${response.data.occupation}</div>
          <div class="cartoon">${response.data.cartoon}</div>
          <div class="weapon">${response.data.weapon}</div>
          <div class="id">id${response.data.id}</div>
          </div>`
      })
        .catch(err => console.log(err))

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
     const characterId = document.querySelector('.operation.delete input').value   
     charactersAPI
            .deleteOneRegister(characterId)
            .then(() =>document.getElementById('delete-one'))
            .catch(err => console.log(err))
            //Teo me borra los personajes pero no lo veo que interactue en la web como podria hacerlo??




  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {




  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
  
    const name = document.querySelectorAll('#new-character-form .field input[name="name"]').value
    const occupation = document.querySelectorAll('#new-character-form .field input[name="occupation"]').value
    const cartoon = document.querySelectorAll('#new-character-form .field input[name="cartoon"]').value
    const weapon = document.querySelectorAll('#new-character-form .field input[name="weapon"]').value

    // const newCharacter = {
      
    //   name:input[0].value,
    //   occupation: input[1].value, 
    //   cartoon: input[2].value, 
    //   weapon: input[3]
    // }

    charactersAPI
        .createOneRegister() //aqui metia el argumento newCharacter, pero no funciona asi tampoco...
        .then(() => {
          
          //document.querySelector('.characters-container').innerHTML....esto son mas pistolas....sorry
          e.targert.reset()
        })
        .catch(err => console.log(err))
        // Teo no consigo crear a Goku con su Onda Vital....pero creo Undefined que es mas temido!!!





  });
});
