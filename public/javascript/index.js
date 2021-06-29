const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

  window.addEventListener('load', () => {
    document.getElementById('fetch-all').addEventListener('click', function (event) {

      charactersAPI
      .getFullList()
      .then(res=>{
        const {data} = res
        let characters = ' '
        data.forEach(elm => characters += `<div class="characters-container">
                  <ul class="character-info">
                  <li> <strong> Name:</strong> <br> ${elm.name}</li>
                   <li> <strong> Occupation:</strong> <br> ${elm.occupation}</li>
                   <li> <strong> Weapon:</strong> <br> ${elm.weapon}</li>
                   <li> <strong> Is a cartoon? </strong><br> ${elm.cartoon}</li>
                  </ul>
                  </div>`)
        document.querySelector('.show-list').innerHTML = characters
        console.log(characters)
         })
       .catch(err=>console.log('Error:',err)) 
    });

    document.getElementById('fetch-one').addEventListener('click', function (event) {
      const fetch_one = document.querySelector('#character-id').value
      console.log(fetch_one, 'i dati')
      charactersAPI
      .getOneRegister(fetch_one)
        .then(res=>{
          const { data } = res
          let singleCharacter = ''
          singleCharacter += `<div class="characters-container">
                  <ul class="character-info">
                  <li> <strong> Name:</strong> <br> ${data.name}</li>
                   <li> <strong> Occupation:</strong> <br> ${data.occupation}</li>
                   <li> <strong> Weapon:</strong> <br> ${data.weapon}</li>
                   <li> <strong> Is a cartoon? </strong><br> ${data.cartoon}</li>
                  </ul>
                  </div>`
          document.querySelector('.show-list').innerHTML = singleCharacter
        })
        .catch(err => console.log('Error:', err))

    });

    document.getElementById('delete-one').addEventListener('click', function (event) {
// charactersAPI
    });

    document.getElementById('edit-character-form').addEventListener('submit', function (event) {
// charactersAPI
    });

    document.getElementById('new-character-form').addEventListener('submit', function (event) {
// charactersAPI
    });
  });
