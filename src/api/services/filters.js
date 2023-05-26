class FiltersService {
    constructor(connector) {
        this.connector = connector
    }

    async getUserFilters(id) {
        return await this.connector.get(`/filters/${id}`)
    }

    async createFilters(id, data) {
        return await this.connector.post(`/filters/${id}`, data)
    }

    async updateFilters(id, data) {
        return await this.connector.patch(`/filters/${id}`, data)
    }
}

module.exports = FiltersService
