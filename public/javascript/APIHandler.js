class APIHandler {

  constructor() {
    this.BASE_URL = axios.create({
      baseURL: 'https://minions-api.herokuapp.com/'

    })

  }

  getFullList = () => this.BASE_URL.get('/characters')


  getOneRegister = (id) => this.BASE_URL.get(`/characters/${id}`)
  

  createOneRegister = (characterInfo) => this.BASE_URL.post('/characters', characterInfo)



  updateOneRegister(id, characterInfo) {
    this.BASE_URL.put(`/characters/${id}`, characterInfo)
  }

  deleteOneRegister(id) {

  }
}

// class CharactersApp {

//   constructor() {
//     this.api = axios.create({
//       baseURL: 'https://ih-crud-api.herokuapp.com/'
//     })
//   }

//   getAllCharacters = () => this.api.get('/characters')
//   getOneCharacter = id => this.api.get(`/characters/${id}`)
//   createNewCharacter = characterInfo => this.api.post('/characters', characterInfo)
//   editCharacter = (id, characterInfo) => this.api.put(`/characters/${id}`, characterInfo)
// }