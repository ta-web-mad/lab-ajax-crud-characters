class APIHandler {
  constructor () {
    this.app =axios.create({
    baseURL:  'https://minions-api.herokuapp.com'
  })
  
    
  }

  getFullList = () => this.app.get('/characters')
  getOneRegister = id => {this.app.get(`/characters/${id}`)}
  createOneRegister = (createcharacter) => this.app.post(`/characters`, createcharacter)
  updateOneRegister = (id, updatecharacter) => this.app.put(`/characters/${id}`, updatecharacter)
  deleteOneRegister = (id, character) => {this.app.delete(`/characters/${id}`, character)}

}
