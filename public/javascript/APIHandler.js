class APIHandler {
  constructor (baseUrl) {
    this.app =axios.create({
    baseURL:  'https://minions-api.herokuapp.com'
  })
  
    
  }

  getFullList = () => this.app.get('/characters')
  getOneRegister = id =>  this.app.get(`/characters/${id}`)
  createOneRegister = (id, character) => this.app.post(`/characters/${id}`, character)
  updateOneRegister = (id, character) => this.app.post(`/characters/${id}`, character)
  deleteOneRegister = (id, character) => this.app.post(`/characters/${id}`, character)

}
