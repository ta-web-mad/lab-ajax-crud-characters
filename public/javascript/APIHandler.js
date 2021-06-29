class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList () {
    return axios
      .get('https://minions-api.herokuapp.com/characters')
  }

  getOneRegister (id) {
    return axios
      .get(`https://minions-api.herokuapp.com/characters/${id}`)
  }

  createOneRegister (body) {
    return axios
      .post('https://minions-api.herokuapp.com/characters/', body)
  }

  updateOneRegister (id, body) {
    return axios
      .put(`https://minions-api.herokuapp.com/characters/${id}`, body)
  }

  deleteOneRegister (id) {
    return axios
      .delete(`https://minions-api.herokuapp.com/characters/${id}`)
  }
}
