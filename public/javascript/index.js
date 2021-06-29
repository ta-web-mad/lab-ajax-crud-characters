const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI

      .getFullList()
      .then(response => {
        let characters = ''
        response.data.reverse().forEach(elm => characters += `<div class="character-info">
        <div class="name">Character Name: ${elm.name} (${elm.id})</div>
        <div class="occupation">Character Occupation: ${elm.occupation}</div>
        <div class="cartoon">Is a Cartoon?: ${elm.cartoon}</div>
        <div class="weapon">Character Weapon: ${elm.weapon}</div>
      </div>`)
        document.querySelector('#fetchAll').innerHTML = characters

      })
      .catch(err => console.log(err))

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    event.preventDefault()
    const characterId = document.querySelector('#character-id1').value

    charactersAPI

      .getOneRegister(characterId)
      .then(response => {
        let characters = `<div class="character-info">
        <div class="name">Character Name: ${response.data.name} ( ${response.data.id})</div>
        <div class="occupation">Character Occupation: ${response.data.occupation}</div>
        <div class="cartoon">Is a Cartoon? :${response.data.cartoon}</div>
        <div class="weapon">Character Weapon: ${response.data.weapon}</div>
    </div>`
        document.querySelector('#fetchAll').innerHTML = characters
        // fillCharacterEditForm(response.data)

      })
      .catch(err => console.log(err))

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

  });
});
