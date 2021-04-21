
class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
    this.api = axios.create({
        baseURL: baseUrl
    })
  }

  getFullList = () => this.api.get('/characters')

  getOneRegister = id => this.api.get(`characters/${id}`)

  createOneRegister = character => this.api.get('/characters', character)
  
  updateOneRegister = (id, character) => this.api.put(`/characters/${id}`, character)

  deleteOneRegister = id => this.api.delete(`/characters/${id}`)

}

