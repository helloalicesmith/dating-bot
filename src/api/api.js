const axios = require('axios')

const UserService = require('./services/users')
const GeoService = require('./services/geo')

class Api {
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:3000/api/',
        })

        this.usersService = new UserService(this.instance)
        this.geoService = new GeoService(this.instance)
    }
}

module.exports = new Api()
