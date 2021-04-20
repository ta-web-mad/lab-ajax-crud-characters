class APIHandler {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://ih-crud-api.herokuapp.com/'
    })
  }

  getFullList = () => this.api.get('/characters')

  getOneRegister = id => this.api.get(`/characters/${id}`)

  createOneRegister = character => this.api.post('/characters', character)

  updateOneRegister = (id, character) => this.api.put(`/characters/${id}`, character)

  deleteOneRegister = id => this.api.delete(`/characters/${id}`)
}
