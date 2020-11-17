class APIHandler {
  constructor(baseUrl) {
    this.axiosApp = axios.create({
      baseURL : baseUrl
    })
  }

  getFullList() {
    this.axiosApp.get('/characters')
  }

  getOneRegister(character_id) {
    this.axiosApp
      .get(`/characters/${character_id}`)
      .then(character => console.log(character))
      .catch(err => console.log('ERROR:', err))
  }

  createOneRegister(characterInfo) {
    this.axiosApp
      .post('/characters', characterInfo)
      .then(character => console.log(character))
      .catch(err => console.log('ERROR:', err))
  }

  updateOneRegister(character_id, newCharacterInfo) {
    this.axiosApp
      .put(`/characters/${character_id}`, newCharacterInfo)
      .then(character => console.log(character))
      .catch(err => console.log('ERROR:', err))
  }

  deleteOneRegister(character_id) {
    this.axiosApp
      .delete(`characters/${character_id}`)
      .then(character => console.log(character))
      .catch(err => console.log('ERROR:', err))
  }
}
