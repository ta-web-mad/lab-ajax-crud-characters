const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', ((event) => {
      charactersAPI
        .getFullList()
        .then(response => {

          let allCharacters = response.data.reverse()

          allCharacters.forEach(elm => {
            const newDiv = document.createElement('div')
            newDiv.setAttribute('class', 'character-info')
            newDiv.classList.add('col-4')
            newDiv.innerHTML =
              `<div class="row">
                <div class="col-6>
                  <div class="name">Character Name:</div>
                  <div class="occupation">Character Occupation:</div>
                  <div class="cartoon">Is a Cartoon?:</div>
                  <div class="weapon">Character Weapon:</div>
                </div>
                <div class="col-6">
                  <div class="name">${elm.name}:</div>
                  <div class="occupation">${elm.occupation}</div>
                  <div class="cartoon">${elm.isCartoon}</div>
                  <div class="weapon">${elm.weapon}</div>
                </div>
              </div>`
            document.querySelector('.characters-container').appendChild(newDiv)
          })
        })
        .catch(err => console.log('HUBO UN ERROR!', err))
  }))

  document.getElementById('fetch-one').addEventListener('click', ((event) => {
    const input = document.querySelector('#character-id').value
    charactersAPI.getOneRegister(input)

  }))
})



//   document.getElementById('delete-one').addEventListener('click', function (event) {

//   });

//   document.getElementById('edit-character-form').addEventListener('submit', function (event) {

//   });

//   document.getElementById('new-character-form').addEventListener('submit', function (event) {

//   });
// });


charactersAPI.getOneRegister(96)

const characterInfo = {
  name: 'Bolt',
  isCartoon: true,
  occupation: 'superdog'
}

charactersAPI.createOneRegister(characterInfo)

const newCharacterInfo = {
  name: 'Superman',
  occupation: 'superhero'
}

charactersAPI.updateOneRegister(510, newCharacterInfo)

charactersAPI.deleteOneRegister(510)
