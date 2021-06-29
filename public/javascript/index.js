const charactersAPI = new APIHandler();
//response.data.forEach(elm => characters += `<li>${elm.name} (${elm.id})<br>Trabajo: ${elm.occupation}<br>Arma: ${elm.weapon}</li>`)


function loadCharactersFromAPI() {

  charactersAPI.getFullList()
    .then(response => {
      console.log(response)
      let characters = ''
      response.data.forEach(elem => characters += `
    <div class="character-info">
      <div class="name">${elem.name}</div>
      <div class="occupation">${elem.occupation}</div>
      <div class="cartoon">${elem.cartoon}</div>
      <div class="weapon">${elem.weapon}</div>
      <div class="weapon">${elem.id}</div>
    </div>
    `)
      ///mirar como hacer para que me los metas en cajas separadas no todas en la misma
      document.querySelector('.characters-container').innerHTML = characters
    })
    .catch(err => console.log(err))
}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    loadCharactersFromAPI()
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////


  // Get character info by ID
  //document.querySelector('#getCharacterInfoForm').onsubmit = e => {
  document.getElementById('fetch-one').addEventListener('click', function (event) {


    event.preventDefault()

    const characterId = document.querySelector('.operation input').value  //// aqui cojo el valor del input
    console.log(characterId)


    charactersAPI
      .getOneRegister(characterId)  /// el valor del input que cogi se lo paso a la funcion getOneRegister en APIHandler y hace un get que pone en la url para coger el objeto que hay ahi
      .then(response => {  /// response es el obejto que ha devulto la web al pedirle un get con el id, como si fuera un find de una base de datos
        console.log(response)
        fillCharacterEditForm(response.data)
        //document.querySelector('.operation input').reset()
        // document.querySelector('.character-info').innerHTML = charactersId
        const a = document.querySelector('.operation input')
        a.value = ""
        console.log("a =", a)
      })
      .catch(err => console.log(err))



  });



  function fillCharacterEditForm(info) {

    //const inputs = document.querySelectorAll('#editCharacterForm input')

    console.log(info.name)
    let characters2 = `<li>${info.name} (${info.id})<br>Trabajo: ${info.occupation}<br>Arma: ${info.weapon}</li>`
    // info.forEach(elm => characters += `<li>${elm.name} (${elm.id})<br>Trabajo: ${elm.occupation}<br>Arma: ${elm.weapon}</li>`) ///mirar como hacer para que me los metas en cajas separadas no todas en la misma
    document.querySelector('.character-info').innerHTML = characters2                   // Hidden input
    const a = document.querySelector('.operation')
    a.value = 0
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////////////////


  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault()


    const characterId2 = document.querySelector('.delete input').value  //// aqui cojo el valor del input
    console.log(characterId2)


    charactersAPI
      .deleteOneRegister(characterId2)  /// el valor del input que cogi se lo paso a la funcion getOneRegister en APIHandler y hace un get que pone en la url para coger el objeto que hay ahi
      .then(response => {  /// response es el obejto que ha devulto la web al pedirle un get con el id, como si fuera un find de una base de datos
        console.log(response)
        // fillCharacterEditForm(response.data)
        //document.querySelector('.operation input').reset()
        // document.querySelector('.character-info').innerHTML = charactersId
        const a = document.querySelector('.operation input')
        a.value = ""
        console.log("a =", a)
      })
      .catch(err => console.log(err))





  });


  ////////////////////////////////////////////////////////////////////////////

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {




    const characterId2 = document.querySelector('.delete input').value  //// aqui cojo el valor del input
    console.log(characterId2)


    charactersAPI
      .deleteOneRegister(characterId2)  /// el valor del input que cogi se lo paso a la funcion getOneRegister en APIHandler y hace un get que pone en la url para coger el objeto que hay ahi
      .then(response => {  /// response es el obejto que ha devulto la web al pedirle un get con el id, como si fuera un find de una base de datos
        console.log(response)
        // fillCharacterEditForm(response.data)
        //document.querySelector('.operation input').reset()
        // document.querySelector('.character-info').innerHTML = charactersId
        const a = document.querySelector('.operation input')
        a.value = ""
        console.log("a =", a)
      })
      .catch(err => console.log(err))






  });



  ///////////////////////
  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    console.log("crear nuevo")

    event.preventDefault()          // Evita el envío del formulario

    const inputs = document.querySelectorAll('#new-character-form input')
    console.log(inputs[0].value)
    console.log(inputs[1].value)
    console.log(inputs[2].value)


    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: false
    }
    console.log(character)
    charactersAPI
      .createOneRegister(character)
      .then(() => {
        console.log("wathever")
        loadCharactersFromAPI()
        // document.querySelector('#newCharacterForm').reset()
      })
      .catch(err => console.log(err))
    // }
  });


});
