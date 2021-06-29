class APIHandler {
  constructor (baseUrl) {
    this.axiosApp = axios.create({
      baseURL: baseUrl
    })
  }

  // https://minions-api.herokuapp.com/characters
  getFullList = () => this.axiosApp.get('/characters')


  getOneRegister = (id) => this.axiosApp.get(`/characters/${id}`)

  createOneRegister = (info) => this.axiosApp.post(`/characters`, info)

  updateOneRegister = (id, info) => this.axiosApp.put(`/characters/${id}`, info)

  deleteOneRegister = (id) => this.axiosApp.delete(`/characters/${id}`)
}


// Get all the characters info from https://minions-api.herokuapp.com/characters
// Get a single character info from https://minions-api.herokuapp.com/characters/:id
// Create a single character posting the data to https://minions-api.herokuapp.com/characters
// Delete a single character through his id in https://minions-api.herokuapp.com/characters/:id
// Edit a single character through his id in https://minions-api.herokuapp.com/characters/:id