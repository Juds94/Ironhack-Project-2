const axios = require('axios')

class apiHandler{

    constructor(){
        this.axiosApp = axios.create({
            baseURL:'https://api.thedogapi.com/v1/breeds'
        })
    }

    getOneDog(breed){
        console.log(breed)
        return this.axiosApp.get(`/search?q=${breed}`)
    }
}

module.exports = apiHandler