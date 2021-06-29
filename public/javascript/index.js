const charactersAPI = new APIHandler('http://localhost:8000')




window.addEventListener('load', () => {
  
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI
      .getFullList()
      .then(response => {
        let characters = ''
        response.data.forEach(elm => 
          characters += `<div>Name: ${elm.name} <br>id: ${elm.id}<br>Occupation: ${elm.occupation}
          <br>Weapon: ${elm.weapon}<br>Cartoon: ? ${elm.cartoon}</div> <hr>`)
        document.querySelector('.character-info').innerHTML = characters
      })
      .catch(err => console.log(err))
 
  })

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    
    event.preventDefault()
    
    charactersAPI
      .getOneRegister()
  
      .then(response => {
        console.log('las respuestas', response.data)
        fillCharacterForm(response.data)
        
        document.querySelector('.character-info').innerHTML
      })
  })

  document.getElementById('delete-one').addEventListener('click', function (event) {

  })

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  })

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

  })
})

function fillCharacterForm(info) {

  const inputs = document.querySelectorAll('.operation-id input')
  inputs[0].value = info.name
  inputs[1].value = info.occupation
  inputs[2].value = info.cartoon
  inputs[3].value = info.weapon

  console.log('los inputs', inputs)                   
}