class APIHandler {
  constructor() {
    this.BASE_URL = axios.create({
      baseURL: 'https://minions-api.herokuapp.com/'
    })
  }

  getFullList = () => this.BASE_URL.get('/characters')

  getOneRegister = id => this.BASE_URL.get(`/characters/${id}`)

  createOneRegister = characterInfo => this.BASE_URL.post('/characters', characterInfo)

  updateOneRegister = (id, characterInfo) => this.BASE_URL.put(`/characters/${id}`, characterInfo)

  deleteOneRegister = characterInfo => this.BASE_URL.delete('/characters', characterInfo)
}


