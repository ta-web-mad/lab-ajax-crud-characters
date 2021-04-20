const charactersAPI = new APIHandler()

// Fill characters
fillCharactersList = () => {
  charactersAPI
      .getFullList()
      .then(response => {
        // console.log(response)
        const { data } = response
        // console.log(data)
        let resultsList = ''
        data.forEach(elm => resultsList += `<ul><li><b>${elm.name}</b><br> Occupation: ${elm.occupation}<br> Cartoon: ${elm.cartoon}<br> Weapon: ${elm.weapon}</li></ul>`)
        document.querySelector('#resultsAll').innerHTML = resultsList
      })
      .catch(err => console.log('error', err))
}


// Display all characters
window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    // console.log(charactersAPI)
    event.preventDefault()
    
    fillCharactersList()

  });

  // Display a character by ID
  document.getElementById('fetch-one').addEventListener('click', function (event) {

    event.preventDefault()

        const characterId = document.querySelector('#findBar input').value
        // console.log(characterId)

        charactersAPI
          .getOneRegister (characterId)
          .then(response => {
            // console.log(response)
            let resultsList = ''
            resultsList += `<ul><li><b>${response.data.name}</b><br> Occupation: ${response.data.occupation}<br> Cartoon: ${response.data.cartoon}<br> Weapon: ${response.data.weapon}</li></ul>`
            document.querySelector('#resultsSearch').innerHTML = resultsList
          })

  });

  // Delete a character
  document.getElementById('delete-one').addEventListener('click', function (event) {
    
    event.preventDefault()

    const characterId = document.querySelector('#deleteBar input').value
    console.log(characterId)

    const deleteBtn = document.getElementById('delete-one')

    charactersAPI
      .deleteOneRegister(characterId)
      .then( () => {
        deleteBtn.classList.add('success')
      })
      .catch(err => {
        deleteBtn.classList.add('fail')
        console.log('error', err)
      })

  });



   // Create a character
  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    
    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')
    // console.log(inputs[0].value)

    // console.log(inputs[3])

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

    // console.log(newCharacter)

    const createBtn = document.querySelector('#new-character-form button')

    charactersAPI
      .createOneRegister(newCharacter)
      .then( () => {
        createBtn.classList.add('success')
        fillCharactersList() // Updating the list (optional)
        document.getElementById('new-character-form').reset() // Cleaning the form (optional)
      })
      .catch(err => {
        createBtn.classList.add('fail')
        console.log('error', err)
      })
  });



// Edit character
document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  event.preventDefault()

  const inputs = document.querySelectorAll('#edit-character-form input')
  const characterId = inputs[0].value

  // console.log(inputs)
  // console.log(characterId)

    if (inputs[4].checked) {
    inputs[4].value = true
  } else {
    inputs[4].value = false
  }

  const updatedCharacter = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].value
    }

    // console.log(updatedCharacter)

  const updateBtn = document.querySelector('#edit-character-form button')
  
  charactersAPI
    .updateOneRegister(characterId, updatedCharacter)
    .then( () => {
      updateBtn.classList.add('success')
      fillCharactersList() // Updating the list (optional)
      document.getElementById('edit-character-form').reset() // Cleaning the form (optional)
      })
    .catch(err => {
      updateBtn.classList.add('fail')
      console.log('error', err)
    })

});

});
