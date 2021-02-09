class APIHandler {
  constructor () {
    this.app = axios.create({
      baseURL: 'https://minions-api.herokuapp.com'
    })
  }

  getFullList = () => this.app.get('/characters')

  getOneRegister = id => this.app.get(`/characters/${id}`)

  createOneRegister = character => this.app.post('/characters', character)

  updateOneRegister = (id, character) => this.app.put(`/characters/${id}`, character)

  deleteOneRegister = id => this.app.delete(`/characters/${id}`)
}
