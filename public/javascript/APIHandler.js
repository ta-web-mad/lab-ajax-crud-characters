class APIHandler {

  constructor (baseURL) {
    this.BASE_URL = baseURL;
    this.api = axios.create({ baseURL })

  }

  getFullList = () => this.api.get('/characters')


  getOneRegister = id => this.api.get(`/characters/${id}`)
 

  createOneRegister = () => this.api.post('/characters')

  
  updateOneRegister = () => this.api.put(`/characters/${id}`)

  
  deleteOneRegister = () => this.api.put(`/characters/${id}`)

  
}
