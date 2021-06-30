const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI
      .getFullList()
      .then(res => {
        const { data } = res
        let characters = ' '
        data.reverse().forEach(elm => characters += `<div class="characters-container">
                  <div class="character-info">
                  <div> <strong> Name:</strong> <br> ${elm.name} (${elm.id})</div>
                   <div> <strong> Occupation:</strong> <br> ${elm.occupation}</div>
                   <div> <strong> Weapon:</strong> <br> ${elm.weapon}</div>
                   <div> <strong> Is a cartoon? </strong><br> ${elm.cartoon}</div>
                  </div>
                  </div>`)
        document.querySelector('.show-list').innerHTML = characters
      })
      .catch(err => console.log('Error:', err))
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const fetchOne = document.querySelector('#character-id').value

    charactersAPI
      .getOneRegister(fetchOne)
      .then(res => {
        const { data } = res
        let singleCharacter = ''
        singleCharacter += `<div class="characters-container">
                  <ul class="character-info">
                  <li> <strong> Name:</strong> <br> ${data.name}</li>
                   <li> <strong> Occupation:</strong> <br> ${data.occupation}</li>
                   <li> <strong> Weapon:</strong> <br> ${data.weapon}</li>
                   <li> <strong> Is a cartoon? </strong><br> ${data.cartoon}</li>
                  </ul>
                  </div>`
        document.querySelector('.show-list').innerHTML = singleCharacter
      })
      .catch(err => err, alert('Personaggio non esistente'))

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const deleteOne = document.querySelector('#character-id-delete').value
    charactersAPI
      .deleteOneRegister(deleteOne)
      .then(res => res, alert('Personaggio eliminato'))
      .catch(err => console.log(err))
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    // updateOneRegister = (id, characterInfo) => this.api.get(`/characters${id}`, characterInfo)
    event.preventDefault()
    const editOne = document.querySelectorAll('#edit-character-form input')
    const characterId = editOne[0].value
    const character = {
            name: editOne[1].value,
      occupation: editOne[2].value,
      weapon: editOne[3].value,
      cartoon: editOne[4].checked
    }
    console.log(characterId)
    console.log(character)
     charactersAPI
      .updateOneRegister(characterId, character)
      .then(() => {
        document.querySelector('#edit-character-form').reset()
      })
      .then(res => res, alert('Personaggio editato'))
      .catch(err => console.log(err))


  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const createOne = document.querySelectorAll('#new-character-form input')
    const character = {
      name: createOne[0].value,
      occupation: createOne[1].value,
      weapon: createOne[2].value,
      cartoon: createOne[3].checked
    }


    charactersAPI
      .createOneRegister(character)
      .then(() => {

        document.querySelector('#new-character-form').reset()
      })
      .then(res => res, alert('Personaggio creato'))
      .catch(err => console.log(err))

  });
});
