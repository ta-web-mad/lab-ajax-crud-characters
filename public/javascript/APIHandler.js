class APIHandler {
  constructor(baseURL) {
    this.BASE_URL = baseURL;
    this.api = axios.create({ baseURL })
  }

  getFullList() {
    return this.api.get('/characters')
  }

  getOneRegister(id) {
    return this.api.get(`/characters/${id}`)

  }

  createOneRegister(characterInfo) {
    return this.api.post('/characters', characterInfo)

  }

  updateOneRegister(id, characterInfo) {
    return this.api.put(`/characters/${id}`, characterInfo)
  }

  deleteOneRegister(id) {
    return this.api.delete(`/characters/${id}`)
  }

  createHtmlBlock(elm) {
    let currentDiv = document.querySelector(".characters-container");

    let newCharacter = document.createElement("div")
    let newId = document.createElement("div")
    let newName = document.createElement("div")
    let newOccupation = document.createElement("div")
    let newCartoon = document.createElement("div")

    newCharacter.className = "character-info"
    newId.className = "name"
    newName.className = "name"
    newOccupation.className = "occupation"
    newCartoon.className = "cartoon"

    newId.innerHTML += "Id: " + elm.id
    newName.innerHTML += "Name: " + elm.name
    newOccupation.innerHTML += "Occupation: " + elm.occupation
    newCartoon.innerHTML += "Cartoon: " + elm.cartoon

    newCharacter.appendChild(newId)
    newCharacter.appendChild(newName)
    newCharacter.appendChild(newOccupation)
    newCharacter.appendChild(newCartoon)

    currentDiv.appendChild(newCharacter)
  }

  writtenBlock(elm, div) {
    let block = `<div class="character-info">
          <div class="name">Character Id: ${elm.id}</div>
          <div class="name">Character Name: ${elm.name}</div>
          <div class="occupation">Character Occupation: ${elm.occupation}</div>
          <div class="cartoon">Is a Cartoon?: ${elm.cartoon}</div>
          <div class="weapon">Character Weapon: ${elm.weapon}</div>
        </div>`
    div.innerHTML += block
  }


}
