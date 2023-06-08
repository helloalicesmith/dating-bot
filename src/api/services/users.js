class UsersService {
    constructor(connector) {
        this.connector = connector
    }

    async getUserProfile(id) {
        return await this.connector.get(`/user/${id}`)
    }

    async createUser(data) {
        return await this.connector.post('/user', data)
    }

    async updateUser(id, data) {
        return await this.connector.patch(`/user/${id}`, data)
    }

    async updateFilters(id, data) {
        return await this.connector.patch(`/user/filters/${id}`, data)
    }
}

module.exports = UsersService
