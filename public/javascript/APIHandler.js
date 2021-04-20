class APIHandler {
  
  constructor() {
    //this.BASE_URL = baseUrl;
    this.api = axios.create({
      baseURL: 'https://minions-api.herokuapp.com/'
    })
  }

  getFullList () { 
    return this.api.get('/characters')
  }

  getOneRegister (characterId) {
    return this.api.get(`/characters/${characterId}`)
  }

  createOneRegister (newCharacter) {
    return this.api.post('/characters', newCharacter)
  }

  updateOneRegister (characterId, updatedCharacter) {
    return this.api.put(`/characters/${characterId}`, updatedCharacter)
  }

  deleteOneRegister (characterId) {
    return this.api.delete(`/characters/${characterId}`)
  }
}
