const charactersAPI = new ApiHandler()

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI
      .getFullList()
      .then(characters => console.log(characters.data))
      .catch(err => console.log('Error!:', err))
    
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

  });

});
