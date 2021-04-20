const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

updateList = () => {
  charactersAPI
    .getFullList()
    .then(response => {
      const { data } = response

      let currentDiv = document.querySelector(".characters-container");

      while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
      }

      data.forEach(elm => {
        charactersAPI.writtenBlock(elm, currentDiv)

      }
      )

    })
    .catch(err => console.log('error', err))

}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    updateList()

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    event.preventDefault()
    const inputs = document.querySelector('.operation input')

    charactersAPI
      .getOneRegister(inputs.value)
      .then(selection => {
        let div = document.querySelectorAll(".operation")[1];
        charactersAPI.writtenBlock(selection, div)
      })



  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault()
    const inputs = document.querySelector('.operation.delete input')

    charactersAPI
      .deleteOneRegister(inputs.value)
      .then(() => document.getElementById('delete-one').classList.add("active"))
      .catch(err => {
        console.log(err)
        document.getElementById('operation delete').classList.add("inactive")
      })

  });

  document.querySelector('#receive-character').onsubmit = e => {
    e.preventDefault()

    const characterId = document.querySelector('#receive-character input').value
    const input = document.querySelectorAll('#edit-character-form input')

    charactersAPI
      .getOneRegister(characterId)
      .then(response => {
        fillEditForm(response.data)
        document.querySelector('#receive-character').reset()
      })
      .catch(err => console.log('error', err))

  }

  const fillEditForm = characterInfo => {
    const input = document.querySelectorAll('#edit-character-form input')
    input[0].value = characterInfo.name
    input[1].value = characterInfo.occupation
    input[2].value = characterInfo.weapon
    input[3].checked = characterInfo.cartoon
    input[4].value = characterInfo.id           // oculto
  }


  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')

    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    const id = inputs[4].value

    charactersAPI
      .updateOneRegister(id, character)
      .then(() => {
        document.querySelector('#edit-character-form').reset()
        updateList()
      })
      .catch(err => console.log('error', err))

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()
    const inputs = document.querySelectorAll('#new-character-form input')

    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
      .createOneRegister(character)
      .then(() => {
        document.querySelector('#new-character-form').reset()
        updateList()
      })
      .catch(err => console.log('error', err))
  });
});
