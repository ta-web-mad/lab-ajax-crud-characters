class APIHandler {
  
    constructor() {
      this.app = axios.create({
        baseURL: 'https://minions-api.herokuapp.com'
      })
  }

  getFullList () {
   return this.app.get('/characters')
  }

  getOneRegister (id) {
return this.app.get(`/characters/${id}`)
  }

  createOneRegister (newCharacter) {
return this.app.post('/characters', newCharacter)
  }

  updateOneRegister (id, updateCharacter) {
return this.app.put(`/characters/${id}`, updateCharacter)
  }

  deleteOneRegister (id) {
return this.app.delete(`/characters/${id}`)
  }
}
