const charactersAPI = new APIHandler()


window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI
      .getFullList()
      .then(response => {
        //conseguir la info
        const { data } = response

        //montarla para llevarla al dom
        let charactersList = ''
        data.forEach(elm => charactersList += `<br><div>Character Name:${elm.name} </div> <div Character Occupation: ${elm.ccupation} </div><div>Is a Cartoon?: ${elm.cartoon}</div><div>Character Weapon: ${elm.weapon}</div>`)

        //imprimirla en el dom
        document.querySelector('#char-info').innerHTML = charactersList

      })
      .catch(err => console.log('error', err))

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const characterId = document.querySelector('#fetch input').value

    charactersAPI
      .getOneRegister(characterId)
      .then(response => {
        const { data } = response
        let oneChar = `<div>Character Name:${data.name} </div> <div Character Occupation: ${data.ccupation} </div><div>Is a Cartoon?: ${data.cartoon}</div><div>Character Weapon: ${data.weapon}</div>`

        //3 imprimir
        document.querySelector('#fetch').innerHTML = oneChar
        console.log('HEEY', oneChar);

      })
      .catch(err => console.log('error', err))
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    const inputs = document.querySelectorAll('#new-character-form input')

    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      isACartoon: inputs[3].value
    }

    charactersAPI
      .createOneRegister(character)
      .then(() => {
        response = console.log('HOLAAAA', response);
      })
      .catch(err => console.log('error', err))
  });
});
