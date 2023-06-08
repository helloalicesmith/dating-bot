const axios = require('axios')

const UserService = require('./services/users')
const GeoService = require('./services/geo')
const SearchService = require('./services/search')

class Api {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.API}/api`,
        })

        this.usersService = new UserService(this.instance)
        this.geoService = new GeoService(this.instance)
        this.searchService = new SearchService(this.instance)
    }
}

module.exports = new Api()
