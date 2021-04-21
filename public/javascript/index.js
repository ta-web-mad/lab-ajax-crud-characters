const charactersAPI = new APIHandler()

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(response => {
        //1. sacamos la info a una variable
        console.log(response.data)
        const { data } = response
        // const charactersInfo = response.data

        //2. creamos un html con la info
        let charactersList = ''
        data.forEach(elm => charactersList += `<li>Name: ${elm.name}<br> Occupation: ${elm.occupation} <br> Is a cartoon? ${elm.cartoon} <br> Weapon: ${elm.weapon}</li>`)

        //3. la pintamos en la pagina
        document.querySelector('#currentCharacters').innerHTML = charactersList
      })
      .catch(err => console.log('error', err))
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    event.preventDefault()
    const characterId = document.querySelector('.operation input').value
    console.log(characterId, "el id del personaje")
    if (characterId) {

      charactersAPI
        .getOneRegister(characterId)
        .then(response => {
          let charInfo = response.data

          let character = ''
          character += `<li>Name: ${charInfo.name} <br> Occupation: ${charInfo.occupation} <br> Is a cartoon? ${charInfo.cartoon} <br> Weapon: ${charInfo.weapon}</li>`



          document.querySelector('#theCharacter').innerHTML = character
        })
        .catch(err => console.log('error', err))

    }
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')

    const character = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }

    const characterId = inputs[0].value

    charactersAPI
      .updateOneRegister(characterId, character)
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log('error', err))
  });






  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')

    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
      .createOneRegister(character)
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log('error', err))
  });
});
