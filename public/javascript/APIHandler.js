class APIHandler {
  constructor(baseUrl) {
    // this.BASE_URL = baseUrl;
    this.axiosApp = axios.create({
      baseURL: baseUrl
    })
  }

  // getFullList () {

  // }
  getFullList = () => this.axiosApp.get('/characters')

  // getOneRegister() {

  // }
  getOneRegister = id => this.axiosApp.get(`/characters/${id}`)

  // createOneRegister() {

  // }
  createOneRegister = info => this.axiosApp.post('/characters', info)

  // updateOneRegister() {

  // }
  updateOneRegister = (id, info) => this.axiosApp.put(`/characters/${id}`, info)

  // deleteOneRegister() {

  // }
  deleteOneRegister = id => this.axiosApp.put(`/characters/${id}`)
}
