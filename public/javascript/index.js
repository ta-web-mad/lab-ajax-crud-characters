const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');




window.addEventListener('load', () => {


  // Character list refresh
  

  function updateCharactersList() {
    
    charactersAPI
      .getFullList()
      .then(response => {

        const { data } = response
        let charactersList = ''

        data.reverse().forEach(elm => 
          charactersList +=
           `<div class="character-info">
                <div class = "name"> Name: ${elm.name} </div>
                <div class="occupation"> Occupation: ${elm.occupation}</div>
                <div class="cartoon"> Is a Cartoon? ${elm.cartoon}</div>
                <div class="weapon"> Weapon: ${elm.weapon}</div>
                <div class = "id" > Weapon: ${elm._id} </div>
            </div>`)
        
        document.querySelector('.characters-container').innerHTML = charactersList
      })
      .catch(err => console.log('error', err))
  }

  

  // Get all Characters List

  document.getElementById('fetch-all').addEventListener('click', function (event) {
    updateCharactersList()
  });



  // Get One Character

  document.getElementById('fetch-one').addEventListener('click', function (event) {
     event.preventDefault()

     const characterId = document.querySelector('#character-id').value

     charactersAPI
       .getOneRegister(characterId)
       .then(response => {
             const {data} = response
             let characterDetails = ''
             
               characterDetails =
               `<div class="character-info">
                <div class ="name"> Name: ${data.name} </div>
                <div class="occupation"> Occupation: ${data.occupation}</div>
                <div class="cartoon"> Is a Cartoon? ${data.cartoon}</div>
                <div class="weapon"> Weapon: ${data.weapon}</div>
            </div>`
         document.querySelector('.characters-container').innerHTML = characterDetails
       })
       .catch(err => console.log('error',err))
  });



  // Delete One Character

  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault()

    const deleteId = document.querySelector('#delete-id').value

    const deleteButton = document.querySelector('#delete-one')

    charactersAPI
      .deleteOneRegister(deleteId)
      .then(() => {
        deleteButton.classList.add('success')
        updateCharactersList()
      })
      .catch(err => {
        deleteButton.classList.add('error')
        console.log('error', err)
      })
  });



  // Edit One Character

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    
     const inputs = document.querySelectorAll('#edit-character-form input')
     const editButton = document.querySelector("#edit-character-form button")

     const charId = inputs[0].value

     const character = {
       name: inputs[1].value,
       occupation: inputs[2].value,
       weapon: inputs[3].value,
       cartoon: inputs[4].checked
     }

    charactersAPI
      .updateOneRegister(charId, character)
      .then(() => {
       document.querySelector('#edit-character-form').reset()
       editButton.classList.add('success')
     })
       .catch(() => editButton.classList.add('error'))
  });



  // Create New Character

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')
    const createButton = document.querySelector("#new-character-form button")

    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked

    }

    charactersAPI
      .createOneRegister(character)
      .then(() => {
        // inputs.forEach(elm => elm.value = '') --> otra forma de vaciar formulario
        document.querySelector('#new-character-form').reset()
        createButton.classList.add('success')
        updateCharactersList()
      })
      .catch(() => createButton.classList.add('error'))
  });
});
