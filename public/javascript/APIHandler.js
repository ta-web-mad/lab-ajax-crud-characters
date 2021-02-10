class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
    // baseUrl: 'https://minions-api.herokuapp.com/'

    this.app = axios.create({
    baseURL: 'https://minions-api.herokuapp.com/'
    })
  }
  
  getFullList () {
    return this.app.get('/characters')

  }

  getOneRegister (id) {
    return this.app.get(`/characters/${id}`)

  }

  createOneRegister () {
    return this.app.get('/characters', character)

  }

  updateOneRegister () {
    return this.app.get(`/characters/${id}`, character)

  }

  deleteOneRegister () {

  }
}
