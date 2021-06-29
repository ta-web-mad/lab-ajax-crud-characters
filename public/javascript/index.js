const charactersAPI = new APIHandler('http://localhost:8000');

function displayCharacterFromAPI(elem) {
  let characters = `
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



window.addEventListener('load', () => {

  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI
      .getFullList()
      .then(res => {
        let characters = ''
        //console.log(res)
        res.data.forEach(elem => characters += `
          <div class="character-info">
            <div class="name">${elem.name}</div>
            <div class="occupation">${elem.occupation}</div>
            <div class="cartoon">${elem.cartoon}</div>
            <div class="weapon">${elem.weapon}</div>
            <div class="id">${elem.id}</div>
          </div>    
          `)
        document.querySelector('.characters-container').innerHTML = characters
      })
      .catch(err => console.log(err))
  })


  //buscar un elemento por id

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const input = document.querySelector('[name="character-id"]') //imput html

    const id = input.value // selecionamos el valor del imput

    charactersAPI
      .getOneRegister(id)
      .then(response => {
        // console.log(response.data)
        displayCharacterFromAPI(response.data)
        input.value = ''

      })
      .catch(err => console.log(err))

  });


  document.getElementById('delete-one').addEventListener('click', function (event) {

    createOneRegister()

    const inputs = document.querySelectorAll('#edit-character-form input')

    const character = {
      id: inputs[0].value,
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked ? true : false
    }

    const characterId = inputs[0].value

  });



});



