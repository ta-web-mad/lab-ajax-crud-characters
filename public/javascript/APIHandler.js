class ApiHandler {
  constructor() {
    
    this.axiosApp = axios.create({

      baseUrl: 'https://minions-api.herokuapp.com/characters'

    })
  }

  getFullList = () => this.axiosApp.get('/')

  getOneRegister(id) {
    
    // this.minionsApp
    //   .get(`characters/${id}`)
    //   .then(data => console.log(data))
    //   .catch(err => console.log('Error!:', data))

  }

  createOneRegister () {

  }

  updateOneRegister () {

  }

  deleteOneRegister () {

  }
}
