const charactersAPI = new APIHandler("https://minions-api.herokuapp.com")

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI
    .getFullList()
    .then(response => {
      charactersList = ' '
      response.data.forEach(elm => charactersList +=
        `<div class="characters-container">
          <div class="character-info">
            <div class="id">ID: ${elm.id}</div>
            <div class="name">Name: ${elm.name}</div>
            <div class="occupation">Occupation: ${elm.occupation}</div>
            <div class="cartoon">Weapon: ${elm.weapon}</div>
            <div class="weapon">Is a cartoon?: ${elm.cartoon}</div>
          </div>
        </div>`
      )
      document.querySelector('.characters-container').innerHTML = charactersList
    })
    .catch(err => console.log('error', err))
  })

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const id = document.querySelector('.searchOneCharacter').value

    charactersAPI
      .getOneRegister(id)
      .then(info => {
        document.querySelector('.characters-container').innerHTML =
          `<div class="characters-container">
            <div class="character-info">
              <div class="id">ID: ${elm.id}</div>
              <div class="name">Name: ${info.data.name}</div>
              <div class="occupation">Occupation: ${info.data.occupation}</div>
              <div class="cartoon">Weapon: ${info.data.weapon}</div>
              <div class="weapon">Is a cartoon?: ${info.data.cartoon}</div>
            </div>
          </div>`
      })
      .catch(err => console.log('error', err))

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    
    const id = document.querySelector('.deleteCharacter').value
  
    charactersAPI
      .deleteOneRegister(id)
      .then(() => {document.querySelector('.deleteCharacter').value = ' '})

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const inputs = document.querySelectorAll('#new-character-form input')

    const info = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }
    console.log(characterInfo)

    charactersAPI
      .createOneRegister(info)
      .then((response) => {
        console.log(response)
        document.querySelector('#new-character-form').reset()
      })
      .catch(err => console.log('error', err))
  });
});
