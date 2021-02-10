const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    // console.log(charactersAPI.getFullList())
    charactersAPI
      .getFullList()
      .then(response => {
        console.log(response)
        // let characters = response.data.reverse(), list = ''
        let charactersArr = response.data.reverse(), list = ''
        charactersArr.forEach(elm => {
        // console.log(elm.name)
          list += `<li><p><strong>${elm.name}</strong> (Id ${elm.id})</p><p>Trabajo: ${elm.occupation}</p><p>Arma: ${elm.weapon}</p></li>`
          document.querySelector('div.character-info').innerHTML = list
        })
      })
      .catch(err => console.log('ERROR', err))

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const characterId = document.querySelector('.character-id').value
    // // console.log(characterId)
    charactersAPI
      .getOneRegister(characterId)
      .then(response => fillEditForm(response.data))
      .catch(err => console.log('ERROR', err))
  });

  function fillEditForm(data) {

    const inputs = document.querySelectorAll('#edit-character-form input')
    console.log(data._id)

    inputs[0].value = data._id
    inputs[1].value = data.name
    inputs[2].value = data.occupation
    inputs[3].value = data.weapon
    inputs[4].value = data.cartoon
}

  document.getElementById('delete-one').addEventListener('click', function (event) {

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

  });
});
