const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList()
    .then(response => console.log( response ))
    .catch(err => console.log('ERROR', err))
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const characterId = document.querySelector('.operation input').value

    charactersAPI.getOneRegister(characterId)
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const characterId = document.querySelector('.delete input').value

    charactersAPI.deleteOneRegister(characterId)
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')
    const id = inputs[0].value

    const character = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }

    charactersAPI.updateOneRegister(id, character)
    .then(response => console.log(response.data))
    .catch(err => console.log(err))
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

    charactersAPI.createOneRegister(character)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err))
  });


});
