const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    event.preventDefault()
    charactersAPI
      .getFullList()
      .then(response => {
        let characters = response.data, list = ''
        characters.forEach(elm => list += `<div class="character-info"><li><p><strong>${elm.name}</strong> (Id ${elm.id})</p><p>Occupation: ${elm.occupation}</p><p>Weapon: ${elm.weapon}</p></li></div>`)
        document.querySelector('.characters-container').innerHTML = list
      })
      .catch(err => console.log('ERROR', err))

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    event.preventDefault()
    const characterId = document.querySelector('.operation input').value

    charactersAPI
      .getOneRegister(characterId)
      .then(response => {
        const character = response.data
        const newCharacter = `<div class="name">name: ${character.name}</div>
        <div class="occupation">occupation: ${character.occupation}</div>
        <div class="cartoon">cartoon: ${character.cartoon}</div>
        <div class="weapon">weapon: ${character.weapon}</div>
      </div >`
        document.querySelector('.character-info').innerHTML = newCharacter


      })
      .catch(err => console.log('ERROR', err))

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault()
    const characterIdDel = document.querySelector('.delete input').value

    charactersAPI
      .deleteOneRegister(characterIdDel)
      .then(() => {
        document.querySelector('#delete-one').setAttribute('class', 'green')
      })
      .catch(err => {
        document.querySelector('#delete-one').setAttribute('class', 'red')
        console.log('ERROR', err)
      })

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const editInputs = document.querySelectorAll('#edit-character-form input')

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
      .catch(err => console.log(err))

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')
    console.log(inputs[0].value)

    const newChar = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value
    }

    charactersAPI
      .createOneRegister(newChar)
      .then(() => {

        document.querySelector('#newCharacterForm').reset()
      })
      .catch(err => console.log(err))

  });
});
