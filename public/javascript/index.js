const charactersAPI = new APIHandler('https://minions-api.herokuapp.com');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function () {
    loadCharactersFromAPI()
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    event.preventDefault()
    loadCharacterIdFromAPI()
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault()
    deleteCharacterIdFromAPI()

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    editCharacterIdFromAPI()
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    createCharacterFromAPI()
  });
});


function loadCharactersFromAPI() {

  charactersAPI
    .getFullList()
    .then(response => {
      console.log(response.data)
      let characters = ''
      response.data.reverse().forEach(elm => {
        characters += `<div class="character-info">
        <div class="id">Id: ${elm.id}</div>
        <div class="name">Name: ${elm.name}</div>
        <div class="occupation">Occupation: ${elm.occupation}</div>
        <div class="cartoon">Cartoon: ${elm.cartoon}</div>
        <div class="weapon">Weapon: ${elm.weapon}</div>
        </div>`
      })
      document.querySelector('.characters-container').innerHTML = characters
    })
    .catch(err => console.log(err))
}

function loadCharacterIdFromAPI() {
  const characterId = document.querySelector('.fetch').value
  console.log(characterId)

  charactersAPI
    .getOneRegister(characterId)
    .then(response => {
      //console.log(response.data)
      let characters =

        `<div class="character-info">
        <div class="id">Id: ${response.data.id}</div>
        <div class="name">name: ${response.data.name}</div>
        <div class="occupation">occupation: ${response.data.occupation}</div>
        <div class="cartoon">cartoon: ${response.data.cartoon}</div>
        <div class="weapon">weapon: ${response.data.weapon}</div>
        </div>`

      document.querySelector('.characters-container').innerHTML = characters
      fillCharacterEditForm(response.data)
      document.querySelector('.fetch').value = ''
    })
    .catch(err => console.log(err))
}

function deleteCharacterIdFromAPI() {
  const characterId = document.querySelector('.fetch-delete').value
  const deleteButton = document.querySelector('#delete-one')
  //console.log(characterId)
  console.log(deleteButton)


  charactersAPI
    .deleteOneRegister(characterId)
    .then(response => {
      //console.log(response.data)
      console.log('Se ha eliminado', response.data)
      if (response.data === null) {
        deleteButton.style.backgroundColor = "red"
      } else {
        deleteButton.style.backgroundColor = "green"
      }
      document.querySelector('.fetch-delete').value = ''
    })
    .catch(err => console.log(err))
}

function createCharacterFromAPI() {
  const inputs = document.querySelectorAll('#new-character-form input')
  const createButton = document.querySelector('.create-button')
  cartoonValue = () => inputs[3].value === 'on' ? inputs[3].value = true : inputs[3].value = false

  console.log(inputs)


  const character = {
    name: inputs[0].value,
    occupation: inputs[1].value,
    weapon: inputs[2].value,
    cartoon: cartoonValue()
  }
  console.log(character)

  charactersAPI
    .createOneRegister(character)
    .then(response => {
      loadCharactersFromAPI()
      if (response.data === null) {
        createButton.style.backgroundColor = "red"
      } else {
        createButton.style.backgroundColor = "green"
      }
      document.querySelector('#new-character-form').reset()
    })
    .catch(err => {
      console.log(err)
      createButton.style.backgroundColor = "red"
    })

}

function fillCharacterEditForm(info) {

  const inputs = document.querySelectorAll('#edit-character-form input')
  cartoonValue = () => inputs[4].value === 'true' ? inputs[4].value = 'on' : inputs[4].value = ''

  console.log(inputs)

  inputs[0].value = info.id
  inputs[1].value = info.name
  inputs[2].value = info.occupation
  inputs[3].value = info.weapon
  inputs[4].value = cartoonValue()

}

function editCharacterIdFromAPI() {
  const inputs = document.querySelectorAll('#edit-character-form input')
  cartoonValue = () => inputs[4].value === 'on' ? inputs[4].value = true : inputs[4].value = false

  const character = {
    name: inputs[1].value,
    occupation: inputs[2].value,
    weapon: inputs[3].value,
    cartoon: cartoonValue()
  }

  const characterId = inputs[0].value             // Hidden input

  charactersAPI
    .updateOneRegister(characterId, character)
    .then(response => {
      //loadCharactersFromAPI()
      document.querySelector('#edit-character-form').reset()
    })
    .catch(err => console.log(err))

}