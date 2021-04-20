const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');


//SHOW LIST
window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI
      .getFullList()
      .then(response => {
        const { data } = response
        charactersList = ' '
        data.forEach(elm => charactersList +=
          `<div class="characters-container">
                  <div class="character-info">
                  <div>Name: ${elm.name}</div>
                   <div>Occupation: ${elm.occupation}</div>
                   <div>Weapon: ${elm.weapon}</div>
                   <div>Is a cartoon?: ${elm.cartoon}</div>
                  </div>
                  </div>`)
        document.querySelector('.show-list').innerHTML = charactersList
        console.log(data)
      })
      .catch(err => console.log('error', err))
  })

  //SHOW ONE
  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const characterId = document.querySelector('#idsearch-show').value

    charactersAPI
      .getOneRegister(characterId)
      .then(characterInfo => {
        document.querySelector('.show-one').innerHTML =
          `<div class="characters-container">
                  <div class="character-info">
                    <div>Name: ${characterInfo.data.name}</div>
                   <div>Occupation: ${characterInfo.data.occupation}</div>
                   <div>Weapon: ${characterInfo.data.weapon}</div>
                   <div>Is a cartoon?: ${characterInfo.data.cartoon}</div>
                  </div>
                  </div>`
        console.log(characterInfo)

      })
      .catch(err => console.log('error', err))
  });


  //DELETE ONE
  document.getElementById('delete-one').addEventListener('click', function (event) {

    const characterId = document.querySelector('#idsearch-delete').value

    charactersAPI
      .deleteOneRegister(characterId)
      .then(() => {
        document.querySelector('#idsearch-delete').value = ' '
        window.alert('Registro Borrado')
      })
  });

//EDIT SELECTOR

  document.getElementById('fill-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const characterId = document.querySelector('#id-search').value
    
    charactersAPI
      .getOneRegister(characterId)
      .then(response => {
        const input = document.querySelectorAll('#edit-character-form input')
        input[0].value = response.data.name
        input[1].value = response.data.occupation
        input[2].value = response.data.weapon
        input[3].checked = response.data.cartoon
      })
      .catch(err => console.log(err))
  })
//EDIT ONE
  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
  event.preventDefault()

    const characterId = document.querySelector('#fill-character-form input').value
    const input = document.querySelectorAll('#edit-character-form input')

    const characterInfo = {
      name: input[0].value,
      occupation: input[1].value,
      weapon: input[2].value,
      cartoon: input[3].checked
      }
      console.log(characterInfo)
    charactersAPI
      .updateOneRegister(characterId, characterInfo)
      .then(response => {
        console.log(response)
        document.querySelector('#edit-character-form').reset()
        window.alert('Registro Actualizado')
      })
      .catch(err => console.log(err))

    
  });

  //CREATE ONE
  document.getElementById('new-character-form').addEventListener('submit', function (event) {
       event.preventDefault()

      const inputs = document.querySelectorAll('#new-character-form input')
   

      const characterInfo = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value,
        cartoon: inputs[3].checked
      }
      console.log(characterInfo)

      charactersAPI
        .createOneRegister(characterInfo)
        .then((response) => {
          console.log(response)
          document.querySelector('#new-character-form').reset()
          window.alert('Registro Creado')
        })
        .catch(err => console.log('error', err))
    
  })
})
