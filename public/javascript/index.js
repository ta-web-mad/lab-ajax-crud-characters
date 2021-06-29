const charactersAPI = new APIHandler('https://minions-api.herokuapp.com');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI
      .getFullList()
      .then(res => {
        console.log(res)
        let characters = ''
        res.data.forEach(elm => characters +=
          `<div class="character-info">
              <div class="id">Id: ${elm.id}</div>
              <div class="name">Name: ${elm.name}</div>
              <div class="occupation">Occupation: ${elm.occupation}</div>
              <div class="cartoon">Is a Cartoon?: ${elm.cartoon}</div>
              <div class="weapon">Weapon: ${elm.weapon}</div>
          </div>`)
        document.querySelector('.characters-container').innerHTML = characters

      })
      .catch(err => console.log(err))


  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    charactersAPI
      .getOneRegister(id)
      .then(res => {
        fillCharacterEditForm(response.data)
        document.querySelector('.operation').reset()

      })

      .catch(err => console.log(err))

  });

  function fillCharacterEditForm(info) {

    const inputs = document.querySelectorAll('.operation input')

    inputs[0].value = info.id
    inputs[1].value = info.name
    inputs[2].value = info.occupation
    inputs[3].value = info.cartoon
    inputs[4].value = info.weapon
  };





  document.getElementById('delete-one').addEventListener('click', function (event) {

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    const inputs = document.querySelectorAll('#edit-character-form input input')
    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      cartoon: inputs[2].value,
      weapon: inputs[3].value
    }

    const characterId = inputs[4].value

    charactersAPI
      .updateOneRegister(characterId, character)
      .then(() => {
        loadCharactersFromAPI()
        document.querySelector('#edit-character-form').reset()
      })
      .catch(err => console.log(err))


  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {



    const inputs = document.querySelectorAll('#new-character-form input')
    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      cartoon: inputs[2].value,
      weapon: inputs[3].value
    }


    charactersAPI
      .createOneRegister(character)
      .then(() => {
        loadCharactersFromAPI()
        document.querySelector('#new-character-form').reset()

      })

      .catch(err => console.log(err))


  });
});
