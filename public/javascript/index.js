const charactersAPI = new APIHandler();

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', () => {
    charactersAPI.getFullList().then(res => {
      let { data } = res
      let charList = ''
      const boxRes = document.querySelector(".result > .row")
      data.forEach(elm => charList += htmlContent(elm))

      boxRes.innerHTML = charList
    }).catch(err => console.log('error', err))
  });

  document.getElementById('fetch-one').addEventListener('click', () => {
    const id = document.querySelector(".operation > input[name='character-id']").value;
    const boxRes = document.querySelector(".result > .row")

    charactersAPI.getOneRegister(id).then(res => {
      let { data } = res
      let character = htmlContent(data)
      boxRes.innerHTML = character
    }).catch(err => console.log('error', err))
  });

  document.getElementById('delete-one').addEventListener('click', () => {
    const id = document.querySelector(".operation > input[name='character-id-delete']").value;
    const btnDel = document.querySelector("#delete-one")

    charactersAPI.deleteOneRegister(id).then(res => {
      let { data } = res
      btnDel.style.backgroundColor = "green"
    }).catch(() => btnDel.style.backgroundColor = "red")
  });

  document.getElementById('edit-character-form').addEventListener('submit', e => {
    e.preventDefault()
    const inputs = document.querySelectorAll('#edit-character-form input')
    const btnAdd = document.querySelector("#edit-character-form #send-data")

    const id = inputs[0].value

    const character = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      debt: inputs[4].checked
    }

    charactersAPI.updateOneRegister(id, character).then(() => {
      document.querySelector('#edit-character-form').reset()
      btnAdd.style.backgroundColor = "green"
    }).catch(() => btnAdd.style.backgroundColor = "red")

  });

  document.getElementById('new-character-form').addEventListener('submit', e => {

    e.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')
    const btnAdd = document.querySelector("#send-data")

    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      debt: inputs[3].checked
    }

    charactersAPI.createOneRegister(character).then(() => {
      document.querySelector('#new-character-form').reset()
      btnAdd.style.backgroundColor = "green"
    }).catch(() => btnAdd.style.backgroundColor = "red")

  });
});

const htmlContent = (elm) => {
  return `<div class="col-card">
        <div>
        <span>ID:</span> <span>${elm.id}</span>
        </div><br>
        <div>
        <span>Name:</span> <span>${elm.name}</span>
        </div><br>
        <div>
        <span>Occupation:</span> <span>${elm.occupation}</span>
        </div><br>
        <div>
        <span>Is a Cartoon:</span> <span>${elm.debt}</span>
        </div><br>
        <div>
        <span>Weapon:</span> <span>${elm.weapon}</span>
        </div><br>
      </div>`
}

// const fillEditForm = characterInfo => {
//   const input = document.querySelectorAll('#edit-character-form input')
//   input[0].value = characterInfo.id
//   input[1].value = characterInfo.name
//   input[2].value = characterInfo.occupation
//   input[3].value = characterInfo.weapon
//   input[4].value = characterInfo.debt
// }
