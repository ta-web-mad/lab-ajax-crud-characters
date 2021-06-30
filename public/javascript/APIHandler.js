class APIHandler {
  constructor(baseURL) {
    this.axiosApp = axios.create({
      baseURL: 'https://minions-api.herokuapp.com'
    })
  }

  getFullList = () => this.axiosApp.get('/characters')

  displayOne = id => this.axiosApp.get(`/characters/${id}`)


  createOneRegister = info => this.axiosApp.post('/characters', info)



  updateOneRegister = id => this.axiosApp.get(`/characters/${id}`)


  deleteOneRegister = (id, info) => this.axiosApp.put(`/characters/${id}`, info)

}
