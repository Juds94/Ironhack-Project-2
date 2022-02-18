const axios = require('axios')

class ApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://dog-facts-api.herokuapp.com/api/v1/resources'
        })
    }
    getFact(factsAmount = 1) {
        return this.axiosApp.get(`/dogs?number=${factsAmount}`)
    }

}


module.exports = ApiHandler