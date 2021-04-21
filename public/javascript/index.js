const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');
//Show All
window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    event.preventDefault()
    charactersAPI.getFullList()
      .then(response => {
          let theInfo = ''
          response.data.forEach(elm => theInfo += `<ul><li><b>${elm.id} (${elm.name})</b><br> Trabajo: ${elm.occupation}<br> Arma: ${elm.weapon}</li></ul>`)
          document.querySelector('#results').innerHTML = theInfo
     })
        .catch(err => console.log('error', err))
  });
//Show 1
  document.getElementById('fetch-one').addEventListener('click', function (event) {

    event.preventDefault()
    const characterId = document.querySelector('#search input').value
    charactersAPI
        .getOneRegister(characterId)
        .then(response => {
            let theInfo = ''
            theInfo += `<ul><li><b>${response.data.id} (${response.data.name})</b><br> Trabajo: ${response.data.occupation}<br> Arma: ${response.data.weapon}</li></ul>`
            document.querySelector('#singleId ').innerHTML = theInfo
        })
        .catch(err => console.timeLog(err))


  });
//Delete
  document.getElementById('delete-one').addEventListener('click', function (event) {

  event.preventDefault()
  const characterId = document.querySelector('#clear input').value
  charactersAPI
    .deleteOneRegister(characterId)
    .then( () => {
     console.log('Deleted!!!')
      })
      .catch(err => {
        console.log('error', err)
      })
  });
//Edit no me funciona, no sé qué más probar
  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  event.preventDefault()
  const info = document.querySelectorAll('#edit-character-form input')

  const characterId = info[0].value
  console.log(characterId)
  const newInfo = {
      name: info[1].value,
      occupation: info[2].value,
      weapon: info[3].value,
    }
    console.log(newInfo)
  charactersAPI
    .updateOneRegister(characterId, newInfo)
    .then( (popino) => {
      console.log(popino)
      document.getElementById('edit-character-form').reset()
      })
    .catch(err => {
      console.log('error', err)
    })
  });
//Create New
  document.getElementById('new-character-form').addEventListener('submit', function (event) {


    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')

    if (inputs[3].checked) {
      inputs[3].value = true
    } else {
      inputs[3].value = false
    }
    const newCharacter = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].value
    }
    charactersAPI
      .createOneRegister(newCharacter)
      .then( () => {
        console.log('Created!!!')
        document.getElementById('new-character-form').reset() 
      })
      .catch(err => {
        console.log('error', err)
      })
  });
});
