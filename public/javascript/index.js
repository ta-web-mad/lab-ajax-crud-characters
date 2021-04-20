const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    
    charactersAPI
          .getFullList()
          .then(response => {
            const { data } = response
            charactersList = ' '
            data.forEach(elm => charactersList += 
              `<div class="characters-container">
                  <div class="character-info">
                  <div>Name: ${elm.name}</div>
                   <div>Occupation: ${elm.occupation}</div>
                   <div>Weapon: ${elm.weapon}</div>
                   <div>Is a cartoon?: ${elm.cartoon}</div>
                  </div>
                  </div>`)
            document.querySelector('.show-list').innerHTML = charactersList
            console.log(data)
          })
          .catch(err => console.log('error', err))
  });


  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const characterId = document.querySelector('#idsearch').value

    charactersAPI
        .getOneRegister(characterId)
        .then(characterInfo => {
          document.querySelector('.show-one').innerHTML=
            `<div class="characters-container">
                  <div class="character-info">
                  <div>Name: ${characterInfo.data.name}</div>
                   <div>Occupation: ${characterInfo.data.occupation}</div>
                   <div>Weapon: ${characterInfo.data.weapon}</div>
                   <div>Is a cartoon?: ${characterInfo.data.cartoon}</div>
                  </div>
                  </div>`
          console.log(characterInfo)
          
        })
      .catch(err => console.log('error', err))
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

  });
});
