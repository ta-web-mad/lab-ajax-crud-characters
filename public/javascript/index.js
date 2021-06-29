const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function () {

    charactersAPI
      .getFullList()
      .then(response => {
        let characters = ''
        response.data.reverse().forEach(elm => {
          characters += `<div class="character-info">
          <div class="id">${elm.id}</div>
        <div class="name">${elm.name}</div>
        <div class="occupation">${elm.occupation}</div>
        <div class="cartoon">${elm.cartoon}</div>
        <div class="weapon">${elm.weapon}</div>
        </div >`
        })
        document.querySelector('.characters-container').innerHTML = characters
      })
      .catch(err => console.log(err))
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    event.preventDefault()

    const characterId = document.querySelector('.search-id').value
    console.log(characterId)

    charactersAPI

      .getOneRegister(characterId)
      .then(response => {
        console.log(response.data)
        let character =
          `<div class="character-info">
           <div class="id">${response.data.id}</div>
        <div class="name">${response.data.name}</div>
        <div class="occupation">${response.data.occupation}</div>
        <div class="cartoon">${response.data.cartoon}</div>
        <div class="weapon">${response.data.weapon}</div>
        </div >`
        console.log(character)
        document.querySelector('.characters-container').innerHTML = character
      })
      .catch(err => console.log(err))



  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault()
    const button = document.querySelector("#delete-one")
    const characterId = document.querySelector('.delete-id').value
    console.log(characterId)

    charactersAPI

      .deleteOneRegister(characterId)
      .then(response => {
        if (response.data === null) {
          button.style.backgroundcolor = 'red'
        } else
          button.style.backgroundcolor = 'red'
      })

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')

    const character = {
      characterId: inputs[0].value,
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].value
    }
    const characterId = inputs[0].value
    charactersAPI

      .updateOneRegister(characterId, character)
      .then(() => {

        document.querySelector('#edit-character-form').reset()
      })
      .catch(err => console.log(err))


  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')

    console.log(inputs)
    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].value

    }
    console.log(character)

    charactersAPI
      .createOneRegister(character)
      .then(() => {
        console.log(character)
        document.querySelector('#new-character-form').reset()
      })
      .catch(err => console.log(err))




  });
});
