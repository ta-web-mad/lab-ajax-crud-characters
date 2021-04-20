const charactersAPI = new APIHandler();


//------ FETCH ALL CHARACTERS -------


window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    event.preventDefault()

    charactersAPI
      .getFullList()
      .then(response => {
        let { data } = response
        let list = ''
        data.forEach(elm => list += `<div class="character-info">
        <li>
        <p><b>${elm.name}</b>(id ${elm.id})</p>
        <p>Occupation: ${elm.occupation}</p>
        <p>Cartoon: ${elm.cartoon}</p>
        <p>Weapon: ${elm.weapon}</p>
        </li></div>`)
        document.querySelector('.characters-container').innerHTML = list
      })
      .catch(err => console.log('error', err))

  });


  //------ FETCH ONE CHARACTER -------



  document.getElementById('fetch-one').addEventListener('click', function (event) {


    event.preventDefault()
    const characterId = document.querySelector('.operation input').value

    charactersAPI
      .getOneRegister(characterId)
      .then (response => {
       let character = response.data
       let newCharacter = `<li>
       <div> id: ${character.id}</div>
       <div class="name">Name: ${character.name}</div>
       <div class="occupation">Occupation: ${character.occupation}</div>
       <div class="cartoon">Cartoon: ${character.cartoon}</div>
       <div class="weapon">Weapon: ${character.weapon} </div>
       </li>`

        document.querySelector('.characters-container').innerHTML = newCharacter

      })
      .catch(err => console.log('error', err))

  });
 

  //------ DELETE ONE CHARACTER -------



  document.getElementById('delete-one').addEventListener('click', function (event) {


    event.preventDefault()
    const characterDelete = document.querySelector('.delete input').value

    charactersAPI
      .deleteOneRegister(characterDelete)
      .then (() => {
        document.querySelector('#delete-one').style.backgroundColor = 'green'
      })
      
      .catch(err => {
        document.querySelector('#delete-one').style.backgroundColor = 'red'
        console.log('error', err)
      })
        
  });

  //------ CREATE ONE CHARACTER -------


  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()
    const inputs = document.querySelectorAll('#new-character-form input')

    const newCharacter = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value
    }

    charactersAPI
        .createOneRegister(newCharacter)
        .then(() => {
          document.querySelector('#new-character-form')
          document.querySelector('#send-data').style.backgroundColor = 'green'
          
        })
        .catch(err => console.log('error', err)).style.backgroundColor = 'red'
  });


  //------ EDIT ONE CHARACTER -------


  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  event.preventDefault()
  const editedInputs = document.querySelectorAll('#edit-character-form input')
  
  const editedCharacter = {
   // id: editedInputs[0].value,
    name: editedInputs[1].value,
    occupation: editedInputs[2].value,
    weapon: editedInputs[3].value
  }

  charactersAPI
    .updateOneRegister(editedInputs[0].value, editedCharacter)
    .then(() => {
      document.querySelector('#edit-character-form')
      document.querySelector('.boton').style.backgroundColor = 'green'
  })
    .catch(err => console.timeLog(err)).style.backgroundColor = 'red'

  });


});
