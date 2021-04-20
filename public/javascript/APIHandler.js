class APIHandler {
  constructor () {
    this.api = axios.create({
      baseURL: 'https://minions-api.herokuapp.com'
    })
  }

  getFullList = () => this.api.get('/characters')
  getOneRegister = id => this.api.get(`/characters/${id}`)
  createOneRegister = characterInfo => this.api.post('/characters', characterInfo)
  updateOneRegister = (id, characterInfo) => this.api.put(`/characters/${id}`, characterInfo)
  deleteOneRegister = id => this.api.delete(`/characters/${id}`)

  // //No entendi porque esta funciones al no ponerlas en arrow, no me las aceptaba y me las mandaba a proto....
  // getFullList() {
  //   this.api.get('/characters')
  // }

  // getOneRegister (id) {
  //   this.api.get(`/characters/${id}`)
  // }

  // createOneRegister (characterInfo) {
  //   this.api.post('/characters', characterInfo)
  // }

  // updateOneRegister(id, characterInfo) {
  //   this.api.put(`/characters/${id}`, characterInfo)
  // }

  // deleteOneRegister (id) {

  // }
}