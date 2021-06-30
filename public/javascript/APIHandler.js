class ApiHandler {
    constructor(baseUrl) {
        this.BASE_URL = baseUrl

        this.app = axios.create({
            baseURL: this.BASE_URL,
        })
    }

    getFullList = () => this.app.get('/characters')

    getOneRegister = id => this.app.get(`/characters/${id}`)

    createOneRegister = charInfo => this.app.post(`/characters`, charInfo)

    updateOneRegister = (id, charInfo) => this.app.put(`/characters/${id}`, charInfo)

    deleteOneRegister = id => this.app.delete(`/characters/${id}`)
}
