const charactersAPI = new APIHandler('http://localhost:8000');


function loadCharactersFromAPI() {

  charactersAPI
    .getFullList()
    .then(response => {
      let characters = ''
      response.data.reverse().forEach(elm => characters +=
        `<div class="characters-container">
      <div class="character-info">
        <div class="name">Character Name: ${elm.name} (ID: ${elm.id})</div>
        <div class="occupation">Character Occupation: ${elm.occupation}</div>
        <div class="cartoon">Is a Cartoon?</div>
        <div class="cartoon">Is a Cartoon? ${elm.cartoon}</div>
        <div class="weapon">Character Weapon: ${elm.weapon}</div>
    </div>
  </div>`)
      document.querySelector('#fetch-all-container').innerHTML = characters
    })
    .catch(err => console.log(err))

}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function () {

    loadCharactersFromAPI()

  })

  document.getElementById('fetch-one').addEventListener('click', function (e) {

    e.preventDefault()

    const characterId = document.querySelector('#fetch-one-input').value

    charactersAPI
      .getOneRegister(characterId)
      .then(response => {
        let characters = `<div class="characters-container">
      <div class="character-info">
        <div class="name">Character Name: ${response.data.name} (ID: ${response.data.id})</div>
        <div class="occupation">Character Occupation: ${response.data.occupation}</div>
        <div class="cartoon">Is a Cartoon?</div>
        <div class="cartoon">Is a Cartoon? ${response.data.cartoon}</div>
        <div class="weapon">Character Weapon: ${response.data.weapon}</div>
    </div>
  </div>`
        document.querySelector('#fetch-one-container').innerHTML = characters
        fillCharacterEditForm(response.data)
      })
      .catch(err => console.log(err))
  })


  function fillCharacterEditForm(info) {

    const inputs = document.querySelectorAll('#edit-character-form input')

    inputs[0].value = info.id
    inputs[1].value = info.name
    inputs[2].value = info.occupation                       // Hidden input
    inputs[3].value = info.weapon
   // inputs[4].value = info.cartoon        Esta iteración no consigo hacer que salga marcada por defecto si es un cartoon
  }

  document.getElementById('delete-one').addEventListener('click', function (e) {

    e.preventDefault()

    const characterId = document.querySelector('#delete-one-input').value

    charactersAPI
      .deleteOneRegister(characterId)
      .then(response => {
        if (!response.data) {
          document.getElementById('delete-one').classList.add('non-deleted')
        } else {
          document.getElementById('delete-one').classList.add('deleted')
          loadCharactersFromAPI()
          document.querySelector('#delete-one-input').reset()
        }

      })
      .catch(err => {
        document.getElementById('delete-one').classList.add('non-deleted')
        console.log(err)
      })


  })


  document.getElementById('edit-character-form').addEventListener('submit', function (e) {

    e.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')

    const character = {
      name: inputs[1].value,
      weapon: inputs[2].value,
      occupation: inputs[3].value,
      cartoon: ifCartoon()
    }

    function ifCartoon() {
      if (inputs[4].value === 'on') {
        return true
      } else {
        return false
      }
    }
   

    const characterId = inputs[0].value             // Hidden input

    charactersAPI
      .updateOneRegister(characterId, character)
      .then(() => {
        loadCharactersFromAPI()
        document.querySelector('#edit-character-form').reset()
        document.querySelector('#fletch-one').reset()
      })
      .catch(err => console.log(err))

  })

  document.getElementById('new-character-form').addEventListener('submit', function (e) {

    e.preventDefault()          

    const inputs = document.querySelectorAll('#new-character-form input')

    const character = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value,
        cartoon: ifCartoon()
      }

      console.log(character)

      function ifCartoon() {
        if (inputs[3].value === 'on') {
          return true
        } else {
          return false
        }
      }


    charactersAPI
        .createOneRegister(character)
        .then(() => {
            loadCharactersFromAPI()
            document.querySelector('#new-character-form').reset()
        })
        .catch(err => console.log(err))

  })
})
