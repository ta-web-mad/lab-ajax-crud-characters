const charactersAPI = new APIHandler

window.addEventListener('load', () => {

  //Get all characters
  document.getElementById('fetch-all').addEventListener('click', function (event) {
      charactersAPI
        .getFullList()
        .then(response => {
          const { data } = response
          let charactersList = ''
          data.forEach(elm => charactersList += constrcutCharCard(elm))
          //console.log(charactersList)
          document.querySelector('#currentCharacters').innerHTML = charactersList
        })
        .catch(err => console.log('AXIOS READ ERROR:', err))
  });

  //Get one character
  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const characterId = document.querySelector('#character-id-search').value
    //console.log(characterId)
    charactersAPI
      .getOneRegister(characterId)
      .then(characterFound => {
        console.log(characterFound.data)
        characterCard = constrcutCharCard(characterFound.data)
        //console.log(constrcutCharCard(characterFound))
        document.querySelector('#currentCharacters').innerHTML = characterCard
      })
      .catch(err => console.log('AXIOS READ ERROR:', err))
  })

  //Delete one character
  document.getElementById('delete-one').addEventListener('click', function (event) {
    const characterId = document.querySelector('#character-id-delete').value
    //console.log(characterId)
    charactersAPI
      .deleteOneRegister(characterId)
      .then(characterFound => {
        //console.log(characterFound)
        document.getElementById('delete-one').setAttribute('class', 'active')
      })
      .catch(err => {
        console.log('AXIOS DELETE ERROR:', err)
        document.getElementById('delete-one').setAttribute('class', 'failed')
      })
  });

  //Edit one character
  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')
    const characterId = inputs[0].value
    const character = {
      id: characterId,
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }
    //console.log(character)
    charactersAPI
      .updateOneRegister(characterId, character)
      .then(response => {
        //console.log(response)
        document.querySelector('#edit-character-form').reset()
        document.getElementById('send-data-edit').setAttribute('class', 'active')
      })
      .catch(err => {
        console.log('AXIOS UPDATE ERROR', err)
        document.getElementById('send-data-edit').setAttribute('class', 'failed')
      })
  });

  //Create one character
  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const inputs = document.querySelectorAll('#new-character-form input')
    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].value === 'on',
    }
    //console.log(character)
    charactersAPI
      .createOneRegister(character)
      .then((response) => {
        //console.log(response)
        document.querySelector('#new-character-form').reset()
        document.getElementById('send-data-new').setAttribute('class', 'active')
      })
      .catch(err => {
        console.log('AXIOS CREATE ERROR', err)
        document.getElementById('send-data-new').setAttribute('class', 'failed')
      })
  });
});
