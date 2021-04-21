const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    
    charactersAPI
      .getFullList()
      .then(response =>{
        console.log(response)
        const { data } = response
        let characterList = ''
        data.forEach(elm => {
        characterList +=  `<div class="character-info"> <li> ${elm.name} <br> ${elm.occupation}<br> ${elm.weapon}</li></div>`
        })
        document.querySelector('.characters-container').innerHTML = characterList
      })
      .catch(err => console.log('error', err))

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const characterId = document.querySelector('#searchById').value

     charactersAPI
      .getOneRegister(characterId)
      .then(oneCharacter =>{
        console.log('este el character', oneCharacter) //dos horas atascado aqui y todo por que ponia numeros que habian borrado mis compañeros hasta que he caido... 

        const character = oneCharacter.data

        const characterList = `<div class="character-info"> 
        <li>  name: ${character.name} 
        <br> occupation: ${character.occupation}
        <br> weapon: ${character.weapon}</li>
        </div>`
        console.log(characterList)
        
        document.querySelector('.characters-container').innerHTML = characterList
      })
      .catch(err => console.log('error', err))

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    const characterIdDel = document.querySelector('#deleteById').value

    charactersAPI
      .deleteOneRegister(characterIdDel)
      .then(() => {
        window.alert('borrado con exito')
      })
      .catch(err => console.log('error', err))

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const editInputs = document.querySelectorAll('#edit-character-form input')

    console.log(editInputs)

    const editCharacter = {
      name: editInputs[1].value,
      occupation: editInputs[2].value,
      weapon: editInputs[3].value
    }

    charactersAPI
      .updateOneRegister(editInputs[0].value, editCharacter)
      .then(() => {
        document.querySelector('#edit-character-form').reset()
      })
      .catch(err => console.log('errorrr',err))
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')
    console.log(inputs[0].value)

    const newCharacter = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value
    }

    charactersAPI
      .createOneRegister(newCharacter)
      .then(() => {
        document.querySelector('#newCharacterForm').reset()
      })
      .catch(err => console.log(err))
  });
});
