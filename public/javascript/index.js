const charactersAPI = new APIHandler('https://minions-api.herokuapp.com');


function displayCharactersFromAPI() {
charactersAPI
  .getFullList()
  .then(res => {
    let characters = ''
    // res.data.reverse().forEach(elem => characters += `
    res.data.forEach(elem => characters += `
    <div class="character-info">
      <div class="name">${elem.name}</div>
      <div class="occupation">${elem.occupation}</div>
      <div class="cartoon">${elem.cartoon}</div>
      <div class="weapon">${elem.weapon}</div>
      <div class="weapon">${elem.id}</div>
    </div>
    `)
    document.querySelector('.characters-container').innerHTML = characters
  })
  .catch(err => console.log(err))
}


function displayCharacterfromAPI(elem){
  let characters =  `
  <div class="character-info">
    <div class="name">${elem.name}</div>
    <div class="occupation">${elem.occupation}</div>
    <div class="cartoon">${elem.cartoon}</div>
    <div class="weapon">${elem.weapon}</div>
    <div class="weapon">${elem.id}</div>
  </div>
  `
  document.querySelector('.characters-container').innerHTML = characters
}


function isInvalidValidData(name, occupation, weapon, button) {
  const dataIsInvalid = name == '' || occupation == '' || weapon == ''
  if( dataIsInvalid ){
    button.className='error'
    return true
  }
  return false
}



// ******************************************** display all characters
window.addEventListener('load', () => {
document.getElementById('fetch-all').addEventListener('click', function (event) {
  displayCharactersFromAPI()

});

// ******************************************** display one character
document.getElementById('fetch-one').addEventListener('click', function (event) {
  event.preventDefault()
  
  const button = document.getElementById('fetch-one')
  const input = document.querySelector('[name="character-id"]')
  const id = input.value

  let isnum = /^\d+$/.test(id);
  
  if( isnum == false ){
    button.className='error'
    return
  }
  
  charactersAPI
        .getOneRegister(id)
        .then(response => {
            displayCharacterfromAPI(response.data)
            input.value = ''
            // input.reset()
            button.className='success'
        })
        .catch(err => {
          console.log(err)
          button.className='error'
        })
});


// ******************************************** delete one character
document.getElementById('delete-one').addEventListener('click', function (event) {
  event.preventDefault()
  
  const button = document.getElementById('delete-one')
  const input = document.querySelector('[name="character-id-delete"]')
  const id = input.value
  console.log(id)
  charactersAPI
        .deleteOneRegister(id)
        .then(response => {
            displayCharacterfromAPI(response.data)
            input.value = ''
            // input.reset()
            button.className='success'
        })
        .catch(err => {
          button.className='error'
          console.log(err)      
          
        })

});




// ******************************************** create new character
document.getElementById('new-character-form').addEventListener('submit', function (event) {
  event.preventDefault()
  const button = document.querySelector('#new-character-form button')
  const inputs = document.querySelectorAll('#new-character-form input')

  const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked ? true : false
  }

  const {name, occupation, weapon} = character
  if ( isInvalidValidData( name, occupation, weapon, button ) ){
    return
  }

  charactersAPI
      .createOneRegister(character)
      .then(() => {
        displayCharactersFromAPI()
        document.querySelector('#new-character-form').reset()
        button.className='success'
      })
      .catch(err => {
        console.log(err)
        button.className='error'
      })

});




// ******************************************** Edit one character
document.getElementById('edit-character-form').addEventListener('submit', function (event) {
  event.preventDefault()
  const button = document.querySelector('#edit-character-form button')

  const inputs = document.querySelectorAll('#edit-character-form input')

  const character = {
    id: inputs[0].value,
    name: inputs[1].value,
    occupation: inputs[2].value,
    weapon: inputs[3].value,
    cartoon: inputs[4].checked ? true : false
  }

  const {name, occupation, weapon} = character
  if ( isInvalidValidData( name, occupation, weapon, button ) ){
    return
  }

  const characterId = inputs[0].value  

  charactersAPI
      .updateOneRegister(characterId, character)
      .then((el) => {
        console.log(el.data)
          if(el.data == null){
            throw('No such element!')            
          }
          displayCharactersFromAPI()
          document.querySelector('#edit-character-form').reset()
          button.className='success'
      })
      .catch(err => {
        console.log(err)
        button.className='error'
      })

});
});


