class APIHandler {
  constructor() {
    this.app = axios.create({
      baseURL: "https://minions-api.herokuapp.com"
    });
  }

  getFullList = () => this.app.get("/characters");

  getOneRegister() {}

  createOneRegister() {}

  updateOneRegister() {}

  deleteOneRegister() {}
}
