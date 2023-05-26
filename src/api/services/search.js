class SearchService {
    constructor(connector) {
        this.connector = connector
    }

    async getSearchUsers(id) {
        return await this.connector.get(`/search/${id}`)
    }
}

module.exports = SearchService
