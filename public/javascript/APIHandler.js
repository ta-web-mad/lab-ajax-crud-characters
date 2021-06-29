class APIHandler {
  constructor(baseURL) {
    this.BASE_URL = baseURL;
    this.api = axios.create({ baseURL })
  }

  getFullList = () => this.api.get('/characters')

  getOneRegister = id => this.api.get(`/characters/${id}`)

  createOneRegister = (characterInfo) => this.api.get('/characters', characterInfo)

  updateOneRegister = (id, characterInfo) => this.api.get(`/characters${id}`, characterInfo)

  deleteOneRegister = (id) => this.api.delete(`/characters${id}`)
}
