class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = axios.create({ baseURL: baseUrl })

  }

  getFullList = () => this.BASE_URL.get('/characters')


  getOneRegister = (id) => this.BASE_URL.get(`characters/${id}`)


  createOneRegister = () => this.BASE_URL.post('characters')



  updateOneRegister = (id, info) => this.BASE_URL.put(`characters/${id}`, info)



  deleteOneRegister = (id) => this.BASE_URL.delete(`characters/${id}`)


}
