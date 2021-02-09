class APIHandler {
  constructor(baseUrl) {
    this.app = axios.create({
      baseURL: baseUrl
    })
  }

  getFullList() {
    return this.app.get(`/characters`)
  }

  getOneRegister(id) {
    return this.app.get(`/characters/${id}`)
    // Get a single character info from https://minions-api.herokuapp.com/characters/:id
  }

  createOneRegister(newCharacter) {
    return this.app.post(`/characters`, newCharacter)
    // Create a single character posting the data to https://minions-api.herokuapp.com/characters
  }

  updateOneRegister(id, editedCharacter) {
    return this.app.put(`/characters/${id}`, editedCharacter)
    // Edit a single character through his id in https://minions-api.herokuapp.com/characters/:id
  }

  deleteOneRegister(id) {
    return this.app.delete(`/characters/${id}`)
    // Delete a single character through his id in https://minions-api.herokuapp.com/characters/:id
  }
}