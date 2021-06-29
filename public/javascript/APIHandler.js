class APIHandler {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: 'https://minions-api.herokuapp.com/characters'
    })
  }

  getFullList = () => {
    console.log("hello")
    return this.axiosApp.get()

  }

  getOneRegister = (id) => {
    console.log("getOneRegister")
    return this.axiosApp.get(`/${id}`)   /////  estoy yendo a la url base mas este ID, y ahi esta el objeto de la base de datos, 

  }

  createOneRegister = (info) => {

    return this.axiosApp.post('', info)

  }

  updateOneRegister() {
    return this.axiosApp.put(`/${id}`)
  }

  deleteOneRegister(id) {
    console.log("deleteOneRegister")
    return this.axiosApp.delete(`/${id}`)
  }
}
