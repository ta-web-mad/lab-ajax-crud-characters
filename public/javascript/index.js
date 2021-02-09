const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    console.log("click")

    charactersAPI
      .getFullList()
      .then(response => {
        let characterArray = response.data.reverse(), list = ''
        characterArray.forEach(elm => list += `<div class="characters-container">
        <div class="character-info">
        <div class="id">Id:${elm.id}</div>
        <div class="name">Character Name:${elm.name}</div>
        <div class="occupation">Character Occupation:${elm.occupation}</div>
        <div class="cartoon">Is a Cartoon? ${elm.cartoon}</div>
        <div class="weapon">Character Weapon:${elm.weapon}</div>
        </div>
        </div>`)
        document.querySelector('.characters-container').innerHTML = list
      })
      .catch(err => console.log('ERROR', err))
  })
});

  document.getElementById('fetch-one').addEventListener('click', function (event) {
  console.log('click')

    charactersAPI
      .getOneRegister()
      .then(response => {
        const oneCharacter =  `<div class="characters-container">
        <div class="character-info">
          <div class="id">Id:${response.data.id}</div>
          <div class="name">Character Name:${response.data.name}</div>
          <div class="occupation">Character Occupation:${response.data.occupation}</div>
          <div class="cartoon">Is a Cartoon?${response.data.cartoon}</div>
          <div class="weapon">Character Weapon: ${response.data.weapon}</div>
          </div>`
        document.querySelector('.characters-container').innerHTML = oneCharacter
      })
      .catch(err => console.log('ERROR', err))
 
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault()
    const characId = document.querySelector('#delete-one').value

    charactersAPI
      .deleteOneRegister(characId)
      .then(() => {
        document.querySelector('#delete-one').style.color = 'green'
      })
      .catch(err => {
        document.querySelector('#delete-one').setAttribute('disabled', '')
        console.log('ERROR', err)
      })
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const updateCharacter = {
      name: document.querySelectorAll('#edit-character-form input')[1].value,
      occupation: document.querySelectorAll('#edit-character-form input')[2].value,
      weapon: document.querySelectorAll('#edit-character-form input')[3].value
    }

    charactersAPI
      .updateOneRegister(document.querySelectorAll('#edit-character-form input')[0].value, updateCharacter)
      .then(() =>  document.querySelector('#edit-character-form').reset())
      .catch(err => console.log('ERROR', err))

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

  });
