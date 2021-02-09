const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {

  //LIST ALL CHARACTERS

  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(response => {
        let characters = response.data,
          html = ''
        characters.forEach(elm => {
          html += `<div class="character-info">
            <div class="name">Nombre: ${elm.name}</div>
            <div class="occupation">Trabajo: ${elm.occupation}</div>
            <div class="cartoon">Dibujo animado?: ${elm.cartoon}</div>
            <div class="weapon">Arma: ${elm.weapon}</div>
          </div>`
        })
        document.querySelector('.characters-container').innerHTML = html
      })
      .catch(err => console.log('Error:', err))
  });

  //LIST ONE CHARACTER

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const fetchOneID = document.querySelector('.operation input').value

    charactersAPI
      .getOneRegister(fetchOneID)
      .then(response => {
        let character = response.data
        let html = `<div class="character-info">
          <div class="name">Nombre: ${character.name}</div>
          <div class="occupation">Trabajo: ${character.occupation}</div>
          <div class="cartoon">Dibujo animado?: ${character.cartoon}</div>
          <div class="weapon">Arma: ${character.weapon}</div>
          </div>`

        document.querySelector('.characters-container').innerHTML = html
      })
      .catch(err => console.log('Error:', err))
  })

  //DELETE CHARACTER

  document.getElementById('delete-one').addEventListener('click', function (event) {
    let deleteOneID = document.querySelector('.delete input').value
    const deleteButton = document.querySelector('#delete-one')

    charactersAPI
      .deleteOneRegister(deleteOneID)
      .then(response => {

        deleteButton.style.backgroundColor = '#69FF5A'
        deleteOneID = ''
      })
      .catch(err => {
        console.log('Error:', err)
        deleteButton.style.backgroundColor = '#FF5A5A'
      })

  });

  //EDIT CHARACTER

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const characterData = document.querySelectorAll('#edit-character-form input')
    const editID = characterData[0].value
    editCharacter = {
      name: characterData[1].value,
      occupation: characterData[2].value,
      weapon: characterData[3].value,
      cartoon: characterData[4].checked,
    }

    charactersAPI
      .updateOneRegister(editID, editCharacter)
      .then((response) => {
        const editButton = document.querySelector('#edit-character-form button')
        let character = response.data
        let html = `<div class="character-info">
          <div class="name">Nombre: ${character.name}</div>
          <div class="occupation">Trabajo: ${character.occupation}</div>
          <div class="cartoon">Dibujo animado?: ${character.cartoon}</div>
          <div class="weapon">Arma: ${character.weapon}</div>
          </div>`

        document.querySelector('.characters-container').innerHTML = html
        editButton.style.backgroundColor = '#69FF5A'
        event.target.reset()
      })
      .catch(err => {
        console.log('Error:', err)
        editButton.style.backgroundColor = '#FF5A5A'
      })

  });

  //CREATE CHARACTER

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const characterData = document.querySelectorAll('#new-character-form input')
    console.log(charcaterData)

    const newCharacter = {
      name: characterData[0].value,
      occupation: characterData[1].value,
      weapon: characterData[2].value,
      cartoon: characterData[3].checked,
    }

    charactersAPI
      .createOneRegister(newCharacter)
      .then((response) => {
        const createButton = document.querySelector('#new-character-form button')
        let character = response.data
        let html = `<div class="character-info">
          <div class="name">Nombre: ${character.name}</div>
          <div class="occupation">Trabajo: ${character.occupation}</div>
          <div class="cartoon">Dibujo animado?: ${character.cartoon}</div>
          <div class="weapon">Arma: ${character.weapon}</div>
          </div>`

        document.querySelector('.characters-container').innerHTML = html
        createButton.style.backgroundColor = '#69FF5A'
        event.target.reset()

      })
      .catch(err => {
        console.log('Error:', err)
        createButton.style.backgroundColor = '#FF5A5A'
      })
  });
})