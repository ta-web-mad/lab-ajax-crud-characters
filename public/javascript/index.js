// const charactersAPI = new APIHandler('http://localhost:8000');
const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {
  //buscar todos los personajes 
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    // function updateCharactersList(){
    charactersAPI
      .getFullList()
      .then(response => {
        const { data } = response
        let characterList = ''
        data.reverse().forEach(elm => characterList +=
          `<div class="character-info">
                <div class = "name"> Name: ${elm.name} </div>
                <div class="occupation"> Occupation: ${elm.occupation}</div>
                <div class="cartoon"> Is a Cartoon? ${elm.cartoon}</div>
                <div class="weapon"> Weapon: ${elm.weapon}</div>
                <div class = "id" > Weapon: ${elm._id} </div>
            </div>`)
        document.querySelector('.characters-container').innerHTML = characterList
      })
      .catch(err => console.log(err))
    // }
  });
  //busca un personaje 
  document.getElementById('fetch-one').addEventListener('click', function (event) {
    event.preventDefault()

    const characterId = document.querySelector('.character-id').value
    // console.log(characterId)
    charactersAPI
      .getOneRegister(characterId)
      .then(response => {
        const { data } = response
        let characterDetails = ''
        characterDetails =
          `<div class="character-info">
                <div class ="name"> Name: ${data.name} </div>
                <div class="occupation"> Occupation: ${data.occupation}</div>
                <div class="cartoon"> Is a Cartoon? ${data.cartoon}</div>
                <div class="weapon"> Weapon: ${data.weapon}</div>
            </div>`
        document.querySelector('.characters-container').innerHTML = characterDetails
        fillCharacterEditForm(response.data)
      })
      .catch(err => console.log(err))
  });
  //borrar un personaje
  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault()

    const deleteId = document.querySelector(`#character-id`).value
    const deleteButton = document.querySelector(`#delete-one`)

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
  //editar un personaje
  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()



  });


  //crear un personaje
  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    const inputs = document.querySelectorAll('#new-character-form input')
    
    const characterInfo = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
    }
    const createButton = document.querySelector(`#send-data`)
    console.log(characterInfo)
    charactersAPI
      .createOneRegister(characterInfo)
      .then((response) => {
      console.log(response)
      })
      .catch(err => {
        console.log('error', err)
      })
  });
});
