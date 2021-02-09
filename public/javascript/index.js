const charactersAPI = new APIHandler('https://minions-api.herokuapp.com')

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(response => {
        let charArray = response.data, card = ''
        charArray.forEach(elm => card += `<div class="character-info">
        <div class="id">Id: <big>${elm.id}</big></div>
        <div class="name">Name: <big>${elm.name}</big></div>
        <div class="occupation">Occupation: <big>${elm.occupation}</big></div>
        <div class="cartoon">Is a Cartoon? <big>${elm.cartoon}</big></div>
        <div class="weapon">Weapon: <big>${elm.weapon}</big></div>
        </div>`)
        document.querySelector('.characters-container').innerHTML = card
      })
      .catch(err => console.log('ERROR', err))
  })

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const characterId = document.querySelector('.operation input').value

    charactersAPI
      .getOneRegister(characterId)
      .then(response => {
        document.querySelector('.characters-container').innerHTML =
          `<div class="character-info">
          <div class="id">Id: <big>${response.data.id}</big></div>
          <div class="name">Name: <big>${response.data.name}</big></div>
          <div class="occupation">Occupation: <big>${response.data.occupation}</big></div>
          <div class="cartoon">Is a Cartoon? <big>${response.data.cartoon}</big></div>
          <div class="weapon">Weapon: <big>${response.data.weapon}</big></div>
          </div>`
      })
      .catch(err => console.log('ERROR', err))
  })

  document.getElementById('delete-one').addEventListener('click', function (event) {

    const characterId = document.querySelector('.operation.delete input').value

    charactersAPI
      .deleteOneRegister(characterId)
      .then(() => document.getElementById('delete-one').style.backgroundColor = 'green')
      .catch(err => {
        document.getElementById('delete-one').style.backgroundColor = 'red'
        console.log('ERROR', err)
      })
  })

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const id = document.querySelector('#edit-character-form .field input[name="chr-id"]').value
    const name = document.querySelector('#edit-character-form .field input[name="name"]').value
    const occupation = document.querySelector('#edit-character-form .field input[name="occupation"]').value
    const weapon = document.querySelector('#edit-character-form .field input[name="weapon"]').value
    const cartoon = document.querySelector('#edit-character-form .field input[name="cartoon"]').checked

    const editedCharacter = { name, occupation, weapon, cartoon }

    charactersAPI
      .updateOneRegister(id, editedCharacter)
      .then(() => document.getElementById('send-data-updated').style.backgroundColor = 'green')
      .catch(err => {
        console.log('ERROR', err)
      })
  })

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const name = document.querySelector('#new-character-form .field input[name="name"]').value
    const occupation = document.querySelector('#new-character-form .field input[name="occupation"]').value
    const weapon = document.querySelector('#new-character-form .field input[name="weapon"]').value
    const cartoon = document.querySelector('#new-character-form .field input[name="cartoon"]').checked

    const newCharacter = { name, occupation, weapon, cartoon }

    if (newCharacter.name === '') {
      document.getElementById('send-data').style.backgroundColor = 'red'
    } else {
      charactersAPI
        .createOneRegister(newCharacter)
        .then(() => document.getElementById('send-data').style.backgroundColor = 'green')
        .catch(err => {
          console.log('ERROR', err)
        })
    }
  })
})
